var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 'todo'
  },

  bindGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
    } else {
      console.log("点击了拒绝授权");
    };
  },

  next: function(e){
      wx.redirectTo({
        url: '/pages/lessons/lessons',
      })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.userIII)
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        var openide = res.result.openid
        // console.log(openide)
        app.userIII=openide

        this.setData({
          noopenid: openide,
          oooooopenid: openide
        }) 
        console.log(app.userIII)
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
    wx.hideTabBar({});//快乐隐藏TabBar
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