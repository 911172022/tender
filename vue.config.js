const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const publicPath = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: publicPath,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    host: '0.0.0.0',
    port: 8083,
    proxy: {
      '/institute_oa': {
        // 目标 API 地址
        // target: 'http://192.168.0.182:8081/',  //分支的后台接口
        target: 'http://192.168.0.151:8095/',  //分支的后台接口
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/institute_oa': '/institute_oa'
        }
      }
    }
  }
}
