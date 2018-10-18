
# Vue Server-Side Rendering(SSR)
官网地址：https://ssr.vuejs.org/
# 什么是SSR？
在服务端获取数据进行解析渲染，生成html代码返回给前端

# 为什么要使用SSR?
1. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面
2. 更利于首屏渲染

# SSR的局限
1. 服务端压力较大
2. 开发条件受限
3. 学习成本相对较高

# Vue SSR 的几种实现方式
1. Node.js server (Webpack + Node)
2. 预渲染 (prerender-spa-plugin)
3. Nuxt.js

# 为什么选择Nuxt.js
- 基于 Vue.js
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- ES6/ES7 语法支持
- 打包和压缩 JS 和 CSS
- HTML头部标签管理
- 本地开发支持热加载
- 集成ESLint
- 支持各种样式预处理器： SASS、LESS、 Stylus等等
- 支持HTTP/2 推送

# vue-nuxt2-app

> vue nuxt2 demo


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 搭建指南
``` bash
# 使用脚手架
$ npx create-nuxt-app <项目名>
# 集成选择(Element UI + axios  + ESLint)
1. 在集成的服务器端框架之间进行选择:
- [x] None (Nuxt默认服务器)
- [ ] Express
- [ ] Koa
- [ ] Hapi
- [ ] Feathers
- [ ] Micro
- [ ] Adonis (WIP)
2. 选择您喜欢的UI框架:
- [ ] None (无)
- [ ] Bootstrap
- [ ] Vuetify
- [ ] Bulma
- [ ] Tailwind
- [x] Element UI
- [ ] Buefy
3. 选择你想要的Nuxt模式 (Universal or SPA)
- [x] Universal
- [ ] Single Page App
4. 添加 axios module 以轻松地将HTTP请求发送到您的应用程序中。
- [ ] no
- [x] yes
5. 添加 EsLint 以在保存时代码规范和错误检查您的代码。
- [ ] no
- [x] yes
6. 添加 Prettier 以在保存时格式化/美化您的代码。
- [x] no
- [ ] yes
```
## 配置ESLint规则
修改```.eslintrc.js```文件```rules```属性
```
    // 取消强制执行每行的最大属性数
    "vue/max-attributes-per-line": 0,
    // 允许空标签
    'vue/html-self-closing': 0,
    // 禁止弹窗
    'no-alert': 2,
    // 箭头函数必须有空格
    'arrow-spacing': 'error',
    // 函数定义时括号前面必须有空格
    'space-before-function-paren': [
      'error',
      'always'
    ],
    // 禁止使用var
    'no-var': 2,
    // 使用单引号
    'quotes': [
      'error',
      'single'
    ],
    // 代码末尾不加分号
    'semi': [
      'error',
      'never'
    ]
```
## 配置Sass
```
npm i sass node-sass sass-loader -D --registry=https://registry.npm.taobao.org
```
示例参考demo/sass

## 使用axios
API地址:https://axios.nuxtjs.org/
> 配置Proxy

修改nuxt.config.js，追加proxy属性
```
proxy: {
    '/api/': {
      target: 'http://dev.nuxtdemo.com:3001', // api主机
      pathRewrite: { '^/api': '' }
    }
}
```
修改axios属性
```
/*
** Axios module configuration
*/
axios: {
    // See https://github.com/nuxt-community/axios-module#options
prefix: process.env.NODE_ENV === 'production' ? '/' : '/api/',
proxy: true
},
```
> axios示例
```
// 你可能想要在服务器端获取并渲染数据。Nuxt.js添加了asyncData方法使得你能够在渲染组件之前异步获取数据。
async asyncData (app) {
    let { data } = await app.$axios.get('/api/v1/users').then(res => {
      return res
    })
    console.table(data)
    return {
      users: data
    }
}
```
示例参考/demo/data
## 使用plugins
插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。

示例参考/demo/ele-ui
## HTML 头部
Nuxt.js 使用了 vue-meta 更新应用的 头部标签(Head) and html 属性。
个性化特定页面的 Meta 标签
```
head () {
    return {
      title: '优购时尚商城-时尚服饰鞋包网购首选-优生活，购时尚！',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '优购网,优购时尚商城,优购网上鞋城' },
        { hid: 'description', name: 'description', content: '优购网-时尚服饰鞋包网购首选,经营耐克、阿迪达斯、Kappa、匡威、百丽、他她、天美意、森达等众多知名品牌,100%专柜正品,免费送货,10天退换货,提供愉悦购物体验!' }
      ]
    }
  }
```
示例参考/demo/head
## 使用Vuex
Nuxt.js 内置引用了 vuex 模块，所以不需要额外安装。

Nuxt.js 支持两种使用 store 的方式，你可以择一使用：

1. 普通方式： store/index.js 返回一个 Vuex.Store 实例
2. 模块方式： store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块 （当然，index 是根模块）

在store目录下新建根模块 index.js
```
export const state = () => {
  list: []
}

export const getter = () => {
  getList: state => state.list
}

export const mutations = {
  SET_LIST (state, data) {
    state.list = data
  }
}

export const actions = {
  async getList ({ commit }) {
    return this.$axios.get('/api/v1/users').then(res => {
      return commit('SET_LIST', res.data)
    })
  }
}

```
引用根模块
```
import { mapState } from 'vuex'
export default {
  fetch ({store, params}) {
    return store.dispatch('getList')
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  }
}
```
示例参考/demo/store
## 动态路由
在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录

示例参考/demo/data

注意：在 Nuxt.js 执行 generate 命令时，动态路由 会被忽略。

上面的目录结构，Nuxt.js 只会生成路由 / 对应的静态文件。（因为 /users/:id 是动态路由） 如果想让 Nuxt.js 为动态路由也生成静态文件，你需要指定动态路由参数的值，并配置到 routes 数组中去。

例如，我们可以在 nuxt.config.js 中为 /users/:id 路由配置如下：
```
generate: {
    routes: [
      '/demo/users/003',
      '/demo/users/004',
      '/demo/users/005'
    ]
  }
```
但是如果路由动态参数的值是动态的而不是固定的，应该怎么做呢？
```
const axios = require('axios')

module.exports = {
  generate: {
    routes: function (callback) {
      return axios.get('http://dev.nuxtdemo.com:3001/api/v1/users')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/demo/users/' + user.id
        })
        callback(null, routes)
      })
    }
  }
}
```
> 如果有多个接口,动态路由该怎么做呢？
## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```
部署
> 服务端渲染应用部署

```npm run build``` 生成.nuxt文件

```npm run start```

> 静态应用部署

```npm run generate``` 生成dist文件

注意两种部署方式```axios.prefix```的修改

> How to deploy on Netlify?

Press the "New site from Git" button on the Netlify dashboard. 

Authenticate with your repository host, select a repository to deploy, and continue. 

You should land on step 3: "Build options, and deploy!"

Configure:
1. Branch to deploy: master, or which-ever branch you prefer
2. Build command: npm run generate
3. Publish directory: dist

## 扩展 React Next.js
官网：https://nextjs.org/
