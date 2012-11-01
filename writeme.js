var fs = require('fs')
  , path = require('path')
  , colors = require('colors')

/**
 * Writeme class
 *
 * Sets up writeme configuration, and kicks off the doc generation
 * 
 * @param {String} root absolute path to the directory (or file) to be documented
 */
function Writeme (root) {
  var self = this
  if (!root) throw new Error('writeme: must specify `root` directory to generate docs for')
  this.root = root

  //build config then generate docs
  this.buildConfig(function (err) {
    if (err) throw err
    //kick it off
    return self.generateDocs(function (err) {
      if (err) throw err
    })
  })
}

/*
Attach prototype methods from lib directory
 */
fs
.readdirSync(path.resolve(__dirname, 'lib'))
.forEach(function (file) {
  //add methods to prototype
  var method = path.basename(file, '.js')
  Writeme.prototype[method] = require('./lib/'+method)
})

module.exports = Writeme
