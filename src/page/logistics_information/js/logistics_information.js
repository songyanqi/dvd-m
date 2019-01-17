// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import encrypt from 'dvd-service-js-encrypt';

// 验证登录
login.needLogin();

// 渲染页面
new Vue({
  el: '.app',
  components: { 'dvd-service-com-title': require('dvd-service-com-title').default },
  data() {
    return {

      // 全局属性
      window,
      document,
      location,

      // H5项目间通用模块
      ua,
      popup,

      // 首屏返回数据
      response: null,
      orderId: null,
      deliveryId: null,
      showList: true
    };
  },
  computed: {},
  beforeCreate() {

  },
  created() {
    window.that = this;

    // 获取首屏数据
    this.getData();
  },
  mounted() {

  },
  watch: {

    // 监听response变化
    response() {

      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {

      });
    }
  },
  filters: {},
  methods: {

    /**
         * 获取首屏数据
         * @see wiki /api/mg/order/orderShipping/orderTrace
         */
    getData() {
      let that = this;

      // 获取url中的参数
      that.deliveryId = param.get('did');
      that.orderId = param.get('oid');

      // 调接口
      $.ajax({
        cache: false,
        async: true,

        url: '/api/mg/order/orderShipping/orderTrace?_=' + Date.now(),

        // url: 'https://www.easy-mock.com/mock/5b55863a7186cb2cce7efe77/logistics_information/logistics_information?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          deliveryId: that.deliveryId,
          orderId: that.orderId
        }),
        success(response) {
          try {
            if (response.code === 0) {
              that.response = response.data;
            } else {
              popup.toast(response.msg || response.data.msg);
            }
          } catch (err) {

            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.warn(error);
          popup.toast('网络异常');
        }
      });
    },

    // 提醒发货
    remindingTheShipments() {
      let that = this;
      $.ajax({
        url: '/index.php?c=user&a=delivery_remind_response',
        type: 'POST',
        dataType: 'json',
        data: {
          id: that.deliveryId,
          time: Date.now()
        },
        success: function(result) {
          popup.toast(result['msg']);
        },
        error: function() {
          popup.toast('网络异常');
        }
      });
    }
  }
});
