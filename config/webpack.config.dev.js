const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    output: {
        filename: "scripts/[name].js",
    },

    mode: "development",

    devtool: "inline-source-map",

    devServer: {
        static: "./dist",
        hot: true,
        liveReload: true,
        compress: true,
        // port: 3000,
        // host: '0.0.0.0',
        headers: {
            'X-ACCESS-TOKEN': 'abc123',
        },
        // proxy: [{
        //     '/api': 'http://localhost:9000',
        // }],
        // https: true,
        // historyApifallback: true,
        client: {
            overlay: false,
        },

    },

    plugins: [
        new BundleAnalyzerPlugin(),
    ],

}
