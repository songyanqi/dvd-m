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
  },
  data() {
    return {
      response: null,
      resGoodsList: null,
      shareInfo: {
        share: share,
        param: param,
      },
      cutDown: {
        hour: '00',
        minute: '00',
        second: '00',
      },
      status: 1,
      isPend: "pending",
      gradsNum: {
        // 是否满足第一梯度，默认不满足
        isGrads: true,
        one: [],
        two: [],
      },
      goodsList: [],
      actId: param.get('actId'),
      isAjax: false,
      // 是否是第一次分页
      isFirstPage: true,
      isMore: false,
    }
  },

  watch: {
    response() {
      // let ts = this;
      this.$nextTick(function () {
        let detailUlr = "/sale_award_list.html?detail=detail";
        if (param.get("detail")) {
          detailUlr = "/sale_award_list.html?detail=detail&second=second";
        }
        window.handleLink = function () {
          // location.href = detailUlr;
          if (param.get('second')) {
            location.replace(detailUlr);
          } else {
            location.href = detailUlr;
          }
        };

        if (sessionStorage.getItem("detailScroll")) {
          window.scrollTo(0, Number(sessionStorage.getItem("detailScroll")));
        };

        native.custom.initHead({
          showHead: 1, // 是否展示头部
          backOnHead: 1, // 头部返回按钮
          btnText: "全部活动",
          // btnLink: "/sale_award_list.html"
          // btnLink: "document.getElementById('handl').click()",
          btnLink: "window.handleLink()",
        });

        setTimeout(function() {
          native.custom.setHead({
            title: "活动详情",
            rightBtn: {
              text: "全部活动",
              // action: "document.getElementById('handl').click()"
              action: "window.handleLink()",
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
    this.getData();
  },
  mounted() {
    // let that = this;
    // window.onscroll = function () {
    //   //真实内容高度
    //   let pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight),
    //     //视窗高度
    //     viewportHeight = window.innerHeight ||
    //     document.documentElement.clientHeight ||
    //     document.body.clientHeight || 0,
    //     //隐藏高度即滚动的高度
    //     scrollHeight = window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop || 0;
    //   if (pageHeight - viewportHeight - scrollHeight <= 5) {
    //     that.getListData();
    //   }
    // }
    window.onscroll = () => {
      sessionStorage.setItem('detailScroll',window.scrollY);
    };
  },
  methods: {
    /**
     *
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=19636886
     */
    getData(paramesObj,refresh = false) {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/commission/actInfo?_=' + Date.now(),
        // url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/awarddetail?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          actId:ts.actId
        }),
        success(response) {
          common.checkRedirect(response);
          if (response.data) {
            response.data.isUp = false;
            response.data.nextLadder = ts.changeNum(response.data.nextLadder);
            if (response.data.ladder != '0') {
              response.data.ladder = ts.changeNum(response.data.ladder);
            }
            response.data.ruleList.map((item,index) => {
              item.ladder = ts.changeNum(item.ladder);
            });
          }
          ts.response = response;

          ts.goodsList = ts.goodsList.concat(response.data.goodsList);
        },
        error(error) {
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
    getListData() {
      let ts = this;
      if (ts.isAjax) { return; }
      ts.isAjax = true;
      if (this.resGoodsList && (this.resGoodsList.data.more == '0' || this.resGoodsList.data.more == undefined)){
        if (this.goodsList.length > 10) {
          this.isMore = true;
        }
        return;
      }
      let obj = {
        pageIndex: 10,
        pageSize: 10,
        actId:ts.actId,
      }
      if (!ts.isFirstPage) {
        obj = {
          pageIndex: ts.resGoodsList ? ts.resGoodsList.data.nextPageIndex : 0,
          pageSize: 10,
          actId:ts.actId,
        }
      }
      ts.isFirstPage = false;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/commission/goodsList?_=' + Date.now(),
        // url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/awarddetail?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax(obj),
        success(response) {
          ts.isAjax = false;
          ts.resGoodsList = response;

          if (response.data) {
            ts.goodsList = ts.goodsList.concat(response.data.goodsList);
          }
        },
        error(error) {
          ts.isAjax = false;
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.error = true;
        }
      });
    },
    // 跳转方式
    handleJump(url) {
      if (this.isApp) {
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
    handleUp(cItem) {
      this.response.data.isUp = !cItem.isUp;
      // 改变数组中的一个中的字段，试图未发生变化用vue的set来解决
      // this.dataList[this.isPend].map((item,index) => {
      //   if (item.navIdx == cItem.navIdx) {
      //     item.isUp = !item.isUp;
      //     Vue.set(this.dataList[this.isPend],index,item);
      //   }
      // });
    },
    handleLink() {
      let detailUlr = "/sale_award_list.html";
        if (param.get("list")) {
          detailUlr = "/sale_award_list.html?detail=detail";
        }
        if (param.get('second')) {
          location.replace(detailUlr);
        } else {
          location.href = detailUlr;
        }
    }
  },
  filters: {},
});
