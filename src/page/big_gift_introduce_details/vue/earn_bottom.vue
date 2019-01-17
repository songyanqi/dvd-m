<template>
	<div class="earn-footer">
		<div class="btns">
			<a class="btn" href="/sm/earn_home.html">
				<div class="pic-title">
					<img src="//pic.davdian.com/free/0422/btnn1.png" class="pic">
					<div class="title">首页</div>
				</div>
			</a>
			<a class="btn active" >
				<div class="pic-title">
					<img src="//pic.davdian.com/free/0422/btnn3active.png" class="pic">
					<div class="title">礼包</div>
				</div>
			</a>
			<a class="btn" href="/articles.html?no_search=1&isMoney=1&isShow=38-39-40&showName=%E6%8E%A8%E5%B9%BF%E7%B4%A0%E6%9D%90">
				<div class="pic-title">
					<img src="//pic.davdian.com/free/0422/btnn2.png" class="pic">
					<div class="title">素材</div>
				</div>
			</a>
			<a class="btn" v-if="position==3" :href='"https://"+host+"/index.php?m=admin&c=mamaAdviser&a=index"'>
				<div class="pic-title">
					<img src="//pic.davdian.com/free/0422/btnn4.png" class="pic">
					<div class="title">社群</div>
				</div>
			</a>
		</div>
	</div>
</template>
<style type="text/css">
.earn-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: #eee solid 1px;
    font-size: 0;
    max-width: 640px;
    z-index: 9;
    box-sizing: border-box;
    font-family: PingFangSC-Regular,Helvetica,Arial,sans-serif;
}
	.btns{
		display: -webkit-box;
	    display: -webkit-flex;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: flex;
	    height: 50px;
	}
	.btns .btn {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -moz-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    display: block;
	    text-align: center;
	}
	.btns .btn .pic-title {
	    position: relative;
	    display: inline-block;
		width: 50px;
		height: 50px;
	}
	.btns .btn .pic-title .pic {
	    display: inline-block;
		margin-top: 7px;
	    width: 18px;
	    height: 21px;
	}
	.btns .btn .pic-title .title {
	    position: absolute;
	    top: 30px;
	    width: 100%;
	    line-height: 14px;
	    font-size: 10px;
	    color: #999;
	}
	.btns .btn.active .pic-title .title{
		color: #FF4A7D;
	}
</style>
<script type="text/javascript">
	export default {
		props:['position'],
		data(){
			return {
				host:"s.davdian.com"
			}
		},
		created(){
			if('[[env]]'=='gray'){
				this.host = 's[[num]].davdian.com';
			}else if('[[env]]'=='beta'){
				this.host = 's[[num]].vyohui.cn';
			}
		}
	}
</script>