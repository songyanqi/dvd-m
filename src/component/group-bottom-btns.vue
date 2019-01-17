<!--模板-->
<template>
  <div class="group-bottom-btns">
    <div class="top-line"></div>
    <div class="btns">
      <template v-for="btn in btnArray">
        <a v-if="btn.btnUrl && btn.btnType !== 'cancel' && btn.btnType !== 'buy' && btn.btnType !== 'join' && btn.btnType !== 'new' " @click="click($event, btn)">
        <span>{{btn.btnTxt}}</span>
        </a>

        <a v-if="btn.btnUrl && btn.btnType === 'cancel' && btn.btnType !== 'buy' && btn.btnType !== 'join' && btn.btnType !== 'new' " @click="click($event, btn)" style="line-height:1.5;padding-top:0.05rem;height:0.45rem">
        <span>{{btn.btnTxt.split(',')[0]}}</span>
          <br/>
          <span>{{btn.btnTxt.split(',')[1]}}</span>
        </a>
        <a v-if="!btn.btnUrl" @click="click($event, btn)">{{btn.btnTxt}}</a>
        <!--  底部按钮单独买开团买参团买价格跟随子商品改变 -->
        <a v-if="btn.btnType === 'buy'" @click="click(event, btn)">单价买：¥{{selectShopPrice}}</a>
        <a v-if="btn.btnType === 'join' || btn.btnType === 'new'" @click="click($event, btn)">
          <span v-if="btn.btnType === 'join'">参团买：</span>
          <span v-if="btn.btnType === 'new'">开团买：</span>
          <span v-if="hasParma === true">¥{{selectPrice}}</span>
          <span v-if="hasParma === false">¥{{goodsPrice}}</span>
        </a>
      </template>
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  import $ from 'jquery';
  import tj from 'dvd-service-js-tj';
  import share from 'dvd-service-js-share';
  import popup from 'dvd-service-js-popup';
  import login from 'dvd-service-js-login';

  export default {
    components: {},
    props: {
      btnArray: Array,
      isLogin: {
        default: 0
      },
      isIntercept: {
        default: '0'
      },
      selectedId: {}, // 当前选取子商品id
      selectShopPrice: {}, // 单独买价格
      selectPrice: {}, // 参团买开团买价格
      goodsPrice: {}, // 单规格商品参团买开团买价格
      hasParma: {} // 是否有多规格
    },
    data: function() {
      return {};
    },
    methods: {
      click(event, btn) {
        let ts = this;
        let domain = document.domain.split('.')[1];
        if (domain === 'davdian') {
          //  埋点
          let action_type = {
            more: 5,
            new: 4,
            share: 3
          }[btn.btnType];
          if (action_type) {
            try {
              tj.send({
                production: 12,
                action: 1,
                action_type: action_type
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
        // :href="(btn.btnType == 'new' || btn.btnType == 'join' || btn.btnType == 'pay') && isLogin === 0 ? '/login.html?referer='+encodeURIComponent(location.href) : btn.btnUrl"

        /**
         * btnType:
         *  more  更多    跳转下发的组团列表页
         *  over  结束    跳转下发的组团列表页
         *  buy   单独买  跳转下发的商品详情页
         *  pay   去支付   跳转服务端下发的url
         *  new 开团买 有多规格展示多规格弹框 点击确认后再在下发的url上拼接childId并跳转
         *            没有的话在下发的url上拼接childId并跳转
         *  join  参团买 有多规格展示多规格弹框 点击确认后再在下发的url上拼接childId并跳转
         *              没有的话在下发的url上拼接childId并跳转
         *  again 再开一团 同步开团买
         * */

        // 喊人参团
        if (btn.btnType === 'share') {
          share.callShare();
        }
        // 喊人参团
        if (ts.isIntercept === '1' && (btn.btnType === 'join' || btn.btnType === 'pay')) {
          popup.toast('该团所属店铺已无效，不能正常参团，为了不影响您正常购买，如已下单请取消订单，参加其它的团吧～');
          event.preventDefault();
        }
        // 需要登录的操作但是未登录
        if ((btn.btnType === 'new' || btn.btnType === 'join' || btn.btnType === 'again') && this.isLogin == 0) {
          event.preventDefault();
          login.login();
        }

        // 更多组团 活动结束（更多组团） 单独买 去支付 取消订单
        if ((btn.btnType === 'more') || (btn.btnType === 'over') || (btn.btnType === 'pay') || (btn.btnType === 'cancel') || (btn.btnType === 'hasGroup')) {
          location.href = btn.btnUrl;
        }
        // 单独买
        if (btn.btnType === 'buy') {
          let target = btn.btnUrl.match(/\/(\S*)\./)[1];
          let url = btn.btnUrl.replace(target, ts.selectedId);
          location.href = url;
        }

        // 已登录 开团 参团 再组一团
        if ((btn.btnType === 'new' || btn.btnType === 'join' || btn.btnType === 'again') && this.isLogin == 1) {
          ts.$emit('sgroup', btn.btnUrl);
        }
      }
    }
  };
</script>


<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util";
  /*底部购买按钮*/
  .group-bottom-btns {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;

    .top-line {
      border-top: 1px solid #E3DFD8;
      transform: scaleY(0.5);
      transform-origin: bottom;
    }

    .btns {
      display: flex;

      a {
        flex: 1;
        @include height(r(50));
        font-size: r(14);
        text-align: center;
        background: #F9F7F8;
        color: #666666;

        &:last-of-type {
          background: linear-gradient(to right, #FF5B5B, #FA1862);
          color: white;
        }
      }
    }
  }
</style>
