<template>
  <div class="ui-a-courseList">

    <div class="ui-a-course" v-for="item in list" :style="{marginBottom:bottom_i/100 + 'rem'}"
         @click="toDetail(item.command.content)">
      <div class="ui-c-left">
        <img v-lazy="item.imageUrl" width="100%" height="100%">
      </div>
      <div class="ui-a-right" :style="{width:width_r/100 + 'rem'}">
        <div class="ui-cnt-title">{{item.title}}</div>
        <div class="ui-cnt-last">{{item.teacher}}</div>
        <div class="ui-cnt-info">
          <span>{{item.pv}}人气</span>
          <span>{{item.startTime}}</span>
        </div>
      </div>
    </div>

    <div class="ui-no-more" v-show="load === true">
      <div v-show="more === true && is_loading === false && is_first === false">
        <span>下拉加载更多</span>
      </div>

      <div v-show="(is_loading === true || is_first === true)&& load === true">
        <span>加载中</span>
        <img src="//9i.dvmama.com/free/loading_03252.svg"/>
      </div>

      <div v-show="more === false && is_loading === false && is_first === false">
        <span>暂无更多</span>
      </div>
    </div>

  </div>
</template>

<script>
  import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';

  export default {
    name: "com-course-list",
    props: {
      rightWidth: {},//自定义内容右边宽度 现有215 235两种设计
      itemBottom: {},//自定义每个课程之间的上下距离 现有25 28两种设计
      courseList: {},//课程列表 考虑到下拉刷新所以本组件只进行本组件列表累加，获取新数据在父组件实现
      load: {},//是否下拉加载更多
      hasMore: {},//是否显示加载中
    },
    data() {
      return {
        width_r: 215,
        bottom_i: 28,
        list: [],
        more: true,
        is_loading: false,//正在加载 为true时不触发通知父组件获取更多数据方法
        is_first: true,
      };
    },
    watch: {
      courseList() {
        let _this = this;
        if(_this.load !== true){
          _this.list = [];
        }
        _this.courseList.forEach((item) => {
          _this.list.push(item);
        });
        _this.list = _this.arrDelRepeat(_this.list)

        _this.is_first = false;
      },
      hasMore() {
        this.more = this.hasMore;
        console.log("more", this.more)
      },
      load() {
        this.is_loading = this.load;
        console.log("is_loading", this.is_loading)
      }
    },
    beforeCreate() {
      // 图片懒加载
      imgLazyload.init();
    },
    created() {
      let _this = this;
      // console.log(_this.load)
      _this.courseList.forEach((item) => {
        _this.list.push(item);
      });
      _this.list = _this.arrDelRepeat(_this.list)
      if (_this.rightWidth) {
        _this.width_r = _this.rightWidth;
      }
      if (_this.itemBottom) {
        _this.bottom_i = _this.itemBottom;
      }
    },
    mounted() {
      let _this = this;
      // console.log(_this.load)
      if (_this.load === false) {
        //页面滚动加载
        window.onscroll = function () {
          var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);//真实内容高度
          //视窗高度
          var viewportHeight = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight || 0;
          //隐藏高度即滚动的高度
          var scrollHeight = window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop || 0;
          let less = pageHeight - viewportHeight - scrollHeight
          if (less <= 20 && _this.is_loading === false && _this.more === true) {
            _this.is_loading = true;
            _this.getMore();
          }
        };
      }

    },
    methods: {
      getMore() {
        let _this = this;
        _this.$emit('get-more');
      },
      toDetail(url) {
        // console.log(url)
        location.href = url;
      },
      arrDelRepeat(arr) {
        var unique = {};
        arr.forEach(function (gpa) {
          unique[JSON.stringify(gpa)] = gpa
        });
        arr = Object.keys(unique).map(function (u) {
          return JSON.parse(u)
        });
        return arr;
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../common/css/util";

  .ui-a-courseList {
    margin-top: r(12);
    width: 100%;
    .ui-a-course {
      width: 100%;
      margin-bottom: r(28);
      .ui-c-left {
        width: r(110);
        height: r(76);
        border-radius: r(4);
        display: inline-block;
        box-sizing: border-box;
        img {
          border-radius: r(4);
        }
      }
      .ui-a-right {
        width: 2.15rem;
        margin-left: 0.1rem;
        float: right;
        font-size: 0;
        .ui-cnt-title {
          width: 100%;
          height: 0.38rem;
          line-height: 0.19rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 0.14rem;
          color: #333333;
        }
        .ui-cnt-info {
          color: #999999;
          font-size: 0;
          height: 0.17rem;
          line-height: 0.26rem;
          span {
            font-size: 0.12rem;
          }
          span:nth-child(1) {
            border-right: solid 1px #E1E1E1;
            padding-right: 0.1rem;
          }
          span:nth-child(2) {
            padding-left: 0.1rem;
          }
        }
        .ui-cnt-last {
          height: 0.17rem;
          margin-top: 0.03rem;
          font-size: 0.12rem;
          color: #999;
        }
      }
    }
    .ui-a-course:last-child {
      margin-bottom: r(0);
    }
  }

  .ui-no-more {
    width: 100%;
    height: r(40);
    line-height: r(40);
    text-align: center;
    margin-bottom: r(20);
    img {
      position: relative;
      top: r(4);
    }
  }
</style>
