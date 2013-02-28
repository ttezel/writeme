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

###Example

Code should be documented similar to the example below:

```javascript
/**
 * Here I describe what this function does.
 * 
 * @param  {string} baz     baz description
 * @return {boolean}        bool description
 */
Class.prototype.publicMethod = function (baz) {
    return true
}
```

-----

To see examples of what `writeme`-generated documentation looks like, check out [api.md](https://github.com/ttezel/writeme/blob/master/api.md) and [api.html](https://github.com/ttezel/writeme/blob/master/api.html) at the root of this repo, or the examples inside the **examples** directory.


## License 

(The MIT License)

Copyright (c) by Tolga Tezel <tolgatezel11@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
