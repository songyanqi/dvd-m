<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";
  .article {
    margin-top:10px;

    .swiper-slide {
      background-color:#f5f5f5;
      width: r(335);
      transition:transform 200ms;
      transform: scale(0.94,0.94);
    }
    .swiper-slide-active {
      transition:transform 200ms;
      transform: scale(1,1);
    }
    .article-detail.only {
      width: r(355);
      margin: 0 auto;
    }
    .article-detail {
      box-sizing:border-box;
      border-radius: r(3);
      background-color:#fff;
      /*box-shadow:0 r(2) r(4) 0 #000;*/
      padding: r(10);
      position:relative;
      width:r(335);

      &:after {
        content:'';
        position:absolute;
        top:0;
        left:0;
        height:200%;
        width:200%;
        border:1px solid #eee;
        transform-origin:0 0;
        transform:scale(0.5,0.5);
        border-radius:r(3);
        box-sizing:border-box;
      }

      .detail-wrapper {
        display:block;
        position:relative;
        z-index:1;

        .article-writer {
          width:r(50);
          height:r(50);
          border-radius:50%;
          float:left;
        }
        .writer-info {
          padding-left:r(60);

          .writer-name {
            color:#333;
            font-size:r(14);
            @include height(r(30));
            position: relative;

            .name {
              display:inline-block;
              max-width:r(170);
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }

            .label {
              color:#FF4A7D;
              font-size:r(10);
              /*width:r(50);*/
              text-align:center;
              padding:0 r(6);
              height:r(14);
              line-height: r(13);
              display:inline-block;
              margin-left: r(4);
              position:absolute;
              top: 50%;
              transform: translateY(-50%);
              box-sizing:border-box;

              &:after {
                content:'';
                position:absolute;
                top:0;
                left:0;
                height:200%;
                width:200%;
                border:1px solid #FF4A7D;
                transform-origin:0 0;
                transform:scale(0.5,0.5);
                border-radius:r(20);
                box-sizing:border-box;
              }
            }
          }
          .writer-comment {
            color:#666;
            font-size:r(12);
            line-height:(r(17));
            margin-bottom: r(10);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .writer-pic {
            .article-goods-pic{
              width:r(75);
              height:r(75);
              border-radius:r(4);

              &:not(:last-child){
                margin-right:r(10);
              }
            }
          }
        }
      }
    }

    .article-detail .detail-wrapper .writer-info .writer-name .label.android {
      line-height:r(16);
      position:absolute;
      top: 42%;
      transform: translateY(-50%);
    }
  }
</style>
<template>
  <div class="article" v-if="article">
    <div class="article-detail only" v-if="article.length == 1" @click="goodsClick(article[0].pageId)">
      <a class="detail-wrapper">
        <img class="article-writer" :src="article[0].headImg" />
        <div class="writer-info">
          <p class="writer-name"><span class="name">{{article[0].name}}</span><span class="label" :class="{android: ua.isAndroid()}" v-if="article[0].tag">{{article[0].tag}}</span></p>
          <p class="writer-comment">{{article[0].title}}</p>
          <div class="writer-pic">
            <img class="article-goods-pic" :src="img" v-for="(img,i) in article[0].img"/>
          </div>
        </div>
      </a>
    </div>
    <div class="swiper-container" v-if="article.length > 1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,i) in article" @click="goodsClick(item.pageId)">
          <div class="article-detail">
            <a class="detail-wrapper">
              <img class="article-writer" :src="item.headImg" />
              <div class="writer-info">
                <p class="writer-name"><span class="name">{{item.name}}</span><span class="label" :class="{'android': ua.isAndroid()}" v-if="item.tag">{{item.tag}}</span></p>
                <p class="writer-comment">{{item.title}}</p>
                <div class="writer-pic">
                  <img class="article-goods-pic" :src="img" v-for="(img,i) in item.img"/>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
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

  export default {
    props: {
      response: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        article: this.response.data.page,
          ua: ua
      }
    },
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {

//          // 初始化轮播tab
//          this.swiper = new Swiper('.another-buy .swiper-container', {
//            pagination: '.swiper-pagination',
//            slidesPerView: 'auto',
//            paginationClickable: true,
//            spaceBetween: 0
//          });
//          setTimeout('this.swiper',3000);
        });
      }
    },
    created() {
      //this.getData();
    },
    mounted() {
      if(this.article.length > 1) {
        this.swiper = new Swiper('.article .swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          initialSlide: 0,
          centeredSlides: true
        });
        setTimeout('this.swiper', 3000);
      }
    },
    methods: {
      /** 商品点击 */
      goodsClick(goodsId) {
        let url = '/class_detail-' + goodsId + '.html';
        // 跳转
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url,
          });
        } else {
          location.href = url;
        }
      }
    }
  }
</script>

