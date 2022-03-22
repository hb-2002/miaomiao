// pages/editUserInfo/editUserInfo.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    display:false,
    major:['计算机','化学化工'],
    area:["鄠邑","高新","莲湖"],
    name:"",
    phone:"",
    introduction:"",
    age:"",
    gender:'女',
    types: ['负责人','学生'],
    radioItems: [
      {name: '男', value: 'man'},
      {name: '女', value: 'woman', checked: 'true'}
    ],
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value==1) {
      this.setData({show:true,display:false})
    }
    else{
      this.setData({
        show:false,
        display:true,
      })
    }
    this.setData({
      index: e.detail.value
    })
  },

  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({show:true})
 
    this.setData({
      index2: e.detail.value
    })
  },

  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      index1: e.detail.value
    })
  },
  radioChange:function (e) {
    console.log(e)
    this.setData({gender:e.detail.value})
  },
  submit:function(){
    // 判读是否填写完成
   if(this.data.index==undefined || this.data.phone==""){
     //弹框
     wx.showToast({
       title: '请完成填写',
       icon:'error'
     })
     return
   }
   else{
     if(this.data.index==1 && this.data.index1==undefined){
       //弹框
       wx.showToast({
        title: '请完成填写',
        icon:'error'
      })
       return
     }
     if (this.data.index==0 && this.data.index2 == undefined) {
      wx.showToast({
        title: '请完成填写',
        icon:'error'
      })
       return
     }
   }
    // 将信息整合
    let major = ''
    let area = ''
    if (this.data.index==0) {
      major="无"
      area = this.data.area[this.data.index2]
    } else{
      major=this.data.major[this.data.index1]
      area = '无'
    }
    let info = {
      gender:this.data.gender,
      major:major,
      area:area,
      type:this.data.types[this.data.index],
      nickName:this.data.name,
      age:this.data.age,
      introduction:this.data.introduction,
      phone:this.data.phone,
    }

    wx.showLoading({
      title: '上传中',
    })
    db.collection("Users").doc(this.data.userInfo._id).update({
      data:info,
      success:(res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '上传成功',
          icon:'success'
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
    //提交数据库

  },
  check:function(e){
    if (e.detail.value.length!=11) {
      wx.showToast({
        title: '手机号应为11位',
        icon:'error'
      })
    }
  },

  bindPhone:function(e){
    this.setData({phone:e.detail.value});
   },
   bindName:function(e){
     this.setData({name:e.detail.value});
   },
   bindIntroduction:function(e){
    this.setData({introduction:e.detail.value});
   },
   bindAge:function(e){
    this.setData({age:e.detail.value});
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.loadSettings()
    let userInfo = await db.collection("Users").get()
    userInfo = userInfo.data[0]
    this.setData({
      userInfo:userInfo,
      name:userInfo.nickName?userInfo.nickName:'',
      age:userInfo.age?userInfo.age:'',
      introduction:userInfo.introduction?userInfo.introduction:'',
      phone:"+86" + userInfo.phone?userInfo.phone:''
    })
    console.log(userInfo)
  },

  loadSettings(){
    db.collection("Settings").doc('636050766236fd4c009c14dc717f91f7').get({
      success:(res)=>{
        console.log(res)
        this.setData({
          area:res.data.areas,
          major:res.data.majors
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