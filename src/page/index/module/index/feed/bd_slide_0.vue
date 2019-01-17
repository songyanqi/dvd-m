<template>
  <div class="bd_slide_0 swiper-container" v-if='data && data.body && data.body.dataList && data.body.dataList[0]'>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,idx) in data.body.dataList" :key="idx">
        <a :href="item.command.content" @click.stop="clickAnalysis" :position="item.position"
           :data-growing-idx="item.position">
          <!--<img class="swiper-lazy newImage" :data-v-lazy="'item.imageUrl'" :data-background="require('../../../src/common/img/img-lazy-loading.png')">-->
          <!--<img class="swiper-lazy newImage" :data-v-lazy="'item.imageUrl'">-->

          <!--<img class="newImage" :src="item.imageUrl" v-if="idx === 0" @load="initSwiper">-->
          <!--<img class="newImage" v-lazy="item.imageUrl" v-else>-->

          <img class="newImage" v-lazy="item.imageUrl" v-if="idx === 0" @load="initSwiper">
          <img class="newImage" v-lazy="item.imageUrl" v-else>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  //    import './bd_slide_0.scss'
  import slide from './bd_slide_0.es6'
  export default slide
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "bd_slide_0";

  .bd_slide_0 {
    .swiper-slide {
      height: 1.6rem;
    }
    .newImage {
      width: 100%;
      height: 1.6rem;
      /*background: url(./img/bd_slide_0/lazyload.jpg) no-repeat;*/
      /*background-size: 100% 100%;*/
    }
  }
</style>
