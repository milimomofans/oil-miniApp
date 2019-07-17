// pages/user/index.js
const api = require('../../utils/api')
let baseObj ={
  data: {
    user:{},
    userInfo:{}
  },
  onLoad: function (options) {
    let user = wx.getStorageSync('userInfo')
    if(user && user != ''){ //如果登录了就会有头像昵称信息
      this.setData({
        user
      })
    }
    this.getUserInfo()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  getUserInfo(){
    api.getUserInfo().then(res=>{
      console.log(res)
      if(res.code == 200){
        
      }
    })
  }
}
let eventObj = {
  goEditor(){
    wx.navigateTo({
      url:'/pages/editor/index'
    })
  }
}
let apiObj = {}
let pageObj = Object.assign(baseObj,eventObj,apiObj)
Page(pageObj)