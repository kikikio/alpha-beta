// pages/person/person.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  // data: {
  //   place: "中国",school:"福州大学",dept:"计算机系",name:"猫",
  //   currentDate: '2000',
  //   minHour: 0,
  //   maxHour: 23,
  //   time:'2000',
  //   show: false,
  //   radio: '1',
  // },
  data: {
    dataObj:""
  },
  //读数据库
  // getData(){
  //   db.collection("personalData").doc("0bcbdde05fc4428e0070c8d47b7ac9c8").get({    //.where(place:"中国")
  //     success:res=>{
  //       console.log(res)
  //       this.setData({
  //         dataObj:res.data
  //       })
  //     }
  //   })
  // },

  //提交表单进数据库
  sub(res){
    var resValue = res.detail.value
    db.collection("personalData").add({
      data:resValue
    }).then(res=>{
      console.log(res)
    })
  },
  onTap() {
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ 
      show: false,
      gender: 0,
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(res=>{
      console.log(res.result.openid)
    })
    // db.collection('personalData').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //     place: "中国",school:"福州大学",dept:"计算机系",name:"猫",
    //     currentDate: '2000',
    //     minHour: 0,
    //     maxHour: 23,
    //     time:'2000',
    //     show: false,
    //     radio: '1',
    //   },
    //   success: function(res) {

    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })
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
})