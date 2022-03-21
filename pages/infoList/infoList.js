// pages/infoList/infoList.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    index:0,
    skip:0,
    limit:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Init()
  },

  Init(){
    this.loadSettings()
  },
  
  loadInfo(){
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
        this.setData({users:res.result.data})
      },
      fail:(err)=>{
        console.log(err)
      }
      
    })


  },



  loadSettings(){
    db.collection("Settings").doc('636050766236fd4c009c14dc717f91f7').get({
      success:(res)=>{
        console.log(res)
        let major = res.data.majors
        major = ['全部'].concat(major)
        this.setData({
          major:major
        })
        this.loadInfo()
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
      limit:5
    })
    this.loadInfo()
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