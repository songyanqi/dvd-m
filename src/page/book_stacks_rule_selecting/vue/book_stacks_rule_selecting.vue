<template>
<div v-if="response">
  <p class="top_dec">自3月1日起，小书库童书可按照季度领取了。您可<span class="base-color">一次性</span>选择适合自己的领书方式：</p>
  <div class="rule_box">
    <div class="box_left">
      <div>按月领书</div>
      <div>保持旧规则不变：<br> 一年领{{response.data.number*12}}本童书，每月领{{response.data.number}}本，不可跨月领取
      </div>
    </div>
    <div class="box_right" :class="{'active':check_num == 1}" @click="checked(1)"></div>
  </div>
  <div class="rule_box" style="margin-top:20px;">
    <div class="box_left">
      <div>按季领书</div>
      <div>新规则：<br> 一年领{{response.data.number*12}}本童书，每季度领取{{response.data.number*3}}本，不可跨季度领取</div>
      <div>2017年第四季度应共计领取9本书，您可于2018年3月31日前补领该季度剩余童书。</div>
      <div><a href="/class_detail-13208.html">详细规则</a></div>
    </div>
    <div class="box_right" :class="{'active':check_num == 2}" @click="checked(2)"></div>
  </div>
  <div class="confirmz" @click="confirmz">确认</div>
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
login.needLogin();
// 渲染页面
export default {
  data() {
    return {
      response: true,
      check_num: 2
    };
  },
  created() {
    this.getData()
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let ts = this;
      $.ajax({
        url: "/index.php?c=NewVipBooks&a=set_type",
        type: "post",
        dataType: "json",
        data: encrypt.ajax({}),
        success(response) {
          if(response.code == 0){
            ts.response = response;
          }else{
            popup.confirm({
              title:response.msg,
              okBtnCallback: function() {
                location.href = "/book_stacks_my.html";
              }
            })
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    checked(num) {
      let ts = this;
      if (ts.check_num === 0) {
        ts.check_num = num;
      } else {
        if (ts.check_num == num) {
          ts.check_num = 0;
        } else {
          ts.check_num = num;
        }
      }
    },
    confirmz() {
      let ts = this;
      if (ts.check_num == 0) {
        popup.toast("请选择领取方式")
      } else {
        popup.confirm({
          title: '确定选择' + (ts.check_num == 1 ? "<span class='base-color'>“按月领书”</span>" : "<span class='base-color'>“按季领书”</span>") + '领取规则？一旦确认，便不可更改',
          cancelBtnTitle: '取消',
          okBtnCallback: function() {
            //发送请求并跳转
            $.ajax({
              url: "/index.php?c=NewVipBooks&a=set_type",
              type: "post",
              dataType: "json",
              data: encrypt.ajax({select_type:ts.check_num}),
              success(response) {
                if(response.code == 0){
                  location.href = "/book_stacks_my.html";
                }else{
                  popup.toast(response.msg);
                }
              },
              error(error) {
                console.error("ajax error:" + error.status + " " + error.statusText);
              }
            });
          },
          cancelBtnCallback: function() { // 取消按钮点击回调（有则执行该回调）

          }
        })
      }
    }
  }
};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
.top_dec {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  width: 89.3%;
  margin: 13px auto;
}

.rule_box {
  width: 81.3%;
  min-height: 50px;
  margin: 10px auto;
  position: relative;
  .box_left {
    margin-right: 45px;
    position: relative;
    box-shadow: 0 4px 8px rgba(255, 177, 177, .3);
    div:nth-of-type(1) {
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      color: #FF2F7C;
      padding: 10px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      line-height: 20px;
      color: #666666;
      padding: 0 10px 10px 10px;
    }
    div:nth-of-type(3) {
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      padding: 0 10px 10px 10px;
    }
    div:nth-of-type(4) {
      text-decoration: underline;
      font-size: 12px;
      color: #999999;
      padding: 10px;
      position: relative;
      z-index: 2;
    }
  }
  .box_left::after {
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FF4A7D solid 1px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 8px;
  }
  .box_right {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid #FF4A7D;
    box-sizing: border-box;
  }
  .box_right.active {
    border: none;
    background-image: url("//9i.dvmama.com/free/2018/02/25/selected.png");
    background-position: 0 0;
    background-size: 100%;
  }
}

.confirmz {
  width: 120px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
  color: #FF4A7D;
  position: relative;
  margin: 49px auto;
}

.confirmz::after {
  content: "";
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
  width: 200%;
  height: 200%;
  border: #ff4a7d solid 1px;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  border-radius: 50px;
}
</style>

<style>
body,
html {
  background: #FFF;
}

.base-color {
  color: #FF2F7C;
}
</style>

