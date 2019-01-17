<template>
<div>
  <div v-if="response">
    <!-- 旧选书规则部分 -->
    <section v-if="response.type == 1">
      <!-- 未选书的放最前边显示 -->
      <div class="stacks_time_list now_can">
        <div v-for="(books,index) in response.history_list" :key="index" v-if="nowmonth == books.month_date" class="title">
          <a v-if="books.fetch_status == 2" href="/book_stacks_new.html" class="btns">
            <span class="name">{{books.month_date}}的书可以领取了</span>
            <span class="more">
              <span class="base-color">选书<img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow"></span>
            </span>
          </a>
          <a :href="books.url" v-else class="btns">
            <span class="name">{{books.month_date}}的书已领取</span>
            <span class="more">
              <span class="base-color">查看订单<img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow"></span>
            </span>
          </a>
        </div>
      </div>
      <div class="stacked_time">
        <div>还可领取
          <span>{{response.left_count}}</span>次，获得
          <span>{{response.left_count_books}}</span>本书</div>
        <div>已领取{{response.already_count}}次，获得了{{response.already_count_books}}本书 </div>
        <div>
          <a href="/class_detail-13208.html">活动规则</a>
          <a style="margin-right: 20px;" href="/book_stacks_new.html?stack_list">最新书单</a>
        </div>
      </div>
      <div class="stacks_time_list" :style="style_list">
        <!-- 标题 -->
        <div class="achievement">
          <div class="activity">
            <p class="activity-title">领取详情</p>
          </div>
        </div>

        <div v-for="(books,index) in response.history_list" :key="index" class="title">
          <a v-if="books.fetch_status == 2 || books.fetch_status == 3" :href="books.fetch_status == 2 ? '/book_stacks_new.html' : books.url" class="btns">
            <span class="name">{{books.month_date}}</span>
            <span class="more">
              <span :class="{'base-color':books.fetch_status == 2}">{{["","","选书","已领取",""][books.fetch_status]}}
                <img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow">
              </span>
            </span>
          </a>
          <span v-if="books.fetch_status == 1 || books.fetch_status == 4" :href="books.url" class="btns">
            <span class="name">{{books.month_date}}</span>
          <span class="more">
              <span :class="{'base-color':books.fetch_status == 2}">{{["","已超过领取日期","","","未到领取日期"][books.fetch_status]}}
              </span>
          </span>
          </span>
        </div>
      </div>
      <!-- 展开收起 -->
      <div class="stacks_time_list_toggle" @click="list_long_t">
        <div v-if="!list_long">展开
          <span>◥</span>
        </div>
        <div v-else>收起
          <span class="top">◥</span>
        </div>
      </div>
    </section>
    <!-- 新选书规则部分（季度） -->
    <section v-if="response.type == 2">
      <!-- 未选书的放最前边显示 -->
      <div v-if="response.head_fetch.year" class="stacks_time_list now_can">
        <div class="title">
          <a :href="response.head_fetch.url" class="btns">
            <span class="name">{{response.head_fetch.year}}年{{response.head_fetch.seq}}季度的书可以领取了</span>
            <span class="more">
              <span class="base-color">选书<img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow"></span>
            </span>
          </a>
        </div>
      </div>
      <div class="stacked_time">
        <div>还可领取
          <span>{{response.fetch_detail.fetch_quarter_left}}</span>次，获得
          <span>{{response.fetch_detail.fetch_total_left}}</span>本书</div>
        <div>已领取{{response.fetch_detail.fetch_quarter}}季度，获得了{{response.fetch_detail.fetch_total}}本书 </div>
        <div>
          <a href="/class_detail-13208.html">活动规则</a>
          <a style="margin-right: 20px;" href="/book_stacks_new.html?stack_list">最新书单</a>
        </div>
      </div>
      <div class="stacks_time_list2">
        <!-- 标题 -->
        <div class="achievement">
          <div class="activity">
            <p class="activity-title">领取详情</p>
          </div>
        </div>

        <div v-for="(seqs,index) in response.list" :key="index" class="title">
          <div class="name">
            <span>{{seqs.year}}年 季度{{seqs.seq}}</span> <br>
            <span>{{['','1月1日 - 3月31日','4月1日 - 6月30日','7月1日 - 9月30日','10月1日 - 12月31日'][seqs.seq]}}</span>
          </div>

          <div class="more" :class="{'quarter_now':seqs.detail.length == 1}">

            <a v-for="(seqleft,i) in seqs.detail" :key="i" :class="{'quarter_pre':seqs.detail.length>1}" :href="seqleft.url ? seqleft.url : 'javascript:void(0)'">
              <span v-if="seqs.detail.length> 1">
                <span v-if="seqleft.need_fetch == 0" :class="{'base-color':seqleft.fetch_status == 2}">
                  <span v-if="seqleft.fetch_status == 2">选书</span>
                  <span v-else>{{seqleft.fetch_time}}领取了{{seqleft.fetch_number}}本</span>
                  <img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow">
                </span>
                <span v-if="seqleft.need_fetch == 1" class="base-color">还可补领{{seqleft.fetch_left}}本
                  <img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow">
                </span>
              </span>
              <div v-if="seqs.detail.length == 1" :class="{'base-color':seqleft.fetch_status == 2 || seqleft.need_fetch == 1}">
                <span v-if="seqleft.need_fetch == 1">可补领{{seqleft.fetch_left}}本</span>
                <span v-else>{{['','已超过领取日期','选书','已领取','未到领取日期'][seqleft.fetch_status]}}</span>
                <img v-if="seqleft.fetch_status == 2 || seqleft.fetch_status == 3 || seqleft.need_fetch == 1" src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow">
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 打卡活动 -->
  <achievement></achievement>
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
import login from "dvd-service-js-login";
import share from "dvd-service-js-share";
import ua from "dvd-base-js-ua";
import tj from "dvd-service-js-tj";
import param from "dvd-base-js-param";
sessionStorage.setItem("isdetail", 0);
login.needLogin({
  success: function() {
    if (location.href.indexOf("rp=bookstore_index") !== -1) {
      setTimeout(function() {
        native.Browser.close();
      }, 500);
    } else {
      location.reload();
    }
  },
  error: function() {
    if (location.href.indexOf("rp=bookstore_index") !== -1) {
      setTimeout(function() {
        native.Browser.close();
      }, 500);
    } else {
      location.reload();
    }
  }
});

function hrefs() {
  location.href = "/index.php?c=ShopGoods&a=index&id=623534";
}
window.hrefs = hrefs;
var urldata = param.getAll();
// 渲染页面
export default {
  data() {
    return {
      response: null,
      list_long: false,
      style_list: "height:160px;"
    };
  },
  computed: {
    nowmonth: function() {
      let d = new Date();
      let months = d.getMonth() + 1;
      let str =
        d.getFullYear() + "年" + (months > 9 ? months : "0" + months) + "月";
      return str;
    }
  },
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;
        // 设置app头部标题栏
        native.custom.initHead({
          showHead: 1, // 是否展示头部
          backOnHead: 1, // 头部返回按钮
          btnText: "邀请好友",
          btnLink: "/index.php?c=ShopGoods&a=index&id=623534"
        });
        setTimeout(function() {
          native.custom.setHead({
            title: "我的小书库",
            rightBtn: {
              text: "邀请好友",
              action: "window.hrefs()"
            }
          });
        }, 500);
        try {
          share.setShareInfo({
            shareSource:22,
            title: "小书库，孩子的阅读解决方案",
            desc: "加入大V店，一年选24本经典童书，让孩子爱上阅读",
            imgUrl: "http://9i.dvmama.com/free/2017/12/27/2501_2501_9263c7beaf5ca679a1df7b075d958c31.jpg?x-oss-process=image/resize,m_lfit,h_200,w_200",
            link: location.origin + "/index.php?c=ShopGoods&a=index&id=623534"
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  created() {
    let ts = this;
    // 如果没有登录就不再往下走
    if (login.isLogined()) {
      ts.getData();
    }
  },
  components: {
    achievement: require("./card_achievement.vue").default
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let ts = this;
      $.ajax({
        url: "/index.php?c=NewVipBooks&a=vip_book_success_ajax",
        type: "post",
        dataType: "json",
        data: {
          is_ajax: 1,
          rl: urldata.rl || "",
          rp: urldata.rp || ""
        },
        success(response) {
          if (response.code == "0") {
            ts.response = response.data;
            if (!localStorage.getItem("alertdil")) {
              if (response.data.time && response.data.time / 60 < 5) {
                popup.alert({
                  title: "选书成功",
                  text: "我们会尽快为您发货"
                });
                localStorage.setItem("alertdil", 1);
              }
            }
          } else if (response.code == "1") {
            location.replace(response.url);
          } else {
            popup.toast(response.msg || response.data.msg || '数据异常');
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    list_long_t() {
      let ts = this;
      ts.list_long = !ts.list_long;
      if (ts.list_long) {
        ts.style_list =
          "height:" + (ts.response.history_list.length * 61 + 38) + "px";
      } else {
        ts.style_list = "height:122px;";
      }
    }
  }
};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
.in_app .top0 {
  display: none;
}

.stacks_time_list {
  // height: 112px;
  overflow: hidden;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}

.stacks_time_list.tops {
  height: auto;
}

.stacks_time_list .title {
  background: white;
  margin-bottom: 1px;
  height: 60px;
  overflow: hidden;
}

.stacks_time_list .title .btns {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  padding: 23px 20px;
}

.stacks_time_list .title .btns .name {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: block;
  font-size: 14px;
  text-align: left;
}

.stacks_time_list .title .btns .more {
  font-size: 12px;
  color: #999;
}

.stacks_time_list .title .btns .more .arrow {
  position: relative;
  height: 14px;
  top: 3px;
}

.base-color {
  color: #ff4a7d;
}

.stacked_time {
  /* width: 100%; */
  background: #ffffff;
  padding: 10px 20px;
  margin-bottom: 10px;
}

.stacked_time div:nth-of-type(1) {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
}

.stacked_time div:nth-of-type(2) {
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #999999;
}

.stacked_time div:nth-of-type(3) {
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #999999;
}

.stacked_time div a {
  display: inline-block;
  float: right;
  text-decoration: underline;
}

.stacked_time div span {
  color: #ff4a7d;
}

.go_home {
  height: 35px;
  display: block;
  width: 100px;
  max-width: 640px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #ff5b5b;
  color: #ff5b5b;
  border-radius: 4px;
  margin: 10px auto;
}

.go_home a {
  color: #ff5b5b;
}

.stacks_time_list_toggle {
  text-align: center;
  padding: 14px 0 13px;
  background: #ffffff;
  font-size: 12px;
  color: #333333;
  margin-bottom: 10px;
  div {
    span {
      font-size: 12px;
      display: inline-block;
      color: #d5d5d5;
      transform: rotate(135deg) scale(0.7);
      position: relative;
      bottom: 2px;
    }
    .top {
      transform: rotate(-45deg) scale(0.7);
      bottom: -2px;
    }
  }
}

.stacks_time_list.now_can {
  .title {
    background: rgb(255, 249, 251);
    height: 44px;
    margin-bottom: 0;
    .btns {
      padding: 14px 20px;
    }
  }
}

.achievement {
  .activity {
    padding: 0 0.2rem;
    background: #fff;
    .activity-title {
      font-size: 0.18rem;
      color: #666666;
      height: 0.25rem;
      line-height: 0.25rem;
      padding: 0.14rem 0 0.05rem;
    }
    .activity-title::before {
      content: "";
      display: inline-block;
      width: 0.03rem;
      height: 0.16rem;
      background: #ff4a7d;
      border-radius: 0.2rem;
      margin: -0.02rem 0.05rem 0 0;
    }
  }
}

.stacks_time_list2 {
  margin-bottom: 10px;
  .title {
    height: auto;
    min-height: 60px;
    background: white;
    position: relative;
    overflow: hidden;
    .name {
      position: absolute;
      height: 28px;
      top: 0;
      bottom: 0;
      left: 20px;
      margin: auto;
      span:nth-of-type(1) {
        font-size: 14px;
        color: #333333;
        height: 14px;
        line-height: 14px;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: #999999;
        height: 12px;
        line-height: 12px;
      }
    }
    .more {
      font-size: 12px;
      color: #999;
      float: right;
      text-align: right;
      padding-left: 20px;
      display: block;
      .quarter_pre {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 13px 20px 13px;
        display: block;
      }
      .quarter_pre:not(:last-child) {
        border-bottom: 1px solid rgba(195, 195, 195, 0.17);
      }
      .arrow {
        position: relative;
        height: 14px;
        top: 3px;
      }
    }
    .quarter_now {
      height: 60px;
      line-height: 60px;
      padding-right: 20px;
    }
  }
  .title:not(:last-child) {
    border-bottom: 1px solid rgba(195, 195, 195, 0.17);
  }
}

.base-color {
  color: #ff4a7d;
}
</style>
