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
    'tab-item': require('../vue/tab-item.vue').default,
    'popup': require('../vue/popup.vue').default,
  },
  data() {
    return {
      response: null,
      shareInfo: {
        share: share,
        param: param,
      },
      resList: {
        "pending": null,
        "pend": null,
        "pended": null
      },
      // 多个tab切换，保留切换后的位置，不用保留在缓存中
      tabScroll:[0, 0, 0],
      itemList: [
        {
          "name": "进行中",
          "id": 1,
          "idx": "pending",
          "countNum": 0
        },
        {
          "name": "结算中",
          "id": 2,
          "idx": "pend",
          "countNum": 0
        },
        {
          "name": "已结束",
          "id": 3,
          "idx": "pended",
          "countNum": 0
        },
      ],
      dataList: {
        "pending": [],
        "pend": [],
        "pended": []
      },
      ajaxing: false,
      status: 1,
      isPend: "pending",
      listTop: 0,
      // 切换tab后是否要请求接口
      isTab: {
        isOne: true,
        isTwo: true,
        isThree: true,
        pending: false,
        pend: false,
        pended: false,
      },
      text: "试试行不行哈",
      isclose: false,
    }
  },

  watch: {
    response() {
      // let ts = this;
      this.$nextTick(function () {

        if (sessionStorage.getItem("awardlist")) {
          let objList = JSON.parse(sessionStorage.getItem("awardlist"));
          window.scrollTo(0, objList.listscroll);
        }

        window.handleColse = function () {
          this.isclose = !this.isclose;
        }
        native.custom.initHead({
          showHead: 1, // 是否展示头部
          backOnHead: 1, // 头部返回按钮
          btnText: "常见问题",
          btnLink: "window.handleColse()"
        });

        setTimeout(function() {
          native.custom.setHead({
            title: "测测少女心",
            rightBtn: {
              text: "常见问题",
              action: "window.handleColse()"
            }
          });
        }, 500);
        try {
          share.setShareInfo({
            title: '',
            desc: '',
            imgUrl: "",
            link: window.location.href
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
    let that = this;
    if (sessionStorage.getItem("sale_award_list")) {
      let obj = JSON.parse(sessionStorage.getItem("sale_award_list"));
      this.dataList = obj.dataList;
      this.response = obj.response;
      this.ajaxing = obj.ajaxing;
      this.status = obj.status;
      this.isPend = obj.isPend;
      this.listTop = obj.listTop;
      this.isTab = obj.isTab;
      document.body.setAttribute('class','loaded');
      if (this.listTop) {
        setTimeout(() => {
          window.scrollTo(0, that.listTop);
        },100);
      }
    } else {
      if (sessionStorage.getItem("awardlist")) {
        let objList = JSON.parse(sessionStorage.getItem("awardlist"));
        this.status = objList.status;
      }
      this.getData();
    }
  },
  mounted() {
    let that = this;
    window.onscroll = function () {
      that.listTop = window.scrollY;

      that.tabScroll[that.status - 1] = that.listTop;

      let listObj = {
        status: that.status,
        listscroll: window.scrollY
      };
      sessionStorage.setItem("awardlist",JSON.stringify(listObj));

      //真实内容高度
      let pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight),
        //视窗高度
        viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0,
        //隐藏高度即滚动的高度
        scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
      if (pageHeight - viewportHeight - scrollHeight <= 5) {
        that.getData();
      }
    };
    window.onbeforeunload = function() {
      that.unonload();
    };
  },
  methods: {
    changePend() {
      switch(this.status) {
        case 1:
          this.isPend = "pending";
          break;
        case 2:
          this.isPend = "pend";
          break;
        case 3:
          this.isPend = "pended";
          break;
      }
    },
    /**
     *
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=19636886
     */
    getData() {
      let ts = this;
      ts.changePend();
      if (ts.resList[ts.isPend] && (ts.resList[ts.isPend].data.more == '0' || ts.resList[ts.isPend].data.more == undefined)) {
        if (ts.dataList[ts.isPend].length > 10) {
          ts.isTab[ts.isPend] = true;
        }
        return;
      }
      if (ts.ajaxing) return;
      ts.ajaxing = true;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/commission/actList?_=' + Date.now(),
        // url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/saleaward?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          pageIndex: ts.resList[ts.isPend] ? ts.resList[ts.isPend].data.nextPageIndex : 0,
          pageSize: 10,
          status: ts.status
        }),
        success(response) {
          ts.ajaxing = false;
          common.checkRedirect(response);

          ts.response = response;
          ts.resList[ts.isPend] = response;

          if (response.data.ongoingCount || response.data.settlementCount || response.data.endCount) {
            ts.itemList.map((navItem, navIdx) => {
              if (navIdx == 0) {
                navItem.countNum = response.data.ongoingCount;
              }
              if (navIdx == 1) {
                navItem.countNum = response.data.settlementCount;
              }
              if (navIdx == 2) {
                navItem.countNum = response.data.endCount;
              }
            });
          }

          if (response.data && response.data.dataList) {
            response.data.dataList.map((item,index) => {
              item.isUp = false;
              item.navIdx = `${ts.response.data.nextPageIndex}${index}`;
              // 数字转为大些
              item.nextLadder = ts.changeNum(item.nextLadder);
              item.ruleList.map((ruleItem, ruleIdx) => {
                ruleItem.ladder = ts.changeNum(ruleItem.ladder);
              });

              if (item.ladder != '0') {
                item.ladder = ts.changeNum(item.ladder);
              }
              /*item.gradsNum = {
                isGrads: true,
                one: [],
                two: [],
              };
              if (item.payRemark.indexOf("已符合") != -1) {
                item.gradsNum.isGrads = false;
                item.gradsNum.one = item.payRemark.match(/\d+/ig);
                item.gradsNum.two = item.payRemark.split("，");
              } else {
                item.gradsNum.one = item.payRemark.match(/\d+/ig);
                item.gradsNum.two = item.payRemark.split("，");
              }*/
            });
            ts.dataList[ts.isPend] = ts.dataList[ts.isPend].concat(response.data.dataList);


            if (ts.resList[ts.isPend].data.dataList.length > 0) {
              // ts.itemList[Number(ts.status) - 1].countNum = response.data.count;
              if (ts.status == 1) {
                ts.isTab.isOne = false;
              }
              if (ts.status == 2) {
                ts.isTab.isTwo = false;
              }
              if (ts.status == 3) {
                ts.isTab.isThree = false;
              }
            }
          }
        },
        error(error) {
          ts.ajaxing = false;
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.error = true;
        }
      });
    },
    // 数字转换为大写
    changeNum(num) {
      num = Number(num - 1);
      let numArr = ['一','二','三','四','五','六','七','八','九','十'];
      return numArr[num];
    },
    unonload() {
      let obj = {
        dataList: this.dataList,
        ajaxing: this.ajaxing,
        status: this.status,
        isPend: this.isPend,
        listTop: this.listTop,
        response: this.response,
        isTab: this.isTab,
      };
      // sessionStorage.setItem("sale_award_list",JSON.stringify(obj));
    },
    // 跳转方式
    handleJump(url) {
      this.unonload();
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: url
        });
      } else if (ua.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
    handleTab(item) {
      this.status = item.id;
      window.scrollTo(0,this.tabScroll[this.status - 1]);

      let listObj = {
        status: this.status,
        listscroll: this.tabScroll[this.status - 1]
      };
      sessionStorage.setItem("awardlist",JSON.stringify(listObj));

      if (!this.isTab.isOne && !this.isTab.isTwo && !this.isTab.isThree) {
      } else {
        this.getData();
      }
    },
    handleUp(cItem) {
      this.changePend();
      // 改变数组中的一个中的字段，试图未发生变化用vue的set来解决
      this.dataList[this.isPend].map((item,index) => {
        if (item.navIdx == cItem.navIdx) {
          item.isUp = !item.isUp;
          Vue.set(this.dataList[this.isPend],index,item);
        }
      });
    },
    handleColse() {
      this.isclose = !this.isclose;
      console.log(this.isclose);
    },
    handleBackClose(colse) {
      this.isclose = !colse;
    }
  },
  filters: {},
});
