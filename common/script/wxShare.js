var wx = require('weixin-js-sdk');

let wxConfig = {
  imgName: "share.png",
  title: "快来帮我回家团圆！",
  desc: "家虽远，心很近，叮当送团圆！",
  wxShareFuns (){
    let _this = this;
    let imgPath = "";
    if (Env == 'pro') {
      // 线上地址
      imgPath = "线上缩略图地址";
    } else {
      // 开发地址
      imgPath = "开发缩略图地址";
    }

    var link = "";
    if (!this.link) {
      link = window.location.href.split('?')[0];
    } else {
      link = this.link;
    }
    var protocol = window.location.protocol;
    var host = window.location.host;

        // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: _this.title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      // imgUrl: _this.imgName
      imgUrl: protocol + '//' + host + imgPath + _this.imgName // 分享图标
    });
    // 分享给好友
    wx.onMenuShareAppMessage({
      title: _this.title, // 分享标题
      desc: _this.desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      // imgUrl: _this.imgName
      imgUrl: protocol + '//' + host + imgPath + _this.imgName // 分享图标
    });
    // 分享到QQ
    wx.onMenuShareQQ({
      title: _this.title, // 分享标题
      desc: _this.desc, // 分享描述
      link: link, // 分享链接
      // imgUrl: _this.imgName
      imgUrl: protocol + '//' + host + imgPath + _this.imgName // 分享图标
    });
    // 分享到微博
    wx.onMenuShareWeibo({
      title: _this.title, // 分享标题
      desc: _this.desc, // 分享描述
      link: link, // 分享链接
      // imgUrl: _this.imgName
      imgUrl: protocol + '//' + host + imgPath + _this.imgName // 分享图标
    });
  }
}

let urlStr = '';
if (Env == 'pro') {
  // 线上地址
  urlStr = "线上获取微信token地址";
} else {
  // 开发地址
  urlStr = "开发获取微信token的地址";
}

$.ajax({
  type: "post",
  url: urlStr,
  async: false,
  data: { url: window.location.href.split('#')[0] },
  success: function (data) {
    wx.config({
      debug: false,
      appId: data.data.appId,
      timestamp: data.data.timestamp,
      nonceStr: data.data.noncestr,
      signature: data.data.signature,
      jsApiList: ["chooseWXPay", "chooseImage", "uploadImage", "downloadImage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareAppMessage", "onMenuShareQZone"]
    });
  },
  error: function (error) {
    alert("服务器异常");
  }
});

wx.ready(function () {
  // 调用微信分享的方法集
  wxConfig.wxShareFuns();
});

export default wxConfig