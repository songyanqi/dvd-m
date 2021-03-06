// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
// import tj from 'dvd-service-js-tj';
// import popup from 'dvd-service-js-popup';
import localCache from 'dvd-base-js-cache';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import date from 'dvd-base-js-date';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
      date: date,
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),
      ua: ua,
      error: false
    }
  },
  computed: {
    currentDate(){
      let now = '';
      if (param.get('deviceTime') !== undefined) {
        now = Date.now();
      } else if (this.response) {
        now = this.response.sys_time + '000';
      }
      return date.format(now, 'yyyy-MM-dd');
    },
    isAdviser(){
      return true;
    }
  },
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          homeOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
        });

        // 初始化轮播图
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          // spaceBetween: 10,
          freeMode: true
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    /**
     * 接口名称: 我的1018
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18546918
     */
    getData(refresh = false){
      let ts = this;

      // // 缓存
      // let cacheKey = `act_1018_mine_data`;
      // // 按时间取缓存
      // let minute = new Date().getMinutes();
      // if (minute > 0 && minute < 59) {
      //   // 取缓存
      //   let data = localCache.getItem(cacheKey);
      //   if (data && !refresh) {
      //     this.response = data;
      //     ts.$forceUpdate();
      //     return;
      //   }
      // }

      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/thethirdyears/myWishList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          // js_wx_info: 1,
        }),
        success(response) {
          common.checkRedirect(response);

          ts.response = response;
          // ts.response = require('../json/act_1018_mine.json');

          // 存缓存
          // localCache.setItem({
          //   Date: Date.now(),     // 当前时间（不传则取设备时间）
          //   Expires: 1 * 60 * 1000,   // 过期时间（从当前时间开始计算过多少毫秒缓存失效）
          //   key: cacheKey,        // 缓存key
          //   data: response        // 缓存data（可以传json或String）
          // });
        },
        error(error) {
          // ts.response = require('../json/act_1018_mine.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.error = true;
        }
      });
    },
    /* 清除本地缓存 */
    removeLocalCache() {
      localStorage.removeItem('act_1018_mine_data');
      localStorage.removeItem('act_1018_main_data');
      console.log('本地缓存act_1018_main_data、act_1018_mine_data已清除。')
    },
    // app跳转打开新webview
    isOpenWebview(event) {
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: `${event.currentTarget.href}`,
        });
      }
    },
    // 去主会场
    go1018Main(){
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.close();
      }
    },
  },
  filters: {},
});
