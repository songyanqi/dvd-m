// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import util from 'dvd-service-js-util';
import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'myLightBrand':require('../vue/myLightBrand.vue').default
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        setTimeout(function () {
          native.custom.initHead({
            shareOnHead: 0,
            homeOnHead: 1,
            backOnHead: 1
          });
        },300);
        // 设置分享信息
        try {
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {
  },
  created() {
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
  },
  filters: {},
});
