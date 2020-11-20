// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    checked1: true,
    checked2: true,
    checked3: true,
    checked4: true,
    checked5: true,
    currentDate: '12:00',
    minHour: 0,
    maxHour: 23,
    time:'12:00',
    show: false,
    
  },

  onTap() {
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ 
      show: false 
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },

  onChange1({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked1: detail });
  },

  onChange2({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked2: detail });
  },

  onChange3({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked3: detail });
  },

  onChange4({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked4: detail });
  },

  onChange5({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked5: detail });
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

  }
})