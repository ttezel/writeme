#writeme

##File: lib/buildConfig.js

###function module.exports(cb)
 `cb`: **Function**   completion callback. Signature: function (err)


<p>Build self.config, call <code>cb</code> on completion.</p>

<p>Default config <code>include</code> array includes all .js files found in root, excluding the<br />default ignore list and files/directories prefixed with '.'</p>

<p>All config paths are relative to root where <code>writeme</code> is run.</p>

<h2>Config options</h2>

<p><code>include</code>: array of files to document (all other files will be ignored)<br /><code>template_path</code>: path to mustache template to use for rendering docs<br /><code>css_path</code>: path to css file to use for docs (defaults to gfm)<br /><code>doc_base</code>: basename of docs output. <br />All docs will be output to two files with the <code>doc_base</code> string as the basename. <br />(eg. a value of <code>readme</code> will output a readme.md &amp; readme.html)</p>



##File: lib/generateDocs.js

###function module.exports(cb)
 `cb`: **function**   completion callback. Signature: function (err)


<p>Traverse down the root and run .renderDoc() as files are discovered.</p>



##File: lib/initializeDoc.js

###function module.exports(cb)
 `cb`: **Function**   completion callback. Signature: function (err)


<p>initialize html doc (write css) &amp; delete markdown file (if exists)</p>



##File: lib/renderDocs.js

###function module.exports(files)
 `files`: **array**   array of absolute paths of files to document


<p>Run dox on <code>files</code>, render markdown &amp; html, then write to doc files</p>



##File: lib/writeme.js

###function Writeme(root)
 `root`: **String**   absolute path to the directory (or file) to be documented


<p>Writeme class</p>

<p>Sets up writeme configuration, and kicks off the doc generation</p>

###Writeme.prototype

<p>Attach prototype methods from lib directory</p>




