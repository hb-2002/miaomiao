// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190423%2Fa531c2cc59b4432bae5901dec6a29df3.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647664567&t=afe7f0e1c94c1f290e143cbbce0a9d5d',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181221%2Fd9db888318a1413ea1166f134e2d94b7.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647664665&t=ee9029f8cf0fedafbd16cf903d2977b4',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftxt6-4.book118.com%2F2018%2F0302%2Fbook155493%2F155492365.jpg&refer=http%3A%2F%2Ftxt6-4.book118.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647664781&t=fb1d1470be97b5574a86780f01186df2'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  navtospecific :function(e){
    let id =e.currentTarget.id
    wx.navigateTo({
      url: '../specific/index?type='+id,
    })
  },


  search:function (e) {
    console.log(e)
    wx.reLaunch({
      url: '../infoList/infoList?type=areas',
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