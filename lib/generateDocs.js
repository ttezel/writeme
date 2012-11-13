var fs = require('fs')
  , path = require('path')
  , findit = require('findit')
  , Seq = require('seq')

/**
 * Traverse down the root and run .renderDoc() as files are discovered.
 *
 * @param {function} cb   completion callback. Function (err) 
 */
module.exports = function generateDocs (cb) {
  var self = this
    , done = 0

  Seq()
    //initialize doc file with css (and cache template on writeme instance)
    .seq(function () {
      self.initializeDoc(this)
    })
    //make doc directory
    .seq(function () {
      self.makeDocDirectory(this)
    })
    .seq(function () {
      //push files as we discover them - we want to keep the ordering
      var files = []

      //traverse each of our `include` paths - document+render all .js files
      //call @cb when we are done traversing
      self.config.include.forEach(function (target) {
        var where = path.resolve(self.root, target)

        //if this `include` path doesn't exist, return early
        if (!fs.existsSync(where)) {
          var msg = 'warning: writeme config has invalid path in `include` array: '+where
          console.log(msg.red)
          return
        }

        //this `include` path exists. Traverse it
        var finder = findit.find(where)

        //grab all the files in the `include` path. If it points to a file, then `file`
        //will be emitted once with the name of the file.
        finder.on('file', function (file, stat) {
          if (path.extname(file) === '.js')
            files.push(file)
        })
        finder.on('end', function () {
          done += 1

          //render docs when all `include` paths have been traversed
          if (done === self.config.include.length) {
            self.renderDocs(files)
          }
        })
      })
    })
}