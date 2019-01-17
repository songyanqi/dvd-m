<template>
  <!--底部菜单栏-->
  <div class="com-act-subscribe">
    <!-- banner图 -->
    <img class="banner" src="[[static]]/page/act_1018_main/img/subscribe-banner.png">

    <!-- 场次tab -->
    <div class="swiper-container" v-if="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="swiperSlideClick(i)" v-for="(item, i) in list">
          <div class="item" :class="{selected: tabIndex === i}">
            <p>{{item.line1}}</p>
            <p>{{response.sys_time + '000' > eval(item.startTime).valueOf() ? '已开抢' : item.line2}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="g-goods-wrapper" v-if="list">
      <ul>
        <li v-for="(item, i) in list[tabIndex].goodsList" v-if="i < 3" @click="goodsClick(item.goodsId)">
          <img class="pic" v-lazy="item.imgUrl">
          <div class="price">
            <div class="act">抢购价:￥{{item.actPrice}}</div>
            <div class="origin">原价：￥{{item.originPrice}}</div>
          </div>
        </li>
      </ul>
      <!--更多-->
      <a href="/act_1018_main_subscribe.html">
        <img class="more" src="[[static]]/page/act_1018_main/img/subscribe-more.png">
      </a>
    </div>

  </div>
</template>

<script>
  import encrypt from 'dvd-service-js-encrypt';
  import date from 'dvd-base-js-date';
  import native from 'dvd-service-js-native';
  import util from 'dvd-service-js-util';
  import ua from 'dvd-base-js-ua';
  import $ from 'jquery';
  export default {
    props: {
      response: {
        type: Object,
        default: null
      },
      currentDate: {
        type: String,
        default: null
      },
      begin: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        list: null,
        tabIndex: 0,
        date: date,
      }
    },
    computed: {},
    watch: {
      // 监听response变化
      list() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 初始化轮播tab
          this.swiper = new Swiper('.com-act-subscribe .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: ts.tabIndex,
          });

          // 防止2个预约同时出现
          if(Object.prototype.toString.call(this.swiper) == '[object Array]'){
            this.swiper = this.swiper[1];
          }

          // 选中最近的已开抢
          let index = 0;
          for (let i in ts.list) {
            let item = ts.list[i];
            let startTime = null;
            try {
              startTime = eval(item.startTime);
            } catch (err) {
              console.error(err);
              return;
            }
            if (ts.response.sys_time + '000' > startTime.valueOf()) {
              index = parseInt(i);
            }
          }
          this.swiperSlideClick(index);
        });
      }
    },
    created(){
      this.getData();
    },
    mounted() {
    },
    methods: {
      getData() {
        let ts = this;

        // 测试数据
//        setTimeout(function(){
//          ts.list = require('../json/act-subscribe.json');
//        }, 1000);

        $.ajax({
          cache: false,
          async: true,
          url: `${location.protocol}//${util.getSecondDomain()}.davdian.com/t-14537.html?_=${Date.now()}`,
          type: 'get',
          dataType: 'json',
          data: {},
          success(response) {
            ts.list = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /** tab切换 */
      swiperSlideClick(index) {
        this.swiper.slideTo(index - 2);
        this.tabIndex = index;
        this.screenings = this.list[index].screenings;
        this.$forceUpdate();
      },
      /** 商品点击 */
      goodsClick(goodsId) {
        let url = '';
//        if (this.currentDate < '2017-10-19') {
        if (!this.begin) {
          url = '/act_1018_main_subscribe.html';
        } else {
          url = '/' + goodsId + '.html';
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
    },
    filters: {}
    ,
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .com-act-subscribe {
    .banner {
      display: block;
      width: r(350);
      margin: r(10) auto;
    }

    .swiper-container {
      height: r(55);
      .swiper-wrapper {
        padding: r(8);
        .swiper-slide {
          width: r(94);
          height: r(35);
          &:last-of-type {
            margin-right: r(10);
          }
          .item {
            position: relative;
            box-sizing: border-box;
            padding: r(3) r(5) 0 0;
            width: r(94);
            height: r(35);
            background: url('[[static]]/page/act_1018_main/img/subscribe-tab-bg.png') no-repeat;
            background-size: contain;
            text-align: center;
            font-size: r(12);
            line-height: r(15);
            &.selected {
              background-image: url('[[static]]/page/act_1018_main/img/subscribe-tab-bg-active.png');
              color: white;
            }
          }
        }
      }
    }

    .g-goods-wrapper {
      margin: r(10) auto r(30);
      padding: r(8) 0 0;
      box-sizing: border-box;
      width: r(356);
      background: #fed406;
      border-radius: r(5);
      ul {
        text-align: center;
        li {
          position: relative;
          margin: 0 r(2);
          padding: 0;
          display: inline-block;
          width: r(110);
          border-radius: r(5);
          overflow: visible;
          font-size: 0;
          &:before {
            content: '';
            position: absolute;
            top: r(-6);
            left: r(-2);
            height: r(30);
            width: r(32);
            background: url([[static]]/page/act_1018_main/img/subscribe-icon.png) no-repeat;
            background-size: 100%;
          }
          .pic {
            width: 100%;
            height: r(110);
            border-top-left-radius: r(5);
            border-top-right-radius: r(5);
          }
          .price {
            background: #f83757;
            padding: r(10) 0;
            line-height: 1.5;
            color: white;
            .act {
              font-size: r(13);
              @include ellipsis;
            }
            .origin {
              font-size: r(9);
              text-decoration: line-through;
              @include ellipsis;
            }
          }
        }
      }
      .more {
        position: relative;
        top: r(15);
        margin: auto;
        display: block;
        width: r(160);
      }
    }
  }
</style>
