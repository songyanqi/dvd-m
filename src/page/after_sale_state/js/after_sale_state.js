// 基础模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import vueLazyload from 'dvd-service-js-img-lazyload';
import OrderTop from "../../cancle_order/vue/order_top.vue";
import afterSaleState from "../vue/after_sale_state.vue";
import api from "../../../common/js/api.es6";
import popup from 'dvd-service-js-popup';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    OrderTop:OrderTop,
    'after-sale-state':afterSaleState
  },
  data() {
    return {
      data: null,
      progressList:[]
    };
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
    document.body.setAttribute('class','loaded')
    if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
        // 如果app老版本
    } else {
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
    getData(){
      var that = this
      var obj = {
        barterId: this.getQuery('barterId')
      }
      api('/api/mg/order/exchangeGoodsOrder/detail', obj)
        .then(function(res){
          // common.checkRedirect(res);
          if (res.code==0){
            if (res.data.statusList){
              var list = res.data.statusList
              var expressComList = [{
                text: '请选择',
                value: '请选择'
              }]
              list.map((item) => {
                if (item.showType == 1 || item.showType == 3) {
                  that.progressList.push(item);
                }
              });
            }
            if (res.data && res.data.expressComList){
              for (var p in res.data.expressComList){
                expressComList.push({
                  text: res.data.expressComList[p],
                  value: res.data.expressComList[p]
                })
              }
              res.data.expressList = expressComList
            }
            if (res.data){
              that.data = res.data
            }else {
             popup.toast('data节点不存在');
            }
          }else {
            popup.toast(res.data.msg);
          }
        }).catch(function () {
          popup.toast('网络异常，请稍后');
        });
    },
    getQuery (name) {
      var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    }
  },
});
