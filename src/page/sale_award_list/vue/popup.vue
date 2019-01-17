<style lang="sass" lang="scss" rel="stylesheet/scss">
  .popupCont {
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: rgba(0,0,0,.5);
    }
    .text {
      position: fixed;
      top: 50%;
      left: 50%;
      background: #fff;
      z-index: 20;
      transform: translate(-50%,-50%);
      min-width: 2.5rem;
      min-height: 2rem;
      background: #fff;
      border-radius: 0.1rem;
      padding: 0.2rem;
      padding-top: 0.3rem;
      padding-top: 0.2rem;
    }
    .close {
      background: url(//9i.dvmama.com/free/goodsDetail/clearInput_icon.png) center no-repeat;
      background-size: 16px;
      position: absolute;
      background-position-y: center;
      z-index: 100;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  .popupTitle {
    padding-bottom: 0.15rem;
    position: relative;
    color: #666;
    text-align: center;
  }
  .popupTitle:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .popupText {
    padding-top: 15px;
    color: #333;
    line-height: 0.2rem;
    p {
      margin-bottom: 0.05rem;
    }
  }
</style>

<template>
  <div class = "popupCont" v-show = "isclose">
    <div @click = "handleColse" class = "mask"></div>
    <div class = "text">
      <!-- <div v-html = "text"></div> -->
      <div class = "popupTitle">销售奖须知</div>
      <div class = "popupText">
        <p>1、每款商品在同一活动时间，仅参加一个销售奖活动；</p>
        <p>2、活动期间，将按照对应的规则实时统计会员可获得的奖励；</p>
        <p>3、奖励将在活动结束15天后，自动发放至【可提现金额】-【其他收入】中；</p>
        <p>4、如遇退货或取消订单情况，相应奖励将予以扣除</p>
        <p>5、如您对活动有任何疑问，均可咨询大V店客服。</p>
      </div>
      <div @click = "handleColse" class = "close"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      text: {
        type: String,
        default: ""
      },
      isclose: {
        type: Boolean,
        default: false,
      },
      closeBack: {
        type: Function,
        default: null,
      }
    },
    mounted() {

    },
    methods: {
      destory() {
        console.log(this.$el,this.$el.parentNode);
        let self= this.$el,
            parentNode = this.$el.parentNode;
        // this.$destroy();
        parentNode.removeChild(self);

      },
      handleColse() {
        this.$emit("handleback",this.isclose);

      }
    }
  }
</script>
