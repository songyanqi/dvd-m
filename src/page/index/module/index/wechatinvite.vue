<template>
  <div v-if="wechatdata" class="com-popup-base">
    <div class="table-cell">
      <div class="wechat_alert">
        <div>
          <div class="adviser-portrait">
            <img v-lazy="wechatdata.avatar">
            <div class="adviser-nickname">{{wechatdata.nickName}}</div>
            <div class="clearInputBlank" @click="close"></div>
          </div>
        </div>
        <div class="adviser-desc">{{wechatdata.groupDesc}}</div>
        <div class="adviser-desc2">{{wechatdata.indexDesc}}</div>
        <div class="qrcode">
          <img v-lazy="wechatdata.groupQrcode">
        </div>
        <div class="qrcode-desc-2">长按识别二维码加入微信群</div>
        <a href="/m/wechatRegister.html" @click="close" class="qrcode-already" v-if="groupFlag">
          我已在微信群中
        </a>
      </div>
    </div>
  </div>

</template>
<script>
import api from '../../../../common/js/api.es6';
import popup from 'dvd-service-js-popup';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      response:null,
      groupFlag: 0,
      chatalert:true
    };
  },
  props:['wechatdata'],
  created() {
    this.getGroupLength();
  },
  methods:{
    close() {
      this.$emit('close', false);
    },
    getGroupLength() {
      api('/api/mg/user/advisergroup/groupList', {
        userId: Cookies.get('gr_user_id'),
        type: 1
      }).then(res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        }
        this.groupFlag = res.data.dataList.length;
      });
    }
  }
};
</script>
<style scoped>
/**
 功能：Math方法
 来自：http://blog.csdn.net/natsuyu/article/details/52191181
*/

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

.com-popup-base * {
  background: transparent;
}

.com-popup-base .table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.wechat_alert {
  width: 3.05rem;
  padding-bottom: .2rem;
  background: #fff;
  display: inline-block;
  background: white;
  border-radius: 0.04rem;
  -webkit-animation: com-popup-base-animation 0.5s;
  animation: com-popup-base-animation 0.5s;
}

.adviser-portrait {
  padding-top: 0.11rem;
  text-align: left;
  padding-left: 0.2rem;
  position: relative;
}

.adviser-portrait .clearInputBlank {
  width: 0.16rem;
  height: 0.16rem;
  background-image: url("//9i.dvmama.com/free/2018/03/26/clearInputBlank.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}

.adviser-portrait img {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 50%;
}

.adviser-nickname {
  padding-top: 0.1rem;
  height: 0.2rem;
  line-height: 0.2rem;
  color: #666;
  font-size: 0.14rem;
  display: inline-block;
}

.adviser-desc {
  margin: auto;
  width: 2.85rem;
  height: 0.91rem;
  padding: 0.21rem 0.1rem 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: url("//9i.dvmama.com/free/2018/03/26/CombinedShape.png")
    no-repeat;
  background-size: 100% 100%;
  text-align: left;
  font-size: 0.14rem;
  line-height: 0.2rem;
}

.adviser-desc2 {
  width: 2.85rem;
  font-size: 0.12rem;
  color: #666666;
  margin: 0.07rem 0.1rem;
  text-align: left;
  line-height: 0.17rem;
}

.qrcode {
  padding-top: 0.1rem;
}

.qrcode-desc-1,
.qrcode-desc-2 {
  padding: 0.1rem 0.2rem 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
}

.qrcode img {
  width: 1.8rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
}

.qrcode-desc-1 {
  color: #666;
}

.qrcode-desc-2 {
  color: #999;
}

.qrcode-already {
  margin: 0.36rem auto 0.29rem;
  font-size: 0.12rem;
  text-decoration: underline;
  color: #666666;
}
</style>
