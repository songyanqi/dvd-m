<template>
  <div class="btn">
    <div class="btn_left" v-if="userstatus==1 || userstatus==0" @click="vip">成为会员免费听</div>
    <div class="btn_left" v-if="userstatus==3" @click="shareFn">邀请好友<span v-text="income"></span></div>
    <div class="btn_right">
      <img src="//9i.dvmama.com/free/2017/08/16/Rectangle.png" alt="">
      <div class="btn_text" @click="Subscribe" v-if="isSub==0 && (userstatus==1 || userstatus==0)">
        <span>
          <span>订阅合辑:</span>
          <template v-if="!(util.utils.isIOS() && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0 && !logined.isSeller())">
             <span v-if="ifPrice">¥</span>
              <span v-text="isPrice"></span>
          </template>
          <template v-if="util.utils.isIOS() && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0 && !logined.isSeller()">
            <span v-text="isPrice"></span><span> v豆</span>
          </template>
        </span>
      </div>
      <div class="btn_text" @click="Subscribe" v-if="isSub==0 && userstatus==3">
        <span>会员免费订阅:
          <span style='text-decoration: line-through;'>
            <template v-if="util.utils.isIOS() && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0">
              <span v-text="isPrice"></span>
              <span> v豆</span>
            </template>
            <template v-else>
              <span v-if="ifPrice">¥</span>
              <span v-text="isPrice"></span>
            </template>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../../common/js/api.es6"
  import native from "dvd-service-js-native"
  import popup from "dvd-service-js-popup";
  import login from "dvd-service-js-login";
  import {getQuery} from "../../../common/js/utils.es6";
  import util from "../../../common/js/utils.es6";
  import share from "dvd-service-js-share"
  import iosPay from "../../../common/js/iosPay.js"
  import ua from "dvd-base-js-ua"
  export default {
    props:["income","sub","userstatus","albumid","price","share",'response'],
    computed:{
      isSub:function () {
        return this.sub;
      },
      isPrice:function () {
        return this.price;
      },
      shareInfo(){
          return this.share;
      }
    },
    data(){
      return {
        priceFlag:true,
        isapp: util.utils.isApp(),
        albumId:getQuery("albumId"),
        SubscribeFlag:true,
        util:util,
        ua:ua,
        logined:login
      }
    },
    mounted:function () {
      console.log(this.isPrice);
      var that = this;
    },
    methods:{
      shareFn(){
        var that=this;
        if(that.isapp){
          native.custom.share({
            "title":that.shareInfo.title,
            "desc": that.shareInfo.desc,
            "imgUrl": that.shareInfo.imgUrl,
            "link": that.shareInfo.link,
            "shareDesc":that.shareInfo.desc
          })
        }else {
          share.callShare()
      }
      },
      vip(){
        if (this.isapp){
          native.Browser.open({
            url: "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button"
          });
        }else {
          window.location.href="/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
        }
      },
      ifPrice(){
          if(this.isPrice=="0.00"){
              return false;
          }else{
              return true;
          }
      },
      nativePay(url, callback){
        var option = {};
        option.url = encodeURIComponent(url);
        if (url.split("app_pay/").length > 1) {
          var list = url.split("app_pay/")[1].split("&");
          for (var i = 0; i < list.length; i++) {
            var key = list[i].split("=")[0];
            var value = list[i].split("=")[1];
            option[key] = value;
          }
        }
        option.success = callback;
        native.Browser.pay(option)
      },
      Subscribe(){
        var that=this;

        // 如果是iosApp5.2.0以上，调起苹果支付
        if (util.utils.isIOS() && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0 && !login.isSeller()) {
          iosPay.pay({
            "type":'album',
            "albumId":this.albumId,
            "price":this.response.data.attr.price
          });
          return;
        }

        if(that.SubscribeFlag){
          that.SubscribeFlag=false;
          var obj={
            albumId:this.albumId,
            shareUserId:getQuery('shareUserId') || ''
          };
          api("/api/mg/content/album/subscription",obj)
            .then(function(result) {
              let {code, data: {msg, payUrl, jsApi}} = result;
              if (code == 0){
                if (result.data.code == 300) {
                  if (jsApi) {
                    jsApi.jsApiParameters.dvdhref = location.href;
                    window.location.href = "http://open.davdian.com/wxpay_t2/davke_pay.php?info=" + encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                    // window.location.href="http://open.vyohui.cn/wxpay_t3/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters));
                  } else if (payUrl) {
                    that.nativePay(payUrl, function (flag) {
                      if (flag) {
                        native.Audio.audioSubscription({
                          albumId:getQuery('albumId')
                        })
                        setTimeout(function(){
                          popup.confirm({
                            title: '提示',            // 标题（支持传入html。有则显示。）
                            text: '订阅成功',             // 文本（支持传入html。有则显示。）
                            okBtnTitle: '确定',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                            cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
                            okBtnCallback: function(){
                              window.location.reload();
                            },
                            cancelBtnCallback: function(){
                              window.location.reload();
                            }
                          });
                        },600)
                      }
                    });
                  } else {
                    if (that.isapp){
                      native.Audio.audioSubscription({
                        albumId:getQuery('albumId')
                      })
                    }
                    setTimeout(function(){
                      popup.confirm({
                        title: '提示',            // 标题（支持传入html。有则显示。）
                        text: '订阅成功',             // 文本（支持传入html。有则显示。）
                        okBtnTitle: '确定',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                        cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
                        okBtnCallback: function(){
                          window.location.reload();
                        },
                        cancelBtnCallback: function(){
                          window.location.reload();
                        }
                      });
                    },600)

                  }
                } else {
                  if (result.data.code == 100){
                    if (that.isapp){
                      native.Account.login()
                    }else {
                      window.location.href = '/login.html?'+'referer=' + encodeURIComponent(window.location.href)
                    }
                  } else {
                    popup.confirm({
                      title: '提示',
                      text: 'code:'+result.data.code+':msg'+result.data.msg, // 文本（支持传入html。有则显示。）
                      okBtnTitle: '确定',
                      cancelBtnTitle: '取消',
                      okBtnCallback: function(){},
                      cancelBtnCallback: function(){}
                    });
                  }
                }
              }else {
                popup.confirm({
                  title: '提示',
                  text: 'code:'+result.data.code+':msg'+result.data.msg, // 文本（支持传入html。有则显示。）
                  okBtnTitle: '确定',
                  cancelBtnTitle: '取消',
                  okBtnCallback: function(){},
                  cancelBtnCallback: function(){}
                });
              }
              that.SubscribeFlag=true;
            })
        }

      },
    }
  }
</script>
<style scoped>
  .btn{
    font-size: 0;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index:7;
    width: 100%;
    border-top:1px solid #E3DFD8 ;
    border-top:0.5px solid #E3DFD8 ;
    white-space: nowrap;
    max-width: 640px;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .btn_left{
    width: 42%;
    font-size: 14px;
    background: #F9F7F8;
    float: left;
  }
  .btn_right{
    width: 58%;
    float: left;
    font-size: 14px;
    background: red;
    color: white;
    position: relative;
  }
  .btn_right img{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .btn_text{
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
  .btn_text2{
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: gray;
    color:#fff;
  }

</style>
