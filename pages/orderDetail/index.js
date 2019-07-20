// pages/orderDetail/index.js
const api = require('../../utils/api')
const Qrcode = require('../../utils/weapp-qrcode')
let baseObj = {
  data: {

  },
  onLoad: function (options) {
    let qrcode = new Qrcode('Code',{
      text:`hello world`,
      width:120,
      height:120
    })
  },
  onShow: function () {

  },
}
let eventObj = {}
let apiObj = {}
let PageObj = Object.assign(baseObj,eventObj,apiObj)
Page(PageObj)