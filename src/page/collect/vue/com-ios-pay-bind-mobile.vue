<!--公共确认框-->
<template>
  <!--满屏容器-->
  <div class="com-ios-pay-bind-mobile" :class="[className]">
    <!--居中容器-->
    <div class="table-cell">
      <!--弹窗-->
      <div class="box">
        <!--提示区域-->
        <div class="tip">
          <!--标题-->
          <div class="title" v-html="title" v-if="title" :style="titleStyle"></div>
          <!--输入框-->
          <input class="input" ref="input" type="number" :placeholder="placeholder" v-if="type == 'prompt'"
                 @input="input">
          <!--文案-->
          <div class="text" v-html="text" v-if="text"></div>
          <!--验证码和倒计时-->
          <div class="codeAndCount">
            <input class="code" ref="code" type="text" placeholder="请输入验证码">
            <div class="count counting" v-if="count > 0">{{count}}秒</div>
            <div class="count" :class="{'no-valid': noValid}" @click="getCode" v-else>获取验证码</div>
          </div>
        </div>
        <!--水平分割线-->
        <div class="h-split"></div>
        <!--按钮区域-->
        <div class="btns">
          <!--取消按钮-->
          <div class="btn cancel" v-html="cancelBtnTitle || '取消'" @click="cancelBtnClick"
               v-if="cancelBtnTitle !== null"></div>
          <!--垂直分割线-->
          <div class="v-split" v-if="cancelBtnTitle !== null"></div>
          <!--确定按钮-->
          <div class="btn ok" v-html="okBtnTitle || '确定'" @click="okBtnClick"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    props: {
      // 取值范围，
      className: {
        type: String,
        default: null
      },
      // 取值范围，'alert' || 'confirm' || 'prompt' || 'debug'
      type: {
        type: String,
        default: 'alert'
      },
      // 标题
      title: {
        type: String,
        default: null
      },
      // 文本
      text: {
        type: String,
        default: ''
      },
      // 确定按钮-标题
      okBtnTitle: {
        type: String,
        default: null
      },
      // 确定按钮-点击回调
      okBtnCallback: {
        type: Function,
        default: null
      },
      // 取消按钮-标题
      cancelBtnTitle: {
        type: String,
        default: null
      },
      // 取消按钮-点击回调
      cancelBtnCallback: {
        type: Function,
        default: null
      },
      // 输入框占位符
      placeholder: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        count: 0,
        noValid: true,
      }
    },
    computed: {
      titleStyle(){
        if (this.type == 'debug') {
          return {
            '-webkit-user-select': 'text',
            'user-select': 'text'
          }
        } else {
          return null;
        }
      }
    },
    created(){
    },
    mounted() {
      if (this.type == 'prompt') {
        this.$refs.input.focus();
      }
    },
    methods: {
      // 销毁自身
      destroy(){
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      },
      // 确定按钮-点击事件
      okBtnClick(){
        if (this.okBtnCallback) {
          if (this.type == 'prompt') {
            if(this.okBtnCallback(this.$refs.input.value, this.$refs.code.value) === false) return;
          } else {
            this.okBtnCallback();
          }
        }

        this.destroy();
      },
      // 取消按钮-点击事件
      cancelBtnClick(){
        this.cancelBtnCallback && this.cancelBtnCallback();
        this.destroy();
      },
      // 文本框输入事件
      input(event){
        if (event.currentTarget.value.length == 11) {
          this.noValid = false;
        } else {
          this.noValid = true;
        }
      },
      getCode(){
        var ts = this;

        if (ts.noValid) return;
        debugger

        // 开启倒计时
        ts.count = 60;
        var interval = window.setInterval(function () {
          ts.count--;
          if (ts.count <= 0) {
            window.clearInterval(interval);
          }
        }, 1000);

        $.ajax({
          cache: false,
          async: true,
          url: '/验证码接口?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({}),
          success(response) {

          },
          error(error) {

          }
        });

      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  @keyframes com-ios-pay-bind-mobile-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .com-ios-pay-bind-mobile {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
    * {
      background: transparent;
    }
    .table-cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .box {
        display: inline-block;
        width: r(270);
        background: white;
        border-radius: r(4);
        animation: com-ios-pay-bind-mobile-animation 0.5s;
        .tip {
          display: flex;
          align-items: center;
          flex-direction: column;
          box-sizing: border-box;
          padding: r(15) r(15);
          min-height: r(72);
          font-size: r(14);
          line-height: r(21);
          color: #666;
          > *:not(:first-child) {
            margin-top: r(10);
          }
          .title {
            width: 100%;
            color: #333;
            font-size: r(16);
          }
          .text {
            width: 100%;
            color: #666;
          }
          .input {
            box-sizing: border-box;
            padding-left: r(10);
            width: 100%;
            height: r(36);
            background: #F9F9F9;
            font-size: r(12);
            line-height: r(17);
            border: none;
            outline: none;
          }
          .codeAndCount {
            width: 100%;
            white-space: nowrap;
            font-size: 0;
            .code {
              display: inline-block;
              box-sizing: border-box;
              padding-left: r(10);
              width: r(160);
              height: r(36);
              background: #F9F9F9;
              font-size: r(12);
              line-height: r(17);
              border: none;
              outline: none;
              vertical-align: middle;
            }
            .count {
              margin-left: r(10);
              display: inline-block;
              box-sizing: border-box;
              width: r(70);
              @include height(r(36));
              background: #F9F9F9;
              font-size: r(12);
              border: 1px solid #FF4A7D;
              border-radius: r(2);
              vertical-align: middle;
              color: #FF4A7D;
              &.counting {
                border-color: #E1E1E1;
                color: #333333;
              }
              &.no-valid {
                border-color: #E1E1E1;
                color: #E1E1E1;
              }
            }
          }
        }
        .h-split {
          height: 1px;
          background: #E1E1E1;
          transform: scaleY(0.5);
        }
        .btns {
          display: flex;
          /*align-items: center;*/
          line-height: r(44);
          .v-split {
            width: 1px;
            background: #E1E1E1;
            transform: scaleX(0.5);
          }
          .btn {
            flex: 1;
            @include height(r(44));
            color: #FF4A7D;
            font-size: r(16);
            text-align: center;
            &.cancel {
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
