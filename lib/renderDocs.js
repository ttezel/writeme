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
    //get template and cache it
    .seq(function () {
      var seqThis = this
      fs.readFile(self.config.template_path, 'utf8', function (err, contents) {
        if (err) throw err

        self.cachedTemplate = contents
        seqThis(null)
      })
    })
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

        //generate function signature for any doc block that's a function
        var doxOut = doxOutput.map(function (docBlock) {
          //if this doc block is a function, write its signature
          if (!docBlock.ctx)
            return docBlock

          var blockType = docBlock.ctx.type
          if (docBlock.ctx && (blockType === 'function' || blockType === 'method')) {
            //grab function params to generate the signature
            var params = docBlock.tags.map(function (tag) {
              if (tag.type === 'param')
                return tag.name
              else
                return null
            })
            var paramString = params.join(',')
            var name = null

            if (blockType === 'method')
              name = docBlock.ctx.receiver+'.'+docBlock.ctx.name
            else
              name = docBlock.ctx.name

            docBlock.signature = name+'('+paramString+')'
          }
          return docBlock
        })

        var entry = {
            filename: path.relative(self.root, file)
          , doxOutput: doxOut
        }

        return seqThis.into(i)(null, entry)
      })
    })
    .unflatten()
    //render dox output into markdown template
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
    //write rendered markdown file
    .par(function (markdown) {
      fs.writeFile(absMdPath, markdown, this)
    })
    //convert rendered markdown to html and write html file
    .par(function (markdown) {
      var converter = new Showdown.converter()
      var html = converter.makeHtml(markdown)

      fs.appendFile(absHtmlPath, html, this)
    })
    .seq(function () {
      console.log('\nsuccessfully wrote `%s` and `%s`\n'.blue, absMdPath, absHtmlPath)
    })
}