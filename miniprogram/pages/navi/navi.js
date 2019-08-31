// pages/navi/navi.js
const db = wx.cloud.database();
const app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    isImport:false,
    serial:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({})
    var that = this
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        var openide = res.result.openid
        // console.log(openide)
        that.setData({
          noopenid: openide,
          openid: openide
        })
        app.userIII = openide
        console.log("navi"+app.userIII)
        setTimeout(function rua() {
          db.collection('timetable').where({
            _openid: app.userIII,
          })
            .get({
              success: res => {
                wx.switchTab({
                  url: '/pages/lessons/lessons',
                })
              },
              fail: function (res) {
                wx.redirectTo({
                  url: '/pages/firstlaunch/index',
                })
              }
            })
        }, 1000)
      }
    })
    setTimeout(function rua() {
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