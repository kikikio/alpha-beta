const db = wx.cloud.database()
const _ = db.command;
var tt;
var test;
var xx="";
var yy="";
// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    mainlist:[],
    openid:"",
    title:"",
  },
  onClick()
  {
    wx.showToast({
      title: 'Fork 成功！',
    })

    var openid = this.data.openid
    
    db.collection("plan_db").where({
      _openid:openid
    }).get().then(res=>{
      var data1 = res.data[0];
      this.setData({
        id:data1._id
      });

      db.collection("plan_db").doc(this.data.id).update({
        data:{
          mission:this.data.title,
        }
      }).then(res=>{
        console.log(res);
        // wx.hideLoading()
      });

    })




  },

  BtnSubmit(res){
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
    //获得当前时间
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var nowtime=date.toLocaleString()

    var{content}=res.detail.value;

    db.collection("datalist-squre").doc(test).update({
        data:{
          comment:_.push([
            {
              commentcontent:content,
              commentdate:nowtime,
              username:xx,
              userimage:yy
            }
          ])
        }
    }).then(res=>{
      console.log(res)
    })

    
    db.collection("datalist-squre").doc(test
    ).update({
      data:{
        numchat:_.inc(1)
      }
    }).then(res=>{
      console.log(res)
    })
    wx.showToast({
      title: '提交成功',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(res=>{
      this.setData({
        openid:res.result.openid
      })
    })

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


    test=options.id;
    tt=options.index;
    console.log(tt)
    console.log(test)
    db.collection("datalist-squre").doc(test).get()
    .then(res=>{
      this.setData({
        datalist:res.data.comment,
        mainlist:res.data,
        title:res.data.title,
      })
    })

    db.collection("datalist-squre").watch({
      onChange:res=>{
        this.setData({
            datalist:res.docs[tt].comment
          })
      },
      onError:err=>{
        console.log(err)
      }
    })
  

      wx.showLoading({
        title: '加载中，请稍后'
      })
      
      setTimeout(res => {
        wx.hideLoading()
      }, 1500)

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