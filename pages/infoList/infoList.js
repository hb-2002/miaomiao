// pages/infoList/infoList.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      case 'students':this.loadSettings(this.loadUserInfo) 
      break;
      case 'areas':this.loadSettings(this.loadAreaInfo) 
      break;
    
      default:
        break;
    }
    this.setData({type:type})
  },
  
  loadAreaInfo(){
    
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
        this.setData({
          major:major,
          area:['全部'].concat(res.data.areas)
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