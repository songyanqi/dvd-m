// 第三方模块
import Vue from 'vue';

// H5项目间基础业务模块.
require('dvd-service-js-common');

// import ua from 'dvd-base-js-ua';

// import Vue from 'vue';
// import $ from 'jquery';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import login from 'dvd-service-js-login';
login.needLogin();
import {
  setInterval
} from 'timers';
const seicialData = {
  vm1: new Vue({
    components: {},
    data() {
      return {};
    },
    computed: {},
    beforeCreate() {

    },
    created() {

    },
    mounted() {},
    methods: {
      one_click_add() {
        popup.loading(true);
        $.ajax({
          url: '/api/mg/sale/library/addToCart',
          type: 'POST',
          dataType: 'JSON',
          data: encrypt.ajax({goods_ids: window.lib_list}),
          success: data => {
            if (data.code) {
              popup.toast(data.data.msg);
            } else {
              popup.alert({
                title: '提示',
                text: data.msg || data.data.msg
              });
            }
            popup.loading(false);
          },
          error: error => {
            popup.loading(false);
            popup.toast(error.message, 3000);
          }
        });
      }
    },
    watch: {}
  }),
  one_click_add: false,
  init: function() {
    if (document.getElementById('one_click_add')) {
      this.vm1.$mount('#one_click_add');
      this.special = true;
    }
    window.seecialTimer = setInterval(() => {
      if (!this.special) {
        if (document.getElementById('one_click_add')) {
          this.vm1.$mount('#one_click_add');
          this.special = true;
        }
      }
      if (this.one_click_add) {
        clearInterval(window.seecialTimer);
      }
    }, 500);
  }
};
seicialData.init();

