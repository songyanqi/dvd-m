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

//弹框组件
import userChoseMsg from '../vue/userChoseMsg.vue';
//列表组件
import courseList from '../../../component/com-course-list';
// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    userChoseMsg,
    courseList
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
      showModelTag: false,//控制展示弹框
      QList: [],//问题列表
      title: '加载中...',
      showNull: '',//没有内容标记
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
    this.getData((c) => {
      console.log(c)
    });
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
    getData(callBack) {
      let ts = this;
      // 取缓存
      /*let response = cache.getItem('/[[project]]/teacher_guide');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/
      $.ajax({
        cache: false,
        async: true,
        // url: '?_=' + Date.now(),
        url: '/api/mg/content/course/teacher_guide?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({}),
        success(response) {
          try {
            if (response.code === 0) {
              ts.response = response;
              console.log(ts.response)
              let data = ts.response.data;
              ts.title = data.title;
              ts.QList = data.questionList;
              ts.showNull = false;
              callBack("success");
              // 设置缓存
              // cache.setItem({
              //   key: '/[[project]]/teacher_guide-getData',        // 缓存key
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
            else if (response.code == '20077') {
              ts.showNull = true;
            }
            else if (response.code == '30000') {
              login.login();
            } else {
              location.href = '/course.html';
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/teacher_guide.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=teacher_guide.json`);
          }
        }
      });
    },
    /**
     * 展示、关闭弹框方法
     * */
    showModel() {
      let _this = this;
      _this.showModelTag = true;
    },
    closeModel() {
      let _this = this;
      _this.showModelTag = false;
    },
    changeStatus(s, id) {
      let _this = this;
      _this.QList.forEach((item) => {
        if (item.id === id) {
          item.status = s;
          // console.log(item);
          let obj = {
            question_id: id.toString(),
            status: s,
          }
          console.log(obj)
          $.ajax({
            cache: false,
            async: true,
            url: '/api/mg/content/course/question_check_submit?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt.ajax(obj),
            success(response) {
              console.log(response);
              try {
                if (response.code === 0) {
                  //用户点击按钮即更改页面状态 这里不做更改状态处理 以应对网络不好的情况
                }
              } catch (err) {
                // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
              }
            },
            error(error) {
              console.error(error)
            }
          });

        }
      });
    },
    submited() {
      let _this = this;
      // 刷新数据源
      _this.getData((c) => {
        if (c === 'success') {
          //关闭弹框
          _this.showModelTag = false;
        }
      });
    },
    /**
     * 10位数时间戳转 yyyy-mm-dd
     */
    getFormatDate_10_noHM(d, t) {
      let D = new Date(d * 1000);
      let year = D.getFullYear();
      let month = D.getMonth() + 1;
      if (month < 10) {
        month = '0' + month
      }
      let day = D.getDate();
      if (day < 10) {
        day = '0' + day
      }

      let hour = D.getHours();
      if (hour < 10) {
        hour = '0' + hour
      }
      let minute = D.getMinutes();
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = D.getSeconds();
      if (second < 10) {
        second = '0' + second
      }


      let TDate = '';
      if (t === 'cn') {
        TDate = year + '年' + month + '月' + day + '日' + " " + hour + ':' + minute + ':' + second;
      } else {
        TDate = year + '-' + month + '-' + day + " " + hour + ':' + minute + ':' + second;
      }

      return TDate;
    },
  },
});
