<style scoped>

</style>


<template>
  <div>
    <!--<lheader :title="titleN" v-if="!isApp"></lheader>-->
    <com-top-title back :title="titleN"></com-top-title>
    <lmain></lmain>
  </div>
</template>


<script>
  import util from "../../../common/js/utils.es6";

//  import lheader from './order-header.vue'
  import lmain from './order-main.vue'

  export default {
    components: {
//      lheader: lheader,
      lmain:lmain,
      'com-top-title': require('dvd-service-com-title').default,
    },
    data(){
      return{
        titleN: '物流投诉',
        isApp: util.utils.isApp(),
      }
    },
    methods:{

    }
  }
</script>
