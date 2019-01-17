// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
import share from 'dvd-service-js-share';
import encrypt from 'dvd-service-js-encrypt';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
  },
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

      groupId: param.get('groupId', location.href),
      // managerId: param.get('managerId', location.href),
      icon: '',
      qrCodeUrl: '',
      name: '',
      showError: false,
    };
  },
  computed: {},
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
    // 获取首屏数据
    this.getData();
  },
  mounted() {
    let ts = this;
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  filters: {},
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData() {
      let ts = this;
      // 调接口
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/advisergroup/getGroupQrcode?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          // js_wx_info: 1,
          groupId: ts.groupId,
          // managerId: ts.managerId,
        }),
        success(response) {
          try {
            console.log('respone-->', response);
            if (response.code === 0) {
              ts.showError = false;
              ts.response = response;
              if (ts.response.data) {
                ts.qrCodeUrl = ts.response.data.qrcode;
              }
            } else {
              ts.showError = true;
              ts.response = response;
              if (ts.response.data) {
                if (ts.response.data.default) {
                  ts.name = ts.response.data.default.groupName;
                  ts.icon = ts.response.data.default.groupIcon;
                  ts.qrCodeUrl = '//9i.dvmama.com/free/2018/07/26/1532488859478.jpg';
                }
              }
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/wechat_flock_enter.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=wechat_flock_enter.json`);
          }
        }
      });
    },
  },
});
