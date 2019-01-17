<style lang="sass"  rel="stylesheet/scss">

</style>
<template>
	<div>
    <div class = "originPage" v-if = "response">
      <div class = "act_year_rule" @click = "handleRule"></div>
		<div class = "originPage" v-if = "response">
      <div class = "activity_tips">
        <div v-if = "!isSumMask">
          <div class = "act_tip_mem"><span class = "act_nickName">{{ response.data.nickName }}</span>邀请你帮拿年终奖</div>
          <div class = "act_tips">{{ shareTopTips }}</div>
        </div>
      </div>
      <div v-if = "!isSumMask">
        <div v-if = "response.data.status == '1'" @click="shares" class = "activity_btn"></div>
        <div v-if = "response.data.status == '2'" @click="shares" class = "already_btn"></div>
      </div>
      <div v-if = "!isSumMask" class = "activity_go">
        <span class = "act_goMain" @click = "handleGoMain">
          <span v-if = "Date.now() < 1513008000000"> 年终盛典，爆款预定中</span>
          <span v-else>爆款抢购中</span>
        </span>
      </div>
      <div v-if = "!isSumMask" class = "act_rules_cont">
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
    </div>
    <!-- 弹框 -->
    <img style = "display: none;" src="//9i.dvmama.com/free/1212/1212Icon/no_mem_new.png">
    <img style = "display: none;" src="//9i.dvmama.com/free/1212/yearWard/reward_pic.png">
    <img style = "display: none;" src="//9i.dvmama.com/free/1212/newIcon/no_years_05.png">
    <img style = "display: none;" src="//9i.dvmama.com/free/1212/newIcon/game_over.png">
    <!-- <img style = "display: none;" src="//9i.dvmama.com/free/1111/newo/mask1.png"> -->
    <div v-if = "isShowMem || isshowMask || isshowMore" @touchmove = "handlePrevent($event)">
      <div class = "mask" @click = "handleClose"></div>
      <span @click = "handleClose" class = "maskClose"></span>
    </div>
    <div v-if = "isSumMask" class = "mask"></div>
    <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isShowMem">
      <span @click = "handlerOpenMem" class = "maskOpenMem"></span>
      <img class = "memImg" src="//9i.dvmama.com/free/1212/1212Icon/no_mem_new.png">
    </div>
    <!-- 获得年终奖 -->
    <div class = "maskCont" @touchmove = "handlePrevent($event)" v-if = "isshowMask">
      <span v-if = "response" class = "maskNum">{{ clickRes.data.money }}</span>
      <img class = "memImg" src="//9i.dvmama.com/free/1212/yearWard/reward_pic.png">
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

// wiki: http://wiki.bravetime.net/pages/viewpage.action?pageId=18553158

	export default {
  	components: {

  	},
  	data () {
  		return {
  			response: null,
	      isWx: false,
	      isApp: false,
	      // rule_form: false,
	      // cheerId: ua.getQuery("cheerId"),
        shareUserId: ua.getQuery("shareUserId"),
        rewardPrice: '',
        clickRes: null,
        // 会员
        isShowMem: false,
        // 获得年终奖
        isshowMask: false,
        // 没有获得年终奖
        isshowMore: false,
        // 活动已结束啦
        isSumMask: false,
        isShowMaskBouns: false,


        shareTips: '帮Ta拿年终奖',
        shareTopTips: '爱帮忙的你，运气总不会太差',
  		}
  	},
    watch: {
      response(newObj,oldObj) {
        let ts = this;
        let nickNameL = 0;
        if (newObj.data.nickName) {
          nickNameL = newObj.data.nickName.length * 0.14;
        }
        this.$nextTick(() => {
          if (nickNameL > 0.84) {
            $(".act_nickName").addClass("act_11111");
          }
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
            shareOnHead: 1
          });
          // 设置分享信息
          if (ts.response) {
            let shareInfo = ts.response.data.shareInfo;

            share.setShareInfo({
              title: shareInfo.title,
              desc: shareInfo.desc,
              link: `${location.origin }${shareInfo.link}`,
              imgUrl: shareInfo.imgUrl
            });
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
    },
    methods: {
      handlePrevent(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      handleRule() {
        this.handleJump('/t-16492.html');
      },
      getData() {
        let ts = this;
        // let url = 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/yearRewardDetail';
        let url = '/api/mg/sale/annualbonus/getHelpDetail?_=' + Date.now();
        $.ajax({
          cache: false,
          async: true,
          url: url,
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            cheerId: ts.cheerId,
            shareUserId: ts.shareUserId,
          }),
          success(response) {
            common.checkRedirect(response);
            if (response.code == '0') {
              ts.response = response;

              if (response.data.status == "1") {
                // ts.shareTips = '帮Ta拿年终奖';
                ts.shareTopTips = "爱帮忙的你，运气不会太差哦";
              }
              if (response.data.status == "2") {
                // ts.shareTips = "我也要拿年终奖";
                ts.shareTopTips = `为Ta拿了年终奖${response.data.money}元`;
              }
              if (response.data.status == "3") {
                // ts.shareTips = "活动结束啦～";
                ts.isSumMask = true;
                ts.shareTopTips = "活动结束啦～";
              }
              if (response.data.status == "4") {
                // 跳转到自己的那个页面
                location.href = "/act_reward_dvd.html";
              }
              // ts.getInvitor(response);
              // 刷新页面
              ts.$forceUpdate();
            } else {
              popup.toast(response.msg);
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      // 是否为mobile
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
      shares: function () {
        let that = this;
        login.needLogin();

        // let url = "https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/yearRewardClick";
        let url = '/api/mg/sale/annualbonus/addHelpMoney?_=' + Date.now();

        let cheers = this.response.data.status;
        // 活动结束，跳走
        if (cheers == '4') {
          // that.handleJump('/act_1111_main.html');
          return;
        }
        // 不是会员,并且已经帮忙过了
        if (cheers == "2" && that.response.visitor_status != '3') {
          that.isShowMem = true;
          return;
        }
        // 已经帮过，点击跳转到自己的连接
        if (cheers == "2") {
          location.href = "/act_reward_dvd.html";
          // if(!that.isWx && !that.isApp) {
          //   popup.toast("复制地址栏链接在微信中打开或直接打开大V店App分享拿年终奖哦～");
          //   return;
          // }
          // share.callShare();
          return;
        }

        if (cheers == "1") {
          $.ajax({
            cache: false,
            async: true,
            url: url,
            type: 'post',
            dataType: 'json',
            data: encrypt.ajax({
              // cheerId: cheers.cheerId,
              shareUserId: that.shareUserId
            }),
            success(res) {
              that.clickRes = res;
              if (res.code == '0') {
                if (res.data.code == '3') {
                  popup.toast('数据异常～，请刷新重试');
                  return;
                }
                // 成功
                if (res.data.code == '0') {
                  that.isshowMask = true;
                  that.shareTips = "我也要拿年终奖";
                  that.shareTopTips = `为Ta拿了年终奖${res.data.money}元`;
                  that.response.data.status = "2";
                  return;
                }
                /*if (res.data.code == '1') {
                  that.isShowMem = true;
                  return;
                }*/
                // 已经加油过了
                if (res.data.code == '2') {
                  popup.toast('已经帮过了~');
                  return;
                }
                // 活动结束
                if (res.data.code == '4') {
                  popup.toast('活动已结束了哦～');
                  return;
                }
                if (res.data.code == '5') {
                  popup.toast('帮忙次数达到限了哦～');
                  return;
                }


              } else {
                popup.toast(res.data.msg);
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        }
      },
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
      handleReserveRole() {
        // this.rule_form = true;
        this.handleJump('/t-15513.html');
      },
      // close_what_invite() {
      //   this.rule_form = false;
      // },
      handleClose(e) {
        this.isShowMem = false;
        this.isshowMask = false;
        this.isshowMore = false;
        this.isSumMask = false;
        this.isShowMaskBouns = false;
      },
      // 开通会员
      handlerOpenMem() {
        this.handleJump('/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button');
      },
      handlerLook() {
        this.handleJump('/act_main_dvd.html');
      },
      events() {},
      handleGoodsLink() {
        this.handleJump(this.response.data.cheer.activityLink);
      }
    },
    filters: {},
  }
</script>
