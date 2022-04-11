const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//设置代理，测试的时候使用
module.exports = {
  devServer:{
    host : 'localhost',
    port : 8080,
    proxy: {
      '/cors': {
        target: 'https://jwcjwxt1.fzu.edu.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/cors': ''
        }
      }
    }
  }
}