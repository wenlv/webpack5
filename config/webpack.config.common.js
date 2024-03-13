const path = require('path');
const webpack = require('webpack');
const HtmlWebpckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const EslintWebpackPlugin = require('eslint-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// const { ModuleFederationPlugin } = require('webpack').container;
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },

    // entry: {
    //     index: {
    //         import: "./src/index.js",
    //         dependOn: 'shared',
    //         filename: "chanel1/[name].js",
    //     },
    //     another: {
    //         import: "./src/another.js",
    //         dependOn: "shared",
    //         filename: "chanel2/[name].js",
    //     },
    //     // shared: 'lodash',
    //     shared: {
    //         import: "lodash",
    //         filename: "common/[name].js",
    //     },
    // },

    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext]',
        library: {
            name: "mylibrary",
            type: 'umd',
        },
    },

    resolve: {
        alias: { "@": '/src' },
        extensions: ['.json', '.ts', '.js', '.vue'],
    },

    externalsType: 'script',
    externals: {
        jquery: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js', 'jQuery'],
        // lodash: {
        //     commonjs: "lodash",
        //     commonjs2: 'lodash',
        //     amd: 'lodash',
        //     root: "_",
        // },
    },

    plugins: [
        new HtmlWebpckPlugin({
            title: "webpack5-demo",
            template: './index.html',
            filename: 'chanel/app.html',
            inject: 'body',
            // chunks: ['index'],
            publicPath: 'http://localhost:8080/',
        }),
        // 多页面
        // new HtmlWebpckPlugin({
        //     title: "webpack5-demo1",
        //     template: './index.html',
        //     filename: 'chanel1/app.html',
        //     inject: 'body',
        //     chunks: ['index'],
        //     publicPath: 'http://localhost:8080/',
        // }),
        // new HtmlWebpckPlugin({
        //     title: "webpack5-demo2",
        //     template: './index.html',
        //     filename: 'chanel2/app.html',
        //     inject: 'body',
        //     chunks: ['another'],
        //     publicPath: 'http://localhost:8080/',
        // }),
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css',
        }),
        // 安全的使用环境变量
        // new webpack.DefinePlugin({
        //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        // })
        // new EslintWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true, // 快速启用server workbox
            skipWaiting: true, // 跳过等待
        }),
        // shimming 预置依赖
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // 模块联邦
        // new ModuleFederationPlugin({
        //     name: 'nav', // 模块联邦名称
        //     filename: "remoteEntry.js", // 远程模块联邦文件
        //     remotes: {
        //         home: "home@http://localhost:8080/remoteEntry.js", // 就是用 name+publicPath+filename组成
        //     }, // 引入外部模板联邦的文件
        //     exposes: { // 导出联邦模块
        //         "./Header": "./src/Header.js", // 导出Header模块供其他外部使用 使用时需要用remotes[key]/exposes[key]组成
        //     },
        //     shared: {}, // 公共模块资源
        // }),
        // 添加DllReferencePlugin
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, '../dll/mainfest.json'),
        // }),
        // new AddAssetHtmlWebpackPlugin({
        //     filePath: path.resolve(__dirname, '../dll/jquery.js'),
        //     publicPath: './',
        // }),
    ],

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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'less-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: ["> 1%", "last 2 versions"],
                                        // useBuiltIns: "usage",
                                        // corejs: 3,
                                    },
                                ],
                            ],
                            plugins: [
                                ['@babel/plugin-transform-runtime'],
                            ],
                        },
                    },
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 2,
                        },
                    },
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // 依赖文件的this指向window
            {
                test: require.resolve('../src/another.js'),
                use: 'imports-loader?wrapper=window',
            },
            {
                test: require.resolve('../src/common/global.js'),
                use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse,multiple|helpers.test|test',
            },
        ],
    },

    optimization: {
        usedExports: true,
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

};
