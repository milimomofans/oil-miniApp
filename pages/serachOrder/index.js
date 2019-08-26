// pages/serachOrder/index.js
const api = require('../../utils/api')
const util = require('../../utils/util')
let baseObj = {
  data: {
    gasOrder:[],
    pageParams:{
      pageNo:1,
      pageSize:10
    },
    haveNext:true
  },
  onLoad: function (options) {
    if(options.gasId){
      this.setData({
        gasId:options.gasId
      })
      this.getGasOrder()
    }
  },
  onShow: function () {

    // this.setData({
    //  time:util.formatTime(new Date()).noHour,//获取当前系统时间
    // })
  },
  onReachBottom(){
    if(this.data.haveNext){
      let {pageParams} = this.data
      this.setData({
        'pageParams.pageNo':pageParams.pageNo+1
      })
    }
  }
}
let apiObj = {
  getGasOrder(){
    let {pageParams,gasId} = this.data
    api.getGasOrder(gasId,pageParams).then(res=>{
      if(res.code == 200){
        let {data} = res.data
        if(data.length == 0){
          this.setData({
            haveNext:false
          })
        }else{
          let setStr = `gasOrder[${this.data.pageParams.pageNo - 1}]`
          this.setData({
            [setStr]:data
          })
        }
      }
    })
  }
}
let eventObj = {}
let pageObj = Object.assign(baseObj,apiObj,eventObj)
Page(pageObj)