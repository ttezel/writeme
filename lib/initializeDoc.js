var fs = require('fs'),
    Seq = require('seq')

/**
 * initialize doc (write css) & delete markdown file (if exists) 
 * and cache config.template_path
 * 
 * @param  {Function} cb completion callback. Signature: function (err)
 */
module.exports = function initializeDoc (cb) {
  var self = this
    , absHtmlPath = this.config.doc_base+'.html'
    , absMdPath = this.config.doc_base+'.md'

  Seq()
    //grab css from config.css_path
    .seq(function () {
      var seqSelf = this
      fs.readFile(self.config.css_path, 'utf8', function (err, css) {
        if (err) return cb(err)

        return seqSelf(null, css)
      })
    })
    //delete readme.md (if it exists)
    .par(function () {
      var parSelf = this
      fs.exists(absMdPath, function (exists) {
        if (exists)
          return fs.unlink(absMdPath, parSelf)

        return parSelf(null)
      })
    })
    //write css to html file
    .par(function (css) {
      var styleNode = '<style>\n'+css+'\n</style>\n'
      return fs.writeFile(absHtmlPath, styleNode, this)
    })
    //get template file contents and cache them
    .seq(function () {
      var parSelf = this

      fs.readFile(self.config.template_path, 'utf8', function (err, contents) {
        if (err) return cb(err)

        self.cachedTemplate = contents
        return cb(null)
      })
    })
}