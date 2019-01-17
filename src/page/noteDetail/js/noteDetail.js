import common from 'dvd-service-js-common';
import Vue from 'vue';

// 前后端分离需要
// import commonSeperateHtml from "../../../common/js/commonSeperateHtml.js";

// 第三方
import $ from 'jquery';
import Cookies from 'js-cookie';

// 工具模块
import encrypt from 'dvd-service-js-encrypt';
import util from 'dvd-service-js-util';
import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import share from 'dvd-service-js-share';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
import param from 'dvd-base-js-param';
import login from 'dvd-service-js-login';

debugger
new Vue({
  el: ".app",
  components: {
    'com-top-title': require("dvd-service-com-title").default,
    'noteDetail':require('../vue/noteDetail.vue').default
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
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置分享信息
        // try {
        //   share.setShareInfo({
        //     title: ts.response.data.shareTitle,
        //     desc: ts.response.data.shareDesc,
        //     link: location.href,
        //     imgUrl: ts.response.data.shareImg
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
  },
  filters: {},
});
