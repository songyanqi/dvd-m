<template>
  <div>
    <!--<lheader :title="titleN" :price="price" class="top" v-if="!isApp"></lheader>-->
    <com-top-title back :set-head="false" :title="titleN"
                   :share-money="income && income.replace('赚','').replace('元','')"></com-top-title>
    <!--<div class="ndiv" v-if="!isApp"></div>-->
    <index_feed :data="data"></index_feed>
    <div class="empty" v-if="isFree==1 && isSub==0"></div>
    <div class="empty2" v-if="isFree==0 || (isFree==1 && isSub==1)"></div>
    <lfooter @re="reGetData" :share="shareInfo" v-if="isFree==1 && isSub==0 && response" :response="response"
             :income="income" :sub="isSub" :userstatus="userStatus" :albumid="albumId" :price="price"></lfooter>
    <maskk v-if="isApp && maskFlag"></maskk>
    <maskk2 v-if="!isApp && maskFlag"></maskk2>
    <data_mask v-if="isApp && maskFlag2"></data_mask>
    <data_mask2 v-if="!isApp && maskFlag2"></data_mask2>
    <top v-if="!isApp"></top>
  </div>
</template>
<script>
  import index_feed from '../../index/module/index/index_feed.vue'
  import api from "../../../common/js/api.es6"
  import {getQuery} from '../../../common/js/utils.es6';
  //  import dialog from '../../../../utils/dialog.es6';
  import popup from 'dvd-service-js-popup';
  //  import lheader from 'dvd-service-com-title'
  import lheader from './header.vue'
  import lfooter from'./footer.vue'
  import util from "../../../common/js/utils.es6"
  import native from "dvd-service-js-native"
  import maskk from "./mask.vue"
  import maskk2 from "./mask2.vue"
  import data_mask from "./data_mask.vue"
  import data_mask2 from "./data_mask2.vue"
  import top from "dvd-service-com-go-page-top"
  import share from 'dvd-service-js-share';
  import ua from 'dvd-base-js-ua';
  import Cookies from 'js-cookie'
  import common from 'dvd-service-js-common'
  export default {
    components: {
      index_feed: index_feed,
      lheader: lheader,
      lfooter: lfooter,
      maskk: maskk,
      maskk2: maskk2,
      data_mask: data_mask,
      data_mask2: data_mask2,
      top: top,
      'com-top-title': require('dvd-service-com-title').default,
    },
    data(){
      return {
        data: [],
        albumId: getQuery("albumId"),
        pageFlag: true,
        userStatus: 0,
        income: 0,
        isSub: -1,
        price: 0,
        name: "collect",
        isApp: util.utils.isApp(),
        maskFlag: false,
        maskFlag2: null,
        title: "",
        isFree: null,
        titleN: '合辑详情',
        shareInfo: {},
        response: null,

      }
    },
    mounted: function () {
      this.getData();
      if (window.iosInterface) {
        window.iosInterface.audioInfoReload = function () {
          window.location.reload()
        }
      } else {
        window.iosInterface = {}
        window.iosInterface.audioInfoReload = function () {
          window.location.reload()
        }
      }
      window.iosInterface.getAudioState = function(){

      }
      if(!window.result){
        window.result = function(){};
      }
    },
    methods: {
      setHead(title, income){
        var obj = {
          'title': title,
          'backBtn': '1',
          'shareBtn': "1",
          success: function () {
            window.iosInterface.audioCallBack_01();
          },
          error: function () {
            window.iosInterface.audioCallBack_01();
          }
        };
        native.Browser.setHead(obj)
      },
      reGetData(){
        window.location.reload();
      },
      getData(){
        var that = this;
        if (this.pageFlag) {
          this.pageFlag = false;
          var obj = {
            "albumId": that.albumId,
          };
          api("/api/mg/content/album/getAlbumData", obj)
            .then(function (result) {
              that.response = result;
              try {
                common.checkRedirect(result);
              } catch (e) {
              }
              // 在微信中时，立即调用接口判断是否需要微信授权
              if (ua.isWeiXin()) {
                // alert(ts.initResponse.data.needWxAuth === '1');
                // alert(Cookies.get('act_baby_weixin_auth'));
                if (result.data.needWxAuth === 1 && Cookies.get('act_baby_weixin_auth') === undefined) {
                  Cookies.set('act_baby_weixin_auth', 1, {
                    // domain: util.getBaseDomain(),
                    // path: '/',
                    // expires: 1,   // 有效时间1天
                    expires: 1 / 24 / 60    // 有效时间1分钟
                  });
                  // weixin.goAuthPage(true);
                  // ts.initResponse.data.authUrl值为http://open.davdian.com/WechatAPI/auth?access_key=davdian@)!$!)!*&get_open_id=1
                  location.href = result.data.authUrl + '&refer=' + location.href;
//                      throw new Error(`即将跳转微信授权页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
                }
              }

                if(result.code==0){
                  if (result.data && result.data.shareInfo){
                    try {
                      share.setShareInfo({
                        title: result.data.shareInfo.title,
                        desc: result.data.shareInfo.desc,
                        link: result.data.shareInfo.link,
                        imgUrl: result.data.shareInfo.imgUrl
                      },result);

                  } catch (err) {
                    alert(err)
                  }
                }
                if (result.data && result.data.feedList) {
                  that.income = result.data.attr.income;
                  that.price = result.data.attr.price;
                  that.isSub = result.data.attr.isSub;
                  that.title = result.data.shareInfo.title;
                  that.isFree = result.data.attr.isFree;
                  that.shareInfo = result.data.shareInfo;

                  console.log("new=>>", that.isSub);
                  that.userStatus = result.visitor_status;
                  that.data = that.data.concat(result.data.feedList);
                  if (result.data.feedList.length > 0) {
                    that.pageFlag = true
                  }
                  window.iosInterface.getShareInfo = function () {
                    var shareInfo = {
                      title: that.shareInfo.title,
                      desc: that.shareInfo.desc,
                      link: that.shareInfo.link,
                      imgUrl: that.shareInfo.imgUrl
                    };
                    return JSON.stringify(shareInfo);
                  };
                } else {
                  that.maskFlag2 = true;
                }
                if (ua.isDvdApp()) {
                  if (ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
                    var obj = {
                      'shareOnHead': '1',
                      'isShowAudio': 1,
                      success: function () {
                        that.setHead(that.titleN, result.data.attr.income);
                      },
                      error: function () {
                        that.setHead(that.titleN, result.data.attr.income);
                      }
                    };
                    if (that.isFree == 1 && that.isSub == 0) {
                      obj.isAudioAbsorb = 1;
                    } else {
                      obj.isAudioAbsorb = 0;
                    }
                    native.custom.initHead(obj);
                  } else {

                    var obj = {
                      'title': that.titleN,
                      'backBtn': '1',
                      'shareBtn': "1",
                      'isShowAudio': "1",
                      'hideHead': '1',
                      success: function () {
                        window.iosInterface.audioCallBack_01();
                      },
                      error: function () {
                        window.iosInterface.audioCallBack_01();
                      }
                    };
                    if (that.isFree == 1 && that.isSub == 0) {
                      obj.isAudioAbsorb = "1";
                    } else {
                      obj.isAudioAbsorb = "0";
                    }
                    native.Browser.setHead(obj)
                  }
                }

              } else {
                if (result.code != 11012) {
                  if (dataList.data.msg) {
//                  dialog.alert('code:' + dataList.code + ":msg" + dataList.data.msg);
                    popup.alert({
                      className: '',    // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
                      title: '',        // 标题（支持传入html。有则显示。）
                      text: 'code:' + dataList.code + ":msg" + dataList.data.msg,         // 文本（支持传入html。有则显示。）
                      btnTitle: '',     // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                      okBtnCallback() {   // 按钮点击回调（有则执行该回调）

                      },
                      cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                      cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）

                      }
                    });
                  } else {
//                  dialog.alert('code:' + dataList.code);
                    popup.alert({
                      className: '',    // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
                      title: '',        // 标题（支持传入html。有则显示。）
                      text: 'code:' + dataList.code,         // 文本（支持传入html。有则显示。）
                      btnTitle: '',     // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                      okBtnCallback() {   // 按钮点击回调（有则执行该回调）

                      },
                      cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                      cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）

                      }
                    });
                  }
                } else {
                }
              }
            }).catch(function (e) {
            that.pageFlag = true;
            console.log('e:', e)
          });
        }
      }
    }
  }
</script>
<style scoped>
  .empty {
    height: 100px;
  }

  .empty2 {
    height: 50px;
  }

  .top {
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .ndiv {
    height: 44px;
  }

  .dvd-service-com-title {
    z-index: 4
  }
</style>
