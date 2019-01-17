<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";
  .clearfix::after {
    display: block;
    clear: both;
    content: "";
  }
  .com_reward_nav {
   .swiper-container {
      // margin:r(-35) 0 0;
      background: linear-gradient(to bottom, #be4bef, #7d14e9);
      background: -moz-linear-gradient(bottom, #be4bef, #7d14e9);
      background: -o-linear-gradient(bottom, #be4bef, #7d14e9);
      background: -webkit-linear-gradient(top, #be4bef, #7d14e9);
      .swiper-slide {
        // width:r(75);
        width:33.3%;
      }
    }
    .item-start {
      font-size: 0.16rem;
    }
    .item {
      height:r(50);
      background: linear-gradient(to bottom, #be4bef, #7d14e9);
      background: -moz-linear-gradient(bottom, #be4bef, #7d14e9);
      background: -o-linear-gradient(bottom, #be4bef, #7d14e9);
      background: -webkit-linear-gradient(top, #be4bef, #7d14e9);
      color:#fff;
      text-align:center;
      font-size:r(10);

      .item-timer {
        font-size:r(16);
        padding:r(5) 0;
      }
      &.selected {
        // color:#ff467a;
        // background-color:#fff;
        background: linear-gradient(to bottom, #fc59c2, #ea1d48);
        background: -moz-linear-gradient(bottom, #fc59c2, #ea1d48);
        background: -o-linear-gradient(bottom, #fc59c2, #ea1d48);
        background: -webkit-linear-gradient(top, #fc59c2, #ea1d48);
      }
    }
    .reward_list {
      position: relative;
      .act_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
      }
      .reward_img {
        position: relative;
        flex: 2;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        img {
          width: 100%;
          vertical-align: middle;
        }
        .reward_hot_icon {
          position: absolute;
          top: 0.05rem;
          display: inline-block;
          background: url(//9i.dvmama.com/free/1111/newo/act_1111_hots.png) no-repeat;
          background-size: 0.4rem 0.35rem;
          width: 0.4rem;
          height: 0.35rem;
        }
      }
    }
    .reward_left {
      flex: 3;
      padding: 0.15rem 0;
      padding-left: 0.1rem;
    }
    .reward_l_navs {
      background: #fff;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding: 0 0.1rem;
      margin: 0.05rem 0;
      .reward_title {
        position: relative;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        font-size: 0.14rem;
        color: #333;
        text-overflow: ellipsis;
        white-space: pre-line;
        // height: 36px;
        line-height: 0.16rem;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        margin-bottom: 0.1rem;
      }
      .reward_m:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid #eee;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        -webkit-transform-origin: left top;
        transform-origin: left top;
      }
      .reward_m {
        position: relative;
        padding: 0.13rem 0;
        .reward_final_p {
          font-size: 0.16rem;
          color: #f5475c;
          font-weight: bold;
        }
        .reward_shop_p {
          font-size: 0.12rem;
          color: #a2a2a2;
          text-decoration: line-through;
        }
      }
      .reward_num {
        color: #6f6f6f;
        font-size: 0.13rem;
        padding-bottom: 0.15rem;
        .reward_n_t {
          color: #f5475c;
        }
      }
      .reward_btn_cont {
        text-align: right;
      }
      .reward_btn {
        background: linear-gradient(to bottom, #FF5B5B, #FA1862);
        background: -moz-linear-gradient(bottom, #FF5B5B, #FA1862);
        background: -o-linear-gradient(bottom, #FF5B5B, #FA1862);
        background: -webkit-linear-gradient(top, #FF5B5B, #FA1862);
        border-radius: 0.15rem;
        font-size: 0.12rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        padding: 0.05rem 0.1rem;
        line-height: 0.14rem;
      }
    }
    .reward_not_navs {
      background: #df3899;
      padding-top: 1px;
      padding-bottom: 1px;
    }
    .reward_hot_navs {
      padding: 0.05rem;
      padding-bottom: 0;
      margin-top: -1px;
      box-sizing: border-box;
      background: linear-gradient(to bottom, #df3899, #a90dd4);
      background: -moz-linear-gradient(bottom, #df3899, #a90dd4);
      background: -o-linear-gradient(bottom, #df3899, #a90dd4);
      background: -webkit-linear-gradient(top, #df3899, #a90dd4);
      .bookList {
        float: left;
        width: 1.72rem;
        background: #fff;
        border-radius: 0.05rem;
        margin: 0.05rem 0.045rem;
        overflow: hidden;
      }
      .bookImg {
        position: relative;
        width: 100%;
        // height: 1.74rem;
        img {
          width: 100%;
        }
        .reward_goods_icon {
          position: absolute;
          top: 0.05rem;
          left: 0.05rem;
          width: 0.4rem;
          height: 0.35rem;
          background: url(//9i.dvmama.com/free/1111/newo/act_1111_goods_icon.png) no-repeat;
          background-size: 0.4rem 0.35rem;
        }
      }
      .reward_hot_num {
        color: #6f6f6f;
        font-size: 0.13rem;
        padding-bottom: 0.1rem;
        .reward_hot_n_t {
          color: #f5475c;
        }
      }
      .reward_hot_btn {
        background: -webkit-gradient(linear, left top, left bottom, from(#FF5B5B), to(#FA1862));
        background: linear-gradient(to bottom, #FF5B5B, #FA1862);
        background: -webkit-linear-gradient(top, #FF5B5B, #FA1862);
        border-radius: 0.15rem;
        font-size: 0.12rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        padding: 0.05rem 0.1rem;
        line-height: 0.14rem;
      }
      .reward_hot_btnCont {
        text-align: center;
      }
      .advancePrice {
        text-align: center;
        color: #f5475c;
        font-size: 0.13rem;
        // margin-top: 0.1rem;
        font-weight: bold;
      }
      .reward_hot_num {
        text-align: center;
      }
      .reward_hot_btn {
        margin: 0.1rem 0;
      }
    }
    .maskCont {
      position: fixed;
      width: 100%;
      z-index: 10;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      img {
        width: 100%;
      }
      .maskClose {
        display: inline-block;
        position: absolute;
        width: 0.6rem;
        bottom: 22%;
        left: 42%;
        height: 0.6rem;
        // border: 1px solid red;
      }
      .maskOpenMem {
        display: inline-block;
        position: absolute;
        width: 1.5rem;
        bottom: 33%;
        left: 30%;
        height: 0.6rem;
        // border: 1px solid red;
      }
      .maskOverNum {
        position: absolute;
        top: 46%;
        width: 100%;
        left: 0;
        text-align: center;
        color: #fff;
        line-height: 0.18rem;
      }
    }
    .good_list_sell_out {
      font-size: 0.15rem;
      color: #fff;
      background-color: rgba(0,0,0,.7);
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      line-height: 0.6rem;
      top: 50%;
      position: absolute;
      z-index: 1;
      left: 50%;
      margin-top: -0.3rem;
      margin-left: -0.3rem;
      text-align: center;
    }
    .brandList_title {
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    //我的预定奖励
    .prize-head {
      padding: r(10);
      background: linear-gradient(to right, #FF6389, #FF3857); /* 标准的语法 */

      .total-prize {
        text-align:center;
        height: r(41);
        line-height:r(50);
        color: #fff;
        font-size: r(14);
        padding-bottom: r(15);

        .money-icon {
          font-size: r(18);
        }
        .prize-detail {
          font-size: r(24);
        }
      }

      .prize-tip {
        padding:r(10);
        background-color:rgba(255,255,255,.2);
        position:relative;
        border-radius:r(4);
        box-sizing:border-box;

        &:after {
          content:'';
          position:absolute;
          top:0;
          left:0;
          height:200%;
          width:200%;
          border:1px solid rgba(255,255,255,.4);
          transform-origin:0 0;
          transform:scale(0.5,0.5);
          border-radius:r(8);
          box-sizing:border-box;
        }

        .tip-title {
          font-size:r(14);
          @include height(r(20));
          color:#fff;
          text-align:center;
          padding-bottom:r(7);
        }

        .tip-detail {
          li {
            font-size:r(12);
            color:#fff;
            line-height:r(17);

            span {
              display:inline-block;
              padding-left:r(12);
            }
          }
          li:not(:last-child) {
            padding-bottom:r(5);
          }
        }
      }
    }
    .brandList_rule {
      font-size: 0.14rem;
      color: #fff;
      text-align: center;
      padding-top: 0.1rem;
    }
    // #a90dd4
    .brandList-color {
      background: #a90dd4;
    }
  }
</style>

<template>
  <div class = "com_reward_nav">
  <!--  -->
    <img style = "display: none;" src="//9i.dvmama.com/free/1111/newo/maskMem_icon.png">
    <img style = "display: none;" src="//9i.dvmama.com/free/1111/newo/mask.png">
    <div class = "brandList_title">
      <img src="//9i.dvmama.com/free/1111/card/mamaComeon.jpg">
    </div>
    <div class="prize-head">
      <div class="prize-tip">
        <p class="tip-title">活动玩法</p>
        <ul class="tip-detail">
          <li>1、仅会员可发起爆品/品牌的加油活动，可同时发起多个活动；</li>
          <li>2、邀请好友（会员/非会员）加油，加油金额随机；</li>
          <li>3、每个加油活动最多加油100次；</li>
          <li>4、双11当天购买对应爆品/品牌（订单参与品牌的促销活动），加油金额才会以返现的形式到账；</li>
          <li>5、加油金额将统一在11月25日24点之前返现到账。</li>
        </ul>
      </div>
      <div @click = "handleBrandListRule" class = "brandList_rule">详细规则>>></div>
    </div>
    <!-- 列表 -->
    <div class = "reward_list">
      <!-- 爆品 -->
      <div class = "reward_not_navs">
        <div class = "reward_l_navs" v-if = "hotGoodsList" v-for = "(item,index) of hotGoodsList" :key = "index" @click = "handleReward(item,index)">
          <div class = "reward_img">
            <span class = "reward_hot_icon"></span>
            <img v-lazy="item.image">
            <div v-if = "isFuture" class = "good_list_sell_out ng-scope">
              <div class = "ng-scope">未开始</div>
            </div>
          </div>
          <div class = "reward_left">
            <div class = "reward_title">{{ item.name }}</div>
            <div class = "reward_m">
              <span class = "reward_final_p">到手价：¥{{ item.activityPrice }}</span>
              <span class = "reward_shop_p">¥{{ item.goodsPrice }}</span>
            </div>
            <div class = "reward_num" v-if = "item.activityNumber == '0'">没有发起加油名额啦</div>
            <div v-else class = "reward_num">仅剩<span class = "reward_n_t">{{ item.activityNumber }}</span>个发起加油名额</div>
            <div class = "reward_btn_cont">
              <div class = "reward_btn">{{ item.activityButton }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class = "reward_hot_navs clearfix">
        <div class = "bookList" v-if = "brandList" v-for = "(item,index) of brandList" @click = "handleGoodsList(item,index)">
          <div class = "bookImg">
            <span class = "reward_goods_icon"></span>
            <img v-lazy = "item.image">
            <div v-if = "isFuture" class = "good_list_sell_out ng-scope">
              <div class = "ng-scope">未开始</div>
            </div>
          </div>
          <div class = "advancePrice">{{ item.activityPrice }}</div>
          <div class = "reward_hot_btnCont"><span class = "reward_hot_btn">{{ item.activityButton }}</span></div>
          <div class = "reward_hot_num" v-if = "item.activityNumber == '0'">没有发起加油名额啦</div>
          <div v-else class = "reward_hot_num">仅剩<span class = "reward_hot_n_t">{{ item.activityNumber }}</span>个加油名额</div>
        </div>
      </div>
    </div>
    <div class = "brandList_title brandList-color">
      <img src="//9i.dvmama.com/free/1111/card/3451510040467_.pic_hd.jpg">
    </div>
    <!-- 开通会员的萌层 -->
    <div @touchmove = "handlePrevent($event)" class = "maskCont" v-if = "isShowMem">
      <span @click = "handleClose" class = "maskClose"></span>
      <span @click = "handlerOpenMem" class = "maskOpenMem"></span>
      <img src="//9i.dvmama.com/free/1111/newo/maskMem_icon.png">
    </div>
    <!-- 超过总数量 -->
    <div @touchmove = "handlePrevent($event)" class = "maskCont" v-if = "isSumMask">
      <div class = "maskOverNum">
        <div>不能邀请好友加油啦</div>
        <div>此发起加油活动数量为{{ totalNum }}个</div>
        <div>已经超过{{ totalNum }}个啦</div>
      </div>
      <span @click = "handleClose" class = "maskClose"></span>
      <img src="//9i.dvmama.com/free/1111/newo/mask.png">
    </div>
  </div>
</template>

<script>
// 基础模块
import common from 'dvd-service-js-common';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import localCache from 'dvd-base-js-cache';
import login from 'dvd-service-js-login';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import date from 'dvd-base-js-date';
import popup from 'dvd-service-js-popup';
import $ from 'jquery';

  export default {
    data() {
      return {
        brandList: [],
        hotGoodsList: [],
        currentIdx: 0,
        dataNav: [],
        swiper: null,
        isapp: false,
        isShowMem: false,
        isSumMask: false,
        // 每个商品可邀请的总数
        totalNum: 0,
        // 是否显示未开始
        isFuture: false,
        // 数量
        countNum: [],
        response: null,
      }
    },
    props: [],
    created() {
    	this.getData();
    },
    mounted() {

    },
    watch: {
      response: {
        handler(newObj,oldObj) {
          this.$nextTick(() => {
            // 设置app头部标题栏
            native.custom.initHead({
              shareOnHead: 1,
            });

            // 设置app头部标题栏
            native.custom.setHead({
              title: document.title,
              homeBtn: '1',
              shareBtn: '0',
            });

            share.setShareInfo({
              title: "好妈妈加油，购物得返现",
              desc: "邀请好友加油，双11当天购物得返现",
              link: location.href,
              imgUrl: 'http://9i.dvmama.com/free/1111/newp/reward_share_icon.jpg',
            });
          })
        },
        deep: true,
      }
    },
    methods: {
      handlePrevent(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      //时间转换
      changeDate(date) {
        if (date) {
          date = new Date(Number(date));

          let year = date.getFullYear(),
              month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
              dates = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
              hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
              minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

          return `${year}-${month}-${dates}`;
        }
      },
      compare(array) {
        var i = 0, len = array.length,
              j, d;
        for(var i = 0; i<len; i++){
          for(j=0; j<len; j++){
            if(array[i] < array[j]){
              d = array[j];
              array[j] = array[i];
              array[i] = d;
            }
          }
        }
        return array;
      },
    	getData(res) {
        let that = this;
        let url  = "/api/mg/sale/usercheerbuy/getCheerList";
        $.ajax({
          cache: false,
          async: true,
          url: url,
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            js_wx_info: 1,
          }),
          success(res) {
            common.checkRedirect(res);
            that.response = res;
            if (res.code == '0') {
              res.data.map((item,index) => {
                if (item.cheerType == '1' || item.cheerType == '3') {
                 that.brandList.push(item);
                } else {
                  that.hotGoodsList.push(item);
                }

              });
            } else {
              popup.toast(res.data.msg);
            }
          },
          error(err) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        })
        /*that.dataList = [];
        that.dataNav = Object.keys(res.data.cheer);
        that.compare(that.dataNav);
        let sys_time = that.response.sys_time*1000;

        that.dataNav.map((item,index) => {
          if (that.changeDate(sys_time) == item) {
            that.currentIdx = index;
            this.isFuture = false;
          }
          let objArr = {
            times: '',
            goodsList: {
              goods: [],
              hotGoods: []
            },
          };
          objArr.times = item;
          res.data.cheer[item].map((item,index) => {
            if (item.cheerType == '1' || item.cheerType == '3') {
              objArr.goodsList.goods.push(item);
            } else {
              objArr.goodsList.hotGoods.push(item);
            }
          })
          that.dataList.push(objArr);
        });*/
    	},
      // swiperSlideClick(item,index) {
      //   if (new Date(this.response.sys_time*1000).getDate() < new Date(item.times).getDate()) {
      //     this.isFuture = true;
      //   } else {
      //     this.isFuture = false;
      //   }
      //   this.currentIdx = index;
      // },
      isApp() {
        let u = navigator.userAgent;

        return !!u.match(/davdian|bravetime|vyohui/);
      },
      // 是否为mobile
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      // 跳转方式
      handleJump(url) {
        this.isapp = this.isApp();
        if (this.isapp) {
          event.preventDefault();
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
      handleReward(item,index) {
        this.totalNum = item.totalNumber;
        // login.needLogin();
        if (!login.isLogined()) {
          login.goLoginPage();
          return true;
        }
        // if (this.isFuture) {
        //   popup.toast('不在活动时间范围内～');
        //   return;
        // }
        if (this.response.visitor_status != '3') {
          this.isShowMem = true;
          return;
        }
        if(item.buttonType == '1') {
          if (item.activityNumber == '0') {
            this.isSumMask = true;
            return;
          }
        }
        this.handleJump(`${item.activityLink}&cheerId=${item.cheerId}`);
      },

      handleGoodsList(item, index) {
        this.totalNum = item.totalNumber;
        // login.needLogin();
        if (!login.isLogined()) {
          login.goLoginPage();
          return true;
        }
        // if (this.isFuture) {
        //   popup.toast('不在活动时间范围内～');
        //   return;
        // }
        if (this.response.visitor_status != '3') {
          this.isShowMem = true;
          return;
        }
        if(item.buttonType == '1') {
          if (item.activityNumber == '0') {
            this.isSumMask = true;
            return;
          }
        }
        this.handleJump(`${item.activityLink}&cheerId=${item.cheerId}`);
      },
      handleClose() {
        this.isShowMem = false;
        this.isSumMask = false;
      },
      // 开通会员
      handlerOpenMem() {
        this.handleJump('/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button');
      },
      handleBrandListRule() {
        this.handleJump('/t-15513.html');
      }
    },
  }
</script>
