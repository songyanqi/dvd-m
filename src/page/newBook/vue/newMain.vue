<style lang="sass" lang="scss" rel="stylesheet/scss">
  .no_more {
    margin-top: 0.1rem;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
  .no_moreStyle {
    bottom:0;
    width:100%;
    height:44px;
    line-height: 44px;
    background: #f1f1f1;
  }
  .listWarpper {
    background: #ffffff;
  }
  .list {
    padding:0.1rem 0 0.1rem 0.1rem;
    padding-bottom: 0;
    font-size:0;
    .list-left {
      display: inline-block;
      box-sizing: border-box;
      width:1.5rem;
      height:1.5rem;
      background: #ffffff;
    img {
      display: block;
      height:1.35rem;
      margin:0.1rem auto 0;
    }
  }
  .list-right {
    position:relative;
    display: inline-block;
    box-sizing: border-box;
    width:1.95rem;
    height:1.6rem;
    padding:0 0.1rem;
    vertical-align:top;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 200%;
      border-bottom:1px solid #dddddd;
      transform-origin: 0 0;
      transform: scale(0.5,0.5);
      box-sizing: border-box;
    }
      .title {
        font-size: 0.14rem;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding-top: 0.08rem;
        line-height: 0.18rem;
      }
      .content {
        font-size: 0.12rem;
        color: #999999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top:0.1rem;
        line-height: .16rem;
      }
      .full {
        display: inline-block;
        height:0.25rem;
        line-height: 0.26rem;
        color: #FF4A7D;
        border:1px solid #FF4A7D;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 0.12rem;
        padding:0 0.105rem;
        margin-top: 0.1rem;
      }
      .sale-null {
        display: inline-block;
        height:0.25rem;
        line-height: 0.26rem;
        color: #ffffff;
        font-size: 0.12rem;
        border-radius: 4px;
        padding:0 0.2rem;
        background:linear-gradient(to right, #DBDADA, #C4C4C4) ;
        text-align: center;
        margin-top: 0.1rem;
      }
      .price {
        position: absolute;
        bottom:0.1rem;
        span {
          margin-right: 0.02rem;
        }
        span:first-child {
          font-size: 0.14rem;
          color: #FF4A7D;
        }
        .secFont {
          font-size: 0.16rem;
          color: #FF4A7D;
        }
        .lastFont {
          font-size: 0.14rem;
          color: #FF4A7D;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="listWarpper">
      <div class="list" v-for="(item,index) in dataList" @click="toGoodsOrder(item,referer)">
        <div class="list-left">
          <img :src="item.goodsImg" alt="">
        </div>
        <div class="list-right">
          <p class="title">{{item.goodsName}}</p>
          <p class="content">推荐：{{item.recommendWord}}</p>
          <div>
            <span class="full" v-if="item.goodsLabel !='' ">{{item.goodsLabel}}</span>
            <span class="sale-null" v-if="item.saleStatus !='' ">{{item.saleStatus}}</span>
          </div>
          <p class="price">
            <span>¥</span>
            <span class="secFont">{{item.shopPrice.split('.')[0]}}</span>
            <span class="lastFont" v-if="item.shopPrice.split('.')[1] !=undefined ">{{'.'+item.shopPrice.split('.')[1]}}</span>
          </p>
        </div>
        <div></div>
      </div>
    </div>
    <!--分页效果图-->
    <div v-show="loading" class="no_more">
      正在加载更多数据 <img src="//9i.dvmama.com/free/loading_03252.svg">
    </div>
    <div v-show="no_more" class="no_more no_moreStyle">
      <span>已经到底啦</span>
    </div>
  </div>
</template>

<script>
  import encrypt from 'dvd-service-js-encrypt';
  import util from "../../../common/js/utils.es6";
  import popup from 'dvd-service-js-popup';
  import native from 'dvd-service-js-native';
  import share from 'dvd-service-js-share';
  import param from 'dvd-base-js-param';
//  import dialog from '../../../../utils/dialog.es6'
  import $ from 'jquery';

  export default {
    data() {
      return {
        dataList: [],
        referer:[],
        loading: false,
        no_more: false,
        pageIndex: 1,
        ajaxFlag: false,
        isApp: util.utils.isApp()
      }
    },
    created() {
      var ts = this;
      ts.getData(ts.dealData);
    },
    watch: {
      // 监听res变化
      dataList() {
        // res变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          //设置缓存记录位置
          if (ts.isApp) {
            native.custom.initHead({
              shareOnHead: 1,
            });
          }

        });
      }
    },
    methods:{
      //数据处理
      dealData(data){
        var ts = this;
        ts.referer = data.referer;
        ts.dataList = (ts.dataList || []).concat(data.dataList);
        ts.loading = false;
      },
      //加载更多滚动事件
      scrollListener() {
        var ts = this;
        $(window).scroll(function () {//滚动条滚动事件
          var offset = window.pageYOffset;
          var offsetTop = document.body.scrollHeight;
          if (offsetTop - offset - window.screen.availHeight < 30) {//整个页面的高度-滚动条滚动的高度-返回当前屏幕高度
            if (!ts.no_more) {
              ts.loading = true;
              if (ts.ajaxFlag) return;
              ts.getData(ts.dealData);
            }
          }
        })
      },
      //初始化获取数据接口
      getData(callback) {
        let ts = this;
        let preview = param.get('preview', window.location.href);
        ts.ajaxFlag = true;
        //判断URl上是否存在preview=20171109
        if(preview){
          var obj = {
            preview: preview,
            pageIndex: ts.pageIndex
          }
        }else {
          var obj = {
            pageIndex: ts.pageIndex
          }
        }
        $.ajax({
          cache: false,
          async: true,
          url: '/sale/api/newColumn/getNewDailyList?_=' + Date.now(),
          type: 'post',
          data: encrypt.ajax(
            obj
          ),
          dataType: 'json',
          success(res) {
            try{
              ts.ajaxFlag = false;
              if (res.code == 0) {
                //page页码 ++
                ts.pageIndex += 1;
                //数据返回来的不够请求的
                if (res.data.more == "0") {
                  ts.no_more = true;
                } else {
                  ts.no_more = false;
                }
                //调用监听滚动函数
                if (!ts.no_more) {
                  ts.scrollListener();
                }
                ts.loading = false;

                // 设置分享信息
                share.setShareInfo({
                  title: '大V店｜新书上架，充实孩子的小书库',
                  desc: '给孩子超棒的阅读体验~',
                  link: res.data.shareInfo.link,
                  imgUrl: 'http://9i.dvmama.com/free/newDaily/newBookShare.jpg',
                },res);

                //可以直接把callback 的方法放在这
                callback(res.data); //res.data 相当于dealData里面的data
              } else {
                ts.ajaxFlag = false;
//                if (res.data.msg) {
//                  dialog.alert('code:' + res.code + ":msg" + res.data.msg);
//                } else {
//                  dialog.alert('code:' + res.code);
//                }
              }
            } catch (err) {
              console.error(err);
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },

      //点击跳转到商品详情
      toGoodsOrder(obj,urlTab) {
        // 跳转详情更改为服务端下发command 2018-06-23 wangchunjie
        if(obj.command && obj.command.content){
          window.location.href = obj.command.content;
        }else{
          window.location.href = `/${obj.goodsId}.html?rp=${urlTab.rp}&rl=${urlTab.rl}`;
        }
      }
    }
  }
</script>
