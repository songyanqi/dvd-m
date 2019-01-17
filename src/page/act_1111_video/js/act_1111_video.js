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
       //response: require('../json/act_1111_video.json'),
       response: null,
      videoStarted: false,
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
    // this.getData();
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
        title: '买好货，购好物，就上大V店',
        desc: '大V店联合供应商确保正品，保质保量，全力服务好每一位大V妈妈',
        link: location.href,
        imgUrl: `${location.protocol}[[static]]/page/act_1111_video/img/share.jpg`
      });
    } catch (err) {
      console.error(err);
    }
  },
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
        url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
        }),
        success(response) {
          //ts.response = response;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 开始/暂停
     */
    videoClick(){
      let video = document.querySelector('video');
      if (this.videoStarted) {
        video.pause();
        this.videoStarted = false;
      } else {
        video.play();
        this.videoStarted = true;
      }
    },
    getTopics(){
      let ts = this;
      let url = `/t-15585.html?_=${Date.now()}`;
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
            localStorage.setItem('act_1111_video_data', response);
          } catch(err) {
            ts.response = JSON.parse(localStorage.getItem('act_1111_video_data'));
          }

          ts.num = Math.round(Math.random()*(ts.response.length - 1));
          ts.$forceUpdate();
        },
        error(error) {
          ts.response = require('../json/act_1111_video.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    }
  }
});
