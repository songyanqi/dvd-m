// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
// import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
// import tj from 'dvd-service-js-tj';
// import util from 'dvd-service-js-util';
// import date from 'dvd-base-js-date';
// import param from 'dvd-base-js-param';
// import popup from 'dvd-service-js-popup';
// import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
// import native from 'dvd-service-js-native';
// import encrypt from 'dvd-service-js-encrypt';
// import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'index':require('../vue/apple_recharge.vue').default
  },
  data() {
    return {
      response: null,
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  beforeCreate() {
  },
  created() {

  },
  mounted() {
  },
  filters: {},
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */

  },
});
