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
  /*导航*/
  .tab {
    width:100%;
    height:42px;
    background: #ffffff;
    position:relative;

  &:after {
     content: '';
     position: absolute;
     bottom:0;
     width: 200%;
     border-bottom:1px solid #dddddd;
     transform-origin: 0 0;
     transform: scale(0.5,0.5);
     box-sizing: border-box;
   }
  }
  .tab ul {
    width:auto;
    margin: 0 auto;
    padding:13px 0;
    height:16px;
    line-height: 16px;
    background: #ffffff;
    font-size: 0;
    color: #666666;
    white-space: nowrap;
  }
  .tab ul li {
    position:relative;
    display: inline-block;
    text-align: center;
    list-style: none;
    font-size: 0.14rem;
    box-sizing:border-box;
    background: #ffffff;

  &:not(:last-child):after {
     content: '';
     position: absolute;
     top: 0;
     right: 0;
     height: 200%;
     border-right:1px solid #dddddd;
     transform-origin: 0 0;
     transform: scale(0.5,0.5);
     box-sizing: border-box;
   }
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
    width:1.95rem;
    height:1.6rem;
    padding:0 0.1rem;
    vertical-align:top;

  &:after {
     content: '';
     position: absolute;
     bottom:0;
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
    height:0.3rem;
  }
  .act-name {
    display: inline-block;
    vertical-align: middle;
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
    vertical-align: middle;
    margin-right:10px;

  }
  .sale-null {
    display: inline-block;
    height:0.25rem;
    line-height: 0.26rem;
    color: #ffffff;
    font-size: 0.12rem;
    border-radius: 4px;
    padding:0 0.115rem;
    background:linear-gradient(to right, #DBDADA, #C4C4C4) ;
    text-align: center;
    margin-top: 0.1rem;
    vertical-align: middle;
  }
  .price {
    position: absolute;
    bottom:0.1rem;
  span {
    margin-right: 0.02rem;
  }
  span:first-child {
    font-size: 0.12rem;
    color: #FF4A7D;
  }
  .secFont {
    font-size: 0.16rem;
    color: #FF4A7D;
  }
  .lastFont {
    font-size: 0.12rem;
    color: #FF4A7D;
  }
  }
  }
  }

  /*li 字体颜色*/
  .active{
    color:#FF4A7D;
  }
  .top_show {
    position: fixed;
    max-width: 640px;
    right:0;
    left:0;
    margin:auto;
    top:44px;
    z-index: 9;
  }
  .noStyle{
    position: fixed;
    max-width: 640px;
    right:0;
    left:0;
    margin:auto;
    top:0px;
    z-index: 9;
  }
  .empty {
    height:42px;
    background: #ffffff;
  }
</style>

<template>
  <div>
    <div :class="{empty:empty}"></div>
    <div class="tab swiper-container" :class="{top_show:top_show,noStyle:noStyle}">
      <ul class="swiper-wrapper">
        <li class="swiper-slide" :class="{active:typeId == index}" v-for="(list,index) in dataType" @click="activeChange(index)">{{list.typeName}}</li>
      </ul>
    </div>
    <div class="listWarpper">
      <div class="list" v-for="(item,index) in dataList" @click="toGoodsOrder(item,referer)">
        <div class="list-left">
          <img :src="item.goodsImg" alt="">
        </div>
        <div class="list-right">
          <p class="title">{{item.goodsName}}</p>
          <p class="content">推荐：{{item.recommendWord}}</p>
          <div class="act-name">
            <span class="full" v-if="item.goodsLabel !='' ">{{item.goodsLabel}}</span>
            <span class="sale-null" v-if="item.saleStatus !='' ">{{item.saleStatus}}</span>
          </div>
          <p class="price">
            <span>¥</span>
            <span class="secFont">{{item.shopPrice.split('.')[0]}}</span>
            <span class="lastFont" v-if="item.shopPrice.split('.')[1] !=undefined ">{{'.'+item.shopPrice.split('.')[1]}}</span>
          </p>
        </div>
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
  import share from 'dvd-service-js-share';
  import native from 'dvd-service-js-native';
  import ua from 'dvd-base-js-ua';
  import popup from 'dvd-service-js-popup';
  import param from 'dvd-base-js-param';
//  import dialog from '../../../../utils/dialog.es6';
  import $ from 'jquery';
//  import Swiper from 'swiper';


  export default {
    data() {
      return {
        sw:null,
        dataList: [],
        dataType:[],
        referer:[],
        loading: false,
        no_more: false,
        pageIndex: 1,
        typeId:0,
        scroll: 0,
        ajaxFlag: false,
        isApp: util.utils.isApp(),
        top_show:false,
        noStyle:false,
        empty:false,
        allData:{}
      }
    },
    created(){
      //在created函数中调用ajax获取页面初始化所需的数据
      var ts = this;
      if(localStorage.getItem("newDailyData") && localStorage.getItem("newDailytypeId") && localStorage.getItem("newDailyHeight")){
        var typeId=JSON.parse(localStorage.getItem("newDailytypeId"));
        //初始化数据
        this.allData=JSON.parse(localStorage.getItem("newDailyData"));
        //滚动监听
        this.scrollListener();
        //初始化二级菜单
        if(this.allData[0].data){
          this.dealData(this.allData[0].data);
        }
//        setTimeout(function () {
//          ts.activeChange(typeId);
//        },10)
        this.$nextTick(function () {
          //DOM更新结束选中上次
          ts.activeChange(typeId);
          window.scrollTo(0,localStorage.getItem("newDailyHeight"));
        });

        //清除缓存
        localStorage.removeItem("newDailyData");
        localStorage.removeItem("newDailytypeId");
        localStorage.removeItem("newDailyHeight");
        $("body").addClass("loaded");
      }else{
        ts.getData(ts.dealData);
      }
    },
    watch: {
      // 监听res变化
      dataType() {
        this.$nextTick(function () {
          let ts = this;
          // 设置app头部标题栏
          if (ts.isApp) {
            native.custom.initHead({
              shareOnHead: 1,
            });
          }

        });
      },
      //swiper 点击向前移动导航位置
      typeId (newVal) {
        var result = this.sw.slideTo(Math.max(0,newVal-1));
      }
    },
    methods:{
      //数据处理
      dealData(data){
        var ts = this;
        //记录访问源
        ts.referer = data.referer;
        //导航初始只赋值一次
        if(ts.dataType.length == 0){
          ts.dataType = data.typeList;
          this.$nextTick(function(){
            ts.sw = new Swiper('.swiper-container', {
              slidesPerView: 4.65,
            });
          });
        }
        ts.dataList = (ts.dataList || []).concat(data.dataList);
        ts.loading = false;
      },
      //加载更多滚动事件
      scrollListener() {
        var ts = this;
        $(window).scroll(function () {
          var offset = window.pageYOffset;
          var offsetTop = document.body.scrollHeight;
          if (offsetTop - offset - window.screen.availHeight < 30) {
            if (!ts.no_more) {
              ts.loading = true;
              if (ts.ajaxFlag) return;
              ts.pageIndex = ts.pageIndex + 1;
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
            typeId: ts.typeId,
            pageIndex: ts.pageIndex
          }
        }else {
          var obj = {
            pageIndex: ts.pageIndex,
            typeId: ts.typeId
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
                //可以直接把callback 的方法放在这
                callback(res.data);
                if(ts.allData[ts.typeId]){
                  ts.allData[ts.typeId].data.dataList = ts.allData[ts.typeId].data.dataList.concat(res.data.dataList);
                  ts.allData[ts.typeId].pageIndex = ts.pageIndex;
                  ts.allData[ts.typeId].more = res.data.more
                }else{
                  ts.allData[ts.typeId] = {
                    data:res.data,
                    pageIndex:ts.pageIndex,
                    more:res.data.more
                  };
                }
                // 设置分享信息;
                share.setShareInfo({
                  title: '大V店｜每日上新',
                  desc: '多款商品最新上架，等你尝鲜~',
                  link: res.data.shareInfo.link,
                  imgUrl: 'http://9i.dvmama.com/free/newDaily/newFirstShare.jpg',
                },res);

              }
              else {

                ts.ajaxFlag = false;
                if (res.code == 0) {
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
                  //可以直接把callback 的方法放在这
                  callback(res.data);
                  if(ts.allData[ts.typeId]){
                    ts.allData[ts.typeId].data.dataList = ts.allData[ts.typeId].data.dataList.concat(res.data.dataList);
                    ts.allData[ts.typeId].pageIndex = ts.pageIndex;
                    ts.allData[ts.typeId].more = res.data.more
                  }else{
                    ts.allData[ts.typeId] = {
                      data:res.data,
                      pageIndex:ts.pageIndex,
                      more:res.data.more
                    };
                  }
                  // 设置分享信息;
                  share.setShareInfo({
                    title: '大V店｜每日上新',
                    desc: '多款商品最新上架，等你尝鲜~',
                    link: res.data.shareInfo.link,
                    imgUrl: 'http://pic.davdian.com/free/newDaily/newFirstShare.jpg',
                  },res);
                } else {
                  ts.ajaxFlag = false;
                  if (res.data.msg) {
                    dialog.alert('code:' + res.code + ":msg" + res.data.msg);
                  } else {
                    dialog.alert('code:' + res.code);
                  }
                }
              }

            } catch(e){
              console.error(e);
            }



          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      //点击导航添加颜色
      activeChange(index){
        var ts = this;
        ts.typeId = index;
        ts.dataList = [];
        ts.loading=false;
        ts.no_more=false;
        ts.pageIndex=1;
        //判断是否请求过数据
        if(ts.allData[ts.typeId]) {
          ts.dealData(ts.allData[ts.typeId].data);
          ts.pageIndex = ts.allData[ts.typeId].pageIndex;
          if (ts.allData[ts.typeId].more == "0") {
            ts.no_more = true;
          } else {
            ts.no_more = false;
          }
          return false;
        }else{
          ts.getData(ts.dealData);
        }
      },
      
      //点击跳转到商品详情
      toGoodsOrder(obj,urlTab,event) {
        localStorage.setItem("newDailyData",JSON.stringify(this.allData));
        localStorage.setItem("newDailytypeId",JSON.stringify(this.typeId));
        localStorage.setItem("newDailyHeight",JSON.stringify(window.scrollY));
        // 跳转详情更改为服务端下发command 2018-06-23 wangchunjie
        if(obj.command && obj.command.content){
          window.location.href = obj.command.content;
        }else{
          window.location.href = `/${obj.goodsId}.html?rp=${urlTab.rp}&rl=${urlTab.rl}`;
        }
      },
      //判断导航滚动距离
      getScroll() {
        let ts = this;
        ts.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        //判断是app及5.2.0版本
        if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
          if (ts.scroll >= ts.font * 0.8) {
            ts.noStyle = true;
            ts.empty = true;
          }else {
            ts.noStyle = false;
            ts.empty = false;
          }
        } else {
          if (ts.scroll >= ts.font * 0.8) {
            ts.top_show = true;
            ts.empty = true;
          } else {
            ts.top_show = false;
            ts.empty = false;
          }
        }
      },
      getFontSize() {
        var innerWidth = document.documentElement.style.fontSize;
        this.font = innerWidth.substring(0, innerWidth.length - 2);
      }
    },
    mounted() {
      let ts = this;
      ts.getFontSize();
      window.onscroll = function () {
        ts.getScroll();
      };
    },
  }
</script>
