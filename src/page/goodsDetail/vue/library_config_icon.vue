<template>
  <div class="library_config_icons">
    <img v-on:click="addLibrary" src="//9i.dvmama.com/free/2018/08/24/library_icon2.png">
    <a :href="library.topic_url"></a>
    <div v-on:click="addLibrary" class="library_num">{{library.num}}</div>
  </div>
</template>

<!--组件定义-->
<script>
import $ from 'jquery';
import Vue from 'vue';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import login from 'dvd-service-js-login';
export default {
  props: ['library', 'goodid', 'img'],
  data: function() {
    return { show: true };
  },
  methods: {

    // 加入借阅馆
    addLibrary() {
      let that = this;
      login.needLogin();
      popup.loading(true);
      $.ajax({
        url: '/api/mg/sale/library/addToCart',
        type: 'POST',
        dataType: 'JSON',
        data: encrypt.ajax({ goods_ids: [that.goodid] }),
        success: data => {
          if (+data.code === 0) {
            that.addCartAnimate();
            Vue.set(that.library, 'num', +that.library.num + 1);
          } else if (+data.code === 22000 || +data.code === 22008) {
            popup.alert({ title: '提示', text: data.data.msg });
          } else {
            popup.toast(data.msg || data.data.msg);
          }
          popup.loading(false);
        },
        error: error => {
          popup.loading(false);
          popup.toast(error.message, 3000);
        }
      });
    },

    // 加入借阅馆配置动画
    addCartAnimate() {
      let imgUrl = this.img,
        goodsImg = $('<img class = "hideImg" src = ' + imgUrl + '>');
      $('body').append(goodsImg);
      $('.hideImg').animate(
        {
          width: '5px',
          height: '5px',
          bottom: '1rem',
          left: '0.28rem',
          'margin-left': '0px'
        },
        800,
        () => {
          goodsImg.remove();
        }
      );
    }
  },
  filters: {},
  computed: {},
  watch: {},
  mounted: function() {}
};
</script>


<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
.library_config_icons {
  width: 100%;
  height: 0;
  position: fixed;
  bottom: 0.6rem;
  max-width: 640rem;
}
.library_config_icons {
  img {
    position: fixed;
    width: 0.44rem;
    margin-left: 0.05rem;
    z-index: 5;
    bottom: 0.6rem;
  }
  a {
    position: fixed;
    display: block;
    width: 0.44rem;
    height: 0.44rem;
    margin-left: 0.05rem;
    z-index: 6;
    bottom: 0.6rem;
  }
  .library_num {
    position: fixed;
    display: inline-block;
    height: 0.15rem;
    line-height: 0.15rem;
    margin-left: 0.32rem;
    z-index: 6;
    bottom: 1.42rem;
    background: #ff5454;
    color: #fff;
    padding: 0.03rem;
    border-radius: 50%;
    font-size: 0.1rem;
    min-width: 0.15rem;
    border: 0.01rem solid #fff;
    text-align: center;
  }
}
</style>
<style>
.dvd-service-com-go-page-top {
  width: 100%;
  height: 0;
  position: fixed;
  bottom: 0.6rem;
  max-width: 640rem;
}
</style>

