const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'assets', // 静态资源文件夹
  productionSourceMap: false,
  devServer: {
    port: 2333, // 端口号
    open: true,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}