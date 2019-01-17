<template>
  <div class="banner">
    <div class="flist" v-for='(item,index) in list'>
      <div class="list" @click.stop="go_href(item.command.content)">
        <div class="left_img" :style="{'background-image':styleObject(item.albumCover)}"></div>
        <div class="list_content">
          <div class="list_title" v-text="item.albumTitle"></div>
          <div class="list_name" v-text="item.albumDesc"></div>
          <div class="new_time">
            <div class="list_time">
              <span>{{item.readTimes}}次播放 <span class="se_text">{{item.albumCount}}集</span></span>
            </div>
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
  export default {
    props:["list","no_data"],
    data(){
      return {

      }
    },
    mounted(){

    },
    methods:{
      go_href(url){
        this.$emit("save",url);
      },
      styleObject(item){
        return "url("+ item +")";
      }
    }
  }
</script>
<style scoped>
  .banner{
    background: #FFFFFF;
    padding-top: 1rem;
  }
  .big_img{
    text-align: center;
    height: 0.2rem;
    padding-top:0.13rem;
    padding-bottom:0.15rem;
    font-size: 0;
  }
  .big_img>div{
    display:inline-block;
    vertical-align: top;
  }
  .list_date{
    color:#333333;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    font-size: 0;
    height:0.2rem;
    line-height:0.2rem;
  }
  .list_date>div{
    display: inline-block;
    vertical-align: top;
  }
  .list_line{
    height: 0.01rem;
    background: #333333;
    width: 0.15rem;
    margin-top: 0.095rem;
  }

  .list1{
    margin-bottom: 0.1rem;
    background: #ffffff;
  }
  .list1 .flist:last-child .line{
    background: #fff;
  }

  .list{
    font-size: 0;
    height: 0.7rem;
    padding:0 0.1rem;
    position: relative;
    margin-bottom: 0.25rem;
  }

  .list>div{
    display: inline-block;
    vertical-align: top;
  }
  .left_img{
    width:0.7rem;
    height: 0.7rem;
    border-radius:4px;

    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  /*.left_img img{*/
  /*width:0.7rem;*/
  /*height: 0.7rem;*/
  /**/
  /*}*/
  .list_content{
    margin-left: 0.1rem;
    height: 0.7rem;
    max-width: 2.75rem;
  }
  .list_title{
    font-size:0.14rem;
    line-height:0.2rem;
    color:#333333;
    max-width:2.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    margin-top: -0.03rem;

  }
  .list_time{
    margin-bottom: -0.03rem;
    font-size:0.11rem;
    color:#999999;
    height: 0.12rem;
    line-height: 0.12rem;

  }
  .list_time span{
    height: 0.12rem;
    display: inline-block;
    vertical-align: top;
    line-height: 0.12rem;
  }
  .list_name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 2.75rem;
    font-size:0.11rem;
    line-height:0.16rem;
    color:#999999;
    margin-top: 0.03rem;
  }
  .right_img img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
  }
  .right_img{
    position: absolute;
    right: 0.1rem;
    margin-top: 0.18rem;
    width: 0.34rem;
    height: 0.34rem;
  }
  .right_img > div{
    position: absolute;
    top: 0;
    left: 0;
    width: 0.34rem;
    height: 0.34rem;
  }
  .circle_mask{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
    background: #000000;
    opacity:0.3;
    z-index:2;
  }
  .mask_play,.mask_stop,.disable{
    z-index:3;
  }
  .gray {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
  .loading_play{
    animation:rotating 1.2s linear infinite
  }
  @keyframes rotating{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
  }
  .entry{
    width: 0.46rem;
    height: 0.16rem;
    border-radius: 8px;
    border:1px solid #e1e1e1;
    color: #999999;
    line-height:0.15rem;
    font-size: 0.11rem;
    box-sizing: border-box;
    margin-top: 0.02rem;
  }


  .text{
    font-size:0.16rem;
  }
  .line{
    position: relative;
    left: -50%;
    width: 7.1rem;
    margin-left: 0.2rem;
    height: 1px;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    background:#E1E1E1;
    -webkit-transform:scale(0.5);
  }
  .clock{
    display: inline-block;
    height: 0.1rem;
    width: 0.1rem;
    background-image: url(//9i.dvmama.com/free/2017/05/04/history.png);
    background-size: 0.1rem 0.1rem;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .new_time{
    font-size: 0;
    height: 0.1rem;
    position: absolute;
    bottom: 0;
    margin-bottom: -0.01rem;
  }
  .new_time>div{
    display: inline-block;
    vertical-align: top;
  }
  .audio_count{
    color:#999999;
    font-size: 0.11rem;
    height: 0.1rem;
    line-height: 0.1rem;
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    margin-right: 0.09rem;
  }
  .se_text{
    padding-left: 0.1rem;
    border-left: 1px solid #999999;
    margin-left: 0.1rem;
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
