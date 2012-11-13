var cp = require('child_process')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , mustache = require('mustache')
  , Seq = require('seq')
  , Showdown = require('showdown')

/**
 * Run `dox` on @file, render markdown & html, then write to doc files
 *
 * @param  {array} files  array of absolute paths of files to document
 */
module.exports = function renderDocs (files) {
  var self = this
  
  //absolute paths to doc files
  var  absHtmlPath = this.config.doc_base+'.html'
    ,  absMdPath = this.config.doc_base+'.md'

  Seq()
    .seq(function () {
      this(null, files)
    })
    .flatten()
    //run dox on files in parallel
    .parMap(function (file, i) {
      console.log(('rendering doc for '+file).green)

      var seqThis = this
      //run dox on this file and call .renderDoc() on it after
      var doxExecPath = path.resolve(__dirname, '../node_modules/dox/bin/dox')
      var doxCommand = doxExecPath+' < '+file

      //run dox, pass stdout to seq
      cp.exec(doxCommand, function (err, stdout, stderr) {
        if (err) throw err
        if (stderr) return console.log('dox stderr:'.red, stderr)

        var doxOut = null

        try {
          doxOutput = JSON.parse(stdout)
        } catch (err) {
          var error = new Error('dox did not generate valid json for filename '+filename)
          throw error
        }

        var entry = {
            filename: path.relative(self.root, file)
          , doxOutput: doxOutput
        }

        return seqThis.into(i)(null, entry)
      })
    })
    .unflatten()
    //render dox output into template and write markdown doc file
    .seq(function (doxArray) {
      var seqThis = this
      var template = self.cachedTemplate

      var templateParams = {
          dirname: path.basename(self.root)
        , doxArray: doxArray
      }

      //render the template using mustache
      var markdown = mustache.render(self.cachedTemplate, templateParams)

      this(null, markdown)
    })
    //write markdown file
    .par(function (markdown) {
      fs.writeFile(absMdPath, markdown, this)
    })
    //write html file
    .par(function (markdown) {
      var converter = new Showdown.converter()
      var html = converter.makeHtml(markdown)

      fs.appendFile(absHtmlPath, html, this)
    })
}