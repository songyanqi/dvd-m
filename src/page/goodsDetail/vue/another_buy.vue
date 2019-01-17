<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";

  .another-buy {
    background-color: #fff;
    padding: 0 0 10px 20px;
    margin-top: 10px;

    .buy-title {
      color: #666;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }

    .swiper-slide {
      width: 121px;
      margin-right: 10px;

      .goods-pic {
        position: relative;

        .pic {
          width: 120px;
          height: 120px;
          position: relative;
        }
        .label {
          left: 0;
          bottom: 0;
          position: absolute;
          font-size: 10px;
          opacity: 0.8;
          background: linear-gradient(90deg, #ff5b5b, #fa1862);
          color: #fff;
          line-height: 16px;
          padding: 1px 8px 0 6px;
          border-top-right-radius: 9px;
          border-bottom-left-radius: 4px;

          &:after {
            content: "";
            width: 0;
            height: 0;
            border-width: 0 4px 10px 0;
            border-style: solid;
            border-color: transparent transparent #fa1862 transparent;
            position: absolute;
            margin-left: 8px;
            bottom: 0;
          }
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 200%;
          width: 200%;
          border: 1px solid #E1E1E1;
          transform-origin: 0 0;
          transform: scale(0.5, 0.5);
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          box-sizing: border-box;
        }
      }
      .goods-name {
        color: #333;
        font-size: 13px;
        height: 18px;
        line-height: 18px;
        padding: 9px 0 5px;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .goods-price {
        color: #FF4A7D;
        font-size: 15px;
        height: 21px;
        line-height: 21px;

        span {
          font-size: 12px;
        }
      }
    }
    .swiper-slide:last-child {
      margin-right: 20px;
    }
  }
</style>
<template>
  <div class="another-buy" v-if="goodsList" id="anotherBuy">
    <p class="buy-title">买了该商品的用户还买了</p>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,i) in goodsList" v-if="i < 6" @click="goodsClick(item)">
          <div class="goods-pic">
            <img class="pic" v-lazy="item.imageUrl">
            <span class="label" v-if="item.actInfo">{{item.actInfo}}</span>
          </div>
          <p class="goods-name">{{item.title}}</p>
          <p class="goods-price">
            <span>￥</span>
            <span v-if="item.actPrice">{{item.actPrice}}</span>
            <span v-else="item.nowPrice">{{item.nowPrice}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import native from 'dvd-service-js-native';
  import util from 'dvd-service-js-util';
  import ua from 'dvd-base-js-ua';

  export default {
    props: {
      response: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        goodsList: this.response && this.response.data && this.response.data.goodsList,
        rp: this.response && this.response.data && this.response.data.rp,
        rl: this.response && this.response.data && this.response.data.rl
      }
    },
    mounted() {
      this.swiper = new Swiper('.another-buy .swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: 0
      });
      setTimeout('this.swiper', 3000);
    },
    methods: {
      /** 商品点击 */
      goodsClick(i) {
        let _this = this;
        let url = '';
        if (i.command && i.command.content) {
          url = i.command.content;
        } else {
          url = '/' + i.goodsId + '.html';
        }
        if (_this.rp && _this.rl) {
          url += '?rp=' + _this.rp + '&rl=' + _this.rl;
        } else {
          url += '?rp=goods_detail&rl=another_buy';
        }
        // 跳转
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url,
          });
        } else {
          location.href = url;
        }
      }
    }
  }
</script>

