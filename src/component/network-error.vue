<template>
	<div class="network-error">
		<img width="111" height="119" style="margin: 30px auto;display: block;" src='https://9i.dvmama.com/free/0322/notnetwoek.png'>
		<div class="text">无法连接网络啦</div>
		<div class="btn" @click="refresh">点击重新加载</div>
	</div>
	

</template>
<style>
	.network-error{
		    padding-top: 50px;
	}
	.network-error .text{
		text-align: center;
		color: #666;
		font-size: 14px;
	}
	.network-error .btn{
		border: #aaa solid 1px;
		border-radius: 20px;
		color: #999;
		width: 120px;
		font-size: 12px;
	    line-height: 22px;
	    text-align: center;
	    margin: 20px auto;
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return {}
		},
		methods:{
			refresh(){
				this.$emit("refresh");
			}
		}
	}
</script>