const path = require('path');
// import webpack from 'webpack';
const HtmlWebpckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = (env) => ({
    // entry: "./src/index.js",
    entry: {
        index: "./src/index.js",
        another: "./src/another.js",
    },
    // entry: {
    //     index: {
    //         import: "./src/index.js",
    //         dependOn: 'shared'
    //     },
    //     another: {
    //         import: "./src/another.js",
    //         dependOn: "shared"
    //     },
    //     shared: 'lodash'
    // },

    output: {
        filename: "scripts/[name].[contenthash].js",
        path: path.resolve(__dirname, './dist'),
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext]',
        // publicPath:ASSET_PATH,
        publicPath: 'http://localhost:8080/',
    },

    mode: env.production ? "production" : "development",
    // mode: "production",

    devtool: "inline-source-map",

    plugins: [
        new HtmlWebpckPlugin({
            template: './index.html',
            filename: 'app.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css',
        }),
        // 安全的使用环境变量
        // new webpack.DefinePlugin({
        //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        // })
    ],

    devServer: {
        static: "./dist",
    },

    module: {
        rules: [
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/img/[contenthash][ext]',
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
            {
                test: /\.jpg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 * 1024,
                    },
                },
            },
            {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-runtime'],
                        ],
                    },
                },
            },
        ],
    },

    optimization: {
        minimizer: [
            new CssMinizerWebpackPlugin(),
            new TerserPlugin(),
        ],
        splitChunks: {
            // chunks: 'all'
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    performance: {
        hints: false,
    },
})
