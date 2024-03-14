const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        jquery: ['jquery'],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../dll'),
        library: "[name]_[hash]",
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]_[hash]",
            path: path.resolve(__dirname, "../dll/mainfest.json"),
        }),
    ],
}
