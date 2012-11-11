var cp = require('child_process')
	, path = require('path')
	, colors = require('colors')

describe('writeme', function () {
	//run it against `with-config` example directory
	it('works with writeme-config', function (done) {
		runWriteme('./examples/with-config', done)
	})

	//run it against 
	it('works with no writeme-config', function (done) {
		runWriteme('./examples/no-config', done)
	})
})

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