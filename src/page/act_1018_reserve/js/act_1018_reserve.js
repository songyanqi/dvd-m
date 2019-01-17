// 基础模块
import common from 'dvd-service-js-common';
import encrypt from 'dvd-service-js-encrypt';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import vueLazyload from 'dvd-service-js-img-lazyload';
// 懒加载初始化
vueLazyload.init();

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('dvd-service-com-title').default,
    'com-act-reserve': require('../vue/com-act-reserve.vue').default
	},
	data() {
		return {
      response: null,
    }
	},
	created() {
		this.getData();
	},
	mounted() {
	},
	computed: {
  },
  watch: {

	},
	methods: {
		getData() {
			let that = this;
			$.ajax({
				url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/reserveList',
				dataType: "JSON",
				type: "POST",
				data: encrypt.ajax({
          js_wx_info: 1,
				}),
				success(res) {
					that.response = res;
				},
				error(err) {
					console.log(err);
				}
			})
		}
	},
})
