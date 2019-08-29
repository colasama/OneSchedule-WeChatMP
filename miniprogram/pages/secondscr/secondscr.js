// pages/secondscr/secondscr.js
const db = wx.cloud.database();
var extraLine = [];
var num = [1,2,3,4,5,6,7];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activenow:0,
    ne:[],
    tue:[1,2,3],
    stepsnow: [
      {
        text: '获取用户信息'
      },
      {
        text: '导入课表'
      },
      {
        text: '完成'
      }
    ]
  },
  
  lSearch: function(e){
    db.collection('timetable').doc('user').get({
      success: function (res) {
        console.log(res.data);
        this.setData({
          ne:res.data
        })
        console.log(ne)
      },
      fail: function(res){
        console.log("fail")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('timetable').doc('user').get({
      success: res =>{
        console.log(res.data)
        console.log("rua")
        that.setData({
          ne: res.data
        })
        console.log(ne)
        console.log("rua1")
        
      },
      fail: function (res) {
        console.log("fail")
      }
    })
    //extraLine.push('title'),
    //_this.setData({
    //  text:  extraLine.join('\n')
    //})
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