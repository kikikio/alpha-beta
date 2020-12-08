const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    dataObj1: "",
    dataObj2: "",
    openid:"",
    id:"",
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    db.collection("plan_db").get().then(res=>{
      this.setData({
        dataObj1:res.data
      })
    })


    db.collection("plan_db").watch({
      onChange:res=>{
        this.setData({
          dataObj1:res.docs
        })
      },
      onError:err=>{
        console.log(err)
      }

    });

    db.collection("plan_db_fit").get().then(res=>{
      this.setData({
        dataObj2:res.data
      })
    });

    db.collection("plan_db_fit").watch({
      onChange:res=>{
        this.setData({
          dataObj2:res.docs
        })
      },
      onError:err=>{
        console.log(err)
      }

    });

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
      this.onLoad()
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
    
  },
  turnto1:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  turnto2:function(){
    wx.navigateTo({
      url: '../addMission/addMission',
    })
  },
  addGroup:function(){
    wx.navigateTo({
      url: '../addGroup/addGroup',
    })
  },
  Go2Tomato:function(){
    wx.navigateTo({
      url: '../tomato/tomato',
    })
  }
})