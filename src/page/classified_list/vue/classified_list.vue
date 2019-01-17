<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";
  .hide {
    overflow: hidden;
  }
  .app {
    background-color:#fff;
    min-height:100vh;
    box-sizing:border-box;
  }
  .classified-list {
    overflow:hidden;
    .dvd-service-com-title {
      z-index: 7;
    }
    .swiper-container {
      background-color:#fff;
      width:100%;
      max-width:640px;

      .swiper-slide {
        width:auto;
      }
    }
    .head {
      position: absolute;
      top:44px;
      padding-right: 0.4rem;
      z-index: 2;
      box-sizing:border-box;

      &.menu {
        position:fixed;
        top:0;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border-bottom: 1px solid #F2F2F2;
        border-top: 1px solid #F2F2F2;
        transform-origin: 0 0;
        transform: scale(0.5,0.5);
        box-sizing: border-box;
      }

    }
    .arrow {
      width: 0.4rem;
      height: 0.4rem;
      background-color: #F9F9F9;
      position: absolute;
      top: 0;
      left: 3.35rem;
      z-index: 2;

      &:after {
        content:'';
        display:block;
        width:r(5);
        height:r(5);
        border-left: 1px solid #FF4A7D;
        border-bottom: 1px solid #FF4A7D;
        transform: rotate(-45deg);
        position:absolute;
        top:r(17.5);
        right:r(17.5);
      }

    }

    .head-tab {
      position:relative;
      padding:r(10) 0;
      font-size:r(14);
      color:#666;

      .swiper-slide {
        @include height(r(20));
        padding: 0 r(15);

        &:not(:last-child) {
          border-right: 1px solid rgba(0,0,0,.1);
        }
        /*&:last-child {*/
          /*padding-right:r(55);*/
        /*}*/
        &.selected {
          color:#FF4A7D;
        }
      }
    }
    .list-banner {
      width:100%;
      padding-top:r(40);
    }
    .age {
      padding:r(20) r(20) r(15);
      box-sizing:border-box;

      .swiper-slide {
        width:r(60);
        @include height(r(24));
        text-align:center;
        font-size: r(12);
        color:#999;
        box-sizing:border-box;

        &.selected {
          color: #FF4A7D;
        }
        &.selected:after{
          border: 1px solid #FF4A7D;
        }
        &:after {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 200%;
          height: 200%;
          border: 1px solid #999;
          border-radius: r(60);
          transform-origin: 0 0;
          transform: scale(0.5,0.5);
          box-sizing: border-box;
        }

        &:not(:last-child) {
          margin-right: r(20);
        }
      }
    }
    .book-list {
      padding-left: r(10);
      background-color:#fff;

      .list-item {
        position:relative;
        overflow:hidden;
        &:not(:last-child) {
          margin-bottom:r(10);
        }

        .item-first,.item-second,.item-third {
          display:inline-block;
          width:r(38);
          height:r(38);
          position:absolute;
          top:0;
          left:0;
        }
        .item-first {
          background:url([[static]]/page/classified_list/img/first.png?v=1.0) no-repeat;
          background-size:r(38);
        }
        .item-second {
          background:url([[static]]/page/classified_list/img/second.png?v=1.0) no-repeat;
          background-size:r(38);
        }
        .item-third {
          background:url([[static]]/page/classified_list/img/third.png?v=1.0) no-repeat;
          background-size:r(38);
        }
        .item-normal {
          display:inline-block;
          position:absolute;
          top:0;
          left:0;
          width:r(30);
          @include height(r(30));
          border-radius:50%;
          background:rgba(216,216,216,.6);
          font-size:r(18);
          color:#fff;
          text-align:center;

          &.little_font {
            font-size:r(12);
          }
        }

        .item-pic {
          width:r(150);
          height:r(150);
          margin-right:r(6);
          float:left;
        }
        .item-text {
          width:r(205);
          height:r(148);
          float:right;
          box-sizing:border-box;
          padding:0 0.1rem 0  0.04rem;
          position:relative;

          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            border-bottom: 1px solid #ddd;
            transform-origin: 0 0;
            transform: scale(0.5,0.5);
            box-sizing: border-box;
          }

          .title {
            color:#333;
            font-size:r(14);
            @include height(r(20));
            width:100%;
            padding-bottom:r(10);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .info {
            color:#999;
            font-size:r(12);
            line-height: r(18);
            margin-bottom:r(10);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .label {
            display:inline-block;
            padding:0 r(10);
            font-size:r(10);
            @include height(r(25));
            text-align:center;
            border-radius: r(4);

            &.sold-out {
              background: linear-gradient(to right, #DBDADA , #C4C4C4);
              color:#fff;
              padding:0 r(15);
            }
            &.active {
              color:#FF4A7D;
              position:relative;

              &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 200%;
                height: 200%;
                border: 1px solid #FF4A7D;
                border-radius: r(10);
                transform-origin: 0 0;
                transform: scale(0.5,0.5);
                box-sizing: border-box;
              }
            }
          }
          .item-footer {
            overflow: hidden;
            position: absolute;
            bottom: 0.1rem;
            width: 100%;

            .money-icon {
              font-size:r(12);
              color:#FF4A7D;
            }
            .money {
              font-size:r(16);
              color:#FF4A7D;
            }
            .money-last {
              font-size: r(14);
              color:#FF4A7D;
            }
            .comment {
              position: absolute;
              right: 0.15rem;
              font-size:r(12);
              color:#999;
              display:inline-block;
              height:r(17);
              line-height:r(20);
            }
          }
        }
      }
    }
    .no-goods {
      padding-top: r(35);
      background-color:#fff;

      .no-goods-pic {
        display:block;
        width:r(120);
        height:r(120);
        margin:0 auto r(30);
      }
      .no-goods-tip {
        text-align:center;
        color:#666;
        font-size:r(14);
        line-height:r(20);
      }
    }

    .pop-up-bg {
      position: fixed;
      top: 0;
      width: 100%;
      max-width: 640px;
      height: 100%;
      display: none;
      z-index: 6;
      line-height: 1;
      background:rgba(0,0,0,.7);
    }
    .pop-up {
      padding: r(35) r(34) r(21);
      background-color:#fff;
      position: fixed;
      top: 44px;
      z-index: 9;
      display:none;
      width:100%;
      max-width: 640px;
      box-sizing:border-box;
      overflow:hidden;

      &.hasmenu {
        position:fixed;
        top:0;
      }

      .group {
        overflow: hidden;

        .group-item {
          float: left;
          width: 25%;
          text-align: center;
          box-sizing:border-box;
          color:#999;
          font-size:r(12);
          line-height:r(17);
          padding:r(9) 0;

          &.selected {
            color: #FF4A7D;
          }
        }

      }
      @keyframes rotate-animation {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(180deg);
        }
      }
      .arrow {
        background-color:#fff;
        animation: rotate-animation 0.3s;
        animation-fill-mode: forwards;

        &:after {
          position:absolute;
          top:r(15);
          right:r(17.5);
        }
      }
    }
    .no_more {
      margin-top: 0.1rem;
      text-align: center;
      img {
        vertical-align: middle;
      }
    }
    .no_moreStyle {
      bottom:0;
      width:100%;
      height:44px;
      line-height: 44px;
      background: #f1f1f1;
    }
  }
</style>
<template>
  <div class="classified-list" v-if="response">
    <com-top-title back title="分类榜单" home share>
      <div class="swiper-container head" slot="bottom" v-if="!isapp || version">
        <ul class="swiper-wrapper head-tab">
          <li class="swiper-slide" v-for="(item, index) in typeList" :class="{selected:headTab == index}"
              @click="swiperSlideClick(index,'head',item.typeId)">{{item.typeName}}</li>
        </ul>
        <i class="arrow" @click="showTab"></i>
      </div>
    </com-top-title>
    <div class="swiper-container head menu" v-if="isapp && !version">
      <ul class="swiper-wrapper head-tab">
        <li class="swiper-slide" v-for="(item, index) in typeList" :class="{selected:headTab == index}"
            @click="swiperSlideClick(index,'head',item.typeId)">{{item.typeName}}</li>
      </ul>
      <i class="arrow" @click="showTab"></i>
    </div>
    <a :href="banner.linkto" v-if="banner.linkto">
      <img class="list-banner" :src="banner.image"/>
    </a>
    <img class="list-banner" :src="banner.image" v-else/>
    <div class="swiper-container age">
      <ul class="swiper-wrapper">
        <li class="swiper-slide" v-for="(item, index) in ageGroupList" :class="{selected:ageTab == index}"
            @click="swiperSlideClick(index,'age',item.ageGroupId)">{{item.ageGroupName}}</li>
      </ul>
    </div>
    <ul class="book-list" v-if="bookList.length != 0">
      <li class="list-item" v-for="(item,index) in bookList" @click="goodsClick(item)">
        <i class="item-first" v-if="index == 0"></i>
        <i class="item-second" v-else-if="index == 1"></i>
        <i class="item-third" v-else-if="index == 2"></i>
        <i class="item-normal" v-else :class="{little_font: index >98}">{{++index}}</i>
        <img class="item-pic" :src="item.goodsImg" />
        <div class="item-text">
          <p class="title">{{item.goodsName}}</p>
          <p class="info">{{item.recommendWord}}</p>
          <span class="label active" v-if="item.goodsLabel">{{item.goodsLabel}}</span>
          <span class="label sold-out" v-if="!item.goodsLabel && item.saleStatus">{{item.saleStatus}}</span>
          <p class="item-footer"><span class="money-icon">￥</span><span class="money">{{item.shopPrice.split(".")[0]}}</span><span class="money-last" v-if="item.shopPrice.split('.')[1]">.{{item.shopPrice.split(".")[1]}}</span><span class="comment" v-if="item.commentVol != ''">{{item.commentVol}}评论</span></p>
        </div>
      </li>
    </ul>
    <div class="no-goods" v-if="bookList.length == 0">
      <img src="[[static]]/page/classified_list/img/no-goods.png" class="no-goods-pic"/>
      <p class="no-goods-tip">商品信息正在调整<br/>
        去看看其他分类榜单吧</p>
    </div>
    <!--顶部下拉tab-->
    <div class="pop-up-bg" @click="showTab"></div>
    <div class="pop-up" :class="{hasmenu: isapp && !version}">
      <ul class="group">
        <li class="group-item" v-for="(item, index) in typeList" :class="{selected:headTab == index}"
            @click="swiperSlideClick(index,'head',item.typeId,showTab())">{{item.typeName}}</li>
      </ul>
      <i class="arrow rotate" @click="showTab"></i>
    </div>
    <!--分页效果图-->
    <div v-show="loading" class="no_more">
      正在加载更多数据
      <img src="//9i.dvmama.com/free/loading_03252.svg" />
    </div>
    <div v-show="no_more" class="no_more no_moreStyle">
      <span>已经到底啦</span>
    </div>

  </div>
</template>
<script>
  import encrypt from 'dvd-service-js-encrypt';
  import date from 'dvd-base-js-date';
  import native from 'dvd-service-js-native';
  import util from 'dvd-service-js-util';
  import ua from 'dvd-base-js-ua';
  import layout from "../../index/module/index/layout.es6";
  import param from 'dvd-base-js-param';
  import share from 'dvd-service-js-share';
  import $ from 'jquery';

  export default {
    components: {
      'com-top-title': require('dvd-service-com-title').default,
    },
    data() {
      return {
        typeId: 0,
        ageGroupId: 0,
        pageIndex: 1,
        response: null,
        bookList: [],
        ajaxing: false,
        preview: param.get('preview', window.location.href),
        loading: false,
        no_more: false,
        headTab: 0,
        ageTab: 0,
        typeList: [],
        banner: null,
        ageGroupList: [],
        version: false, //值为true表示为5.2.0以上app，
        isapp: false
      }
    },
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 设置app头部标题栏
          native.custom.initHead({
            shareOnHead: 1,
          });

          // 设置app头部标题栏
          native.custom.setHead({
            title: document.title,
            homeBtn: '0',
            shareBtn: '1',
          });

          // 设置分享信息
          try {
            share.setShareInfo({
              title: '大V店|图书畅销榜单：最近一周的畅销书都在这里！',
              desc: '数十万大V妈妈的选择，跟着买准没错～',
              link: location.href,
              imgUrl: `${location.protocol}[[static]]/page/classified_list/img/share.png`
            }, ts.response);
          } catch (err) {
            console.error(err);
          }

          // 初始化头部分类轮播tab
          this.swiperHead = new Swiper('.classified-list .head', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: ts.headTab - 1,
          });

          // 初始化年龄轮播tab
          this.swiperAge = new Swiper('.classified-list .age', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: ts.ageTab - 1,
          });
        });
      }
    },
    created(){
      this.getData();
    },
    mounted() {
      var ts = this;
      if(ua.isDvdApp()) {
        ts.isapp = true;
        if(ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
          ts.version = true;
        }
      }
      //页面滚动加载
      window.onscroll = function () {
        var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);//真实内容高度
        //视窗高度
        var viewportHeight = window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight || 0;
        //隐藏高度即滚动的高度
        var scrollHeight = window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop || 0;
        if (pageHeight - viewportHeight - scrollHeight <= 5) {
          ts.getData('scroll');
        }
      }
    },
    methods: {
      getData(scroll) {
        let ts = this;
        if(scroll) {
          // 已经结尾,不要再调接口
          if (ts.response && (ts.response.more == '0' || ts.response.more == undefined)) {
            ts.no_more = true;
            return;
          } else {
            ts.loading = true;
          }
          // 正在请求接口中,不要再调接口
          if (ts.ajaxing) return;
          ts.ajaxing = true;
        }
        if(ts.preview) {
          var obj = {
            typeId: ts.typeId,
            ageGroup: ts.ageGroupId,
            pageIndex: ts.pageIndex,
            preview: ts.preview
          }
        } else {
          var obj = {
            typeId: ts.typeId,
            ageGroup: ts.ageGroupId,
            pageIndex: ts.pageIndex,
          }
        }
        $.ajax({
          cache: false,
          async: true,
          url: '/sale/api/newColumn/getBestChildBookList?_='+ Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax(obj),
          success(response) {
            ts.response = response.data;
            if(ts.response.typeList) {
              ts.typeList = ts.response.typeList;
            }
            if(ts.response.banner) {
              ts.banner = ts.response.banner;
            }
            if(ts.response.ageGroupList) {
              ts.ageGroupList = ts.response.ageGroupList;
            }
            if(scroll) {
              ts.bookList = ts.bookList.concat(ts.response.bookList);
            } else {
              ts.bookList = ts.response.bookList;
            }
            ts.pageIndex++;
            ts.ajaxing = false;
            if(ts.loading) {
              ts.loading = false;
            }
          },
          error(error) {
            // 测试数据
            ts.response = require('../json/classified_list.json');
            ts.response = ts.response.data;
            if(scroll) {
              ts.bookList = ts.bookList.concat(ts.response.bookList);
            } else {
              ts.bookList = ts.response.bookList;
            }
            if(ts.loading) {
              ts.loading = false;
            }
            ts.ajaxing = false;
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /** tab切换 */
      swiperSlideClick(index,type,id) {
        if(type == 'head') {
          this.headTab = index;
          this.ageTab = 0;
          this.typeId = id;
          this.ageGroupId = 0;
          this.pageIndex = 1;
//          this.response = null;
//          this.bookList = [];
          this.no_more = false;
          this.getData();
          this.$forceUpdate();
          $('html,body').animate({scrollTop: 0}, 200);
          try {
            this.swiperHead.slideTo(index - 1);
          } catch (err) {
            console.log(err);
          }
        } else {
          this.ageTab = index;
          this.ageGroupId = id;
          this.pageIndex = 1;
//          this.response = null;
          this.no_more = false;
//          this.bookList = [];
          this.getData();
          this.$forceUpdate();
          try {
            this.swiperAge.slideTo(index - 1);
          } catch (err) {
          }
        }
      },
      /** 商品点击 */
      goodsClick(i) {
        // 跳转详情更改为服务端下发command 2018-06-23 wangchunjie
        let url = '';
        if(i.command && i.command.content){
          url = i.command.content;
        }else{
          url = '/' + i.goodsId + '.html?rp=' + i.rp +'&rl=' + i.rl;
        }
        // 跳转
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url,
          });
        } else {
          location.href = url;
        }
      },
      showTab() {
        $('.classified-list .pop-up-bg').toggle();
        $('.pop-up').toggle();
        $('body').toggleClass('hide');
        if($('body').hasClass('hide')) {
          $("body").bind('touchmove',function(e){
            e.preventDefault();
          });
        } else {
          $("body").unbind("touchmove");
        }
      }
    }
  }
</script>

