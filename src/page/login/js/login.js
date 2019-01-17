// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import native from 'dvd-service-js-native';
import login from 'dvd-service-js-login';
import ua from 'dvd-base-js-ua';
import param from 'dvd-base-js-param';
import weixin from 'dvd-service-js-weixin';
import encrypt from 'dvd-service-js-encrypt';
import popup from 'dvd-service-js-popup';

// 组件
import comTopTitle from 'dvd-service-com-title';
import phoneCheck from '../vue/phoneCheck.vue';
import userLogin from '../vue/userLogin.vue';
import findPassword from '../vue/findPassword.vue';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    comTopTitle,
    phoneCheck,
    userLogin,
    findPassword
  },
  data() {
    return {
      title: '手机验证',
      btn: {href: '/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button'},
      wechatLoginFlag: false,
      loginType: 1 // 1 手机验证  2 账号登陆  3 找回密码
    };
  },
  beforeCreate() {
    if (login.isLogined()) {
      setTimeout(function() {
        if (ua.isAndroid()) {
          native.Browser.close();
        } else {
          history.back();
        }
      }, 500);
      return;
    }

    /* 如果是APP，跳转到原生登陆*/
    if (ua.match(/davdian|bravetime|vyohui/)) {
      native.Account.login({
        success: function(result) {
          if (typeof result === 'string') {
            result = JSON.parse(result);
            const code = +result.code;
            if (code === 0) {

            } else if (code === 1 || code === 2) {
              let referer = param.get('referer');
              location.href = referer;
            }
          }
        },
        error: function() {
          history.back();
        }
      });
    }
  },
  created() {
    let code = param.get('loginCode');
    // this.isSelfHost();
    if (code) {
      this.isBindPhoneNumber(code);
    }
    this.wechatLoginFlag = ua.isWeiXin();
  },
  mounted() {
    let enrollTip = $('#enrollTip'),
      h = $(window).height();
    $(window).resize(function() {
      if ($(window).height() < h) {
        enrollTip.hide();
      }
      if ($(window).height() >= h) {
        enrollTip.show();
      }
    });
  },
  methods: {

    // 如果是错误的域名直接就跳转到bravetime
    isSelfHost() {
      $.post('/api/mg/auth/user/weixinLogin', encrypt.ajax({}), () => {});
    },
    setLoginType(type) {
      this.loginType = type;
      sessionStorage['davd_login_type'] = type;
    },
    back() {
      if (this.loginType === 3) {
        this.setLoginType(2);
      } else {
        sessionStorage['davd_login_type'] = null;
        history.back();
      }
    },
    wechatLogin() {
      weixin.goAuthPage(true,true);
    },
    isBindPhoneNumber(code) {

      let loginPath = decodeURIComponent(param.get('loginPath')),
        path = '';
      popup.loading();
      $.post('/api/mg/auth/user/weixinLogin', encrypt.ajax({authCode: code}), res => {
        popup.loading(false);
        if (res.code === '80002') {
          if (loginPath && loginPath !== 'undefined') {
            path = '/m/bindPhoneNumber.html?loginPath=' + loginPath;
          } else {
            path = '/m/bindPhoneNumber.html';
          }
          location.replace(path);
        } else if (res.code === 0) {
          if (loginPath && loginPath !== 'undefined') {
            path = res.shop_url + loginPath;
          } else {
            path = res.shop_url;
          }
          location.replace(path);
        } else {
          popup.toast(res.msg || res.data.msg);
        }
      });
    }
  }
});
