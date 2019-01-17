// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import vueLazyload from 'dvd-service-js-img-lazyload';
import saleErrorPage from "../vue/sale_error_page.vue";
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'sale-error-page':saleErrorPage,
    'com-top-title': require('dvd-service-com-title').default
    // 'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
    };
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
  },
  created() {
    // this.getData();
  },
  mounted() {
    document.body.setAttribute('class','loaded')
  },
  filters: {},
  methods: {

  },
});
