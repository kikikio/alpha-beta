const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    showtime1: '',
    showtime2: '',
    showtime3: '',
    showtime4: '',
    currentDate: '12:30',
    minHour: 0,
    maxHour: 23,
    dataObj:"",
    openid:"",
    id:"",
  },

  confirm1(res){
    this.setData({ show1: false });
    this.setData({ showtime1: res.detail});
  },
  cancel1(){
    this.setData({ show1: false });
  },
  confirm2(res){
    this.setData({ show2: false });
    this.setData({ showtime2: res.detail})
  },
  cancel2(){
    this.setData({ show2: false });
  },
  confirm3(res){
    this.setData({ show3: false });
    this.setData({ showtime3: res.detail})
  },
  cancel3(){
    this.setData({ show3: false });
  },
  confirm4(res){
    this.setData({ show4: false });
    this.setData({ showtime4: res.detail})
  },
  cancel4(){
    this.setData({ show4: false });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  showPopup_start_date() {
    this.setData({ show1: true });
  },

  showPopup_end_date() {
    this.setData({ show2: true });
  },

  showPopup_clock() {
    this.setData({ show3: true });
  },

  showPopup_remind() {
    this.setData({ show4: true });
  },

  onClose1() {
    this.setData({ show1: false });
  },  
  onClose2() {
    this.setData({ show2: false });
  },  
  onClose3() {
    this.setData({ show3: false });
  },  
  onClose4() {
    this.setData({ show4: false });
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



  //提交表单添加进数据库 
  btnSub(res){
    wx.showToast({
      title: '添加成功✔',
    })
    // wx.showLoading({
    //   title: '添加成功',
    //   mask:true
    // })
    // var mission=res.detail.value.mission;
    // var remark=res.detail.value.remark;

    var {mission,startTime,endTime,punchTime,remindTime,remark}=res.detail.value;

    // console.log(mission,remark);

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
          mission:mission,
          startTime:startTime,
          endTime:endTime,
          punchTime:punchTime,
          remindTime:remindTime,
          remark:remark
        }
      }).then(res=>{
        console.log(res);
        // wx.hideLoading()
      });

    })

  },

})