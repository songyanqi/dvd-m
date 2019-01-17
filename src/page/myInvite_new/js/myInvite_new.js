// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
import type from 'dvd-base-js-type';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import cache from 'dvd-base-js-cache';
import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';
import hybrid from "dvd-service-js-hybrid";


// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      // 全局属性
      window,
      document,
      location,

      // H5项目间通用模块
      ua,
      popup,

      // 首屏返回数据
      response: null,

      hasRegInviter:0,
      canEdit:0,
      inviteCode:'',
      nextReferer:param.get('nextReferer') ? param.get('nextReferer') : "",
    };
  },
  computed: {
    origin_shop:function(){
      return location.origin
    }
  },
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
    // 获取首屏数据
    this.getData();
  },
  mounted() {
    let ts = this;
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  filters: {},
  methods: {
    submit(){
      var that=this;
      if(this.inviteCode.length != 9){
        popup.toast("邀请码输入不规范");
        return;
      }
      hybrid.Network.request({
        cache: false,
        async: true,
        url: "/api/mg/auth/inviter/edit",
        type: 'post',
        data: {
          'inviteCode':that.inviteCode
        },
        dataType: 'json',
        success(res) {
          if(res.code == 0){
            if(!res.data){
              let resultUrl="";
              if(res.shop_url != that.origin_shop){
                  if(that.nextReferer){
                    resultUrl=that.nextReferer.replace(that.origin_shop, res.shop_url);
                  }else{
                    resultUrl=`${res.shop_url}/m/inviteCode.html`;
                  }
              }else{
                //有nextReferer填写完邀请码要继续跳转到指定页面
                if(that.nextReferer){
                  resultUrl=that.nextReferer;
                }else{
                  resultUrl='/m/inviteCode.html';
                }
              }
              // if(ua.isAndroid()){
              //   alert("app"+resultUrl);
              //   native.Browser.close();
              //   native.Browser.open({
              //     url: resultUrl
              //   });
              // }else{
                location.replace(resultUrl);
              // }
            }
          }else{
            popup.toast(res.data.msg);
          }
        },
        error(error) {
          popup.toast(res.data.msg);
        }
      })
    },
    getData() {
      let that = this;
      hybrid.Network.request({
        cache: false,
        async: true,
        url: "/api/mg/auth/inviter/iniCheck",
        type: 'post',
        data: {},
        dataType: 'json',
        success(res) {
          if(!res.code){
            if(res.data.hasRegInviter){
              that.hasRegInviter=res.data.hasRegInviter;
            }
            if(res.data.canEdit) {
              that.canEdit = res.data.canEdit;
            }
          }else{
            popup.toast(res.data.msg);
          }
        },
        error(error) {
          popup.toast(res.data.msg);
        }
      })
    }
  },
});
