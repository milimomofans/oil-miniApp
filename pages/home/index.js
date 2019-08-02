// pages/home/index.js
const api = require('../../utils/api')
let BaseObj = {
  data: {
    Model:[
      1,2,3,4,5
    ],
    ListParams:{
      lat:'',
      lng:'',
      pageNo:1,
      pageSize:20
    },
    gasInfo:{},
    haveNext:true,
    GasList:[],
    showList:false,
    curOil:'',
    curOilGanId:'',
    Price:"",
    falseData:[
      1,2,3
    ]
  },
  onLoad: function (options) {
    this.getAuthorization()
  },
  onShow: function () {
    // this.getUserInfo()
  },
}
let ApiObj = {
  getUserInfo(){
    api.getUserInfo().then(res=>{
      console.log(res)
      if(!checkIsNull(res.data)){
        wx.showModal({
          content:"请完善个人资料，更多优惠等着您！",
          showCancel:false,
          confirmText:"前往",
          confirmColor:"#FF973D",
          success:()=>{
            wx.navigateTo({
              url:"/pages/editor/index"
            })
            console.log('点击了前往')
          }
        })
      }
    })
  }
}
let EventObj = {
  OpenList(){
    let {GasList} = this.data
    if(GasList.length == 0){
      this.GetList()
    }
    this.setData({
      showList:!this.data.showList
    })
    
  },
  //获取油站列表
  GetList(){
    let {ListParams,GasList} = this.data
    api.getGas(ListParams).then(res=>{
      if(res.code == 200){
        let {data} = res,
        str = `GasList[${ListParams.pageNo-1}]`
        if(data.length > 0){
          this.setData({
            [str]:data
          })
        }else{
          this.setData({
            haveNext:false
          })
        }
      }
    })
  },
  scrollTolower(){
    if(this.data.haveNext){
      let {ListParams} = this.data
      this.setData({
        'ListParams.pageNo':ListParams.pageNo+1
      })
      this.GetList()
    }
  },
  /**
   * 查看经纬度授权
   */
  getAuthorization(){
    let str = 'scope.userLocation'
    wx.getSetting({
      success:(res)=>{
        if(res.authSetting[str] == undefined){
          LocationHandler.call(this)
        }else if(res.authSetting[str] == true){
          LocationHandler.call(this)
        }else{
          wx.showModal({
            content:"请求获取您的位置信息以便精确搜索最近的油站",
            confirmText:"前去授权",
            cancelText:"取消授权",
            success:(res)=>{
              if(res.confirm){
                wx.openSetting({
                  success:()=>{
                    this.getAuthorization()
                  }
                })
              }
            }

          })
        }
      }
     
    })
  },
  /**
   * 
   * 获取选择的油站信息
   */
  getGasInfo(e){
    let {gasid} = e.currentTarget.dataset
    console.log()
    api.gasInfo(gasid).then(res=>{
      console.log(res)
      if(res.code == 200){
        console.log(res.data)
        let curOil = res.data.oils[0],
        curName = res.data.name.replace(/[\r\n]/g,""),
        setObj = {
          gasInfo:res.data,
          showList:false,
          curOil,
          curOilid:curOil.id,
          curGasName:curName
        }
        /**
         * 如果有油枪型号则默认选择第一个油枪
         */
        if(curOil.oilGuns && curOil.oilGuns.length > 0){
          setObj.curOilGanId = curOil.oilGuns[0].id
        }

        this.setData(setObj)
      }
    })
  },
  changeOil(e){ //选择油号
    let {oilid} = e.currentTarget.dataset
    this.setData({
      curOilid:oilid
    })
  },
  changeOilGan(e){ //选择油枪
    let {oilganid} = e.currentTarget.dataset
    this.setData({
      curOilGanId:oilganid
    })
  },
  inputPrice(e){  //输入价格事件
    this.setData({
      Price:e.detail.value
    })
  },
  Pay(){  //fail to do 需要支付接口一套流程
    let {curOil,curOilGanId,Price,oilId} = this.data
    if(curOil.length > 0 && curOilGanId.length > 0 && Price > 0){
      return false
    }
    let params = {
      gasId:curOil.id,
      oilId:oilId,
      gunId:curOilGanId,
      amount:Price
    }
    api.userTrade(params).then(res=>{
      console.log(res)
      if(res.code == 200){
        
      }
    })
  }
}
/**
 * 获取经纬度操作
 */
function LocationHandler(){
  wx.getLocation({
    type:"wgs84",
    success:(res)=>{
      let latStr = `ListParams.lat`,
      lngStr = `ListParams.lng`
      this.setData({
        [latStr]:res.latitude,
        [lngStr]:res.longitude
      })
    },
    fail:(res=>{
      wx.showModal({
        content:"取消授权无法精确搜索最近的油站",
        confirmText:"前去授权",
        cancelText:"取消授权",
        success:(res)=>{
          if(res.confirm){
            wx.openSetting({
              success:()=>{
                this.getAuthorization()
              }
            })
          }
        }
      })
    })
  })
}

function checkIsNull(data){
  if(!data) return false

  let checkKeys = ['carLicense','phone']
  return checkKeys.every(item=>{
    return data[item] && data[item].length > 0
  })

}

let PageObj = Object.assign(BaseObj,ApiObj,EventObj)
Page(PageObj)