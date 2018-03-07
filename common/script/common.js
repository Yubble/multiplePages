// 写个匿名函数用来保存当前环境的全局变量
const host = window.location.hostname;
let shareHost = '',
    localhost = '';
if (host == 'app.doraemoney.com' || host == 'ddstatic.9fbank.com') {
    window.Env = 'pro';
    localhost = 'https://app.doraemoney.com/';
    shareHost = 'https://app.doraemoney.com/';
} else {
    window.Env = 'dev'
    localhost = 'https://apptest.doraemoney.com/';
    shareHost = 'https://webtest.doraemoney.com/';
}

// 获取url中的参数
const getParam = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  //var r = window.location.href.indexOf('token')>-1 && window.location.href.split('?')[1].match(reg);
  if (r != null) {
      return unescape(r[2])
  }
  return null
}

// 能够获取用户的整体信息并存到request对象中
const request = {
  init (){
    this.token = getParam("token");
    this.loanType = getParam("loanType");
    this.appId = getParam("appId");
    this.planId = getParam("planId");
    this.status = getParam("status");
    this.redAmount = getParam("redAmount");
    this.productId = getParam("productId");
    this.version = getParam("version");
    this.mobile = getParam("mobile");
    this.customerType = getParam("customerType");
    this.invitationCode = getParam("invitationCode");
    this.mobileCode = getParam("mobile");
    let _u = navigator.userAgent;
    if( _u.indexOf('Android') > -1 || _u.indexOf('Adr') > -1){//android终端
      this.deviceType = "android";
    } else if(!!_u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){//ios终端
      this.deviceType = "ios";
    }else{
      this.deviceType = "android";
    }

    if (this.deviceType == 'ios') {
      try {
        window.webkit.messageHandlers.reloadWithToken.postMessage('');
      } catch (e) {
        console.log('此方法只能在APP上使用');
      }
    }
  }
};
// 执行一次request的初始化方法，获取到全局参数
request.init();
 
// 可以判断是否在玖富叮当app中
const inApp = () => {
  if (request.deviceType == 'ios') {
    if (typeof window.webkit.messageHandlers.share == 'object') {
      return true;
    } else {
      return false;
    }
  } else {
    if (typeof APP == 'object') {
      return true;
    } else {
      return false;
    }
  }
}

// 阻止页面滑动的方法
const preventScroll = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  $(document).on('touchmove', function(e) {
    e.preventDefault();
  });
}

// 允许页面滑动的方法
const allowScroll = () => {
  $(document).off('touchmove');
}

//判断是否是微信浏览器的函数
const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}

// 当元素的transition过渡结束，执行方法
const transitionEnd = (id, fn) => {
  // Safari 3.1 到 6.0 代码
  document.getElementById(id).addEventListener("webkitTransitionEnd", fn);
  // 标准语法
  document.getElementById(id).addEventListener("transitionend", fn);
}

// 当元素的animate动画结束，执行方法
const animateEnd = (id, fn) => {
  // Chrome, Safari 和 Opera 代码
  document.getElementById(id).addEventListener("webkitAnimationEnd", fn);
  // 标准语法
  document.getElementById(id).addEventListener("animationend", fn);
}

//跳转到登录页面
const goLogin = () => {
  location.href='http://w2l/?params={"iosName":"LoginViewController","androidName":"token_expired"}';
}

// 跳转到借款页面
const goLoan = () => {
  window.location.href='http://w2l/?params={"iosName":"LoanViewController","androidName":"HomeFragment", "loanType": "8"}'
}

// 调用APP Loading方法
const showLoading = (flag) => {
  var _u = navigator.userAgent;
  try {
    if (_u.indexOf('Android') > -1 || _u.indexOf('Adr') > -1) {
      // window.alert(flag)
      if (flag) {
        APP.showProgress()
      } else {
        APP.dismissProgress()
      }
    } else {
      if (flag) {
        window.webkit.messageHandlers.startLoading.postMessage('');
      } else {
        window.webkit.messageHandlers.stopLoading.postMessage('');
      }
    }
  } catch (err) {
    console.log('请检查您的运行环境，showLoading 方法只能在app环境使用')
  }
}

// 调用APP分享方法
const appShare = (shareTextTitle, pageUrl, imgName, shareText) => {
  if (request.deviceType == 'android'){
    if (Env == 'pro') {
      APP.sharePlatformShowWithShareInfo('{"shareTitle":"'+shareTextTitle+'","shareUrl":"'+pageUrl+'","sharePic":"' + shareHost + 'activity/WebRoot/assets/img/shareIcon/' + imgName + '","shareContent":"'+shareText+'"}');
    } else {
      APP.sharePlatformShowWithShareInfo('{"shareTitle":"'+shareTextTitle+'","shareUrl":"'+pageUrl+'","sharePic":"' + shareHost + 'WebRoot/assets/img/shareIcon/' + imgName + '","shareContent":"'+shareText+'"}');
    }
  }else{
    if (Env == 'pro') {
      window.webkit.messageHandlers.share.postMessage('{"shareTitle":"'+shareTextTitle+'","shareUrl":"'+pageUrl+'","sharePic":"' + shareHost + 'activity/WebRoot/assets/img/shareIcon/' + imgName + '","shareContent":"'+shareText+'"}');
    } else {
      window.webkit.messageHandlers.share.postMessage('{"shareTitle":"'+shareTextTitle+'","shareUrl":"'+pageUrl+'","sharePic":"' + shareHost + 'WebRoot/assets/img/shareIcon/' + imgName + '","shareContent":"'+shareText+'"}');
    }
  }
}

// 图片预加载
const preloadimages = (arr) => {
  var newimages=[], loadedimages=0
  var postaction=function(){}  //此处增加了一个postaction函数
  var arr=(typeof arr!="object")? [arr] : arr
  function imageloadpost(){
    loadedimages++
    if (loadedimages == arr.length){
      // console.log('图片预加载完成over')
      postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
    }
  }
  for (var i=0; i<arr.length; i++){
    newimages[i] = new Image()
    newimages[i].src = arr[i]
    newimages[i].onload = function(){
      imageloadpost()
    }
    newimages[i].onerror=function(){
      imageloadpost()
    }
  }
  return { //此处返回一个空白对象的done方法
    done:function(f){
        postaction = f || postaction
    }
  }
}

//talkingData数据埋点
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.defer=1;a.src=g;a.setAttribute("td-appid","4CF2EB60A13DA4ED2000152A3006061A");m.parentNode.insertBefore(a,m)
})(window,document,'script',localhost+'/static/js/td-h5-website-sdk.js','td');

const buryPoints = (text1, text2, param) => {
  let circule = () => {
    setTimeout(() => {
      if (typeof TDAPP == 'object') {
        try {
          TDAPP.onEvent(text1, text2, request.token);
        } catch (err) {
          console.log('埋点加载异常');
        }
      } else {
        setTimeout(circule, 30);
      }
    }, 10)
  };

  circule();
}


// 跳转到下载页面
const goDownLoad = () => {
  if(request.deviceType=='android'){
    if(getParam('proId') == '9c9e0b9f44212014941688d193838c00'){//魅族
        window.location.href = 'http://app.meizu.com/apps/public/detail?package_name=com.jfbank.doraemoney';
        return;
    }else if(getParam('proId') == "afbd0a4bd17ac2fabad2575fb9e1e5d5"){//vivo
        window.location.href = 'http://info.appstore.vivo.com.cn/detail/1539453?source=7';
        return;
    }else if(getParam('proId') == '8b1d77eb146a2266928cfe2e08a8bf87'){//oppo
        window.location.href = 'http://store.oppomobile.com/product/0010/966/591_1.html?from=1152_1';
        return;
    }else if(getParam('proId') == "b06ef803064456709b026479498993fa"){//小米信息流
        window.location.href = 'http://app.mi.com/details?id=com.jfbank.doraemoney&ref=search';
        return;
    }else if(getParam('proId') == "85417541be8ea49da3ff5a5351b11508"){//百度信息流
        window.location.href = 'http://shouji.baidu.com/software/11377841.html';
        return;
    }else if(getParam('proId') == "9103ace98bdca35aa4560bbe194406eb"){//360信息流
        window.location.href = 'http://zhushou.360.cn/detail/index/soft_id/3423470?recrefer=SE_D_玖富叮当';
        return;
    }else{
        //安卓下  非微信打开 去 下载
        window.location.href = 'http://fusion.qq.com/app_download?appid=1105568242&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=1723439386';
        return;
    }
  } else {
    //ios下  非微信打开 去 下载
    window.location.href = 'https://itunes.apple.com/cn/app/id1136149621?mt=8';
    return;
  }
}

// 中奖名单滚动
// 中奖名单格式需是ul li格式，ul需要为absolute
const winnerList = (function () {
  return {
    init : function (ulObj) {
      this.ulObj = $(ulObj);
      this.liLen = $(ulObj).find('li').length;
      this.moveDistance = $(ulObj).find('li').eq(0).height();
      this.cloneFirst();
    },
    cloneFirst : function () {
      var firstLi = this.ulObj.find("li").eq(0).html();
      var html = '<li>'+firstLi+'</li>';
      this.ulObj.append(html);
      this.run();
    },
    run : function () {
      var _this = this;
      var int = self.setInterval(autoScroll, 3000);
      var rollIndex = 1;

      function autoScroll () {
        var ulMoveDis = -(rollIndex * _this.moveDistance)
        _this.ulObj.animate({'top':ulMoveDis+'px'}, 300, function () {
          if (rollIndex == (_this.liLen)) {
            rollIndex = 0;
            _this.ulObj.css('top','0px')
          }
          rollIndex++;
        });
      }
    }
  }
})()

// 小气泡方法
const popText = (text) => {
  if ($(".bubble-box").length > 0) {
    return;
  }

  let bubble = $("<div class='bubble-box' id='bubble-box' />");
  let p = $("<p class='bubble'>" + text + "</p>");
  bubble.append(p);
  
  $("body").append(bubble)

  setTimeout(function() {
    bubble.addClass('shadom');
  },1000);
  transitionEnd("bubble-box", function() {
    bubble.removeClass('shadom');
    bubble.remove();
  });
}

// loading方法
const loading = (() => {
  let loadingHtml = "<div class='loading-mask' id='loading-mask'><div class='loading'>"
                      +"<div><span></span></div>"
                      +"<div><span></span></div>"
                      +"<div><span></span></div>"
                    +"</div></div>";

  $("body").prepend(loadingHtml);
  return {
    show() {
      $("#loading-mask").show();
      $("html body").css('overflow-y','hidden');
    },
    hide() {
      $("#loading-mask").hide();
      $("html body").css('overflow-y','auto');
    }
  }
})();

export {
  request,
  getParam,
  inApp,
  preventScroll,
  allowScroll,
  isWeiXin,
  transitionEnd,
  animateEnd,
  goLogin,
  goLoan,
  showLoading,
  appShare,
  preloadimages,
  buryPoints,
  goDownLoad,
  winnerList,
  popText,
  loading
}