import { request, goLogin, goLoan, popText, loading, preventScroll, allowScroll, buryPoints } from '../../common/script/common';
import { $post } from '../../common/script/http'
import './style.scss';

$(function (){

  // 启动loading层
  loading.show();

  // 活动规则的事件绑定
  // 显示
  $("#rule-btn").click((e) => {
    $("#rule-mask").show();
    preventScroll();
  });
  // 隐藏
  $("#close_btn").click((e) => {
    $("#rule-mask").hide();
    allowScroll();
  });

  // 判断用户是否登录
  if (!request.token) {
    loading.hide();

    // 如果用户未登录，绑定点击领取红包按钮全部跳转登录，且阻止下面功能
    $("#loan_btn,.getRed-btn").click(function(e) {
      goLogin();
    });

    loading.hide();

    return;
  }

  // 获取所有红包信息
  $post('pmtActivity/activityLog', {
    token: request.token,
    activityCode: 1008
  });
  buryPoints("进入了开年有礼页面", "进入了开年有礼页面", request.token);

  // 给立即借款绑定事件
  $("#loan_btn").click(function() {
    // 获取所有红包信息
    $post('pmtActivity/activityLog', {
      token: request.token,
      activityCode: 1008
    }).then(() => {
      buryPoints("开年有礼-点击借款", "开年有礼-点击借款", request.token);
      goLoan();
    });
  });

  // 获取所有红包信息
  $post('market/redmoney/findRedCenter', {
    token: request.token,
    page:1,
    paging:10000,
    activity:1
  }).then(function(result) {
    result.data.map((elt) => {
      new RedPacket(elt.redId, elt.rmdAmt, elt.getStatus, elt.proportion);
      loading.hide();
    });
  }).catch(() => {
    popText('获取失败');
    goLoan();
  });

  // 编写红包类
  class RedPacket {
    constructor(redId, rmdAmt, getStatus, proportion) {
      this.redId = redId;       /*红包ID*/
      this.rmdAmt = rmdAmt;     /*红包金额*/
      this.getStatus = getStatus;     /*红包状态*/
      this.proportion = proportion;   /*红包剩余百分比*/

      switch(this.rmdAmt) {
        case '88.00':
          this.Dom = $("#per15");
          break;
        case '58.00':
          this.Dom = $("#per30");
          break;
        case '28.00':
          this.Dom = $("#per50");
          break;
        case '8.00':
          this.Dom = $("#per100");
          break;
      }
      // 根据红包状态展示不同按钮样式
      this.isDrawout();

      // 点击领取红包时的方法
      this.clickDraw();
    }

    isDrawout() {
      if(Number(this.getStatus)) {
        this.Dom.find('.getRed-btn').addClass('disable').text('已领取');
        return;
      } else if (Number(this.proportion) <= 0) {
        this.Dom.find('.getRed-btn').addClass('disable').text('今日已抢光');
        return;
      }
    }

    clickDraw() {
      let btn = $(this.Dom).find('.getRed-btn');
      btn.click((e) => {
        if (btn.hasClass('disable')) {
          return;
        }
        loading.show();
        this.drawRed();
      });
    }

    drawRed() {
      $post('market/redmoney/redCenterGetRed', {
        token: request.token,
        redid: this.redId
      }).then((result) => {
        if (result.status == 1) {
          loading.hide();
          this.Dom.find('.getRed-btn').addClass('disable').text('已领取');
          // 小气泡
          popText(`恭喜您成功领取${parseInt(this.rmdAmt)}元红包`);
        }
      });
    }
  }

});