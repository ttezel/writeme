var fs = require('fs')
  , path = require('path')
  , findit = require('findit')

/**
 * Traverse down the root and run .renderDoc() as files are discovered.
 *
 * @param {function} cb   completion callback. Function (err) 
 */
module.exports = function generateDocs (cb) {
  var self = this
    , done = 0

  //create dir to put docs in
  this.makeDocDirectory(function (err) {
    if (err) return cb(err)

    //traverse each of our `include` paths - document+render all .js files
    //call @cb when we are done traversing
    self.config.include.forEach(function (target) {
      var where = path.resolve(self.root, target)

      //check to make sure the `include` exists on the fs
      //warn user if it doesn't exist on the fs, and return early
      fs.exists(where, function (exists) {
        if (!exists) {
          var msg = 'warning: writeme config has invalid path in `include` array: '+where
          console.log(msg.red)
          return
        }

        //this `include` path exists. Traverse it
        var finder = findit.find(where)

        var boundRenderDoc = self.renderDoc.bind(self)

        //grab all the files in the `include` path. If it points to a file, then `file`
        //will be emitted once with the name of the file.
        finder.on('file', boundRenderDoc)
        finder.on('end', function () {
          done += 1

          //call @cb when all finders are done
          if (done === self.config.include.length)
            return cb(null)
        })
      })
    })
  })
}