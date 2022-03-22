// pages/specific/index.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skip: 0,
    limit: 5,
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Init(options)
  },

  Init: async function (options) {
    let type = options.type
    let userInfo = await db.collection("Users").get()
    this.setData({
      userInfo: userInfo.data[0],
      type: type
    })
    this.loadInfo()
  },

  loadInfo: function (e) {
    wx.cloud.callFunction({
      name: 'getPassages',
      data: {
        action: 'getHots',
        skip: this.data.skip,
        limit: this.data.limit,
        options: {
          topic: this.data.type
        }
      },
      success: (res) => {
        console.log(res)
        let articles = res.result.data.map((e) => {
          e.liked = this.data.userInfo.likes.includes(e._id)
          return e
        })
        this.setData({
          articles: this.data.articles.concat(articles),
          skip: this.data.articles.length == articles.length ? this.data.skip : this.data.skip + 5
        })
      }
    })
  },


  handleLike: function (e) {
    let that = this

    // console.log(app.globalData.userInfo==undefined)
    if (app.globalData.userInfo == undefined) {
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
    } else {
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
    this.loadInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})