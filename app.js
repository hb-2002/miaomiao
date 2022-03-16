// app.js
App({
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
  onLaunch:function(){
    if(!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    } else{    
      wx.cloud.init({
        env:"qingnong-3g57h3kv0e3f2f4f",
       traceUser:true,
      })
      this.globalData={}
      this.userInfo={}
    }
  },
  globalData: {
    userInfo: null
  }

})
