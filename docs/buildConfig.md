#writeme
##lib/buildConfig.js

###module.exports()
<p>Build self.config, call @callback on completion.</p>

<p>Default config <code>include</code> array includes all .js files found in root, excluding the<br />default ignore list and files/directories prefixed with '.'</p>

<p>All config paths are relative to root where <code>writeme</code> is run.</p>

<h2>Config options</h2>

<p><code>include</code>: array of files to document (all other files will be ignored)<br /><code>template_path</code>: path to mustache template to use for rendering docs<br /><code>css_path</code>: path to css file to use for docs (defaults to gfm)<br /><code>doc_dir</code>: directory to put docs in<br /><code>concat</code>: if specified, all docs will be output to two files with the <code>concat</code> string as the basename (defaults to readme.md &amp; readme.html)</p>
param `cb`: **Function**  completion callback. Signature: function (err)<br/>
