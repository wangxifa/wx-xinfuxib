// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      
      {name:'蛋糕',id:'one'},
      {name:'配件',id:'two'},
      {name:'服装',id:'three'},
      {name:'电器',id:'four'},
      {name:'洗护',id:'five'},
      {name:'饮食',id:'six'},
      {name:'餐厨',id:'seven'}

    ],
    curIndex: 0,
    detail:[],
    toView:'one'
  },
  switchCategory (e) {
    this.setData({
      toView:e.currentTarget.dataset.id,
      curIndex: e.currentTarget.dataset.index?                                  
       e. currentTarget.dataset.index: 0
    })
    
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  wx.request({
    url: 'https://www.easy-mock.com/mock/5b155d075fbf7221e2fa6ea3/cxc/xcx',
    
    success: (res) =>{
       // success
       this.setData({
         detail:res.data
       })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
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
