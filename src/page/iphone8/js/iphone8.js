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
import localCache from 'dvd-base-js-cache';
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
    'iphone8':require('../vue/iphone8.vue').default
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

        // 设置app头部标题栏
        // setTimeout(function () {
        //   native.custom.setHead({
        //     title: document.title,
        //     shareBtn:"1"
        //   });
        // },100);

        // 设置分享信息
        // try {
        //   share.setShareInfo({
        //     title: "大V店周年庆，妈妈顾问赢IPhone 8",
        //     desc: "妈妈顾问服务人群销售额达到10万，有机会获得IPhone 8一部，仅此一天哦~",
        //     link: window.location.href,
        //     imgUrl: "//9i.dvmama.com/free/2017/10/11/%E8%B5%A2iphone8%E5%88%86%E4%BA%ABicon.jpg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp"
        //   });
        // } catch (err) {
        //   console.error(err);
        // }
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
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/iphone8.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
