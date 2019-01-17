// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import popup from 'dvd-service-js-popup';
import param from 'dvd-base-js-param';
import encrypt from 'dvd-service-js-encrypt';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default
  },
  data() {
    return {

      // 全局属性
      document,

      // H5项目间通用模块
      ua,
      popup,
      phone:'',
      code:'',
      codeText: '获取验证码',
      timer: null,
      time: 60
    };
  },
  computed: {
    loginFlag() {
      return this.phone && this.code.length >= 4;
    }
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

    /** @augments
     * type 1 文字 2 语音
     */
    getCode(type) {
      const that = this;
      if (this.time !== 60) {
        return false;
      }
      if (this.phone.length < 11) {
        popup.toast('请输入正确的手机号码');
        return false;
      }
      $.post('/api/mg/auth/user/sendSms', encrypt.ajax({
        mobile: that.phone,
        smsType: type,
        sendType: 1
      }), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
          popup.toast('发送成功');
          this.checkCodeBtn();
        }
      });
    },
    checkCodeBtn() {
      const codeBtn = $('#codeBtn');
      codeBtn.addClass('disabled');
      this.timer = setInterval(() => {
        this.codeText = `${--this.time}秒后重新发送`;
        if (this.time <= 0) {
          this.time = 60;
          this.codeText = '重新获取验证码';
          clearInterval(this.timer);
          codeBtn.removeClass('disabled');
        }
      }, 1000);
    },
    bindPhoneNumber() {
      const that = this;
      let path = '';
      if ($('#bindBtn').hasClass('disabled')) {
        return false;
      }
      $.post('/api/mg/auth/user/weixinBind', encrypt.ajax({
        mobile:that.phone,
        captcha:that.code
      }), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
          if (param.get('loginPath')) {
            path = res.shop_url + param.get('loginPath');
          } else {
            path = res.shop_url;
          }
          location.replace(path);
        }
      });
    },
    back() {
      history.go(-2);
    }
  }
});
