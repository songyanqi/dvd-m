<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  .reserve {
    // position: relative;
    padding-top: 0.1rem;
    background: #ffc2ca;
    .clearfix:after {
      display: block;
      clear: both;
      content: "";
    }
    .swiper-container {
      background: #FF6582;
      font-size: 0.12rem;
    }
    .listNav {
      width: 100%;
      height: 0.5rem;
      overflow: hidden;
    }
    .addFixed {
      position: fixed;
      max-width: 640px;
      top: 44px;
      z-index: 10;
    }
    .isAppFixed {
      position: fixed;
      top: 0;
      z-index: 10;
    }
    .isMainApp {
      position: fixed;
      top: 0;
      z-index: 10;
    }
    .swiper-slide {
      text-align: center;
      padding: 0.1rem 0;
      background: linear-gradient(to bottom, #fd4e85, #f41752);
      background: -moz-linear-gradient(bottom, #fd4e85, #f41752);
      background: -o-linear-gradient(bottom, #fd4e85, #f41752);
      background: -webkit-linear-gradient(top, #fd4e85, #f41752);
      color: #fff;
      border-right: 2px solid #f64176;
      .item {
        line-height: 0.15rem;
      }
      .bookLiskNav {
        display: block;
      }
    }
    .swiper-slide:last-child {
      border-right: 0;
    }
    .slide_bar {
      position: relative;
      background: url(//9i.dvmama.com/5/pink/qiang.png) no-repeat;
      background-color: #f9af47;
      background-size: 100% 100%;
      // background: linear-gradient(to bottom, #f8cd3c, #fe8418);
      // background: -moz-linear-gradient(bottom, #f8cd3c, #fe8418);
      // background: -o-linear-gradient(bottom, #f8cd3c, #fe8418);
      // background: -webkit-linear-gradient(top, #f8cd3c, #fe8418)
    }
    .slide_bar:after {
      position: absolute;
      content: "";
      bottom: 0.08rem;
      left: 15%;
      width: 70%;
      border-bottom: 1px solid #fff;
    }
    .bookCont {
      padding: 0.05rem;
      box-sizing: border-box;
    }
    .bookList {
      float: left;
      width: 50%;
      border-radius: 5px;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0.05rem 0.05rem;
      border-radius: 0.05rem;
      // margin-bottom: 0.05rem;
    }
    .bookImg {
      position: relative;
      width: 1.72rem;
      box-sizing: border-box;
      height: 1.72rem;
      background: #fff;
      overflow: hidden;
      background-repeat: no-repeat;
      padding: 0.1rem 0.1rem 0;
      border-top-left-radius: 0.05rem;
      border-top-right-radius: 0.05rem;
      img {
        width: 100%;
      }
    }
    .bookRight {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      background: #fff;
      padding:0 0.1rem;
      border-bottom-left-radius: 0.05rem;
      border-bottom-right-radius: 0.05rem;
      .bookTips {
        background: url(//9i.dvmama.com/free/1212/newIcon/book_s.png) no-repeat;
        background-size: 100%;
        width: 1rem;
        text-align: center;
        color: #fff;
        font-size: 0.11rem;
        padding: 0.03rem;
        margin-bottom: 0.05rem;
      }
      .bookName {
        position: relative;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #1e1d1d;
        font-size: 0.12rem;
        height: 0.32rem;
        line-height: 0.17rem;
        -webkit-line-clamp: 2;
      }
      .bookBtn {
        display: inline-block;
        background: linear-gradient(to bottom, #fd619c, #ea1945);
        background: -moz-linear-gradient(bottom, #fd619c, #ea1945);
        background: -o-linear-gradient(bottom, #fd619c, #ea1945);
        background: -webkit-linear-gradient(top, #fd619c, #ea1945);
        font-size: 0.12rem;
        border-radius: 0.5rem;
        width: 1.2rem;
        height: 0.25rem;
        text-align: center;
        line-height: 0.25rem;
      }
      .bookPrice {
        position: relative;
        font-size: 0.13rem;
        color: #ed025b;
        padding: 0.15rem 0 0.05rem;
        padding-top: 0.05rem;
      }
      .book_only {
        font-size: 0.12rem;
        color: #959494;
        margin-top: 0.05rem;
        display: block;
        height: 0.12rem;
      }
      // .bookPrice:after {
      //   position: absolute;
      //   content: "";
      //   top: 0.05rem;
      //   left: 0;
      //   width: 100%;
      //   border-bottom: 1px solid #fff;
      //   -webkit-transform-origin: left top;
      //   transform-origin: left top;
      //   -webkit-transform: scaleY(0.5);
      //   transform: scaleY(0.5);
      // }
    }
    .advancePrice {
      color: #ed025b;
      margin-bottom: 0.05rem;
      .a_tips {
        font-weight: bold;
        font-size: 0.15rem;
      }
      .a_price {
        font-weight: bold;
        font-size: 0.15rem;
      }
      .a_dis {
        font-size: 0.12rem;
      }
    }
    .bookBtn_order {
      color: #fff;
      font-size: 0.11rem;
      text-align: center;
      padding-bottom: 0.1rem;
    }
    .book_recomand {
      position: relative;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #959494;
      font-size: 0.11rem;
      line-height: 0.17rem;
      -webkit-line-clamp: 1;
      margin-bottom: 0.08rem;
    }
    .reserveHead {
      width: 100%;
      vertical-align: top;
    }
    .reserveHead_cont {
      position: relative;
    }
    .reserveRole {
      display: block;
      position: absolute;
      width: 100px;
      height: 20px;
      right: 16%;
      bottom: 21%;
    }
    .good_list_sell_out {
      font-size: 15px;
      color: #fff;
      background-color: rgba(0,0,0,.6);
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
  }
  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .com-popup-base2 {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  .com-popup-base2 .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base2 .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    min-height: 200px;
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 0 15px;
    color: #FF4A7D;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px 0;
    max-height: 4rem;
    overflow-y: scroll;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(3) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    width: 36px;
    height: 36px;
    background-image: url("../img/clearInput.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1):after {
    content: "";
    display: block;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    background: rgba(216, 216, 216, 0.51);
    -webkit-transform: scale(0.5);
    bottom: 0;
    z-index: 1;
  }
</style>
<template>
  <div class = "reserve">
    <!-- <div class = "reserveHead_cont">
    <span @click = "handleReserveRole" class = "reserveRole"></span> -->
    <!-- <img class = "reserveHead" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/goodsDetail/reserve_icon.jpg"> -->
    <!-- <img class = "reserveHead" src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/reserve_icon_title.jpg"> -->
    <!-- </div> -->
    <!-- 头部 -->
    <!-- 有滑动到一定距离fixed定位的时候，
    给父元素增加和子元素同样的高度。再给父元素加上overflow: hidden;，这样效果好些 -->
    <div class = "listNav">
      <div class="swiper-container reserveSwiper" :class = "{addFixed: !isApps && isFixed, isAppFixed: isApps && isFixed, isMainApp: isMainCenter && isFixed}">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class = "{ slide_bar: currentIdx === index }" @click = "handleNav(item,index)" v-for = "(item,index) in bookNavList" :key = "index">
            <div class="item"><span class = "bookLiskNav">{{ item.date }}</span> <span class = "bookLiskNav">{{item.status}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class = "bookCont clearfix">
      <div class = "bookList" :class = "{ videoList: currentVideoIdx === index }" v-for = "(item,index) in singleList" @click = "handleList($event, item, index)" :key = "item">
        <div class = "bookImg">
          <img :src="item.imageUrl" alt="">
          <div v-if = "item.shopStocks <= '0' && !isFuture" class = "good_list_sell_out ng-scope">
            <div class = "ng-scope">售罄</div>
          </div>
          <div v-if = "isFuture" class = "good_list_sell_out ng-scope">
              <div class = "ng-scope">未开始</div>
            </div>
        </div>
        <div class = "bookRight">
          <!-- <div class = "bookTips">{{ item.startDate }}号起开始预定</div> -->
          <div class = "bookName">{{ item.goodsName }}</div>
          <div class = "book_price_cont">
            <div class = "bookPrice">
              <span class = "f12">¥ {{ item.shopPrice }}</span>
              <!-- <span class = "book_only" v-if = "Number(item.shopStocks) > 0 && currentVideoIdx !== index">仅剩{{ item.shopStocks }}件</span> -->
              </div>
            <div class = "advancePrice">
              <span class = "a_tips">定金 ¥ </span>
              <span class = "a_price">{{ item.advancePrice }}</span>
              <span class = "a_dis">(抵扣{{ item.discountPrice }}元)</span>
              <!-- <span class = "book_only" v-if = "Number(item.shopStocks) > 0 && currentVideoIdx === index">仅剩{{ item.shopStocks }}件</span> -->
              <span class = "book_only"><span v-if = "Number(item.shopStocks) > 0">仅剩{{ item.shopStocks }}件</span></span>
            </div>
          </div>
          <div class = "book_bottom">
            <!-- <div v-if = "item.recommend" class = "book_recomand">{{ item.recommend }}</div> -->
            <div class = "bookBtn_order">
              <div class = "bookBtn">立即预定></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class = "noMore">没有更多啦</div> -->
    </div>
    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base2" @click="rule_form = false">
      <div class="table-cell">
        <div v-show="rule_form" class="box" @click.stop="events">
          <div>预定规则</div>
          <div>
            <p>1.预定时间：2017.10.14 00:00:00-2017.10.17 23:59:59；</p>
            <p>2.尾款结算时间：2017.10.18 00:00:00-2017.10.18 23:59:59；</p>
            <p>3.预定期间，用户支付预定金并成功预定指定商品，在10月18日当天可享定金膨胀的优惠，定金膨胀后实际抵扣的金额以预定时实际约定的抵扣金额为准（预定商品不可使用红包）；</br>例如：某品牌洁面仪大V售价100元，预定金20可抵40元使用，小明妈在2017.10.15日支付定金20元，成功预定了该洁面仪，在10月18日当天仅需支付60元即可获得该商品；</p>
            <p>4.定金是否退回？如果在10月18日当天未及时结算预定商品的尾款，定金将不予退回；</p>
            <p>5.购买或销售预定商品且成功结算尾款，会员将额外获得每件10元的奖励，奖励金额（退货订单除外）将于11月1日以返现方式发放；</p>
            <p>6.详情可咨询大V店客服。</p>
          </div>
          <div @click="close_what_invite"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import encrypt from 'dvd-service-js-encrypt';
  import popup from 'dvd-service-js-popup';
  import native from 'dvd-service-js-native';
  import date from 'dvd-base-js-date';
  import ua from 'dvd-base-js-ua';

  export default {
    components: {

    },
    data () {
      return {
        // bookNavList: [
        //   {"date": "2017/12/06","status": "待开始"},
        //   {"date": "2017/12/07","status": "待开始"},
        //   {"date": "2017/12/08","status": "待开始"},
        //   {"date": "2017/12/09","status": "待开始"},
        //   {"date": "2017/12/10","status": "待开始"},
        //   {"date": "2017/12/11","status": "待开始"},
        // ],
        bookNavList: [],
        // 全部list
        bookDataList: [],
        // 单个list
        singleList: [],
        currentIdx: 0,
        currentTime: '',
        bookSwiper: null,
        rule_form: false,
        isFuture: false,
        targetTop: 0,
        isApps: false,
        isFixed: false,
        currentDay: 0,
        // 当前播放的视频Index
        currentVideoIdx: -1,
        // 是否能匹配上日期
        isMatch: false,
        isMainCenter: false,
    }
    },
    props: ['response'],
    created() {
      this.getData();
    },
    mounted() {
      let that = this;
      if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
        that.isApps = true;
      }
      if (ua.getQuery("isMain") == 'isMain' && ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') >= 0) {
        this.isMainCenter = true;
      }
      // this.isMainCenter = true;
      window.addEventListener("scroll",function () {
        if (!that.isFixed) {
          that.targetTop = document.querySelector(".reserveSwiper").offsetTop;
        }
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

        if (scrollTop >= that.targetTop) {
          that.isFixed = true;
        } else {
          that.isFixed = false;
        }
      });
    },
    watch: {
      bookNavList: {
        handler() {
          let that = this;
          let length = this.bookNavList.length;
          this.$nextTick(() => {
            let screenWidth = document.body.clientWidth;
            if (screenWidth == 0) {
              screenWidth = document.documentElement.clientWidth;
            }
            let swiper_num = screenWidth / 80;
            if (length > swiper_num) {
              that.bookSwiper = new Swiper('.swiper-container', {
                slidesPerView: swiper_num,
                grabCursor: true,
                initialSlide: that.currentIdx - 2
              });
            } else {
              that.bookSwiper = new Swiper('.reserve .swiper-container', {
                slidesPerView: length,
                grabCursor: true,
              });
            }
          })
        },
        deep: true
      },
      response: {
        handler() {
          let that = this;
          let length = this.bookNavList.length;
          this.$nextTick(() => {
            // let timer = null;
            // let timer2 = null;
            // clearTimeout(timer);
            // clearTimeout(timer2);
            // timer = setTimeout(() => {
            //   if (!that.isApps) {
            //     that.targetTop = that.targetTop - 44;
            //   }
            //   window.addEventListener("scroll",function () {
            //     if (!that.isFixed) {
            //      that.targetTop = document.querySelector(".reserveSwiper").offsetTop
            //     }
            //     let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
            //     if (scrollTop >= that.targetTop) {
            //       that.isFixed = true;
            //     } else {
            //       that.isFixed = false;
            //     }
            //   });
            // },500);
            // timer2 = setTimeout(() => {
            //   that.targetTop = document.querySelector(".reserveSwiper").offsetTop;
            // },1000);


            // let screenWidth = document.body.clientWidth;
            // if (screenWidth == 0) {
            //   screenWidth = document.documentElement.clientWidth;
            // }
            // let swiper_num = screenWidth / 80;
            // if (length > swiper_num) {
            //   that.bookSwiper = new Swiper('.swiper-container', {
            //     slidesPerView: swiper_num,
            //     grabCursor: true,
            //     initialSlide: that.currentIdx - 2
            //   });
            // } else {
            //   that.bookSwiper = new Swiper('.reserve .swiper-container', {
            //     slidesPerView: length,
            //     grabCursor: true,
            //   });
            // }
          })
        },
        deep: true
      },
      rule_form: function () {
        var that = this;
        if (that.rule_form) {
          if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            this.scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -this.scrollTop + 'px';
          document.body.classList.add("bodyFix");

        } else {
          document.body.classList.remove("bodyFix");
          $(document).scrollTop(this.scrollTop);

        }
      }
    },
    methods: {
      // 播放视频
      /*handlePlay(e,index,item) {
        e.target.parentElement.style.backgroundImage = null;
        this.currentVideoIdx = index;
        $(".bookList").each((idx) => {
          if (index != idx) {
            $(".bookList").eq(idx).find("video").get(0).pause();
          }
        })
      },
      // 暂停
      handlePause(e,index,item) {
        if (index == this.currentVideoIdx) {
          this.currentVideoIdx = -1;
        }
      },*/
      handleReserveRole() {
        this.rule_form = true;
      },
      close_what_invite() {
        this.rule_form = false;
      },
      events() {},
      // 是否为mobile
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      // 跳转方式
      handleJump(url) {
        if (ua.isDvdApp()) {
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
      // 时间排序
      getSort(item1,item2) {
        return item1.startTime - item2.startTime;
      },
      sortGet(sort1, sort2) {
        return sort2.sort - sort1.sort;
      },
      handleList(e,item,index) {
        // if (e.target.className == "imgVideo") {
        //   return;
        // }
        // if (this.isFuture) {
        //   popup.toast('不在活动时间范围内～');
        //   return;
        // }
        // $(".bookList").eq(index).find("video").get(0).pause();
        if (item.childGoodsId > 0) {
          item.goodsId = item.childGoodsId;
        }
        let shopUrl = `/${item.goodsId}.html`;
        this.handleJump(shopUrl);
      },
      getData() {
        let that = this;
        let datas = this.response.data.book;
        that.currentTime = this.response.sys_time*1000;
        let hasDate = {};
        let addIdx = 0;
        datas.sort(that.getSort);
        datas.map((item,index) => {
          let chageDate = new Date(item.startTime*1000).getDate();
          // item.startDate = chageDate;

          if (hasDate[chageDate] == undefined) {
            that.bookNavList.push({
              "allDate": item.startTime*1000,
              "date":date.format(item.startTime*1000, 'MM月dd日'),
              "status": "待开始",
              "isStart": false,
            });
            hasDate[chageDate] = addIdx;
            addIdx++;
            let children = [];
            children.push(item);
            that.bookDataList.push(children);
          } else {
            that.bookDataList[hasDate[chageDate]].push(item);
          }
        });
        let currentDate = new Date(that.currentTime).getDate()
        that.bookNavList.map((item,index) => {
          let dateDay = new Date(item.allDate).getDate();
          if(dateDay == currentDate) {
            that.currentIdx = index;
            that.currentDay = index;
            that.isMatch = true;
          }
        });
        // if (!that.isMatch) {
        //   that.currentIdx = that.bookNavList.length;
        //   that.singleList = that.bookDataList[0];
        // }
        that.bookDataList[that.currentIdx].sort(that.sortGet);
        that.singleList = that.bookDataList[that.currentIdx];
        that.bookNavList.slice(0,that.currentIdx+1).map((item,index) => {
          item.status = "已开始";
          item.isStart = true;
        });
      },
      // 头部导航
      handleNav(item,index) {
        this.currentVideoIdx = -1;
        this.currentIdx = index;
        if (index > this.currentDay) {
          this.isFuture = true;
        } else {
          this.isFuture = false;
        }
        this.bookSwiper.slideTo(Math.max(0, index - 2));
        this.bookDataList.map((item,idx) => {
          if (index == idx) {
            item.sort(this.sortGet);
            this.singleList = item;
          }
        });
      },
    },
  }
</script>

