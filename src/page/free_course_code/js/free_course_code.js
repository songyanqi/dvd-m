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

// 渲染页面
new Vue({
  el: '.app',
  components: {
    // 'dvd-service-com-title': require('dvd-service-com-title').default,
    // 'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
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
      is_S:false, // 是否为小屏幕（5）
      // 业务参数
      pageStatus: 0, // 页面状态
      /**
       页面状态status：
       0:用户未登录 显示和1一样 点击按钮跳登录注册 1
       1:用户为非会员，可正常领取 1
       2:用户为非会员，已付费买过 1
       3:用户为非会员，听课券已经被使用 1
       4:用户为会员，无需听课券 1
       5:用户为听课券创建者 显示分享提示  1
       6:用户为非会员，该用户已领取过该券 1
       9:异常 显示和5一样 不显示分享提示
       */
      userIcon: '//9i.dvmama.com/free/2018/05/17/user.png', // 用户头像
      userName: '', // 用户名
      cntImg: '', // 链接图片
      price: "元",// 课程价格
      courseId: param.get('courseId', location.href), // 课程id
      userId: param.get('userId', location.href), // 听课券创建人id
      shareDesc: "",//分享描述
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
    console.log(this.userId)
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
            title: '送你一张免费听课券',
            desc: ts.shareDesc,
            link: location.href,
            imgUrl: ts.userIcon,
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
      /*let response = cache.getItem('/[[project]]/free_course_code');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/
      // 调接口
      const obj = {
        courseId: Number(ts.courseId),
        coderId: Number(ts.userId)
      }
      console.log(obj);
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/content/course/shareForH5?_=' + Date.now(),
        // url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax(obj),
        success(response) {
          console.log(response)
          try {
            if (response.code === 0) {
              ts.response = response;
              ts.userIcon = response.data.course.headImg; // 用户头像
              ts.userName = response.data.course.coderName; // 用户名
              ts.cntImg = response.data.course.imgUrl; // 链接图片
              ts.pageStatus = response.data.userStatus.status; //页面状态
              // ts.pageStatus = 6; //页面状态
              ts.price = response.data.course.coursePrice;//课程价格

              ts.shareDesc = ts.userName + '送你一节大咖课:' + response.data.course.courseTitle;
              // 设置缓存
              // cache.setItem({
              //   key: '/[[project]]/free_course_code-getData',        // 缓存key
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
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/free_course_code.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=free_course_code.json`);
          }
        }
      });
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
     * 领取听课券
     * */
    getTicket() {
      let _this = this;
      if (_this.pageStatus === 0) {
        login.login();
        return;
      }
      let obj = {
        courseId: Number(_this.courseId),
        shareUserId: Number(_this.userId),
        listenCode: 1,
        code: ""
      };
      popup.loading(true);
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/content/course/join?_=' + Date.now(),
        // url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax(obj),
        success(response) {
          console.log(response)
          try {
            if (response.code === 0) {
              popup.loading(false);
              let data = response.data;
              if (data.msg === '报名成功' && _this.pageStatus === 1) {
                _this.pageStatus = 6;
                // popup.alert({text: '领取成功，快去听课吧~'});
                popup.toast('领取成功，快去听课吧~');
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
            this.success(require('../json/free_course_code.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=free_course_code.json`);
          }
        }
      });
    },
    /**
     * 判断登录
     * 跳转到课程详情
     * */
    toDetail() {
      let _this = this;
      console.log(_this.courseId);
      if (_this.pageStatus === 0) {
        login.login();
        return;
      }
      location.href = '/course-' + _this.courseId + '.html';
    }
  }
});
