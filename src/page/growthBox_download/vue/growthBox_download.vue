<template>
  <div>
    <div class="small">
      <div class="circle1 animated fadeIn"><img src="//9i.dvmama.com/free/2018/01/02/growth/0501%E6%96%91%E7%82%B9.png" alt=""></div>
      <div class="circle2 animated fadeIn"><img src="//9i.dvmama.com/free/2018/01/02/growth/0502%E6%96%91%E7%82%B9.png" alt=""></div>
      <div class="circle3 animated fadeIn"><img src="//9i.dvmama.com/free/2018/01/02/growth/0503%E6%96%91%E7%82%B9.png" alt=""></div>
      <div class="circle4 animated fadeIn"><img src="//9i.dvmama.com/free/2018/01/02/growth/0504%E6%96%91%E7%82%B9.png" alt=""></div>
      <div class="circle5 animated fadeIn"><img src="//9i.dvmama.com/free/2018/01/02/growth/0505%E6%96%91%E7%82%B9.png" alt=""></div>
    </div>
    <div class="head fadeIn animated"><img src="//9i.dvmama.com/free/2018/01/02/growth/01logo.png" alt=""></div>
    <div class="banner">
      <div class="mobile fadeInUp animated"><img src="//9i.dvmama.com/free/2018/01/02/growth/04%E6%89%8B%E6%9C%BA.png" alt=""></div>
      <template id="icon">
        <div  v-if="icon1" class="icon icon1 zoomIn animated"><img src="//9i.dvmama.com/free/2018/01/02/growth/0301%E5%A4%B4%E5%83%8F.png" alt=""></div>
        <div  v-if="icon2" class="icon icon2 zoomIn animated"><img src="//9i.dvmama.com/free/2018/01/02/growth/0302%E5%A4%B4%E5%83%8F.png" alt=""></div>
        <div  v-if="icon3" class="icon icon3 zoomIn animated"><img src="//9i.dvmama.com/free/2018/01/02/growth/0303%E5%A4%B4%E5%83%8F.png" alt=""></div>
      </template>
    </div>
    <div class="btn fadeIn animated" @click="btn"></div>
  </div>
</template>
<script>
  import util from "../../../common/js/utils.es6"
  import $ from 'jquery';
  export default {
    mounted(){
      var _this=this;
      　$(".mobile").on("webkitAnimationStart",function () {
        setTimeout(function () {
          _this.icon1=true;
          setTimeout(function () {
            _this.icon2=true;
          },400);
          setTimeout(function () {
            _this.icon3=true;
          },800);
        },300);
       });
    },
    data(){
      return {
        icon1:false,
        icon2:false,
        icon3:false
      }
    },
    methods:{
      btn(){
        if(util.utils.isIOS()){
          window.location.href="https://itunes.apple.com/cn/app/apple-store/id1371320295?mt=8";
        }else if(util.isAndroid()){
          window.location.href="http://sj.qq.com/myapp/detail.htm?apkName=com.dvd.growthbox";
        }
      }
    }
  }
</script>
<style scoped lang="sass" lang="scss">
  @import "../css/animate.css";
  .head{
    width: 1.33rem;
    margin-left: 1.18rem;
    margin-top: 0.58rem;
  }
  .head img{
    width: 1.33rem;
  }
  .banner{
    width: 3.75rem;
    position: relative;
  }
  .banner img{
    width: 3.75rem;
  }
  .btn{
    position: fixed;
    bottom: 0.1rem;
    height: 0.82rem;
    width: 3.75rem;
    background-size: 3.75rem 0.82rem;
    background-repeat: no-repeat;
    background-image: url("//9i.dvmama.com/free/2018/01/02/growth/02%E4%B8%8B%E8%BD%BD%E6%8C%89%E9%92%AE.png");
  }
  .icon{

  }
  .icon1{
    position: absolute;
    top: 1.32rem;
    left: 0.25rem;
    width: 1.08rem;
    img{
      width: 1.08rem;
    }
  }
  .icon2{
    position: absolute;
    top: 2.02rem;
    left: 2.5rem;
    width: 0.77rem;
    img{
      width: 0.77rem;
    }
  }
  .icon3{
    position: absolute;
    top: 0.72rem;
    right: 0.5rem;
    width: 0.83rem;
    img{
      width: 0.83rem;
    }
  }
  .small>div{
    position: fixed;
  }
  .circle1{
    width: 0.3rem;
    right: 0.38rem;
    top:0.65rem;
    img{
      width: 0.3rem;
    }
  }
  .circle2{
    width: 0.3rem;
    left: 0.28rem;
    top:3.64rem;
    img{
      width: 0.3rem;
    }
  }
  .circle3{
    width: 0.12rem;
    left: 0.5rem;
    top:2.9rem;
    img{
      width: 0.12rem;
    }
  }
  .circle4{
    width: 0.22rem;
    right: -0.1rem;
    top:4.3rem;
    img{
      width: 0.22rem;
    }
  }
  .circle5{
    width: 0.52rem;
    left:-0.2rem;
    top:1.5rem;
    img{
      width: 0.52rem;
    }
  }
</style>
