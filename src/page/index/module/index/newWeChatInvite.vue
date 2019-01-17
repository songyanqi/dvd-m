<template>
  <div class="com-popup-base">
    <div class="table-cell1">
      <div class="wechat_alert">
        <div>
          <div class="adviser-portrait">
            <div class="dialog-title">{{wechatdata.title}}</div>
          </div>
          <div>
            <img v-if="wechatdata.imageUrl!=null && wechatdata.imageUrl!=''" :src="wechatdata.imageUrl"
                 class="dialog-head"
                 width="80px" height="80px"/>
          </div>
        </div>
        <div v-if="wechatdata.name!=null && wechatdata.name!=''" class="dialog-desc">{{wechatdata.name}}</div>
        <div class="dialog-desc-2">{{wechatdata.desc}}</div>
        <div class="dialog-button" @click="toGroupPage()">{{wechatdata.buttonText}}</div>
      </div>
      <div class="dialog-close">
        <img src="https://9i.dvmama.com/free/2018/08/31/icon_group_invite_close.png" @click="close" width="40px"
             height="40px">
      </div>
    </div>
  </div>
</template>

<script>
  import tj from 'dvd-service-js-tj';

  export default {
    name: "newWeChatInvite",
    props: ['wechatdata'],
    methods: {
      close() {
        this.$emit('close');
      },
      toGroupPage() {
        tj.send({
          production: 0,
          action: 1,
          action_type: 3
        });
        window.location.href = this.wechatdata.command.content;
      }
    },
  }
</script>

<style>
  @-webkit-keyframes com-popup-base-animation {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes com-popup-base-animation {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .com-popup-base {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  /*.com-popup-base * {*/
  /*background: transparent;* /
  /*}*/

  .table-cell1 {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .wechat_alert {
    width: 2.34rem;
    padding-bottom: .2rem;
    display: inline-block;
    background: white;
    border-radius: 0.08rem;
    -webkit-animation: com-popup-base-animation 0.5s;
    animation: com-popup-base-animation 0.5s;
  }

  .adviser-portrait {
    padding-top: 0.11rem;
    text-align: center;
    position: relative;
  }

  .dialog-title {
    padding-top: 0.1rem;
    height: 0.2rem;
    line-height: 0.2rem;
    color: #333333;
    font-size: 0.18rem;
    display: inline-block;
    padding-bottom: 0.2rem;
  }

  .dialog-head {
    border-radius: 50%;
  }

  .dialog-desc {
    font-size: 0.18rem;
    color: #333333;
    text-align: center;
    line-height: 0.17rem;
    margin-top: 0.2rem;
    padding-bottom: 0.1rem;
  }

  .dialog-desc-2 {
    color: #333333;
    font-size: 0.14rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    line-height: 0.2rem;
    text-align: -webkit-left;
    text-align: left;
  }

  .dialog-button {
    width: 1.5rem;
    height: 0.4rem;
    border-radius: 0.6rem;
    text-align: center;
    line-height: 0.4rem;
    color: white;
    font-size: 0.14rem;
    margin-left: 0.42rem;
    margin-top: 0.1rem;
    background: linear-gradient(to right, #FF613c, #FA1862);
  }

  .dialog-close {
    margin-top: 0.2rem;
  }
</style>
