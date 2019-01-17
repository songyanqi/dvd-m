<style lang="sass" lang="scss" rel="stylesheet/scss">
  .no_more {
    margin-top: 0.1rem;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }

  .no_moreStyle {
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #f1f1f1;

  }

  .listWarpper {
    background: #ffffff;
  }

  .list {
    display: block;
    padding: 0.1rem 0 0.1rem 0.1rem;
    padding-bottom: 0;
    font-size: 0;
    .list-left {
      position: relative;
      display: inline-block;
      width: .95rem;
      height: .95rem;
      background: url([[static]]/page/bookList/img/book-border.png?v=1.0) no-repeat;
      background-size: 100%;
      .goods-pic {
        display: block;
        width: .9rem;
        height: .9rem;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          border: 1px solid #D4D4D4;
          transform-origin: 0 0;
          transform: scale(0.5, 0.5);
          box-sizing: border-box;
        }
      }
    }
    .pos-icon {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      left: 0;
      top: 0;
      img {
        display: block;
        width: 100%;
        height: 100%;
        max-width: 100%;
      }
    }

    .list-right {
      position: relative;
      display: inline-block;
      width: 2.5rem;
      height: 1.05rem;
      padding: 0 0.1rem;
      vertical-align: top;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        border-bottom: 1px solid #dddddd;
        transform-origin: 0 0;
        transform: scale(0.5, 0.5);
        box-sizing: border-box;
      }
      .title {
        font-size: 0.14rem;
        line-height: 0.18rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .message {
        margin-top: .08rem;
        height: .2rem;
        line-height: .2rem;
        white-space: nowrap;
        .message-left {
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          font-size: 0;
          color: #999999;
          .pic {
            display: inline-block;
            width: .15rem;
            height: .15rem;
            border-radius: 50%;
            vertical-align: middle;
            img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              max-width: 100%;
            }
          }
          .message-name {
            max-width: 1.12rem;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.12rem;
            vertical-align: middle;
            margin-left: .03rem;
            height: 0.2rem;
          }
        }
        .message-right {
          display: inline-block;
          font-size: 0.12rem;
          margin-left: .1rem;
          vertical-align: middle;
          color: #999999;
        }
      }
      .message-num {
        position: absolute;
        bottom: .1rem;
        font-size: 0.12rem;
        color: #999999;
        font-size: 0;
        span {
          display: inline-block;
          max-width: 1rem;
          font-size: .12rem;
        }
        span:first-child {
          padding-right: 10px;
        }
        span:last-child {
          text-align: left;
          padding-left: 10px;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 200%;
            border-left: 1px solid #dddddd;
            transform-origin: 0 0;
            transform: scale(0.5, 0.5);
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>

<template>

  <div class="listWarpper">
    <!-- v-for="(list,index) in dataList" -->
    <a :href="list.linkTo" class="list" :key="index" v-for="(item,index) in dataList">
      <div class="list-left">
        <div class="goods-pic"><img :src="list.image" alt=""></div>
        <div class="pos-icon" v-if="list.newFlg == 1">
          <img src="//9i.dvmama.com/free/newDaily/new_02.png" alt="">
        </div>
      </div>
      <div class="list-right">
        <p class="title">{{list.title}}</p>
        <div class="message">
          <div class="message-left">
            <div class="pic">
              <img :src='list.mamaHead' alt="">
            </div>
            <div class="message-name">{{list.mamaName}}</div>
          </div>
          <div class="message-right">更新于{{list.upTime}}</div>
        </div>
        <div class="message-num">
          <span v-if="list.readTimes !== '' ">阅读{{list.readTimes}}</span>
          <span v-if="list.shareTimes !== '' ">转发{{list.shareTimes}}</span>
        </div>
      </div>
    </a>

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
  import layout from '../../index/module/index/layout.es6';
  import util from "../../../common/js/utils.es6";
  import popup from 'dvd-service-js-popup';
  import param from 'dvd-base-js-param';
  //  import dialog from '../../../../utils/dialog.es6'
  import native from "dvd-service-js-native";
  import share from 'dvd-service-js-share';
  import $ from 'jquery';
  export default {
    data() {
      return {
        dataList: [],
        loading: false,
        no_more: false,
        pageIndex: 1,
        ajaxFlag: false,
        isApp: util.utils.isApp(),
      }
    },
    watch: {
      // 监听dataList变化
      dataList() {
        // dataList变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置app头部标题栏
          if (ts.isApp) {
            native.custom.initHead({
              shareOnHead: 1,
            });
          }
          // 设置分享信息
          share.setShareInfo({
            title: '大V店｜精选书单：只为充实宝贝的精神世界！',
            desc: '有了这份书单，妈妈再也不用到处找好书了~',
            link: location.href,
            imgUrl: 'http://9i.dvmama.com/free/newDaily/bookListShare.jpg',
          });
        });
      }
    },
    created() {
      var ts = this;
      this.getData(function (data) {
        ts.dataList = (ts.dataList || []).concat(data.bookList);
        ts.loading = false;
      });

    },
    methods: {
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
              ts.getData(function (data) {
                ts.dataList = (ts.dataList || []).concat(data.bookList);
                ts.loading = false;
              });
            }
          }
        })
      },
      //初始化获取数据接口
      getData(callback) {
        let ts = this;
        ts.ajaxFlag = true;
        $.ajax({
          cache: false,
          async: true,
          url: '/sale/api/newColumn/getWellChosenBook?_=' + Date.now(),
          type: 'post',
          data: layout.strSign('orders', {
            pageIndex: ts.pageIndex
          }),
          dataType: 'json',
          success(dataList) {
            try {
              ts.ajaxFlag = false;
              if (dataList.code == 0) {
                //page页码 ++
                ts.pageIndex += 1;
                //数据返回来的不够请求的
                if (!dataList.data.bookList.length || dataList.data.bookList.length < 10 || dataList.data.more == "0") {
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
                callback(dataList.data);
              } else {
                ts.ajaxFlag = false;
                if (dataList.data.msg) {
//                  dialog.alert('code:' + dataList.code + ":msg" + dataList.data.msg);
                  popup.alert({
                    className: '',    // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
                    title: '',        // 标题（支持传入html。有则显示。）
                    text: 'code:' + dataList.code + ":msg" + dataList.data.msg,         // 文本（支持传入html。有则显示。）
                    btnTitle: '',     // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                    okBtnCallback() {   // 按钮点击回调（有则执行该回调）

                    },
                    cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                    cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）

                    }
                  });
                } else {
//                  dialog.alert('code:' + dataList.code);
                  popup.alert({
                    className: '',    // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
                    title: '',        // 标题（支持传入html。有则显示。）
                    text: 'code:' + dataList.code,         // 文本（支持传入html。有则显示。）
                    btnTitle: '',     // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                    okBtnCallback() {   // 按钮点击回调（有则执行该回调）

                    },
                    cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                    cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）

                    }
                  });
                }
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

    }
  }
</script>
