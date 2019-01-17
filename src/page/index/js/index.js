// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';

// import $ from 'jquery';
import Cookies from 'js-cookie';
import util from 'dvd-service-js-util';

// 业务模块
// import encrypt from 'dvd-service-js-encrypt';
// import util from 'dvd-service-js-util';
// import tj from 'dvd-service-js-tj';
// import popup from 'dvd-service-js-popup';
// import login from 'dvd-service-js-login';
import param from 'dvd-base-js-param';
import native from 'dvd-service-js-native';
import vueLazyload from 'dvd-service-js-img-lazyload';

// 3个静态文件
import './javascript/units.js';
import './javascript/base.js';
import './javascript/model.js';

// Cookies.set('dvddomain', 1, {domain: util.getBaseDomain(), expires: 365, path: '/'});
// debugger

// 懒加载初始化
vueLazyload.init(1);

// 设置app头部标题栏
native.custom.initHead({
  showHead: 0, // 是否展示头部
  showFoot: 1, // 是否展示底部
  backOnHead: 0, // 头部返回按钮
  homeOnHead: 0, // 头部首页按钮
  shareOnHead: 0, // 头部分享按钮
  btnOnHead: 0, // 头部文字按钮
  btnText: '', // 头部文字按钮文字
  btnLink: '' // 头部文字按钮链接
});

// app回退时首页二极管地址为/channel.html
if (location.pathname == '/channel.html') {
  window.queryPathType = false;
  window.menuId = param.get('menu_id') || '8';
} else {
  window.queryPathType = true;
  window.menuId = '8';
}

window.index = new Vue({
  el: '#index_fe_container',
  components: {index: require('../module/index/index.vue').default}
});
