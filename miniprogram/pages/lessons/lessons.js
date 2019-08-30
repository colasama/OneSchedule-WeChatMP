import Toast from '/vant-weapp/toast/toast';
const db = wx.cloud.database();
var app = getApp();
app.globalData.userId=17637;
Page({
  data: {
    lessonDay:0,
    lessonTime: 0,
    lessonName:"",
    lessonPlace:"",
    active:"lesson",
    tabactive:0,
    show:true,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      { "day": 1, "lessonTime": 1, "lessonLength": 3, "lessonName": "工科数学分析","lessonPlace":"J3-205" },
      { "day": 1, "lessonTime": 5, "lessonLength": 3, "lessonName": "工科数学分析", "lessonPlace": "J3-205"  },
      { "day": 2, "lessonTime": 1, "lessonLength": 2,  "lessonName": "工科数学分析","lessonPlace":"J3-205"  },
      { "day": 2, "lessonTime": 6, "lessonLength": 2,  "lessonName": "工科数学分析","lessonPlace":"J3-205"  },
      { "day": 3, "lessonTime": 4, "lessonLength": 1,  "lessonName": "工科数学分析","lessonPlace":"J3-205"  },
      { "day": 3, "lessonTime": 1, "lessonLength": 1,  "lessonName": "工科数学分析","lessonPlace":"J3-205"  },
      { "day": 3, "lessonTime": 5, "lessonLength": 2,  "lessonName": "工科数学分析","lessonPlace":"J3-205"  },
    ]
  },
  onLoad: function () {

    console.log('onLoad')
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

  handleInputPlace: function (e) {
    var that = this;
    this.setData({
      lessonPlace: e.detail.value,
    })
  },

  addConfirm: function(e){
    var that = this
    db.collection('timetable').add({
      data: {
        _id: app.globalData.userId,// 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
         lesson:[
           app.globalData.userId,
           that.data.lessonDay,
           that.data.lessonTime,
           2,
           that.data.lessonName,
           that.data.lessonPlace,
         ]
      },
      success: function (res) {
        console.log(res)
      },
    })
    this.setData({
      show: false
    })
  },

  onClose(){
    this.setData({
      show:false,
    })
  }
})
