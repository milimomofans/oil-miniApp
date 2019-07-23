//app.js
import {authorization} from './utils/login'
App({
  onLaunch: function () {
    // 展示本地存储能力
    authorization()
  },
  globalData: {
    userInfo: null
  }
})