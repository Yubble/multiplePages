import { request,inApp } from '../../common/script/common';
import { $get } from '../../common/script/http'
import wxShare from '../../common/script/wxShare';
import './style.scss';

$(function () {
  require('../assest/shareIcon/slt.png');
  wxShare.imgName = 'slt.png';
  wxShare.title = '测试用';
  wxShare.wxShareFuns();

  $("#rain-bg").click(function() {
    // 调用拆红包动作
    $get('abc', '', (res) => {
      console.log(res)
    });
  });

});
