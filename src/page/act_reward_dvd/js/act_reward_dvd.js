// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import localCache from 'dvd-base-js-cache';
import login from 'dvd-service-js-login';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import date from 'dvd-base-js-date';
import popup from 'dvd-service-js-popup';
// 懒加载初始化
vueLazyload.init(true);

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'com-act-1111-reward': require('../vue/com-act-1111-reward.vue').default,
  },
  data () {
    return {
      isTop: true,
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
    if ((ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0)) {
      this.isTop = false;
    }
    if (ua.getQuery("isShortmsg")) {
      native.custom.openUrlWithApp({
        url:location.href.split("?")[0],
        invoke: true
      })
    }
  },
  methods: {},
  filters: {},
});
