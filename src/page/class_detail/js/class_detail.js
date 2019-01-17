// 基础模块
require('dvd-service-js-common');

// 入群工具 入群入口
require('../../../common/js/group_entry');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import share from 'dvd-service-js-share';
import encrypt from 'dvd-service-js-encrypt';
import vueLazyload from 'dvd-service-js-img-lazyload';
import ua from 'dvd-base-js-ua';
import hybrid from 'dvd-service-js-hybrid';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top')
      .default,
    'dvd-service-com-go-home': require('dvd-service-com-go-home').default,
    'class-detail': require('../vue/class_detail.vue').default
  },
  data() {
    return {
      response: null,
      ua: ua
    };
  },
  computed: {},
  watch: {

    // 监听response变化
    response() {

      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;

        // 设置分享信息
        try {
          if (!that.response || !that.response.data) {
            return;
          }
          window.shareTitle = that.response.data.shareTitle;
          window.shareDesc = that.response.data.shareDesc;
          window.window.shareImg = that.response.data.shareImg;
          share.setShareInfo(
            {
              title: window.shareTitle || that.response.data.shareTitle,
              desc: window.shareDesc || that.response.data.shareDesc,
              link: window.link || location.href,
              imgUrl: window.shareImg || that.response.data.shareImg
            },
            that.response
          );
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {},
  created() {

    // this.getData();
  },
  mounted() {},
  filters: {},
  methods: {

    /**
     * 接口名称:
     * 接口文档:
     */
  
    getData() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({ js_wx_info: 1 }),
        success(response) {
          try {
            that.response = response;
          } catch (err) {

            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(
            `ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${
              error.statusText
            } `
          );
          this.success(require('../json/class_detail.json'));
          console.warn(
            `ajax已使用mock数据: url=${this.url}, mock=class_detail.json`
          );
        }
      });
    }
  }
});
