//index.js
const db = wx.cloud.database();
const app = getApp()
var whatthefuck="1";
Page({
  
  data: {
      gradienn: '#FF0000',
      ne:[],
      active: 'my',
      activedate: 'mon',
      listt: [{
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'line-height: 60rpx; color: red;'
        },
        children: [{
          type: 'text',
          text: whatthefuck,
        }]
      }]
    },

  onChange(event) {
    console.log(event.detail);
    if (event.detail=="todo")
    {
      wx.switchTab({
        url: '/pages/todo/todo'
      })
    }
    else if (event.detail == "lesson") {
      wx.switchTab({
        url: '/pages/lessons/lessons'
      })
    }
  },

  onLoad: function() {
    var that = this;
    db.collection('timetable').doc('user').get({
      success: res => {
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
  }

})
