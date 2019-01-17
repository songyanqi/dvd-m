// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import login from 'dvd-service-js-login';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import vueLazyload from 'dvd-service-js-img-lazyload';

login.needLogin();
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default
  },
  data() {
    return {
      type: param.get('type', window.location.href), //type为1时是我的预定奖励，type为2时是我预约的商品，type为3时是我预定的商品
      response: null,
      ajaxing: false,
      list: [],
      url: '',
      totalReward: 0,
      myAppointment: null,
      // act_1018_mine_list: localStorage.getItem('subscribe_1018_goods'),
      act_1018_mine_list: null,
      date: date,
      isMore: false,
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
  },
  mounted() {
    let ts = this;
    if (ts.type == 2 && ts.act_1018_mine_list) {
      ts.myAppointment = JSON.parse(ts.act_1018_mine_list);
      for (var i in ts.myAppointment) {
        ts.myAppointment[i].from = 'app预约'
      }
    };
    ts.getData();
    //页面滚动加载
    window.onscroll = function () {
      var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);//真实内容高度
      //视窗高度
      var viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
      //隐藏高度即滚动的高度
      var scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
      if (pageHeight - viewportHeight - scrollHeight <= 5) {
        ts.getData();
      }
    }
  },
  methods: {
    /**
     * type为1时
     * 接口名称: 服务人群
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547189
     * type为2时
     * 接口名称: 我的预约列表
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547288
     * type为3时
     * 接口名称: 预定商品
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547187
     */
    getData() {
      // 已经结尾,不要再调接口
      if (this.response && (this.response.data.more == '0' || this.response.data.more == undefined)){
        if (this.list.length > 10) {
          this.isMore = true;
        }
        return;
      }
      // 正在请求接口中,不要再调接口
      if (this.ajaxing) return;
      this.ajaxing = true;
      let ts = this;
      if (ts.type == 1) {
        ts.url = '/api/mg/sale/advance/getAwardList?_=';
      } else if (ts.type == 2) {
        ts.url = '/api/mg/sale/explosion/getMyBespeakList?_=';
      } else if (ts.type == 3) {
        ts.url = '/api/mg/sale/advance/getAdvanceList?_=';
      } else if (ts.type == 4) {
        ts.url = '/api/mg/sale/usercheerbuy/getMyUserCheerList?_=';
      } else if (ts.type == 5) {
        ts.url = '/api/mg/sale/annualbonus/getAnnualLogList?_=';
        // ts.url = ' https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/yearRewardList?_=';
      } else if (ts.type == 6) {
        ts.url = '/api/mg/sale/reverse/getReverseAdviserReward?_=';
        // ts.url = ' https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/getReverseAdviserReward?_=';
      } else if (ts.type == 7) {
        ts.url = '/api/mg/sale/reverse/getReverseReward?_=';
        // ts.url = ' https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/getReverseReward?_=';
      } else if (ts.type == 8) {
        ts.url = '/api/mg/sale/wonka/userLogList?_=';
        // ts.url = ' https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/cardList?_=';
      }
      $.ajax({
        cache: false,
        async: true,
        url: ts.url + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          pageIndex: ts.response ? ts.response.data.nextPageIndex : 0,
          pageSize: 10
        }),
        success(response) {
          ts.ajaxing = false;
          ts.response = response;
          // if (ts.totalReward) {
            ts.totalReward = response.data.totalReward ? response.data.totalReward : ts.totalReward;
          // }
          common.checkRedirect(ts.response);
          if (ts.type == 2 && ts.myAppointment != null) {
            ts.list = ts.list.concat(ts.myAppointment);
          }
          if (ts.type == 4) {
            ts.list = ts.list.concat(ts.response.data.list);
            return;
          }
          if (ts.type == 8) {
            ts.response.data.dataList.map((item,index) => {
              if (Object.prototype.toString.call(item.content) === "[object Array]") {
                item.content = "";
              }
              if (item.wonkaType == "1") {
                item.wonkaType = "光吃不胖";
              }
              if (item.wonkaType == "2") {
                item.wonkaType = "浪漫满屋";
              }
              if (item.wonkaType == "3") {
                item.wonkaType = "环游世界";
              }
              if (item.wonkaType == "4") {
                item.wonkaType = "白马王子";
              }
              if (item.wonkaType == "5") {
                item.wonkaType = "青春芳华";
              }

              if (item.logType == "1") {
                item.clogType = "购物获得";
              }
              if (item.logType == "2") {
                item.clogType = "好友赠予";
              }
              if (item.logType == "3") {
                item.clogType = "赠予好友";
              }
              if (item.logType == "4") {
                item.clogType = "订单退款";
              }
              if (item.logType == "5") {
                item.clogType = "合成卡片";
              }
              if (item.logType == "6") {
                item.clogType = "解散合成卡片";
              }
            })
            ts.list = ts.list.concat(ts.response.data.dataList);
            return;
          }
          if (ts.type == 6 || ts.type == 7) {
            ts.list = ts.list.concat(ts.response.data.dataList);
            return;
          }

          if (ts.response.data) {
            ts.list = ts.list.concat(ts.response.data.dataList || ts.response.data);
          }
        },
        error(error) {
          // if(ts.type == 1){
          //   ts.response = require('../json/getAwardList.json');
          //   ts.list = ts.list.concat(ts.response.data.dataList);
          // }else if(ts.type == 2) {
          //   ts.response = require('../json/getMyBespeakList.json');
          //   ts.list = ts.list.concat(ts.response.data.dataList);
          // }else if(ts.type == 3) {
          //   ts.response = require('../json/getAdvanceList.json');
          //   ts.list = ts.list.concat(ts.response.data);
          // }
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.ajaxing = false;
        }
      });
    }
  },
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          homeBtn: '1',
          shareBtn: '0',
        });
      });
    }
  }
});
