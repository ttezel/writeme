#writeme

##lib/buildConfig.js
- - - - -
###function module.exports(cb)
param `cb`: **Function**   completion callback. Signature: function (err)
###Description
<p>Build self.config, call <code>cb</code> on completion.</p>

<p>Default config <code>include</code> array includes all .js files found in root, excluding the<br />default ignore list and files/directories prefixed with '.'</p>

<p>All config paths are relative to root where <code>writeme</code> is run.</p>

<h2>Config options</h2>

<p><code>include</code>: array of files to document (all other files will be ignored)<br /><code>template_path</code>: path to mustache template to use for rendering docs<br /><code>css_path</code>: path to css file to use for docs (defaults to gfm)<br /><code>doc_base</code>: basename of docs output. <br />All docs will be output to two files with the <code>doc_base</code> string as the basename. <br />(eg. a value of <code>readme</code> will output a readme.md &amp; readme.html)</p>



##lib/generateDocs.js
- - - - -
###function module.exports(cb)
param `cb`: **function**   completion callback. Function (err)
###Description
<p>Traverse down the root and run .renderDoc() as files are discovered.</p>



##lib/initializeDoc.js
- - - - -
###function module.exports(cb)
param `cb`: **Function**   completion callback. Signature: function (err)
###Description
<p>initialize html doc (write css) &amp; delete markdown file (if exists)</p>



##lib/renderDocs.js
- - - - -
###function module.exports(files)
param `files`: **array**   array of absolute paths of files to document
###Description
<p>Run <code>dox</code> on @file, render markdown &amp; html, then write to doc files</p>



##lib/writeme.js
- - - - -
###function Writeme(root)
param `root`: **String**   absolute path to the directory (or file) to be documented
###Description
<p>Writeme class</p>

<p>Sets up writeme configuration, and kicks off the doc generation</p>

###Writeme.prototype
###Description
<p>Attach prototype methods from lib directory</p>




