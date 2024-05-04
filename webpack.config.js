const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
    })
    ],
    devServer: {
        port: 3000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    stats: {
        children: true
      }
}
