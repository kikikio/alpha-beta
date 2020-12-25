Page({

  /**
   * 页面的初始数据
   */
  data: {
    // datalist:[
    //   {userimage:"/images/v2_pptv7e.png",username:"我要上清华",releasetime:"    2020-12-21",planname:"#清华大学考研计划#",images:"/images/v2_pq42gb.png",likenum:207,starnum:501,chatnum:288,sharenum:134},
    //   {userimage:"/images/v2_pptx0z.png",username:"柯小布",releasetime:"    2020-12-21",planname:"#福州大学考研计划#",images:"/images/v2_pq3jwr.png",likenum:207,starnum:501,chatnum:288,sharenum:134},
    //   {userimage:"/images/v2_pptukn.png",username:"明天不会根号",releasetime:"    2020-12-21",planname:"#厦门大学考研计划#",images:"/images/v2_ppzsfd.png",likenum:207,starnum:501,chatnum:288,sharenum:134}
    // ],
    confirm:false ,
    resData:[],
    datalist:[]
  },


  // afterRead(event) {
  //   const { file } = event.detail;
  //   // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  //   wx.uploadFile({
  //     url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
  //     filePath: file.url,
  //     name: 'file',
  //     formData: { user: 'test' },
  //     success(res) {
  //       // 上传完成需要更新 fileList
  //       const { fileList = [] } = this.data;
  //       fileList.push({ ...file, url: res.data });
  //       this.setData({ fileList });
  //     },
  //   });
  // },

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
    // wx.navigateTo({
    //   url: '/pages/release/release',
    // })

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

    db.collection("datalist").add({
        data:resVlu
    }).then(res=>{
      console.log(res)
    })
  },

  test:function(res){
    //var resVlu=res.detail.value
    console.log(resVlu)

    // db.collection("datalist").add({
    //     data:resVlu
    // }).then(res=>{
    //   console.log(res)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    db.collection("datalist-squre").get()
    .then(res=>{
      this.setData({
        datalist:res.data
      })
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