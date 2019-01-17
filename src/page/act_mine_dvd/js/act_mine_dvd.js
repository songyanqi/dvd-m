// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import localCache from 'dvd-base-js-cache';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import date from 'dvd-base-js-date';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
      date: date,
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),
      ua: ua,
      error: false,
      isApp: ua.isDvdApp(),
      isShowMem: false,
      isSumMask: false,
      // 每个商品可邀请的总数
      totalNum: 0,
      // 0，12号之前，1: 12-13号之间，2: 14号之后
      is12Day: 0,
      is14Day: 0,
      is11Day: 0,
      // 返1111差多少
      isLessMoney: 0,
      // 连续三天购物
      isBuyShow: 0,
      isTop: true,
      isPad: false,
      // 预定总额
      reserveSum: 0,
    }
  },
  computed: {
    currentDate(){
      let now = '';
      if (param.get('deviceTime') !== undefined) {
        now = Date.now();
      } else if (this.response) {
        now = this.response.sys_time + '000';
      }
      return date.format(now, 'yyyy-MM-dd');
    },
    isAdviser(){
      return true;
    }
  },
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;
        if (ua.getQuery("collectCard") && ts.$refs.collectCard) {
          window.scrollTo(0,ts.$refs.collectCard.offsetTop-60);
        }
        if (ua.getQuery("bouns100") && ts.$refs.bouns100) {
          window.scrollTo(0,ts.$refs.bouns100.offsetTop-60);
        }
        if (ua.getQuery("bouns111") && ts.$refs.bouns111) {
          window.scrollTo(0,ts.$refs.bouns111.offsetTop-60);
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
        // native.custom.initHead({
        //   shareOnHead: 1
        // });

        // 初始化轮播图
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          // spaceBetween: 10,
          freeMode: true
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: "大V店|Pink Day 好物提前定",
            desc: "大V店|Pink Day购物集Pink卡瓜分100万现金，还有超级好物预定来袭，款款爆品俘获你心>>>",
            link: location.href,
            imgUrl: "http://9i.dvmama.com/5/pink/cardLogo.jpg"
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
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
    try {
      share.setShareInfo({
        title: "大V店|年货节",
        desc: "大V店|年货节快乐",
        link: location.href,
        imgUrl: "http://9i.dvmama.com/free/year/year_logo.png"
      });
    } catch (err) {
      console.error(err);
    }
    if ((ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0)) {
      this.isTop = false;
    }
    if ((ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0)) {
      this.isPad = true;
    }
    if (ua.getQuery("isShortmsg")) {
      native.custom.openUrlWithApp({
        url:location.href.split("?")[0],
        invoke: true
      })
    }
  },
  methods: {
    /**
     * 接口名称: 我的1018
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18546918
     */
    getData(refresh = false){
      let ts = this;

      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/thethirdyears/myWishList?_=' + Date.now(),
        // url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/willBuy?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          // js_wx_info: 1,
        }),
        success(response) {
          common.checkRedirect(response);

          ts.response = response;
          if (response.data.endMoney) {
            ts.reserveSum = Math.floor(Number(response.data.endMoney.sellerMoney)+Number(response.data.endMoney.userMoney));
          }

        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.error = true;
        }
      });
    },
    /* 清除本地缓存 */
    removeLocalCache() {
      localStorage.removeItem('act_1018_mine_data');
      localStorage.removeItem('act_1018_main_data');
      console.log('本地缓存act_1018_main_data、act_1018_mine_data已清除。')
    },
    // app跳转打开新webview
    isOpenWebview(event) {
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: `${event.currentTarget.href}`,
        });
      }
    },
    // 去主会场
    go1018Main(){
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.close();
      }
    },
    // 是否为mobile
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
    // 我加油的爆品
    handleComeon() {
      this.handleJump('/t-15513.html');
    },
    // 年终奖
    handleWard() {
      this.handleJump('/act_reward_dvd.html');
    },
    handleComeOnList(item,index) {
      this.totalNum = item.totalNumber;
      if (this.response.visitor_status != '3') {
        this.isShowMem = true;
        return;
      }
      if(item.buttonType == '1') {
        if (item.activityNumber == '0') {
          this.isSumMask = true;
          return;
        }
      }
      this.handleJump(`${item.activityLink}&cheerId=${item.cheerId}`);
    },
    handleClose() {
      this.isShowMem = false;
      this.isSumMask = false;
    },
    // 开通会员
    handlerOpenMem() {
      this.handleJump('/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button');
    },
    handlePrevent(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    // handlerCourage() {
    //   this.handleJump(`/act_1111_encourage.html`);
    // },
    // 赠台历规则
    // handleCollectRule() {
    //   this.handleJump('/t-16438.html');
    // },
    // 预定规则
    handleReserveRule() {
      this.handleJump('/t-18806.html');
    },
    // 顾问加油规则
    // handleAdvisorRule() {
    //   this.handleJump('/t-15602.html');
    // },
    // 顾问预定奖励
    handleAdvisorReserve() {
      this.handleJump('/t-18746.html');
    },
    // 抽免单规则
    // handleFree() {
    //   this.handleJump('/t-16628.html');
    // },
    // 顾问组团奖励规则
    // handleAdvisorGroup() {
    //   this.handleJump('/t-17699.html');
    // },
    // 组团奖励规则
    // handleGroup() {
    //   this.handleJump('/t-17692.html');
    // }
  },
  filters: {},
});
