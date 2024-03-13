const path = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "scripts/mylib.js",
        path: path.resolve(__dirname, './dist'),
        clean: true,
        library: {
            name: 'webpackNumbers',
            type: "umd"
        },
        globalObject: "globalThis"
    },
    mode: "production",
    devServer: {
        static: './dist'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            umd: 'lodash',
            root: '_'
        }
    },
}