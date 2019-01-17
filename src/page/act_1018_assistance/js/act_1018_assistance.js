// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import encrypt from 'dvd-service-js-encrypt';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';
// 懒加载初始化
vueLazyload.init();
// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-act-assistance': require('../vue/com-act-assistance.vue').default
  },
  data() {
    return {
      response: {
        goodsInfo: null,
        notice: null
      },
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
    try {
      share.setShareInfo({
        "title": '10.18周年庆喊好友助力，0元抢爆品！',
        "desc": '好友助力随机减钱，助力越多越省钱',
        "imgUrl": 'http://9i.dvmama.com/free/20170915_assistance/assistance.png',
        "link": location.href
      });
      setTimeout(function () {
        native.custom.initHead({
          'shareOnHead': '1'
        });
      }, 300);
    } catch (err) {
      console.error(err);
    }
  },
  created() {
    this.getAnnouncement();
    this.getHelpList();
  },
  methods: {
    /**
     * 接口名称:获取助力列表
     * 接口文档:
     */
    getHelpList() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpbuy/getHelpList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({}),
        success(response) {
          common.checkRedirect(response);
          ts.response.goodsInfo = response.data;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称:获取公告列表
     * 接口文档:
     */
    getAnnouncement() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpbuy/getAnnouncement?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({}),
        success(response) {
          common.checkRedirect(response);
          ts.response.notice = response.data;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
