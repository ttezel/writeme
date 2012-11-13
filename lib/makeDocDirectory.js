var fs = require('fs')
  , path = require('path')

/**
 * Create directory to put docs in and set self.docPath.
 * 
 * @param  {Function} cb completion callback. Signature: function (err)
 */
module.exports = function makeDocDirectory (cb) {
  var self = this
  //make docs directory to put output in
  var docDir = path.dirname(this.config.doc_base)

  //check if docPath already exists, create it if doesn't already exist
  fs.exists(docDir, function (exists) {
    if (exists) return cb(null)

    //docs directory does not exist, so create it
    fs.mkdir(docDir, function (err) {
      if (err) {
        var msg = 'writeme failed to create doc directory at: '+docDir+': '+err
        var error = new Error(msg)
        return cb(error)
      }

      return cb(null)
    })
  })
}