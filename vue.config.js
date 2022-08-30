// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')



const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    // 配置域名
    host: "localhost",
    // 设置端口号
    port: 8080,
    // 设置项目启动成功，帮我们自动打开默认浏览器
    open: true,
    // 通过 proxy 来配置代理，从而解决开发环境的跨域问题
    // proxy: 'http://localhost:3005'
    // proxy: {
    //   "/api": {
    //     //匹配所有以'/api'开头的请求路径
    //     target: 'http://localhost:3000/api', // 代理目标的基础路径
    //     pathRewrite: { "^/api": "" }, // 代理往后端服务器的请求去掉/api前缀
    //     ws: true, // WebSocket
    //     changeOrigin: true,
    //   },
    // },
  },
})





