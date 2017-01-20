module.exports = {
	entry: './src/js/test.js',
	output: {
		filename: 'bundle.js',
		path: './dist',
		library: 'app',
		libraryTarget: 'this'
	}
}
