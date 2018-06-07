// pages/search/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info: null,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    imgUrls: [
      'https://images.pexels.com/photos/2814/bike-bicycle-garage.jpg?auto=compress&cs=tinysrgb&h=350',
      'https://images.pexels.com/photos/41506/pexels-photo-41506.jpeg?auto=compress&cs=tinysrgb&h=350',
      'https://images.pexels.com/photos/671915/pexels-photo-671915.jpeg?auto=compress&cs=tinysrgb&h=350',
      'https://images.pexels.com/photos/407294/pexels-photo-407294.jpeg?auto=compress&cs=tinysrgb&h=350',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b155d075fbf7221e2fa6ea3/cxc/index',

      success: (res) => {
        for (var i = 0; i < res.data.goods.length; i++) {
          if (options.id == res.data.goods[i].id) {
            this.setData({
              good_info: res.data.goods[i]
            })

          }
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  placeOrder: function () {
    var cartItem = {
      id: this.data.good_info.id,
      price: this.data.good_info.price,
      num: "1"
    };
    app.globalData.cardList.push(cartItem);
  },
  cart: function () {
    wx.switchTab({
      url: "../mycart/index"
    });
  },
  index: function () {
    wx.switchTab({
      url: "../index/index"
    });
  },
  addCart: function () {
    var good = this.data.good_info;
    var cartList = app.globalData.cartList;
    var cartItem = {
      id: good.id,
      name: good.title,
      url: good.image,
      price: good.price,
      num: 1,
      select: 'circle',
    };
    //判断购物车为空
    if (cartList.length > 0) {
      //不为空
      var index = null;//记录id商品在购物车的下标
      for (let i = 0; i < cartList.length; i++) {
        if(good.id == cartList[i].id){
          index = i;
        }
      }
      //如果index等于null,说明第二次添加id商品不在购物车里，直接Push进去
      if(index == null){
        cartList.push(cartItem);
      }else{
        //index不等于Null,那么第二次添加id商品在购物车，num++
        cartList[index].num++;
      }
    } else {
      //购物车为空直接Push进去
      cartList.push(cartItem);
    }

   // console.log(cartList);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
  }
})