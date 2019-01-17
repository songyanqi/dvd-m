<template>
<div v-if="response">
  <div class="achievement">
    <div class="activity" v-if="response.data.activity.type == 2">
      <p class="activity-title">我参加的打卡活动</p>
      <ul>
        <li class="activity-item" v-for="(item,index) in response.data.activity.list" :key="index" @click="open('actDetail',item.id)">
          <img :src="item.imageUrl" class="activity-pic" />
          <div class="activity-detail" v-if="item.actStatus == 1">
            <p class="detail-title"><span v-if="item.joinDays">已加入<span class="special">{{item.joinDays}}</span>天</span><span v-if="item.actSignDays > 0">,坚持<span class="special">{{item.actSignDays}}</span>天</span>
            </p>
            <a class="activity-btn" v-if="item.signStatus == 1" @click.stop="tip">已打卡</a>
            <a class="activity-btn act" v-if="item.signStatus == 2" @click.stop="open('card',item.id)">打卡</a>
          </div>
          <p class="activity-detail activity-end" v-if="item.actStatus == 2">活动已结束</p>
        </li>
      </ul>
    </div>
    <div class="activity" v-if="response.data.activity.type == 1">
      <p class="activity-title">为你推荐的打卡活动</p>
      <ul>
        <li class="activity-item" v-for="(item,index) in response.data.activity.list" :key="index" @click="open('actDetail',item.id)">
          <img :src="item.imageUrl" class="activity-pic" />
          <div class="activity-detail">
            <!--<p class="detail-title"><span class="special">XX</span>人已加入</p>-->
            <a class="activity-btn act">加入</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
    <a href="/book/router.html#/hot_card_activity" class="stacks_time_list_toggle">
    <div>更多打卡活动 <i>▶</i></div>
    </a>
</div>
</template>

<script>
// 基础模块
import common from "dvd-service-js-common";
// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// 业务模块
require("es6-promise").polyfill();
import encrypt from "dvd-service-js-encrypt";
import popup from "dvd-service-js-popup";
import native from "dvd-service-js-native";
import ua from "dvd-base-js-ua";
// 渲染页面
export default {
  data() {
    return {
      response: null,
    };
  },
  watch: {

  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/content/bookstore/achieveDetail?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1
        }),
        success(response) {
          try {
            ts.response = response;
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=card_achievement.json`);
        }
      });
    },
    open(type, actId) {
      var url = '';
      if (type == 'card') {
        url = '/book/custom_card.html?actId=' + actId + '&no_change=1';
      } else if (type == 'actDetail') {
        url = '/book/punching_activity.html?actId=' + actId;
      }
      // 跳转
      if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.3.0') >= 0) {
        event.preventDefault();
        if (type == 'actDetail') {
          native.BookStore.openActiveDetail({
            "actId": actId
          });
        } else if (type == 'card') {
          native.BookStore.openCustomRecord({
            "actId": actId,
            "type": "1"
          });
        }
      } else {
        location.href = url;
      }
    },
    tip() {
      popup.toast('已打卡，去看看别的活动吧');
    }
  },

};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
[v-cloak] {
  display: none;
}

.achievement {
  background-color: #fff;
  box-sizing: border-box;
  min-height: 100px;
  .achievement-head {
    padding: r(31) r(20) 0;
    .head-wrapper {
      overflow: hidden;
      padding: 0 0.3rem 0.25rem;
      position: relative;
      &:after {
        content: '';
        width: 200%;
        position: absolute;
        bottom: 0;
        border-bottom: 1px solid #D8D8D8;
        transform-origin: 0 0;
        transform: scale(0.5, 0.5);
        left: 0;
      }
    }
    .head-item {
      float: left;
      width: 50%;
      text-align: center;
      .item-title {
        font-size: r(14);
        color: #666666;
        @include height(r(20));
        text-align: center;
      }
      .item-detail {
        font-size: r(12);
        color: #666666;
        span {
          display: inline-block;
          font-size: r(40);
          color: #FF4A7D;
          padding: r(8) r(2);
        }
      }
    }
  }
  .activity {
    padding: 0 r(20);
    .activity-title {
      font-size: r(18);
      color: #666666;
      @include height(r(25));
      padding: 0.14rem 0 0.05rem;
      &:before {
        content: '';
        display: inline-block;
        width: r(3);
        height: r(16);
        background: #FF4A7D;
        border-radius: r(20);
        margin: r(-2) r(5) 0 0;
      }
    }
    .activity-item {
      padding: r(10) 0;
      overflow: hidden;
      border-bottom: 1px solid #D8D8D8;
      }
      .activity-pic {
        width: r(160);
        height: r(80);
        border-radius: r(4);
        margin-right: r(10);
        float: left;
      }
      .activity-detail {
        position: relative;
        height: r(80);
        padding-left: r(170);
        &.activity-end {
          font-size: r(14);
          color: #666666;
          line-height: r(80);
        }
        .detail-title {
          font-size: r(14);
          color: #666666;
          @include height(r(20));
          .special {
            color: #FF4A7D;
          }
        }
        .activity-btn {
          display: block;
          position: absolute;
          bottom: 0;
          background: #DBDBDB;
          border-radius: r(50);
          width: r(55);
          @include height(r(20));
          text-align: center;
          font-size: r(12);
          color: #FFFFFF;
          &.act {
            background: #FF4A7D;
          }
        }
      }
    }
  }

.stacks_time_list_toggle {
  text-align: center;
  display: block;
  padding: 14px 0 13px;
  background: #FFFFFF;
  font-size: 12px;
  color: #666666;
  margin-bottom: 10px;
  div {
    span {
      font-size: 12px;
      display: inline-block;
      color: #D5D5D5;
      transform: rotate(135deg) scale(0.7);
      position: relative;
      bottom: 2px;
    }
    .top {
      transform: rotate(-45deg) scale(0.7);
      bottom: -2px;
    }
    i{
      font-style:normal;
      color:#D8D8D8;
      font-size: 10px;
    }
  }
}
</style>



