// 基础模块
require('dvd-service-js-common');

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
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            title: "大V店精选儿童内容",
            desc: "优质音频，全方位满足孩子阶段性成长！",
            link: location.href,
            imgUrl: ts.response.data.feedList[0] && ts.response.data.feedList[0].body.dataList.imageUrl,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
    window.iosInterface = window.iosInterface || {};
    window.iosInterface.getAudioState = function(){
    }
    if(!window.result){
      window.result = function(){};
    }
  },
  filters: {},
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/content/album/getCategoryAlbum?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
          categoryId: param.get('categoryId') || 31,
          level:param.get('level') || 1
        }),
        success(response) {
          document.body.className += ' loaded';
          try {
            ts.response = response;
            document.title = response.data.categoryName;
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          document.body.className += ' loaded';
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/album_list.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=album_list.json`);
        }
      });
    },
    homeClick(){
      window.location.href = '/course.html'
    }
  },
});
