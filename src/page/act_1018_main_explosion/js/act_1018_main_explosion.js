// 基础模块
 import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
// import $ from 'jquery';
import vueLazyload from 'dvd-service-js-img-lazyload';
// 懒加载初始化
vueLazyload.init();

new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'com-act-explosion': require('../vue/com-act-explosion.vue').default
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {

  },
  watch: {

  }
})
