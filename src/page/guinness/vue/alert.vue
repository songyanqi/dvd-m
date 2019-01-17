<template>
  <div>
    <div class="mask"></div>
    <div class="center">
      <div class="text1" v-if="signCount < 21">成功记录第{{signCount}}天挑战！</div>
      <div class="text1" v-if="signCount >= 21">太棒了！21天挑战完成！</div>

      <div class="text2" v-if="signCount == 21">获得吉尼斯世界纪录荣誉勋章一枚！</div>
      <div class="text2" v-if="signCount >= 22">已经坚持打卡21天啦，为你的坚持点赞</div>
      <div class="text2" v-if="complete != '' && signCount < 21">收获{{complete}}吉尼斯勋章！</div>
      <div class="text2" v-if="complete == '' && signCount < 21">再坚持{{21 - parseInt(signCount)}}天，即可收获吉尼斯勋章!</div>
      <div class="close" @click="close"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/Circular%20Guan%20pop.png" alt=""></div>
      <div class="big_img"><img :src="imgUrl" alt=""></div>
      <template v-if="addressFlag">
        <div class="add" @click="content_btn" v-if="signCount >= 21">添加收货地址</div>
        <div class="show_text" v-if="signCount >= 21">填写地址，图书相册挑战吉尼斯成功后，我们将在15个工作日内勋章快递给您。</div>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    computed:{
      addressFlag(){
        return this.address
      },
      imgUrl(){
        this.img= this.img + "?x-oss-process=image/resize,m_fill,w_600,h_600,limit_0";
        if(this.count == 1){
          return this.img + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10";
        }else if(this.count == 3){
          return this.img + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10";
        }else if(this.count == 10){
          return this.img + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10";
        }else if(this.count == 21){
          return this.img + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10";
        }else{
          return this.img
        }
      },
      signCount(){
        return this.count;
      },
      complete(){
        if(this.count == 1){
          return "第一个"
        }else if(this.count == 3){
          return "第二个"
        }else if(this.count == 5){
          return "第三个"
        }else{
          return ""
        }
      }
    },
    props:['img','count','address'],
    mounted() {

    },
    methods:{
      content_btn(){
        if(localStorage.getItem("fromGuinness")){
          localStorage.removeItem("fromGuinness");
        }
        localStorage.setItem("fromGuinness","123123123");
        window.location.href="/user_address.html";
      },
      close(){
        this.$emit("close",false);
      }
    }
  }
</script>
<style scoped lang="sass" lang="scss">
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    opacity:0.5;
    z-index: 2;
  }
  .center{
    display: inline-block;
    width: 2.7rem;
    position: fixed;
    top: 1.73rem;
    z-index: 3;
    left: 50%;
    margin-left: -1.35rem;
    background: #92AEFF;
    border-radius: 4px;
    .text1{
      color:#FFFFFF;
      font-size: 0.18rem;
      width: 100%;
      text-align: center;
      margin-top: 0.25rem;
    }
    .text2{
      color:#FFFFFF;
      font-size: 0.14rem;
      width: 100%;
      text-align: center;
      margin-top: 0.1rem;
    }
    .close{
      display: inline-block;
      width: 0.16rem;
      height: 0.16rem;
      position: absolute;
      top: 0.07rem;
      right: 0.07rem;
      img{
        width: 0.16rem;
        height: 0.16rem;
      }
    }
    .big_img{
      width: 1.7rem;
      height: 1.7rem;
      border-radius:2px;
      margin: 0 auto;
      margin-bottom: 0.47rem;
      margin-top:0.1rem;
      img{
        width: 1.7rem;
        height: 1.7rem;
      }
    }
    .add{
      width: 1.8rem;
      height: 0.36rem;
      text-align: center;
      line-height: 0.36rem;
      color: #FF4A7D;
      font-size: 0.14rem;
      position: relative;
      background: #FFFFFF;
      border-radius: 100px;
      margin: 0 auto;
      margin-bottom: 0.15rem;
      &:after{
         content: '';
         border: 1px solid #FF4A7D;
         position: absolute;
         top: 0;
         border-radius: 100px;
         left: 0;
         bottom: 0;
         transform: scale(0.5);
         right: 0;
         width: 200%;
         height: 200%;
         transform-origin: 0 0;
      }
    }
    .show_text{
      color:#012B4F;
      font-size: 0.12rem;
      width: 2.3rem;
      margin: 0 auto;
      margin-bottom: 0.2rem;
    }
  }
</style>
