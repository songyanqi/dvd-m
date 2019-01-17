<style scoped lang = "sass" lang="scss" rel="stylesheet/scss">
  .pic {
    width:1.2rem;
    height:1.2rem;
    margin: 1.4rem auto 0.2rem;
    img {
      display: block;
      width:100%;
      height:100%;
      max-width: 100%;
    }
  }
  p{
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #666;
  }
  .cont {
    margin-top:0.4rem;
    font-size: 14px;
    text-align: center;
    color: #666;
    a {
      color: #FF4A7D;
    }
  }
</style>


<template>
  <div>
    <div class="pic">
      <img src="//9i.dvmama.com/free/member/after_service.png" alt="">
    </div>
    <p>亲爱的，已经不能申请售后了</p>
    <p>订单完成的15天内，才可以哦</p>
    <div class="cont">查看<a href="javascript:void(0)" @click="toPolicy">售后政策</a>，如需人工帮助，可联系客服进行咨询</div>
  </div>
</template>


<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      toPolicy(){
        window.location.href = "/policy.html"
      }
    }
  }
</script>
