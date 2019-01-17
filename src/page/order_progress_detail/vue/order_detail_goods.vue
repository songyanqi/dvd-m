<template>
	<div v-if = "response && response.data">
		<div class = "detail_goods">
			<div v-if='response.data.orderSn'>订单号：{{ response.data.orderSn }}</div>

			<!-- 仅退货展示2 -->
		  	<div v-if='response.data.reasonName && !response.data.barterId'>退款原因：{{ response.data.reasonName }}</div>
		  	<div v-if='response.data.refundMoney  && !response.data.barterId'>退款金额：¥{{ response.data.refundMoney }}</div>
		  	<!-- 仅换货展示1 -->
		  	<div v-if='response.data.reasonName  && response.data.barterId'>换货原因：{{response.data.reasonName}}</div>

		  	<div v-if = "response.data.issueDescription">问题描述：{{ response.data.issueDescription }}</div>

		  	<!-- 仅换货展示3 -->
		  	<!-- <div v-if='response.data.supplyAddress && response.data.supplyAddress.consignee  && response.data.barterId'>收货人：{{response.data.supplyAddress.consignee}}</div>
		  	<div v-if='response.data.supplyAddress &&response.data.supplyAddress.mobile  && response.data.barterId'>联系电话：{{response.data.supplyAddress.mobile}}</div>
		  	<div v-if=' response.data.supplyAddress && response.data.supplyAddress.address  && response.data.barterId'>收货地址：{{response.data.supplyAddress.address}}</div>

		  	<div v-if='response.data.expCompany'>快递公司：{{response.data.expCompany}}</div>
		  	<div v-if='response.data.expNo'>快递单号：{{response.data.expNo}}</div> -->
		  	<div v-if='response.data.expMoney'>寄回运费：{{response.data.expMoney}}</div>
		  	<div v-if='response.data.expMoneyAcc && response.data.expMoneyAccType==3'>支付宝账号：{{response.data.expMoneyAcc}}</div>
		  	<div v-if='response.data.expMoneyAcc && response.data.expMoneyAccType==2'>银行卡卡号：{{response.data.expMoneyAcc}}</div>
		  	<div v-if='response.data.expMoneyAccName && response.data.expMoneyAccType==3'>支付宝姓名：{{response.data.expMoneyAccName}}</div>
		  	<div v-if='response.data.expMoneyAccName && response.data.expMoneyAccType==2'>银行卡姓名：{{response.data.expMoneyAccName}}</div>
		  	<div v-if='response.data.expMoneyAccBank && response.data.expMoneyAccType==2'>银行：{{response.data.expMoneyAccBank}}</div>
		</div>
		<div class = "detail_img" v-if='response.data && response.data.imageList && response.data.imageList[0]'>
			<div v-for='(item, index) in response.data.imageList' class='img_detail' :style="{'background-image': 'url(' + item + ')','background-repeat':'no-repeat','background-position':'center center','background-size': '100% 100%' ,'background-size': 'cover'}"></div>
		</div>
		<div class = "progressCont">
			<div class = "progressList" :class = "{progressNavs: index+1 == progresslist.length }" v-for = "(item,index) of progresslist">
				<div class = "porgressTitle">
					<span :class = "{ currentProgress: index == '0' && response.data.status != '7',overReturn: index == '0' && response.data.status == '7',oldProgress: index != '0' }"></span>
					<span v-if = "index != progresslist.length-1" class = "progressLine"></span>
					<span v-if = "index != progresslist.length-1" class = "progressBLine"></span>
					<span class = "progressDesc">{{ item.desc }}</span>
					<span class = "listDate">{{ item.time }}</span>	
				</div>
				<div v-if = "item.text && item.text != ''" class = "reasonTips">{{ item.text }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// response: null,
			}
		},
		props: ["response","progresslist"],
		created() {
			
		},
		mounted() {
		},
		methods: {
			getData() {
				
			}
		}
	}
</script>
