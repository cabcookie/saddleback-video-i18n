module.exports = {
	entry: './src/js/test.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['latest']
				}
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: './dist',
	}
}
