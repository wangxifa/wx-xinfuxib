var that;

Page({
  data: {
    currentTab : 0,
    winHeight: null,
  },
  onLoad:function(options){
    that = this;

    if (options.id){
      this.setData({
        currentTab: options.id
      })
    }

    console.log(options.id)
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo( {
            success: function( res ) {
                that.setData( {
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight,
                });
            }
        });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    //获取全部订单信息
    var currentUser = Bmob.User.current();
    var Order = Bmob.Object.extend("Order");
    var query = new Bmob.Query(Order);
    query.equalTo("orderUser",currentUser.id); 
    query.descending('createdAt'); 
    query.find({
        success: function(result) {
            var allOrder  = [], //全部
              noPayment = [], //待付款
              shipments = [], //待发货
              Receiving = [], //待收货
              finish = [];//已完成
            
            for (var i = 0; i < result.length; i++) {
                var object = result[i];
                var status = "";

                var resData = {totalprice:object.get("totalprice"),remarks:object.get('remarks'),orderId:object.get('orderId'),status:status,orderDetail:object.get('orderDetail'),createdAt:object.createdAt};

                switch (object.get('status')) {
                case 0: //待付款
                    resData.status = "待付款";
                    noPayment.push(resData);
                  break;
                case 1: //已付款-->待发货
                    resData.status = "待发货";
                    shipments.push(resData);
                  break;
                case 2: //已发货-->待收货
                    resData.status = "正在配送";
                    Receiving.push(resData);
                  break;
                case 3: //已收货-->全部完
                    resData.status = "已完成";
                    finish.push(resData);
                  break;
                default://全部状态
              }
                allOrder.push(resData);
            }
       
            that.setData({
              allOrder: allOrder, //全部
              noPayment: noPayment, //待付款
              shipments: shipments, //待发货
              Receiving: Receiving, //待收货
              finish:finish
            })
        },
        error: function(error) {
            
        }
    })
    
  },
 
});
