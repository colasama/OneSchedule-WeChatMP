// pages/secondscr/secondscr.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'000',
    grade:'2018',
    college:'软件学院'
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
  formSubmit:function(e){
    console.log(e.detail.value);
    var that=this;
    that.setData({
      id:e.detail.value.id,
      grade:e.detail.value.grade,
      college:e.detail.value.college,
    },() => {
      console.log(that.data.grade)
      db.collection('user').add({
        data: {
          idd:e.detail.value.id,
          grade:e.detail.value.grade,
          college:e.detail.value.college,
        },
        success: function(res) {
          wx.switchTab({
            url:"/pages/lessons/lessons"
          })
          console.log("successful create user:"+ res)
        }
      })
    })
  },
  onReady: function () {

  },

  onChange(event) {

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