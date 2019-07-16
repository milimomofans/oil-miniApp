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
          console.log(result)
          let {code} = res,
          {iv,encryptedData,rawData,signature} = result.detail,
          apiParams = {
            code:code,
            encryptedData,
            iv,
            rawData,
            signature
          }
          api.wxLogin(apiParams).then(res=>{
            console.log(res)
          })
        }
      })
    }
  }
}
let pageObj = Object.assign(baseObj,apiObj,eventObj)
Page(pageObj)