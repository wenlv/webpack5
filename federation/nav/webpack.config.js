const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: 'scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            inject: "body",
        }),
        new ModuleFederationPlugin({
            name: "nav",
            filename: "remotesEntry.js",
            remotes: {},
            exposes: {
                './Header': "./src/Header.js",
            },
            shared: {},
        }),
    ],
}
