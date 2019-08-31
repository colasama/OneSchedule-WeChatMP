// pages/my/my.js
const app=getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "my",
    id:app.id,
    grade:app.grade,
    college:app.college,
    list: ['蓝色', '绿色', '红色'],
    result: ['蓝色']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('user').where({
      _openid: app.userIII,
    })
      .get({
        success: function (res) {
          app.id=res.data[0].idd
          app.college = res.data[0].college
          app.grade = res.data[0].grade
          console.log(res.data)
          console.log(app.id)
          that.setData({
            id: res.data[0].idd,
            grade: res.data[0].grade,
            college: res.data[0].college
          })
        }
      })
  },

  editProfile:function(){
    wx.redirectTo({
      url:"/pages/realedit/edit"
    })
  },
  onChange(event) {
    console.log(event.detail);
    if (event.detail == "lesson") {
      wx.switchTab({
        url: '/pages/lessons/lessons'
      })
    }
    else if (event.detail == "todo") {
      wx.switchTab({
        url: '/pages/todo/todo'
      })
    }
  },

  onCChange(event) {
    this.setData({
      result: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() { },

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