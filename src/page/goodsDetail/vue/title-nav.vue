<template>
  <!--底部菜单栏-->
  <div class="title-nav">
    <span class="anchor" :class="{active: titleAnchor == 'goodsDetail'}"
          @click="toAnchor('goodsDetail');">商品<i></i>
    </span>
    <span class="anchor" v-if="!isbiggift" :class="{active: titleAnchor == 'comment'}"
          @click="toAnchor('comment');">评价<i></i>
    </span>
    <span class="anchor" :class="{active: titleAnchor == 'detail_area'}"
          @click="toAnchor('detail_area');">详情<i></i>
    </span>
    <span class="anchor"  v-if="!isbiggift"  :class="{active: titleAnchor == 'anotherBuy' || titleAnchor == 'tt_com_1_wrap'}"
          @click="toAnchor('anotherBuy');">推荐<i></i>
    </span>
  </div>
</template>

<script>
  import util from 'dvd-service-js-util';
  import $ from 'jquery';

  export default {
    props: ['isbiggift'],
    data() {
      return {
        window: window,
        titleAnchor: 'goodsDetail',
        scrolling: false,
      }
    },
    computed: {},
    mounted(){
      let ts = this;

      function setlect() {
        var topPop = document.querySelector('.kd_prompt_con');

        // 获取评论的位置
        let commentOffsetTop = 10000;
//        let intervalComment = setInterval(function () {
          let commentDom = document.querySelector('#comment');
          if (commentDom) {
            commentOffsetTop = util.getOffsetTop(commentDom) - 44 - 10 - (topPop ? 44 : 0);
//            clearInterval(intervalComment);
          }
//        }, 1000);

        // 获取图文详情的位置
        let detailOffsetTop = 10000;
//        let intervalDetail = setInterval(function () {
          let detailDom = document.querySelector('#detail_area');
          if (detailDom) {
            detailOffsetTop = util.getOffsetTop(detailDom) - 44 - 10 - (topPop ? 44 : 0);
//            clearInterval(intervalDetail);
          }
//        }, 1000);

        // 获取推荐的位置
        let recommendOffsetTop = 10000;
//        let intervalRecommend = setInterval(function () {
          let recommendDom = document.querySelector('#anotherBuy') || document.querySelector('#tt_com_1_wrap');
          if (recommendDom) {
            recommendOffsetTop = util.getOffsetTop(recommendDom) - 44 - 10 - (topPop ? 44 : 0);
//            clearInterval(intervalRecommend);
          }
//        }, 1000);


        let scrollTop = util.getDocumentScrollTop();
        if (scrollTop < commentOffsetTop) {
          ts.titleAnchor = 'goodsDetail';
        } else if (scrollTop < detailOffsetTop) {
          ts.titleAnchor = 'comment';
        } else if (scrollTop < recommendOffsetTop) {
          ts.titleAnchor = 'detail_area'
        } else {
          ts.titleAnchor = 'anotherBuy';
        }
      }
      // 页面滚动时切换title选中状态
      document.addEventListener('scroll', function () {
        if (ts.scrolling) return;
        setlect();
      }, false);

      // 进页面直接判断一遍
      setTimeout(setlect, 500);
      setTimeout(setlect, 1000);
      setTimeout(setlect, 2000);
    },
    watch: {},
    methods: {
      toAnchor(id){
        let ts = this;
        if(id == 'anotherBuy') {
          ts.titleAnchor = document.querySelector('#' + id) ? id : 'tt_com_1_wrap';
        } else {
          ts.titleAnchor = id;
        }
//        window.location = '#' + this.titleAnchor;
        let duration = 200;
        let position = $('#' + this.titleAnchor).offset().top - 44 - 9 - (document.querySelector('.kd_prompt_con') ? 44 : 0);
//        if(ts.titleAnchor == 'comment') {
//          position -= 10;
//        }
        $('html, body').animate({
          scrollTop: position
        }, duration);
        ts.scrolling = true;
        setTimeout(function () {
          ts.scrolling = false;
        }, duration + 50)
      },
    },
    filters: {}
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .title-nav {
    /*业务*/
    .anchor {
      position: relative;
      display: inline-block;
      /*margin: 0 17px;*/
      margin: 0 0.11rem;
      font-size: 16px;
      height: 44px;
      width: 36px;
      color: #333;
      i {
        position: absolute;
        bottom: 0px;
        display: block;
        width: 36px;
        height: 2px;
      }
      &.active {
        color: #FF4a7d;
        i {
          background: #FF4a7d;
        }
      }
    }
  }
</style>
