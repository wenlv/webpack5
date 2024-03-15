const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        vendors: ['jquery', 'lodash'],
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, '../dll'),
        library: "[name]_[hash]",
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]_[hash]",
            path: path.resolve(__dirname, "../dll/[name]_mainfest.json"),
        }),
    ],
}
