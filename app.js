//app.js
import {authorization} from './utils/login'
App({
  onLaunch: function () {
    // 展示本地存储能力
  },
  globalData: {
    userInfo: null
  },
  onShow(){
    // let {query} = e
    // if(!query.hasOwnProperty('from')){
    //    authorization()
    // }
  }
})