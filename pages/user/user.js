// pages/user/user.js

const app=getApp()
const db =wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userPhoto:"/images/user/user.jpg",
    nickName:"白小哈",
    logged:false,
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    db.collection("Users").get({
      success:(res)=>{
        console.log(res)
        this.setData({
          userPhoto:res.data[0].userPhoto,
          nickName:res.data[0].nickName,
          userInfo:res.data[0],
          logged:true
        })
      }
    })
    


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {


    // let userInfo = await db.collection("Users").get()

    // if (userInfo.data.length==0) {
    //   this.setData({logged:false})
    // }
    // else{
    //   this.setData({
    //     nickName:userInfo.data[0].nickName,
    //     userPhoto:userInfo.data[0].userPhoto,
    //     logged:true,
    //   })
    // }



    // wx.cloud.callFunction({
    //   name:'login',
    //   data:{}
    // }).then((res)=>{
    //   //console.log(res);
    //   db.collection('Users').where({
    //     _openid:res.result.openid
    //   }).get().then((res)=>{
    //     if(res.data.length){
    //       app.userInfo=Object.assign(app.userInfo,res.data[0]);
    //     this.setData({
    //     userPhoto:app.userInfo.userPhoto,
    //     nickName:app.userInfo.nickName,
    //     logged:true
    //   });
    //     }
    //     else{
    //       this.setData({
    //         disabled:false
    //       });
    //     }
    //   });
    //   });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      // userPhoto:app.userInfo.userPhoto,
      // nickName:app.userInfo.nickName
    });
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

  },
  bindGetUserInfo(ev){
    // console.log(ev);
    wx.getUserProfile({
      desc:"用于登录",
      success:(res)=>{
        this.setData({userPhoto:res.userInfo.avatarUrl,nickName:res.userInfo.nickName,logged:true})
        db.collection("Users").add({
          data:{
            userPhoto:res.userInfo.avatarUrl,
            nickName:res.userInfo.nickName,
            likes:[]
          },
          success:(res)=>{
            app.globalData.userInfo = db.collection("Users").get()
          }
        })
      }
    })
  }
})