<template>
<div v-if="response">
  <div class="order_list_container">
    <div v-if="stack_list" class="book_stack_ind">《小书库》是由大V店推出的一款亲子阅读产品，精选孩子成长中必读的经典童书，致力于让孩子爱上阅读，让大人与孩子享受亲子阅读的乐趣，订购后（365/年），连续12个月可以从大V店APP的小书库里，任意选取3本经典童书，全年可领取36本，包邮到家，现在订购，还送大V店永久会员1个。<span style="color:#ff4a7d;">温馨提示：提交选书订单成功后，10个工作日发货。</span></div>
    <div class="order_list_switcher dav-shadow">
      <div v-for="(names,index) in response.data.dataList" :key="names" :class="{'selected':table_select == index}" @click="select_table(index)" class="switcher_item">
        <span>{{names.book_stacks_name}}</span>
        <div class="tableitem_string">
        </div>
      </div>
    </div>
    <div v-for="(goods,index) in response.data.dataList" :key="goods" v-if="table_select == index" class="goods_list">
      <div v-for="(item,num) in goods.book_stacks_list" :key="item" class="goods_items">
        <span v-if='!stack_list'>
            <div v-if="item.goodsStock > 0" class="select_check" :class="{'selected':item.selected&&item.selected == true}" @click="select_book(index,num,item.goodsId)"></div>
            <span v-else>
              <div class="select_check border_grey"></div>
              <div class="select_check_no_stock">暂无货</div>
            </span>
        </span>
        <a :href="item.command.content">
          <div class="goods_img">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="goods_desc" :class="{'left100':stack_list}">
            <p>{{item.title}}</p>
            <p>{{item.recomWord}}</p>
            <p><span><em class="price_symbol">￥</em><span>{{item.shopPrice}}</span></span>
            </p>
          </div>
        </a>
      </div>
    </div>
    <!-- 书单将会持续 -->
    <div class="bottom_tip">书单将会持续更新，敬请期待</div>
  </div>
  <div v-if='!stack_list' class="bottom_btn_next" @click="nexts" :class="{'access':selected_ids.length == 3}">下一步（{{selected_ids.length}}/3）</div>
  <a v-if='stack_list' @click="tj_more" href="/index.php?c=ShopGoods&a=index&id=623534" class="bottom_btn_next access">了解更多</a>
</div>
</template>

<script>

// 基础模块
import common from "dvd-service-js-common";
// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from "js-cookie";
// 业务模块
let axios = require("axios");
require("es6-promise").polyfill();
import encrypt from "dvd-service-js-encrypt";
import popup from "dvd-service-js-popup";
import native from "dvd-service-js-native";
import login from "dvd-service-js-login";
import share from "dvd-service-js-share";
import tj from "dvd-service-js-tj";
/*判断是否是列表页*/
if (location.href.indexOf("stack_list") > 0) {
  var stack_list = true;
  /*如果是列表页，判断是否是分享过来的*/
  if (location.href.indexOf("share") > 0) {
    var shares = true;
    // 埋点 分享也浏览数据
    try {
      tj.send({
        production: 23,
        action: 1,
        action_type: 6
      });
    } catch (error) {
      console.log(error);
    }
  }
} else {
  login.needLogin();
}
// 渲染页面
export default {
  data() {
    return {
      response: null,
      table_select: 0,
      selected_ids: [],
      stack_list: stack_list || false,
      shares: shares || false
    };
  },
  computed: {},
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;
        // 设置app头部标题栏
        native.custom.initHead({
          showHead: 1, // 是否展示头部
          backOnHead: 1, // 头部返回按钮
          shareOnHead: 1, // 头部分享按钮
          btnText: ""
        });
        setTimeout(function() {
          native.custom.setHead({
            title: "小书库",
            shareBtn: 1,
            rightBtn: {
              text: ""
            }
          });
        }, 200);
        try {
          share.setShareInfo({
            title: "小书库",
            desc: "一天一块钱，让孩子爱上阅读",
            imgUrl: "http://9i.dvmama.com/free/2017/10/30/xiaoshuku_share_title.jpeg?x-oss-process=image/resize,m_lfit,h_200,w_200",
            link: location.origin + "/book_stacks.html?stack_list&share"
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  created() {
    // 暂时直接跳转到新的小书库页
    this.getData();
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let ts = this;
      if (ts.stack_list) {
        var sdata = {
          stack_list: 1
        };
      } else {
        var sdata = {};
      }
      $.ajax({
        url: "/api/mg/good/vipbook/vipBooksList?_=" + Date.now(),
        type: "post",
        dataType: "json",
        data: encrypt.ajax(sdata),
        success(response) {
          if (response.code == "0") {
            ts.response = response;
          } else if (response.code == "1") {
            location.href = response.data.url;
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    /**
     * 切换年龄段table
     */
    select_table(index) {
      let ts = this;
      if (ts.table_select != index) {
        ts.table_select = index;
      }
    },
    /**
     * 选中图书
     */
    select_book(index, num, id) {
      let ts = this;
      if (!ts.response.data.dataList[index].book_stacks_list[num].selected) {
        if (ts.selected_ids.length > 2) {
          popup.toast("每月只能领三本书哦");
          return false;
        }
        ts.$set(
          ts.response.data.dataList[index].book_stacks_list[num],
          "selected",
          true
        );
        ts.selected_ids.push(id);
      } else {
        ts.$set(
          ts.response.data.dataList[index].book_stacks_list[num],
          "selected",
          false
        );
        ts.removeByValue(ts.selected_ids, id);
      }
    },
    /**@param
     * 下一步
     * */
    nexts() {
      let ts = this;
      if (ts.selected_ids.length < 3) {
        return false;
      } else {
        location.href =
          "/book_check_info.html?book_ids=" + ts.selected_ids.join(",");
      }
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    tj_more() {
      // 埋点 了解更多
      try {
        tj.send({
          production: 23,
          action: 1,
          action_type: 5
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
.order_list_container .order_list_switcher {
  background-color: #fff;
  font-size: 0;
  display: table;
  width: 100%;
  /* position: fixed; */
  z-index: 10;
  top: 0;
  max-width: 640px;
}

.order_list_container .order_list_switcher:after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid #e1e1e1;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.order_list_container .order_list_switcher .switcher_item {
  /*line-height: 38px;*/
  line-height: 14px;
  padding: 14px 0;
  text-align: center;
  font-size: 14px;
  border: none;
  display: table-cell;
  width: 33.333%;
  position: relative;
  .tableitem_string {
    width: 1px;
    height: 28px;
    background: #d8d8d8;
    position: absolute;
    right: 0;
    top: 8px;
    transform: scaleX(0.5);
  }
}

.order_list_container .order_list_switcher .switcher_item:nth-last-of-type(1) .tableitem_string {
  background: #ffffff;
}

.order_list_container .order_list_switcher .switcher_item.selected {
  color: #ff4a7d;
  border-bottom: 2px solid #ff4a7d;
}

.order_list_container .order_list_item {
  background-color: #fff;
  margin-top: 10px;
}

.order_list_container .order_good_list {
  padding: 14px 76px 14px 10px;
  display: block;
  border-bottom: #f1f1f1 solid 1px;
  background-color: #fff;
}

.order_delivery_container .order_good_list {
  padding: 14px 62px 14px 0;
  display: block;
  border-bottom: #f1f1f1 solid 1px;
  background-color: #fff;
}

.order_list_container .margin44 {
  top: 44px;
}

.goods_list {
  padding-top: 13px;
}

.goods_items {
  margin: 0 15px 20px;
  height: 85px;
  position: relative;
  div {
    float: left;
  }
  .select_check {
    width: 30px;
    height: 30px;
    margin: 26px 10px 0 0;
    border: 1px solid #ff9289;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .select_check.border_grey {
    border-color: #e1e0e0;
  }
  .select_check.selected {
    background-image: url("//9i.dvmama.com/free/2017/10/27/stacks_select.png");
    background-size: 100%;
    background-position: 0 0;
    border-color: #ffffff;
  }
  .goods_img {
    width: 85px;
    height: 85px;
    img {
      width: 85px;
      height: 85px;
    }
  }
  .goods_desc {
    position: absolute;
    left: 135px;
    top: 0;
    right: 0;
    bottom: 0;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-line;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      span {
        height: 28px;
        line-height: 28px;
        color: #ff4a7d;
        margin-top: 6px;
        em {
          font-size: 14px;
          font-style: normal;
        }
        span {
          font-size: 18px;
        }
      }
    }
    p:nth-of-type(1) {
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font-size: 13px;
      color: #333333;
      height: 36px;
      line-height: 18px;
      margin: 4px 0 5px;
    }
    p:nth-of-type(2) {
      -webkit-line-clamp: 1;
      line-clamp: 1;
      font-size: 12px;
      color: #999999;
      height: 12px;
      line-height: 12px;
    }
  }
  .goods_desc.left100 {
    left: 100px;
  }
}

.bottom_tip {
  font-size: 12px;
  color: #999999;
  text-align: center;
  padding: 10px 0 80px;
}

.bottom_btn_next {
  width: 100%;
  height: 50px;
  position: fixed;
  display: block;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 640px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  line-height: 50px;
  background: -webkit-linear-gradient(left, #c0c0c0, #999999);
  background: -webkit-gradient(linear, left, right, from(#c0c0c0), to(#999999));
  background: -webkit-linear-gradient(left, #c0c0c0, #999999);
  background: linear-gradient(to right, #c0c0c0, #999999);
}

.bottom_btn_next.access {
  background: -webkit-linear-gradient(left, #ff613c, #fa1862);
  background: -webkit-gradient(linear, left, right, from(#ff613c), to(#fa1862));
  background: -webkit-linear-gradient(left, #ff613c, #fa1862);
  background: linear-gradient(to right, #ff613c, #fa1862);
}

.select_check_no_stock {
  position: absolute;
  bottom: 10px;
  left: -3px;
  font-size: 12px;
  color: #999999;
}

.book_stack_ind {
  padding: 10px;
  font-size: 12px;
  color: #999999;
  line-height: 15px;
}
</style>

<style>
body {
  background: #ffffff;
}

body .app {
  overflow: inherit;
}
</style>



