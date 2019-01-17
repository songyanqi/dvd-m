<template>
    <div class="title_0" :style="styleObject">
        <div v-text='data.body.title'></div>
        <div v-if='data.body.come && data.body.come != 0.00 && isAuditing' class='title_o_come'>
          <template v-if="util.utils.isApp() && util.utils.isIOS() && ua.compareVersion(ua.getDvdAppVersion(), '5.3.0') >= 0">
            <span style="font-size: 16px">价格: </span><span style="font-size: 18px;font-weight: 500" v-text='data.body.come'></span><span style="font-size: 14px;"> v豆</span>
          </template>
          <template v-else>
            <i class='mui-price-rmb' >￥</i><span v-text='data.body.come'></span>
          </template>
        </div>
    </div>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "title_0";
    .title_o_come{
        margin-top: 15px;
        font-size: 18px;
        color: #FF4A7D;
    }
    .mui-price-rmb{
        font-family: arial;
        font-style: normal;
    }
</style>
<script>
//import './title_0.scss'
import util from "../../../../../common/js/utils.es6";
import login from "dvd-service-js-login";
import ua from "dvd-base-js-ua"
export default {
    data(){
        return {
            msg: 'hello vue',
            name:"title_0",
            isAuditing:false,
            util:util,
            login:login,
            ua:ua
        }
    },
    props: ['data'],
    created:function(){
//      console.log(util.utils.isApp());
//      console.log(util.utils.isIOS());
//      console.log(ua.compareVersion(ua.getDvdAppVersion(), '5.3.0') >= 0);
//      console.log(!login.isSeller());
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px'
            }
        }
    }
}
</script>
