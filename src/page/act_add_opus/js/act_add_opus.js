// 基础模块
import common from 'dvd-service-js-common';
// alert(1);
// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
import tj from 'dvd-service-js-tj';
import popup from 'dvd-service-js-popup';
import localCache from 'dvd-base-js-cache';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import date from 'dvd-base-js-date';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
login.needLogin();

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('dvd-service-com-title').default,
		'com-popup-loading': require('../vue/com-popup-loading.vue').default,
	},
	props: {},
	data() {
		return {
			data: null,
			response: null,
			isapp: false,
			isShowDot: false,
			avatarImg: 0,
			uploadPic: '//9i.dvmama.com/free/yearWish/upbkg.png',
			avatarPoster: "",
			workInfo: {
				name: '',
				age: '请选择',
				yearWish: '',
			},
			ageList: ['请选择',1,2,3,4,5,6,7,8,9,10,11,12,13,14],
			// 提交按钮是否能点击
			isSubmit: false,
			isUploadPic: true,
			isLongTabTime: null,
			isLongTap: true,
			isLoading: false,
			isuploading: false,
		}
	},
	created () {
		this.getData();
	},
	watch: {
		response: {
			handler(newObj,oldObj) {
				let that = this;
				let urlLink = "";
				if (newObj.data.workId != '') {
					urlLink = `${location.origin}/act_year_wish.html?workId=${newObj.data.workId}`;
				} else {
					urlLink = `${location.origin}/act_year_wish.html`;
				}

				this.$nextTick(function () {
					native.custom.initHead({
						shareOnHead: 1
					});
					// 设置分享信息
					try {
						share.setShareInfo({
							title: "大V店 | 画出新年愿望，赢666元愿望基金",
							desc: "上传宝宝作画，点赞超过50，获得20元愿望优惠券(无门槛)，入选100幅还能获得666元愿望基金哦~",
							link: urlLink,
							imgUrl: "http://9i.dvmama.com/free/cardList/newyearBkg.png?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&"
						});
					} catch (err) {
						console.error(err);
					}
				});
			},
			deep: true,
		}
	},
	mounted() {

	},
	methods: {
		getData () {
			let that = this;
			let workId = '';
			if (ua.getQuery("id")) {
				workId = ua.getQuery("id");
			}
			$.ajax({
				url: '/api/mg/sale/yearwish/addInfo',
				type: "POST",
				data: encrypt.ajax({
					js_wx_info: 1,
					id: workId,
				}),
				dataType: "JSON",
				success (res) {
					common.checkRedirect(res);
					that.response = res;
					if (!res.code && res.data) {
						if (!ua.getQuery("id") && res.data.workId) {
							location.href = `/act_year_wish.html?workId=${res.data.workId}`;
						}
						if (ua.getQuery("id") && res.data.babyName) {
							that.isSubmit = true;
							that.isUploadPic = false;
							that.workInfo = {
								name: res.data.babyName || '',
								age: res.data.babyAge || '请选择',
								yearWish: res.data.yearWish || '',
							}
							that.uploadPic = res.data.shareImageUrl || '';
						}
					} else {
						popup.toast(res.data.msg);
					}
				},
				error (error) {
					console.log(error);
				},
			});
		},
		handleChange(e) {
			this.handleOpeate();
		},
		handleName() {
			if (this.workInfo.name.trim().length > 8) {
				popup.toast("最多输入8字");
				this.workInfo.name = this.workInfo.name.trim().substr(0,8).trim();
			}
			this.handleOpeate();
		},
		handleWish() {
			if (this.workInfo.yearWish.trim().length > 12) {
				popup.toast("最多输入12字");
				this.workInfo.yearWish = this.workInfo.yearWish.trim().substr(0,12).trim();
			}
			this.handleOpeate();
		},
		// 判断都不为空
		handleOpeate() {
			console.log(this.workInfo.age,this.workInfo.yearWish.trim(),this.workInfo.name.trim(),this.isUploadPic);
			if (this.workInfo.age != '请选择' && !this.isUploadPic && this.workInfo.yearWish.trim() && this.workInfo.name.trim()) {
				this.isSubmit = true;
			} else {
				this.isSubmit = false;
			}
		},
		handleTouchStart (e) {
			this.isLongTabTime = setTimeout(() => {
				if (this.isLongTap) {
					let picSrc = e.target.getAttribute('src');
					nativeAncestry.savePic(picSrc);
				}
			},500);
		},
		handleTouchMove (e) {
			this.isLongTap = false;
			clearTimeout(this.isLongTabTime);
		},
		handleTouchEnd (e) {
			this.isLongTap = true;
			clearTimeout(this.isLongTabTime);
		},
		handleTouchCancle (e) {
			this.isLongTap = true;
			clearTimeout(this.isLongTabTime);
		},
		handleUpload (event) {
			// let that = this;
			// let files = event.target.files;
			// let picStr = 'shop_logo';
			// let file = files[0];

			let that = this,
					files = event.target.files,
					picStr = 'shop_logo',
					file = files[0];

			if (file.size > 1000 * 1000 * 5) {
				popup.toast('图片大小不能超过5M');
				return;
			}

			if (files.length) {
				let data = new FormData(),
				    url = '/upload.php?owner_id=2547=' + Date.now();
				// 全站默认上传接口/upload.php
				that.isuploading = true;
				data.append(picStr, file);
				that.uploadPic = "//9i.dvmama.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif";
				$.ajax({
					cache: false,
					async: true,
					url: url,
					type: 'post',
					dataType: 'json',
					timeout:20000,
					data: data,
					contentType: false,
					processData: false,
					success: function (res) {
						// that.firstUrl = res.data.shop_logo.src;
						if (!res.errorCode) {
							// that.uploadPic = `${res.data.shop_logo.src}@1000h_800w_1e_1c_2o`;
							that.uploadPic = `${res.data.shop_logo.src}?x-oss-process=image/resize,h_1000/auto-orient,1`;
							that.isUploadPic = false;
							setTimeout(() => {
								that.isuploading = false;
							},300);

							that.handleOpeate();
							// that.uploadPic = res.data.shop_logo.src;
							/*$.ajax({
								url: "/api/mg/images/avatarmake/generatePoster",
								type: "POST",
								data: layout.strSign('uploadPics',{uploadFile: res.data.shop_logo.src}),
								dataType: "JSON",
								success (res) {
									if (!res.code) {
										// popup.loading(false);
										that.uploadPic = res.data.avatarUrl;
										that.avatarPoster = res.data.posterUrl;
									} else {
										popup.toast(res.data.msg);
									}
								},
								error () {
									popup.toast("定制图片失败，请重试");
								}
							});*/
						} else {
							popup.toast(res.errorMsg);
						}
					},
					error: function (e,e1) {
						if(e1=="timeout"){
								 popup.toast("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
						 }else{
								 popup.toast("上传失败，请检查网络后重试("+e1+")");
						 }
					}
				});
			}
		},
		handleSubmit() {
			if (!this.isSubmit) {
				return;
			}
			this.isLoading = true;
			if (this.response.code == "50053") {
				popup.toast(this.response.data.msg);
				return;
			}
			let that = this,getId = '';

			if (ua.getQuery("id")) {
				getId = ua.getQuery("id");
			}
			let data = {
				id: getId,
				babyName: this.workInfo.name,
				yearWish: this.workInfo.yearWish,
				babyAge: this.workInfo.age,
				imgUrl: this.uploadPic,
				qrCodeImg: this.response.data.qrCode
			};
			$.ajax({
				url: '/api/mg/sale/yearwish/submit',
				type: "POST",
				data: encrypt.ajax(data),
				dataType: "JSON",
				success (res) {
					that.isLoading = false;
					if (!res.code) {
						// 回到主页
						popup.toast(res.data.msg);
						if (res.data.id == '0') {
							return;
						}
						setTimeout(() => {
							location.replace(`/act_year_wish.html?workId=${res.data.id}`);
						},500);
					}
				},
				error (error) {
					console.log(error);
				},
			});
		}
	}
});
