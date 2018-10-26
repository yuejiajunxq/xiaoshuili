Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src:'../../images/logo.jpg',
    show:false
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //眺到main页面
          that.storeUserInfo();
          that.getToken();
          // wx.navigateTo({url: '../main/main'});
          // that.setData({ show: true });
        }else{
          that.setData({show: true });
        }
      }
    })
  },
  storeUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        wx.setStorageSync('userInfo', res.userInfo);  
        console.log(res.userInfo);
      }
    });
  },
  getToken: function (upUser) {
    var that = this;
    var token = wx.getStorageSync('token');
    // 登录
    wx.login({
      success: res => {
        // ------ 获取凭证 ------
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          // ------ 发送凭证 ------
          wx.request({
            url: 'https://www.xiaoshuili.xyz/scoupon/wx/xcxLogin.do',
            data: { code: code,token:token },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            success: function (res) {
              if (res.statusCode == 200) {
                console.log("获取到的openid为：" + res.data);
                if (!(res.data.token == token) && res.data.token!= null ){
                  wx.setStorageSync('token', res.data.token);
                  if(upUser){
                    that.upUserInfo();
                  }
                } 
                wx.navigateTo({ url: '../main/main' });
                // that.globalData.openid = res.data
                // wx.setStorageSync('openid', res.data)
              } else {
                console.log(res.errMsg)
              }
            },
          });
        } else {
          console.log('获取用户登录失败：' + res.errMsg);
        }
      }
    });
  },
  upUserInfo: function (){
    var userInfo = wx.getStorageSync('userInfo');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://www.xiaoshuili.xyz/scoupon/wx/upUserInfo.do',
      data: { userPic: userInfo.avatarUrl, userNick: userInfo.nickName,token:token },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'  },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("upUserInfo：" + res.data);
        } 
      },
    });
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮，眺到main页面
      this.storeUserInfo();
      this.getToken(true);
    }else{
      this.getToken();
    }
    
  }
  
})