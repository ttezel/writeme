var cp = require('child_process')
	, path = require('path')
	, colors = require('colors')

describe('writeme', function () {
	//run it against ./examples/no-config
	it('works with no writeme-config', function (done) {
		runWriteme('./examples/no-config', done)
	})
})

/**
 * Run Writeme in the directory specified by @relPath. Call @done on completion.
 * 
 * @param  {string}   relPath  path relative to process.cwd()
 * @param  {Function} done     completion callback
 */
function runWriteme (relPath, done) {
	var cwd = process.cwd()

	try {
		process.chdir(relPath)
	} catch (err) {
		console.log('chdir error with `'+relPath+'`:', err)
		throw err
	}

	var writeme = cp.spawn('../../bin/writeme')

	writeme.stdout.on('data', function (out) {
		console.log(out.toString())
	})

	writeme.stderr.on('data', function (out) {
		console.log('writeme stderr'.red, out.toString())
	})

	writeme.on('exit', function (code, signal) {
		if (code !== 0)
			console.log('writeme exitted with code %s and signal %s'.blue, code, signal)
		else
			console.log('writeme exitted successfully'.blue)

		process.chdir(cwd)
		done()
	})
}