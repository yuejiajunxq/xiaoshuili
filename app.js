//app.js
App({
  onLaunch: function () {
    //小程序初始化完成只执行一次
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);  
  },
  onShow: function(){
    var that = this;
    //启动小程序或者从后台进入前台
    wx.getClipboardData({
      success: function (res) {
        var content = res.data;
        var token = "";
        if (content != null && content !=  "") {
          var  reg  =  /[\u20ac\uffe5].*[\u20ac\uffe5]/g;
          var tokenArr = content.match(reg);
          if (tokenArr != null){
            that.dealTaotoken(tokenArr[0]);
          }        
        }
      }
    });
  },
  onHide: function(){
    //从前台进入后台
  },
  dealTaotoken: function (taoToken) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://www.xiaoshuili.xyz/scoupon/wx/searchByTaotoken.do',
      data: { taotoken: taoToken,token:token },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("data：" + res.data);
          if (res.data.item_id){
            wx.setStorageSync('taotokenItem', res.data);
            wx.navigateTo({
              url: '../item/item'
            });
          }
        } else {
          console.log(res.errMsg)
        }
      },
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    //全局信息
    userInfo:null
  },
})