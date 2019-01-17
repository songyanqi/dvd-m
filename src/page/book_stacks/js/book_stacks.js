
// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 渲染页面
new Vue({
    el: ".app",
    components: {
        'com-top-title': require('dvd-service-com-title').default,
        'com-to-top-icon': require('dvd-service-com-go-page-top').default,
        'stacks-main': require('../vue/book_stacks.vue').default
    },
    data() {
        return {
            response: null,
        }
    },
    beforeCreate() {

    }
});
