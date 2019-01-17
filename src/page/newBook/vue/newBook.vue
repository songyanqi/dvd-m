<style scoped>

</style>

<template>
  <div>
    <banner></banner>
    
    <lmain></lmain>
  </div>
</template>


<script>
  import banner from './newBanner.vue'
  import lmain from './newMain.vue'
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
