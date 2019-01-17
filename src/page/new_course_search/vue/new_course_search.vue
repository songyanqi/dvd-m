<template>
  <div>
    <!--{{page_arr[selectedTab]}}-&#45;&#45;{{pageFlag_arr[selectedTab]}}&#45;&#45;&#45;&#45;{{noData_arr[selectedTab]}}<br>-->
    <!--{{scrollTop_arr[0]}}&#45;&#45;&#45;&#45;{{scrollTop_arr[1]}}&#45;&#45;&#45;&#45;{{scrollTop_arr[2]}}-->
    <div class="search">
      <div class="search_icon" @click="go_back">
        <span class="home_arrow"></span>
      </div>
      <div class="search_input"><input v-model="key" type="text" placeholder="搜索课程、合辑、音频"></div>
      <div class="search_btn" @click="search" ref="search">搜索</div>
    </div>
    <template v-if="!showResult">
      <menu_item :item_name="item_name" :item_link="item_command" class="menu_item"></menu_item>
      <div class="search_history first" v-if="typeof historylist[0] != 'undefined'">
        <div>
          <span class="history">历史搜索 :</span>
          <span class="history_clear" @click="clearLocal">清空</span>
        </div>
        <ul class="history_list">
          <li v-for="item in historylist" @click="searchByHistoryWord(item)">{{item}}</li>
        </ul>
      </div>

      <div class="search_history">
        <span class="hot">热门搜索 :</span>
        <ul class="history_list">
          <li v-for="item in hotList" :style="{color:doColor(item.colorType)}"
            @click="searchByHotWord(item.name,item.command)">
            {{item.name}}</li>
        </ul>
      </div>
    </template>
    <template v-if="showResult">
      <div class="select_tab">
        <div @click="change(0)" :class="{ selected : selectedTab==0 }">课程<span v-if="selectedTab==0" class="line"></span></div>
        <div @click="change(1)" :class="{ selected : selectedTab==1 }">合辑<span v-if="selectedTab==1" class="line"></span></div>
        <div @click="change(2)" :class="{ selected : selectedTab==2 }">音频<span v-if="selectedTab==2" class="line"></span></div>
      </div>
      <class_result v-if="selectedTab==0" :list="class_dataList" :no_data="noData_arr[selectedTab]" @save="goDetail"></class_result>
      <album_result v-if="selectedTab==1" :list="album_dataList" :no_data="noData_arr[selectedTab]" @save="goDetail"></album_result>
      <music_result v-if="selectedTab==2" :list="music_dataList" :no_data="noData_arr[selectedTab]" @save="goDetail"></music_result>
    </template>
  </div>
</template>
<script>
  import menu_item from "../../index/module/menu_items.vue";
  import api from "../../../common/js/api.es6"
  import popup from "dvd-service-js-popup"
  import class_result from "./class_result.vue"
  import album_result from "./album_result.vue"
  import music_result from "./music_result.vue"
  import $ from 'jquery';
  import Vue from "vue";
  import ua from 'dvd-base-js-ua';
  import native from 'dvd-service-js-native';

  // import
  export default {
    components:{
      menu_item:menu_item,
      class_result:class_result,
      album_result:album_result,
      music_result:music_result
    },
    data(){
      return {
        showResult:false,

        item_name:"",
        item_command:"",
        hotList:[],
        historylist:[],
        key:"",
        page_arr:[1,1,1],
        pageFlag_arr:[true,true,true],
        button_arr:[true,true,true],
        noData_arr:[false,false,false],

        selectedTab:0,

        class_dataList:[],
        album_dataList:[],
        music_dataList:[],

        search_refer:"",

        scrollTop_arr:[0,0,0]
      }
    },
    mounted(){
      var _this=this;
      if(sessionStorage.getItem("class_dataList") && sessionStorage.getItem("album_dataList") &&
        sessionStorage.getItem("music_dataList") && sessionStorage.getItem("key") &&
        sessionStorage.getItem("scrollTop_arr") && sessionStorage.getItem("selectedTab")
      ){
        _this.showResult=true;
        $("body").addClass("loaded");
        _this.useLocalData();
        _this.clearAllLocal();
        this.$nextTick(function () {
          window.scrollTo(0,this.scrollTop_arr[this.selectedTab]);
        });
      }else{
        this.getCourseHotwords();
        this.getHistoryFromLocal();
      }
      this.$nextTick(function () {
        _this.scrol();
      })
    },
    watch:{
      showResult(){
        if(this.showResult){
          $("body").addClass("result")
        }else{
          $("body").removeClass("result")
        }
      }
    },
    methods:{
      useLocalData(){
        this.key=JSON.parse(sessionStorage.getItem("key"));
        this.selectedTab=JSON.parse(sessionStorage.getItem("selectedTab"));
        this.class_dataList=JSON.parse(sessionStorage.getItem("class_dataList"));
        this.album_dataList=JSON.parse(sessionStorage.getItem("album_dataList"));
        this.music_dataList=JSON.parse(sessionStorage.getItem("music_dataList"));
        this.scrollTop_arr=JSON.parse(sessionStorage.getItem("scrollTop_arr"));
        this.page_arr=JSON.parse(sessionStorage.getItem("page_arr"));
        this.pageFlag_arr=JSON.parse(sessionStorage.getItem("pageFlag_arr"));
        this.noData_arr=JSON.parse(sessionStorage.getItem("noData_arr"));
      },
      clearAllLocal(){
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("selectedTab");
        sessionStorage.removeItem("class_dataList");
        sessionStorage.removeItem("album_dataList");
        sessionStorage.removeItem("music_dataList");
        sessionStorage.removeItem("scrollTop_arr");
        sessionStorage.removeItem("page_arr");
        sessionStorage.removeItem("pageFlag_arr");
        sessionStorage.removeItem("noData_arr");
      },
      goDetail(...val){
        this.saveAllDataInLocal();
        // 判断是不是APP && 是不是直播
        let url = val[0];
        let courseId = val[1];
        let type = val[2];

        if(ua.isDvdApp() === true && courseId && type ==='2'){ //有id说明是课程 类型2是直播
          native.LiveVideo.enterRoom({
            "liveId" : courseId, //房间号,
            "isPlaying":"2" ,// 1表示直播中，2是回放，3是整理中
            "fromPush":"0" // 0表示不来自于推送，1表示来自推送
          })
        }else{
          //console.log("跳转下发页面")
          window.location.href=url;
        }
      },
      saveAllDataInLocal(){
        sessionStorage.setItem("class_dataList",JSON.stringify(this.class_dataList));
        sessionStorage.setItem("album_dataList",JSON.stringify(this.album_dataList));
        sessionStorage.setItem("music_dataList",JSON.stringify(this.music_dataList));
        sessionStorage.setItem("scrollTop_arr",JSON.stringify(this.scrollTop_arr));
        sessionStorage.setItem("selectedTab",JSON.stringify(this.selectedTab));
        sessionStorage.setItem("key",JSON.stringify(this.key));
        sessionStorage.setItem("page_arr",JSON.stringify(this.page_arr));
        sessionStorage.setItem("pageFlag_arr",JSON.stringify(this.pageFlag_arr));
        sessionStorage.setItem("noData_arr",JSON.stringify(this.noData_arr));
      },
      change(count){
        var _this=this;
        this.selectedTab=count;
          if(this.selectedTab==0){
            if(typeof this.class_dataList[0] == "undefined"){
              this.getDatabyKey();
            }
          }else if(this.selectedTab==1){
            if(typeof this.album_dataList[0] == "undefined"){
              this.getDatabyKey();
            }
          }else if(this.selectedTab==2){
            if(typeof this.music_dataList[0] == "undefined"){
              this.getDatabyKey();
            }
          }
//         window.scrollTo(0,_this.scrollTop_arr[_this.selectedTab]);
          setTimeout(function () {
            window.scrollTo(0,_this.scrollTop_arr[_this.selectedTab]);
          },500);
      },
      go_back(){
        history.back();
      },
      search(){
        if(this.key!=""){
          if(this.button_arr[this.selectedTab]){
            this.initData();
            this.addKeyToLocal();
            this.getDatabyKey();
          }
        }else{
          popup.toast("请输入搜索的内容");
        }

      },
      getHistoryFromLocal(){
        if(JSON.parse(localStorage.getItem("user_history"))){
          this.historylist=JSON.parse(localStorage.getItem("user_history"));
        }else{
          this.historylist=[];
        }
      },
      clearLocal(){
        localStorage.removeItem("user_history");
        this.historylist=[];
      },
      addKeyToLocal(){
        if(JSON.parse(localStorage.getItem("user_history"))){
          var arr=JSON.parse(localStorage.getItem("user_history"));
          if(arr.indexOf(this.key) != -1){
            arr.splice(arr.indexOf(this.key),1);
          }
          arr.unshift(this.key);
          localStorage.setItem("user_history",JSON.stringify(arr));
        }else{
          var arr=[];
          arr.unshift(this.key);
          localStorage.setItem("user_history",JSON.stringify(arr));
        }
      },
      searchByHotWord(name,command){
        var _this=this;
        _this.key=name;
        if(command.content==""){
          _this.search_refer=command.ref;
          _this.$refs.search.click();
        }else{
          window.location.href=command.content;
        }
      },
      searchByHistoryWord(name){
        this.key=name;
        this.$refs.search.click();
      },
      initData(){
        this.page_arr=[1,1,1];
        this.pageFlag_arr=[true,true,true];
        this.class_dataList=[];
        this.album_dataList=[];
        this.music_dataList=[];
        this.noData_arr=[false,false,false];
        this.button_arr=[true,true,true];
      },
      getDatabyKey(){
        console.log("调接口啦");
        var _this=this;
        this.showResult=true;
        if(_this.pageFlag_arr[_this.selectedTab]){
          //手动控制body节点的classname已增加加载中样式
          document.getElementsByTagName('body')[0].className = "";
          Vue.set(_this.pageFlag_arr,_this.selectedTab,false);
          Vue.set(_this.button_arr,_this.button_arr,false);
          var obj={
            "keywords":_this.key,
            "page":_this.page_arr[_this.selectedTab],
            "searchType":(parseInt(_this.selectedTab)+1).toString()
          }
          api("/api/mg/content/course/search?" + _this.search_refer,obj)
            .then(function (res) {
              if(!res.code){
                if(typeof res.data.dataList[0] != "undefined"){
                  Vue.set(_this.page_arr,_this.selectedTab,_this.page_arr[_this.selectedTab]+1);
                  if(_this.selectedTab==0){
                    _this.class_dataList=_this.class_dataList.concat(res.data.dataList);
                  }else if(_this.selectedTab==1){
                    _this.album_dataList=_this.album_dataList.concat(res.data.dataList);
                  }else if(_this.selectedTab==2){
                    _this.music_dataList=_this.music_dataList.concat(res.data.dataList);
                  }
                  Vue.set(_this.pageFlag_arr,_this.selectedTab,true);
                  document.getElementsByTagName('body')[0].className = " loaded";
                }else{
                  if(_this.page_arr[_this.selectedTab]==1 && !_this.pageFlag_arr[_this.selectedTab]){
                    Vue.set(_this.noData_arr,_this.selectedTab,true);
                  }
                  console.log("没有数据啦")
                  document.getElementsByTagName('body')[0].className = " loaded";
                }
                Vue.set(_this.button_arr,_this.button_arr,true);
              }else{
                document.getElementsByTagName('body')[0].className = " loaded";
                popup.toast("res.code");
              }
            }).catch(function () {

          });
        }
      },
      doColor:function (color) {
        // 处理颜色的字符串
        return "#"+color.substring(2);
      },
      scrol(){
        var _this=this;
        $(window).scroll(function () {
          if(_this.showResult){
//            _this.scrollTop_arr[_this.selectedTab]=window.scrollY;
            Vue.set(_this.scrollTop_arr,_this.selectedTab,window.scrollY);
            var el = $("body").get(0);
            var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
            if (bottom < 100) {
              _this.getDatabyKey();
            }
          }
        });
      },
      getCourseHotwords:function () {
        var _this = this;
        api("/api/mg/content/course/getCourseSearchHotwords")
          .then(function(result){
          if (!result.code) {
            if (result.data.list.length) {
              _this.hotList = result.data.list;
            } else {
              _this.hotList = [];
            }
            _this.item_name = result.data.buttonsInfo[0].name;
            _this.item_command = result.data.buttonsInfo[0].command.content;
          } else {
            popup.toast(result.code);
          }
        })
          .catch(function () {

        })
      }
    }
  }
</script>
<style scoped lang = "sass" lang="scss" rel="stylesheet/scss">
  .search{
    position: fixed;
    top: 0;
    z-index: 20;
    height: 0.44rem;
    background: #F1F1F1;
    font-size:0;
    div{
      vertical-align: top;
      display: inline-block;
    }
    .search_icon{
      height: 0.44rem;
      width: 0.4rem;
      background: url(//9i.dvmama.com/free/mobile/src/common/img/title-btn-back.png) no-repeat;
      background-size: 100% 100%;
    }
    .search_input{
      width: 2.6rem;
      height: 100%;
      input{
        border-radius: 0.3rem;
        height: 0.3rem;
        line-height: 0.14rem;
        width: 100%;
        margin-top: 0.07rem;
        font-size: 0.12rem;
        color: #666666;
        border: 0;
        text-indent: 0.1rem;
      }
    }
    .search_btn{
      height: 100%;
      width: 0.75rem;
      text-align: center;
      line-height: 0.44rem;
      font-size: 0.14rem;
    }
  }




  .search_history .history_list li, .search_like .like_list li {
    display: block;
    float: left;
    font-size: 14px;
    color: #666666;
    background-color: #F8F8F8;
    padding: 5px 13px;
    border-radius: 14px;
    margin: 5px;
    cursor: pointer;
    max-width: 122px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .first{
    background: white;
    padding: 10px 0 10px 0;
    overflow: hidden;
  }
  .first .history_clear {
    float: right;
    padding-right: 10px;
    font-size: 12px;
    color: #999;
  }
  .search_history .history, .search_history .hot {
    display: inline-block;
    height: 20px;
    background-size: 16px 16px;
    background-position: 0 2px;
    background-repeat: no-repeat;
    padding-left: 20px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;

  }
  .search_history .history_list li, .search_like .like_list li {
    font-size: 14px;
    color: #666;
    line-height: 20px;
    border-bottom: 0;
  }
  .hot {
    background-image: url("//9i.dvmama.com/free/2017/05/04/hot.png");
  }
  .history {
    background-image: url("//9i.dvmama.com/free/2017/05/04/history.png");
  }
  .search_history{
    background: white;
    padding: 10px 0 10px 0;
    overflow: hidden;
  }
  .history_list {
    padding: 5px;
    overflow: hidden;
    background: white;
  }


  .select_tab{
    height: 0.44rem;
    width: 100%;
    font-size:0;
    background: #FFFFFF;
    margin-bottom: 0.15rem;
    position: fixed;
    top: 0.44rem;
    max-width: 640px;
    z-index: 20;
  div{
      width: 33%;
      vertical-align: top;
      text-align:center;
      line-height:0.44rem;
      height: 100%;
      color:#333333;
      font-size:0.14rem;
      display:inline-block;
      position: relative;
    }
    &:after{
       position: absolute;
       left: 0;
       top: 0.44rem;
       content: "";
       height: 1px;
       width: 200%;
       background: #000000;
       opacity: 0.05;
       transform: scale(0.5);
       transform-origin: 0  0;
     }
     .selected{
       color: #FF4A7D;
     }
     .line{
       display: inline-block;
       width: 0.32rem;
       height: 0.02rem;
       background: #FF4A7D;
       bottom: 0;
       left: 0.47rem;
       position: absolute;
     }
  }
</style>
