var PACKAGE = require('./package.json');
var bundleName = 'SaddlebackVideoTranslation_v' + PACKAGE.version + '.jsx';

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
		filename: bundleName
	}
}
