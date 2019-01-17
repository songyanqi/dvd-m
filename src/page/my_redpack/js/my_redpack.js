// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
// import tj from 'dvd-service-js-tj';
// import util from 'dvd-service-js-util';
import date from 'dvd-base-js-date';
// import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
// import login from 'dvd-service-js-login';
// import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
// import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';
import ua from 'dvd-base-js-ua';


// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
    'dvd-service-com-paging-list': require('dvd-service-com-paging-list').default,
  },
  data() {
    return {
      // 工具模块
      date,

      // 返回数据
      response: null,

      // 横滑swiper
      swiper: null,

      // 当前列表索引
      listIndex: 0,

      // 未使用、已使用、已过期数量
      usableNum: 0,
      usedNum: 0,
      expiredNum: 0,

      // 红包列表高度
      listHeight: document.documentElement.clientHeight - 44 - (44 * document.documentElement.style.fontSize.replace('px', '') / 100) + 'px',

      // 红包列表数据
      redpackList: [
        // 正常红包列表
        [],
        // 已使用红包列表
        [],
        // 已过期红包列表
        [],
      ],
      // 判断小屏幕
      is_small: false,
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
      });
    },
  },
  beforeCreate() {
  },
  created() {
    //判断小屏幕 在小屏幕手机下微调转赠按钮的样式
    let _this = this;
    let innerWidth = window.innerWidth;
    if (innerWidth < 375) {
      _this.is_small = true;
    }
  },
  mounted() {
    let ts = this;

    document.body.className += ' loaded';

    // 获取第一页
    ts.getNextPage();

    // 初始化红包列表，左右滑动切换
    ts.swiper = new Swiper('.h-swiper', {
      initialSlide: 0,
      on: {
        // 手动滑动时修改标题状态
        slideChangeTransitionEnd() {
          // slideChangeTransitionStart() {
          // 切换当前显示列表索引
          ts.listIndex = this.activeIndex;
          ts.getNextPage();
        },
      },
    });
  },
  filters: {},
  methods: {
    /**
     * 接口名称：我的红包列表接口
     * 接口文档：http://wiki.bravetime.net/pages/viewpage.action?pageId=18548021
     */
    getData(cb) {
      let ts = this;

      // 当前的红包列表索引
      let listIndex = ts.listIndex;

      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/coupon/getList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          state: ts.listIndex + 1,
          pageSize: 10,
          // 下一页的页码，从1开始
          pageIndex: ts.$refs.paging[listIndex].pageNo + 1,
        }),
        success(response) {
          try {
            ts.response = response;

            if (response.code === 0) {
              // 追加数据
              ts.redpackList[listIndex] = ts.redpackList[listIndex].concat(response.data.coupon);
              // 设置未使用、已使用、已过期数量
              ts.usableNum = response.data.usableNum || ts.usableNum;
              ts.usedNum = response.data.usedNum || ts.usedNum;
              ts.expiredNum = response.data.expiredNum || ts.expiredNum;

              // 通知分页器ajax完成
              cb && cb(response.data.hasMore === '0');

              ts.$forceUpdate();
            } else if (response && response.data && response.data.msg) {
              popup.toast(response.data.msg);
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          // this.success(require('../json/my_redpack.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=my_redpack.json`);
          // 通知分页器ajax完成
          cb && cb();
        },
      });
    },
    /**
     * 切换红包列表
     */
    changeRedpackList(listIndex) {
      let ts = this;
      ts.listIndex = listIndex;
      ts.swiper.slideTo(listIndex);
    },
    /**
     * 触发分页器加载下一页
     */
    getNextPage() {
      let ts = this;

      // 当前的红包列表
      let paging = ts.$refs.paging[ts.listIndex];

      // 如果页码是0，加载第一页数据
      if (paging.pageNo === 0) {
        paging.getNextPage();
      }
    },
    /**
     * 转赠红包
     * */
    givenRedPack(id) {
      let _this = this;
      console.log(id); // 红包id
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/coupon/share?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          bonusId: id
        }),
        success(response) {
          console.log(response)
          try {
            if (response.code === 0) {
              let data = response.data;
              console.log(data);
              // let data = {
              //   link: "https://18714428582.davdian.com/m/red_packet_given.html?share_sign=iyi57568sd979d7h9insk990ut2x",//红包分享页面地址
              //   title: "大v顾问分享给您一个大红包",//分享标题
              //   imgUrl: "https://pic.davdian.com/free/goodsDetail/no_goods_icon.png",//分享图片
              //   desc: "XXX分享了一个大红包，快来领取吧",//简介文案
              // }
              // 判断当前环境
              let appUA = ua.isDvdApp();
              if (appUA === true) {
                // 吊起分享面板
                native.Share.shareInfo({
                  show: 1,//0：不显示，1：显示。
                  shareType: 0,//0：分享图文链接方式，1：只分享图片 （支持图片分享的分享图片、不支持分享图文链接（需要传tilte、desc、link、imgUrl））,2:面板可分享图片，也可分享图文链接。
                  title: data.title,
                  desc: data.desc,
                  link: data.link,
                  imgUrl: 'http://pic.davdian.com/free/2018/06/06/300_300_ba9c8cfaa88bc53289a4161c31135148.jpg',
                  panelStyle: 0,//0:单行样式，1:店铺二维码新样式
                });
              } else {
                location.href = data.link;
              }
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.log(error);
        }
      });
    }
  }
});
