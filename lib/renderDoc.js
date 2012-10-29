var cp = require('child_process')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , mustache = require('mustache')
  , Seq = require('seq')

/**
 * Run `dox` on @file, render markdown & html, then save in docs directory
 * 
 * @param  {string} file  absolute file path to document
 * @param  {object} stat  file's stats
 */
module.exports = function renderDoc (file, stat) {
  if (path.extname(file) !== '.js')
    return

  var self = this
    , fileBasename = path.basename(file, '.js')
    , docBase = path.resolve(self.docPath, fileBasename)
  
  //absolute paths to doc files
  var  absHtmlPath = docBase+'.html'
    ,  absMdPath = docBase+'.md'

  Seq()
    //get css (cache if not already cached)
    .seq(function () {
      if (self.cachedCss)
        return this(null, self.cachedCss)

      var seqSelf = this

      fs.readFile(self.config.css_path, 'utf8', function (err, contents) {
        if (err) throw err

        self.cachedCss = contents
        return seqSelf(null, self.cachedCss)
      })
    })
    //write html file with css styling
    .par(function (css) {
      var styleNode = '<style>\n'+css+'\n</style>\n'
      fs.writeFile(absHtmlPath, styleNode, this)
    })
    //get template file contents (cache if not already cached)
    .par(function () {
      if (self.cachedTemplate)
        return this(null, self.cachedTemplate)

      var parSelf = this

      fs.readFile(self.config.template_path, 'utf8', function (err, contents) {
        if (err) throw err

        self.cachedTemplate = contents
        return parSelf(null, self.cachedTemplate)
      })
    })
    //run dox on source file
    .par(function () {
      var parSelf = this
      //run dox on this file and call .renderDoc() on it after
      var doxExecPath = path.resolve(__dirname, '../node_modules/dox/bin/dox')
      var doxCommand = doxExecPath+' < '+file

      //run dox, pass stdout to seq
      cp.exec(doxCommand, function (err, stdout, stderr) {
        if (err) throw err
        if (stderr) return console.log('dox stderr:'.red, stderr)

        var doxOut = null

        try {
          doxOut = JSON.parse(stdout)
        } catch (err) {
          var error = new Error('dox did not generate valid json for filename '+filename)
          throw error
        }

        return parSelf(null, doxOut)
      })
    })
    //render dox output into template and write markdown doc file
    .seq(function (doxOut) {
      var seqSelf = this

      var template = this.args[1][0]
        , doxOut = this.args[2][0]

      var templateParams = {
          dirname: path.basename(self.root)
        , filename: path.relative(self.root, file)
        , doxOut: doxOut
      }

      console.log('templateParams', util.inspect(templateParams, true, null, true))

      //render the template using mustache
      var rendered = mustache.render(self.cachedTemplate, templateParams)

      console.log('rendered\n\n', rendered)

      //write populated markdown to file
      fs.writeFile(absMdPath, rendered, function (err) {
        if (err) throw err

        return seqSelf(null)
      })
    })
    //run `marked` on markdown output and append rendered html to html doc file
    .seq(function () {
      //now use marked to render the html version of the doc
      var markedPath = path.resolve(__dirname, '../node_modules/marked/bin/marked')

      var markedCommand = markedPath+' -i '+absMdPath+' >> '+absHtmlPath

      cp.exec(markedCommand, function (err, stdout, stderr) {
        if (err) throw err
        if (stderr) return console.log('marked stderr:'.red, stderr)
        if (stdout) return console.log('marked stdout:'.blue, stdout)
      })
    })
}