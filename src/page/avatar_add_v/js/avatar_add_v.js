// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// 业务模块
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';
import login from 'dvd-service-js-login';

// 懒加载初始化
vueLazyload.init();

// 页面需要登录
login.needLogin();

import layout from "../../index/module/index/layout.es6";
import popup from 'dvd-service-js-popup';
import share from 'dvd-service-js-share';

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
		}
	},
	created () {
		this.getData();
		this.isapp = this.isApp();
	},
	watch: {
		response: {
			handler(newObj,oldObj) {
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


					native.custom.initHead({
						showHead: 1, // 是否展示头部
						backOnHead: 1, // 头部返回按钮
						btnText: "重新上传",
						btnLink: "/act_pink_avatar.html?repeat=1"
					});

					setTimeout(function() {
						native.custom.setHead({
							title: "测测少女心",
							rightBtn: {
								text: "重新上传",
								action: "window.hrefs()"
							}
						});
					}, 500);
					try {
						share.setShareInfo({
							title: '庆祝PinkDay，测测你的少女心',
							desc: '妇女节留给TA们过吧，少女只庆祝PinkDay',
							imgUrl: "http://9i.dvmama.com/5/pink/pinkeday.png",
							link: window.location.href
						});
					} catch (err) {
						console.error(err);
					}
				})
			},
			deep: true,
		}
	},
	mounted() {
		// 设置app头部标题栏
    /*native.custom.initHead({
      shareOnHead: 1,
      isAudioAbsorb:1,
      isShowAudio:1,
      homeOnHead: 1,
    });

    share.setShareInfo({
    	title: '定制自己的3周年头像，为大V店3周年加油。',
      desc: '偷偷告诉你，还有海报分享哦',
      link: location.href,
      imgUrl: 'http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Bouns/avatarShare.jpg',
    });*/
	},
	methods: {
		getData () {
			let that = this;
			// let url = "https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/pinkList";
			let url = "/api/mg/sale/pinkday/getInfo";
			$.ajax({
				url: url,
				type: "POST",
				data: layout.strSign('avatarAddv',{}),
				dataType: "JSON",
				success (res) {
					common.checkRedirect(res);
					if (!res.code) {
						that.response = res;
						// if (that.response.data && that.response.data.avatarUrl == "") {
						// 	that.response.data.avatarUrl = "9i.dvmama.com/avatar_poster/2017/upload_addV.png";
						// }
					} else {
						popup.toast(res.data.msg);
					}
				},
				error (error) {
					console.log(error)
				},
			})
		},
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
	}
})
