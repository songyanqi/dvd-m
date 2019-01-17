// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import tj from 'dvd-service-js-tj';
import util from 'dvd-service-js-util';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';
import ua from 'dvd-base-js-ua';
// import Swiper from "swiper";

// 懒加载初始化
vueLazyload.init();
// 渲染页面
new Vue({
  el: ".app",
  components: {
    "com-top-title": require("dvd-service-com-title").default,
    "com-to-top-icon": require("dvd-service-com-go-page-top").default,
    guinness: require("../vue/guinness.vue").default
  },
  data() {
    return {
      response: null,
      ua,
      login:login
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
    }
  },
  beforeCreate() {},
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
  }
});
