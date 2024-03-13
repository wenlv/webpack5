const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: "home",
            filename: "remotesEntry.js",
            remotes: {
                nav: "nav@http://localhost:3003/remotesEntry.js",
            },
            exposes: {
                "./HomeList": "./src/HomeList.js",
            },
            shared: {},
        }),
    ],
}
