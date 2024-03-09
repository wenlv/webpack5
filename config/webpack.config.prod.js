// import webpack from 'webpack';
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        filename: "scripts/[name].[contenthash].js",
        publicPath: 'http://localhost:8080/',
    },

    mode: "production",

    optimization: {
        minimizer: [
            new CssMinizerWebpackPlugin(),
            new TerserPlugin(),
        ],
    },

    performance: {
        hints: false,
    },
}
