// pages/acticle/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acticle:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("getPassage",data=>{
      console.log(data)
      this.setData({acticle:data})
      if (data.type=='area') {
        this.loadRelated()
      }
    })
  },

  loadRelated:function (params) {
    wx.cloud.callFunction({
      name:'getUsers',
      data:{
        options:{
          type:'负责人',
          area:this.data.area
        },
        action:'getUsers',
        skip:0,
        limit:1
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          related:res.result.data[0]
        })
      }
    })    
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