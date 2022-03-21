// pages/list/list.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acticle_list: [],
    userInfo: app.globalData.userInfo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("Users").get({
      success: (res) => {
        this.setData({ userInfo: res.data[0] })
        if (res.data[0].likes != 0) {
          this.loadColloction()
        }
      }
    })
  },
  go: function (e) {
    console.log(e)
    let id = parseInt(e.currentTarget.id)
    wx.navigateTo({
      url: '../acticle/index',
      success: (res) => {
        res.eventChannel.emit("getPassage", this.data.acticle_list[id])
      }
    })


  },
  loadColloction: function (e) {
    let that = this
    wx.cloud.callFunction({
      name: 'getPassages',
      data: {
        action: 'getCollections',
        collections: that.data.userInfo.likes,
      },
      success: (res) => {
        console.log(res)
        let acticle_list = res.result.data
        console.log(acticle_list)
        acticle_list = acticle_list.map((e) => {
          e.liked = true
          return e
        })

        that.setData({
          acticle_list: acticle_list,
          length: res.result.data.length
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })


  },

  handleLike: function (e) {
    let that = this
    let id = that.data.acticle_list[parseInt(e.currentTarget.id)]._id
    const _ = db.command
    if (that.data.acticle_list[parseInt(e.currentTarget.id)].liked) {
      let update = db.collection("Users").doc(that.data.userInfo._id).update({
        data: {
          likes: _.pull(id)
        },
        success: (res) => {
          that.setData({
            ["acticle_list[" + parseInt(e.currentTarget.id) + "].liked"]: !that.data.acticle_list[parseInt(e.currentTarget.id)].liked
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
            ["acticle_list[" + parseInt(e.currentTarget.id) + "].liked"]: !that.data.acticle_list[parseInt(e.currentTarget.id)].liked
          })
        }
      })
    }
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