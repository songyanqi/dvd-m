// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// 业务模块
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';
import login from 'dvd-service-js-login';
import ua from 'dvd-base-js-ua';
import layout from "../../index/module/index/layout.es6";
import popup from 'dvd-service-js-popup';
import share from 'dvd-service-js-share';

// 懒加载初始化
vueLazyload.init();

// 页面需要登录
login.needLogin();

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('dvd-service-com-title').default,
    'avatar-upload': require('../vue/avatar_upload.vue').default,
	},
	props: {},
	data() {
		return {
			data: null,
			response: null,
			isapp: false,
			isShowDot: false,
			avatarImg: 0,
			isShow: false,
		}
	},
	created () {
		this.getData();
		this.isapp = this.isApp();
	},
	watch: {
		response: {
			handler() {
				let that = this;
				this.$nextTick(function () {
					that.avatarImg = $(".avatarNavs img").width();
					let avatarContH = that.avatarImg * (that.response.data.joinList.length/6)+30;

					$(".avatarNavs").height(avatarContH);
					$(".avatarLists").height(that.avatarImg*2+16);

					// if ($(".avatarNavs").height() > $(".avatarLists").height()) {
					if (Number(newObj.data.joinCount)	> 12) {
						this.isShowDot = true;
					}
					// if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
					// 	native.custom.initHead({
					// 		shareOnHead: 1,
					// 		isAudioAbsorb:1,
					// 		isShowAudio:1
					// 	});
					// }else {
					// 	native.Browser.setHead({
					// 		backBtn: 1,
					// 		isAudioAbsorb:'1',
					// 		isShowAudio:'1',
					// 		hideHead: '1',
					// 	});
					// }
					native.custom.initHead({
						shareOnHead: 1
					});
					try {
						share.setShareInfo({
							title: '大V店第三届中国绘本节|大家一起助力绘本节，生成绘本节专属头像～',
							desc: '大V店第三届中国绘本节|大家一起助力绘本节，生成绘本节专属头像～',
							link: location.href,
							imgUrl: 'http://9i.dvmama.com/free/2018/04/16/400_400_88c8323e3e27ad075470abb617d7de44.jpg',
						});
					} catch(err) {
						console.error(err);
					}
				})
			},
			deep: true,
		}
	},
	mounted() {
		// if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
		// 	native.custom.initHead({
		// 		shareOnHead: 1,
		// 		isAudioAbsorb:1,
		// 		isShowAudio:1
		// 	});
		// }else {
		// 	native.Browser.setHead({
		// 		backBtn: 1,
		// 		isAudioAbsorb:'1',
		// 		isShowAudio:'1',
		// 		hideHead: '1',
		// 	});
		// }
		native.custom.initHead({
			shareOnHead: 1
		});
		try {
			share.setShareInfo({
							title: '大V店第三届中国绘本节|大家一起助力绘本节，生成绘本节专属头像～',
							desc: '大V店第三届中国绘本节|大家一起助力绘本节，生成绘本节专属头像～',
							link: location.href,
							imgUrl: 'http://9i.dvmama.com/free/2018/04/16/400_400_88c8323e3e27ad075470abb617d7de44.jpg',
						});
		} catch(err) {
			console.error(err);
		}
	},
	methods: {
		getData () {
			let that = this;
			// let url = "https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/pinkList";

		},
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
	}
})
