<template>
	<div class = "avatarWrapper" v-if = "response">
		<div class = "avatarTitle">
			<img @touchstart = "handleTouchStart"
					 @touchmove = "handleTouchMove"
					 @touchend = "handleTouchEnd"
					 v-lazy="response.data.posterUrl">
			<div class = "bigTip">长按保存，发送朋友，朋友圈</div>
		</div>
		<div class = "avatarStep">
			<img @touchstart = "handleTouchStart"
					 @touchmove = "handleTouchMove"
					 @touchend = "handleTouchEnd"
					 v-lazy="response.data.avatarUrl">
			<div class = "smallTip">长按保存，替换微信头像</div>
		</div>
		<div @click = "handleRule" class = "avatarTips">活动规则</div>
		<div class = "avatarCont" v-if = "Number(response.data.joinCount) > '0'">
			<p class = "avatarListTips">共{{response.data.joinCount}}人参与测试</p>
			<div class = "avatarLists">
				<div class = "avatarNavs">
					<img v-for = "item of response.data.joinList" :src="item.smallAvatarUrl">
					<span v-if = "isshowdot" style = "width: 0.55rem;height: 0.55rem;lineHeight: 0.5rem;" class = "avatarListDot">
					...</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import nativeAncestry from '../../../common/js/nativeAncestor.js';
	import popup from 'dvd-service-js-popup';
	import layout from "../../index/module/index/layout.es6";
  import $ from 'jquery';

	export default {
		data() {
			return {
				// uploadPic: '//9i.dvmama.com/avatar_poster/2017/upload_addV.png',
				// avatarPoster: "",
				imgrotate: 0,
				// ceshi
				// firstUrl: '',
			}
		},
		components: {},
		props: ["response","isshowdot",'avatarimg'],
		created() {},
		watch: {},
		mounted () {
		},
		methods: {
			handleTouchStart (e) {
        this.isLongTabTime = setTimeout(() => {
          if (this.isLongTap) {
            let picSrc = e.target.getAttribute('src');
            // let idx = picSrc.indexOf("?");
            // picSrc = picSrc.substr(0,idx);
            nativeAncestry.savePic(picSrc);
          }
        },500);
      },
      handleTouchMove (e) {
        this.isLongTap = false;
        clearTimeout(this.isLongTabTime);
      },
      handleTouchEnd (e) {
        this.isLongTap = true;
        clearTimeout(this.isLongTabTime);
      },
      handleTouchCancle (e) {
        this.isLongTap = true;
        clearTimeout(this.isLongTabTime);
      },
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
					that.response.data.avatarUrl = "//9i.dvmama.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif";

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
	          	// that.firstUrl = res.data.shop_logo.src;
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
										if (!res.code) {
											// that.uploadPic = res.data.avatarUrl;
											// that.avatarPoster = res.data.posterUrl;
											if (res.data.status == "0") {
												$.ajax({
													url: "/api/mg/sale/pinkday/getInfo",
													type: "POST",
													data: layout.strSign('uploadPink',{}),
													dataType: "JSON",
													success(resPost) {
														if (resPost.code == "0") {
															that.response.data.avatarUrl = resPost.data.avatarUrl;
															that.response.data.avatarPoster = resPost.data.posterUrl;
															that.response.data.joinList = resPost.data.joinList;
															that.response.data.joinCount = resPost.data.joinCount;
														}
													}
												})


											}
										} else {
											popup.toast(res.data.msg);
										}
									},
									error () {
										popup.toast("定制图片失败，请重试");
									}
	              });
	            } else {
	              popup.toast(res.errorMsg);
	            }
	          },
	          error: function (e,e1) {
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
