const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  btnSub(res){
    var username=res.detail.value.username;
    var password=res.detail.value.password;
    
    db.collection("user").where({
      username: username
    }).get({
      success(res) {
        console.log("获取数据成功", res)
        var user1 = res.data[0]
        console.log("user1", user1)
        if (password == user1.password) {
          console.log('登陆成功')
          wx.showToast({
            title: '登陆成功',
          })
          wx.reLaunch({
            url: '../index/index',
        })
          //保存用户登陆状态
          wx.setStorageSync('user1', user1)
        } else {
          console.log('登陆失败')
          wx.showToast({
            icon: 'none',
            title: '学号或昵称不正确',
          })
        }
      },
      fail(res) {
        console.log("获取数据失败", res)
      }
    })
  },


  onShareAppMessage: function () {
    
  },
  // Go2MainPage:function(){
  //   wx.switchTab({
  //     url: '../index/index',
  //   })
  // }
})