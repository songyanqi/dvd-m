<template>
    <div class="hot_activity_cotnainer index_model bd_image_1_3" :style="[{ marginTop:data.marginTop },styleObject]">
        <tt_com_0 :data="data"></tt_com_0>

        <div class="model_con">
            <div class="dvd-index-module clearfix">
                <div class="index_activity" style="padding:0;margin:0;overflow:hidden;" :style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}">
                    <a :href="data.body.dataList[0].command.content" style="padding:0;margin:0;" @click="clickAnalysis" position="0">
                      <!-- <img v-lazy="data.body.dataList[0].imageUrl" :style="{width:'100%', height:data.body.height + 'px'}"> -->
                      <!--<img class = "newImage" v-lazy="data.body.dataList[0].imageUrl" style="width:100%;height: 1.41rem;"
                           :style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}">-->

                      <!--预览图-->
                      <img class="bg" v-lazy="data.body.dataList[0].previewUrl" v-if="data.body.dataList[0].previewUrl" :style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}">

                      <!--&lt;!&ndash;gif&ndash;&gt;-->
                      <!--<img class="gif" v-lazy="data.body.dataList[0].imageUrl"-->
                           <!--:style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}"-->
                           <!--v-if="!data.body.dataList[0].mp4Url || ua.isAndroid() || ua.isIos() && ua.compareVersion(ua.getSysVersion(), '10.0.0') < 0 && data.body.dataList[0].imageUrl">-->
                      <!--&lt;!&ndash;视频:poster="topics[0].content && topics[0].content.headPic" &ndash;&gt;-->
                      <!--<video autoplay loop muted-->
                             <!--webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5"-->
                             <!--x5-video-player-fullscreen="false" style="object-fit: fill;"-->
                             <!--:style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}"-->
                             <!--v-else-if="data.body.dataList[0].mp4Url">-->
                        <!--<source :src="data.body.dataList[0].mp4Url" type="video/mp4"/>-->
                      <!--</video>-->

                      <!--不能自动播放，直接放gif了-->
                      <img class="gif" :src="data.body.dataList[0].imageUrl" :style="{height: data.body.height ? data.body.height / 100 + 'rem' : '1.41rem'}">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../../../common/css/util/all";
  .bd_image_1_3 {
    .index_activity {
      position: relative;
      .bg, .gif, video {
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
      }
    }
  }
</style>

<script>
    import './bd_image_0.scss'
    import bd_image_0 from './bd_image_1_3.es6'
    export default bd_image_0
</script>
