<template>
  <header>
    <div class="top0" :style="mergeStyle(styleArr['top0'],{ top: - data.top + 'px' })">
      <div class="top_container" id="top_container" :style="styleArr['top_container']">
        <div class="head_index_top clearfix" :style="styleArr['head']" id="first">
          <a :href="head.image && head.image.command.content" class="left_icon_container">
            <span v-if="usersta == 3" class="shop_icon"></span>
            <img v-lazy="head.image && head.image.url" class="shop_img" v-if="head.image && head.image.url">
            <!--<img v-if="usersta == 0" class="shop_img"-->
                 <!--v-lazy="'http://pic.davdian.com/shop_logo/2016/06/13/80_80_f81f91d7ef5e31fa354fa935124dab20.png'">-->
          </a>
          <a :href="head.search && head.search.command.content">
            <div class="search_con search_button" v-on:click='turn'>

              <input type="text" class="search_input" readonly="" :style="styleArr['search_input']">
            </div>
            <span class="search_icon" :style="styleArr['search_icon']"></span>
            <div class="shop_name" v-on:click='turn' :style="styleArr['shop_name']">在
              <span v-if='head&&head.search&&head.search.title' class="dav_base_red_color" :style="styleArr['dav_base_red_color']"
                    v-text='head.search.title'></span>中搜索...
            </div>
          </a>
          <a class="right_icon_container" style="right:40px;" href="/category_search.html">
            <i class="cart_icon classification_icon" :style="styleArr['classification_icon']"></i>
          </a>
          <a class="right_icon_container" href="/cart.html">
            <div class="count"></div>
            <i class="cart_icon" :style="styleArr['cart_icon']"></i>
            <b v-if="cart" v-text="cart" :style="styleArr['count']"></b>
          </a>
        </div>
        <div v-if="menudata" class="swiper-container v_menu index_con_menu" id="v_menu" :style="styleArr['v_menu']">
          <ul class="swiper-wrapper" id="swiperLi">
            <!--<li class="swiper-slide" v-for="(item, index) in menudata.menuList"
                :style="item.unselected_icon ? {backgroundImage: 'url('+(item.id == cate ? item.selected_icon : item.unselected_icon)+')', width: item.width ? null : null} : styleArr['li']"
                @click='changeCategory(item.id,index,$event)'>
              &lt;!&ndash;如果是文字&ndash;&gt;
              <p class="time_state" v-if='item && item.title && item.id==cate'>
                <span class="time_state_span time_state_span_active" :class="{'width-100': item.unselected_icon}"  :style="styleArr['time_state_span_active']">
                  <template v-if="!item.unselected_icon">{{item.title}}</template>
                  <i class='hoverSpan' :class="{'width-100': item.unselected_icon}" v-if='item.id == cate' :style="styleArr['hoverSpan']"></i>
                </span>
              </p>
              <p class="time_state" v-if='item && item.title && item.id!=cate'>
                <span class="time_state_span" :class="{'width-100': item.unselected_icon}" >
                  <template v-if="!item.unselected_icon">{{item.title}}</template>
                  <i class='hoverSpan' :class="{'width-100': item.unselected_icon}"  v-if='item.id == cate' :style="styleArr['hoverSpan']"></i>
                </span>
              </p>
            </li>-->
            <!--<li v-if="menudata.menuMore" class="swiper-slide" @click="javascript:location.href=menudata.menuMore.command.content">-->
              <!--<p class="time_state">-->
                <!--<span class="time_state_span" v-text="menudata.menuMore.title"></span>-->
              <!--</p>-->
            <!--</li>-->

            <li class="swiper-slide"
                :style="Object.assign({}, styleArr['li'], item.width && item.width != '0' ? {width:  item.width + 'px'} : {})"
                v-for="(item, index) in menudata.menuList"
                @click='changeCategory(item.id,index,$event)'>
              <p class="time_state" v-if='item'>
                <span class="time_state_span" :class="{'time_state_span_active': item.id == cate}" :style="item.id == cate ? styleArr['time_state_span_active'] : null">
                  <img class="pic" :class="{'android-hack': ua.isAndroid()}" :src="item.id == cate ? item.selected_icon : item.unselected_icon" v-if="item.unselected_icon">
                  <template v-else>{{item.title}}</template>
                  <i class='hoverSpan' v-if='item.id == cate' :style="styleArr['hoverSpan']"></i>
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  // TODO 等待数据接口和规则
//  import "./index_header.css"
// import head from "./index_header.es6"
  export {default} from './index_header.es6';
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index_header.css";
  .v_menu {
    background: #fff;
    width: 100%;
  }

  .cart_icon{
    display: block;
    width: 42px;
    height: 44px;
    background-position: center;
    -webkit-background-size:100%;
    background-size:100%;
    background-image: url(img/shoppingCart.png);
  }
  .cart_icon.classification_icon{
       background-image: url(img/classification.png);
  }
  .head_index_top .shop_name{
    padding-right: 88px;
  }

  .index_con_menu {
    width: 100%;
    font-size: 13px;
    padding-top: 5px;
    line-height: 8px;
    position: relative;
    top: 0;
    z-index: 11;
    margin-top: 0;
    max-width: 640px;
    overflow: hidden;
  }

  .index_con_menu li {
    background: #fff;
    color: #333;
    text-align: center;
    cursor: pointer;
    padding-top: 9px;
    padding-bottom: 10px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: no-repeat;
    /*background-size: 100% 100%;*/
    background-size: auto 100%;
    background-position: center;
    /*height: 31px;*/
    height: 32px;
    box-sizing: border-box;
    display: inline-block;
    /*width: 59px;*/
    width: 14.4%;
  }

  .time_state_span {
    position: relative;
    text-align: center;
  }

  .time_state_span .pic {
    position: relative;
    height: 32px;
    top: -14px;
  }

  .time_state_span .pic.android-hack {
    top: -16px;
  }

  .time_state_span.width-100{
    display: inline-block;
    width: 100%;
    height: 8px;
  }

  .hoverSpan {
    display: block;
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    border-bottom: 2px solid #ff4a7d;
  }

  .hoverSpan.width-100{
    width: 100%;
  }

  .time_state_span_active {
    color: #ff4a7d;
  }
  .head_index_top .search_con{
    padding-right: 82px;
  }

  .top_container:after{
    display: none;
  }





  /*新加部分 首页头部 透明*  使用皮肤包的时候打开  */
  /*#index_fe_container .top0 .top_container,*/
  /*#index_fe_container .head_index_top,*/
  /*#index_fe_container .v_menu,*/
  /*#index_fe_container .index_con_menu li{*/
    /*background: none;*/
  /*}*/
  /*.top0{*/
    /*background-size: 3.75rem 80px;*/
  /*}*/




  /*.head_index_top .search_con .search_input{*/
    /*background-color: #ffffff;*/
    /*opacity: 0.15;*/
  /*}*/



  /*1018主会场样式变更*/

  /*.index_con_menu li {*/
    /*!*background: #DD0855;*!*/
    /*color:#FFFFFF;*/
  /*}*/
  /*.index_con_menu {*/
    /*background: #DD0855;*/
  /*}*/
  /*.head_index_top{*/
    /*background: #DD0855;*/
  /*}*/
  /*.cart_icon .classification_icon{*/
    /*background-image: url(//9i.dvmama.com/free/2017/09/12/classificationText.png);*/
  /*}*/
  /*.cart_icon{*/
    /*background-image: url(//9i.dvmama.com/free/2017/09/12/shoppingCartText.png);*/
  /*}*/
  /*.head_index_top .search_con{*/
    /*opacity:0.15;*/
  /*}*/
  /*.head_index_top .shop_name{*/
    /*color:#FFFFFF;*/
  /*}*/
  /*.dav_base_red_color{*/
    /*color:#FFFFFF;*/
  /*}*/
  /*.head_index_top .search_icon{*/
    /*background-image: url(//9i.dvmama.com/free/2017/09/12/searchBarSearchIcon.png);*/
  /*}*/
  /*.hoverSpan {*/
    /*border-bottom: 2px solid #FFFFFF;*/
  /*}*/
  /*.time_state_span_active {*/
    /*color: #FFFFFF;*/
  /*}*/
</style>
