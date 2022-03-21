// pages/index/index.js
wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    acticle_list: [],
    limit:5,
    skip:0,
    userInfo: {
    },

    imgUrls: []
    /*go:function(){
      wx.navigateTo({
        url:"https://m.sohu.com/a/523181037_121305415?_trans_=010004_pcwzy"
      })
    }*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getArticles()

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

   

  getArticles: async function () {
    wx.showLoading({
      title: '加载中',
    })
    let arcticles = await wx.cloud.callFunction({
      name: 'getPassages',
      data: {
        action: "getHots",
        limit: this.data.limit,
        skip: this.data.skip,
        options: {
          type: "hot"
        }
      }

    })


    let userInfo = await db.collection("Users").get()
    if (userInfo.data[0]) {
      userInfo = userInfo.data[0]
      for (let i = 0; i < arcticles.result.data.length; i++) {
        arcticles.result.data[i].liked = userInfo.likes.includes(arcticles.result.data[i]._id)
      }
    }
    let acticle_list = this.data.acticle_list.concat(arcticles.result.data)
    this.setData({ acticle_list:acticle_list, userInfo: userInfo ,skip:this.data.skip+5})
  wx.hideLoading()
    return arcticles.result.data

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
    let that = this
    this.getArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})