<template>
  <div id="introduction" v-html="introduce"></div>
</template>
<script>
  import api from "../../../common/js/api.es6"
  import {getQuery} from "../../../common/js/utils.es6"
  import native_box from "../../../common/js/native_box.js"
  import popup from "dvd-service-js-popup"
  import $ from 'jquery';
  export default {
    mounted(){
      this.init();
//      this.test();
    },
    watch:{
      music(){
        this.$emit("music",this.music);
      },
      growthBox(){
        this.$emit("growth",this.growthBox);
      }
    },
    data(){
      return {
        albumId:getQuery("albumId"),
        musicId:getQuery("musicId"),
        imgIndex:0,
        introduce:"",
        music:null,
        growthBox:getQuery("growthBox")
      }
    },
    methods:{
      webHeight(){
        var _this=this;
        _this.$nextTick(function () {

          //图片的渲染时间
          setTimeout(function(){
            console.log("$('#introduction').height()",$('#introduction').height());
          },200);

          var length=$("#introduction img").length;
          if(length==0){
            setTimeout(function(){
              native_box.Browser.showWebHeight({
                "webHeight": $('#introduction').height().toString()
              })
            },200)
          }else{
            var imgs=$("#introduction img");
            for(var i=0;i<imgs.length;i++){
              $(imgs[i]).css("max-width","100%");
              imgs[i].onload=function () {
                _this.imgIndex++;
                if(_this.imgIndex==imgs.length){
                  setTimeout(function(){
                    native_box.Browser.showWebHeight({
                      "webHeight": $('#introduction').height().toString()
                    })
                  },200)
                }
              }
            }
          }
        });
      },
      init(){
        var _this=this;
        var obj={
          "albumId":_this.albumId,
          "musicId":_this.musicId
        };
        api("https://box.api.davdian.com/content/music/getDetail",obj)
          .then(function (res) {
            if(!res.code){
              if(res.data.desc){
                _this.introduce=res.data.desc;
                _this.music=res.data.music;
                _this.webHeight();
              }else{
                popup.toast("小编加班加点补充中.....");
              }
            }else{

            }
          }).catch(function (e) {

        })
      },
      test(){
        var data =require("../json/musicDetail_intro.json");
        this.introduce=data.data.desc;
        this.webHeight();
      }
    }
  }
</script>
<style scoped>
  #introduction img{
    max-width: 100%;
  }
</style>
