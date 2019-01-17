// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import vueLazyload from 'dvd-service-js-img-lazyload';
import saleChangePage from "../vue/sale_change_page.vue";
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'sale-change-page':saleChangePage,
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
    if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
        // 如果app老版本
    } else {
      // 设置app头部标题栏
      window.setHeadAction = function(){
        native.Browser.open({
          url:'/policy.html'
        })
      }
      setTimeout(function(){
        native.Browser.setHead({
          title: document.title,
          rightBtn: {
            "text" : "售后政策",
            "textColor":"#FF4A7D",
            "action" : "window.setHeadAction()"
          }
        });
      },1000)
    }
  },
  filters: {},
  methods: {

  },
});
