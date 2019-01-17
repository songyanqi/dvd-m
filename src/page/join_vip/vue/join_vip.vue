<template>
  <div >
    <div class="pic">
      <img v-for="n in 12" :src="'https://9i.dvmama.com/free/xxk01.png?x-oss-process=image/indexcrop,y_500,i_'+(n-1)" alt="">
      <img :src="ac" v-if="ac"/>
      <img src="https://9i.dvmama.com/free/xxk03.png" alt="">
    </div>
    <div class="share129" v-if="response">
      <div class="left_text">{{response.data.userName}}</div>
      <div class="share_text">为您推荐</div>
    </div>
    <div class="footer_btn" @click="join">
      <div class="btn btn4">
        ￥99 <span style="text-decoration:line-through;">￥299</span>立即激活学习卡
      </div>
    </div>
  </div>
</template>

<script>
import popup from "dvd-service-js-popup";
import login from "dvd-service-js-login";  import $ from 'jquery';


export default {
  data() {
    return { ac: null };
  },
  props: ["card","response"],
  created() {
    // 获取首屏数据
    this.getData();

    if(location.href.indexOf("pay=1")>-1){
      this.join();
    }
  },
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData(){
      let ts = this;
      // 取缓存
      /*let response = cache.getItem('/[[project]]/join_vip_success');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/
      // 调接口
      $.ajax({
        cache: false,
        async: true,
        url: '/t-20027.html?_=' + Date.now(),
        type: 'get',
        dataType: 'json',
        success(response) {
          ts.ac = response.url;
        },
        error(error) {

        }
      });
    },
    join() {
      // 没有卡号直接跳出
      if (!this.card) {
        popup.alert({ text: "异常链接" });
        return;
      }

      let that = this, payUrl = `/index.php?c=ShopGoods&a=ajax_do`, // 支付url
        payFunction = function() {
          $.ajax({
            url:payUrl,
            dataType: "json",
            type: "POST",
            data: {
              goods_id: 348,
              code: 0,
              user_code: 0,
              study_card:that.card
            },
            success: function(result) {
              if (result.errcode === 0 || result.errcode === 100204 || result.errcode === 100205) {
                location.href = result.data.url;
              } else {
                popup.toast(result.errmsg);
              }
            }
          });
        };
      if (login.isLogined()) {
        payFunction();
      } else {
        login.login({url:location.href+"&pay=1"});
      }
    }
  }
};
</script>

<style>
.footer_btn {
  height: 50px;
  font-size: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 640px;
}
.btn {
  height: 100%;
  display: block;
  float: left;
  vertical-align: top;
}
.btn4 {
  max-width: 640px;
  box-sizing: border-box;
  padding: 18px;
  line-height: 22px;
  text-align: center;
  font-size: 15px;
  background: -webkit-linear-gradient(left, #ff5b5b, #fa1862);
  color: #fff;
  width: 100%;
}
.pic {
  font-size: 0;
}
.pic img{
    max-width: 640px;
    width: 100%;
  }

.share129 {
    width: 3.55rem;
    background: #FFFFFF;
    height: 35px;
    margin-left: 0.1rem;
    position: fixed;
    z-index: 1;
    bottom: 55px;
    border-radius: 4px;
    font-size: 0;
}

.share129>div {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    height: 100%;
    line-height: 35px;
}

.share_text {
    margin-left: 5px;
    color: #FC345F;
}

.share129 img {
    height: 25px;
    width: 25px;
    margin-left: 10px;
    margin-top: 5px;
    margin-right: 10px;
}

.left_text {
    margin-left: 10px;
    color: #333333;
}
</style>
