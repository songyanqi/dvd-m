// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Swiper from 'swiper';
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
import ua from 'dvd-base-js-ua';
import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';
import hybrid from 'dvd-service-js-hybrid';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-footer': require('dvd-service-com-footer').default,
    'network-error':require('../../../component/network-error.vue').default
  },
  data() {
    return {
      response: null,
      swiper: null,
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),//会员
      sysTime:0, //当前时间戳
      userHead:[], //静态资源顶部
      saveMoney:{}, //优选好物
      earningMoney:[],//一起赚钱静态
      learn:{}, //好课推荐
      activity:{}, //社群活动
      ua,
      networkError:false
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;
        // 顶部系统状态栏
        if (that.$refs.sysStatus) {
          that.sysStatus_callback = function(event) {
            that.scrollTop = util.getDocumentScrollTop();
            that.$refs.sysStatus.style.opacity = that.scrollTop / 200;
          };
          window.addEventListener('scroll', that.sysStatus_callback, false);
        }
        // 刚渲染完主动触发scroll设置吸顶效果
        var event = document.createEvent('Events');
        event.initEvent('scroll', true, false);
        document.body.dispatchEvent(event);

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
    document.title = '会员';
    native.PullDownRefresh.onPullDownRefresh({
      success(){
        // popup.toast("数据即将更新")
        that.getData();
        return true;
      }
    })
  },
  updated(){
    let that = this;
    this.$nextTick(function(){
      if(that.swiper){
        that.swiper.update();
      }else{
        
        that.swiper = new Swiper('.join-scroll', {
          // 滑动方向
          direction: 'vertical',
          // 自动播放时间间隔
          autoplay: true,
          // false用户拖动后继续自动滑动
          autoplayDisableOnInteraction: true,
          // 每次滑动的动画时间
          speed: 500,
          // 每个swiper-slide之间的间距
          spaceBetween: 3,
          // 禁止用户拖动
          simulateTouch: true,
          // 循环，播放到最后继续滚动，而不是突然反方向滚动到第一个
          loop: true
        });
      }
    })
  },
  filters: {},

  methods: {
    
    /**
     * 接口名称:/api/mg/user/tab/detail  接口
     * 接口文档:http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=19637043
     */
    getData() {
      let that = this;
      hybrid.System.getNetworkType({
      success(response){
        if(response.networkType==0){
          that.networkError = true;
          popup.loading(0);
        }else{
          that.networkError = false;
          handler();
        }
      },error(){
        handler();
      }
    });

    function successFunction(response){
      try {
            that.response = response;
            that.sysTime = response.sys_time;//当前时间
            that.userHead = response.data.user_head;//顶部文字内容轮播
            that.saveMoney = response.data.save_money;//价钱
            that.earningMoney = response.data.earning_money;//一起赚钱
            that.learn = response.data.learn;//好课推荐
            that.activity = response.data.activity;//社群活动
            that.isSeller = login.isSeller();
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        }

    function handler(){
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/user/tab/detail?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          js_wx_info: 1
        },
        success(response) {
          popup.loading(0);
          successFunction(response);
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/member_tab.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=member_tab.json`);
        }
      });
    }


      
      
    },
    //加入会员
    //顶部banner
    toVipBtn(obj) {
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.member_url,
        });
      } else {
        window.location.href = obj.member_url;
      }
    },
    noVipBtn(obj) {
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.non_member_url,
        });
      } else {
        window.location.href = obj.non_member_url;
      }
    },
    //优选好物
    toSaveMoney(obj) {
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':`/${obj.goods_id}.html`,
        });
      } else {
        window.location.href = `/${obj.goods_id}.html`;
      }
    },
    moreSaveMoney(obj){
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.position[0].url,
        });
      } else {
        window.location.href = obj.position[0].url;
      }
    },
    //一起赚钱
    toEarnMoney(obj) {
      if (obj && obj.location !== '') {
        if(ua.isDvdApp()) {
          native.Browser.open({
            'url':obj.location,
          });
        } else {
          window.location.href = obj.location;
        }
      } else {
        if(ua.isDvdApp()) {
          native.Browser.open({
            'url':`/${obj.goods_id}.html`,
          });
        }else {
          window.location.href = `/${obj.goods_id}.html`;
        }

      }
    },
    moreEarningMoney(obj){
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.position[0].url,
        });
      } else {
        window.location.href = obj.position[0].url;
      }
    },
    //好课推荐
    //前提保证好课推荐 如果配置了ID 但是没有配置跳转地址，那么通过type 类型去判断跳转单节课还是系列课
    toLearn(obj) {
      if (obj && obj.location !== '') {
        if (ua.isDvdApp()) {
          native.Browser.open({
            'url':obj.location,
          });
        } else {
          window.location.href = obj.location;
        }
      } else {
        if (obj.type === 1) {
          //单节课
          if (ua.isDvdApp()) {
            native.Browser.open({
              'url': '/course-' + obj.course_id +'.html',
            });
          } else {
            window.location.href = '/course-' + obj.course_id + '.html';
          }
        } else {
          // 系列课
          if (ua.isDvdApp()) {
            native.Browser.open({
              'url': '/course-series-' + obj.course_id + '.html',
            });
          } else {
            window.location.href = '/course-series-' + obj.course_id + '.html';
          }
        }

      }

    },
    moreLearn(obj) {
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.url,
        });
      } else {
        window.location.href = obj.url;
      }
    },
    //社群活动
    toActivity(obj) {
      login.login();
      if (obj && obj.location !== '') {
        if (ua.isDvdApp()) {
          native.Browser.open({
            'url': obj.location,
          });
        } else {
          window.location.href = obj.location;
        }
      } else {
        if (ua.isDvdApp()) {
          native.Browser.open({
            'url':'/story/act_detail.html?themeId=' + obj.activity_id,
          });
        } else {
          window.location.href = '/story/act_detail.html?themeId=' + obj.activity_id;
        }
      }

    },
    moreActivity(obj){
      console.log(obj.url.indexOf('/story/index.html'));
      var i = obj.url.indexOf('/story/index.html')
      if(i !== -1) {
        login.login();
      }
      if(ua.isDvdApp()) {
        native.Browser.open({
          'url':obj.url
        });
      } else {
        window.location.href = obj.url;
      }
    },
  },
});
