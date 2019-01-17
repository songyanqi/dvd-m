// H5项目间基础业务模块
require('dvd-service-js-common');

// 第三方模块
import Vue from 'vue';
import ua from 'dvd-base-js-ua';
import $ from 'jquery';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import login from 'dvd-service-js-login';
login.needLogin();

// 渲染页面.
new Vue({
  el: '.app',
  components: {'dvd-service-com-title': require('dvd-service-com-title').default},
  data() {
    return {
      response: null,
      ua,

      // 全局属性
      window,
      document,
      location,
      refererStr: '',
      allCheck: false,
      visitor_status:0
    };
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  methods: {

    // 请求清单列表
    getData() {
      let that = this;
      popup.loading(true);
      $.ajax({
        url: '/api/mg/sale/library/cartList?_=' + Date.now(),
        type: 'post',
        dataType: 'JSON',
        data: encrypt.ajax({}),
        success: function(res) {
          that.visitor_status = res.visitor_status;
          if (!res.code) {
            that.response = res.data;
            that.getGoodsCheck();
          } else {
            popup.toast(res.msg || res.data.msg);
            if (!res.data.goodsList || !res.data.goodsList.length) {
              setTimeout(() => {
                location.href = '/admin_topic.html?topicId=24091';
              }, 2000);
            }
          }
        },
        error: function(error) {
          console.warn(error);
          popup.toast('网络异常');
          popup.loading(false);
        }
      });
    },

    // 变动商品选中状态
    checkeGoods(goods) {
      let that = this,
        goodsData = [{
          goods_id: goods.goods_id,
          checked: Math.abs(goods.checked - 1)
        }];
      that.postCheckData({goods: JSON.stringify(goodsData)}, () => {
        that.getData();

        // goods.checked = Math.abs(goods.checked - 1);
        // that.getGoodsCheck();
        // that.priceChange(goods, false);
      });
    },

    // 勾选状态变化后 金额变化
    priceChange(goods, isAll) {
      let that = this;
      if (!isAll) {
        if (goods.checked) {
          that.response.market_amount += +goods.market_price;
          that.response.checked_number += 1;
        } else {
          that.response.market_amount -= +goods.market_price;
          that.response.checked_number -= 1;
        }
        that.response.order_amount = (+that.response.market_amount / 2).toFixed(2);
        that.response.total_income = (+that.response.order_amount * 0.1).toFixed(2);
      }
    },

    // 商品选中状态数据交互
    postCheckData(data, callback) {
      popup.loading(true);
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/library/change?_=' + Date.now(),
        type: 'post',
        dataType: 'JSON',
        data: encrypt.ajax(data),
        success: function(res) {
          if (!res.code) {
            callback(res);
          } else {
            popup.toast(res.msg || res.data.msg);
          }
          popup.loading(false);
        },
        error: function(error) {
          console.warn(error);
          popup.toast('网络异常');
          popup.loading(false);
        }
      });
    },

    // 全选状态
    checkAll() {
      let that = this,
        data = [];
      that.response.goodsList.forEach(goods => {
        let item = {
          goods_id: goods.goods_id,
          checked: that.allCheck ? 0 : 1
        };
        data.push(item);
      });
      that.postCheckData({goods: JSON.stringify(data)}, () => {
        that.getData();

        // that.response.market_amount = 0;
        // that.response.goodsList.forEach(goods => {
        //   goods.checked = that.allCheck ? 0 : 1;
        //   if (!that.allCheck) {
        //     that.response.market_amount += +goods.market_price;
        //   }
        // });
        // that.allCheck = !that.allCheck;
        // if (that.allCheck) {
        //   that.response.order_amount = (+that.response.market_amount / 2).toFixed(2);
        //   that.response.checked_number = that.response.goodsList.length;
        //   that.response.total_income = (+that.response.order_amount * 0.1).toFixed(2);
        // } else {
        //   that.response.checked_number = 0;
        //   that.response.order_amount = 0;
        //   that.response.market_amount = 0;
        //   that.response.total_income = 0;
        // }
      });
    },

    // 检测是否所有商品都被选中
    getGoodsCheck() {
      let that = this;
      var plus = 0;
      for (let i = 0; i < that.response.goodsList.length; i++) {
        if (!that.response.goodsList[i].checked) {
          plus++;
          break;
        }
      }
      if (plus > 0) {
        that.allCheck = false;
      } else {
        that.allCheck = true;
      }
    },

    // 结算
    pay() {
      let that = this;
      if (!that.response.checked_number) {
        popup.alert({
          title: '提示',
          text: '请至少选择一个商品'
        });
        return false;
      }
      if (+that.response.order_amount < +that.response.min_money) {
        popup.alert({
          title: '提示',
          text: '还差' + (that.response.min_money - that.response.order_amount).toFixed(2) + '元，才能下单'
        });
        return false;
      }
      popup.loading(true);
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/library/checkStocks?_=' + Date.now(),
        type: 'post',
        dataType: 'JSON',
        data: encrypt.ajax({}),
        success: function(res) {
          if (+res.code === 0) {
            location.href = '/libraryCheckout.html';
          } else if (res.code === '22010') {
            popup.alert({
              title: '以下商品未上架',
              text: res.msg || res.data.msg,
              className:'text_alert_left'
            });
          } else if (res.code === '22009') {
            popup.alert({
              title: '以下商品库存不足',
              text: res.msg || res.data.msg,
              className: 'text_alert_left'
            });
          } else if (res.code === '22008') {
            popup.alert({
              title: '以下商品不在活动列表',
              text: res.msg || res.data.msg,
              className: 'text_alert_left'
            });
          } else {
            popup.toast(res.msg || res.data.msg);
          }
          popup.loading(false);
        },
        error: function(error) {
          console.warn(error);
          popup.toast('网络异常');
          popup.loading(false);
        }
      });
    }
  }
});
