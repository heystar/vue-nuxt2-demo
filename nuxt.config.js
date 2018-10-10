const pkg = require('./package')

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
    prefix: process.env.NODE_ENV === 'production' ? '/' : '/api/',
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
  }
}
