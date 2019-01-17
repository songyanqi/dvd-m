<template>
    <div class="hot_activity_cotnainer index_model bd_goods_2" :style="{ marginTop:data.marginTop }">
        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="df_new_model_con" :style="styleObject">
            <div class="df_new_model_con">
                <div class="df_new_title_3" style="overflow: hidden;" :style="{height: (data.body.imageHeight ? data.body.imageHeight / 100 : 1.8) + 'rem'}">
                    <a :href="data.body.command.content" @click="clickAnalysis" position="0" :style="{height: (data.body.imageHeight ? data.body.imageHeight / 100 : 1.8) + 'rem'}">
                      {{(data.body.imageHeight ? data.body.imageHeight / 100 : 1.8)}}

                        <img class="newImage" :style="{width: '100%', display: inline, height: (data.body.imageHeight ? data.body.imageHeight / 100 : 1.8) + 'rem'}" v-lazy="data.body.imageUrl">
                    </a>
                    <span class="up_arrow" :style="styleSpan"></span>
                </div>
                <bd_goods_0 :data = 'data'></bd_goods_0>
            </div>
        </div>
    </div>
</template>

<script>
//     import './bd_goods_2.scss'
    import bd_goods_2 from './bd_goods_2.new.es6'
    export default bd_goods_2
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "bd_goods_2";
</style>
