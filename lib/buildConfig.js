var fs = require('fs')
  , path = require('path')

//default files/directories to ignore (relative to root directory to be documented)
var DEFAULT_IGNORE_LIST = [
    'node_modules'
  , 'test'
  , 'test.js'
];

/**
 * Build self.config, call @callback on completion.
 * 
 * Default config `include` array includes all .js files found in root, excluding the
 * default ignore list and files/directories prefixed with '.'
 *
 * All config paths are relative to root where `writeme` is run.
 * Config options:
 * `include`: array of files to document (all other files will be ignored)
 * `template_path`: path to mustache template to use for rendering docs
 * `css_path`: path to css file to use for docs (defaults to gfm)
 * `doc_base`: path (and basename) of docs output. 
 * All docs will be output to two files with the `doc_base` string as the basename. 
 * (eg. a value of `./readme` will output a readme.md & readme.html)
 * 
 * @param  {Function} cb completion callback. Signature: function (err)
 */
module.exports = function buildConfig (cb) {
  var self = this

  this.config = require('../default-config.json')

  //use default template (user options can overwrite this)
  this.config.template_path = path.resolve(__dirname, '../templates/default.md')
  this.config.css_path = path.resolve(__dirname, '../templates/gfm.css')

  var userConfigPath = path.resolve(this.root, './writeme-config.json')

  //if writeme-config.json exists, overwrite any specified config options
  fs.exists(userConfigPath, function (exists) {
    if (exists) {
      console.log('`writeme-config.json` found. Applying your settings.'.green)

      var userConfig = require(userConfigPath)

      //override default-config with any user-supplied values
      for (var override in userConfig) {
        self.config[override] = userConfig[override]
      }

      //config keys that need to be relative paths to self.root
      var relativePaths = [ 'template_path', 'css_path', 'doc_base' ]

      //resolve all relative paths to their absolute path
      relativePaths.forEach(function (key) {
        self.config[key] = path.resolve(self.root, self.config[key])
      })

      //if `include` isn't empty, we can return immediately and start generating docs.
      //otherwise if it's empty we have to read the directory to get files to document.
      if (self.config.include.length)
        return cb(null)
    }

    //read the directory to find directories to document
    
    //build default hash of paths to ignore - everything else gets documented
    var ignore = {}

    DEFAULT_IGNORE_LIST.forEach(function (name) {
      ignore[path.resolve(root, name)] = 1
    })

    //read root directory to get all possible `include` paths
    fs.readdir(self.root, function (err, files) {
      if (err) return cb(err)

      //filter directories/files using default ignore list
      self.config.include = files.filter(function (file) {
        var fullPath = path.resolve(root, file)

        //screen ignored names and files/directories prefixed with '.'
        if (!ignore[fullPath] && file.charAt(0) !== '.')
          return true
      })

      return cb(null)
    })
  })
}