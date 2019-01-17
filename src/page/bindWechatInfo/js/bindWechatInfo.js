// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
import type from 'dvd-base-js-type';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import cache from 'dvd-base-js-cache';
import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';

// 渲染页面
new Vue({
  el: '.app',
  components: {'dvd-service-com-title': require('dvd-service-com-title').default},
  data() {
    return {

      // 全局属性
      window,
      document,
      location,

      // H5项目间通用模块
      ua,
      popup,
      wechatImg:'',
      wechatName:''
    };
  },
  computed: {},
  created() {
    this.getWechatInfo();
  },
  methods: {
    back() {
      if (ua.isDvdApp()) {
        native.Browser.close();
      } else {
        history.back();
      }
    },
    getWechatInfo() {
      $.post('/api/mg/auth/user/getWeixinInfo', encrypt.ajax(), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
          this.wechatName = res.data.nickname;
          this.wechatImg = res.data.headimgurl;
        }
      });
    }
  }
});
