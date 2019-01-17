// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
import type from 'dvd-base-js-type';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import cache from 'dvd-base-js-cache';
import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';

// 渲染页面
new Vue({
	el: '.app',
	components: {
		'dvd-service-com-title': require('dvd-service-com-title').default,
		'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
		'nav-footer': require('../vue/earn_bottom.vue').default
	},
	data() {
		return {
			// 全局属性
			window,
			document,
			location,
			// H5项目间通用模块
			ua,
			popup,
			// 首屏返回数据
			response: null,
			isSeller:false,
			//身份 1管家 蝴蝶 2 经理 孔雀 3 顾问 凤凰
			position:0,
			fromEarn:false,
			links:[],
			inApp:false,
			infos:[],
			loadedNum:0,
			sellerName:'大V店',
			isShow:false,
			arr:{},
			imgArr:[],
			notesArr:[],

			//big_gift_introduce_details.html页面
			responseData:{},
		};
	},
	computed: {
	},
	beforeCreate() {
		// 图片懒加载
		imgLazyload.init();
		// 是否使用mock数据
		window.mock = 0;
	},
	created() {
		//big_gift_introduce_details.html首页调接口加载数据
		this.getSecondData();
		window.link = location.href;
		this.getFromEarn();
		this.setPosition();
		this.isSeller = login.isSeller();
		// 获取首屏数据
		this.getData();
		this.getShareData();
		this.loginCallback();
		// 设置分享信息
		this.inApp = ua.isDvdApp();
	},
	mounted() {
	},
	watch: {
		// 监听response变化
		response() {
			// response变化后并渲染完dom,设置其他事项
			this.$nextTick(function() {
				let ts = this;
				try {
					if (!ts.response || !ts.response.data) {
						return;
					}
				} catch (err) {
					console.error(err);
				}
			});
		}
	},
	filters: {},
	methods: {
		commonShareUrl(){
			let needUrl=window.link;
			let needUrlSplit=needUrl.split('/',3)[2];
			return needUrlSplit;
		},
		//big_gift_introduce_details.html首页调接口加载数据
		getSecondData(){
			var that=this;
			$.ajax({
				cache: false,
				async: true,
				url: '/api/mg/community/earning/getSellerName?_='+ Date.now(),
				type: 'post',
				dataType: 'json',
				data: encrypt.ajax({

				}),
				success(res) {
					//console.log(res);
					try{
						if(res.code==0){
							if(res.data){
								that.arr=res.data;
								that.imgArr=res.data.goods;
								that.notesArr=res.data.notice;
							}
						}
					}catch(error){

					}
				},
				error(error){
					console.log(error);
				}
			});
		},
		//打开优惠券内容
		closeFixedBg(){
			this.isShow=false;
		},
		//关闭优惠券内容
		sureClick(){
			this.isShow=true;
		},
		load(index) {
			this.loadedNum++;
		},
		closePage() {
			native.Browser.close();
		},
		getFromEarn() {
			if (param.get('rl') === 'earn') {
				this.fromEarn = true;
				window.link = param.remove('rl');
			}
		},
		setPosition() {
			if (sessionStorage.getItem('earn_pos')) {
				this.position = sessionStorage.getItem('earn_pos');
			}
		},
		/**
		 * 邀请好友
		*/
		invite() {
			var that=this;
			if (ua.isDvdApp()) {
				// 调用app分享
				share.setShareInfo({
					title: that.sellerName + '邀请你加入“养家计划”',
					desc: that.responseData.page_share_text,
					//link: window.link,
					link: 'https://' + that.commonShareUrl() + '/m/big_gift_introduce_details.html',
					imgUrl: 'http://pic.davdian.com/free/0422/gift_share.png'
				});
				native.custom.share();
			} else {
				popup.toast('请分享给好友');
			}
		},
		/**
		 * 开通礼包
		*/
		join() {
			if (login.isLogined()) {
				location.href = '/878943.html';
				if ('[[env]]' === 'beta') {
					location.href = '/687532.html';
				}
			} else {
				sessionStorage.setItem('gift_login', 1);
				login.login();
			}
		},
		loginCallback() {
			if (sessionStorage.getItem('gift_login')) {
				sessionStorage.removeItem('gift_login');
				if (this.isSeller()) {
					this.invite();
				} else if (this.isBuyer()) {
					this.join();
				}
			}
		},
		getShareData() {
			// earning/getSellerName
			let ts = this;
			// 取缓存
			/* let response = cache.getItem('/[[project]]/earn_home');
			 if (response) {
			 ts.response = response;
			 document.body.className += ' loaded';
			 return;
			}*/
			// 调接口
			$.ajax({
				cache: false,
				async: true,
				url: '/api/mg/community/earning/getSellerName?_=' + Date.now(),
				type: 'post',
				dataType: 'json',
				data: encrypt.ajax({
					// js_wx_info: 1,
				}),
				success(response) {
					try {
						if (response.code === 0) {
							ts.response = response;
							if (response.data) {
								if (response.data.sellerName) {
									ts.sellerName = response.data.sellerName;
									//分享使用
									ts.responseData=response.data;
								}
								share.setShareInfo({
									title: ts.sellerName + '邀请你加入“养家计划”',
									desc: ts.responseData.page_share_text,
									link: 'https://yangkane.vyohui.cn/m/big_gift_introduce_details.html',
									imgUrl: 'http://pic.davdian.com/free/0422/gift_share.png'
								});
							}

						}
					} catch (err) {
						// 这个try-catch不要去掉，因为有异常时会阻止强制跳转
					}
				},
				error() {

				}
			});
		},
		/**
		 * 获取首屏数据
		 * @see wiki 接口名
		*/
		getData() {
			let ts = this;
			// 取缓存
			/* let response = cache.getItem('/[[project]]/earn_home');
			 if (response) {
			 ts.response = response;
			 document.body.className += ' loaded';
			 return;
			}*/
			// 调接口
			$.ajax({
				cache: false,
				async: true,
				url: '/api/mg/community/earning/index?_=' + Date.now(),
				type: 'post',
				dataType: 'json',
				data: encrypt.ajax({
					// js_wx_info: 1,
				}),
				success(response) {
					try {
						if (response.code === 0) {
							ts.response = response;
							if (response.data) {
								ts.position = response.data.userInfo.position;
								sessionStorage.setItem('earn_pos', ts.position);
								ts.isSeller = login.isSeller();
							}
						}
					} catch (err) {
						// 这个try-catch不要去掉，因为有异常时会阻止强制跳转
					}
				},
				error() {

				}
			});
		}
	}
});
