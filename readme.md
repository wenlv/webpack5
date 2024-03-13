设置npm淘宝镜像：npm config set registry https://registry.npm.taobao.org/
设置npm官方镜像：npm config set registry https://registry.npmjs.org
查看npm镜像状态：npm config get registry

1. npm init -y  初始化package.json
2. npm i webpack webpack-cli webpack-server webpack-merge html-webpack-plugin --save--dev
3. 运行webpack
4. webpack --stats detailed 查看打包详细信息

css有关loader
pnpm i style-loader css-loader less-loader postcss-loader postcss-nested autoprefixer  -D
css有关的plugin
pnpm i mini-css-extract-plugin css-minimizer-webpack-plugin  -D

js有关的loader
pnpm i babel-loader @balel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime   @babel/polyfill
js有关的plugin
pnpm i core-js terser-webpack-plugin -D
js有关的其他
pnpm i core-js -D

添加ts
1.pnpm i typescript ts-loader -D
2.webpack.config.common.js中的module新增module{test:/\.ts$/,use:"ts-loader",exclude:/node_modules/,}
3.执行 npx  tsc --init 命令创建tsconfig.json文件
4.将tsconfig.json文件中的 {rootDir:'./src',outDir:'./dist'} 


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



git 添加husky提交校验
1.pnpm i husky -D
2.npx husky install
3.在package.json文件的scripts中新增命令："prepare":"husky install"
4.将.husky文件夹下新增pre-commit文件并输入 npx eslint ./src
5.若pre-commit没有权限 需要执行 cd .husky 
6.ls -la查看是否有权限
7.执行此命令加权限：chmod +x .husky/pre-commit 


添加eslint




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
