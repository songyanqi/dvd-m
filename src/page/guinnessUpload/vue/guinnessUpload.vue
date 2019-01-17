<template>
  <div>
    <div class="all">
      <div class="background">
        <div class="title">大V店鼓励妈妈们每天为孩子阅读，记录的照片上传后将用于挑战吉尼斯世界记录。</div>
      </div>
      <div class="white_box">
        <div class="require">照片要求</div>
        <div class="rule">1. <span style="font-size: 0.16rem;color:red;">请按示例姿势拍照</span>，照片须以图书为主体，图书占比不小于50%。</div>
        <div class="rule">2. 照片须符合活动主题，记录孩子或家长与图书的合照。</div>
        <div class="rule">3. 每日请上传明显不同照片，如：不同的书、不同的人。</div>
        <div class="rule">4. 照片大小不超过10mb；请勿使用ps或修图软件（如：美颜相机、美图秀秀等）。</div>
        <div class="example">
          <div>
            <img class="big_img" src="http://9i.dvmama.com/activity/2018/03/17/1600_1600_bd79620fe1ab2f6939ce8a3e068fd5d5.jpeg" alt="">
            <img class="small_img" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/success.png" alt="">
          </div>
          <div>
            <img class="big_img" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/19/pic3.png" alt="">
            <img class="small_img" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/success.png" alt="">
          </div>
        </div>
      </div>
      <div class="show_img" v-if="imgUrl != ''">
        <input type="file" class="show_file" accept="image/*">
        <img :src="imgUrl" alt="" v-if="!error">
        <div class="mask" v-if="error">
          <img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/box%20reload.png" alt="">
          <div>上传失败</div>
        </div>
      </div>
      <template v-if="imgUrl == ''">
        <input type="file" class="file" accept="image/*">
        <div class="btn">添加图片</div>
      </template>
      <template v-if="imgUrl != ''">
        <div class="btn" @click="submit">立即上传</div>
      </template>
      <div style="width: 100%;margin-top:0.1rem;color:#666666;line-height: 0.1rem;height: 0.4rem;text-align: center" :style="{ marginBottom:imgUrl== '' ? '0.4rem' : '0.1rem'}">上传后点击预览图片可以更换</div>

    </div>
  </div>
</template>
<script>
  import ajaxFileUpload from 'dvd-service-js-ajax-file-upload';
  import login from 'dvd-service-js-login';
  import api from "../../../common/js/api.es6"
  import popup from "dvd-service-js-popup"
  import $ from 'jquery';

  export default {
    data(){
      return {
        userId:login.getUserId(),
        imgUrl:"",
        error:false,
        log:""
      }
    },
    watch:{
      imgUrl(){
        var _this=this;
        setTimeout(function () {
          _this.show_file();
        },1000)
      }
    },
    mounted(){
      this.$nextTick(function () {
        $("body").addClass("loaded");
        this.addImg();
      })
    },
    methods:{
      show_file(){
        var that = this;
        var addBtn = $("input.show_file");
        addBtn.change(function () {
          var files = addBtn.get(0).files;
          popup.loading();
          that.pullFile(files[0]);
        });
      },
      addImg(){
        var that = this
        var addBtn = $("input.file");
        addBtn.change(function () {
          var files = addBtn.get(0).files;
          popup.loading();
          that.pullFile(files[0]);
        });
      },
      pullFile(file){
        var picStr = 'guinness';
        var data = new FormData();
        var that = this;
        data.append(picStr, file);
        $.ajax({
          type: "POST",
          url: '/upload_guinness.php?owner_id=2368684',
          data: data,
          cache: false,
          contentType: false,    //不可缺
          processData: false,    //不可缺
          dataType: "json",
          success: function (data) {
            if (data && data.data && data.data.guinness && data.data.guinness.src){
              popup.loading(false);
              that.imgUrl=data.data.guinness.src;
              that.log=data.log;
            }
          },
          error: function (e) {
            popup.loading(false);
          }
        });
      },
      submit(){
        if (!login.isLogined()) {
          location.href = '/login.html?referer=' + encodeURIComponent(location.href);
        }else{
          if(this.imgUrl == ""){
            popup.toast("请选择图片~");
          }else{
            var obj={
              "imgUri":this.imgUrl,
              "log":this.log
            }
            api("/api/mg/content/guinness/signCommit",obj).then( res => {
              if(!res.code){
                if(res.data && res.data.msg){
                  popup.toast(res.data.msg);
                  if(localStorage.getItem('imgUrl')){
                    localStorage.removeItem('imgUrl');
                  }
                  localStorage.setItem("imgUrl",obj.imgUri);
                  history.back();
                }
              }else{
                if(res.code == '100024'){
                  popup.toast(res.data.msg);
                }else{
                  popup.toast("error"+res.data.msg+res.code);
                }
              }
            })
          }
        }
      }
    }
  }
</script>
<style scoped lang = "sass" lang="scss" rel="stylesheet/scss">
  .all{
    padding-bottom: 1.63rem;
    min-height: 6.23rem;
    background: linear-gradient(to bottom, #FFECEA, #FFE9F0);
    .background{
      width: 3.75rem;
      height: 1.12rem;
      background-size: 3.75rem 1.12rem;
      background-repeat: no-repeat;
      background-image: url("http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/bk2.png");
      .title{
        color:#FFF9FB;
        line-height: 0.27rem;
        font-size: 0.18rem;
        width: 3.43rem;
        text-align: center;
        margin:0 auto;
        padding-top:0.2rem;
      }
    }
    .white_box{
      width: 3.15rem;
      height: 3.48rem;
      background: #FFFFFF;
      margin: 0 auto;
      margin-top:-0.1rem;
      border-radius: 5px;
      box-shadow:0 3px 7px #F2BECA;
      padding: 0.2rem 0.1rem;
      margin-bottom: 0.4rem;
      .require {
        text-align: center;
        color: #333333;
        font-size: 0.18rem;
        margin-bottom: 0.1rem;

      }
      .rule{
        color:#666666;
        font-size:0.12rem;
        line-height:0.21rem;
        margin-bottom: 0.05rem;
      }
      .example{
        font-size: 0;
        margin-top: 0.2rem;
        div{
          margin-left: 0.05rem;
          margin-right: 0.05rem;
          display: inline-block;
          vertical-align: top;
          width: 1.47rem;
          position: relative;
          height: 1.41rem;
          .big_img{
            width: 1.47rem;
            height: 1.41rem;
          }
          .small_img{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0.28rem;
            height: 0.28rem;
          }
        }
      }
    }
    .show_img{
      width: 3.35rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 2.7rem;
      position: relative;
      margin: 0 auto;
      margin-bottom: 0.4rem;
      padding: 0.1rem;
      border-radius: 5px;
      /* padding: 0.1rem; */
      /*background-repeat: no-repeat;*/
      /*background-size: cover;*/
      /*background-position: center;*/
      overflow: hidden;
      img{
        width: 3.15rem;
        border-radius:2px;
        position: absolute;
        height: 2.7rem;
        object-fit: cover;
      }
      .show_file{
        width: 3.35rem;
        height: 2.7rem;
        position: absolute;
        opacity: 0;
        top: 0;
        right: 0;
        z-index: 3;
      }
      .mask{
        width: 3.15rem;
        height: 2.5rem;
        border-radius:2px;
        background: #000000;
        opacity: 0.7;
        img{
          width: 0.35rem;
          height: 0.35rem;
          margin-top: 0.9rem;
          margin-left: 1.4rem;
        }
        div{
          text-align: center;
          width: 100%;
          color:#FFFFFF;
          margin-top: 0.1rem;
          font-size: 0.16rem;
        }
      }
    }
    .btn{
      text-align: center;
      width: 2.75rem;
      height: 0.4rem;
      line-height: 0.4rem;
      margin: 0 auto;
      color:#FFFFFF;
      border-radius: 100px;
      background: linear-gradient(to right,#FF5C5C,#FA1862);
      z-index: 2;
    }
    .file{
      width: 2.75rem;
      height: 0.4rem;
      position: absolute;
      margin-left: 0.5rem;
      opacity: 0;
    }
  }
</style>
