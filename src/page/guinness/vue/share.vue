<template>
  <div>
    <div class="mask" @click="close"></div>
    <div class="center">
      <img :src="imgUrl" alt="" @click="save">
    </div>
  </div>
</template>
<script>
  import util from "../../../common/js/utils.es6"
  import nativeAncestor from "../../../common/js/nativeAncestor.js"
  export default {
    props:['img'],
    computed:{
      imgUrl(){
        return this.img;
      }
    },
    data(){
      return {
        isApp:util.utils.isApp()
      }
    },
    methods:{
      save(){
        var _this=this;
        if(this.isApp){
          nativeAncestor.savePic(_this.imgUrl);
        }
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
    background: #ffffff;
    opacity: 0.7;
    z-index: 2;
  }
  .center{
    height: 5.3rem;
    width: 2.09rem;
    background: #ffffff;
    position: fixed;
    z-index: 3;
    top: 50%;
    left: 50%;
    margin-top: -2.36rem;
    margin-left: -1.045rem;
    padding: 0.1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 10px;
    img{
      height: 5.1rem;
      width: 1.89rem;
    }
  }
</style>
