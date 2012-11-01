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
  this.docPath = path.resolve(this.root, this.config.doc_dir)

  //check if docPath already exists, create it if doesn't already exist
  fs.exists(this.docPath, function (exists) {
    if (exists) return cb(null)

    //docs directory does not exist, so create it
    fs.mkdir(self.docPath, function (err) {
      if (err) {
        var msg = 'writeme failed to create doc directory at: '+self.docPath+': '+err
        var error = new Error(msg)
        return cb(error)
      }

      return cb(null)
    })
  })
}