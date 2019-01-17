/**
 * Created by dony on 2017/3/9.
 */
import goodsDetail from '../vue/goods_detail.vue';

// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import vueLazyload from 'dvd-service-js-img-lazyload';

vueLazyload.init();
window.vm = new Vue({
    el: "#goodsDetail",
    data: {
    	eventHub: new Vue()
    },
    components: {
        goodsDetail: goodsDetail,
    }
});
