<template>
  <div class="all">
    <div class="get" v-if="isLogin && isRedPacket==1" @click="goDeatil"></div>
    <div class="no_get" v-if="isLogin && isRedPacket!=1" @click="goDeatil"></div>
    <div class="no_login" v-if="!isLogin" @click="login"></div>
  </div>
</template>
<script>
  import util from "../../../common/js/utils.es6"
  import login from "dvd-service-js-login"
  import native from "dvd-service-js-native"
  export default{
    props:['response'],
    data(){
        return{
          isApp:util.utils.isApp(),
          isRedPacket:this.response,
          isLogin:null
        }
    },
    mounted(){
        this.init();
    },
    methods:{
      login(){
        if (this.isApp) {
          native.Account.login()
        } else {
          window.location.href = '/login.html?' + 'referer=' + encodeURIComponent(window.location.href)
        }
      },
      getStaus(){
        var token=login.getDvdsid().substr(32,8);
        if(token=="00000001"){
          return 0;
        }else{
          if(token.substr(7,1)==1){
            return 1;
          }else{
            return 3;
          }
        }
      },
      init(){
        if(this.getStaus()==0){
          this.isLogin=false;
        }else {
          this.isLogin = true;
        }
      },
      goDeatil(){
        if(this.isApp){
          native.Browser.open({
            url: "/redPacket.html"
          })
        }else{
          window.location.href="/redPacket.html";
        }
      }
    }
  }
</script>
<style scoped>
  .all{
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    box-sizing: border-box;
  }
  .get{
    width: 3.75rem;
    height: 0.94rem;
    background-size: 3.75rem 0.94rem;
    background-image: url('//9i.dvmama.com/free/2017/10/12/%E7%BA%A2%E5%8C%85_01.png');
  }
  .no_get{
    width: 3.75rem;
    height: 0.94rem;
    background-size: 3.75rem 0.94rem;
    background-image: url('//9i.dvmama.com/free/2017/10/12/%E7%BA%A2%E5%8C%85_03.png');
  }
  .no_login{
    width: 3.75rem;
    height: 0.94rem;
    background-size: 3.75rem 0.94rem;
    background-image: url('//9i.dvmama.com/free/2017/10/16/btn.png');
  }
</style>
