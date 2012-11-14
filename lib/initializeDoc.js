var fs = require('fs'),
    Seq = require('seq')

/**
 * initialize html doc (write css) & delete markdown file (if exists)
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
    //write css to html file
    .par(function (css) {
      var styleNode = '<style>\n'+css+'\n</style>\n'
      return fs.writeFile(absHtmlPath, styleNode, this)
    })
    .seq(function () {
      return cb(null)
    })
}