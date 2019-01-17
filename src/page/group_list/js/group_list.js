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

import groupGoodsList from '../vue/group-goods-list.vue';
import mineList from '../vue/group-detail-list.vue';
import comPicDisplayBox from '../../../component/com-pic-display-box';

// 渲染页面

new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'goods-list': groupGoodsList,
    'mine-list': mineList,
    'com-pic-display-box': comPicDisplayBox
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
      currentList: 1, // 1显示组团列表,2显示我的组团列表
      window,
      banner: [],
      visitor_status: "",
    }
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
    native.custom.initHead({
      shareOnHead: 1,
    });
    // 触底通知当前列表加载更多
    util.pageScrollToBottom(function () {
      if (ts.currentList === 1) {
        ts.$refs['goods-list'].getData();
      } else if (ts.currentList === 2) {
        ts.$refs['mine-list'].getData();
      }
    });
  },

  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData() {
      let ts = this;
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/sale/reverse/getList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          bpId: 14,
          pageIndex: ts.response ? ts.response.data.reverseGroup.nextPageIndex : 0,
          pageSize: 10,
          reverseType: 1,
        },
        success(response) {
          console.log(response)
          ts.response = response;
          ts.banner = ts.response.data.banner
          ts.visitor_status = ts.response.visitor_status
//          console.log('组团列表页顶部 接口返回数据:');
//          console.log(response);
          // 设置分享信息
          share.setShareInfo({
            shareSource: 8,
            title: '大V店组团包邮',
            desc: '一件包邮！定期上新，好货低价又包邮，抢到就省到！',
            link: response.data.shareInfo.link,
            imgUrl: 'http://9i.dvmama.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
          }, ts.response);
          popup.loading(false);
        },
        error(err) {
          console.log(err);
        }
      })

    },
    showPopPic(url) {
      this.$refs['com-pic-display-box'].show(url);
    },
    tabBtnClick(num) {
      // 我的组团,如果未登录,则跳转登录页
      if (num == 2 && this.response.data.isLogin !== '1') {
//            微信登录
//          if(Units.isWechat()){
//            var host = window.location.host;
//            var hostarr = host.split(".");
//            location.href = "http://open."+hostarr[1]+"."+hostarr[2]+"/WechatLogin/index?referer=" + location.href;
//          }else {
//            location.href = '/login.html?referer=${encodeURIComponent(location.href)}';
//          }
//          location.href = '/login.html?referer=${encodeURIComponent(location.href)}';
        login.login();
        return;
      }
      this.currentList = num;
    },
  },
});
