设置npm淘宝镜像：npm config set registry https://registry.npm.taobao.org/
设置npm官方镜像：npm config set registry https://registry.npmjs.org
查看npm镜像状态：npm config get registry

1. npm init -y  初始化package.json
2. npm i webpack webpack-cli --save--dev
3. 运行webpack
4. webpack --stats detailed 查看打包详细信息

git 添加husky提交校验
1.pnpm i husky -D
2.npx husky install
3.在package.json文件的scripts中新增命令："prepare":"husky install"
4.将.husky文件夹下新增pre-commit文件并输入 npx eslint ./src
5.若pre-commit没有权限 需要执行 cd .husky 
6.ls -la查看是否有权限
7.执行此命令加权限：chmod +x .husky/pre-commit 


添加ts
1.pnpm i typescript ts-loader
2.webpack.config.common.js中的module新增module{test:/\.ts$/,use:"ts-loader",exclude:/node_modules/,}
3.执行 npx  tsc --init 命令创建tsconfig.json文件
4.将tsconfig.json文件中的 {rootDir:'./src',outDir:'./dist'} 

添加tree-shaking 及sideEffects
1.在webpack.config.common.js中的optimization:{usedExports:true}开启tree-shaking(生效条件1.必须是esmodule 2.没有使用 3.package.json中的sideEffects为true或["*.css","*.global.js"])
2.设置package.json中的sideEffects为true或数组["*.css","*.global.js"])
