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
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';

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
      window,
      document,
      location,

      // H5项目间通用模块
      ua,
      popup,
      visitorStatus: null,
      canuse: 1,
      val: 30,
      link: ''
    };
  },
  computed: {},
  beforeCreate() {
    // if (!sessionStorage['ticketData'] ) {
    //   location.href = '/';
    // }
  },
  created() {
    if (login.isLogined()) {

      // 设置会员、非会员标识
      this.visitorStatus = login.getUserStatusCode() * 1;
    }
    this.getData();
  },
  filters: {},
  methods: {
    getData() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/voucher/getList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax(),
        success(res) {
          try {
            if (res.code === 0) {
              that.canuse = res.data.config.canUse;
              that.link = res.data.config.voucherUseLink;
              that.val = res.data.voucher[0].voucherValue.substr(0, 2);
            } else {
              popup.toast(res.data.msg || res.msg);
            }
          } catch (err) {

            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {

          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/receive_member_voucher_success.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=member_voucher.json`);
          }
        }
      });
    },
    useTicket() {
      // let ticketData = JSON.parse(sessionStorage['ticketData']);
      let that = this;
      if (!login.isLogined()) {
        login.goLoginPage();
        return false;
      }
      // sessionStorage.removeItem('ticketData');

      // 会员跳转到抵用券列表页
      if (this.canuse == 0) {
        location.href = '/m/member_voucher.html';
        return false;
      } else {
        location.href = that.link;
      }
    }
  }
});
