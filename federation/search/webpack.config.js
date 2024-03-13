// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { ModuleFederationPlugin } = require("webpack").container;

// module.exports = {
//     mode: "development",
//     entry: "./src/index.js",
//     output: {
//         clean: true,
//     },
//     plugins: [
//         new HtmlWebpackPlugin(),
//         new ModuleFederationPlugin({
//             name: "search",
//             filename: "remotesEntry.js",
//             remotes: {
//                 nav: "nav@http://localhost:3003/remotesEntry.js",
//             },
//             exposes: {

//             },
//             shared: {},
//         }),
//     ],
// }

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
            name: "search",
            filename: "remotesEntry.js",
            remotes: {
                nav: "nav@http://localhost:3003/remotesEntry.js",
                home: "home@http://localhost:3001/remotesEntry.js",
            },
            exposes: {

            },
            shared: {},
        }),
    ],
}
