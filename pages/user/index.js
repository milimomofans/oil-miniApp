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
      let haveGasOrder = true
      user.employId == 0 ? haveGasOrder = false : '' 
      this.setData({
        user,
        haveGasOrder
      })
    }
    this.getUserInfo()
  },
}
let eventObj = {
  goEditor(){
    wx.navigateTo({
      url:'/pages/editor/index'
    })
  }
}
let apiObj = {
  //获取用户的车牌号以及手机号
  getUserInfo(){
    api.getUserInfo().then(res=>{
      if(res.code == 200){
        this.setData({
          userInfo:res.data
        })
      }
    })
  },
  goLinkHandler(e){
    let {type} = e.currentTarget.dataset,
    linkUrl
    console.log(type)
    switch(type){
      case 'historyOrder':
          linkUrl = '/pages/order/index'
          break;
      case 'gasOrder':
          linkUrl = '/pages/gasOrder/index'
          break;    
    }
    wx.navigateTo({
      url:linkUrl
    })
  }
}
let pageObj = Object.assign(baseObj,eventObj,apiObj)
Page(pageObj)