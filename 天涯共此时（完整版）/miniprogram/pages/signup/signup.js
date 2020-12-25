const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    radio: '1',
  },

  //性别选择
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  btnSub(res){
    var sex=res.detail.value.sex;
    var username=res.detail.value.username;
    var password=res.detail.value.password;

    if(username.length < 2) {
      wx.showToast({
        icon: 'none',
        title: '昵称至少2位',
      })
      return
    }

    if(username.length > 10) {
      wx.showToast({
        icon: 'none',
        title: '昵称最多10位',
      })
      return
    }

    if(password.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '学号不能为空',
      })
      return
    }
    
    db.collection("user").add({
      data:{
        sex:sex,
        username:username,
        password:password
      },
      success(res) {
        console.log('注册成功',res)
        wx.showToast({
          icon: 'success',
          title: '注册成功',
        })
        wx.navigateTo({
          url: '../signin/signin',
        })
      },
      fail(res){
        console.log('注册失败',res)
      }
    })
    // console.log(sex,username,password)
  },



  //上传头像
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
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
  onShareAppMessage: function () {
    
  },
  signin:function(){
    wx.navigateTo({
      url: '../signin/signin',
    })
  },
  // Go2MainPage:function(){
  //   wx.switchTab({
  //     url: '../index/index',
  //   })
  // }
});

