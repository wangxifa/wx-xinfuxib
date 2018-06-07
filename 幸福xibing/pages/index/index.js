//index.js
//获取应用实例

const app = getApp()

Page({
  // activeIndex 是当前播放图片的下标
  data: {

    
    goods:[],
    movies: [
      '../../images/swiper-1.jpg',
      '../../images/swiper-3.jpg',
      '../../images/swiper-4.jpg',
      '../../images/swiper-5.jpg',
    ],
  },
  more: function () {
    wx.navigateTo({
      url: '../more/index'
    })
  },
  onReady: function () {
    this.getdata()
 // console.log(this.data.goods);

}, 

getdata:function() {
 wx.request({
   url: 'https://www.easy-mock.com/mock/5b155d075fbf7221e2fa6ea3/cxc/index',
   
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
backIndex: function () {
  wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
    url: '../index/index'

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

})
