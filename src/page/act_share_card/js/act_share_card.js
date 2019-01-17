// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

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

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
// login.needLogin();

new Vue({
	el: ".app",
	components: {
    'com-top-title': require('dvd-service-com-title').default,
	},
	props: {},
	data() {
		return {
			data: null,
			objUrl: {},
			isapp: false,
			isLoad: false,
			currentCard: '//9i.dvmama.com/free/wish/Bbingo_l_3.png',
			isHelpBtn: '赠予TA PINK卡',
			isgiveLBtn: '//9i.dvmama.com/5/pink/please_icon.png',
			currentObj: {},
			cardList: [],
			// 是否能合成旺卡
			isCombile: 0,
		}
	},
	created () {
		this.getData();
		// this.getCardList();
	},
	watch () {
		let that = this;
		this.$nextTick(() => {
			if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
				that.isDvd520 = true;
				native.custom.initHead({
					shareOnHead: 1,
					isAudioAbsorb:1,
					isShowAudio:1
				});
			} else {
				native.Browser.setHead({
					backBtn: 1,
					isAudioAbsorb:'1',
					isShowAudio:'1',
					hideHead: '1',
				});
			}

			share.setShareInfo({
				title: "来大V店集Pink卡，瓜分100万返现~",
				desc: "集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，青春芳华可充当任何旺卡哦~",
				link: location.href,
				imgUrl: `http://9i.dvmama.com/5/pink/cardLogo.jpg`
			});
		});
	},
	mounted() {

		if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
			this.isapp = true;
		}
	},
	methods: {
		getData() {
			let that = this;
			let url = "/api/mg/sale/wonka/getShareInfo?_="+Date.now();
			// let url = " https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/shareCard";
			$.ajax({
				url: url,
				type: "POST",
				data: encrypt.ajax({
					shareKey: ua.getQuery("shareKey"),
				}),
				dataType: "json",
				success (res) {
					common.checkRedirect(res);
					if (!res.code) {
						that.data = res;
						if(res.code == '0') {
							let typeIdx = res.data.wonkaType-1;
							that.currentCard = `//9i.dvmama.com/5/pink/noBbingo_l_${typeIdx}.png`;
							that.isgiveLBtn =  '//9i.dvmama.com/5/pink/please_icon.png';
							that.isHelpBtn =  "赠予TA PINK卡";
							if (res.data.status == '2') {
								that.currentCard = `//9i.dvmama.com/5/pink/Bbingo_l_${typeIdx}.png`;
								that.isgiveLBtn =  '//9i.dvmama.com/5/pink/give_icon.png';
								that.isHelpBtn =  "领取TA的PINK卡";
							}
						}
					}
				},
				error (err) {
					popup.toast('网络异常，请稍后');
				}
			});
		},
		// 跳转方式
    handleJump(url) {
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: url
        });
      } else if (ua.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
		handleOperate() {
			login.needLogin();
			let that = this;
			let url = `/api/mg/sale/wonka/shareInteract?_${Date.now()}`;
			// let url = " https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/shareCardInfo";
			$.ajax({
				url: url,
				type: "POST",
				data: encrypt.ajax({
					shareKey: ua.getQuery("shareKey"),
				}),
				dataType: "json",
				success(res) {
					if (res.data) {
						popup.toast(res.data.msg);
					}

				},
			});
		},
		hanleLookCard() {
			this.handleJump('/act_collect_card.html');
		},
		hanleGoMain() {
			this.handleJump('/act_main_dvd.html');
		}
	}
})
