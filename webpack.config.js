const path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 9000
	}
};
