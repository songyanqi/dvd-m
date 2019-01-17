// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'together_assistance': require('../vue/together_assistance.vue').default,
  },
  data() {
    return {
      response: null,
      titles:""
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {

  },
  created() {

  },
  methods: {
    doc_title:function (title) {
      var that = this;
      that.titles = title;
      document.title= title;
      native.custom.setHead({
        'title': title,
        'rightBtn': {
          'text': ''
        }
      });
    }
  },
  filters: {

  },
});
