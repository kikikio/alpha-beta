const db = wx.cloud.database()
const app = getApp();
var data = app.data;

Page({
  //底栏
  onChange(event) {
    this.setData({ active: event.detail });
  },
  data: {
      active:0,
  },
  data: {
    confirm:false,
    dataObj:[],
  },

  //监听页面加载
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //读个人信息数据
    db.collection("personalData").get({    //.where(place:"中国")
      success:res=>{
        console.log(res.data)
        this.setData({
          dataObj:res.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  Go2Gmsg:function(){
    wx.navigateTo({
      url: '../Inform/Inform',
    })
  },
  Go2Mpp:function(){
    wx.navigateTo({
      url: '../MyPersonalPage/MyPersonalPage',
    })
  },
  Go2Setting:function(){
    wx.navigateTo({
      url: '../setting/index',
    })
  },
  Go2selectRole:function(){
    wx.navigateTo({
      url: '../selectRole/selectRole',
    })
  }
})

