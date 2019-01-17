<template>
	<div class='container'>
		<!-- <div class='line line1' v-if='aftersaleNum!=0' @click='gohref1'> -->
		<div class='line line1' @click='gohref1'>
			<img src="//9i.dvmama.com/free/2018/01/15/returnGoods.png">
			<span>退货</span>
			<img class='arrow' src="//9i.dvmama.com/free/2018/01/15/arrow.png">
		</div>
		<div class='line' @click='gohref'>
			<img src="//9i.dvmama.com/free/2018/01/15/exchangeGoods.png">
			<span>换货</span>
			<img class='arrow' src="//9i.dvmama.com/free/2018/01/15/arrow.png">
		</div>
	</div>
</template>

<script>
	import native from 'dvd-service-js-native';
	export default {
		data() {
			return {
				aftersaleNum:this.getQuery('aftersaleNum') || 0
			}
		},
		mounted() {

		},
		methods: {
			isMobile() {
        		let ua = navigator.userAgent;
		        return !!ua.match(/Mobile/i);
		    },
		    isapp() {
		        let u = navigator.userAgent
		        return !!u.match(/davdian|bravetime|vyohui/);
		    },
		    gohref() {
		    	var url = '/after_sale.html?goodsId=' + this.getQuery('goodsId') + '&deliveryId=' + this.getQuery('deliveryId')
		    	this.handleJump(url)
		    },
		    gohref1(){
		    	if (this.getQuery('hadReturn') == '1'){
		    		this.handleJump('/sale_error_page.html?state=3')
		    	} else {
		    		var url = '/refund_new.html?delivery_id='+this.getQuery('deliveryId')+'&goods_id='+this.getQuery('goodsId')
			    	this.handleJump(url)
		    	}
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
