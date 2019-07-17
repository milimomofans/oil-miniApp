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
    wxLogin(data){
        // let url = baseUrl + 'wx/miniapp/authorize'
        let url = 'http://oil.gyouzhe.cn/wx/miniapp/authorize'
        return request({
            url,
            contentType: 'application/x-www-form-urlencoded',
            data:data,
            method:"POST",      
        })
    },
    getUserInfo(){
      let userId = wx.getStorageSync('userInfo').userId
      let url = `http://oil.gyouzhe.cn/api/user/${userId}/info`
      return request({
        url,
        contentType:'application/x-www-form-urlencoded'
      })
    }
}