Page({
  data: {
    itemdata: {},
    itemimgs: [],
    currentIndex: 1
  },
  onLoad: function (options) {
    console.log("接收到的参数是str=" + options.taotoken);
    this.taoTokenExtract();
  },
  taoTokenExtract: function(){
    var that = this; 
    that.searchByTaotoken();
  },
  setCurrent: function (e) {  //当前图片索引
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  cpTaotoken: function (e) {  //当前图片索引
    var taoToken = this.data.itemdata.taoToken;
    wx.setClipboardData({
      data: taoToken,
      success: function () {
        wx.showToast({ title: '成功', icon: 'success', duration: 2000 });
      }
    });
  },
  cpCouponLinkTaotoken: function (e) {  //当前图片索引
    var couponLinkTaoToken = this.data.itemdata.couponLinkTaoToken;
    if (couponLinkTaoToken==null){
      return;
    }
    wx.setClipboardData({
      data: couponLinkTaoToken,
      success:function(){
        wx.showToast({ title: '成功', icon: 'success', duration: 2000 });
      }
    });
  },
  imgPreview: function () { //图片预览
    const imgs = this.data.itemimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex - 1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  searchByTaotoken: function (taoToken) {
    
    var item = {
      "category_id": "50002768",
      "content": "松下家用冷热风折叠电吹风机NA59NA45恒温不伤发纳米水负离子风筒",
      "coupon_click_url": "https://uland.taobao.com/coupon/edetail?e=j6TaBs2SHQ0GQASttHIRqaoOJQ5yo+v7SbK3aSOXncp7b1HSTOdahEEIgdtpfDHAbE5gPr5RDM/Fcrzwlzyx8L9fwBwwUiqlnXKZhqqrAiChrqnsx7/c+cHVq/dxq/DATJnbK5InWznd4dRbTb5WN9VqM6BWlz38UtqM5E5JIeWfp4OSS/YNFIScTMc6dJFk&amp;traceId=0b0fe01315401411385897225e&amp;union_lens=lensId:0b832c69_0ba8_1669790c2b2_7e49",
      "item_id": "537198102252",
      "item_url": "https://s.click.taobao.com/t?e=m=2&s=8oSvdnssumBw4vFB6t2Z2ueEDrYVVa64LKpWJ+in0XLLWlSKdGSYDuI0xMuideCoMMgx22UI05akcDvh/azoTPmepLdEYxipLMI767UxAaEQor27338dFiJGrlHwzACn/ANN/hQSwHOySbHmSI7wOtef/roYqRld/ufIeaShmLvWGPPZ03CRxLnIr3aSU+j5X5DU7svJUQPGDmntuH4VtA==&amp;union_lens=lensId:0b832c69_0ba8_1669790c2b2_7e49",
      "max_commission_rate": "1.19",
      "native_url": "tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&h5Url=https://a.m.taobao.com/i537198102252.htm?price=550-715&original_price=598-998&sourceType=item&sourceType=item&suid=3fe097b5-df05-4b0e-94ff-f42864c8ae0d&ut_sk=1.WHiZN9cWj2gDANFHTYxI99AA_21646297_1540140017506.Copy.1&un=eacba42d88beb7c21d47af8e7279b96e&share_crt_v=1&sp_tk=4oKscnJtVWJoZWJBczHigqw=&spm=a211b4.23496927&visa=13a09278fde22a2e&disablePopup=true&disableSJ=1&appkey=23496927&visa=13a09278fde22a2e",
      "pic_url": "http://gw.alicdn.com/bao/uploaded/i7/TB1XuF1nRTH8KJjy0FiYXIRsXXa_M2.SS2",
      "price": "550.00",
      "request_id": "4granq52up2y",
      "fanli": true,
      "taoToken": "￥WaEKbheX1tO￥",
      "thumb_pic_url": "http://gw.alicdn.com/bao/uploaded/i7/TB1XuF1nRTH8KJjy0FiYXIRsXXa_M2.SS2_170x170.jpg",
      "title": "淘口令-宝贝",
      "url": "https://a.m.taobao.com/i537198102252.htm?price=550-715&original_price=598-998&sourceType=item&sourceType=item&suid=3fe097b5-df05-4b0e-94ff-f42864c8ae0d&ut_sk=1.WHiZN9cWj2gDANFHTYxI99AA_21646297_1540140017506.Copy.1&un=eacba42d88beb7c21d47af8e7279b96e&share_crt_v=1&sp_tk=4oKscnJtVWJoZWJBczHigqw=&spm=a211b4.23496927&visa=13a09278fde22a2e&disablePopup=true&disableSJ=1"
    };
    item = wx.getStorageSync('taotokenItem');
    this.setData({
      itemdata: item,
      itemimgs: [item.pic_url]
    });
  },
})
