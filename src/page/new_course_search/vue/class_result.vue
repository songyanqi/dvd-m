<template>
  <div class="vschool_searchlist">
    <div class="list_item" v-for="(item, index) in list" :class="{classroom:(item.courseType == 2 || item.courseType == 3)}" @click="go_href(item.command.content,item.courseId,item.courseType)">
      <div>
        <div class="vschool_listImg" :style="'background-image: url('+item.courseCover+')'">
          <span v-show="item.coursePrice != ''" v-if="item.courseType == 1">￥{{item.coursePrice}}</span>
        </div>
        <div class="vschool_listText">
          <div :class="{vschool_headertitle:item.courseType == 2}">{{item.courseTitle}}</div>
          <div>{{item.teacherName}}</div>
          <div>
            <span class="text_r border_r">{{item.readTimes}}</span>
            <span class="text_l">{{item.startTime*1000 | timemmss}}</span>

          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-if="no_data">
      <div class="noData_img"><img src="//9i.dvmama.com/free/2018/01/23/1111111.png" alt=""></div>
      <div class="noData_text">没找到哟，换个关键词试试吧~</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';

  Vue.filter('timemmss', function(value) {
    var newDate = new Date(value);
    Date.prototype.format = function(format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    };
    return newDate.format("yyyy-MM-dd hh:mm")
  });
  export default {
    data:function(){
      return{
      }
    },
    props:["list","no_data"],
    created:function () {
    },
    methods:{
      go_href(url,id,type){
        this.$emit("save",url,id,type);
      },
    }
  }
</script>
<style scoped>
  .vschool_searchlist{
    width: 100%;
    min-height: 10px;
    padding-top: 1rem;
  }
  .vschool_searchlist > .list_item{
    display: block;
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 1px;
    overflow: hidden;
    margin-bottom: 0.25rem;
    height: 0.76rem;
  }
  .vschool_searchlist > .list_item > div{
    width: 3.55rem;
    height: .76rem;
    margin: 0 0.1rem;
  }
  .vschool_listImg{
    float: left;
    height: 100%;
    width: 1.1rem;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
  }
  .vschool_listImg span{
    display: inline-block;
    background-color: #FF4A7D;
    color: #FFF;
    font-size: .11rem;
    border-radius: 3px;
    height: .18rem;
    padding: 0 2px;
    text-align: center;
    line-height: .18rem;
    margin: .05rem;
  }
  .vschool_listText{
    width: 2.18rem;
    height: 100%;
    margin-left: .1rem;
    float: left;
    position: relative;
  }
  .classroom .vschool_listImg{
    width: .88rem;
  }
  .classroom .vschool_listText{
    width: 2.57rem;
  }
  .classroom .vschool_listText .vschool_headertitle{
    background-image: url(//9i.dvmama.com/free/video_camera.png);
    background-repeat: no-repeat;
    text-indent: .18rem;
    background-size: .14rem .08rem;
    background-position: 0 .06rem;
  }
  .vschool_listText > div:nth-of-type(1){
    overflow: hidden;
    line-height: 0.2rem;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: .14rem;
    color: #333;
  }
  .vschool_listText > div:nth-of-type(1) img{
    width: .14rem;
    height: .08rem;
  }
  .vschool_listText > div:nth-of-type(2){
    color: #999999;
    font-size: .12rem;
    margin-top: 0.05rem;
  }
  .vschool_listText > div:nth-of-type(3){
    color: #999999;
    font-size: .12rem;
    width: 100%;
    margin-top: 0.05rem;
  }
  .vschool_listText > div:nth-of-type(3) > span{
    display: inline-block;
    float: left;
  }
  .border_r{
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    margin-right: 0.1rem;
  }
  .noData{
    margin-top: 1.06rem;
  }
  .noData_img{
    width: 1.06rem;
    height: 0.73rem;
    margin-left: 1.35rem;
    margin-bottom: 0.2rem;
  }
  .noData img{
    width: 1.06rem;
    height: 0.73rem;
  }
  .noData .noData_text{
    text-align: center;
    width: 100%;
    color:#666666;
    font-size: 0.13rem;
  }
</style>
