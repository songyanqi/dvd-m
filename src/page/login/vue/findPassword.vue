<template>
  <div class="wrap">
    <header class="title">找回密码</header>
    <p class="sub-title">请输入需要找回密码的手机号</p>
    <div class="input-box">
      <input type="tel" placeholder="请输入手机号" class="phone" v-model="phone" @focus="$emit('hide-tip')" @blur="$emit('show-tip')">
      <img class="clear-value" src="//9i.dvmama.com/free/2018/04/14/clearInput.png" alt="" v-show="phone.length" @click="phone=''">
    </div>
    <div class="input-box">
      <input type="number" placeholder="请输入验证码" class="code" v-model="code" @focus="$emit('hide-tip')" @blur="$emit('show-tip')">
      <div class="btn code-btn" id="codeBtn" :class="{'disabled':!phone.length}" @click="getCode(1)">{{codeText}}</div>
    </div>
    <p class="code-tip mb-10" @click="getCode(2)"><span>短信收不到？试试语音验证</span></p>
    <div class="input-box">
      <input type="password" placeholder="请重新设置密码" id="pwd" class="password" v-model="pwd" @focus="$emit('hide-tip')" @blur="$emit('show-tip')">
      <div class="pwd-tool">
        <div class="clear-box">
          <transition name="fade">
            <div  v-show="pwd.length">
              <img class="clear-value" src="//9i.dvmama.com/free/2018/04/14/clearInput.png" alt="" @click="pwd=''">
            </div>
          </transition>
        </div>
        <div class="eye-box">
          <transition-group name="fade" style="position:relative;">
            <img src="//9i.dvmama.com/free/2018/04/14/displayCipher.png" alt="" :key="1" v-show="isShowPwd" @click="hidePwd">
            <img src="//9i.dvmama.com/free/2018/04/14/hiddenPassword.png" alt="" :key="2" v-show="!isShowPwd" @click="showPwd">
          </transition-group>
        </div>
      </div>
    </div>
    <div class="btn login-btn" :class="{'disabled':!confirmFlag}" id="confirmBtn" @click="resetPwd">确定</div>
  </div>
</template>
<script>
import $ from 'jquery';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import rsa from '../js/rsa.js';
import ua from 'dvd-base-js-ua';
export default {
  data() {
    return {
      phone:'',
      pwd:'',
      code:'',
      isShowPwd:false,
      codeText:'获取验证码',
      timer:null,
      time: 60
    };
  },
  computed:{
    confirmFlag() {
      return this.phone && this.pwd.length >= 6 && this.code;
    },
    referer: function() {
      return unescape(param.get('referer'));
    },
    hname: function() {
      return location.hostname.split('.')[0];
    },
    origin: function() {
      return location.origin;
    }
  },
  methods:{
    showPwd() {
      $('#pwd').attr('type', 'text');
      this.isShowPwd = true;
    },
    hidePwd() {
      $('#pwd').attr('type', 'password');
      this.isShowPwd = false;
    },

    /** @augments
     * type 1 文字 2 语音
     */
    getCode(type) {
      const that = this;
      if (this.time !== 60) {
        return false;
      }
      if (this.phone.length < 11) {
        popup.toast('请输入正确的手机号码');
        return false;
      }
      $.post('/api/mg/auth/user/sendSms', encrypt.ajax({
        mobile:that.phone,
        smsType:type,
        sendType:2
      }), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
          popup.toast('发送成功');
          this.checkCodeBtn();
        }
      });
    },
    checkCodeBtn(type) {
      const codeBtn = $('#codeBtn');
      codeBtn.addClass('disabled');
      this.timer = setInterval(() => {
        this.codeText = `${--this.time}秒后重新发送`;
        if (this.time <= 0) {
          this.time = 60;
          this.codeText = '重新获取验证码';
          clearInterval(this.timer);
          codeBtn.removeClass('disabled');
        }
      }, 1000);
    },
    resetPwd() {
      const that = this;
      if ($('#confirmBtn').hasClass('disabled')) {
        return false;
      }
      if (this.pwd.length < 6) {
        popup.toast('密码长度不能小于6位');
        return false;
      }
      $.post('/api/mg/auth/user/resetPassword', encrypt.ajax({
        mobile:that.phone,
        password:rsa.rsa(that.pwd),
        needRsa:1,
        captcha:that.code
      }), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
          localStorage['davd_login_type'] = null;
          if ((that.hname === 'bravetime' || ua.isDvdApp()) && res.visitor_status !== 3) {

            /* 登录成功后跳转到refer页*/
            if (that.referer) {
              location.replace(that.referer.replace(that.origin, res.shop_url));
            } else {
              location.replace(res.shop_url);
            }
          } else {
            location.replace(that.referer || '/');
          }
        }
      });
    }
  }
};
</script>

