设置npm淘宝镜像：npm config set registry https://registry.npm.taobao.org/
设置npm官方镜像：npm config set registry https://registry.npmjs.org
查看npm镜像状态：npm config get registry

1. npm init -y  初始化package.json
2. npm i webpack webpack-cli webpack-server webpack-merge html-webpack-plugin --save--dev
3. 运行webpack
4. webpack --stats detailed 查看打包详细信息
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>

多页面应用
const HtmlWebpckPlugin = require('html-webpack-plugin');
    new HtmlWebpckPlugin({
        title: "webpack5-demo1",
        template: './index.html',
        filename: 'chanel1/app.html',
        inject: 'body',
        chunks: ['index'],//将本页面需要的模块打包在一起
        publicPath: 'http://localhost:8080/',
    }),
    new HtmlWebpckPlugin({
        title: "webpack5-demo2",
        template: './index.html',
        filename: 'chanel2/app.html',
        inject: 'body',
        chunks: ['another'],//将本页面需要的模块打包在一起
        publicPath: 'http://localhost:8080/',
    })

==============================================================================================================
==============================================================================================================
==============================================================================================================

css有关loader
pnpm i style-loader css-loader less-loader postcss-loader postcss-nested autoprefixer  -D
一、css-loader 开启css模块
  1.配置loader 
    module:{
        rules:[
             {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,//开启css模块化(即将css中的class等转为hash)
                        },
                    },
                    'less-loader',
                    'postcss-loader',
                ],
            },
        ]
    }
2. 页面引用时需要当成对象引用(将html标签中的class等也转为hash)
    2.1. import styles from './styles/index.css';
    2.2. txtDiv.classList.add(styles.blockImg);

二、安装完postcss-loader postcss-nested autoprefixer 后需要在根目录下手动新建postcss.config.js文件
postcss.config.js文件内容如下:
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('postcss-nested'),
        ],
    }
在package.json文件中新增约定浏览器版本的代码如下代码：
    "browserslist": [
        "> 1%",
        "last 2 versions"
    ]

css有关的plugin
pnpm i mini-css-extract-plugin css-minimizer-webpack-plugin  -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinizerWebpackPlugin(),
        ],
    },


==============================================================================================================
==============================================================================================================
==============================================================================================================

js有关的loader
pnpm i babel-loader @balel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime core-js  thread-loader -D
    module:{
        rules:[
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
                                    { // 配置按需引入的polyfill
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
                    {//worker pool)
                        loader: "thread-loader",
                        options: {
                            workers: 2,
                        },
                    },
                ],
            },
        ]
    }

修复损坏实现 polyfill(即便是现在浏览器也需要)
1.方式一全局引入:
  1.1pnpm i @babel/polyfill -D
  1.2页面中引入 import @babel/polyfill
2.方式二按需引入:
  2.1pnpm i core-js -D
  2.2配置webpack.config.common.js中的module代码如下：
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: ["> 1%", "last 2 versions"],
                            useBuiltIns: "usage",
                            corejs: 3,
                        },
                    ],
                ],
                plugins: [
                    ['@babel/plugin-transform-runtime'],
                ],
            },
        }],
    },


worker池 worker-pool(thread-loader可以将非常消耗资源的loader分流给一个worker pool)
1.pnpm i thread-loader -D
2.modules:{
    rules:[
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
                                {//配置按需引入的polyfill
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
                {//worker pool)
                    loader: "thread-loader",
                    options: {
                        workers: 2,
                    },
                },
            ],
        },
    ]
}

js有关的plugin
pnpm i terser-webpack-plugin -D
 const TerserPlugin = require('terser-webpack-plugin');
 optimization: {
    minimizer: [
        new TerserPlugin(),
    ],
},


添加ts
1.pnpm i typescript ts-loader -D
2.webpack.config.common.js中的module新增module{test:/\.ts$/,use:"ts-loader",exclude:/node_modules/,}
3.执行 npx  tsc --init 命令创建tsconfig.json文件
4.将tsconfig.json文件中的 {rootDir:'./src',outDir:'./dist'} 
5.需要登录http://typescriptlang.org/dt/search?search=  将下载对应的第三方依赖如 lodash 需要下载@type/lodash

==============================================================================================================
==============================================================================================================
==============================================================================================================

添加eslint
1.pnpm i eslint -D
2.创建.eslintrc.json文件
 2.1 npx eslint --init 
 2.2 选择 To check  syntax,find problems,and enforce code style 
 2.3 选择 javaScript modules(import/export)
 2.4 选择 none of these
 2.5 是否使用ts  选择 NO
 2.6 选择Browser
 2.7 选择 use a popular tyle guide
 2.8 选择 Airbnb:https://github.com/airbnb/javascript
 2.9 选择JSON
3.在生成的.eslintrc.json的rules中配置
   "rules": {
        "semi": 0,
        "quotes": 0,
        "no-console": 0,
        "indent": [
            "error",
            4
        ],
        "import/no-unresolved": "off",
        "import/no-import-module-exports": 0,
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "no-restricted-globals": "off",
        "eqeqeq": "off",
        "no-plusplus": "off",
        "no-unused-expressions": "off",
        "class-methods-use-this": "off",
        "no-new-symbol": "off",
        "symbol-description": "off",
        "import/extensions": "off",
        "no-unused-vars": "off",
        "global-require": "off"
    }
4.运行eslint来检查错误
  第一种方式: 直接运行 npx eslint ./src直接检查
  第二种方式: 通过配置eslint-loader 来校验
     pnpm i eslint-loader -D
     在webpack.config.common.js中配置
     modules:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader','eslint-loader']
            }
        ]
     }
    
  

git 添加husky提交校验
1.pnpm i husky -D
2.npx husky install
3.在package.json文件的scripts中新增命令："prepare":"husky install"
4.将.husky文件夹下新增pre-commit文件并输入 npx eslint ./src
5.若pre-commit没有权限 需要执行 cd .husky 
6.ls -la查看是否有权限
7.执行此命令加权限：chmod +x .husky/pre-commit 

==============================================================================================================
==============================================================================================================
==============================================================================================================

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

==============================================================================================================
==============================================================================================================
==============================================================================================================

output: {
    filename: "scripts/[name].[contenthash].js",
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext]',
    // publicPath:ASSET_PATH,
    publicPath: 'http://localhost:8080/',
    library: {
        name: "mylibrary",
        type: 'umd',
    },
},


==============================================================================================================
==============================================================================================================
==============================================================================================================

 devServer: {
    static: "./dist",
    hot: true,
    liveReload: true,
    compress: true,//gzip压缩
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
    // devMiddleware: {
    //     writeToDisk: true,//开启dev开发环境编译后实时打包dist
    // },

},

==============================================================================================================
==============================================================================================================
==============================================================================================================

module: {
    rules: [
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
        },
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
    ]
}

==============================================================================================================
==============================================================================================================
==============================================================================================================

添加别名及拓展名
 resolve: {
    alias: { "@": '/src' },
    extensions: ['.json', '.ts', '.js', '.vue'],
},

==============================================================================================================
==============================================================================================================
==============================================================================================================

外部资源引用类型
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

==============================================================================================================
==============================================================================================================
==============================================================================================================

添加tree-shaking 及sideEffects
1.在webpack.config.common.js中的optimization:{usedExports:true}开启tree-shaking(生效条件1.必须是esmodule 2.没有使用 3.package.json中的sideEffects为true或["*.css","*.global.js"])
2.设置package.json中的sideEffects为true或数组["*.css","*.global.js"])

==============================================================================================================
==============================================================================================================
==============================================================================================================

treeShaking
1.在webpack.config.common.js中添加如下代码:
    optimization: {
        usedExports: true,
    }
2.package.json中新增sideEffects(表示有副作用的文件是不可以直接删掉的 设置为true表示不能删除   false表示可以删除  数组表示除了数组中的文件其他都可以删除 )如下代码：
    "sideEffects": [
        "*.css",
        "src/sideEffects/*"
    ], 
3.必须是esmodule即用import/export

==============================================================================================================
==============================================================================================================
==============================================================================================================

非离线环境下的pwa  
pnpm i http-server -D
npx http-server dist

==============================================================================================================
==============================================================================================================
==============================================================================================================

shiming预置全局变量
1. const webpack = require('webpack');
2. plugins:[
    new webpack.ProvidePlugin({
        _:"lodash"
    })
]

==============================================================================================================
==============================================================================================================
==============================================================================================================

全局导入this   another.js中访问 this.alert()
1. pnpm i imports-loader -D
2. webpack.config.common.js中配置modules代码如下:
  modules:{
    rules:[
        {
            test: require.resolve('../src/another.js'),
            use: 'imports-loader?wrapper=window',
        }
    ],
  }

==============================================================================================================
==============================================================================================================
==============================================================================================================

全局导出 export (第三方模块不知道如何导出情况下使用)
1.pnpm i exports-loader -D
2.webpack.config.common.js中配置modules代码如下:
  modules:{
    rules:[
        {
            test: require.resolve('../src/common/global.js'),
            use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse,multiple|helpers.test|test',
        }
    ],
  }


==============================================================================================================
==============================================================================================================
==============================================================================================================

使用dll
1.新增webpack.config.dll.js文件 内容入下:
  const path = require('path');
    const webpack = require('webpack');

    module.exports = {
        mode: 'development',
        entry: {
            jquery: ['jquery'],
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'dll'),
            library: "[name]_[hash]",
        },
        plugins: [
            new webpack.DllPlugin({
                name: "[name]_[hash]",
                path: path.resolve(__dirname, "dll/mainfest.json"),
            }),
        ],
    }
2.package.json文件中新增如下：
  "scripts": {
    "dll": "webpack -c ./config/webpack.config.dll.js"
  }
3.执行 npm  run dll 然后生成dll文件夹包含mainfest.json及jquery.js文件
4.在webpack.config.common.js文件中新增如下代码：
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dll/mainfest.json'),
        }),
    ],
5.pnpm i add-asset-htmk-webpack-plugin -D  
6.在webpack.config.common.js文件中新增如下代码(将生成的jquery.js添加到打包好的文件中)：
    const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
    plugins: [
        new AddAssetHtmlWebpackPlugin({
            filePath: path.resolve(__dirname, './dll/jquery.js'),
            publicPath: './',
        }),
    ],

==============================================================================================================
==============================================================================================================
==============================================================================================================


workbox离线应用
1.pnpm i http-server  workbox-webpackplugin -D
2.package.json的scripts中新增 {start:"http-server dist"}命令
3.webpack.config.common.js中添加workbox-webpackplugin插件
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
 plugins:[
    new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true, // 快速启用server workbox
        skipWaiting: true, // 跳过等待
    })
 ]
4.在index.js中添加如下代码：
    if ("serviceWorker" in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                console.log("registration-注册成功---");
                console.log(registration);
            }).catch((registrationError) => {
                console.log("registrationError--注册失败--");
                console.log(registrationError);
            })
        })
    }
5.npm run dev 先打包dist文件(任何修改都要先打包编译dist)
6.执行 npm run start
7.跑起来后查看是否有注册成功workbox(成功后停掉服务再查看页面是否可以继续访问)
8. 打开 chrome://serviceworker-internals/  可以将关闭已经注册成功的离线服务

==============================================================================================================
==============================================================================================================
==============================================================================================================

多线程webWorker
    主页面使用如下代码：
    const work = new Worker(new URL('./work.js', import.meta.url));
    <!-- 发送信息及传参 -->
    work.postMessage(obj);
    <!-- 接收处理完后的信息 -->
    work.onmessage = (event) => {
        // 主线程关闭weoker
        work.terminate();
    };

    worke.js代码如下：
    <!-- 接收主线程发送过来的消息然后处理业务 -->
    self.onmessage = async (event) => {
        <!-- 业务逻辑处理 -->
        const { workerList, isClose } = event.data;

        const list = workerList.map((v) => httpPost(v));
        const results = await Promise.all(list);

        处理完业务逻辑后给主线程发送消息
        self.postMessage({
            results,
        });
        // 在子线程关闭worker
        isClose && self.close();
    }

==============================================================================================================
==============================================================================================================
==============================================================================================================


模块联邦 Module Federation
1.  const { ModuleFederationPlugin } = require('webpack').container;
2.nav模块   将Header模块导出供home模块使用，nav模块的webpack.config.common.js新增
    plugins:[
        new ModuleFederationPlugin({
            name: 'nav', // 模块联邦名称
            filename: "remoteEntry.js", // 远程模块联邦文件
            remotes: {}, // 引入外部模板联邦的文件
            exposes: { // 导出联邦模块
                "./Header": "./src/Header.js", // 导出Header模块供其他外部使用 使用时需要用remotes[key]/exposes[key]组成
            },
            shared: {}, // 公共模块资源
        }),
    ]
3.home模块引用外部nav的Header模块  home模块的webpack.config.common.js新增
    plugins:[
        new ModuleFederationPlugin({
            name: 'home', // 模块联邦名称
            filename: "remoteEntry.js", // 远程模块联邦文件
            remotes: {
                nav: "nav@http://localhost:8080/remoteEntry.js", // 键nav是自定义名称,值"nav@http://localhost:8080/remoteEntry.js"就是用nav ModuleFederationPlugin模块的 name+publicPath+filename组成
            }, // 引入外部模板联邦的文件
            exposes: {},
            shared: {}, // 公共模块资源
        }),
    ]
3.home模块页面中只能通过import("nav/Header").then()动态同步加载
import("nav/Header")中的nav是home模块webpack.config.common.js中remotes.nav;Header是nav模块中exposes暴露出来的键"./Header"
    import("nav/Header").then((Header) => {
        <!-- 加载完成后做逻辑处理 -->
        const body = document.createElement('div');
        body.appendChild(Header.default());

        document.body.appendChild(body);
        document.body.innerHTML += HomeList(5);
    })

==============================================================================================================
==============================================================================================================
==============================================================================================================


发布npm包
一：发布npm前本地验证
1.新建demo/index.html文件 引入dist中打包好的js文件 
2.执行 npx http-server 开启服务 查看页面是否可以成功访问并打印包信息
二：发布npm包到npm.js
1. webpack.config.common.js中的output添加如下代码:
    output:{
        library: {
            name: 'webpackNumbers',
            type: "umd"
        },
        globalObject: "globalThis"
    }
2. 将package.json中的main改为“dist/scripts/mylib.js”即打包后的文件名即output输出的filename在dist中的路径
3. npm config get registry  必须是npm官网地址npm.org.js(若非npm官网地址需要设置成官网地址)
4. npm adduser 然后输入用户名 邮箱 密码
5. npm publish

==============================================================================================================
==============================================================================================================
==============================================================================================================

打包分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
 plugins: [
     new BundleAnalyzerPlugin(),
],

==============================================================================================================
==============================================================================================================
==============================================================================================================

通用环境性能提升：
1.webpack node升级到最新版本
2.将loader应用于最少数量的必要模块
3.引导(bootstrap) 每个额外的loader/plugin都有启动时间，尽量少的使用工具
4.解析：
  4.1减少resolve.modules,resolve.extensions,resolve.mainFiles,resolve.descriptionFiles中条目数量，因为他们会增加文件系统调用次数
  4.2若不使用symlinks(如：npm link 或yarn link)可以设置resolve.symlinks:false;
  4.3若使用自定义的resolve.plugin规则，并且没有指定context上下文，可以设置resolve.cacheWithContext:false;
5.小即时快(smaller=faster)
    减少编译结果的整体大小，以提高构建性能。尽量保持chunk体积小。
    使用数量更少、体积更小的library
    多页面应用中会用splitChunksPlugin,并开启async模式
    移除未引用的代码
    只编译当前正在开发的那些代码
6.持久化缓存
  在webpack配置中会用cache选项。使用package.json中的postinstall清楚缓存目录
  将cache类型设置为内存或者文件系统。memory选项很简单，它告诉webpack在内存中存储缓存，不允许额外的配置。
  module.exports={
    cache:{
        type:"memory"
    }
  }
7.自定义plugin/loader
  对他们进行概要分析，以免在此处引入性能问题
8.progress plugin
  将progressPlugin删除以缩短构建时间
9.dll
  使用dllPlugin为更改不频繁的额代码生成单独的编译结果。这可以提高编译速度，尽管增加了构建过程的复杂度
10.worker 池

==============================================================================================================
==============================================================================================================
==============================================================================================================

开发环境提升构建性能：
1.增量编译
  使用webpack的watch mode(监听模式)。而不使用其他工具来watch文件和调用webpack。内置 watch mode 会记录时间戳并将此信息传递给compilation 来是缓存失效
  在某些环境中，watch mode 会回退到poll mode(轮询模式)。监听许多那件会导致CPU大量负载。在这些情况下，可以使用watchOptions.poll来增加轮询的间隔时间。
2.内存中编译
 以下几个工具通过在内存中(而不是写入磁盘)编译和serve资源来提高性能：
    webpack-dev-server
    webpack-hot-middleware
    webpack-dev-middleware
3.stats.toJson加速
 webpack4默认使用stats.toJson()输出大量数据。除非在增量步骤中做必要统计，否则请避免获取stats对象的部分内容。
 webpack-dev-server在v3.1.3以后的版本，包括一个重要的性能修复，即最小化每个增量构建步骤中，从stats对象获取的数据量。
4.devTool
 需要注意的是不同的devtool设置，会导致性能差异
 eval 具有最好的性能，但不能转译代码
 若可以接受稍差一点的map质量，可以使用cheap-source-map 变体配置来提高性能
 使用eval-source-map 变体配置进行增量编译
 在大多数情况下，最佳选择是 eval-cheap-module-source-map
5.避免在生产环境才用到的工具
  某些utiity,plugin和loader都只用在生产环境。例如，在开发环境下使用TarerPlugin来minify(压缩)和mangle(混淆破坏)代码是没有意义的。通常在开发环境下，应该排除以下这些工具:
  TerserPlugin
  [fullhash]/[chunkhash]/[contenthash]
  AggressiveSplittingPlugin
  AggressiveMergingPlugin
  ModuleConcatenationPlugin
6.最小化entry chunk
  webpack只会在文件系统中输出已经更新的chunk。某些配置选项( HMR，output.chunkFileame的[name]/[chunkhash]/[contenthash],[fullhash]来说，除了对已经更新的chunk无效以外，对于entry chunk也无效)。
  确保在生成entry chunk时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的chunk,所以他的生成代价较低。
  module.exports={
    optimization:{
        runtimeChunk:true
    },
  }
7.避免额外的优化步骤：
  webpack通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化使用于小型代码库，但是在大型代码库中却非常耗费性能：
  module.exports={
    optimization:{
        removeAvailableModules:false,
        removeEmptyChunks:false,
        splitChunks:false,
    },
  }
8.输出结果不携带路径信息
 webpack会在输出的bundle中生成路径信息。然而在打包数千个模块的项目中，这会导致垃圾回收性能压力。在options.output.pathinfo设置中关闭
 module.exports={
    output:{
        pathinfo:false,
    },
  }
9.node.js版本8.9.10-9.11.1
  node.jsv8.9.10-9.11.1中的es2015 Map和Set实现，存在性能回退。webpack大量的使用这些数据结构，因此这次回退也会影响编译时间。
  之前和之后的node.js版本不受影响。
10.typescript loader
  可以为loader传入transpileOnly选项，以缩短会用ts-loader时的构建时间。使用此选项会关闭类型检查。若需要开启类型检查，请使用ForkTsCheckerWebpackPlugin。使用此插件会将检查过程移至单独的进程，可以加快Typescript的类型检查和Eslint插入的速度。
  module.exports={
    modules:{
        rules:[
            {
                test:/\.jsx?$/,
                use:[
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly:true
                        }
                    }
                ]
            }
        ]
    },
  }

==============================================================================================================
==============================================================================================================
==============================================================================================================


生产环境提升构建性能
1.不启用sourceMap
  source map相当耗费资源，开发环境模式不要设置source map
 


  