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
  if (!root) 
    throw new Error('writeme: must specify valid `root` directory to generate docs for')

  this.root = root

  var self = this
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
Writeme.prototype = {
    buildConfig:      require('./buildConfig')
  , generateDocs:     require('./generateDocs')
  , initializeDoc:    require('./initializeDoc')
  , renderDocs:        require('./renderDocs')
}

module.exports = Writeme
