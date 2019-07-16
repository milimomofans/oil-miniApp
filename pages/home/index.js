// pages/home/index.js
let BaseObj = {
  data: {
    Model:[
      1,2,3,4,5
    ]
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
}
let ApiObj = {

}
let EventObj = {
  test(){
    console.log(123)
  }
}
let PageObj = Object.assign(BaseObj,ApiObj,EventObj)
Page(PageObj)