<template>
  <div class="swiper-container swiper-preview-container">
    <div class="swiper-wrapper">
      <!--第一个swiper-->
      <div class="swiper-slide swiper-slide-pl" v-for="(item,index) in imageList">
        <div class="pre-pic">
          <img :src="item.imgSplice ? item.imgSplice : item.imgOriginal" alt="">
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    props:['imageList'],
    watch:{
      imageList(){
        console.log(this.imageList.length);
      }
    },
    mounted() {
      this.$nextTick(function() {
        new Swiper('.swiper-preview-container', {
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          initialSlide:0,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:false,//修改swiper的父元素时，自动初始化swiper
        });

      });
    }
  }

</script>
