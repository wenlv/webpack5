const path = require('path');
// import webpack from 'webpack';
const HtmlWebpckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const EslintWebpackPlugin = require('eslint-webpack-plugin');

// const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext]',
    },

    resolve: {
        alias: { "@": './src' },
        extensions: ['.js', '.json', '.vue'],
    },

    externalsType: 'script',
    externals: {
        jquery: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js', 'jQuery'],
    },

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
        // new EslintWebpackPlugin(),
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-runtime'],
                        ],
                    },
                }],
            },
        ],
    },

    optimization: {
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
