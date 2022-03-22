// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    styleIsolation:'apply-shared'
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus:false,
    historyList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFocus(){
      this.triggerEvent('search')

      // wx.getStorage({
      //   key:"searchHistory",
      //   success: (res)=> {
      //     this.setData({
      //       historyList:res.data
      //     });
      //   }
      // })

      // this.setData({
      //   isFocus:true
      // });
    },
    handleCancel(){
      this.setData({
        isFocus:false
      });
    },
    handleConfirm(ev){
      //console.log(ev.detail.value);
      let cloneHistoryList=[...this.data.historyList];
      cloneHistoryList.unshift(ev.detail.value);
      wx.setStorage({
        key:"searchHistory",
        data:[...new Set(cloneHistoryList)]
      })
    },
    handleHistoryDelete(){
      wx.removeStorage({
        key: 'searchHistory',
        success: (res)=> {
          this.setData({
            historyList:[]
          });
        }
      })
    }
  }
})
