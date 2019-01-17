<template>
  <div class="hot_activity_cotnainer index_model" :style="[{ marginTop:data.marginTop },styleObject]">
    <div class="model_con">
      <div class="dvd-index-module clearfix">
        <!-- <div class="index_activity" style="padding:0;margin:0;height:1.4rem;overflow:hidden;">
            <a :href="data.body.dataList[0].command.content" style="height: 1.4rem;padding:0;margin:0;" @click="clickAnalysis" position="0">
                <img class = "newImage" v-lazy="data.body.dataList[0].imageUrl" style="width:100%;height: 1.4rem;">
            </a>
        </div> -->
        <div class="index_activity" style="padding:0;margin:0;overflow:hidden;">
          <div style="padding:0;margin:0;" @click="clickAnalysis" position="0">
            <img class="newImage" v-lazy="data.body.dataList[0].imageUrl" style="width:100%;"
                 :style="{height: data.body.height ? data.body.height / 100 + 'rem' : null}">
            <p class="time-share" @click="timeShare"><span class="share-icon"></span><span class="share-text">分享</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--限时购h5分享-手动复制链接-->
    <!--<div class="g-pop mobile" :class="{'active':show_pop}" id="g-pop">
      <ul>
        <li class="number">{{data.body.dataList[0].shareButton.shareUrl}}</li>
        <li class="copy">长按上方链接可选择复制</li>
        <li class="cancel" @click="show_pop = false">取消</li>
      </ul>
    </div>-->

    <!--限时购h5分享-分享二维码-->
    <div class="share-qrcode" v-if="show_pop" @click="show_pop = false" @touchmove.stop.prevent @mousewheel.stop.prevent>
      <div class="panel" @click.stop>
        <div class="text-top">好商品限时购 把优惠及时分享给朋友</div>
        <img class="qrcode" v-lazy="qrcode">
        <div class="text-bottom">长按二维码分享</div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import './bd_image_0.scss'
  import layout from '../layout.es6';
  import ua from 'dvd-base-js-ua';
  import native from 'dvd-service-js-native';
  import share from 'dvd-service-js-share';
  import qrcode from 'dvd-base-js-qrcode';
  export default {
    data(){
      return {
        msg: 'hello vue',
        show_pop: false, // h5限时购点击分享开关
        qrcode: null, // h5限时购点击分享开关
      };
    },
    props: ['data'],
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      }
    },
    components: {},
    methods: {
      imgObject: function (imgSrc) {
        return {
          src: imgSrc || '//9i.dvmama.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          error: '//9i.dvmama.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          loading: '//9i.dvmama.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
        };
      },
      clickAnalysis: function (item) {
        layout.clickAnalysis(item, this, 'body');
      },
      timeShare() {
        let that = this;
        if (ua.isDvdApp()) {
          // 设置分享信息
          var share_seller_name = '';
          if(sessionStorage.getItem("share_seller_name")){
            share_seller_name = sessionStorage.getItem("share_seller_name") + ' 推荐：';
          }
          share.setShareInfo({
            title: '品质好生活 优惠即刻享',
            desc: share_seller_name + '好商品 限时购 优惠亲朋好友一起享，点击按钮即刻分享',
            link: that.data.body.dataList[0].shareButton.shareUrl,
            imgUrl: '//9i.dvmama.com/free/Pictures/limit_share.jpg'
          });
          // 唤起分享面板
          share.callShare();
          // web版分享卡
        } else {
          // 限时购h5分享-手动复制链接
          /*that.show_pop = true;
           $("#g-pop").bind('touchmove',function(e){
           e.preventDefault();
           });*/

          // 限时购h5分享-分享二维码
          let url = that.data.body.dataList[0].shareButton.shareUrl;
          qrcode.getBase64({
            // version range somewhere in 1 .. 40
            minVersion: 1,
            maxVersion: 40,

            // error correction level: 'L', 'M', 'Q' or 'H'（容错率，H最高）
            ecLevel: 'H',

            // offset in pixel if drawn onto existing canvas
            left: 0,
            top: 0,

            // size in pixel
            size: 300,

            // code color or image element
            fill: '#000',

            // background color or image element, null for transparent background
            background: 'white',

            // content
            text: url.indexOf('http') === 0 ? url : 'http://' + url,

            // corner radius relative to module width: 0.0 .. 0.5
            radius: 0.5,

            // quiet zone in modules
            quiet: 0,

            // modes
            // 0: normal
            // 1: label strip
            // 2: label box
            // 3: image strip
            // 4: image box
            mode: 4,

            mSize: 0.3,
            mPosX: 0.5,
            mPosY: 0.5,

            label: 'no label',
            fontname: 'sans',
            fontcolor: '#000',

            // logo图片地址
            logo: require('./img/bd_ts_title_0/qrcode-logo.png'),
          }).then(function cb(base64) {
            that.qrcode = base64;
            that.show_pop = true;
          });
//          that.show_pop = true;
        }
      },
    }
  };
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "bd_image_0";
</style>
