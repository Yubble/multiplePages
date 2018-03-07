import { request, buryPoints } from '../../common/script/common';
import './style.scss';

$(function() {
  buryPoints("进入民生银行开卡活动", "进入民生银行开卡活动", request.token);

  $("#btn").on('click', function() {
    buryPoints("点击了申请民生银行开卡", "点击了申请民生银行开卡", request.token);
    location.href = 'https://creditcard.cmbc.com.cn/wsv2/?etr=khPQy0CzpY3QJCnkZplAitSu5pUmWSZQQSNwCsYYeOfMfpZSJWIaC2/3H91bPbTxElr5qiVDOR/QnOg+fdGwnq3d9XS7WtmOJJJZENKd+r+LuxQjEKCi/J0QJVjKbZH/cZt3I/8BFolYl6qsbyHTClv96tOqYN8A9c/8BkYFY088bvr0FhwA6Z1UYtofFDpx4JJFy27nyO56KQucH3hMWdg5Js4goeEULCSImvMKOmakQQPEY78miBo6/uRgzoG9ROGJUse26/ONbHqj84F2pqqTjfhvyITBvuN5Ke7kXll+i4dBp2Xw5xFzhMYjaMqwY+28DofAwEJ1BshnObHBWlHyUJcpwMMwbHFrc8+aLufC3cz52+PKLrak0X7xAmEJDhdrBSLLqoc5+Dyb1KOejY5e9+Sqs5Coi1fZDPGmKNrX73x4XFbMFoVAwCImR46Pnx64LratTF+XqeGoZnQIXzbk+G5N5+G5g9L6p1aomXy7em5r4nlvuWqtIcPbWTIH&from=groupmessage&isappinstalled=0';
  });

});