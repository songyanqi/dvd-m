<style>
  /*分享*/
  /*@import url(../../../../stylesheet/base.css);*/
  /*@import url(../../../../stylesheet/model.css);*/
  @import url(../css/icon_list.css);
  @import url(../css/article.css);
  @import url(../css/APlayer.min.css);
  @import url(../css/classroom.css);
  /*.warpper {*/
  /*padding-top:0 !important;*/
  /*}*/
  body {
    user-select: text;
  }
  .share-icon {
    display: inline-block;
    width: 40px;
    height: 44px;
    background: url(../img/share_top.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .list_pic {
    background: #ffffff;
  }
  [v-cloak] {
    display: none;
  }
  .static_resource {
    background: #ffffff;
    line-height: normal;
  }
  /*加入会员*/
  .kd_prompt_con {
    max-width: 640px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    height: 44px;
    line-height: 44px;
    position: fixed;
    margin: 0 auto;
    z-index: 20;
  }
  .kd_prompt_con .close {
    background: url(//9i.dvmama.com/free/community_white_close_2x.png) no-repeat;
    width: 15px;
    height: 15px;
    display: block;
    background-size: 15px;
    position: absolute;
    top: 14px;
    left: 13px;
  }
  .kd_prompt_con .title {
    font-size: 12px;
    color: #fff;
    padding: 0 84px 0 40px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
  }
  .kd_prompt_con .kd_btn {
    width: 64px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: #FF4a7d;
    color: #ffffff;
    font-size: 11px;
    display: block;
    position: absolute;
    right: 10px;
    border-radius: 2px;
    top: 10px;
  }
  /*广告位*/
  .article-banner {
    font-size: 0;
    padding: 10px 0 0;
  }
  .article-banner img {
    width: 100%;
    height: auto;
  }
  .content-box {
    background: #ffffff;
    padding: 10px;
  }
  .content-box .title-name {
    font-size: 24px;
    color: #000;
    line-height: 150%;
  }
  .content-box .title-message {
    margin-top: 10px;
    color: #999;
    font-size: 0;
  }
  .content-box .title-message span {
    font-size: 14px;
    margin-right: 20px;
  }
  .content-box .title-message .title-author {
    float: right;
    color: #FF4A7D;
    margin-right: 0;
    font-size: 14px;
  }
  .con-box {
    background: #ffffff;
    padding: 0 10px;
  }
  .num-lr {
    display: flex;
    justify-content: space-between;
    color: #999999;
    padding-top: 10px;
    line-height: 20px;
  }
  .num-lr .left {
    font-size: 0;
  }
  .num-lr .right {
    font-size: 0;
  }
  .num-lr span {
    font-size: 12px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .bg-share {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(//9i.dvmama.com/free/2017/02/07/material-share.png) no-repeat;
    background-size: 15px 15px;
    vertical-align: middle;
  }
  .mes-lr {
    text-align: center;
    padding: 30px 0 20px 0;
  }
  .mes-lr a {
    display: inline-block;
    border: solid 1px #FF4A7D;
    background: #FF4A7D;
    color: #FFF;
    padding: 5px 20px;
    border-radius: 3px;
    font-size: 14px;
  }
  .mes-lr .invoke {
    background-color: #fff;
    color: #FF4A7D;
    margin-left: 30px;
    box-sizing: border-box;
  }
  .article-wapper {
    padding: 0 5px;
    font-size: 0;
    /*background: #ffffff;*/
  }
  .article-list {
    display: inline-block;
    width: 50%;
    font-size: 0;
  }
  .list {
    padding: 0 5px;
    background: #f5f5f5;
  }
  .list_pic img {
    width: 100%;
  }
  .article-content {
    background: #ffffff;
    padding: 0 10px;
  }
  .content {
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #666666;
    height: 36px;
    line-height: 18px;
    margin-top: 6px;
  }
  .type_box {
    position: relative;
    display: inline-table;
    height: 14px;
    line-height: 14px;
    width: auto;
    border-radius: 2px;
    box-sizing: border-box;
    overflow: hidden;
    margin-right: 3px;
  }
  .type_box:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 200%;
    height: 200%;
    border: 1px solid #3E8CE4;
    border-radius: 8px;
    transform: scale(.5, .5);
    -webkit-transform: scale(.5, .5);
    transform-origin: left top;
    -webkit-transform-origin: left top;
    box-sizing: border-box;
    z-index: 1;
  }
  .type_box .type-icon {
    display: inline-block;
    padding: 0 4px;
    color: #3E8CE4;
    font-size: 10px;
    line-height: 10px;
  }
  .article-recommend {
    background: #FFF;
    padding: 10px;
    font-size: 16px;
    color: #333;
    /*margin:10px 0;*/
  }
  .article-recommend-title {
    line-height: 100%;
    border-left: 3px solid #FF4A7D;
    padding-left: 8px;
    margin: 5px 0px;
  }
  .goods-wapper {
    display: flex;
    justify-content: space-between;
    /*padding:0 8px;*/
    line-height: 28px;
  }
  .nowPrice {
    font-size: 12px;
    color: #FF4a7d;
  }
  .warpper.from_earn .kd_prompt_con, .warpper.from_earn .mes-lr, .warpper.from_earn .article-recommend, .warpper.from_earn .article-wapper {
    display: none;
  }
  .warpper.from_earn .num-lr {
    padding-bottom: 20px;
    margin-bottom: 60px;
  }
  .share_btn {
    position: fixed;
    width: 100%;
    max-width: 640px;
    background: -webkit-gradient(linear, left top, right top, from(#FF5B5B), to(#FA1862));
    background: linear-gradient(to right, #FF5B5B, #FA1862);
    background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
    height: 49px;
    bottom: 0;
    line-height: 49px;
    text-align: center;
    z-index: 99;
    color: #fff;
  }
</style>
<template>
  <div class="warpper" v-cloak v-if="response" :class="[{'from_earn':fromEarn}]">
    <!--标题-->
    <!--<com-top-title v-if="!ua.isWeiXin()" back :title="content.title" home share :share-click="shareMaterial"></com-top-title>-->
    <com-top-title v-if="!ua.isWeiXin()" back title="文章详情" home share :share-click="shareMaterial"></com-top-title>
    <template v-if="content && content.onlineStatus || preview">
      <!--商品详情页及文章详情未开店用户提示开店-->
      <div class="kd_prompt_con" v-if="!isSeller">
        <i class="close" @click="close()"></i>
        <span class="title">开通大V会员，立享会员价，还有红包福利拿</span>
        <a href="/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button"><span class="kd_btn">成为会员</span></a>
      </div>
      <!--标题作者时间-->
      <div class="content-box" :style="{'paddingTop':isSeller ? '10px' : '44px' }">
        <div class="title-name">{{content.title}}</div>
        <!--广告位-->
        <div class="article-banner" v-if="adInfo && adInfo.image">
          <a :href="adInfo.link">
            <img :src="adInfo.image" alt="">
          </a>
        </div>
        <div class="title-message">
          <span class="date-time">{{content.addTime}}</span>
          <span>{{content.author}}</span>
          <a :href="shopInfo.link" class="title-author" v-if="!ua.isDvdApp()">{{shopInfo.name}}</a>
        </div>
        <!--静态资源顶部图片-->
        <div class="article-image" v-if="content.imgShow == 1">
          <img :src="content.img" alt="">
        </div>
        <!--静态资源-->
        <div class="static_resource" v-html="content.content"></div>
      </div>
      <div class="con-box" v-cloak>
        <div class="num-lr">
          <!--阅读分享数-->
          <div class="left" v-if="readTimes">
            <span>阅读</span>
            <span>{{readTimes}}</span>
          </div>
          <div class="right" v-if="shareTimes !== '' || shareTimes !== undefined" @click.stop="shareMaterial()">
            <span class="bg-share"></span>
            <span>{{shareTimes}}</span>
          </div>
        </div>
        <!--更多动态／进入店铺 app中不显示-->
        <div class="mes-lr" v-cloak>
          <a :href="leftButtonInfo.link" v-if="leftButtonInfo && leftButtonInfo.title && !ua.isDvdApp()">
            <div>{{leftButtonInfo.title}}</div>
          </a>
          <a :href="rightButtonInfo.link" class="invoke"
             v-if="rightButtonInfo && rightButtonInfo.title && !ua.isDvdApp()">
            <div>{{rightButtonInfo.title}}</div>
          </a>
        </div>
      </div>
      <!--相关商品推荐-->
      <div v-if="dataList && dataList.length != 0" v-cloak>
        <div class="article-recommend">
          <div class="article-recommend-title">相关商品推荐</div>
        </div>
        <div class="article-wapper">
          <div class="article-list" v-for="(item,index) in dataList" @click="toMessage(item)">
            <div class="list">
              <!--图片-->
              <div class="list_pic">
                <img :src="item.imageUrl" alt="">
              </div>
              <!--内容-->
              <div class="article-content">
                <div class="content">
                  <span class="type_box" v-if="item.attrs && item.attrs.length !==0"><span class="type-icon">{{item.attrs[0].attrInfo}}</span></span>
                  {{item.title}}
                </div>
                <!--售价-->
                <div class="goods-wapper">
                  <span class="nowPrice">¥{{item.nowPrice}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="fromEarn" @click="giftShare" class="share_btn">去分享</div>
  </div>
</template>
<script>
  import encrypt from 'dvd-service-js-encrypt';
  import share from 'dvd-service-js-share';
  import native from 'dvd-service-js-native';
  import ua from 'dvd-base-js-ua';
  import login from 'dvd-service-js-login';
  import param from 'dvd-base-js-param';
  import popup from 'dvd-service-js-popup';
  import nativeAncestor from "../../../common/js/nativeAncestor.js";
  import $ from 'jquery';
  export default {
    data() {
      return {
        response: null,
        content: {},//静态资源
        shareInfo: {},//分享信息
        goodsTag: '',
        dataList: {},//相关商品推荐
        leftButtonInfo: {},
        rightButtonInfo: {},
        shopInfo: {},//有店铺名称并且不在app中时
        readTimes: '',
        shareTimes: '', // 分享次数
        //广告
        adInfo: {},
        pageId: param.get('pageId', window.location.href),
        ua: ua,
        isSeller: login.isSeller(),//卖家会员
        ajaxFlag: true,
        sysTime: null, // 服务器时间
        beginTime: null, // 开始时间
        endTime: null, //结束时间
        onlineStatus: null, //上下线
        isDelete: null, // 删除
        fromEarn: false,
        preview: param.get('preview', window.location.href),
        materials: [],//素材
        newMaterials: [],//合成视频图片的新数组
        oldShare: true,
        isAPP: '',
        appV: '',
        is_580: false,
      };
    },
    watch: {
      // 图片处理
      content() {
        this.$nextTick(function () {
          // 监听分享信息
          let that = this;
          $(".need_add_host").each(function () {
            var src = $(this).attr("src")
            $(this).attr("src", src + "&host=" + (location.href.split("/").length && location.href.split("/")[2]));
          });
          var list = window.needTransDomainList || [];
          var allImg = $("img");
          allImg.each(function (i) {
            var $el = $(this);
            var imgSrc = $el.attr("src") || $el.attr("data-src");
            if (imgSrc && imgSrc.length) {
              var domain = imgSrc.replace('//', '').split("/")[0];
              if ($.inArray(domain, list) > -1) {
                var frame_id = 'frame_img' + i;
                window['image_call' + i] = '<img style="width: 100%" id="img" src=\'' + imgSrc + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frame_id + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
                $el.after('<iframe style="width: 100%;" id="' + frame_id + '" src="javascript:parent.image_call' + i + ';" frameBorder="0" scrolling="no"></iframe>');
                $el.remove();
              }
              if (imgSrc.indexOf("speard.php") > -1) {
                var obj = {};
                var pa = imgSrc.split("?")[1].split("&");
                pa.forEach(function (p) {
                  obj[p.split("=")[0]] = p.split("=")[1];
                })
                $.ajax({
                  url: "/images/api/speard/index?redirect_flag=0",
                  data: obj,
                  type: 'POST',
                  dataType: "json",
                  success: function (result) {
                    if (!+result.code) {
                      $el.attr("src", result.data.url);
                    }
                  }
                })
              }
            }
          });
          /*音频操作*/
          var $player = $("#player1");
          if ($player.length) {
            var musicUrl = $player.attr("data-music");
            var musicImgUrl = $player.attr("data-img");
            var ap1 = new APlayer({
              element: document.getElementById('player1'),
              narrow: false,
              autoplay: true,
              showlrc: false,
              music: {
                title: '',
                author: '',
                url: musicUrl,
                pic: musicImgUrl
              }
            });
            ap1.init();
          }
          //app580之下或app外直接跳转页面
          let allA = $(".weChatEnter");
          for (let i = 0; i < allA.length; i++) {
            // todo 新增projectId 通过projectId获取groupid
            let projectId = allA[i].getAttribute('projectid');
            that.getGroupIdByProjectId(allA[i], projectId);
          }
        });
      }
    },
    components: {
      'com-top-title': require('dvd-service-com-title').default
    },
    created() {
      var that = this;
      //判断是否在app内和app版本号
      that.isAPP = ua.isDvdApp();
      if (that.isAPP === true) {
        that.appV = ua.getDvdAppVersion();
        if (ua.compareVersion('5.8.0', that.appV) > 0) {//老版本
          that.is_580 = false;
        } else {
          that.is_580 = true;
        }
      }
      that.getData(function () {
        that.contentData();
        that.goodsListData();//相关商品推荐
      });
      // that.shareData();//分享数据接口
      // window.link = location.href;
      this.getEarnInfo();
    },
    methods: {
      giftShare() {
        native.Share.materialShare({
          "pageId": this.pageId
        });
      },
      getEarnInfo() {
        if (param.get('rl') === 'task') {
          this.fromEarn = true;
          window.link = param.remove('rl');
        }
      },
      // 静态资源获取
      contentData() {
        let that = this,
          preview = param.get('preview', window.location.href);
        let url;
        if ('[[env]]' === 'beta') {
          url = 'https://t.vyohui.cn/beta/page/page_' + that.pageId + '.json?_=' + Date.now();
        } else if ('[[env]]' === 'gray' || '[[env]]' === 'prod') {
          url = 'https://5t.dvmama.com/page/page_' + that.pageId + '.json?_=' + Date.now();
        }
        // url = 'https://t.vyohui.cn/beta/page/page_' + that.pageId + '.json?_=' + Date.now();
        $.ajax({
          cache: false,
          async: true,
          url: url,
          type: 'get',
          data: encrypt.ajax({
            pageId: that.pageId
          }),
          dataType: 'json',
          success(res) {
            // 分享
            if (res.shareInfo) {
              that.shareInfo = res.shareInfo;
            } else {
              that.shareInfo = {
                title: res.title,
                imageUrl: res.shareImg,
                desc: (res.author && res.author != '') ? res.author : "MAMA+|大V店"
              }
            }
            share.setShareInfo({
              title: that.shareInfo.title,
              desc: that.shareInfo.desc,
              link: window.link,
              imgUrl: that.shareInfo.imgUrl,
              success: function () {
                that.sendShareCallback();
              }
            }, that.response);
            that.content = res;
            that.beginTime = res.beginTime;
            that.endTime = res.endTime;
            that.onlineStatus = res.onlineStatus;
            that.isDelete = res.isDelete;
            that.materials = res && res.materials;//素材
//            console.log(that.materials,'that.materials');
            // 长按监听
            that.singlePicHold();
//            document.title = res.title; // 动态创建标题
            //统一显示固定标题--mahenan--20180628
            document.title = "文章详情";
            if (res && res.materials && res.materials.length > 0) {
              that.materials.forEach(function (value) {
                if (value.materialType != 3) {
                  that.oldShare = false; // 新分享面板
                }
              });
            }
            //图片压缩处理
//            var dvdwebp = Cookies.get('dvdwebp');//压缩图片判断图片是否支持webp 格式
            if (res && res.materials && res.materials.length > 0) {
              that.newMaterials = that.materials.map(item => {
                let temp = {...item};
                //视频播放按钮图片合成
                if (temp.videoImg) {
                  temp.videoShareUrl = window.location.protocol + '//' + window.location.host + '/m/material_detail.html?typeId=1&pageId=' + that.pageId + '&materialId=' + item.materialId;
                  temp.videoImg = temp.videoImg + '?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzA1LzA5L3ZpZGVvX2ljb24ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTAwLGxpbWl0XzAsaF8xMDAsbV9maWxs,g_center,y_0'
                }
                // host 合成二维码参数
                if (temp.imageList) {
                  temp.imageList.forEach(function (value) {
                    if (value.imgSplice) {
                      value.imgSplice = value.imgSplice + '&host=' + window.location.host;
                      // console.log(value.imgSplice);
                    }
                  });
                }
                //图片压缩
                var webPsize = '?x-oss-process=image/quality,Q_90&';
                if (temp.imageList) {
                  for (var i = 0; i < temp.imageList.length; i++) {
                    temp.imageList[i].imgOriginal = temp.imageList[i].imgOriginal + webPsize;
                  }
                }
                return temp;
              });
//              console.log(that.newMaterials,'newMaterials');
            }
            // 已删除
            if (that.isDelete == 1) {
              popup.toast("文章已删除");
              if (ua.isDvdApp()) {
                setTimeout(function () {
                  native.Browser.close();
                }, 2000);
              } else {
                setTimeout(function () {
                  location.href = '/articles.html';
                }, 2000);
              }
//              return;
            }
            // onlineStatus == 0 下线
            if (that.onlineStatus == 0 && !preview) {
              popup.toast("文章已下线");
              if (ua.isDvdApp()) {
                setTimeout(function () {
                  native.Browser.close();
                }, 2000);
              } else {
                setTimeout(function () {
                  location.href = '/articles.html';
                }, 2000);
              }
            }
            if (that.onlineStatus == -1 && !preview) {
              if (!(that.sysTime > that.beginTime && that.sysTime < that.endTime)) {
                popup.toast("文章已下线");
                if (ua.isDvdApp()) {
                  setTimeout(function () {
                    native.Browser.close();
                  }, 2000);
                } else {
                  setTimeout(function () {
                    location.href = '/articles.html';
                  }, 2000);
                }
              }
//              return;
            }
          },
          error(error) {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/class_detail.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=class_detail.json`);
          }
        });
      },
      //初始化获取数据接口
      getData(callback) {
        let that = this,
          preview = param.get('preview', window.location.href);
        if (preview) {
          var obj = {
            preview: preview,
            id: that.pageId
          }
        } else {
          var obj = {
            id: that.pageId
          }
        }
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/content/page/detail?_=' + Date.now(),
          type: 'post',
          data: encrypt.ajax(
            obj
          ),
          dataType: 'json',
          success(response) {
            try {
              that.response = response;
              if (response.code === 0) {
                //更多动态
                that.leftButtonInfo = response.data && response.data.leftButtonInfo;
                //进入店铺
                that.rightButtonInfo = response.data && response.data.rightButtonInfo;
                //阅读数
                that.readTimes = response.data && response.data.readTimes;
                //分享数
                that.shareTimes = response.data && response.data.shareTimes;
                //相关商品推荐标题
                that.goodsTag = response.data && response.data.goodsTag;
                //有店铺名称并且不在app中时
                that.shopInfo = response.data && response.data.shopInfo;
                //广告
                that.adInfo = response.data && response.data.adInfo;
                // 时间
                that.sysTime = response.sys_time;
                callback();
                // 新增分享逻辑
                window.link = response.data.shareInfo.link;
              } else {
                if (response.code !== "11012") {
                  // 如果找不到对应文章，直接跳转
                  if (ua.isDvdApp()) {
                    native.Browser.close();
                  } else {
                    location.href = '/articles.html';
                  }
                }
              }
              that.isSeller = login.isSeller();
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      sendShareCallback() {
        let that = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/community/earning/shareLink?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            type: 1
          }),
          success(response) {
            try {
              that.response = response;
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/class_detail.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=class_detail.json`);
          }
        });
      },
      // 相关商品推荐
      goodsListData() {
        let that = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/good/page/recommendGoods?_=' + Date.now(),
          type: 'post',
          data: encrypt.ajax({
            pageId: that.pageId
          }),
          dataType: 'json',
          success(res) {
            try {
              that.dataList = res && res.data && res.data.dataList;
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      //分享成功回调接口
      shareSuccess() {
        //只要调用分享不管分享是否成功都+1
        let that = this;
//        console.log(that.materials.length,'that.materials.length');
        setTimeout(function () {
          that.ajaxFlag = true;
        }, 1500);
        if (that.ajaxFlag === false) {
          return;
        }
        that.ajaxFlag = false;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/content/page/share?_=' + Date.now(),
          type: 'post',
          data: encrypt.ajax({
            pageId: that.pageId
          }),
          dataType: 'json',
          success(res) {
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
        that.shareTimes = 1 + parseInt(that.shareTimes);
      },
      //点击关闭成为会员提示
      close() {
        let that = this;
        if (that.isSeller === false) {
          that.isSeller = true;
          $(".content-box").css("paddingTop", "10px");
        }
      },
      toMessage(obj) {
        window.location.href = `/${obj.goodsId}.html`;
      },
      singlePicHold() {
        this.$nextTick(function () {
          var imgs = $('img');
          for (var i = 0; i < imgs.length; i++) {
            (function (imgItem) {
              imgItem.onload = function () {
                var flag = false,
                  timer = null,
                  already = false;
                $(imgItem).on("touchstart", function () {
                  flag = true;
                  timer = setTimeout(function () {
                    if (flag) {
                      nativeAncestor.savePic($(imgItem).attr("src"));
                    }
                  }, 500);
                });
                $(imgItem).on("touchend", function () {
                  flag = false;
                  clearTimeout(timer);
                });
                $(imgItem).on("touchmove", function () {
                  flag = false;
                  clearTimeout(timer);
                });
                $(imgItem).on("touchcancel", function () {
                  flag = false;
                  clearTimeout(timer);
                });
                var a = $(imgItem).parents("a");
                a.on("touchend", function (e) {
                  if (already) {
                    e.preventDefault();
                    return false;
                  }
                });
              };
            })(imgs[i]);
          }
        })
      },
      //分享command
      shareMaterial() {
        let that = this;
        //调用分享面板
        if (ua.isDvdApp()) {
          let tjKeys = ['rp', 'rl', 'logDp', 'dp', 'rq', 'ru'];
          let referer = {};
          for (var i in tjKeys) {
            let k = tjKeys[i];
            if (param.get(k)) {
              referer[k] = param.get(k);
            }
          }
          //如果是app && 版本大于5.6.0 && 是会员 && 有素材
          if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), "5.6.0") >= 0 && that.isSeller && that.materials && that.materials.length > 0 && !that.oldShare) {
            native.Share.goodsMaterialShare({
              imgUrl: that.shareInfo.imgUrl,
              shareTitle: that.shareInfo.title,
              shareDesc: that.shareInfo.desc,
              url: window.location.href,
              materials: that.newMaterials,
              moreShareMaterial: window.location.protocol + '//' + window.location.host + '/m/material_detail.html?typeId=1&pageId=' + that.pageId,
              shareTypeDesc: '文章链接',
              production: 33,
              actionType: 1
            });
          } else {
            native.Share.materialShare({
              "pageId": that.pageId,
              referer
            });
          }
        } else {
          //在微信和浏览器中 如果有素材
          if (that.materials && that.materials.length > 0 && that.isSeller) {
            //type=1 表示从文章页跳转过来的
            window.location.href = '/m/material_detail.html?typeId=1&pageId=' + that.pageId;
          } else {
            share.setShareInfo({
              title: that.shareInfo.title,
              desc: that.shareInfo.desc,
              link: window.link,
              imgUrl: that.shareInfo.imgUrl,
              success: function () {
                that.sendShareCallback();
              }
            }, that.response);
            share.callShare();
          }
          that.shareSuccess();
        }
      },
      //根据projectID获取groupId
      getGroupIdByProjectId(el, pId) {
        let _this = this;
        console.log(el)
        console.log(pId)
        let appid = el.getAttribute('appid');
        let path = el.getAttribute('path');
        let groupId = el.getAttribute('groupid') || "";
        if (groupId != '') {
          if (_this.is_580 === true) {
            // 拼写app端需要的command
            let params = {
              "path": path + '?groupId=' + groupId,
              "programId": appid
            };
            let StringParams = JSON.stringify(params)
            let URIC = encodeURIComponent(StringParams);
            window.result = function(){};
            let command = "davdian://call.Common.com?action=openWXMiniProgram&callback=result&minv=5.8.0&params=" + URIC;
            el.setAttribute("href", command);
          } else {
            let href = '/m/wechat_flock_enter.html?' + 'groupId=' + groupId;
            el.setAttribute("href", href);
          }
        } else {
          // 调接口获取groupid
          $.ajax({
            cache: false,
            async: true,
            url: '/api/mg/user/advisergroup/getProjectRecommendGroup?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt.ajax({
              projectId: pId
            }),
            success(response) {
              try {
                console.log(response)
                if (response.code == 0) {
                  if (response.data.groupId) {
                    groupId = response.data.groupId
                    if (_this.is_580 === true) {
                      // 拼写app端需要的command
                      let params = {
                        "path": path + '?groupId=' + groupId,
                        "programId": appid
                      };
                      let StringParams = JSON.stringify(params)
                      let URIC = encodeURIComponent(StringParams);
                      window.result = function(){};
                      let command = "davdian://call.Common.com?action=openWXMiniProgram&callback=result&minv=5.8.0&params=" + URIC;
                      el.setAttribute("href", command);
                    } else {
                      let href = '/m/wechat_flock_enter.html?' + 'groupId=' + groupId;
                      el.setAttribute("href", href);
                    }
                  }
                }
              } catch (err) {
                // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
              }
            },
            error(error) {
              console.log(error)
            }
          });
        }
      }
    }
  }
</script>