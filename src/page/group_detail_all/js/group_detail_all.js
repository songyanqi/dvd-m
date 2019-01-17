// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
import type from 'dvd-base-js-type';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import cache from 'dvd-base-js-cache';
import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';
import hybrid from 'dvd-service-js-hybrid';

import groupHeadPortrait from '../../group_detail/vue/group-head-portrait';
// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'group-head-portrait':groupHeadPortrait
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
      ajaxing: false,
      memberList: []
    };
  },
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
    console.log("这里是m项目")
    // 获取首屏数据
    this.getData();
  },
  mounted() {
    let ts = this;
    // 设置app头部标题栏
    native.custom.initHead();
    // 设置分享信息
    share.setShareInfo(ts.response.data.shareInfo);
    // 触底通知当前列表加载更多
    util.pageScrollToBottom(function () {
      ts.getData();
    });
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
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData(){
      let ts = this;
      // 已经结尾,不要再调接口
      if (ts.response && ts.response.data.groupList.more == '0') return;
      // 正在请求接口中,不要再调接口
      if (ts.ajaxing) return;
      // 取缓存
      /*let response = cache.getItem('/[[project]]/group_detail_all');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/

      // 调接口
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/sale/api/reverse/getGroupUsers?_='+Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          pageIndex: ts.response ? ts.response.data.groupList.nextPageIndex : 0,
          pageSize: 20,
          groupId: param.get('group_id'),// || 1161193,
          reverseId: param.get('reverse_id'),// || 1161193,
        },
        success(response) {
          try {
            if (response.code === 0) {
              ts.ajaxing = false;
              ts.response = response;
              ts.memberList = ts.memberList.concat(ts.response.data.groupList.dataList);
              popup.loading(false);
              // 设置缓存
              // cache.setItem({
              //   key: '/[[project]]/group_detail_all-getData',        // 缓存key
              //   data: response,           // 缓存data（可以传json或String）
              //   expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
              //     d: 0,             // 天
              //     h: 0,             // 小时
              //     m: 3,             // 分钟
              //     s: 0,             // 秒
              //     ms: 0,            // 毫秒
              //   }
              // })
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          ts.ajaxing = false;
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/group_detail_all.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=group_detail_all.json`);
          }
        }
      });
    },
  },
});
