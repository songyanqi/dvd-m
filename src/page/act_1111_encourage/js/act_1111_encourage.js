// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
// import util from 'dvd-service-js-util';
// import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
// import localCache from 'dvd-base-js-cache';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import floatCalc from 'dvd-base-js-float-calc';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

login.login();

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
      receiveInfo: {
        // "awardPrice": "12.11",
        // "double": "2",
      },
      receiveShow: false,
    };
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          homeBtn: '1',
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg,
          }, ts.response);
        } catch (err) {
          console.warn(err);
        }
      });
    },
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 接口名称: 预定商品-奖励金列表
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18549967
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/advance/getRandRewardList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          // js_wx_info: 1,
        }),
        success(response) {
          try {
            // 遍历出待领取和已领取数量
            let list = response.data.dataList,
              receivedCount = 0,
              receivingCount = 0;
            for (let i in list) {
              let item = list[i];
              if (item.awardPrice) {
                receivedCount++;
              } else {
                receivingCount++;
              }
            }
            response.data.receivedCount = receivedCount;
            response.data.receivingCount = receivingCount;

            // 赋值
            ts.response = response;
          } catch (err) {
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/act_1111_encourage.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=act_1111_encourage.json`);
        },
      });
    },
    /**
     * 接口名称: 预定商品-点击-随机获取奖励金
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18549948
     */
    receive(awardId){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/advance/clickRandAward?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          awardId: awardId,
        }),
        success(response) {
          if (response.code === 0) {
            // 显示弹窗
            ts.receiveInfo = response.data;
            ts.receiveShow = true;

            // 页面状态设置为翻倍
            if (ts.receiveInfo.double === '2') {
              ts.response.data.double = '2';
            }

            // 总额增加
            ts.response.data.awardPriceTotal = floatCalc.plus(ts.response.data.awardPriceTotal, ts.receiveInfo.awardPrice);

            // 点击的待领取设置为已领取
            let list = ts.response.data.dataList,
              receivedCount = 0,
              receivingCount = 0;
            for (let i in list) {
              let item = list[i];
              if (item.awardId === awardId) {
                item.awardPrice = ts.receiveInfo.awardPrice;
              }
              if (item.awardPrice) {
                receivedCount++;
              } else {
                receivingCount++;
              }
            }
            ts.response.data.receivedCount = receivedCount;
            ts.response.data.receivingCount = receivingCount;
            ts.$forceUpdate();
          } else {
            popup.toast('领取未成功');
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/receuve.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=receuve.json`);
        },
      });
    },
  },
  filters: {},
});
