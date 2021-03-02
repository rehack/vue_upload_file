/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 22:57:53
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-02-02 21:23:55
 */
var isPro = process.env.NODE_ENV === 'production';
// 引入jq需要加入以下代码
const webpack = require('webpack')
 // console.log('isPro:',isPro)
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
        '/api': {
            // target: 'http://47.104.135.56:7070/api',//这里后台的地址模拟的;应该填写你们真实的后台接口
            target: 'http://localhost:7070/',
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
        }
    }
  }

}