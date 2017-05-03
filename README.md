![my love](./logo.png)

## 重命名当前目录下的文件    by hbq  

## 安装
```
npm i -g renamex-cli
```    

> 描述
1. 可以重命名当前目录下的文件 用nodejs glob pattern 进行匹配 
2. 默认已经忽略 node_modules文件夹
3. 在执行真正文件操作前会需要输入 y/n 确认,不用担心误操作
> 使用案例
```
renamex start -p **/*.js -r "lalala[name][ext]" -t no
//  x.js=> lalalax.js
```
3. -t test  ,只有当设置 -t no  才会真实执行重命名操作,否则只会列出匹配到的文件  非必需参数
4. -p  pattern 匹配,glob库 [特性:pattern](https://github.com/isaacs/minimatch#usage)  默认值:`**/*.*` 非必需参数 
5. -r  replacePattern   替换特性 支持 full,name,ext 用法  "[name]123[ext]" 或者 "123[full]" 必需参数 
    1. full 文件名的全名, xxxx/yyy.js =>  yyy.js
    2. name 文件名, xxxx/yyyy.js  => yyyy
    3. ext 后缀名 含. , xxxx/yyyy.js => .js
 