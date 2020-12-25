var app = getApp();
var data = app.data;
const db = wx.cloud.database();
const _ = db.command;
var imageslist=[];
var urlArr=[];
var filePath=[];
var tempid="123";
var xx="";
var yy="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirm:false,
    resData:[],
    datalist:[],
    imageslist:[],
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
    //获得当前时间
    // wx.getSetting({
    //   success (res){
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo)
    //           var userInfo = res.userInfo
    //           var nickName = userInfo.nickName
    //           var avatarUrl = userInfo.avatarUrl
    //           var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //           var province = userInfo.province
    //           var city = userInfo.city
    //           var country = userInfo.country
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
    // })
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
        var userInfo = res.userInfo
        xx = userInfo.nickName
        yy = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var nowtime=date.toLocaleString()

    var{title,content}=res.detail.value;

    db.collection("datalist-squre").add({
        data:{
          username:xx,
          userimage:yy,
          title:title,
          content:content,
          numlike:0,
          numstar:0,
          numchat:0,
          releasetime:"   "+nowtime,
          comment:[],
          images:imageslist,
        }
    }).then(res=>{
      console.log(res._id)
      tempid=res._id
    })

    wx.cloud.callFunction({
      name: 'getData',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })

  },

  updateData(ui) {
     console.log(ui);
     var{id,idx}=ui.currentTarget.dataset;
    db.collection("datalist-squre").doc(id
    ).update({
      data:{
        numlike:_.inc(1)
      }
    }).then(res=>{
      console.log(res)
    })
  },

  uploadpic(){
    wx.chooseImage({
      count: 4,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success:res=>{
        var filePath=res.tempFilePaths
        filePath.forEach((item,idx)=>{
          var filename=Date.now()+"_"+idx
          this.cloudFile(filename,item )
        }) 
      }
    })
  },

  cloudFile(filename,path){
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      cloudPath:filename+".png",
      filePath:path
    }).then(res=>{
      imageslist.push(res.fileID)
      // this.setData({

      //   picurl:res.fileID
      // })
      urlArr.push(res.fileID)
      if(filePath.length==urlArr.length){
        this.setData({
          urlArr
        })
      }
      wx.hideLoading()
    })
  },



  getData(){
     db.collection("datalist-squre").get()
    .then(res=>{
      this.setData({
        datalist:res.data
      })
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();

    
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
        var userInfo = res.userInfo
        xx = userInfo.nickName
        yy = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })


    db.collection("datalist-squre").watch({
      onChange:res=>{
        this.setData({
            datalist:res.docs
          })
      },
      onError:err=>{
        console.log(err)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})