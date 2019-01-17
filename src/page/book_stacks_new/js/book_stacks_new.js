// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';

// 渲染页面
new Vue({
    el: ".app",
    components: {
        'com-top-title': require('dvd-service-com-title').default,
        'com-to-top-icon': require('dvd-service-com-go-page-top').default,
        'stacks-main': require('../vue/book_stacks_new.vue').default
    },
    data() {
        return {
            titlename:"小书库选书"
        }
    },
    created(){
      let ts = this;
      if (location.href.indexOf("stack_list") > 0) {
        ts.titlename = "小书库最新书单"
      }
    }
});
