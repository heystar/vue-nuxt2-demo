const pkg = require('./package')
const axios = require('axios')

module.exports = {
  mode: 'universal',

    /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
            { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

    /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

    /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css'],

    /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui'],

    /*
  ** Nuxt.js modules
  */
  modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
    /*
  ** Axios module configuration
  */
  axios: {
        // See https://github.com/nuxt-community/axios-module#options

    // 静态应用部署(npm run generate) 若不跨域需要设置baseURL
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://dev.nuxtdemo.com:3001/' : '',

    // 静态应用部署(npm run generate) 若跨域设置prefix,可配合nginx反向代理
    // prefix: '/apis/',

    // npm run dev,服务端渲染应用部署(npm run start) 跨域设置
    prefix: '/api/',
    proxy: true
  },

    /*
  ** Build configuration
  */
  build: {
        /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
            // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  proxy: {
    '/api/': {
      target: 'http://dev.nuxtdemo.com:3001', // api主机
      pathRewrite: { '^/api': '' }
    }
  },
  generate: {
    // routes: [
    //   '/demo/users/003',
    //   '/demo/users/004',
    //   '/demo/users/005'
    // ]
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
