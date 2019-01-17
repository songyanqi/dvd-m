<template>
<div v-if="response">
  <div class="mainbox">
    <div>
      <input type="text" v-model="babyName" placeholder="宝宝姓名">
    </div>
    <div>
      <input class="baby_date" type="date"  v-model="startTime.time" @change="showplaceholder = false">
      <div v-if="showplaceholder" class="date_time_desc date_time_none">宝宝生日</div>
    </div>
    <div style="padding-left: 6px;">
      <select name="sel" class="baby_sex" :class="{'clor9':(babySex == 0)}" v-model="babySex" @touchstart="sleclick" @mousedown="sleclick">
        <option v-if="babySex == 0" value="0">宝宝性别</option>
        <option value="1">王子</option>
        <option value="2">公主</option>
      </select>
    </div>
  </div>
  <div class="bottom_btn_next access" @click="saveinfo">
    保存
  </div>
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
import ua from "dvd-base-js-ua";
login.needLogin();
// 渲染页面
export default {
  data() {
    return {
      response: true,
      babyName: "",
      babySex: "0",
      startTime: {
        time: ''
      },
      babyInfo: {},
      isIos: ua.isIos(),
      showplaceholder: true
    };
  },
  components: {

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
          shareOnHead: 0, // 头部分享按钮
          btnText: ""
        });
        setTimeout(function() {
          native.custom.setHead({
            title: "宝宝资料",
            shareBtn: 0,
            rightBtn: {
              text: ""
            }
          });
        }, 200);
      });
    }
  },
  created() {
    let ts = this;
    if (document.body.className.indexOf('loaded') === -1) {
      document.body.className += ' loaded';
    }
    // 获取信息
    ts.getinfo();
  },
  methods: {
    // 输出日期
    handleDate(item) {
      console.log(item);
    },
    /**
     * 接口名称:
     * 接口文档:
     */
    getinfo() {
      let ts = this;
      //  请求宝宝数据
      $.ajax({
        url: "/api/mg/good/vipbook/babyInfo?_=" + Date.now(),
        type: "post",
        dataType: "json",
        data: encrypt.ajax({}),
        success(response) {
          if (response.code == "0") {
            ts.babyName = response.data.babyName;
            if (response.data.babyBirthday != '') {
              ts.startTime.time = (response.data.babyBirthday).replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, '');
              ts.showplaceholder = false;
            } else {
              let d = new Date();
              let months2 = (d.getMonth()+1);
              let dates2 = (d.getDate());
              let str2 = d.getFullYear() + "-" + (months2 > 9 ? months2 : '0' + months2) + "-" + (dates2 > 9 ? dates2 : '0' + dates2);
              ts.startTime.time = str2;
              ts.showplaceholder = true;
            }
            ts.babySex = response.data.babySex;
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    saveinfo() {
      let ts = this;
      if (ts.babyName == "") {
        popup.toast("请填写宝宝姓名~");
        return false;
      }
      if (ts.babyBirthday == "") {
        popup.toast("请选择宝宝生日~");
        return false;
      }
      if (ts.babySex == "0") {
        popup.toast("请选择宝宝性别~");
        return false;
      }
      let str = ts.startTime.time.replace(/-/g, '/');
      let date = new Date(str);
      $.ajax({
        url: "/api/mg/good/vipbook/babySave?_=" + Date.now(),
        type: "post",
        dataType: "json",
        data: encrypt.ajax({
          "babyName": ts.babyName,
          "babySex": ts.babySex,
          "babyBirthday": (date.getTime()) / 1000
        }),
        success(response) {
          if (response.code == "0") {
            location.href = "/book_stacks_new.html";
          } else {
            popup.toast(response.data.msg);
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    sleclick() {
      let ts = this;
      if (ts.babySex == 0) {
        ts.babySex = 1
      }
    },
    datechange() {
      let ts = this;
      setTimeout(function() {
        let d = new Date();
        let months = (d.getMonth() + 1);
        let dates = (d.getDate() + 1);
        let str = d.getFullYear() + "-" + (months > 9 ? months : '0' + months) + "-" + (dates > 9 ? dates : '0' + dates);
        ts.startTime.time = str;
        $(".baby_date").val(str);
        $(".baby_date").click();
      }, 200)
    }
  }
};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
.mainbox {
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  >div {
    padding: 12px 10px;
    border-bottom: 1px solid #E1E1E1;
    position: relative;
    input {
      width: 90%;
      border: none;
    }
    .date_time_desc {
      position: absolute;
      background: #FFFFFF;
      height: 100%;
      top: 0;
      line-height: 45px;
      color: #999999;
      width: 80%;
    }
    .date_time_none {
      pointer-events: none;
    }
  }
  .baby_date {
    width: 100%;
    background: none;
  }
}

// input::-webkit-input-placeholder,
// textarea::-webkit-input-placeholder {
// color: #333;
// }
// input:-moz-placeholder,
// textarea:-moz-placeholder {
//   color: #333;
// }
// input::-moz-placeholder,
// textarea::-moz-placeholder {
//   color: #333;
// }
// input:-ms-input-placeholder,
// textarea:-ms-input-placeholder {
//   color: #333;
// }
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

.baby_sex {
  width: 100%;
  background: none;
  border: none;
}

.clor9 {
  color: #999 !important;
}
</style>

<style>
body {
  background: #FFFFFF;
}
</style>
