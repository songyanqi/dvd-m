<style scoped>

</style>


<template>
    <div>
      <lheader :title="titleN" v-if="!isApp"></lheader>
      <lmain></lmain>
    </div>
</template>


<script>
  import util from "../../../common/js/utils.es6";

  import lheader from './service-header.vue'
  import lmain from './service-main.vue'

  export default {
    components: {
      lheader: lheader,
      lmain:lmain
    },
    data(){
      return{
        titleN: '申请售后',
        isApp: util.utils.isApp(),
      }
    },
    methods:{

    }
  }
</script>
