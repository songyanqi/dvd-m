// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import util from 'dvd-service-js-util';
import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import localCache from 'dvd-base-js-cache';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import param from 'dvd-base-js-param';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
       //response: require('../json/act_1111_photo_album.json'),
       response: null,
       num: 0
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getTopics();
  },
  mounted() {
    let ts = this;

    // 设置app头部标题栏
    native.custom.initHead({
      shareOnHead: 1,
    });

    // 设置app头部标题栏
    native.custom.setHead({
      title: document.title,
      homeBtn: '1',
      shareBtn: '1',
    });

    // 设置分享信息
    try {
      share.setShareInfo({
        title: '大V店双11麻麻们都买了啥？讲真！这些爆品真是甚得宝宝欢心，速去围观>>>',
        desc: '好妈妈购物节，超值爆款等你来抢！',
        link: location.href,
        imgUrl: `${location.protocol}[[static]]/page/act_1111_photo_album/img/share.jpg`
      });
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    getTopics(){
      let ts = this;
      let url = `t-15866.html?_=${Date.now()}`;
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'get',
        dataType: 'text',
        data: {},
        success(response) {
          try{
            ts.response = JSON.parse(response);
            localStorage.setItem('act_1111_photo_album_data', response);
          } catch(err) {
            ts.response = JSON.parse(localStorage.getItem('act_1111_photo_album_data'));
          }
          ts.num = Math.round(Math.random()*(ts.response.length - 1));
          ts.$forceUpdate();
        },
        error(error) {
          ts.response = require('../json/act_1111_photo_album.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    }
  }
});
