<template>
  <div>
    <!--::{{ albumId }}::{{ sortNo }}::{{ btnStatus }}-->
    <!--<lheader class="top" v-if="!isApp"></lheader>-->
    <!--<div class="empty_div" v-if="!isApp"></div>-->
    <com-top-title back :set-head="false" title="免费学习专区" share></com-top-title>
    <index_feed :data="data" :album-id="albumId" :sort-no="sortNo" :btn-status="btnStatus"></index_feed>
    <maskk v-if="isApp && maskFlag"></maskk>
    <maskk2 v-if="!isApp && maskFlag"></maskk2>
    <top v-if="!isApp"></top>
    <data_mask v-if="isApp && maskFlag2"></data_mask>
    <data_mask2 v-if="!isApp && maskFlag2"></data_mask2>
  </div>
</template>
<script>


  import index_feed from '../../index/module/index/index_feed.vue'
//  import dialog from '../../../../utils/dialog.es6';
  import $ from 'jquery';
  import popup from 'dvd-service-js-popup';
  import api from "../../../common/js/api.es6"
  import native from 'dvd-service-js-native';
  import lheader from './header.vue'
  import util from "../../../common/js/utils.es6"
  import maskk from "./mask.vue"
  import maskk2 from "./mask2.vue"
  import top from "dvd-service-com-go-page-top"
  import data_mask from "./data_mask.vue"
  import data_mask2 from "./data_mask2.vue"
  import share from 'dvd-service-js-share';
  import ua from 'dvd-base-js-ua';
  import common from "dvd-service-js-common"
  export default {
    components:{
      index_feed:index_feed,
      lheader:lheader,
      maskk:maskk,
      data_mask:data_mask,
      data_mask2:data_mask2,
      maskk2:maskk2,
      top:top,
      'com-top-title': require('dvd-service-com-title').default,
    },
    data(){
      return {
        data:[],
        pageFlag:true,
        upTime:0,
        name:"landingPage",
        isApp:util.utils.isApp(),
        maskFlag:false,
        maskFlag2:false,
        shareInfo: {},

        albumId:null,
        sortNo:null,
        btnStatus:null
      }
    },


    mounted:function () {
      var _this=this;
      this.getinitData();
      this.scrol();
      if(ua.isDvdApp()){
        if(ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
          native.custom.setHead({
            'isShowAudio': 1,
            'isAudioAbsorb': 0,
            'hideHead': '1',
            success: _this.audioLocation,
            error: _this.audioLocation
          });
        } else {
          native.custom.initHead({
            'shareOnHead': 1,
            'isShowAudio': 1,
            'isAudioAbsorb': 0,
            success: function () {
              native.Browser.setHead({
                'title': '免费学习专区',
                'backBtn': '1',
                'shareBtn': "1",
                success: function () {
                  //              window.iosInterface.audioCallBack_bd_album_content_1();
                  _this.audioLocation();
                },
                error: function () {
                  //              window.iosInterface.audioCallBack_bd_album_content_1();
                  _this.audioLocation();
                }
              })
            },
            error: function () {
              native.Browser.setHead({
                'title': '免费学习专区',
                'backBtn': '1',
                'shareBtn': "1",
                success: function () {
                  //              window.iosInterface.audioCallBack_bd_album_content_1();
                  _this.audioLocation();
                },
                error: function () {
                  //              window.iosInterface.audioCallBack_bd_album_content_1();
                  _this.audioLocation();
                }
              })
            }
          });
        }
      }
      if (window.iosInterface){
        window.iosInterface.audioInfoReload = function(){
          window.location.reload()
        }
      }else {
        window.iosInterface = {}
        window.iosInterface.audioInfoReload = function(){
          window.location.reload()
        }
      }
      iosInterface.getAudioState = function(){}

    },
    methods:{
      audioLocation(){
        var _this=this;
        if(_this.isApp){
          native.Audio.audioLocation({
            success: function (obj) {
//              alert(obj.albumId+":"+obj.sortNo+":"+obj.state);
              _this.albumId = obj.albumId;
              _this.sortNo = obj.sortNo;
              _this.btnStatus = obj.state;
            }
          })
        }
      },
      htmlFontSize(){
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var width = w > h ? h : w;
        width = width > 720 ? 720 : width

        var fz = ~~(width*100000/36)/10000
        document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz +"px";
        var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000
        if (fz !== realfz) {
          document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
        }
      },
      getinitData(){
        var that=this;
        api("/api/mg/content/indexAlbum/getContent")
          .then(function (result) {
            common.checkRedirect(result)
            console.log('result-->' , result)
            if(result.code==0){
              if(result.data && result.data.feedList){
                that.data=that.data.concat(result.data.feedList);
                that.shareInfo = result.data.shareInfo
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
                result.data.feedList.map(function (item,index) {
                  if(item.body.upTime){
                    that.upTime=item.body.upTime;
                  }
                })
              }else{
                that.maskFlag2=true;
              }
            }else{
              if(result.code!=11012){
                that.maskFlag=true;
//                if(result.data.msg){
//                  dialog.alert('code:'+result.code+ ":msg"+result.data.msg);
//                }else{
//                  dialog.alert('code:'+result.code);
//                }
              }
            }
          }).catch(function(e){
//          that.maskFlag=true;
          console.log('e:', e)
        });
      },
      getData(){
        var that=this;
        if(that.pageFlag){
          console.log(that.pageFlag);
          that.pageFlag=false;
          var obj={
            "upTime":that.upTime
          };
          api("/api/mg/content/indexAlbum/getMoreContent",obj)
            .then(function (result) {
              if(result.code==0){
                if(result.data && result.data.feedList){
                  that.data=that.data.concat(result.data.feedList);
                  result.data.feedList.map(function (item,index) {
                    if(item.body.upTime){
                      that.upTime=item.body.upTime;
                    }
                  })
                  if (result.data){
                    that.pageFlag=true;
                  }
                }else{

                }

              }else{
                if(result.data.msg){
                  dialog.alert('code:'+result.code+":msg"+result.data.msg);
                }else{
                  dialog.alert('code:'+result.code);
                }
              }
            }).catch(function(e){
            console.log('e:', e)
          });
        }
      },
      scrol(){
        var that=this;
        $(window).scroll(function(){
          var el = $("body").get(0);
          var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
          if (bottom<100){
            that.getData();
          }
        });
      }
    }
  }
</script>
<style scoped>
  .top{
    position: fixed;
    top: 0;
    background: #fff;
    z-index:999;
  }
  .empty_div{
    height: 44px;
  }
  .to-top-icon{
    z-index: 5;
  }
</style>
