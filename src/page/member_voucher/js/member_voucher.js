// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Swiper from 'swiper';

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
		'dvd-service-com-paging-list': require('dvd-service-com-paging-list').default
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
			current:null,

			// 首屏返回数据
			ticketData: [],
			visitorStatus: null,
			status: null,
			shareNum: 1,
			listHeight: document.documentElement.clientHeight - 44 - 44 * document.documentElement.style.fontSize.replace('px', '') / 100 + 'px',
			isSeller: 0,
			bindingTime:'',
      voucherIntroLink: '',
      voucherMoreLink: '',
      voucherUseLink: '',
      canuse: 0,
      money: 0,
      num: 0,
		};
	},
	computed: {},
	beforeCreate() {
		login.needLogin();
	},
	created(){
		switch(new Date().toLocaleDateString()){
			case "2018/7/10":
				this.bindingTime="/admin_topic.html?topicId=22804";
				break;
			case "2018/7/11":
				this.bindingTime="/admin_topic.html?topicId=22805";
				break;
			case "2018/7/12":
				this.bindingTime="/admin_topic.html?topicId=22806";
				break;
			case "2018/7/13":
				this.bindingTime="/admin_topic.html?topicId=22807";
				break;
			case "2018/7/14":
				this.bindingTime="/admin_topic.html?topicId=22808";
				break;
			default:
				this.bindingTime="/";
		}
	},
	filters: {
		formatDate(val) {
			return val.replace(/-/g, '.');
		}
	},
	methods: {
		getData(cb) {
			let that = this;
			$.ajax({
				cache: false,
				async: true,
				url: '/api/mg/user/voucher/getList?_=' + Date.now(),
				type: 'post',
				dataType: 'json',
				data: encrypt.ajax(),
				success(res) {
					try {
						if (res.code === 0) {
							that.ticketData = that.ticketData.concat(res.data.voucher);
							that.status = res.data.stat;
							that.visitorStatus = res.visitor_status;
							cb && cb(true);
							that.current = date.format(Date.now(), 'dd');
							console.log('curr', that.current);
							that.isSeller = login.isSeller();
              that.canuse = res.data.config.canUse;
							that.voucherUseLink = res.data.config.voucherUseLink;
							that.voucherMoreLink = res.data.config.voucherMoreLink;
							that.voucherIntroLink = res.data.config.voucherIntroLink;
							that.money = res.data.config.money;
							that.num = res.data.config.num;
						} else {
							popup.toast(res.data.msg || res.msg);
						}
					} catch (err) {

						// 这个try-catch不要去掉，因为有异常时会阻止强制跳转
					}
				},
				error(error) {

					// 只有本地调试版本才能使用mock数据
					if (!'[[env]]') {
						console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
						this.success(require('../json/member_voucher.json'));
						console.warn(`ajax已使用mock数据: url=${this.url}, mock=member_voucher.json`);
					}
				}
			});
		},
		giveTicket({ shareInfo}) {
			if (ua.isWeiXin()) {
				location.href = shareInfo.link + '&tag=weixin';
				return false;
			}
			if (!ua.isDvdApp() && !ua.isWeiXin()) {
				history.pushState(null, null, shareInfo.link);
				this.shareNum++;// 统计分享次数，方便返回。back方法
				sessionStorage['isShare'] = this.shareNum;
			}
			this.setShareInfo(shareInfo);
			share.callShare();
		},
		setShareInfo(data) {
			share.setShareInfo({
				title: data.title,
				desc: data.desc,
				link:
					this.location.protocol +
					'//' +
					this.location.hostname +
					data.link,
				imgUrl: data.imgUrl
			});
		},
		useHref(item) {
			if (item.giverUserName) {
				// return `//${item.giverUserName}.davdian.com/index.php?c=ShopGoods&a=index&id=348&_refer=center`;
				return '/938517.html';
			} else {
				// return '/index.php?c=ShopGoods&a=index&id=348&_refer=center';
				return '/938517.html';
			}
		},
		back() {
			if (ua.isDvdApp()) {
				native.Browser.close();
			} else {
				history.go(-this.shareNum);
			}
		}
	}
});
