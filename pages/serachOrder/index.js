// pages/serachOrder/index.js
const api = require('../../utils/api')
const util = require('../../utils/util')
let baseObj = {
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

    this.setData({
     time:util.formatTime(new Date()).noHour,//获取当前系统时间
    })
  }
}
let apiObj = {}
let eventObj = {}
let pageObj = Object.assign(baseObj,apiObj,eventObj)
Page(pageObj)