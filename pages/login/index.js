// pages/login/index.js
const api = require('../../utils/api')
let baseObj = {
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
}
let apiObj = {}
let eventObj = {
  wxLogin(result){
    if(result.detail.errMsg == 'getUserInfo:ok'){
      wx.login({
        success:(res)=>{
          let {code} = res,
          {iv,encryptedData,rawData,signature} = result.detail,
          apiParams = {
            code:code,
            encryptedData,
            iv,
            rawData,
            signature
          }
          console.log(apiParams,'----------------11111111')
          api.wxLogin(apiParams).then(res=>{
            console.log(res)
            if(res.code == 200){
              wx.setStorageSync('userInfo',res.data)
              /**
               * fail to do 这里先跳进首页进行调试
               */
              wx.switchTab({
                url:"/pages/home/index"
              })
            }
          })
        }
      })
    }
  },
  noLogin(){
    wx.navigateBack({
      delta:1
    })
  }
}
let pageObj = Object.assign(baseObj,apiObj,eventObj)
Page(pageObj)