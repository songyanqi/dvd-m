<template>
  <div>
    <div class="top" v-if="login.isBuyer()">
      <div class="title" v-if="name || headImg">我的所属店铺</div>
      <div class="title-img" v-if="headImg"><img :src="headImg" alt=""></div>
      <div class="sub-title" v-if="name">{{name}}</div>
      <template v-if="haveInviteCode == 1">
        <div @click="submitInviteCode" class="change-btn" :class="{'gray-btn-change':canChangeFlag == 0}">修改所属店铺</div>
      </template>
      <template v-if="haveInviteCode == 0">
        <div @click="submitInviteCode" class="change-btn" :style="{'marginTop':'0.7rem'}">添加邀请人</div>
      </template>
      <!--<div>修改邀请人</div>-->
      <div class="desc">一个用户只能有一个所属店铺</div>
      <div class="desc">只能修改一次，修改后无法再次修改</div>
    </div>
    <div class="my-invite">
      <div class="sub-title">我的邀请码</div>
      <div class="copy">
        <div class="code">{{myCode}}</div>
        <div class="copy-btn" @click="copy($event)">复制</div>
      </div>
    </div>
    <div style="text-align: center;">
      <div @click="goInvite" class="bottom-btn">邀请好友注册得奖励</div>
    </div>


  </div>
</template>
<script>
  import popup from "dvd-service-js-popup";
  import $ from 'jquery';
  import encrypt from 'dvd-service-js-encrypt';
  import login from "dvd-service-js-login";
  import hybrid from "dvd-service-js-hybrid";
  export default {
    mounted(){
      this.getInitData();
    },
    data(){
      return {
        myCode:"",
        haveInviteCode:"",
        headImg:"",
        canChangeFlag:0,
        name:"",
        url:"",
        login:login
      }
    },
    methods:{
      copy(event){
        hybrid.System.setClipboardData({
          "data":this.myCode,
          "event":event.target,
          success(res){
            if(res){
              console.log(res);
              popup.toast("复制成功");
            }
          },
          error(e){
            if(e){
              popup.toast("复制失败");

            }
          }
        })
      },
      goInvite(){
        window.location.href=this.url;
      },
      submitInviteCode(){
        if(this.canChangeFlag == 1){
          location.replace('/m/myInvite_new.html');
        }else{
          popup.toast("不可修改");
        }
      },
      getInitData(){
        var that=this;
        $.ajax({
          cache: false,
          async: true,
          url: "/api/mg/auth/inviter/getCode",
          type: 'post',
          data: encrypt.ajax({

          }),
          dataType: 'json',
          success(res) {
            if(!res.code){
              console.log(res);
              if(res.data.myCode){
                console.log(res.data.myCode);
                that.myCode=res.data.myCode;
              }
              if(res.data.status){
                that.haveInviteCode=res.data.status;
              }
              if(res.data.userName){
                that.name=res.data.userName;
              }
              if(res.data.url){
                that.url=res.data.url;
              }
              if(res.data.flag){
                that.canChangeFlag=res.data.flag;
              }
              if(res.data.headImg){
                that.headImg=res.data.headImg;
              }
            }else{
              popup.toast(res.data.msg);
            }
          },
          error(error) {
            console.error('ajax error');
          }
        });
      }
    }
  }
</script>
<style scoped lang="sass" lang="scss">
  .top{
    text-align:center;
    div{
      width: 100%;
      text-align: center;
    }
    .title{
      margin-top: 0.3rem;
      width: 100%;
      font-size: 0.18rem;
      color:#333333;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .title-img{
      margin-top: 0.2rem;
      width: 100%;
      img{
        border-radius: 50%;
        width: 0.66rem;
        height: 0.66rem;
      }
    }
    .sub-title{
      font-size: 0.14rem;
      color:#333333;
      margin-top: 0.1rem;
    }
    .change-btn{
      width: 1rem;
      height: 0.24rem;
      line-height: 0.24rem;
      text-align: center;
      position: relative;
      font-size: 0.12rem;
      color: #FF4A7D;
      margin-top: 0.1rem;
      display: inline-block;
      &:after{
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
         left: 0;
         top: 0;
        transform-origin: 0 0;
        border-radius: 0.3rem;
        border: 1px solid #FF4A7D;
        transform: scale(0.5);
      }
    }
    .gray-btn-change{
      color:#333333;
      &:after{
         border: 1px solid #333333;
       }
    }
    .desc{
      color: #666666;
      font-size: 0.11rem;
      margin-top: 0.1rem;
    }
  }
  .my-invite{
    text-align: center;
    margin-top: 0.5rem;
    .sub-title{
      font-size: 0.14rem;
      color:#333333;
    }
    .copy{
      margin-top: 0.15rem;
      font-size: 0;
      div{
        display: inline-block;
        color:#FF4A7D;
        vertical-align: middle;
      }
      .code{
        font-size: 0.24rem;
      }
      .copy-btn{
        width: 0.6rem;
        height: 0.24rem;
        color:#FF4A7D;
        line-height: 0.24rem;
        margin-left: 0.1rem;
        text-align: center;
        font-size: 0.12rem;
        position: relative;
        &:after{
           content: '';
           position: absolute;
           width: 200%;
           height: 200%;
           left: 0;
           top: 0;
           transform-origin: 0 0;
           border-radius: 0.3rem;
           border: 1px solid #FF4A7D;
           transform: scale(0.5);
         }
      }
    }
  }
  .bottom-btn{
    width: 2.55rem;
    height: 0.4rem;
    display: inline-block;
    border-radius: 0.6rem;
    color:#FFFFFF;
    font-size: 0.14rem;
    line-height: 0.4rem;
    text-align: center;
    margin-top: 0.4rem;
    background: linear-gradient(to right,#FF613C,#FA1862);
  }
</style>
