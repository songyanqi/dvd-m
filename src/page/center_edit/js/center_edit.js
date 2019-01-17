// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    routes: [
      {
        path: '/',
        component: require('../vue/center_edit.vue').default
      },
      {
        path: '/nickname',
        component: require('../vue/center_edit_input.vue').default
      },
      {
        path: '/shop-name',
        component: require('../vue/center_edit_input.vue').default
      },
      {
        path: '/shop-desc',
        component: require('../vue/center_edit_input.vue').default
      },
      {
        path: '/shop-url',
        component: require('../vue/center_edit_input.vue').default
      },
    ]
  }),
  el: "router-view",
});


// new Vue({
//   components: {
//     app: require('../vue/center_edit.vue').default
//   },
//   template: '<app />',
//   el: ".app",
// });
