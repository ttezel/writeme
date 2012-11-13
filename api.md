#writeme

##lib/buildConfig.js
###module.exports()
<p>Build self.config, call @callback on completion.</p>

<p>Default config <code>include</code> array includes all .js files found in root, excluding the<br />default ignore list and files/directories prefixed with '.'</p>

<p>All config paths are relative to root where <code>writeme</code> is run.</p>

<h2>Config options</h2>

<p><code>include</code>: array of files to document (all other files will be ignored)<br /><code>template_path</code>: path to mustache template to use for rendering docs<br /><code>css_path</code>: path to css file to use for docs (defaults to gfm)<br /><code>doc_base</code>: path (and basename) of docs output. <br />All docs will be output to two files with the <code>doc_base</code> string as the basename. <br />(eg. a value of <code>./readme</code> will output a readme.md &amp; readme.html)</p>
param `cb`: **Function**  completion callback. Signature: function (err)<br/>
<br/>




##lib/generateDocs.js
###module.exports()
<p>Traverse down the root and run .renderDoc() as files are discovered.</p>
param `cb`: **function**  completion callback. Function (err)<br/>
<br/>




##lib/initializeDoc.js
###module.exports()
<p>initialize doc (write css) and cache config.template_path</p>
param `cb`: **Function**  completion callback. Signature: function (err)<br/>
<br/>




##lib/makeDocDirectory.js
###module.exports()
<p>Create directory to put docs in and set self.docPath.</p>
param `cb`: **Function**  completion callback. Signature: function (err)<br/>
<br/>




##lib/renderDocs.js
###module.exports()
<p>Run <code>dox</code> on @file, render markdown &amp; html, then write to doc files</p>
param `files`: **array**  array of absolute paths of files to document<br/>
<br/>




##lib/writeme.js
###Writeme()
<p>Writeme class</p>

<p>Sets up writeme configuration, and kicks off the doc generation</p>
param `root`: **String**  absolute path to the directory (or file) to be documented<br/>
<br/>


###Writeme.prototype
<p>Attach prototype methods from lib directory</p>
<br/>





