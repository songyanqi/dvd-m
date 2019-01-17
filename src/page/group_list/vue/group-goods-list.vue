<!--团购列表-->
<template>
  <div class="wrapper" v-if="response">
    <template v-if="list.length > 0">
      <ul class="group-goods-list">
        <li v-for="data in list">
          <a @click="listItemClick(data.command.content, $event)">
            <div class="pic">
              <img v-lazy="data.imgUrl">
              <div class="sold-out" v-if="parseInt(data.goodsStock) <= 0">
                <p class="top">售罄</p>
                <div class="split-line"></div>
                <p class="bottom">SOLD OUT</p>
              </div>
              <div class="box-info">
                <div class="num">{{data.pepoleNumber}}人团</div>
                <div class="privilege">省{{data.discount}}元</div>
              </div>
            </div>
            <div class="desc">{{data.goodsName}}</div>
            <div class="info">
            <span class="left-info">
              <div class="top">
                <span class="group-price">¥<span class="num">{{data.goodsPrice}}</span></span>
                <span class="income" v-if="response.visitor_status == '3' && data.sellerIncome">
                    会员返: ¥ {{data.sellerIncome}}
                  <span class="times" v-if="data.radioIncome && data.radioIncome != '0'">*{{data.radioIncome}}倍</span>
                </span>
                <span class="post" v-for="item in data.actLabels">{{item}}</span>
              </div>
              <div class="bottom">
                <span class="price">单价买: ￥{{data.realShopPrice}}</span>
              </div>
            </span>
              <span class="go-group">
              <span>去组团</span>
              <i class="arrow"></i>
            </span>
            </div>
          </a>
        </li>
      </ul>

      <!--列表加载结束-->
      <div class="no-more" v-if="response && response.data.reverseGroup.more == '0'">没有更多啦!</div>
    </template>

    <template v-if="list.length == 0">
      <!--没有任何组团-->
      <div class="no-goods">
        <a class="a" href="/">暂无组团,去首页看看</a>
      </div>
    </template>
  </div>
</template>

<script>
  import encrypt from 'dvd-service-js-encrypt';
  import native from 'dvd-service-js-native';
  import ua from 'dvd-base-js-ua';
  import $ from 'jquery';
  import hybrid from 'dvd-service-js-hybrid';
  import popup from 'dvd-service-js-popup';

  export default {
    components: {},
    props: {
      propResponse: {
        type: Object,
        default: null
      }
    },
    data: function () {
      return {
        ajaxing: false,
        response: null,
        list: [],
        popup,
      }
    },
    computed: {},
    created: function () {
      if (this.propResponse) {
        this.response = this.propResponse;
        this.list = this.list.concat(this.response.data.reverseGroup.dataList);
      } else {
        this.getData();
      }
    },
    mounted: function () {

    },
    methods: {
      getData() {
        // 已经结尾,不要再调接口
        if (this.response && this.response.data.reverseGroup.more == '0') return;
        // 正在请求接口中,不要再调接口
        if (this.ajaxing) return;
        this.ajaxing = true;
        // 获取数据
        let ts = this;
        hybrid.Network.request({
          cache: false,
          async: true,
          url: '/api/mg/sale/reverse/getList?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: {
            pageIndex: ts.response ? ts.response.data.reverseGroup.nextPageIndex : 0,
            pageSize: 10,
            reverseType: 1,
          },
          success(response) {
            ts.ajaxing = false;
            ts.response = response;
            ts.list = ts.list.concat(ts.response.data.reverseGroup.dataList);
            popup.loading(false);
          },
          error(err) {
            ts.ajaxing = false;

          }
        })
      },
      listItemClick(url, event) {
        event.preventDefault();
        if (ua.isDvdApp()) {
          location.href = url
        } else if (ua.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      }
    },
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  // 页面红色部分
  $red: #FF4A7D;
  // 团购列表
  .wrapper {
    .group-goods-list {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-top: r(10);
        padding: r(10);
        background: #fff;
        cursor: pointer;
        a {
          color: inherit;
          text-decoration: none;
        }
        .pic {
          position: relative;
          text-align: center;
          font-size: 0;
          > img {
            height: r(150);
          }
          .sold-out {
            @include center;
            @include circle(r(90));
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 0;
            line-height: 1;
            text-align: center;
            transform: scale(0.7);
            .top {
              position: absolute;
              top: r(22);
              width: 100%;
              font-size: r(18);
            }
            .split-line {
              margin: r(50) auto;
              width: r(70);
              border-top: 1px solid white;
              transform: translateY(0.5);
            }
            .bottom {
              position: absolute;
              top: r(58);
              width: 100%;
              font-size: r(12);
            }
          }
          .box-info {
            position: absolute;
            bottom: 0;
            left: 0;
            display: inline-block;
            border: 1px solid $red;
            border-top-left-radius: r(04);
            border-top-right-radius: r(04);
            font-size: r(12);
            .num {
              color: $red;
            }
            .privilege {
              padding: 0 r(02);
              background: $red;
              color: #fff;
              min-width: r(50);
            }
          }
        }
        .desc {
          margin-top: r(10);
          font-size: r(14);
          @include ellipsis(2);
        }
        .info {
          position: relative;
          margin-top: r(10);
          .left-info {
            display: inline-block;
            font-size: 0;
            .top {
              > * {
                vertical-align: middle;
              }
              .group-price {
                position: relative;
                top: r(1);
                margin-right: r(04);
                color: $red;
                font-size: r(13);
                .num {
                  margin-left: r(04);
                  font-size: r(18);
                  font-weight: bold;
                }
              }
              .income {
                font-size: r(12);
                color: #666666;
                .times {
                  margin-left: r(04);
                  color: $red;
                }
              }
              .post {
                display: inline-block;
                position: relative;
                top: r(-0.5);
                margin-left: r(-14);
                padding: 0 r(06) * 2;
                @include height(r(14) * 2);
                border: 1px solid $red;
                border-radius: r(07) * 2;
                color: $red;
                font-size: r(10) * 2;
                transform: scale(0.5);
              }
            }
            .bottom {
              margin-top: r(1);
              .price {
                color: #999999;
                font-size: r(12);
              }
            }
          }
          .go-group {
            position: absolute;
            right: r(2);
            bottom: r(6);
            box-sizing: border-box;
            padding-left: r(05);
            width: r(86);
            @include height(r(32));
            color: #fff;
            float: right;
            text-align: center;
            border-radius: r(16);
            font-size: 0;
            background: linear-gradient(to right, #F9535A, #FA1862);
            > * {
              vertical-align: middle;
              font-size: r(14);
            }
            span {
              display: inline-block;
              height: r(32);
              line-height: r(33);
            }
            .arrow {
              display: inline-block;
              width: r(16);
              height: r(16);
              border-bottom: 2px solid #fff;
              border-right: 2px solid #fff;
              transform: rotate(-45deg) scale(.5);
            }
          }
        }
      }
    }

    // 加载结束提示
    .no-more {
      text-align: center;
      padding: r(20);
      font-size: r(12);
      color: #666;
    }
  }
</style>
