// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';
window.onpageshow = function (e) {
  if (window.sessionStorage["state"]) {
    window.sessionStorage.removeItem("state");
    location.reload();
  }
}
// 业务模块
import vueLazyload from 'dvd-service-js-img-lazyload';
import afterSale from "../vue/after_sale.vue";
import api from "../../../common/js/api.es6"
import popup from 'dvd-service-js-popup';
import OrderTop from "../../cancle_order/vue/order_top.vue";
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'after-sale':afterSale,
    'com-top-title': require('dvd-service-com-title').default,
    OrderTop:OrderTop
    // 'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
      progressList:[],
      data:null,
      titleTop:'填写售后申请'
    };
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
  },
  created() {
    var obj = {
      goodsId: this.getQuery('goodsId'),
      deliveryId:this.getQuery('deliveryId')
    }
    var that = this
    api("/api/mg/order/exchangeGoodsOrder/createDetail",obj)
      .then(function (res) {
        // common.checkRedirect(res);
        if (res.code == 0){
          if (res.data){
            if (res.data.statusList){
              var list = res.data.statusList
              list.map((item) => {
                if (item.showType == 1 || item.showType == 3) {
                  that.progressList.push(item);
                }
              });
            }

            //判断订单地址是否已经更改并在session里面有记录
            if (sessionStorage.getItem('after_sale_address_'+that.getQuery('deliveryId'))){
              var obj1 = {
                addressId:sessionStorage.getItem('after_sale_address_'+that.getQuery('deliveryId'))
              }
              api('/api/mg/user/address/get', obj1).then(function(data){
                if (data.code==0){
                  data.data.addressId = sessionStorage.getItem('after_sale_address_'+that.getQuery('deliveryId'))
                } else {
                  popup.toast(data.data.msg);
                }
                res.data.addressInfo = data.data
                that.data = res.data
              })
            }else {
              that.data = res.data
            }
          }
        } else {
          popup.toast(res.data.msg);
        }
    }).catch(function () {
      popup.toast('网络异常，请稍后');
    });
  },
  mounted() {
    document.body.setAttribute('class','loaded')
    if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
        // 如果app老版本
    } else {
      // 设置app头部标题栏
      // 设置app头部标题栏
      window.setHeadAction = function(){
        native.Browser.open({
          url:'/policy.html'
        })
      }
      setTimeout(function(){
        native.Browser.setHead({
          title: document.title,
          rightBtn: {
            "text" : "售后政策",
            "textColor":"#FF4A7D",
            "action" : "window.setHeadAction()"
          }
        });
      },1000)
    }
  },
  filters: {},
  methods: {
    getQuery (name) {
      var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    }
  },
});
