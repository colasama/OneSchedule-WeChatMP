import Toast from '/vant-weapp/toast/toast';
const db = wx.cloud.database();
var app = getApp();

const buttons = [{
  label: 'lessonAdd',
  icon:"./resources/add.png",
},
{
  label: 'lessonDelete',
  icon: "./resources/delete.png",
}
]

Page({
  data: {
    openid:"1212",
    oooooopenid:"11",
    lessonDay:0,
    lessonTime:0,
    lessonName:"",
    lessonPlace:"",
    tabactive: 0,
    tabdayactive:0,
    active:"lesson",
    show:false,
    deleteshow:false,
    buttons,
    colorArrays: ["linear-gradient(45deg,#f2709c, #ff9472)", "linear-gradient(45deg,#FFF886, #F072B6)", "linear-gradient(45deg,#3C8CE7, #00EAFF)", "linear-gradient(45deg,#FF512F, #DD2476)", "linear-gradient(45deg,#24C6DC, #514A9D)", "linear-gradient(45deg,#E55D87, #5FC3E4)", "linear-gradient(45deg,#F05F57, #360940)", "linear-gradient(45deg,#4CB8C4, #3CD3AD)"],
    wlist: []
  },

  onLoad() {
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
      }
    })
    setTimeout(function rua(){
      console.log(app.userIII)
      that.viewLessons()
    },1500)
  },
fabButtonClick(e) {
  if(e.detail.index==0)
  {
    this.setData({
      show: true
    })
  }
  else
  {
    this.setData({
      deleteshow: true
    })
  }
},
viewLessons(){
  var that=this
  console.log("fxxk" + app.userIII)
    db.collection('timetable').where({
      _openid: that.data.openid
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

  onTimeClick: function(event){
    var that = this;
    that.setData({
      lessonTime: event.detail.index
    })
    console.log("Time is " + this.data.lessonTime)
  },

  addDelete:function(e){
    var that = this;
    console.log("fxxkkkk"+that.data.lessonDay)
    db.collection('timetable').where({
      _openid: app.userIII,
      day: that.data.lessonDay + 1,
      lessonTime: that.data.lessonTime + 1
    })
      .get({
        success: function (res) {
          db.collection('timetable').doc(res.data[0]._id).remove({
            success: function (res) {
              console.log("success delete")
              that.onLoad()
              that.setData({
                deleteshow:false
              })
            }
          })
        },
      })
  },

  onDayClick: function (event) {
    var that = this;
    that.setData({
      lessonDay: event.detail.index
    })
    console.log("Day is " + that.data.lessonDay)
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
    console.log(e.detail)
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
    db.collection('timetable').where({
      _openid: app.userIII,
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
        complete: function(res){
          db.collection('timetable').add({
            data: {
              day: that.data.lessonDay + 1,
              lessonTime: that.data.lessonTime + 1,
              lessonLength: 2,
              lessonName: that.data.lessonName,
              lessonPlace: that.data.lessonPlace,
            },
            success: function (res) {
              console.log("successful upload")
              that.setData({
                show: false,
                lessonDay: 0,
                lessonTime: 0,
                lessonName: "",
                lessonPlace: "",
                tabactive: 0,
              })
              that.onLoad()
            },
          })

        }
      })

  },

  onClose(){
    this.setData({
      show:false,
    })
  },

  onDeleteClose() {
    this.setData({
      deleteshow: false,
    })
  }
})
