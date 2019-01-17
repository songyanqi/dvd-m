<template>
	<div class="earn-footer">
		<div class="btns">
			<a class="btn active">
				<div class="pic-title">
					<img src="//9i.dvmama.com/free/2017/07/05/home0.png" class="pic">
				</div>
			</a>
			<a class="btn" href="/earn/mine.html">
				<div class="pic-title">
					<img src="//9i.dvmama.com/free/2017/07/05/me1.png" class="pic">
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
   margin-top: 7px;
    height: 35px;
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
