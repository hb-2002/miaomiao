// pages/infoList/infoList.js
const app = getApp()
const db = wx.cloud.database()

let seasons = [
  [],
  ['全部','个人交通', '人口结构', '当地特产', '水电情况', '技术需求', '产品销售']
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    value: ['全部', '全部'],
    options: seasons,
    articles:[],
    users:[],
    major:[],
    area:[],
    type:'students', // 显示
    index:0,
    skip:0,
    limit:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Init(options)
  },

  Init(options){
    let type = options.type
    switch (type) {
      case 'students':
        this.loadSettings(this.loadUserInfo) 
      break;
      case 'areas':
        this.loadSettings(this.loadAreaInfo) 
        this.loadUser()

      break;
    
      default:
        break;
    }
    this.setData({type:type})
  },
  
  
  go: function (e) {
    console.log(e)
    let id = parseInt(e.currentTarget.id)
    wx.navigateTo({
      url: '../acticle/index',
      success: (res) => {
        res.eventChannel.emit("getPassage", this.data.articles[id])
      }
    })


  },

  handleLike: function (e) {
    let that = this

    // console.log(app.globalData.userInfo==undefined)
    if (app.globalData.userInfo==undefined) {
      wx.reLaunch({
        url: '../user/user',
      })
      return
    }

    let id = that.data.articles[parseInt(e.currentTarget.id)]._id
    const _ = db.command
    if (that.data.articles[parseInt(e.currentTarget.id)].liked) {
      let update = db.collection("Users").doc(that.data.userInfo._id).update({
        data: {
          likes: _.pull(id)
        },
        success: (res) => {
          that.setData({
            ["articles[" + parseInt(e.currentTarget.id) + "].liked"]: !that.data.articles[parseInt(e.currentTarget.id)].liked
          })
        }
      })
    }
    else {
      let update = db.collection("Users").doc(that.data.userInfo._id).update({
        data: {
          likes: _.push(id)
        },
        success: (res) => {
          
          that.setData({
            ["articles[" + parseInt(e.currentTarget.id) + "].liked"]: !that.data.articles[parseInt(e.currentTarget.id)].liked
          })
        }
      })
    }
  },


  onValueChange(e) {
    this.setData({ value: e.detail.value ,skip:0,articles:[]})
    this.loadAreaInfo()
    console.log('onValueChange', e.detail)
  },



 async  loadUser(){
    let userInfo = await db.collection("Users").get()
    this.setData({userInfo:userInfo.data[0]})
  },

  loadAreaInfo(){
    let options = {'type':'area'}
    if (this.data.value[0]!='全部') {
      options.area = this.data.value[0]
    }
    if (this.data.value[1]!='全部') {
      options.topic = this.data.value[1]
    }
    wx.cloud.callFunction({
      name:"getPassages",
      data:{
        action:"getHots",
        options:options,
        skip:this.data.skip,
        limit:this.data.limit
      },
      success:(res)=>{
        console.log(res)
        let articles = res.result.data.map((e)=>{
          e.liked = this.data.userInfo.likes.includes(e._id)
          return e
        })
        this.setData({
          'articles':this.data.articles.concat(articles),
          skip:articles.length==this.data.articles?this.data.skip:this.data.skip=5
        })
      }
    })
  },

  Show(e){
    this.setData({show:!this.data.show})
    this.setData({
      value:this.data.value,
      options:this.data.options
    })
  },
  loadUserInfo(){
    let options = this.data.index==0?{type:'学生'}:{major:this.data.major[this.data.index],type:'学生'}
    wx.cloud.callFunction({
      name:"getUsers",
      data:{
        action:'getUsers',
        skip:this.data.skip,
        limit:this.data.limit,
        options:options
      },
      success:(res)=>{
        this.setData({users:this.data.users.concat(res.result.data),skip:this.data.users.length==res.result.data.length?this.data.skip:this.data.skip+5})
      },
      fail:(err)=>{
        console.log(err)
      }
      
    })


  },

  loadSettings(loadInfo){
    console.log(123)
    db.collection("Settings").doc('636050766236fd4c009c14dc717f91f7').get({
      success:(res)=>{
        console.log(res)
        let major = res.data.majors
        major = ['全部'].concat(major)
        let area = ['全部'].concat(res.data.areas)
        this.setData({
          [`options[0]`]:area,
          major:major,
        })
        loadInfo()
      }
    })
  },

  bindPickerChange(e){
    if (e.detail.value == this.data.index) {
      return 
    }
    this.setData({
      index:e.detail.value,
      skip:0,
      limit:5,
      users:[]
    })
    this.loadUserInfo()
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
    this.loadAreaInfo()
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadUserInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})