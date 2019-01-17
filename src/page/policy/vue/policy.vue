<style lang="sass" lang="scss" rel="stylesheet/scss">

</style>


<template>
  <div>
    <!--<com-top-title :title="titleN"></com-top-title>-->
    <!--<lheader :title="titleN" v-if="!isApp"></lheader>-->
    <lmain></lmain>
  </div>
</template>


<script>
  import util from "../../../common/js/utils.es6";

  //  import lheader from './policy-header.vue';
  import lmain from './policy-main.vue';

  export default {
    components: {
      lmain: lmain,
//      'com-top-title': require('dvd-service-com-title'),
    },
    data(){
      return {
//        titleN: '售后政策',
        isApp: util.utils.isApp(),
      }
    },
    methods: {}
  }
</script>
