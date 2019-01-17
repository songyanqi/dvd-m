// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import api from '../../../common/js/api.es6';
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
import ua from 'dvd-base-js-ua';
import { getQuery} from '../../../common/js/utils.es6';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default
  },
  data() {
    return {
      response: null,
      nickName: null
    };
  },
  computed: {},
  methods: {
    saveName() {
      if (this.nickName.length > 16) {
        popup.toast('微信昵称最大长度为16个字符', 2000);
        return false;
      }
      api('/api/mg/user/advisergroup/addUser', {
        groupId: getQuery('group_id'),
        nickName: this.nickName
      }).then(res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg, 2000);
          return false;
        } else {
          popup.toast('保存成功', 2000);
          if (ua.isDvdApp()) {
            native.Browser.close();
          } else {
            location.href = '/center.html';
          }
        }
      });
    }
  }
});
