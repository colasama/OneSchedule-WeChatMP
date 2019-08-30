import Toast from '/vant-weapp/toast/toast';
const db = wx.cloud.database();
var app = getApp();
Page({
  data: {
    openid:"1212",
    oooooopenid:"11",
    lessonDay:0,
    lessonTime:0,
    lessonName:"",
    lessonPlace:"",
    active:"lesson",
    tabactive:0,
    show:false,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: []
  },

  onLoad() {
    console.log(app.userIII)
    var that = this
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        var openide = res.result.openid
       // console.log(openide)
        that.setData({
          noopenid: openide,
          oooooopenid: openide
        })
        console.log(that.data.oooooopenid)
      }
    })
    this.viewLessons()
    console.log("overLoad" + app.globalData.userId)
  },
getOpenid() {

},
viewLessons(){
  var that=this
  console.log("fuck" + app.userIII)
    db.collection('timetable').where({
      _openid: app.userIII
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          that.setData({
            wlist: res.data
          })
          console.log(res.data)
        }
      })
  },

  onChange(event) {
    console.log(event.detail);
    if (event.detail == "todo") {
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

  onSelectChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onTimeClick: function(event){
    var that = this;
    that.setData({
      lessonTime: event.detail.index
    })
  },

  onDayClick: function (event) {
    var that = this;
    that.setData({
      lessonDay: event.detail.index
    })
  },

  addCancel: function(e){
    this.setData({
      show: false,
    })
  },

  handleInputLesson:function(e){
    var that=this;
    this.setData({
      lessonName:e.detail.value,
    })
  },

  addclick: function (e) {
    this.setData({
      show:true
    })
  },

  handleInputPlace: function (e) {
    var that = this;
    this.setData({
      lessonPlace: e.detail.value,
    })
  },

  showCardView:function(e){

  },

  addConfirm: function(e){
    var that=this;
    console.log("1")
    db.collection('timetable').where({
      _openid: that.data.openid,
      day: that.data.lessonDay + 1,
      lessonTime: that.data.lessonTime + 1
    })
      .get({
        success: function (res) {
          console.log("data.length=" + res.data[0]._id)
          db.collection('timetable').doc(res.data[0]._id).remove({
            success: function (res) {
              console.log(res.data)
            }
          })
        },
      })
    db.collection('timetable').add({
      data: {
        day: that.data.lessonDay + 1,
        lessonTime: that.data.lessonTime + 1,
        lessonLength: 2,
        lessonName: that.data.lessonName,
        lessonPlace: that.data.lessonPlace,
      },
      success: function (res) {
        console.log(res)
      },
    })
    this.setData({
      show: false
    })
    this.onLoad()
  },

  onClose(){
    this.setData({
      show:false,
    })
  }
})
