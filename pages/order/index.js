// pages/order/index.js
const api = require('../../utils/api')
let baseObj = {
  data: {
    test:[
      1,2,3,4
    ]
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
}
let apiObj = {

}
let eventObj = {}
let PageObj = Object.assign(baseObj,apiObj,eventObj)
Page(PageObj)