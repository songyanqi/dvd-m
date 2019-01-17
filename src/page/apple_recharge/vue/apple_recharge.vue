<template>
  <div>
    <div class="show">
      <div class="text"><span class="big_text" v-text="amount"></span><span v-text="unit"></span></div>
      <div class="money">账户余额</div>
    </div>
    <div class="empty_div"></div>
    <div class="wapper">
      <div class="head">充值</div>
      <div class="select">
        <div class="border" :class="{no_border:(index+1)%3 == 0,select_border:rechargeList[index] == 1}"
             v-for="(item,index) in priceList" @click="select_money(index,item.price,item.priceId)">
          <div class="border_top"><span v-text="item.price"></span>元</div>
          <div class="border_bottom"><span v-text="item.total"></span><span v-text="unit"></span></div>
        </div>
      </div>
      <div class="btn" v-show="!selectPrice">选择充值金额</div>
      <div class="btn2" v-show="selectPrice" @click="recharge">确认支付金额：<span v-text="selectPrice"></span>元</div>
      <div class="alert" @click="alert">如何设置 AppStore 账户？</div>
      <div class="rule">
        <div>1. 请在 Apple Store 绑定微信、支付宝或银行卡，充值或购买虚拟产品；</div>
        <div>2. 充值的金额，仅用于购买大V店APP学院内的付费课程、付费音频，不会过期，不可提现；</div>
      </div>
    </div>

  </div>
</template>
<script>
  import api from "../../../common/js/api.es6"
  import popup from "dvd-service-js-popup"
  import native from "dvd-service-js-native"
  import Vue from "vue"

  export default {
    mounted(){
//      this.test();
      this.init();
    },
    data(){
      return {
        amount: null,
        unit: "",
        priceList: [],
        rechargeList: [],
        rechargeListPrice: [],
        selectPrice: null,
        selectPriceId: null
      }
    },
    methods: {
      alert(){
        window.location.href = "http://jituo4629.davdian.com/admin_topic.html?topicId=18055";
      },
      select_money(Index, price, priceId){
        var _this = this;
        this.rechargeList = [];
        this.rechargeListPrice = [];
        Vue.set(this.rechargeList, Index, 1);
        Vue.set(this.rechargeListPrice, Index, price);
        this.selectPrice = price;
        this.selectPriceId = priceId;
      },
      test(){
        var _this = this;
        var res = require("../json/apple_recharge.json");
        _this.amount = res.data.amount;
        _this.unit = res.data.unit;
        _this.priceList = res.data.priceList;
      },
      init(){
        var _this = this;
        api("/api/mg/content/iap/balance")
          .then(function (res) {
            if (!res.code) {
              _this.amount = res.data.amount;
              _this.unit = res.data.unit;
              _this.priceList = res.data.priceList;
            } else {
              popup.toast("error")
            }
          }).catch(function () {

        });
      },
      recharge(){
        var _this = this;
        popup.confirm({
          title: '提示',            // 标题（支持传入html。有则显示。）
          text: '确认进行充值操作？',             // 文本（支持传入html。有则显示。）
          okBtnTitle: '充值',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）
            var obj = {
              "priceId": _this.selectPriceId,
              "price": _this.selectPrice
            };
            api("/api/mg/content/iap/checkPrice", obj)
              .then(function (res) {
                if (!res.code && res.data.priceId && res.data.iapItemId) {
                  native.Browser.payRecharge({
                    "priceId": res.data.priceId,
                    "appleGoods_id": res.data.iapItemId,
                    success: function () {
                      window.location.reload();
                    },
                    error: function () {

                    }
                  })
                } else {
                  popup.toast(res.code);
                }
              }).catch(function () {

            });
          },
          cancelBtnTitle: '取消'   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
        });


      }
    }
  }
</script>
<style scoped lang="sass" lang="scss" rel="stylesheet/scss">
  .show {
    .text {
      margin-top: 0.3rem;
      text-align: center;
      width: 100%;
      color: #FF4A7D;
      font-size: 0.3rem;
      .big_text {
        font-size: 0.44rem;
      }
    }
    .money {
      width: 100%;
      text-align: center;
      font-size: 0.14rem;
      color: #666666;
      margin-top: 0.1rem;
    }
  }

  .empty_div {
    height: 1px;
    transform: scale(0.5);
    width: 200%;
    transform-origin: 0 0;
    background: #E1E1E1;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .wapper {
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    .head {
      color: #333333;
      font-size: 0.2rem;
      margin-bottom: 0.1rem;
    }
    .select {
      font-size: 0;
      .border {
        display: inline-block;
        width: 1.08rem;
        height: 0.78rem;
        vertical-align: top;
        font-size: 0.12rem;
        margin-bottom: 0.05rem;
        .border_top {
          color: #FF4A7D;
          width: 100%;
          text-align: center;
          margin-top: 0.15rem;
          font-size: 0.14rem;
          span {
            font-size: 0.24rem;
          }
        }
        .border_bottom {
          width: 100%;
          text-align: center;
          color: #666666;
          font-size: 0.14rem;
          margin-top: 0.05rem;
        }
        margin-right: 0.04rem;
        &:before {
          content: '';
          position: absolute;
          width: 2.16rem;
          height: 1.56rem;
          display: inline-block;
          border: 1px solid #FF4A7D;
          transform-origin: 0 0;
          transform: scale(0.5);
          box-sizing: border-box;
          border-radius: 0.08rem;
        }
      }
      .no_border {
        margin-right: 0;
      }
      .select_border{
        background-image: url("//9i.dvmama.com/free/2018/01/04/ddd.png");
        background-repeat: no-repeat;
        background-size: 1.08rem 0.78rem;
        .border_top, .border_bottom {
          color: #FFFFFF;
        }
      }
    }
    .btn {
      width: 2.75rem;
      height: 0.4rem;
      display: inline-block;
      text-align: center;
      line-height: 0.4rem;
      background-image: url('//9i.dvmama.com/free/2018/01/04/aaa.png');
      background-repeat: no-repeat;
      background-size: 2.75rem 0.4rem;
      margin-left: 0.3rem;
      margin-top: 0.35rem;
      margin-bottom: 0.15rem;
      font-size: 0.14rem;
      color: #ffffff;
    }
    .btn2 {
      width: 2.75rem;
      height: 0.4rem;
      display: inline-block;
      text-align: center;
      line-height: 0.4rem;
      background-image: url('//9i.dvmama.com/free/2018/01/04/bbb.png');
      background-repeat: no-repeat;
      background-size: 2.75rem 0.4rem;
      margin-left: 0.3rem;
      margin-top: 0.35rem;
      margin-bottom: 0.15rem;
      font-size: 0.14rem;
      color: #ffffff;
    }
    .alert {
      color: #FF4A7D;
      font-size: 0.12rem;
      width: 100%;
      text-align: center;
      margin-bottom: 0.3rem;
    }
    .rule {
      div {
        color: #999999;
        font-size: 0.12rem;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        line-height: 0.21rem;
      }
      margin-bottom: 0.2rem;
    }
  }


</style>
