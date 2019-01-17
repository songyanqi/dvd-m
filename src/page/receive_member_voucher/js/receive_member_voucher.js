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
      ticketData:null,
      phone:'',
      tag: null
    };
  },
  computed: {},
  // beforeCreate() {
  //   let num = 0;
  //   if (sessionStorage['isShare']) {
  //     num = sessionStorage['isShare'] - 1;
  //     sessionStorage.removeItem('isShare');
  //     history.go(-num);
  //     window.addEventListener('popstate', () => {
  //       location.reload(true);
  //     });
  //   }
  // },
  created() {

    // 获取首屏数据
    this.getData();
    this.tag = param.get('tag');
  },
  filters: {
    formatDate(val) {
      return val.replace(/-/g, '.');
    }
  },
  methods: {

    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData() {
      let that = this;

      // 调接口
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/voucher/getVoucher?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({q:param.get('q')}),
        success(res) {
          try {
            if (res.code === 0 && res.data) {
              if (res.data.voucherValue) {
                res.data.voucherValue = res.data.voucherValue.substr(0, 2);
              }
              that.ticketData = res.data;
              that.setShareInfo(res.data.shareInfo);
            } else {
              popup.toast(res.msg || res.data.msg);
            }
          } catch (err) {

            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {

          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/receive_member_voucher.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=receive_member_voucher.json`);
          }
        }
      });
    },
    setShareInfo(data) {
      share.setShareInfo({
        title: data.title,
        desc: data.desc,
        link:
          this.location.protocol +
          '//' +
          this.location.hostname +
          data.link,
        imgUrl: data.imgUrl
      });
    },
    reveive() {
      if (this.phone.length !== 11 || isNaN(this.phone)) {
        popup.toast('请输入正确的手机号码');
        return false;
      }
      $.post('/api/mg/user/voucher/receiveVoucher', encrypt.ajax({
        uuid: this.ticketData.uuid,
        phone: this.phone,
        q: param.get('q')
      }), res => {
        if (!res.code) {
          sessionStorage['ticketData'] = JSON.stringify(res.data);
          location.href = '/m/receive_member_voucher_success.html';
        } else {
          popup.toast(res.msg || res.data.msg);
        }
      });
    }
  }
});
