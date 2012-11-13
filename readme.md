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

`writeme` will create a `readme.md` and `readme.html` at the root of your directory, containing the generated docs. It relies on your code being commented using [jsdoc](http://en.wikipedia.org/wiki/JSDoc) format. `writeme` grabs your jsdoc-formatted comments, and generates nice-looking documentation for you.

To see examples of what `writeme`-generated documentation looks like, check out `api.md` and `api.html` at the root of this repo, or the examples inside the `examples` directory.
