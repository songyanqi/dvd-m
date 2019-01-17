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
import api from '../../../common/js/api.es6';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
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
      loading2: false,
      keywords: '', //搜索词
      noOrder: false, //输入搜索词，但无相关订单
      //复用原订单列表逻辑
      selected: 0,
      list_type: {},
      word: '',
      no_more: false,
      loading: false,
      ajaxing: true,
      allkind: true,
      other: false,
      allData: [
        [],
        [],
        [],
        [],
        []
      ], // 存放数据
      typePage: [1, 1, 1, 1, 1],
      refreshFlag: [0, 0, 0, 0, 0], // 下拉刷新标识
      anymore: [{
        flag: false
      }, {
        flag: false
      }, {
        flag: false
      }, {
        flag: false
      }, {
        flag: false
      }], // 下拉刷新标识

      currentType: +location.href.substr(location.href.indexOf("type=") + 5, 1) || 0,
      preLoadFlag: [],
      refreshEndFlag: [0, 0, 0, 0, 0],
      preLoadEndFunction: null,
      refreshContainer: $(".refresh"),
      pageSize: 15,
      allSwitchItem: $(".switcher_item"),
      // gradeUrl: gradeUrl,
      message: '',
      // 取消原因的弹框
      isConfirm: true,
      isModal: false,
      reasonData: null,
      //是否请求过
      isReasonUrl: false,
      // 取消原因id.
      reasonId: '',
      // 订单id，当点击取消订单弹出框时用到
      dataId: "",
      //取消原因
      reasonName: "",
      isapp: false,
      // 当前时间，来判断支付尾款显示按钮还是支付时间
      currentTime: Date.now(),
      // 是否显示预定单弹框
      isOrderConfirm: false
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
    let that = this;
    this.isapp = this.isApp();
    var reload = sessionStorage.getItem('order_search_orderListRefresh');
    if(reload === 'Refresh') {
      let ts = this;
      ts.keywords = JSON.parse(sessionStorage.getItem('order_search_keywords'));
      ts.getData(2);
      // 清空数据
      sessionStorage.removeItem("order_search_data");
      sessionStorage.removeItem("order_search_typePage");
      sessionStorage.removeItem("order_search_no_more");
      sessionStorage.removeItem("order_search_keywords");
      sessionStorage.removeItem("order_search_response");
      sessionStorage.removeItem("order_search_orderListRefresh");
    } else if (!window.isPrivateMode && sessionStorage.history) { //浏览器中能存储session storage
      var ua = navigator.userAgent.toLowerCase();
      var patharr = JSON.parse(sessionStorage.history); //获取路径path
      if (patharr.length > 0) { //从标签页直接进入也会发出请求
        var lastPath = patharr[patharr.length - 1].path;
        if (lastPath == 'order_detail' || lastPath == 'order_delivery' || lastPath == "detail" || lastPath == "grade" || lastPath == "add_address" || lastPath == "agent_pay" || (lastPath == "cart_confirm" && $.cookie && !$.cookie("dvd_cart_to_confirm"))) { //判断是否是浏览器上的返回键回到这个页面
          if(eval(sessionStorage.getItem('order_search_data'))) {
            this.allData = eval(sessionStorage.getItem('order_search_data')); //获取session的数据
            this.list_type = this.allData[0];
            this.typePage = JSON.parse(sessionStorage.getItem('order_search_typePage'));
            this.keywords = JSON.parse(sessionStorage.getItem('order_search_keywords'));
            this.response = JSON.parse(sessionStorage.getItem('order_search_response'));
            if (eval(sessionStorage.getItem('order_search_no_more')) != undefined) {
              this.anymore = eval(sessionStorage.getItem('order_search_no_more'));
            }
            if (/iphone|ipad|ipod/.test(ua)) {
              setTimeout(function() {
                document.body.scrollTop = eval(sessionStorage.getItem('order_search_top'));
              }, 0);
            }
            // 清空数据
            sessionStorage.removeItem("order_search_data");
            sessionStorage.removeItem("order_search_typePage");
            sessionStorage.removeItem("order_search_no_more");
            sessionStorage.removeItem("order_search_keywords");
            sessionStorage.removeItem("order_search_response");
          }
        } else {
          // 清空数据
          sessionStorage.removeItem("order_search_data");
          sessionStorage.removeItem("order_search_typePage");
          sessionStorage.removeItem("order_search_no_more");
          sessionStorage.removeItem("order_search_keywords");
          sessionStorage.removeItem("order_search_response");
        }
      }
    }
    document.body.setAttribute('class', 'loaded');
    this.scroll();
  },
  mounted() {
    let ts = this;
    if(ua.isDvdApp()) {
      window.native_callback_4821914504766067 = function () { };
      location.href = 'davdian://call.Browser.com?action=setHead&params=%7B%22hideHead%22%3A%221%22%7D&callback=native_callback_4821914504766067&minv=2.6.0';
    }
  },
  watch: {
    list_type() {
      let ts = this;
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        ts.handleCurrentPage();
      });
    }
    // 'list_type': 'handleCurrentPage',
  },
  filters: {
    last: function(value) {
      if (value == null) {
        return false;
      } else {
        if (value.length == 1) {
          return true;
        }
      }
    }, //只有一个商品的时候显示详细信息
    again: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.complete_status == 1) {
            return true;
          } else {
            if (value.shipping_status == 1) {
              return false;
            }
          }
        }
      }
    }, //再次购买
    confirm: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.complete_status == 1) {
            return false;
          } else {
            if (value.shipping_status == 1) {
              return true;
            }
          }
        }
      }
    }, //确认收货
    checkship: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.shipping_status == 1) {
            return true;
          }
        }
      }
    }, //查看物流
    cancel1: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (value.cancel_type) {
            if (value.cancel_type == 1) {
              return true;
            }
          }
        }
      }
    }, //取消审核中1
    cancel2: function(value) {
      // if(value.is_new_seller_order  == false){
      //     if(value.type == 2){
      //         if(value.cancel_type){
      //             if(value.cancel_type == 2){
      //                 return true;
      //             }
      //         }
      //     }
      // }
      if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
        if (value.shipping_status != '1' && value.is_delivery) {
          if (value.is_all_gift) {
            if (value.cancel_type == 2) {
              return true;
            }
          }
        } else {
          if (value.is_new_seller_order == false) {
            if (value.type == 2) {
              if (value.cancel_type) {
                if (value.cancel_type == 2) {
                  return true;
                }
              }
            }
          }
        }
      }
    }, //取消成功
    cancel3: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (value.cancel_type) {
            if (value.cancel_type == 3) {
              return true;
            }
          }
        }
      }
    }, //取消失败
    cancel: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (!value.cancel_type) {
            if (value.is_delivery == false) {
              if (value.is_earning_goods != 1) {
                return true;
              }
            }
          }
        }
      }
    },
    //取消订单
    pay: function(value) {
      // if(value.is_new_seller_order  == false){
      if (value.is_new_seller_order == false && !value.is_presale_order) {
        if (value.type == 3) {
          return true;
        }
      }
    },
    //找人代付
    pay1: function(value) {
      let ts = this;
      if (!ts.isApp()) {
        if (value.is_new_seller_order == false) {
          if (value.type == 3) {
            return true;
          }
        }
      }
    },

    //找人代付 立即付款
    close: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 4) {
          return true;
        }
      }
    }, //再次购买 删除订单
    shipping: function(value) {
      if (value.is_new_seller_order == true) {
        if (value.type == 1 && value.new_year_order && value.order_type != 3) {
          if (value.shipping_status == 1 && value.is_real) {
            return true;
          }
        }
      }
    }, //查看物流
    receive: function(value) {
      if (value.is_new_seller_order && value.type == 2 && value.no_address && value.new_year_order && value.order_type != 3 && value.kd_send_goods) {
        return true;
      }
    }, //领取开店礼包
    deleted: function(value) {
      if (value.is_new_seller_order == true) {
        if (value.type == 4) {
          return true;
        }
      }
    }, //删除订单
    more: function() {
      var vm = this;
      if (vm.list_type.data.length == 0 && vm.selected != 4) {
        return true;
      }
    },
    // 申请售后,先判断是否为代发货，在判断是否拆单，在判断字段
    applySale(value) {
      if (!value.is_all_gift) {
        if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
          if (value.is_delivery) {
            if (!value.cancel_id) {
              if (value.is_earning_goods != 1) {
                return true;
              }
            }
          }
        }
      }
    },
    // 显示售后进度
    applyProgress(value) {
      if (!value.is_all_gift) {
        if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
          if (value.is_delivery) {
            if (value.cancel_id) {
              return true;
            }
          }
        }
      }
    },
    // 支付定金,首先要pay的逻辑，要加上
    orderReserve(value) {
      if (value.is_new_seller_order == false && value.type == 3) {
        if (value.is_presale_order && value.presale_info.type == "reserve") {
          if (Date.now() < value.create_time * 1000 + 1800000) {
            return true;
          }
        }
      }
    },
    // 支付尾款显示时间时不显示所有的按钮
    isFinalBtn(value) {
      if (value.is_presale_order && value.presale_info.type == "final") {
        if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {

        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 支付尾款,显示时间
    orderFinal(value) {
      if (value.is_presale_order && value.presale_info.type == "final") {
        if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {
          return true;
        }
      }
    },
    // 支付尾款，显示按钮
    orderFinalBtn(value) {
      if (value.is_new_seller_order == false && value.type == 3) {
        if (value.is_presale_order && value.presale_info.type == "final") {
          if (Date.now() < Number(value.presale_info.final_info.paytime_end) * 1000 && Date.now() > Number(value.presale_info.final_info.paytime_start) * 1000) {
            return true;
          }
        }
      }
    },
    changeDate(time) {
      var dates = new Date(time * 1000);
      var month = dates.getMonth() + 1,
        days = dates.getDate(),
        hours = dates.getHours(),
        minutes = dates.getMinutes(),
        seconds = dates.getSeconds();

      month = month < 10 ? `0${month}` : month;
      days = days < 10 ? `0${days}` : days;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${month}月${days}日 ${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    search(e) {
      if(e.keyCode === 13) {
        e.preventDefault();
        this.getData(1);
      }
    },
    reloadSet(id) {
      sessionStorage.setItem('order_search_orderListRefresh', "Refresh");
      location.href = "/checkout.html?order_id="+id;
    },
    needSession() {
      let scope = this;
      sessionStorage.setItem('order_search_data', JSON.stringify(scope.allData));
      sessionStorage.setItem('order_search_typePage', JSON.stringify(scope.typePage));
      if(scope.response) {
        sessionStorage.setItem('order_search_response', JSON.stringify(scope.response));
      }
      sessionStorage.setItem('order_search_keywords', JSON.stringify(scope.keywords));
    },
    //返回按钮
    orderback() {
      if (ua.isDvdApp()) {
        native.Browser.goBack({
          needRefresh: 0,
        });
      } else {
        history.back();
      }
    },
    searchOrder() {

    },
    // 相加
    changeAddNum(num1, num2) {
      let sumNum = parseFloat(Number(num1) + Number(num2)).toFixed(2);
      return sumNum;
    },
    // 时间转换
    // 弹框弹出时给body添加fixed
    addFixed() {
      if (document.documentElement && document.documentElement.scrollTop) {
        this.scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        this.scrollTop = document.body.scrollTop;
      }

      document.body.style.top = -this.scrollTop + "px";
      document.body.classList.add("bodyFix");
    },
    // 移除fixed
    removeFixed() {
      document.body.classList.remove("bodyFix");
      document.body.scrollTop = this.scrollTop;
    },
    isApp() {
      let u = navigator.userAgent;
      return !!u.match(/davdian|bravetime|vyohui/);
    },
    isMobile() {
      let ua = navigator.userAgent;
      return !!ua.match(/Mobile/i);
    },
    // 支付尾款
    pay_weikuan(url) {
      let ts = this;
      if (ts.isApp()) {
        native.Browser.pay(ts.payDataC(url));
      } else {
        location.href = url;
      }
    },
    // 操作app支付数据
    payDataC(url) {
      // 操作app支付数据
      let ts = this;
      let goUrlData = {};
      if (url.split("app_pay/").length > 1) {
        var list = url.split("app_pay/")[1].split("&");
        for (var i = 0; i < list.length; i++) {
          var key = list[i].split("=")[0];
          var value = list[i].split("=")[1];
          goUrlData[key] = value;
        }
      }
      // 回调
      goUrlData.success = function() {

      };
      goUrlData.isShowSuccess = '0';
      return goUrlData;
    },
    // 跳转方式
    handleJump(url) {
      let ts = this;
      if (ts.isapp) {
        native.Browser.open({
          url: url
        });
      } else if (ts.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
    handleCloseModal() {
      this.isModal = false;
      this.isOrderConfirm = false;
      this.removeFixed();
    },
    // 取消原因
    handleReason(e) {
      this.isConfirm = false;
      this.reasonId = e.target.getAttribute("data-id");
      this.reasonName = e.target.getAttribute('data-name');
      console.log(this.reasonName);
      $(".cancle_" + this.dataId + "").attr("reason-id", this.reasonId);
    },
    // 售后进度
    afterSale(e) {
      let cancelId = e.target.getAttribute("data-cancel-id");
      let url = `/return_progress.html?cancelId=${cancelId}`;
      this.handleJump(url);
    },
    // 申请售后
    orderApplay(e) {
      let dataId = e.target.getAttribute("data-id");
      let deliveryId = e.target.getAttribute("data-deliveryid");
      let url = `/cancle_order.html?orderId=${dataId}&deliveryId=${deliveryId}`;
      this.handleJump(url);
    },
    getDatas() {
      let that = this;
      let isDev = true;
      if (isDev) {
        if (!this.isReasonUrl) {
          $.ajax({
            url: "/api/mg/order/cancelOrder/reasonList?_=" + Date.now(),
            type: "post",
            dataType: "json",
            data: layout.strSign('reasonList'),
            success(res) {
              console.log(res);
              if (!res.code) {
                that.reasonData = res;
                that.isReasonUrl = true;
              }
            },
            error(err) {}
          })
        }
      } else {
        if (!this.isReasonUrl) {
          $.ajax({
            url: "",
            // type: "post",
            // data: layout.strSign("createDetail",{
            //  deliveryId: 9542093
            // }),
            dataType: "json",
            success(res) {},
            error(err) {}
          })
        }
      }
    },
    // 预定单弹框
    handleOrderPresale() {
      this.isOrderConfirm = false;
      this.isModal = true;

      this.getDatas();
    },
    // 新取消订单
    cancelOrder(e, item) {
      this.addFixed();
      this.dataId = e.target.getAttribute('data-id');
      let reasonId = e.target.getAttribute('reason-id');

      if (reasonId) {
        $(".modalCont").find("#" + reasonId + "").prop("checked", true);
        this.isConfirm = false;
      } else {
        $(".reasonIpt").prop("checked", false);
        this.isConfirm = true;
      }
      // 如果是预定单，先弹出确定框
      if (item.is_presale_order) {
        this.isOrderConfirm = true;
        return;
      }
      this.getDatas();
      this.isModal = true;
      // this.dataId = e.target.getAttribute('data-id');
      // let reasonId = e.target.getAttribute('reason-id');

      // if (reasonId) {
      //     $(".modalCont").find("#"+ reasonId +"").prop("checked",true);
      //     this.isConfirm = false;
      // } else {
      //     $(".reasonIpt").prop("checked",false);
      //     this.isConfirm = true;
      // }
    },
    // 取消原因点击确定 /api/mg/order/cancelOrder/cancelByOrder
    handleConfirm() {
      if (this.isConfirm) {

      } else {
        let obj = layout.strSign('cancleOrder', {
          reasonId: this.reasonId,
          reasonName: this.reasonName,
          orderId: this.dataId
        });
        let scope = this;
        let id = $(".cancle_" + scope.dataId + "").parents(".order_list_item").attr("data-for-id");
        bravetime.addLoader({
          little: true
        });
        $.ajax({
          // url: cancelOrderUrl,
          url: "/api/mg/order/order/cancel",
          dataType: "json",
          type: "POST",
          data: obj,
          success: function(result) {
            bravetime.removeLoader();
            if (result.code != 0 && result.code != 60499) {
              // bravetime.info(result.data.msg);
              // popup.toast(result.data.msg,2000);
              document.querySelector(".order_toast").style.display = 'block';
              let html = `<div class = 'toastCont'>${result.data.msg}</div>`;
              $(".order_toast").html(html);
              setTimeout(() => {
                document.querySelector(".order_toast").style.display = 'none';
              }, 3000)
              return;
            }
            var info = "取消审核中";
            if (result.code == 0) {
              info = "取消成功";
            } else if (result.code == 60499) {
              info = "取消审核中";
            }
            var bg = $(".cancle_" + scope.dataId + "").parents(".order_buttons");
            var og = $(".cancle_" + scope.dataId + "").parents(".order_list_item");
            bg.find("a").remove();
            bg.append($('<a class="dav-btn pull-right btn-white btn-disable">' + info + '</a>')); //删掉取消订单 增加取消的结果
            if (result.code == 60499) {
              og.find(".order_name").find(".dav-red").html("已冻结");
              for (var j = 0; j < 5; j++) { //改变所有该id的订单
                for (var k = 0; k < scope.allData[j].length; k++) {
                  if (id == scope.allData[j][k].id) {
                    scope.allData[j][k].type = 2;
                    scope.allData[j][k].cancel_type = 1;
                  }
                }
              }
            }
            if (result.code == 0) {
              for (var j = 0; j < 5; j++) { //改变所有该id的订单变为取消成功
                for (var k = 0; k < scope.allData[j].length; k++) {
                  if (id == scope.allData[j][k].id) {
                    scope.allData[j][k].type = 2;
                    scope.allData[j][k].cancel_type = 2;
                  }
                }
              }
            }
            if (result.code != 0 && result.code != 60499) {
              for (var j = 0; j < 5; j++) { //改变所有该id的订单变为取消失败
                for (var k = 0; k < scope.allData[j].length; k++) {
                  if (id == scope.allData[j][k].id) {
                    scope.allData[j][k].type = 2;
                    scope.allData[j][k].cancel_type = 3;
                  }
                }
              }
            }
            sessionStorage.setItem('order_search_data', JSON.stringify(scope.allData));
            sessionStorage.setItem('order_search_typePage', JSON.stringify(scope.typePage));

          },
          error: function() {
            bravetime.removeLoader();
            bravetime.ajaxError(32);
          }
        });
        this.isModal = false;
        this.removeFixed();
      }
    },
    //删除订单
    deleteOrder: function() {
      var vm = event.currentTarget,
        id = $(vm).parents(".order_list_item").attr("data-for-id");
      var scope = this;
      window.bravetime.newConfirm("您确定要删除订单么？", {
        okLink: function() {
          bravetime.addLoader({
            little: true
          }); //加载处理动画
          $.ajax({
            url: deleteOrderUrl,
            // type: 'POST',
            dataType: 'json',
            data: {
              id: id
            },
            success: function(result) {
              if (result['error']) {
                bravetime.removeLoader();
                bravetime.newAlert(result["msg"]);
              } else {
                if (window.debug) {
                  setTimeout(function() {
                    bravetime.removeLoader();
                    $(vm).parents(".order_list_item").remove();
                    for (var j = 0; j < 5; j++) {
                      for (var k = 0; k < scope.allData[j].length; k++) {
                        if (id == scope.allData[j][k].id) {
                          scope.allData[j].splice(k, 1);
                        }
                      }
                    }
                    sessionStorage.setItem('order_search_data', JSON.stringify(scope.allData));
                    sessionStorage.setItem('order_search_typePage', JSON.stringify(scope.typePage));
                  }, 1500);
                } else {
                  bravetime.removeLoader();
                  $(vm).parents(".order_list_item").remove();
                  for (var j = 0; j < 5; j++) {
                    for (var k = 0; k < scope.allData[j].length; k++) {
                      if (id == scope.allData[j][k].id) {
                        scope.allData[j].splice(k, 1);
                      }
                    }
                  }
                  sessionStorage.setItem('order_search_data', JSON.stringify(scope.allData));
                  sessionStorage.setItem('order_search_typePage', JSON.stringify(scope.typePage));
                }
              }
            },
            error: function() {
              bravetime.removeLoader();
              bravetime.ajaxError(26);
            }
          });
        }
      });
    },
    // 跳到评论编辑或追加评价页面1
    evaluate: function(event) {
      let ts = this;
      var href = event.target.dataset.href;
      if (ts.isApp()) {
        window.evaCallback = function() {
          setTimeout(function() {
            location.reload();
          }, 300);
        };
      } else {
        sessionStorage.setItem('order_search_orderListRefresh', "Refresh");
      }
      bravetime.openNewPage({
        type: 1,
        url: href,
        jsMethod: 'evaCallback()'
      });
      //禁止默认行为
      event.preventDefault();
      return false;
    },
    // 跳到评论编辑或追加评价页面
    evaluatelist: function() {
      var href = event.target.dataset.href;
      bravetime.goto(href);
      sessionStorage.setItem('order_search_orderListRefresh', "Refresh");
      return false;
    },
    // 确认收货
    orderArrive: function() {
      var vm = event.currentTarget,
        id = $(vm).parents(".order_list_item").attr("data-for-delivery-id");
      window.bravetime.newConfirm("您确定收到商品了么？", {
        okLink: function() {
          bravetime.addLoader({
            little: true
          });
          $.ajax({
            url: arriveUrl,
            dataType: "json",
            data: {
              id: id
            },
            success: function(result) {
              bravetime.removeLoader();
              if (result["error"] == 0) {
                //成功之后跳转到确认收货页面
                bravetime.goto(result.data.redirect_link);
                //一进页面在最上面代码获取下面的orderListRefresh，如果有就刷新页面
                sessionStorage.setItem('order_search_orderListRefresh', "Refresh");
              } else {
                bravetime.info(result["msg"]);
              }
            },
            error: function() {
              bravetime.removeLoader();
              bravetime.ajaxError(26);
            }
          });
        }
      });
    },
    // 处理当前页面
    handleCurrentPage: function() {
      $(".order_good_list").each(function(index, el) {
        var height = $(el).find(".img_container_inner").height();
        var length = $(el).find(".img_container_inner").find("img").length;
        if (height > 60) {
          $(el).append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
          $(el).find(".img_container_inner").css({
            "height": "60px",
            "white-space": "nowrap",
            "overflow-x": "scroll"
          });
        };
        if (length == 1) {
          $(el).parent().find(".order_good_list").addClass("single_good");
        }
      });
      //                    location.hash = 'aaa';
      //                $('a').each(function(index,el){
      //                    $(this).click(function(){
      //                        event.stopPropagation();
      //                        $('a').prev('name','');
      //                        $(this).prev('name','aaa');
      //                    })
      //                });
    },
    //获取数据
    getData: function(num) {
      let ts = this;
      var v = ts.keywords;
      if (v == null || v.match(/^[ ]+$/) || !v) {
        popup.toast('请输入商品名称');
        ts.keywords = '';
        return false;
      }
      var scope = this;
      var orderType = scope.selected; //当前标签页下标
      var url = '/index.php?c=user&a=order_list_response&_t=' + Date.now();
      if (scope.no_more == false || num === 1) { //如果数据没有被加载 加载数据
        if(num === 1) {
          scope.loading2 = true;
        } else {
          scope.loading = true; //显示加载动画
        }
        if (scope.ajaxing) {
          scope.ajaxing = false;
          var mixOrderId = '';
          if(num !== 1) {
            mixOrderId = scope.response ? scope.response.mixOrderId : '';
          } else{
            scope.no_more = false;
          }
          $.ajax({
            url: url, //不同的本地json地址
            dataType: "json",
            data: {
              _t: Date.now() + Math.random(),
              type: orderType, //selected
              page_size: scope.pageSize,
              page: scope.typePage[orderType],
              search: 1,
              words: scope.keywords,
              mixOrderId: mixOrderId
            },
            success: function(result) {
              scope.loading = false;
              scope.loading2 = false;
              if (!result["error"]) { //返回数据没有问题
                scope.response = result;
                scope.preLoadFlag[orderType] = true; //
                scope.ajaxing = true;
                scope.typePage[orderType] = scope.typePage[orderType] + 1; //ajax中的参数中页数加1
                if (result["data"].length) { //返回函数中有数据
                  scope.noOrder = false;
                  // 将超时的预定单改为已关闭订单
                  result.data.map(function(value, index) {
                    if (value.is_presale_order && value.presale_info.type == "reserve") {
                      if (Date.now() > value.create_time * 1000 + 1800000) {
                        value.type = 4;
                      }
                    }
                    if (value.type != 1 && value.type != 2 && value.is_presale_order && value.presale_info.type == "final") {
                      if (Date.now() > value.presale_info.final_info.paytime_end * 1000) {
                        value.type = 4;
                      }
                    }
                  });
                  if(scope.response.isEnd === 1) {
                    scope.no_more = true;
                  }
                  if(num === 1) {
                    scope.allData[orderType] = result.data;
                  } else {
                    scope.allData[orderType] = scope.allData[orderType].concat(result.data); //缓存中添加数据
                  }
                  scope.list_type = scope.allData[orderType];
                  if(num === 2) {
                    setTimeout(function() {
                      var go = eval(sessionStorage.getItem('order_search_top'));
                      $('html,body').animate({scrollTop: go}, 100);
                    }, 0);
                    // if (/iphone|ipad|ipod/.test(ua)) {
                    //   alert(eval(sessionStorage.getItem('order_search_top')));
                    //   setTimeout(function() {
                    //     document.body.scrollTop = eval(sessionStorage.getItem('order_search_top'));
                    //   }, 0);
                    // }
                  }
                } else {
                  if(num === 1) {
                    scope.no_more = false;
                    scope.noOrder = true;
                    scope.list_type = {};
                    // 清空数据
                    sessionStorage.removeItem("order_search_data");
                    sessionStorage.removeItem("order_search_typePage");
                    sessionStorage.removeItem("order_search_no_more");
                    sessionStorage.removeItem("order_search_keywords");
                    sessionStorage.removeItem("order_search_response");
                  } else if(scope.list_type.length && scope.response.isEnd === 1) {
                    scope.no_more = true;
                  }
                  console.log(scope.noOrder);
                  scope.anymore[orderType].flag = true;
                  sessionStorage.setItem('order_search_no_more', JSON.stringify(scope.anymore))
                }

              }
            },
            error: function() {
              scope.loading = false;
              scope.ajaxing = true;
            }
          });
        }
      }
    },
    //下拉刷新
    scroll: function() {
      var scope = this;
      $(window).scroll(function() { //滚动条滚动事件
        var top = window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop || 0;
        sessionStorage.setItem('order_search_top', top);
        var offset = window.pageYOffset; //文档现在的位置加上窗口的高度
        var offsetTop = document.body.scrollHeight; //整个页面的高度
        if (offsetTop - offset - window.screen.availHeight < 100) { //如果滚动条到一定位置
          if (scope.no_more == false && scope.keywords && scope.list_type.length) { //如果 没有更多商品 不显示 加载数据
            scope.getData();
          }
        }
      });
    },
    last: function(value) {
      if (value == null) {
        return false;
      } else {
        if (value.length == 1) {
          return true;
        }
      }
    }, //只有一个商品的时候显示详细信息
    again: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.complete_status == 1) {
            return true;
          } else {
            if (value.shipping_status == 1) {
              return false;
            }
          }
        }
      }
    }, //再次购买
    confirm: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.complete_status == 1) {
            return false;
          } else {
            if (value.shipping_status == 1) {
              return true;
            }
          }
        }
      }
    }, //确认收货
    checkship: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 1) {
          if (value.shipping_status == 1) {
            return true;
          }
        }
      }
    }, //查看物流
    cancel1: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (value.cancel_type) {
            if (value.cancel_type == 1) {
              return true;
            }
          }
        }
      }
    }, //取消审核中1
    cancel2: function(value) {
      // if(value.is_new_seller_order  == false){
      //     if(value.type == 2){
      //         if(value.cancel_type){
      //             if(value.cancel_type == 2){
      //                 return true;
      //             }
      //         }
      //     }
      // }
      if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
        if (value.shipping_status != '1' && value.is_delivery) {
          if (value.is_all_gift) {
            if (value.cancel_type == 2) {
              return true;
            }
          }
        } else {
          if (value.is_new_seller_order == false) {
            if (value.type == 2) {
              if (value.cancel_type) {
                if (value.cancel_type == 2) {
                  return true;
                }
              }
            }
          }
        }
      }
    }, //取消成功
    cancel3: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (value.cancel_type) {
            if (value.cancel_type == 3) {
              return true;
            }
          }
        }
      }
    }, //取消失败
    cancel: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 2) {
          if (!value.cancel_type) {
            if (value.is_delivery == false) {
              if (value.is_earning_goods != 1) {
                return true;
              }
            }
          }
        }
      }
    },
    //取消订单
    pay: function(value) {
      // if(value.is_new_seller_order  == false){
      if (value.is_new_seller_order == false && !value.is_presale_order) {
        if (value.type == 3) {
          return true;
        }
      }
    },
    //找人代付
    pay1: function(value) {
      let ts = this;
      if (!ts.isApp()) {
        if (value.is_new_seller_order == false) {
          if (value.type == 3) {
            return true;
          }
        }
      }
    },

    //找人代付 立即付款
    close: function(value) {
      if (value.is_new_seller_order == false) {
        if (value.type == 4) {
          return true;
        }
      }
    }, //再次购买 删除订单
    shipping: function(value) {
      if (value.is_new_seller_order == true) {
        if (value.type == 1 && value.new_year_order && value.order_type != 3) {
          if (value.shipping_status == 1 && value.is_real) {
            return true;
          }
        }
      }
    }, //查看物流
    receive: function(value) {
      if (value.is_new_seller_order && value.type == 2 && value.no_address && value.new_year_order && value.order_type != 3 && value.kd_send_goods) {
        return true;
      }
    }, //领取开店礼包
    deleted: function(value) {
      if (value.is_new_seller_order == true) {
        if (value.type == 4) {
          return true;
        }
      }
    }, //删除订单
    more: function() {
      var vm = this;
      if (vm.list_type.data.length == 0 && vm.selected != 4) {
        return true;
      }
    },
    // 申请售后,先判断是否为代发货，在判断是否拆单，在判断字段
    applySale(value) {
      if (!value.is_all_gift) {
        if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
          if (value.is_delivery) {
            if (!value.cancel_id) {
              if (value.is_earning_goods != 1) {
                return true;
              }
            }
          }
        }
      }
    },
    // 显示售后进度
    applyProgress(value) {
      if (!value.is_all_gift) {
        if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
          if (value.is_delivery) {
            if (value.cancel_id) {
              return true;
            }
          }
        }
      }
    },
    // 支付定金,首先要pay的逻辑，要加上
    orderReserve(value) {
      if (value.is_new_seller_order == false && value.type == 3) {
        if (value.is_presale_order && value.presale_info.type == "reserve") {
          if (Date.now() < value.create_time * 1000 + 1800000) {
            return true;
          }
        }
      }
    },
    // 支付尾款显示时间时不显示所有的按钮
    isFinalBtn(value) {
      if (value.is_presale_order && value.presale_info.type == "final") {
        if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {

        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 支付尾款,显示时间
    orderFinal(value) {
      if (value.is_presale_order && value.presale_info.type == "final") {
        if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {
          return true;
        }
      }
    },
    // 支付尾款，显示按钮
    orderFinalBtn(value) {
      if (value.is_new_seller_order == false && value.type == 3) {
        if (value.is_presale_order && value.presale_info.type == "final") {
          if (Date.now() < Number(value.presale_info.final_info.paytime_end) * 1000 && Date.now() > Number(value.presale_info.final_info.paytime_start) * 1000) {
            return true;
          }
        }
      }
    },
    changeDate(time) {
      var dates = new Date(time * 1000);
      var month = dates.getMonth() + 1,
        days = dates.getDate(),
        hours = dates.getHours(),
        minutes = dates.getMinutes(),
        seconds = dates.getSeconds();

      month = month < 10 ? `0${month}` : month;
      days = days < 10 ? `0${days}` : days;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${month}月${days}日 ${hours}:${minutes}:${seconds}`;
    }
  },
  events: {
    'changeSort': function(msg) {
      var vm = this;
      vm.selected = msg;
      vm.list_type = [];
      for (var iii = 0; iii < 5; iii++) {
        if (msg == iii) {
          vm.no_more = vm.anymore[iii].flag;
          if (vm.allData[msg].length == 0) {
            vm.getData();
          } else {
            vm.list_type = vm.allData[msg];
          }
          setTimeout(function() {
            vm.handleCurrentPage()
          }, 0);
          vm.other = false;
          vm.allkind = true;
        }
      }
      if (msg == 0) {
        vm.word = '订单';
      } else if (msg == 1) {
        vm.word = '待收货订单';
      } else if (msg == 2) {
        vm.word = '待发货订单';
      } else if (msg == 3) {
        vm.word = '待付款订单';
      } else {
        vm.allkind = false;
        vm.word = '待评价商品';
        if (vm.allData[msg].length == 0) {
          vm.getData();
        } else {
          vm.list_type = vm.allData[msg];
        }
        setTimeout(function() {
          vm.handleCurrentPage()
        }, 0);
        vm.other = true;
      }
    }
  }
});
