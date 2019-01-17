// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import localCache from 'dvd-base-js-cache';
import login from 'dvd-service-js-login';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import date from 'dvd-base-js-date';
import popup from 'dvd-service-js-popup';

// 懒加载初始化
vueLazyload.init(true);

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'com-footer': require('dvd-service-com-footer').default,
    'com-act-reward': require('../vue/com-act-reward.vue').default,
    'com-act-hotbrand': require('../vue/com-act-hotbrand.vue').default,
    'com-act-bouns-rain': require('../../act_1018_bouns_rain/vue/com-act-bouns-rain.vue').default,
    'com-act-reserve': require('../../act_1018_reserve/vue/com-act-reserve.vue').default,
  },
  data() {
    return {
      response: null,
      topics: [
        // 头图
        {id: param.get('t1') || '15456', content: null},
        // 上方专题
        {id: param.get('t2') || '15458', content: null},
        //预约图片专题
        {id: param.get('t3') || '15457', content: null},
        // 下方专题
        {id: param.get('t4') || '15460', content: null}
      ],
      actBeginTime: new Date(2017, 12 - 1, 25),
      actEndTime: new Date(2017, 12 - 1, 29),
      countDown: Date.now() < new Date(2017, 12 - 1, 29) ? (date.getCountDown(Date.now() < new Date(2017, 12 - 1, 25) ? new Date(2017, 12 - 1, 25) : new Date(2017, 12 - 1, 29))) : {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
      },
      ua: ua,
      share: share,
      //预约排序列表
      reserveList: [],
      param: param,
      isShowBeginPop: false,
      isShowBeginPopCloseAnimation: false,
      start_1018_flag: false,
      isApp: false,
      currentTime: 0,
      isMainCenter: false,

      pinkCountDown: {
        hour: '00',
        minute: '00',
        second: '00',
      },
      pinkTips: '距离活动开始',
      currentHour: "",
      currentMin: "",
      // pink大礼包链接
      pinkLink: "",
    }
  },
  computed: {
    currentDate() {
      let now = '';
      let that = this;
      // now = Date.now();
      if (param.get('deviceTime') !== undefined) {
        now = Date.now();
      } else if (this.response) {
        now = this.response.sys_time + '000';
      }
      that.currentTime = now;
      return date.format(now, 'yyyy-MM-dd');
    },
    /*currentTime() {
      let now = '';
      let that = this;
      // now = Date.now();
      if (param.get('deviceTime') !== undefined) {
        now = Date.now();
      } else if (this.response) {
        now = this.response.sys_time + '000';
      }
      return now;
    },*/
  },

  watch: {
    response() {
      this.$nextTick(() => {
        let ts = this;
        // app跳转打开新webview
        if (ua.isDvdApp()) {
          $(document).on('click', 'a', function (event) {
            event.preventDefault();
            native.Browser.open({
              url: `${this.href}`,
            });
          });
        }

        if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
          native.custom.initHead({
            shareOnHead: 1,
            isAudioAbsorb:1,
            isShowAudio:1
          });
        }else {
          native.Browser.setHead({
            backBtn: 1,
            isAudioAbsorb:'1',
            isShowAudio:'1',
            hideHead: '1',
          });
        }
        // 开启10.18弹窗
        // setTimeout(function () {
        //   if (ts.currentDate == '2017-12-25') {
        //     ts.isShowBeginPop = false;
        //   } else {
        //     ts.isShowBeginPop = localStorage.getItem('start_1018_flag') ? false : true;
        //   }
        // }, 3000);
        // 我的10.18弹窗
        setTimeout(function () {
          ts.start_1018_flag = true;
          // if (ts.currentDate == '2017-12-25') {
          //   ts.start_1018_flag = true;
          // } else {
          //   ts.start_1018_flag = localStorage.getItem('start_1018_flag');
          // }
        }, 1000);
        // 刷新倒计时
        let hours = 0,
            minutes = 0,
            seconds = 0;

        // ts.currentTime = Date.now();
        ts.currentTime = Number(ts.currentTime);
        ts.currentMin = new Date(Number(ts.currentTime)).getMinutes();
        ts.currentHour = new Date(Number(ts.currentTime)).getHours();

        let dateYears = new Date(ts.currentTime).getFullYear(),
            dateMounth = Number(new Date(ts.currentTime).getMonth())+1,
            dateDay = new Date(ts.currentTime).getDate(),
            pinkHours = 8;
        let everyDay8 = new Date(`${dateYears}/${dateMounth}/${dateDay} 08:00:00`);

        let pinkElseMinute = new Date(ts.currentTime).getMinutes(),
            pinkElseSecond = new Date(ts.currentTime).getSeconds(),
            pinkElse = 3600 - (pinkElseMinute * 60 + pinkElseSecond);

        setInterval(function () {
          if (ts.currentDate < '2017-12-25') {
            ts.countDown = date.getCountDown(ts.actBeginTime);
            if (ts.countDown.day == '00' && ts.countDown.hour == '00' && ts.countDown.minute == '00' && ts.countDown.second == '00') {
              location.reload();
            }
          } else if (ts.currentDate < '2017-12-29') {
            ts.countDown = date.getCountDown(ts.actEndTime);
            if (ts.countDown.day == '00' && ts.countDown.hour == '00' && ts.countDown.minute == '00' && ts.countDown.second == '00') {
              location.reload();
            }
          } else {
            ts.countDown = {
              day: '00',
              hour: '00',
              minute: '00',
              second: '00',
            }
          }
          // ts.$forceUpdate();


          // pinkDay 倒计时
          if (ts.currentHour < 8) {
            ts.pinkTips = '距离活动开始';
            // 小于8小时，问问23点是否算数
            ts.pinkCountDown = {
              "hour": date.getCountDown(everyDay8).hour,
              "minute": date.getCountDown(everyDay8).minute,
              "second": date.getCountDown(everyDay8).second,
            };
            ts.pinkLink = "/t-18797.html";
          }
          if (ts.currentHour >= 8) {
            ts.pinkLink = "/ab-1128.html";
            if (ts.currentMin >= 30) {
              ts.pinkTips = '距离下一场开始仅剩';
            } else {
              ts.pinkTips = '距离本场结束仅剩';
            }


            if (pinkElse > 0) {
              pinkElse--;
              hours = Math.floor(pinkElse / 3600);
              minutes = Math.floor((pinkElse / 60) % 60);
              seconds = Math.floor(pinkElse % 60);

              hours = hours >= 10 ? hours : "0" + hours;
              minutes = minutes >= 10 ? minutes : "0" + minutes;
              seconds = seconds >= 10 ? seconds : "0" + seconds;
            }
            if (pinkElse == "0") {
              pinkElse = 3600;
            }

            ts.pinkCountDown = {
              "hour": hours,
              "minute": minutes,
              "second": seconds,
            };
          }
        }, 1000);

        // app下拉异步刷新
        window.iosInterface = window.iosInterface || {};
        window.iosInterface.asynRefresh = function () {
          ts.getData();
          ts.getTopics();
        };
      })
    },
    topics: {
      handler(){
        // 头图自动播放
        let video = document.querySelector('.mainVideo');
        if (video) {
          video.muted = true;
          function playVideo() {
            video.play();
          }

          document.addEventListener("WeixinJSBridgeReady", playVideo, false);
          document.addEventListener('touchstart', playVideo, false);
          setTimeout(playVideo, 1000);
        }
      },
      deep: true
    }
  },
  beforeCreate() {
  },
  created() {
    this.getTopics();
    // ua.getQuery("isMain")
    if (ua.getQuery("isMain") == 'isMain' && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
      this.isMainCenter = true;
    }
  },
  mounted() {
    this.getData();
    this.isApp = ua.isDvdApp();
    if (ua.getQuery("isShortmsg")) {
      native.custom.openUrlWithApp({
        url:location.href.split("?")[0],
        invoke: true
      })
    }
  },
  methods: {
    shareInfo(newObj) {
      let ts = this;
      try {
        let title = newObj.shareInfo.one.title;
        let desc = newObj.shareInfo.one.desc;
        let shareImg = newObj.shareInfo.one.shareImg;
        // if (ts.currentDate < '2017-12-25') {
        //   title = newObj.shareInfo.one.title;
        //   desc = newObj.shareInfo.one.desc;
        //   shareImg = newObj.shareInfo.one.shareImg;
        // } else if (ts.currentDate < '2017-12-26') {
        //   title = newObj.shareInfo.two.title;
        //   desc = newObj.shareInfo.two.desc;
        //   shareImg = newObj.shareInfo.two.shareImg;
        // } else if (ts.currentDate < '2017-12-29') {
        //   title = newObj.shareInfo.three.title;
        //   desc = newObj.shareInfo.three.desc;
        //   shareImg = newObj.shareInfo.three.shareImg;
        // }
        share.setShareInfo({
          title: title,
          desc: desc,
          link: location.href,
          imgUrl: shareImg
        }, ts.response);
      } catch (err) {
        console.error(err);
      }
      if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
        native.custom.initHead({
          shareOnHead: 1,
          isAudioAbsorb:1,
          isShowAudio:1
        });
      }else {
        native.Browser.setHead({
          backBtn: 1,
          isAudioAbsorb:'1',
          isShowAudio:'1',
          hideHead: '1',
        });
      }
	  },
    /**
     * 接口名称: 获取主会场活动信息
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18546916
     */
    getData(refresh = false){
      let ts = this;

      // 缓存
      let cacheKey = `act_1111_main_data`;
      // 按时间取缓存
      let minute = new Date().getMinutes();
      if (minute > 0 && minute < 59) {
        // 取缓存
        let data = localCache.getItem(cacheKey);
        if (data && !refresh) {
          this.response = data;
          ts.$forceUpdate();
          return;
        }
      }

      // let url = 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/reserveList';
      let url = '/api/mg/sale/thethirdyears/index?_=' + Date.now();

      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
        }),
        success(response) {
          common.checkRedirect(response);
          if (response.data && response.data.futureSubscribe) {
            response.data.futureSubscribe.sort(ts.getSort);
          }
          // 修改当前服务器时间
          // response.sys_time = parseInt(new Date(2017,9,19,22) / 1000);
          ts.response = response;
          // 刷新页面
          ts.$forceUpdate();

          // 存缓存
          /*localCache.setItem({
            key: cacheKey,            // 缓存key
            data: response,           // 缓存data（可以传json或String）
            expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
              d: 0,             // 天
              h: 0,             // 小时
              m: 1,             // 分钟
              s: 0,             // 秒
              ms: 0,            // 毫秒
            }
          });*/
        },
        error(error) {
          // ts.response = require('../json/act_1018_main.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });

    },
    /**
     * 获取专题配置数据
     * 默认头图地址: http://9i.dvmama.com/free/2017/09/13/750_895_fef7e55d54bb1a61d6598bdcbfc523ff.jpg
     */
    getTopics(refresh = false){
      let ts = this;
      for (let i in ts.topics) {
        let topic = ts.topics[i];
        let cacheKey = `act_1111_main_t-${topic.id}`;
        // 按时间取缓存
        let minute = new Date().getMinutes();
        if (minute > 10) {
          // 取缓存
          let data = localCache.getItem(cacheKey);
          if (data && !refresh) {
            topic.content = data;
            if(i == '0') {
              ts.shareInfo(topic.content);
	          }
            ts.$forceUpdate();
            continue;
          }
        }
        let url = `/t-${topic.id}.html?_=${Date.now()}`;
        $.ajax({
          cache: false,
          async: true,
          url: url,
          // url: `http://18686604386.vyohui.cn/t-9926.html?_=${Date.now()}`,
          // url: `http://18686604386.bravetime.net/t-13451.html?_=${Date.now()}`,
          type: 'get',
          dataType: 'text',
          data: {},
          success(response) {
            try {
              // 头图json转换
              if (topic.id == (param.get('t1') || ts.topics[0].id)) {
                response = JSON.parse(response);
                ts.shareInfo(response);
              }
              // 预约json转换
              if (topic.id == (param.get('t3') || ts.topics[2].id)) {
                response = JSON.parse(response);
              }

              topic.content = response;
              ts.$forceUpdate();

              // 存缓存
              localCache.setItem({
                key: cacheKey,            // 缓存key
                data: response,           // 缓存data（可以传json或String）
                expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
                  d: 0,             // 天
                  h: 0,             // 小时
                  m: 10,             // 分钟
                  s: 0,             // 秒
                  ms: 0,            // 毫秒
                }
              });
            } catch (err) {
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      }
    },
    /* 每次活动点击，清除本地缓存 */
    removeLocalCache() {
      localStorage.removeItem('act_1111_mine_data');
      localStorage.removeItem('act_1111_main_data');
      console.log('本地缓存act_1111_main_data、act_1111_mine_data已清除。')
    },
    // 排序
    /*getSort(item1,item2) {
      return item1.actType - item2.actType;
    },
    // 预约提醒
    handleRemind(item) {
      if (login.needLogin()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      let that = this;
      let obj = encrypt.ajax({
        actType: item.actType,
        isSub: item.isSub == '0' ? "1" : "0",
      });
      // let url = " https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/eleReserve";
      let url  = "/api/mg/sale/activityremind/subscribe";
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'post',
        dataType: 'json',
        data: obj,
        success(res) {
          if (!res.code) {
            if (res.data.code == '0') {
              if (that.response.data.futureSubscribe) {
                for(let i of that.response.data.futureSubscribe) {
                  if (item.actType === i.actType) {
                    item.isSub = item.isSub == '0' ? 1 : 0;
                  }
                }
              }
            } else {
              popup.toast(res.data.msg);
            }
          } else {
            popup.toast(res.data.msg);
          }
        },
        error(err) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      })
    },*/
    isLogin(event) {
      if (login.needLogin()) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    isMobile() {
      let ua = navigator.userAgent;
      return !!ua.match(/Mobile/i);
    },
    // 跳转方式
    handleJump(url) {
      if (this.isApp) {
        event.preventDefault();
        native.Browser.open({
          url: url
        });
      } else if (this.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
    // 头图跳转的链接
    handleRule() {
      // if(Number(this.response.sys_time) * 1000 >= new Date('2017/12/22 00:00:00').getTime()) {
      //   this.handleJump("/t-17146.html");
      // }
      this.handleJump("/t-18796.html");
    },
    /** 关闭1018弹窗 */
    closeBeginPop(){
      let ts = this;
      ts.isShowBeginPopCloseAnimation = true;
      setTimeout(function () {
        ts.isShowBeginPop = false;
        localStorage.setItem('start_1018_flag', 1);
        ts.start_1018_flag = 1;
        ts.$forceUpdate();
      }, 1000);
    },
    // pink大礼包
    handleBouns() {
      this.handleJump(this.pinkLink);
    }
  },
  filters: {},
});
