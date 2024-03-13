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

css有关loader
pnpm i style-loader css-loader less-loader postcss-loader postcss-nested autoprefixer  -D
一、css-loader 开启css模块
  1.配置loader  {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
                modules: true,//开启css模块化(即将css中的class等转为hash)
            },
        }, ],
    },
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


js有关的loader
pnpm i babel-loader @balel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime   @babel/polyfill
js有关的plugin
pnpm i terser-webpack-plugin -D


添加ts
1.pnpm i typescript ts-loader -D
2.webpack.config.common.js中的module新增module{test:/\.ts$/,use:"ts-loader",exclude:/node_modules/,}
3.执行 npx  tsc --init 命令创建tsconfig.json文件
4.将tsconfig.json文件中的 {rootDir:'./src',outDir:'./dist'} 
5.需要登录http://typescriptlang.org/dt/search?search=  将下载对应的第三方依赖如 lodash 需要下载@type/lodash


workbox离线应用
1.pnpm i http-server  workbox-webpackplugin -D
2.package.json的scripts中新增 {start:"http-server dist"}命令
3.webpack.config.common.js中添加workbox-webpackplugin插件
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




添加tree-shaking 及sideEffects
1.在webpack.config.common.js中的optimization:{usedExports:true}开启tree-shaking(生效条件1.必须是esmodule 2.没有使用 3.package.json中的sideEffects为true或["*.css","*.global.js"])
2.设置package.json中的sideEffects为true或数组["*.css","*.global.js"])


发布npm包
一：发布npm前本地验证
1.新建demo/index.html文件 引入dist中打包好的js文件 
2.执行 npx http-server 开启服务 查看页面是否可以成功访问并打印包信息
二：发布npm包到npm.js
1. webpack.config.common.js中的output添加如下代码:
{
    library: {
        name: 'webpackNumbers',
        type: "umd"
    },
    globalObject: "globalThis"
}
2. 将package.json中的main改为“dist/mylib”即打包后的文件名
3. npm config get registry  必须是npm官网地址npm.org.js(若非npm官网地址需要设置成官网地址)
4. npm adduser 然后输入用户名 邮箱 密码
5. npm publish


多页面应用
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

非离线环境下的pwa  
pnpm i http-server -D
npx http-server dist


shiming预置全局变量
1. const webpack = require('webpack');
2. plugins:[
    new webpack.ProvidePlugin({
        _:"lodash"
    })
]

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
    