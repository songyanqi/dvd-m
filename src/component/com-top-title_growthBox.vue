<template>
  <!--顶部标题-->
  <div class="com-top-title" ref="comTopTitle" v-if="!(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) || growthBox"
       :class="{
          'animate-out': animateOut, 'animate-in': animateIn,
          'show-bg-btn': scrollTop < 200,
          'bottom-line': this.bottomLine,
          oss: !window.isHtml,
    }">
    <!--按钮区域-左侧-->
    <div class="left-btn-wrapper">
      <!--插槽-左侧按钮-->
      <slot name="left"></slot>

      <!--返回-->

      <span class="btn back" @click="backInterClick" v-if="back"></span>
    </div>

    <!--内容面板-->
    <div class="panel" ref="panel" :style="{display: hideBar ? 'none' : null, opacity: opacity ? 0 : null}">
      <!--中间标题区域-->
      <div class="center-title-wrapper">
        <!--标题-->
        <span class="title" :class="{'hack-android': ua.isAndroid()}" v-if="title">{{title}}</span>
        <!--插槽-标题-->
        <slot name="center"></slot>
      </div>
      <!--插槽-面板下方-->
      <slot name="bottom"></slot>
    </div>

    <!--按钮区域-右侧-->
    <div class="right-btn-wrapper">
      <!--插槽-右侧按钮-->
      <slot name="right"></slot>
      <!--首页（不能和分享按钮同时出现）-->
      <!--<span class="btn home" @click="homeInterClick" v-if="home && !(share && ua.isDvdApp() || shareMoney !== '' && !login.isSeller()) && !(shareMoney !== '' && ua.isDvdApp() && login.isSeller())"></span>-->
      <span class="btn home" @click="homeInterClick" v-if="showHome"></span>
      <!--分享（单独制定或指定了分享赚钱）-->
      <!--<span class="btn share" @click="shareInterClick" v-if="share && ua.isDvdApp() || (shareMoney !== '' || shareMoney !== '0') && !login.isSeller()"></span>-->
      <span class="btn share" @click="shareInterClick" v-if="showShare"></span>
      <!--分享赚钱（卖家时显示，非卖家时候自动回退显示分享按钮）-->
      <!--<span class="btn share-money" @click="shareMoneyInterClick" v-if="shareMoney !== '' && shareMoney !== '0' && ua.isDvdApp() && login.isSeller()">-->
      <span class="btn share-money" @click="shareMoneyInterClick" v-if="showShareMoney">
        <span class="text" :class="{'hack-android': ua.isAndroid()}">赚{{shareMoney}}元</span><i></i>
      </span>
      <!--搜索-->
      <span class="btn search" @click="searchInterClick" v-if="search"></span>
    </div>
  </div>
</template>

<script>
  import ua from '../page/growthBox_download/module/ua.js';
  import native from '../common/js/native_box.js';
  import _share from 'dvd-service-js-share';
  import util from '../page/growthBox_download/module/util.js';
  import login from '../page/growthBox_download/module/login.js';
  export default {
    props: {
      // 返回按钮
      back: {
        type: Boolean,
        default: true,
      },
      growthBox: {
        type: Boolean,
        default: false,
      },
      // 返回按钮点击回调
      backClick: {
        type: Function,
        default: null,
      },
      // 首页按钮
      home: {
        type: Boolean,
        default: false,
      },
      // 首页按钮点击回调
      homeClick: {
        type: Function,
        default: null,
      },
      // 分享按钮
      share: {
        type: Boolean,
        default: false,
      },
      // 分享按钮点击回调
      shareClick: {
        type: Function,
        default: null,
      },
      // 分享赚XX元按钮
      shareMoney: {
        type: String,
        default: '',
      },
      // 分享赚XX元按钮点击回调
      shareMoneyClick: {
        type: Function,
        default: null,
      },
      // 搜索按钮
      search: {
        type: Boolean,
        default: false,
      },
      // 搜索按钮点击回调
      searchClick: {
        type: Function,
        default: null,
      },

      // 标题文案
      title: {
        type: String,
        default: '',
      },
      // 底部边框
      bottomLine: {
        type: Boolean,
        default: false,
      },
      // 是否隐藏横条
      hideBar: {
        type: Boolean,
        default: false,
      },

      // 动效-是否开启滚动时透明度渐变
      opacity: {
        type: Boolean,
        default: false,
      },
      // 动效-是否开启上下滑
      slide: {
        type: Boolean,
        default: false,
      },

      // 返回后刷新上一页面，只在app有效
      backRefresh: {
        type: Boolean,
        default: false,
      },

      // 是否调用setHead隐藏头部
      setHead: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        // 全局变量
        window,
        document,

        // 工具模块
        ua,
        native,
        login,

        // 是否显示划入、滑出效果
        animateIn: false,
        animateOut: false,

        // 当前页面滚动高度
        scrollTop: 0,
      }
    },
    computed: {
      // 是否显示-回首页
      showHome(){
        return this.home && !this.showShare && !this.showShareMoney;
      },
      // 是否显示-分享
      showShare(){
        // 如果设置了share，或者设置了shareMoney但因某些原因不能显示shareMoney，则退而显示share
        return ua.isDvdApp() && this.share || this.shareMoney && !this.showShareMoney;
      },
      // 是否显示-分享赚钱
      showShareMoney(){
        return ua.isDvdApp() && login.isSeller() && this.shareMoney && this.shareMoney !== '0';
      }
    },
    created() {
    },
    mounted() {
      var ts = this;

      // title同步
      if(this.title) {
        document.title = this.title;
      }

      // 设置页面顶部paddingTop
      var setPaddingTop = function() {
        // 用app的页面自动加marginTop=44px
        let app = document.querySelector('.in_app');
        if(app && !ts.hideBar && !ts.opacity) {
          app.style.paddingTop = '44px';
        }
        // 标记页面现在用的是h5标题栏
        document.body.className += ' h5-title';
      };

      // 如果是app
      if (ua.isDvdApp()) {
        // 如果app >= 520
        if(ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0 || ts.growthBox) {
          // 设置页面顶部paddingTop
          setPaddingTop();

          // 隐藏app头部
          if(this.setHead) {
            native.custom.setHead({
              'hideHead': '1',
            });
            // 循环调用，以免被后面的命令覆盖，接到回调后不再循环
            var times = 0;
            var interval = setInterval(function () {
              times++;
              if (times >= 10) window.clearInterval(interval);
              native.Browser.setHead({
                'hideHead': '1',
                success: function () {
                  window.clearInterval(interval);
                },
              });
            }, 300);
            // 兜底以免被后面的command覆盖
            setTimeout(function(){
              native.custom.setHead({
                'hideHead': '1',
              });
            }, 3000);
          }
          // 如果app老版本
        } else {
          // 设置app头部，全部切到H5标题时候该代码不需要了
          if (this.setHead) {
            // 设置app头部标题栏
            native.custom.initHead({
              homeOnHead: ts.home ? 1 : 0,
              shareOnHead: ts.share ? 1 : 0,
            });
            // 设置app头部标题栏
            native.Browser.setHead({
              homeBtn: ts.home ? '1' : '0',
              shareBtn: ts.share ? '1' : '0',
              title: document.title,
            });
          }
        }
      } else {
        // 设置页面顶部paddingTop
        setPaddingTop();
      }

      // 头部滚动渐隐渐现逻辑
      if(ts.opacity) {
        window.addEventListener('scroll', function () {
          ts.scrollTop = util.getDocumentScrollTop();
          ts.$refs.panel.style.opacity = ts.scrollTop / 200;
          console.log(ts.$refs);
        }, false);
      }

      // 标题是否自动划入滑出
      this.slide && !ua.isDvdApp() && this.autoSlideInOut();

      // 解决ios微信中标题栏置顶无法下拉问题
      ua.isIos() && ua.isWeiXin() && this.iosDownPullHack();
    },
    methods: {
      /**
       * 返回按钮点击事件
       */
      backInterClick() {
        // 如果指定了回调，则执行回调
        if (this.backClick) {
          this.backClick();
          // 如果未指定回调，则执行返回
        } else {
          // 如果在app中，调用app返回功能
          if(ua.isDvdApp()){
            native.Browser.goBack({
              needRefresh : this.backRefresh ? 1 : 0,
            });
            // 如果不在app中，根据history返回或关闭页面
          } else {
            if (history.length > 1) {
              history.back();
              // 如果返回到了第一页，再返回就关闭窗口
            } else {
              // 微信
              if (ua.isWeiXin() && window.wx) {
                window.wx.closeWindow();
                // 大V店app
              } else if (ua.isDvdApp()) {
                native.Browser.close();
                // 浏览器
              } else {
                window.location.href = "about:blank";
                window.close();
              }
            }
          }
        }
      },
      /**
       * 首页按钮点击事件
       */
      homeInterClick() {
        // 如果指定了回调，则执行回调
        if (this.homeClick) {
          this.homeClick();
          // 如果未指定回调，则跳转首页
        } else {
          // 跳转到app首页
          if (ua.isDvdApp()) {
            native.Browser.goNativeHomePage();
            // 跳转到web首页
          } else {
            location.href = '/';
          }
        }
      },
      /**
       * 分享按钮点击事件
       */
      shareInterClick() {
        // 如果指定了回调，则执行回调
        if (this.shareClick) {
          this.shareClick();
          // 如果未指定回调，则跳转首页
        } else {
          // 唤起分享
          _share.callShare()
        }
      },
      /**
       * 分享赚xx元按钮点击事件
       */
      shareMoneyInterClick() {
        // 如果指定了回调，则执行回调
        if (this.shareMoneyClick) {
          this.shareMoneyClick();
          // 如果未指定回调，则跳转首页
        } else {
          // 唤起分享
          _share.callShare();
        }
      },
      /**
       * 搜索按钮点击事件
       */
      searchInterClick() {
        // 如果指定了回调，则执行回调
        if (this.searchClick) {
          this.searchClick();
        }
      },
      /**
       * 开启自动划入、滑出效果
       */
      autoSlideInOut() {
        let ts = this;

        // 动态获取标题栏的高度
        let titleBarHeight = ts.$el.clientHeight;

        // 记录每次滚动条移动的最后位置
        let lastY = 0;

        // 是否标题栏正在滑入、滑出
        let slidingIn = false;
        let slidingOut = false;

        // 监听滚动条移动事件
        window.addEventListener('scroll', function () {
          // 滚动条移动的当前位置
          let y = util.getDocumentScrollTop();

          // 滚动条向下滚动时，标题栏滑出
          if (y - lastY > 0) {
            // 如果当前没有划入效果 && 滚动距离大于标题栏高度
            if (!slidingOut && y > titleBarHeight) {
              // 滑出
              ts.animateIn = false;
              ts.animateOut = true;

              // 延迟一定时间后可再次滑出
              slidingOut = true;
              setTimeout(function () {
                slidingOut = false;
              }, 50);
            }
            // 滚动条向上滚动时，标题栏滑入
          } else if (!slidingIn && y - lastY < 0) {
            // top-title向下滑入
            ts.animateIn = true;
            ts.animateOut = false;

            // 延迟一定时间后可再次滑入
            slidingIn = true;
            setTimeout(function () {
              slidingIn = false;
            }, 50);
          }

          // 记录每次滚动条移动的最后位置
          lastY = y;
        }, false);
      },
      /**
       * 兼容ios微信下拉时，看不到页面地址问题
       */
      iosDownPullHack() {
        let ts = this;
        window.addEventListener('scroll', function () {
          let y = util.getDocumentScrollTop();
          if (y < 0) {
            ts.$refs.comTopTitle.style.position = 'absolute';
          } else {
            ts.$refs.comTopTitle.style.position = 'fixed';
          }
        }, false);
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 标题栏高度
  $height: 44px;

  // 顶部标题
     .com-top-title {
       position: fixed;
       top: 0;
       width: 100%;
       max-width: $pageMaxWidth;
     @include height($height);
       color: #333;
       text-align: center;
       font-size: 16px;
       z-index: 2;

  // 标题栏滑出效果
  @keyframes animation-top-title-slide-out {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  &.animate-out {
     animation: animation-top-title-slide-out 0.2s forwards;
   }

  // 标题栏划入效果
  @keyframes animation-top-title-show-in {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  &.animate-in {
     animation: animation-top-title-show-in 0.2s forwards;
   }

  /* 标题栏底部虚线 */
  &.bottom-line:after {
     content: '';
     display: block;
     height: 1px;
     background: rgba(0, 0, 0, 0.05);
   }

  /* 内容面板区域 */
  .panel {
    position: relative;
    height: $height;
    background-color: rgba(255, 255, 255, 0.95);
  /* 中间标题区域 */
  .center-title-wrapper {
    display: inline-block;
  @include height($height);
    min-width: 30%;
    max-width: 70%;
  @include ellipsis;
  .title {
  /* 标题兼容安卓垂直居中 */
  &.hack-android {
     line-height: $height + 2px;
   }
  }
  }
  }

  /* 左侧、右侧按钮区域 */
  .left-btn-wrapper, .right-btn-wrapper {
    position: absolute;
    top: 0;
    height: $height;
    font-size: 0;
    z-index: 2;

  /* 按钮 */
  .btn {
    display: inline-block;
    margin: 0;
    width: 40px;
  @include height($height);
    text-align: center;
    font-size: 16px;
    background: center no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    cursor: pointer;

  /* 按钮-返回 */
  &.back {
     background-image: url([[static]]/common/img/title-btn-back.png);
  &.bg {
     background-image: url([[static]]/common/img/title-btn-back-bg.png);
   }
  }

  /* 按钮-首页 */
  &.home {
     background-image: url([[static]]/common/img/title-btn-home.png);
  &.bg {
     background-image: url([[static]]/common/img/title-btn-home-bg.png);
   }
  }

  /* 按钮-分享 */
  &.share {
     background-image: url([[static]]/common/img/title-btn-share.png);
  &.bg {
     background-image: url([[static]]/common/img/title-btn-share-bg.png);
   }
  }

  /* 按钮-分享赚钱 */
  &.share-money {
     margin-right: 10px;
     padding: 0 5px;
     width: auto;
   @include height(28px);
     border: 1px solid #ccc;
     border-radius: 2px;
     /*box-sizing: border-box;*/
     font-size: 0;
  .text {
    margin-right: 5px;
    vertical-align: middle;
    color: #666;
    font-size: 14px;
  &.hack-android {
     position: relative;
     top: 1px;
   }
  }
  i {
    display: inline-block;
    width: 17px;
    height: 16px;
    background: url([[static]]/common/img/title-btn-share-money.png) no-repeat;
    background-size: 17px 16px;
    vertical-align: middle;
  }
  }

  /* 按钮-搜索 */
  &.search {
     background-image: url([[static]]/common/img/title-btn-search.png);
   }
  }
  }

  /* 左侧按钮区域 */
  .left-btn-wrapper {
    left: 0;
  }

  /* 左侧按钮区域 */
  .right-btn-wrapper {
    right: 0;
  }
  }

  /* 按钮切换为带背景色的按钮 */
  .com-top-title.show-bg-btn {
  .left-btn-wrapper, .right-btn-wrapper {
  .btn {
  /* 按钮-返回 */
  &.back {
     background-image: url([[static]]/common/img/title-btn-back-bg.png);
   }

  /* 按钮-首页 */
  &.home {
     background-image: url([[static]]/common/img/title-btn-home-bg.png);
   }

  /* 按钮-分享 */
  &.share {
     background-image: url([[static]]/common/img/title-btn-share-bg.png);
   }

  /* 按钮-分享赚钱 */
  &.share-money {
     background-color: rgba(255, 255, 255, 0.7);
   }
  }
  }
  }

  /* 未前后端分离页面不能做[[static]]替换，故要用oss上的图片 */
  .com-top-title.oss {
  .left-btn-wrapper, .right-btn-wrapper {
  .btn {
  /* 按钮-返回 */
  &.back {
     background-image: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-back.png);
   }

  /* 按钮-首页 */
  &.home {
     background-image: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-home.png);
   }

  /* 按钮-分享 */
  &.share {
     background-image: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-share.png);
   }

  /* 按钮-分享赚钱 */
  &.share-money {
     background-color: rgba(255, 255, 255, 0.7);
  i {
    background-image: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-share-money.png);
  }
  }

  /* 按钮-搜索 */
  &.search {
     background-image: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-search.png);
   }
  }
  }
  }
</style>
