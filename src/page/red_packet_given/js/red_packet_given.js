// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
// import tj from 'dvd-service-js-tj';
// import type from 'dvd-base-js-type';
// import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
// import cache from 'dvd-base-js-cache';
// import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
// import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
// import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';

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
      is_X: false, // 是否为大屏幕
      is_S: false, // 是否为小屏幕
      // 业务参数
      /**
       * 页面状态
       * 0可领取（未登录）
       * 1已过期
       * 2可分享
       * 3领取成功
       * 4已经被领取
       * 5领取失败
       * 9异常
       */
      pageStatus: 0,
      data: {}, // 页面参数
      shareSign: param.get('share_sign', location.href), // 加密后的分享id 用于领取操作
      isLoading: false,//领取按钮防刷
      defaultIcon:"https://fe-ws.davdian.com/m/static/dist/static/page/center/img/default-head.png?v=fb9bea61d4",
    };
  },
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
    // 获取首屏数据
    this.getData();
    // 获取浏览器高度判断是否显示下方
    this.isHeight();
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
            title: ts.response.data.shareInfo.title,
            desc: ts.response.data.shareInfo.desc,
            link: ts.response.data.shareInfo.link,
            imgUrl: 'http://pic.davdian.com/free/2018/06/06/300_300_ba9c8cfaa88bc53289a4161c31135148.jpg',
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

      // 取缓存
      /*let response = cache.getItem('/[[project]]/red_packet_given');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/

      // 调接口
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/coupon/share_info?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          shareSign: ts.shareSign
        }),
        success(response) {
          try {
            if (response.code === 0) {
              ts.response = response;
              let data = response.data;
              data.start_time = ts.getFormatDate(data.beginTime);
              data.end_time = ts.getFormatDate(data.endTime);
              data.create_ime = ts.getFormatDate(data.createTime, true);
              ts.data = data
              // console.log(ts.data);
              // 计算页面状态
              /**
               * 页面状态
               * 0可领取（未登录）
               * 1已过期
               * 2可分享
               * 3领取成功
               * 4已经被领取
               * 9异常
               */
              let is_login = login.isLogined();
              // console.log('is_login:' + is_login)
              if (is_login === true) {
                //p0 红包可领取
                //待使用 不是本人 未领取
                if (data.bonuState === 1 && data.isOwners === 1 && data.receivedStatus === 1) {
                  ts.pageStatus = 0;
                  return;
                }
                //p1 红包使用期限已过期
                //状态已过期或者可用期限小于当前时间
                let now = new Date().getTime() / 1000
                if (Number(data.bonuState.endTime) <= now || data.bonuState === 3) {
                  ts.pageStatus = 1;
                  return;
                }
                //p2 可分享
                //待使用 是自己 未领取 未过期
                if (data.bonuState === 1 && data.isOwners === 2 && data.receivedStatus === 1) {
                  ts.pageStatus = 2;
                  return;
                }
                //p3 领取成功 领取之后变更 或为领取者本人
                if (data.receivedStatus === 2 && data.isReceiver === 2) {
                  ts.pageStatus = 3;
                  return;
                }

                //p4 已经被领取
                //已领取
                if (data.receivedStatus === 2 && data.isReceiver === 1) {
                  ts.pageStatus = 4;
                  return;
                }
                //p9 异常不在这里处理 在本接口错误码中处理

              }
              else {
                //p1 红包使用期限已过期
                //状态已过期或者可用期限小于当前时间
                let now = new Date().getTime() / 1000
                if (Number(data.bonuState.endTime) <= now || data.bonuState === 3) {
                  ts.pageStatus = 1;
                  return;
                }
                //p4 已经被领取
                //已领取
                if (data.receivedStatus === 2 && data.isReceiver === 1) {
                  ts.pageStatus = 4;
                  return;
                }
                ts.pageStatus = 0;
              }
              // 设置缓存
              // cache.setItem({
              //   key: '/[[project]]/red_packet_given-getData',        // 缓存key
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
            else if (response.code === 61010) {
              ts.pageStatus = 9;
            }
            else {
              popup.toast(response.data.msg);
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/red_packet_given.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=red_packet_given.json`);
          }
        }
      });
    },
    /**
     * 领取红包按钮
     * 点击时根据不同的页面状态进行不同的操作
     * */
    getRedPack() {
      let _this = this;
      // console.log(_this.pageStatus);
      let s = _this.pageStatus
      /**
       * 页面状态
       * 0可领取（未登录）
       * 1已过期
       * 2可分享
       * 3领取成功
       * 4已经被领取
       * 5领取失败
       * 9异常
       */
      if (s === 0) {
        let is_login = login.isLogined();
        if (is_login !== true) {
          login.login();
          return;
        }
        _this.isLoading = true;
        // let data = {
        //   receiveUserName: "领取人昵称",
        //   shareUserIcon: "https://pic.davdian.com/goods/2018/06/05/279_300_3df3b7c8b5af6fc115319e7e552761ab.png?x-oss-process=image/format,webp",
        // };
        let obj = {
          shareSign: _this.shareSign
        }
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/user/coupon/receive_share_coupon?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax(obj),
          success(response) {
            // console.log(response)
            try {
              if (response.code === 0) {
                let data = response.data;
                _this.pageStatus = 3;
                _this.data.receiveUserName = data.receiveUserName;
                _this.data.shareUserIcon = data.shareUserIcon;
                popup.toast('领取成功');
                _this.isLoading = false;
              } else {
                popup.toast(response.data.msg);
                _this.isLoading = false;
                _this.pageStatus = 5;
              }
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.log(error)

          }
        });

      }
      if (s === 1 || s === 3 || s === 4 || s === 5 || s === 9) {
        location.href = "index.html";
      }
    },
    /**
     * 获取浏览器高度判断是否为大屏幕
     * */
    isHeight() {
      let _this = this;
      let height = window.innerHeight;
      let width = window.innerWidth;
      if (height > 675) {
        _this.is_X = true;
      }
      if(width < 375){
        _this.is_S = true;
      }
    },
    /**
     * 10位数时间戳转年月日
     * */
    getFormatDate(d, t) {
      let D = new Date(d * 1000);
      let year = D.getFullYear();
      let month = D.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let day = D.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      let hour = D.getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      let minute = D.getMinutes();
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = D.getSeconds();
      if (second < 10) {
        second = '0' + second;
      }

      let FDate = "";
      if (t === true) {
        FDate = year + '.' + month + '.' + day + " " + hour + ':' + minute + ':' + second;
      } else {
        FDate = year + '.' + month + '.' + day;
      }
      return FDate;
    },
  },
});
