// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';

// 渲染页面
new Vue({
    el: ".app",
    components: {
        'com-top-title': require('dvd-service-com-title').default,
        'stacks-main': require('../vue/book_stacks_rule_selecting.vue').default
    },
    data() {
        return {
            response: true,
        };
    }

});
