var cp = require('child_process')
	, path = require('path')
	, colors = require('colors')

describe('writeme', function () {
	it('works', function (done) {
		var writeme = cp.spawn('./writeme')

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
			done()
		})
	})
})