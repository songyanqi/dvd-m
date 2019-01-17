// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
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
import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
      picGroup:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      num: 19,
      no_more: 0
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
      });
    },
  },
  beforeCreate() {
  },
  created() {
    let that = this;
    that.getData();
  },
  mounted() {
    let that = this;
    var i,arr;
    window.onscroll = function () {
      if(that.num > that.response.length) {
        that.no_more = 1;
        return;
      }
      var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);//真实内容高度
      //视窗高度
      var viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
      //隐藏高度即滚动的高度
      var scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
      if (pageHeight - viewportHeight - scrollHeight <= 5) {
        that.num += 20;
        i = that.num;
        arr = [i - 19, i - 18, i - 17, i - 16, i - 15, i - 14, i - 13, i - 12, i - 11, i - 10, i - 9, i - 8, i - 7, i - 6, i - 5, i - 4, i - 3, i - 2, i - 1, i]
        that.picGroup = that.picGroup.concat(arr);
      }
    };
    // document.body.setAttribute('class', 'loaded');
  },
  filters: {},
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData(){
      let ts = this, url = "https://9i.dvmama.com/guinness/guinness.json";
      if(param.get("url")){
        url = 'https://9i.dvmama.com/guinness/' + param.get("url");
      }
      $.ajax({
        cache: true,
        async: true,
        // url: '9i.dvmama.com/guinness/final.json?_=' + Date.now(),
        url: url,
        type: 'get',
        // dataType: 'json',

        success(response) {
          try {
            ts.response = JSON.parse(response);
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/guinness_album.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=guinness_album.json`);
        }
      });
    },
  },
});
