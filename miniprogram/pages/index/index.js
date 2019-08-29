//index.js
const app = getApp()
var whatthefuck="1";
Page({
  
  data: {
      gradienn: '#FF0000',
      active: 'lesson',
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
    else if (event.detail == "my") {
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
  },

  onLoad: function() {

  }

})
