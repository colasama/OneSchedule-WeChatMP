// pages/todo/todo.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "todo",
    imageURL: "/pages/todo/soft.png"
  },
  importLesson:function(e){
    db.collection('timetable').where({
      _openid: 'o95Ms5HDzgck_wzAGxAAbfKreUzs',
    })
      .get({
        success: function (res) {//把这里写好就行了！！啊啊啊！！！
          console.log(res.data.length)
          for (var i = 0; i < res.data.length; i++) {
            db.collection('timetable').add({
              data: {
                day: res.data[i].lessonDay,
                lessonTime: res.data[i].lessonTime,
                lessonLength: 2,
                lessonName: res.data[i].lessonName,
                lessonPlace: res.data[i].lessonPlace,
              },
              success: function (res) {
                console.log(res)
                wx.switchTab({
                  url:"/pages/lessons/lessons"
                })
              }
            })
          }
        }
      })
    ;

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

  onChange(event) {
    console.log(event.detail);
    if (event.detail == "my") {
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
    else if (event.detail == "lesson") {
      wx.switchTab({
        url: '/pages/lessons/lessons'
      })
    }
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