let baseUrl = 'http://oil.gyouzhe.cn/'
function request({
    url=url,
    method="GET",
    data={},
    contentType = 'application/json'
}){
    let userInfo = wx.getStorageSync('userInfo'),
    token =userInfo.token || ''
    console.log(token)
    let p = new Promise((resolve,reject)=>{
        wx.request({
          url,
          method,
          header:{
            'content-type':contentType,
            'Accept':"application/json",
            token:token
          },
          data,
          success:(res=>{
            let {statusCode} = res
            if(statusCode == 200){
              resolve(res.data)
            }
          }),
          fail:(fail=>{
            // if(isone){
            //   isone = false
            //   wx.showToast({
            //     title:"网络超时啦,请稍后再试",
            //     icon:"none",
            //     duration:2000
            //   })            
            // }
            // setTimeout(()=>{
            //   isone = true
            // },2000)
          })
        })
      })
      return p
}

module.exports = {
    //微信登录
    wxLogin(data){
        // let url = baseUrl + 'wx/miniapp/authorize'
        let url = baseUrl + 'wx/miniapp/authorize'
        return request({
            url,
            contentType: 'application/x-www-form-urlencoded',
            data:data,
            method:"POST",      
        })
    },
    //获取用户的车牌手机号  
    getUserInfo(){
      let userId = wx.getStorageSync('userInfo').userId
      let url = baseUrl+`api/user/${userId}/info`
      return request({
        url,
        contentType:'application/x-www-form-urlencoded'
      })
    },
    //获取加油站列表
    getGas(data){
      let url = baseUrl+`api/gas`
      return request({
        url,
        data,
        contentType:"application/x-www-form-urlencoded"
      })
    },
    //获取加油站的油号等信息
    gasInfo(gasId){
      let url = baseUrl + `api/gas/${gasId}`
      return request({
        url,
        contentType:"application/x-www-form-urlencoded"
      })
    },
    //用户下单
    userTrade(params){
      let url = baseUrl + `api/trade`
      return request({
        url,
        data:params,
        contentType:"application/x-www-form-urlencoded",
        method:"POST"
      })
    },
    //订单列表获取  订单详情
    getOrderList(params){
      let url = baseUrl + `api/trade`
      return request({
        data:params,
        url
        // contentType:"application/x-www-form-urlencoded"
      })
    },
    getBanner(){
      let url = baseUrl + `api/banner`
      return request({
        url,
        contentType:"application/x-www-form-urlencoded"
      })
    }

}