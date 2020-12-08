//MyPersonalPage.js
const db = wx.cloud.database()
const app = getApp();
var data = app.data;

Page({
  //底栏
  data: {
    active: 0,
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  data: {
    confirm:false,
    dataObj:[],
    datalist:[]
  },

  closeit:function(){
    this.setData({
      confirm:false
    })
  },

  releaseit:function(){
    this.setData({
      confirm:false
    })
    wx.showToast({
      title: '发布成功',
    })
  },

  noteit:function(){
    wx.navigateTo({
      url: '/pages/note/note',
    })

  },

  releaseplan:function(res){
    this.setData({
      confirm:true
    })
  },



  onClick()
  {
    wx.showToast({
      title: 'Success',
    })
  },

  
  BtnSubmit(res){
    var resVlu=res.detail.value
    console.log(resVlu)

    db.collection("datalist-squre").add({
        data:resVlu
    }).then(res=>{
      console.log(res)
    })
  },

  //搜索框
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    wx.showToast({
      title: 'Success',
    })
    Toast('搜索' + this.data.value);
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

    //读历史计划数据
    db.collection("datalist-squre").get()
    .then(res=>{
      this.setData({
        datalist:res.data
      })
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
  releaseplan:function(){
    wx.navigateTo({
      url: '/pages/release/release',
    })
  },
})

