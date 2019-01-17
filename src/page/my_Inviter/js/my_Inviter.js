// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import login from 'dvd-service-js-login';
login.needLogin();
// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'myinviter': require('../vue/my_Inviter.vue').default,
  },
  data() {
    return {
      response: null,
      title:"邀请人信息"
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {

  },
  created() {

  },
  mounted:function () {

  },
  methods: {
    titlename:function (msg) {
      var that = this;
      that.title = msg;
    }
  },
  filters: {},
});
