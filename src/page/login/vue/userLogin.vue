<template>
  <div class="wrap">
    <header class="title">账号登录</header>
    <p class="sub-title">请输入您的大V店账号及密码</p>
    <div class="input-box">
      <input type="tel" placeholder="请输入手机号" class="phone" v-model="phone" @focus="$emit('hide-tip')" @blur="$emit('show-tip')">
      <transition name="fade">
        <img class="clear-value" src="//9i.dvmama.com/free/2018/04/14/clearInput.png" alt="" v-show="phone.length" @click="phone=''">
      </transition>
    </div>
    <div class="input-box">
      <input type="password" placeholder="请输入密码" id="pwd" class="password" v-model="pwd" @focus="$emit('hide-tip')" @blur="$emit('show-tip')">
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
    <p class="code-tip mb-10"><span @click="$emit('set-login-type',3)">忘记密码</span></p>
    <div class="btn login-btn" id="loginBtn" :class="{'disabled':!loginFlag}" @click="login">登录</div>
    <span class="login-type" @click="$emit('set-login-type',1)">使用验证码登录/注册</span>
  </div>
</template>
<script>
import $ from 'jquery';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import ua from 'dvd-base-js-ua';
import rsa from '../js/rsa.js';
export default {
  data() {
    return {
      phone:'',
      pwd:'',
      isShowPwd:false,
    };
  },
  computed:{
    loginFlag() {
      return this.phone && this.pwd.length >= 6;
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
    login() {
      const loginBtn = $('#loginBtn'),
        that = this;
      if (loginBtn.hasClass('disabled')) {
        return false;
      }
      $.post('/api/mg/auth/userV2/login', encrypt.ajax({
        mobile:that.phone,
        password:rsa.rsa(that.pwd),
        needRsa:1
      }), res => {
        if (res.code) {
          popup.toast(res.msg || res.data.msg);
          return false;
        } else {
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

