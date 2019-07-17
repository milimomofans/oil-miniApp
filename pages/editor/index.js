// pages/editor/index.js
const api = require('../../utils/api')
let baseObj = {
  data: {
    params:{
      carId:'',
      mobile:'',
      code:''
    }
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
}
let eventObj = {
  inputHandler(e){
    let {type} = e.currentTarget.dataset,
    setStr = `params.${type}`
    this.setData({
      [setStr]:e.detail.value
    })
  },
  getCode(){
    let check = new Check(),
    result = check.checkMobile.call(this)
    if(result){
      console.log('可以发送验证码了')
    }
  },
  submit(){
    let {params} =this.data,
    canSumbit = false,
    result = true
    params.carId.length > 0 && params.mobile.length > 0 && params.code.length > 0 ? canSumbit = true : ''

    if(canSumbit){
      let check = new Check()
      for(var i in check){
        result = check[i].call(this)
        if(!result){
          break
        }
      }
      
    }
  }
}
let apiObj = {}
let PageObj = Object.assign(baseObj,eventObj,apiObj)
Page(PageObj)

function Check(){
  this.checkCartId =function(){
    let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    if(reg.test(this.data.params.carId)){
      return true
    }else{
      wx.showToast({
        title:"车牌号输入有误",
        icon:"none",
        duration:1500
      })
      return false
    }
  }
  this.checkMobile = function(){
    if(this.data.params.mobile.length == 0){
      wx.showToast({
        title:"手机号不能为空",
        icon:"none",
        duration:1500
      })
      return false
    }

    let reg = /^1\d{10}$/
    if(reg.test(this.data.params.mobile)){
      return true
    }else{
      wx.showToast({
        title:"手机号输入有误",
        icon:"none",
        duration:1500
      })
      return false
    }
  }
}