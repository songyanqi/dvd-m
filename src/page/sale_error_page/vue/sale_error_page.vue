<template>
	<div class='container'>
		<img src="//9i.dvmama.com/free/2018/01/24/error_bg.png">
		<div class='line1' v-if='state==0'>亲爱的，已经不能申请售后了，订单完成的15天内，才可以哦~</div>
		<div class='line1' v-if='state==1'>亲爱的，当前商品售后数量不足，无法申请售后哦～</div>
		<div class='line1' v-if='state==2'>亲爱的，线下订单不可以申请售后哦～</div>
		<div class='line1' v-if='state==3'>亲爱的，您已经申请过退货了，如仍需要退货请联系客服处理哦～</div>
		<!-- <div class='line2'></div> -->
		<div class='line3'>查看<span @click='goHref'>售后政策</span>，如需人工帮助，可联系客服进行咨询</div>
	</div>
</template>
<script>
	import native from 'dvd-service-js-native';
	export default {
		data() {
			return {
				state:this.getQuery('state') || 0
			}
		},
		methods: {
			isapp() {
		        let u = navigator.userAgent
		        return !!u.match(/davdian|bravetime|vyohui/);
		    },
			goHref(){
				var url = '/policy.html'
				this.handleJump(url)
			},
			handleJump(url) {
		        var that = this
		        if (this.isapp()) {
		          native.Browser.open({
		            url: url
		          });
		        } else if (this.isMobile()) {
		          window.open(url, '_blank');
		        } else {
		          window.open(url, '_self');
		        }
		    },
			isMobile() {
        		let ua = navigator.userAgent;
		        return !!ua.match(/Mobile/i);
		    },
		    isapp() {
		        let u = navigator.userAgent
		        return !!u.match(/davdian|bravetime|vyohui/);
		    },
		    // 跳转方式
		    handleJump(url) {
		        var that = this
		        if (this.isapp()) {
		          native.Browser.open({
		            url: url
		          });
		        } else if (this.isMobile()) {
		          window.open(url, '_blank');
		        } else {
		          window.open(url, '_self');
		        }
		    },
			getQuery (name) {
		        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
		        var r = window.location.search.match(reg)
		        if (r != null) return decodeURIComponent(r[2])
		        return null
		      }
		}
	}
</script>
