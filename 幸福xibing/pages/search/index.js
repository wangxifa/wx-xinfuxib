// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    goods: [], //页面数据
    pagination: 0, //页码
    pageSize: 8, //每页数据
    nodata: true, //无数据
    searchVal:""
  },
  // backIndex: function () {
  //   wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
  //     url: '../search/index'
  
  //   })
  // },
  bindKeyInput: function (e) {
    this.setData({
      searchVal: e.detail.value,
      // searchVal:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },

  clear(){
    this.setData({
    
      searchVal: "",
      
    });
    this.getdata()
  },
search: function(){
      // var pattern = /和/;
      // var str = "和";
      // console.log(str.search(pattern));
      var tem=[];
      for(var i=0;i<this.data.goods.length;i++)
      {
        var re = new RegExp(this.data.searchVal);
        if(re.test(this.data.goods[i].title))
        {
          tem.push(this.data.goods[i]);
        }
      }
      this.setData({
        goods : tem 
      }) 
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
   onReady: function () {
       this.getdata()
    // console.log(this.data.goods);

  }, 

  getdata:function() {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b155d075fbf7221e2fa6ea3/cxc/search',
      
      success: (res) =>{
       // console.log(res.data);
         // success
         this.setData({
           goods:res.data.goods
         })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
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