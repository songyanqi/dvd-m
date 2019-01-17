// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// 业务模块
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

import OrderTopTitle from "../../cancle_order/vue/order_topTitle.vue";
import returnList from "../vue/return_list.vue";

// var oldTitle = document.querySelector('order-top-title');
// var title = document.createElement('com-top-title');
// title.setAttribute('home', '');
// title.setAttribute('title', '售后列表');
// oldTitle.parentNode.appendChild(title);
// oldTitle.parentNode.removeChild(oldTitle);

new Vue({
	el: ".app",
	components: {
		// OrderTopTitle: OrderTopTitle,
		returnList: returnList,
    'com-top-title': require('dvd-service-com-title').default,
	},
	props: {},
	data() {
		return {
			isapp: false,
		}
	},
	created () {
		this.getData();
		this.isapp = this.isApp();
	},
	mounted() {
		// 设置app头部标题栏
    native.custom.initHead({
      homeOnHead: 1,
      shareOnHead: 0,
    });
	},
	methods: {
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
		getData() {

		},
	}
})
