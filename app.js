// app.js
App({
  globalData:{
    userInfo:{},
  },
  /*onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },*/
  onLaunch: async function(){
    let that = this
    if(!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    } else{    
      wx.cloud.init()
      const db =wx.cloud.database()
      try {
        let userInfo = db.collection("Users").get({
          success:(res)=>{
            that.globalData.userInfo = res.data[0]
          }
        })
      } catch (error) {
        this.globalData.userInfo = {}
      }
      this.globalData={}
    }
  },
  globalData: {
    userInfo: null
  }

})
