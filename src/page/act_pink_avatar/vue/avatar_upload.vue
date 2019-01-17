<template>
	<div class = "avatarWrapper">
		<div class = "avatarTitle">
			<img src="http://9i.dvmama.com/free/2018/04/16/1125_1611_43714e3cbb7d180af87dee0c0362fa9d.png">
			<!-- <img src="[[static]]/page/act_pink_avatar/img/pink_bkg_2.png"> -->
			<input v-if="!avaUrl" @change = "handleUpload" class = "uploadIpt" type="file" accept="image/*" name="">
			<!-- <div @click = "handleRule" class = "act_rule">活动规则</div> -->
			<div class="show" v-if="avaUrl">
				<img :src="avaUrl">
			</div>
		</div>
		<div class = "avatarCont" v-if = "response && response.data.joinCount != '0'">
			<p class = "avatarListTips">共{{response.data.joinCount}}人换头像啦</p>
			<div class = "avatarLists">
				<div class = "avatarNavs">
					<img v-for = "item of response.data.joinList" :src="item.smallAvatarUrl">
					<!-- <span v-if = "isshowdot" :style = "{ height: (avatarimg+2.5) + 'px',lineHeight: (avatarimg-2.5) + 'px' }" class = "avatarListDot"> -->
					<span v-if = "isshowdot" style = "width: 0.55rem;height: 0.55rem;lineHeight: 0.5rem;" class = "avatarListDot">
					...</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from 'dvd-service-js-common';
	import nativeAncestry from '../../../common/js/nativeAncestor.js';
	import popup from 'dvd-service-js-popup';
	import layout from "../../index/module/index/layout.es6";
  import $ from 'jquery';


	export default {
		data() {
			return {
				avaUrl:null
			}
		},
		components: {},
		props: ["response","isshowdot",'avatarimg',"isshow"],
		created() {},
		watch: {},
		mounted () {
		},
		methods: {
			handleUpload (event) {
				let that = this;
				let files = event.target.files;
				let picStr = 'shop_logo';
        let file = files[0];
        let Orientation = null;
				if (files.length) {
	        let data = new FormData();
	        data.append(picStr, file);
	        // 全站默认上传接口/upload.php
	        let url = '/upload.php?owner_id=2547=' + Date.now();
					// that.uploadPic = "//9i.dvmama.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif";
					popup.loading();
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
	            if (!res.errorCode) {
	              // let imgPic = res.data.shop_logo.src+"@200h_304w_1e_1c_2o";
	              // that.uploadPic = res.data.shop_logo.src;
	              $.ajax({
									// url: "/api/mg/images/avatarmake/generatePoster",
									url: "/api/mg/sale/pinkday/upload",
	              					type: "POST",
									data: layout.strSign('uploadPics',{avatarUrl: res.data.shop_logo.src}),
									dataType: "JSON",
									success (res) {
										popup.loading(false);
										if (res.code == "0") {
											if (true) {
												let url = "/api/mg/sale/pinkday/getInfo";
												$.ajax({
													url: url,
													type: "POST",
													data: layout.strSign('avatarAddv',{}),
													dataType: "JSON",
													success (res) {
														common.checkRedirect(res);
														if (!res.code) {
															if (res.data.posterUrl != "") {
																that.avaUrl = res.data.avatarUrl;
															}
															setTimeout(function () {
																that.response = res;
																that.isShow = true;
															},300)
														} else {
															popup.toast(res.data.msg);
														}
													},
													error (error) {
														console.log(error)
													},
												})

											} else {
												popup.toast("上传失败，请重新上传");
											}
										} else {
											popup.toast(res.data.msg);
										}
									},
									error () {
										popup.loading(false);
										popup.toast("定制图片失败，请重试");
									}
	              });
	            } else {
								popup.loading(false);
	              popup.toast(res.errorMsg);
	            }
	          },
	          error: function (e,e1) {
							popup.loading(false);
	            if(e1=="timeout"){
	                 popup.toast("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
	             }else{
	                 popup.toast("上传失败，请检查网络后重试("+e1+")");
	             }
	          }
	        });
	      }
			},
			handleRule() {
				location.href = "/t-18561.html";
			}
		},
	}
</script>
