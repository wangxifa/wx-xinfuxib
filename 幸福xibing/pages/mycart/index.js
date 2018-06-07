const app = getApp();
Page({
  data: {
    list: [],
    allSelect: "circle",
    num: 0,
    count: 0,
  
  },
  onShow:function(options){
    //console.log(app.globalData.cartList);
    this.setData({
      list:app.globalData.cartList
    });
    this.count();
  },
  //改变选框状态
  change: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到选中状态
    var select = e.currentTarget.dataset.select

    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }

    //把新的值给新的数组
    var newList = that.data.list
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //加法
  addtion: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //默认99件最多
    if (num < 100) {
      num++
    }
    //把新的值给新的数组
    var newList = that.data.list
    newList[index].num = num

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //减法
  subtraction: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = that.data.list
    //当1件时，点击移除
    if (num == 1) {
      newList.splice(index, 1)
    } else {
      num--
      newList[index].num = num
    }

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //全选
  allSelect: function (e) {
    var that = this
    //先判断现在选中没
    var allSelect = e.currentTarget.dataset.select
    var newList = that.data.list
    if (allSelect == "circle") {
      //先把数组遍历一遍，然后改掉select值
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      list: newList,
      allSelect: select
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算数量
  countNum: function () {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = that.data.list
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        allNum += parseInt(newList[i].num)
      }
    }
    parseInt
    console.log(allNum)
    that.setData({
      num: allNum
    })
  },
  //计算金额方法
  count: function () {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = that.data.list
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        newCount += newList[i].num * newList[i].price
      }
    }
    that.setData({
      count: newCount
    })
  },
  
  
})
/*
购物车逻辑总结：1.将mycart页面的js的onLoad方法换成onShow方法,onLoad方法加载页面完成之后不再执行，
      onShow每次页面出现新的数据，就会重新调用一次，解决有时候第二次进入购物车页面遍历不出来数据的问题.
      2.将addCart方法的逻辑重构
        第一步还是判断购物车是否为空，保证第一件添加商品成功
        第二步，不为空的情况，定义一个索引index
        然后，遍历购物车数组，如果good.id==cartList[i].id，把这个i复制给index
        遍历完成后对index判断
        如果index==null,说明第二次添加商品不在购物车，直接push进去
        如果不为空，说明第二次添加的商品在购物车，将cartList[index].num++
*/