// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import api from '../../../common/js/api.es6';
import Cookies from 'js-cookie';

// 业务模块
import tj from 'dvd-service-js-tj';
import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';



// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default
  },
  data() {
    return {groupList: null};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api('/api/mg/user/advisergroup/groupList', {
        userId: Cookies.get('gr_user_id'),
        type: 1
      }).then(res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg, 2000);
          return false;
        }
        this.groupList = res.data.dataList;
      });
    }
  }
});
