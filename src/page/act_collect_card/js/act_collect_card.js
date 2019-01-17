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
login.needLogin();

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
			currentCard: '//9i.dvmama.com/5/pink/Bbingo_l_3.png',
			// isHelpBtn: '//9i.dvmama.com/5/pink/help_icon_btn.png',
			isHelpBtn: '向好友求救',
			isHelpObj: {
				isHelp: true,
				currentIdx: 0,
			},
			isgiveLBtn: '//9i.dvmama.com/5/pink/please_icon.png',
			currentObj: {
				sessionKey: '',
			},
			cardList: [],

			bigCardList: [],

			// 是否能合成旺卡
			isCombile: 0,
			isDvd520: false,
			isCompound: false,
			isBounsModal: false,
			bounsInfo: null,
			shareInfo: {
				"cardName": "请赐我一张光吃不胖吧~",
				"cardIdx": 0,
				"cardUrl": ""
			},
			// 共分到多少元
			singleNum: 0,
		}
	},
	created () {
		this.getData();
	},
	mounted() {
		if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
			this.isapp = true;
		}
	},
	watch: {
		data(oldObj,newObj) {
			let that = this;
			this.$nextTick(() => {
				let url = `${location.origin}${this.currentObj.sessionKey}`;
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

				// shareInfo: {
				// 	"cardName": "光吃不胖",
				// 	"cardIdx": 0,
				// 	"cardUrl": ""
				// }

				share.setShareInfo({
					title: "来大V店集Pink卡，瓜分100万返现~",
					desc: "集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，青春芳华可充当任何旺卡哦~",
					link: location.href,
					imgUrl: `http://9i.dvmama.com/5/pink/bingo_l_1.png`
				});





				that.bookSwiper = new Swiper('.swiper-container', {
					grabCursor: true,
					loop: true,
					onSlideChangeStart: function(swiper) {
						let swiperIdx = (swiper.activeIndex - 1) % 5;
						if (swiperIdx == -1) {
							swiperIdx = 4;
						}
						that.cardList.map((cardItem) => {
							if (swiperIdx === cardItem.index) {
								cardItem.isSelect = '1';
								that.currentObj.sessionKey = cardItem.shareKey;
								// 当前的idx，分享时候用
								that.isHelpObj.currentIdx = cardItem.index;

								// 选中点亮
								if (cardItem.isLight != '0') {
									// 求救活着给予
									that.isHelpBtn = "赠予好友";
									that.isHelpObj.isHelp = false;
									cardItem.isselectLight = "1";
									// 选中未点亮
								} else {
									that.isHelpBtn = "向好友求救";
									that.isHelpObj.isHelp = true;
									cardItem.isselectLight = "0";
								}

								that.shareCommon(that.isHelpObj.currentIdx);
								share.setShareInfo({
									title: that.shareInfo.cardName,
									desc: '集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，万能旺可充当任何旺卡哦~',
									link: that.shareInfo.cardUrl,
									imgUrl: `http://9i.dvmama.com/5/pink/bingo_l_${that.shareInfo.cardIdx}.png`
								});
							} else {
								cardItem.isSelect = '0';
								cardItem.isselectLight = "2";
							}
						});
					}
				});
			});
		}
	},
	methods: {
		getData() {
			let that = this;
				let url = "/api/mg/sale/wonka/getInfo?_="+Date.now();
			// let url = " https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/wangkaInfo";
			$.ajax({
				url: url,
				type: "POST",
				data: encrypt.ajax({}),
				dataType: "json",
				success (res) {
					common.checkRedirect(res);
					if (!res.code) {
						that.data = res;

						if(res.code == '0' && res.data.status == '0') {
							that.singleNum = ((1000000 / Number(res.data.successNum)) * res.data.userSuccessNum).toFixed(2);



							// 当前的idx，分享时候用
							that.isHelpObj.currentIdx = 0;
							res.data.wonkaList.map((item,index) => {
								item.wonkaType = Number(item.wonkaType);
								if(item.wonkaType == '1') {
									that.isHelpBtn = item.wonkaNum == '0' ? "向好友求救" : "赠予好友";
									that.isHelpObj.isHelp = item.wonkaNum == '0' ? true : false;
									that.isgiveLBtn = item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png";
									that.currentCard = item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`;
									that.isCombile = item.wonkaNum == '0' ? that.isCombile : that.isCombile+1;
									that.currentObj.sessionKey = item.shareKey;


									that.shareInfo.cardName = that.isHelpObj.isHelp ? '请赐我一张光吃不胖吧~' : '送你一张光吃不胖，快来领取吧~';
									that.shareInfo.cardIdx = 0;
									that.shareInfo.cardUrl = `${location.origin}${that.currentObj.sessionKey}`;

									that.cardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.wonkaType-1}.png`,
										"isselectLight": item.wonkaNum == '0' ? "0" : "1",
										"isSelect": "1",
										"wonkaType": item.wonkaType,
										"isLight": item.wonkaNum,
										"isCardNum": item.wonkaNum,
										"bonusNum": item.bonusNum,
										"index": 0,
										"shareKey": item.shareKey,
									});

									that.bigCardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`,
										"givePic": item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png",
										"bonusNum": item.bonusNum,
										"wonkaType": item.wonkaType,
									});
								}
								if(item.wonkaType == '2') {
									that.isCombile = item.wonkaNum == '0' ? that.isCombile : that.isCombile+1;
									that.cardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.wonkaType-1}.png`,
										"isselectLight": "2",
										"isSelect": "0",
										"wonkaType": item.wonkaType,
										"isLight": item.wonkaNum,
										"isCardNum": item.wonkaNum,
										"bonusNum": item.bonusNum,
										"index": 1,
										"shareKey": item.shareKey,
									});

									that.bigCardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`,
										"givePic": item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png",
										"bonusNum": item.bonusNum,
										"wonkaType": item.wonkaType,
									});
								}
								if(item.wonkaType == '3') {
									that.isCombile = item.wonkaNum == '0' ? that.isCombile : that.isCombile+1;
									that.cardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.wonkaType-1}.png`,
										"isselectLight": "2",
										"isSelect": "0",
										"wonkaType": item.wonkaType,
										"isLight": item.wonkaNum,
										"isCardNum": item.wonkaNum,
										"bonusNum": item.bonusNum,
										"index": 2,
										"shareKey": item.shareKey,
									});

									that.bigCardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`,
										"givePic": item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png",
										"bonusNum": item.bonusNum,
										"wonkaType": item.wonkaType,
									});
								}
								if(item.wonkaType == '4') {
									that.isCombile = item.wonkaNum == '0' ? that.isCombile : that.isCombile+1;
									that.cardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.wonkaType-1}.png`,
										"isselectLight": "2",
										"isSelect": "0",
										"wonkaType": item.wonkaType,
										"isLight": item.wonkaNum,
										"isCardNum": item.wonkaNum,
										"bonusNum": item.bonusNum,
										"index": 3,
										"shareKey": item.shareKey,
									});

									that.bigCardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`,
										"givePic": item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png",
										"bonusNum": item.bonusNum,
										"wonkaType": item.wonkaType,
									});
								}
								if(item.wonkaType == '5') {
									that.isCombile = item.wonkaNum == '0' ? that.isCombile : that.isCombile+Number(item.wonkaNum);
									that.cardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.wonkaType-1}.png`,
										"isselectLight": "2",
										"isSelect": "0",
										"wonkaType": item.wonkaType,
										"isLight": item.wonkaNum,
										"isCardNum": item.wonkaNum,
										"bonusNum": item.bonusNum,
										"index": 4,
										"shareKey": item.shareKey,
									});

									that.bigCardList.push({
										"img": item.wonkaNum == '0' ? `//9i.dvmama.com/5/pink/noBbingo_l_${item.wonkaType-1}.png` : `//9i.dvmama.com/5/pink/Bbingo_l_${item.wonkaType-1}.png`,
										"givePic": item.wonkaNum == '0' ? '//9i.dvmama.com/5/pink/please_icon.png' : "//9i.dvmama.com/5/pink/give_icon.png",
										"bonusNum": item.bonusNum,
										"wonkaType": item.wonkaType,
									});
								}
							});
						}
					}
				},
				error (err) {
					popup.toast('网络异常，请稍后');
				}
			});
		},
		// 分享公共
		shareCommon(currentIdx) {
			switch(currentIdx) {
				case 0:
					this.shareInfo.cardName = this.isHelpObj.isHelp ? '请赐我一张光吃不胖吧~' : '送你一张光吃不胖，快来领取吧~';
					this.shareInfo.cardIdx = 0;
					break;
				case 1:
					this.shareInfo.cardName = this.isHelpObj.isHelp ? '请赐我一张浪漫满屋吧~' : '送你一张浪漫满屋，快来领取吧~';
					this.shareInfo.cardIdx = 1;
					break;
				case 2:
					this.shareInfo.cardName = this.isHelpObj.isHelp ? '请赐我一张环游世界吧~' : '送你一张环游世界，快来领取吧~';
					this.shareInfo.cardIdx = 2;
					break;
				case 3:
					this.shareInfo.cardName = this.isHelpObj.isHelp ? '请赐我一张白马王子吧~' : '送你一张白马王子，快来领取吧~';
					this.shareInfo.cardIdx = 3;
					break;
				case 4:
					this.shareInfo.cardName = this.isHelpObj.isHelp ? '请赐我一张青春芳华吧~' : '送你一张青春芳华，快来领取吧~';
					this.shareInfo.cardIdx = 4;
					break;
			}
			this.shareInfo.cardUrl = `${location.origin}${this.currentObj.sessionKey}`;
		},
		handleCard(e, item) {
			this.bookSwiper.slideTo(item.index+1);
			this.cardList.map((cardItem) => {
				if (item.index === cardItem.index) {
					cardItem.isSelect = '1';
					this.currentObj.sessionKey = cardItem.shareKey;

					this.isHelpObj.currentIdx = cardItem.index;

					// 选中点亮
					if (cardItem.isLight != '0') {
						// 求救活着给予
						// this.isHelpBtn = "//9i.dvmama.com/5/pink/give_iconBtn.png";
						this.isHelpBtn = "赠予好友";
						this.isHelpObj.isHelp = false;
						this.isgiveLBtn = '//9i.dvmama.com/5/pink/give_icon.png';
						cardItem.isselectLight = "1";
						this.currentCard = `//9i.dvmama.com/5/pink/Bbingo_l_${item.index}.png`;
						// 选中未点亮
					} else {
						// this.isHelpBtn = "//9i.dvmama.com/5/pink/help_icon_btn.png";
						this.isHelpBtn = "向好友求救";
						this.isHelpObj.isHelp = true;
						this.isgiveLBtn = '//9i.dvmama.com/5/pink/please_icon.png';
						cardItem.isselectLight = "0";
						this.currentCard = `//9i.dvmama.com/5/pink/noBbingo_l_${item.index}.png`
					}
					// 分享用
					this.shareCommon(item.index);
					share.setShareInfo({
						title: that.shareInfo.cardName,
						desc: '集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，万能旺可充当任何旺卡哦~',
						link: that.shareInfo.cardUrl,
						imgUrl: `http://9i.dvmama.com/5/pink/bingo_l_${that.shareInfo.cardIdx}.png`
					});

				} else {
					cardItem.isSelect = '0';
					cardItem.isselectLight = "2";
				}
			});
		},
		// 合成
		handleCompound() {
			let that = this;
			if (this.isCombile < 4) {
				popup.toast('还未集齐PINK卡哦～');
				return;
			}
			let url = `/api/mg/sale/wonka/userSynthesis?_${Date.now()}`;
			// let url = `https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/combileWonka?_${Date.now()}`;
			$.ajax({
				url: url,
				type: "POST",
				data: encrypt.ajax({

				}),
				dataType: "json",
				success(res) {
					if (res.data.status == "0") {
						that.isCombile = 0;
						// that.isCompound = true;
						popup.toast('合成成功~');
						that.cardList.map((item) => {
							item.index = Number(item.index)+1;
							if (res.data.wonkaType.indexOf(item.index) != "-1" && item.isCardNum != "0") {
								item.isLight = Number(item.isLight) - 1;
								item.isCardNum = Number(item.isCardNum) - 1;
								item.img = item.isCardNum == '0' ? `//9i.dvmama.com/5/pinkn/nobingo_l_${item.index-1}.png` : `//9i.dvmama.com/5/pink/bingo_l_${item.index-1}.png`;
							}
							that.isCombile = item.isCardNum == '0' ? that.isCombile : that.isCombile+1;
						});
						that.data.data.userSuccessNum = Number(that.data.data.userSuccessNum) + 1;
						that.data.data.successNum = Number(that.data.data.successNum) + 1;

						setTimeout(function () {
							location.reload();
						},500);
					}
				},
				error(error) {
				}
			})
		},
		// 向好友求救或者赠与
		handlerOperate() {
			console.log(222,this.isHelpObj.isHelp,this.isHelpObj.currentIdx,`${location.origin}${this.currentObj.sessionKey}`);
			let url = `${location.origin}${this.currentObj.sessionKey}`;
			if (ua.isWeiXin()) {
				popup.toast('点击右上角“...”分享哦～');
				return;
			}
			if (!ua.isWeiXin() && !ua.isDvdApp()) {
			 popup.toast('在微信中或者app打开分享哦～');
			 return;
			}
			let cardName = '请赐我一张光吃不胖吧~';
			let cardIndex = 0;
			// 分享用
			this.shareCommon(this.isHelpObj.currentIdx);
			/*switch(this.isHelpObj.currentIdx) {
				case 0:
					cardName = this.isHelpObj.isHelp ? '请赐我一张光吃不胖吧~' : '送你一张光吃不胖，快来领取吧~';
					cardIndex = 0;
					break;
				case 1:
					cardName = this.isHelpObj.isHelp ? '请赐我一张浪漫满屋吧~' : '送你一张浪漫满屋，快来领取吧~';
					cardIndex = 1;
					break;
				case 2:
					cardName = this.isHelpObj.isHelp ? '请赐我一张环游世界吧~' : '送你一张环游世界，快来领取吧~';
					cardIndex = 2;
					break;
				case 3:
					cardName = this.isHelpObj.isHelp ? '请赐我一张白马王子吧~' : '送你一张白马王子，快来领取吧~';
					cardIndex = 3;
					break;
				case 4:
					cardName = this.isHelpObj.isHelp ? '请赐我一张青春芳华吧~' : '送你一张青春芳华，快来领取吧~';
					cardIndex = 4;
					break;
			}*/
			if (ua.isDvdApp()) {
				native.custom.share({
					// title: cardName,
					// desc: '集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，万能旺可充当任何旺卡哦~',
					// link: url,
					// imgUrl: `http://9i.dvmama.com/5/pink/bingo_l_${cardIndex}.png`
					title: this.shareInfo.cardName,
					desc: '集齐光吃不胖、浪漫满屋、环游世界、白马王子，即可瓜分100万返现，万能旺可充当任何旺卡哦~',
					link: this.shareInfo.cardUrl,
					imgUrl: `http://9i.dvmama.com/5/pink/bingo_l_${this.shareInfo.cardIdx}.png`
				})
      }
		},
		handleClose() {
			this.isCompound = false;
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
		handleCardList() {
			this.handleJump('/act_1018_mine_list.html?type=8');
		},
		// 主会场
		handleGomain() {
			this.handleJump('/act_main_dvd.html');
		},
		// 活动规则
		handleRule() {
			this.handleJump('/t-18800.html');
		},
		// 点击红包
		handleBouns(item) {
			let that = this;
			let url = "/api/mg/sale/wonka/getWonkaBonus";
			// let url = " https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/example/wonkaBouns";
			$.ajax({
				url: url,
				type: "POST",
				data: encrypt.ajax({
					wonkeType: item.wonkaType,
				}),
				dataType: "json",
				success(res) {
					if (res.code == "0") {
						that.isBounsModal = true;
						if (res.data.status == "0") {
							that.bounsInfo = res.data;
							item.bonusNum = Number(item.bonusNum) - 1;
						} else if (res.data.status == "1") {
							popup.toast("可领取数量不足");
						} else {
							popup.toast("数据异常，请重试");
						}

					}
				}
			})
		},
		handleBounsClose() {
			this.isBounsModal = false;
		}
	}
})
