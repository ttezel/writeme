#Painless documentation generation for javascript

Generates `html` and `markdown` documentation.

##Install
```
npm install -g writeme
```

##Usage
Just go to a directory that you want to generate documentation for, and type:
```
writeme
```

By default, `writeme` will create a `readme.md` an a `readme.html` at the root of your directory, containing the generated documentation for the directory that you ran `writeme` in. It relies on your code being commented using [jsdoc](http://en.wikipedia.org/wiki/JSDoc) format. `writeme` grabs your jsdoc-formatted comments, and generates nice-looking documentation for you.

To see examples of what `writeme`-generated documentation looks like, check out `api.md` at the root of this repo, or the examples inside the `examples` directory.

You can overwrite the default writeme options by adding a `writeme-config.json` file at the root of the directory where you run the `writeme` command.

The json inside `writeme-config.json` may specify any of these values:

* include

This is an array containing the files that you want documentation to be generated for. All paths specified are relative to the directory that you ran `writeme` in.

 By default, `writeme` will traverse the directory tree which it is run inside, skipping `node_modules` and `test` directories (if they exist) at the root of the directory, as well as `test.js` (if it exists). All other files/directories will be traversed, looking for jsdoc-formatted comments to create documentation with.

* doc_dir

This is the path (relative to the directory where `writeme` is run), that documentation files should be placed in. Defaults to the path where you ran `writeme`.

* output

If specified, this causes `writeme` to use only one file to put all the generated documentation inside. For example, if output is set to "api", then `writeme` will generate a `api.html` and a `api.md` containing all the documentation.

If no value is specified for `output`, then `writeme` will generate an `html` and a `markdown` file for each file it comes across that contains jsdoc-formatted comments.