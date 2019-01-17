<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";

  .course {
    background-color:#fff;
    padding:0 10px 10px;
    margin-top:10px;
    overflow:hidden;

    a {
      display:block;
    }
    .course-title {
      color:#666;
      font-size: r(14);
      @include height(r(40));
    }
    .course-pic {
      width: r(110);
      height: r(76);
      float: left;
    }
    .course-text {
      width: r(235);
      padding-left: r(120);

      .course-name {
        font-size: r(14);
        color:#333;
        line-height: r(20);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .course-teacher {
        color:#999;
        font-size: r(12);
        @include height(r(17));
        padding: r(5) 0;
      }
      .course-price {
        color:#FF4A7D;
        font-size:r(12);

        .no-member {
          float:right;

          span {
            color:#999;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="course" v-if="course">
    <a @click="goodsClick(course.id,course.status)">
      <p class="course-title">搭配好课</p>
      <div class="course-detail">
        <img class="course-pic" :src="course.img" />
        <div class="course-text">
          <p class="course-name">{{course.title}}</p>
          <p class="course-teacher">{{course.teacherName}}</p>
          <p class="course-price" v-if="(course.type == 1 && course.status == 1) || (course.type == 0 && course.status == 2)">免费好课</p>
          <p class="course-price" v-else>会员免费<span class="no-member"><span>非会员报名: </span>￥{{course.price}}</span></p>
        </div>
      </div>
    </a>
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
        course: this.response.data.course
      }
    },
    watch: {
    },
    created() {
      //this.getData();
    },
    mounted() {

    },
    methods: {
      /** 商品点击 */
      goodsClick(goodsId,status) {
        if(status == 1) {
          var url = '/course-' + goodsId + '.html';
        } else{
          var url = 'course-series-' + goodsId + '.html';
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
      }
    }
  }
</script>
