// import {Vue} from 'dvd-service-js-common';
import Vue from 'vue';
// 前后端分离需要
// import commonSeperateHtml from "../../../common/js/commonSeperateHtml.js";
window.aa = new Date().getTime()
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

new Vue({
  el: ".app",
  components: {
    'v-school-classify': require('../vue/vSchoolClassIfy.vue').default,
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {},
  beforeCreate() {
  },
});
