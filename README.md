#Leeven

Leeven是一个基于nodejs、mongodb以及一系列社区开源项目构建的团队在线文档管理工具。

###目录结构
```
Leeven
|-- bin
|-- config
|-- controllers
|-- dao
|-- libs
|	|--middlewares	
|-- models
|	|--sub
|-- public
|	|--images
|	|	|--avatar
|	|--javascripts
|	|	|--sub
|	|--libs
|	|	|--ace
|	|	|--handlebars
|	|	|--nprogress
|	|	|--semantic
|	|--stylesheets
|	|	|--sub
|-- routes
|-- views
|-- LICENSE.md
|-- README.md
|-- package.json
|-- Gruntfile.js
|-- app.js
```

###构建

首先确认你已配置好了nodejs和mongodb。

然后，在Leeven的根目录安装所依赖的node_modules:

```
npm install
```

Leeven使用Grunt构建项目，在安装好所有依赖项后，执行grunt即可运行项目

```
grunt
```