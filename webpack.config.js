module.exports = {
	entry: './src/start.js',
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
		filename: 'bundle.js'
	}
}