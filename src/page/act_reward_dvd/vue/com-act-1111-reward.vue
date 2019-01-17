<style lang="sass"  rel="stylesheet/scss">

</style>
<template>
	<div>
    <div class = "act_year_rule" @click = "handleRule"></div>
		<div class = "originPage" v-if = "response">
      <div v-if = "response.data">
        <div class = "activity_tips" @click = "lookYearReward" v-if = "response.data.money || response.data.money == 0">
          <span class = "actvity_t">我的年终奖是：<span class = "act_num">{{ response.data.money }}</span>元</span>
          <span class = "act_line">|</span>
          <span class = "act_look">查看</span>
        </div>
        <!-- 使用积分 -->
        <div class = "act_point" v-if = "response.data.points || response.data.points == 0">
          <div class = "act_point_num">积分总计：{{ response.data.points }}</div>
          <div class = "act_point_btn" @click = "handlePoint"></div>
        </div>
        <div v-else>
          <div class = "act_invite_num">每天最多邀请10位好友帮拿</div>
          <div v-if="isApp" class = "activity_btn" @click="shares"></div>
          <div v-if="isWx" class = "activity_btn activity_isWx"></div>
          <div v-if="!isWx && !isApp" @click="gowxorapp" class = "activity_btn"></div>
        </div>
        <div class = "activity_go">
          <span class = "act_goMain" @click = "handleGoMain">
            <span v-if = "Date.now() < 1513008000000"> 年终盛典，爆款预定中</span>
            <span v-else>爆款抢购中</span>
          </span>
        </div>
        <div class = "act_rules_cont">
          <div>
            <div class = "year2_icon"></div>
            <div>
              <div class = "yearTipTitle"> 1.好友帮拿</div>
              <div class = "yearTipCont"> 2017.12.6~2017.12.11期间，每天最多邀请10个好友帮拿年终奖，帮拿金额随机。</div>
              <div class = "yearTipTitle"> 2.预定商品</div>
              <div class = "yearTipCont">2017.12.6~2017.12.11期间，每预定一件商品可获得10元年终奖，没有上限，多预定多获得。</div>
              <div class = "yearTipTitle"> 3.感恩年终奖</div>
              <div class = "yearTipCont">2017.1.1~2017.12.5期间，系统依据会员自己累计支付金额的1%，会给你一个初始年终奖，累计支付越多所获年终奖越多。</div>
            </div>
          </div>
          <div>
            <div class = "year1_icon"></div>
            <div>
              <div class = "yearTipTitle"> 1.使用期限</div>
              <div class = "yearTipCont">年终奖仅在12.12当天使用，过期将不能使用，年终奖不能提现。</div>
              <div class = "yearTipTitle"> 2.使用条件</div>
              <div class = "yearTipCont">支付金额满100最多用5元年终奖，满200最多用20元，满400元最多用50元。可以与红包叠加使用。支付金额包含使用返现。组团、预定商品付尾款不能使用年终奖。</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class = "act_over"></div>
    </div>

    <div v-if = " isshowMask || isshowMore" @touchmove = "handlePrevent($event)">
      <div class = "mask" @click = "handleClose"></div>
      <span @click = "handleClose" class = "maskClose"></span>
    </div>
    <!-- 开通会员 -->
    <div v-if = "isShowMem || isSumMask" @touchmove = "handlePrevent($event)">
      <div class = "mask" @click = "handleClose"></div>
    </div>
    <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isShowMem">
      <span @click = "handlerOpenMem" class = "maskOpenMem"></span>
      <img class = "memImg" src="//9i.dvmama.com/free/1212/1212Icon/no_mem_new.png">
    </div>

    <!-- 抽中年终奖 -->
    <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isshowMask">
      <span v-if = "pointRes" class = "maskNum">{{ pointRes.data.money }}</span>
      <img class = "memImg" src="//9i.dvmama.com/free/1212/1212Icon/get_money_cont.png">
    </div>
    <!-- 没有获得年终奖的提示 -->
     <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isshowMore">
      <img class = "memImg" src="//9i.dvmama.com/free/1212/newIcon/no_years_05.png">
    </div>
    <!-- 活动结束啦 -->
    <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isSumMask">
      <img class = "memImg" src="//9i.dvmama.com/free/1212/newIcon/game_over.png">
      <span class = "act_goMain memGoMain" @click = "handleGoMain">去主会场</span>
    </div>
	</div>
</template>
<script type="text/javascript">
import encrypt from 'dvd-service-js-encrypt';
import ua from 'dvd-base-js-ua';
import popup from 'dvd-service-js-popup';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import common from 'dvd-service-js-common';
import login from 'dvd-service-js-login';
import $ from 'jquery';

// wiki: http://wiki.bravetime.net/pages/viewpage.action?pageId=18553156

	export default {
  	components: {

  	},
  	data () {
  		return {
  			response: null,
	      isWx: false,
	      isApp: false,
	      rule_form: false,
	      cheerId: ua.getQuery("cheerId"),
        shareUserId: ua.getQuery("shareUserId"),
        rewardPrice: "",
        isFalse: false,
        // 会员
        isShowMem: false,
        // 抽中
        isshowMask: false,
        // 未抽中
        isshowMore: false,
        pointRes: null,
        // 是否正在请求
        isAjax: true,
        isSumMask: false,
  		}
  	},
  watch: {
    response() {
      let ts = this;
      this.$nextTick(() => {
        let ts = this;
        // 设置分享信息
        if (ts.response) {
          /*if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
            native.custom.initHead({
              shareOnHead: 1,
              isAudioAbsorb:1,
              isShowAudio:1
            });
          }else {
            native.Browser.setHead({
              backBtn: 1,
              isAudioAbsorb:'1',
              isShowAudio:'1',
              hideHead: '1',
            });
          }*/
          native.custom.initHead({
            shareOnHead: 1,
            backOnHead: 1,
          });
          let shareInfo = ts.response.data.shareInfo;
          // 如果是不是会员，不设置分享信息
          try {
            if (shareInfo) {
              share.setShareInfo({
                title: shareInfo.title,
                desc: shareInfo.desc,
                link: `${location.origin }${shareInfo.link}`,
                imgUrl: shareInfo.imgUrl,
              });
            } else {
                share.setShareInfo({
                title: "双12来大V店拿年终奖啦～",
                desc: "年终奖与优惠券叠加使用，最多立省50元，快来拿",
                link: location.href,
                imgUrl: 'http://9i.dvmama.com/free/1212/newIcon/share_year.jpg',
              });
            }
          } catch (err) {
            console.error(err);
          }
        }
      })
    },
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
    this.isWx = ua.isWeiXin();
    this.isApp = ua.isDvdApp();
    login.needLogin();
  },
  methods: {
    handlePoint() {
      let that = this;
      // let url = 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/getPoint';
      let url = '/api/mg/sale/annualbonus/addPointsMoney?_=' + Date.now();
      that.isAjax = true;
      if (that.isAjax) {
        $.ajax({
          cache: false,
          async: true,
          url: url,
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({}),
          success(pointRes) {
            that.pointRes = pointRes;
            // 正在请求的时候不要点击，还未写
            if (pointRes.code == "0") {
              // 成功
              if (pointRes.data.code == "0") {
                that.isshowMask = true;
                that.response.data.points = Number(that.response.data.points) + Number(pointRes.data.point);
                that.response.data.money = Number(that.response.data.money) + Number(pointRes.data.money);
                return;
              }
              // 非会员
              if (pointRes.data.code == "1") {
                that.isShowMem = true;
                return;
              }
              // 积分不足
              if (pointRes.data.code == "2") {
                popup.toast('积分不足了哦～');
                return;
              }
              // 未中奖
              if (pointRes.data.code == "3") {
                that.response.data.points = Number(that.response.data.points) + Number(pointRes.data.point);
                that.isshowMore = true;
                return;
              }
              // 异常
              if (pointRes.data.code == "4") {
                popup.toast("数据异常，请重试～");
              }
              // 双十二当天
              if (pointRes.data.code == "5") {
                popup.toast("只有双十二当天可以抽取哦～");
              }
            }
            that.isAjax = false;
          },
          error(error) {
            that.isAjax = false;
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      }
    },
    handlePrevent(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    // 开通会员
    handlerOpenMem() {
      this.handleJump('/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button');
    },
    handleClose(e) {
      this.isShowMem = false;
      this.isshowMask = false;
      this.isshowMore = false;
      this.isSumMask = false;
      // this.isShowMaskBouns = false;
    },
    getData() {
      let ts = this;
      // let url = 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/myYearReard';
      let url = '/api/mg/sale/annualbonus/getAnnualBonus?_=' + Date.now();
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          cheerId: ts.cheerId,
        }),
        success(response) {
          common.checkRedirect(response);
          if (response.code == '0') {
            // 刷新页面
            ts.$forceUpdate();
            ts.response = response;
            if (!response.data) {
              ts.isSumMask = true;
              return;
            }
            if (response.data.status && response.data.status == '1') {
              ts.isShowMem = true;
              return;
            }
            // if (response.data.code && response.data.code == '1') {
            //   setTimeout(() => {
            //     popup.toast('不在活动时间范围内～');
            //   }, 300);
            //   ts.isFalse = true;
            // }
          } else {
            popup.toast(response.data.msg);
          }
        },
        error(error) {
          // ts.response = require('../json/act_1018_main.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    lookYearReward() {
      this.handleJump('/act_1018_mine_list.html?type=5');
    },
    shares: function () {
      var ts = this;
      login.needLogin();
      // // 测试
      // ts.sharecallback();

      // if (!ts.isFalse) {
      //   ts.sharecallback();
      // }
      share.callShare();
    },
    /***
       * 记录分享回调
       * */
    // sharecallback() {
    //   var that = this;
    //   $.ajax({
    //     cache: false,
    //     async: true,
    //     url: '/api/mg/sale/usercheerbuy/userShare?_=' + Date.now(),
    //     type: 'post',
    //     dataType: 'json',
    //     data: encrypt.ajax({cheerId: that.cheerId, shareUserId: that.shareUserId}),
    //     success(res) {
    //       console.log(res);
    //       if(res.code == '0') {
    //         if (res.data.code == '0') {
    //           popup.toast('数据异常，刷新重试');
    //         }
    //         if (res.data.code == '2') {
    //           popup.toast('已经没名额啦～');
    //         }
    //       }
    //     },
    //     error(error) {
    //       console.error('ajax error:' + error.status + ' ' + error.statusText);
    //     }
    //   });
    // },
    gowxorapp() {
      popup.toast("请在App或微信内打开");
    },
    isMobile() {
      let ua = navigator.userAgent;
      return !!ua.match(/Mobile/i);
    },
    // 跳转方式
    handleJump(url) {
      if (this.isApp) {
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
    handleGoMain() {
      this.handleJump('/act_main_dvd.html');
    },
    handleRule() {
      this.handleJump('/t-16492.html');
    },
    events() {},
    /*rule_form: function () {
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
    }*/
  },
  filters: {},
  }
</script>
