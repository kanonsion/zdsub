module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'assets', // 静态资源文件夹
  productionSourceMap: false,
  devServer: {
    port: 2333, // 端口号
    open: true,
    proxy: null // 设置代理
  },
}