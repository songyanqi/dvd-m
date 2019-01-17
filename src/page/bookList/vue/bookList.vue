<style scoped>

</style>

<template>
  <div>
    <banner></banner>
    <lmain></lmain>
  </div>
</template>


<script>
  import banner from './bookBanner.vue'
  import lmain from './bookMain.vue'
  export default {
    components: {
      banner:banner,
      lmain:lmain
    },
    data () {
      return{

      }
    }
  }
</script>
