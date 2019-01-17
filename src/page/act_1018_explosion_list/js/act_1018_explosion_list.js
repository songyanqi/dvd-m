// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import util from 'dvd-service-js-util';
import ua from 'dvd-base-js-ua';
import utils from "../../../common/js/utils.es6"

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default
  },
  data() {
    return {
      timer: ['0点早教专场','8点爸爸专场','12点教育专场','16点居家专场','20点暖心专场'],
      // screenings: [1508256000,1508284800,1508299200,1508313600,1508328000],
      screenings: [1510070400,1510099200,1510113600,1510128000,1510142400],
      response: null,
      isApp:utils.utils.isApp()
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  methods: {
    /**
     * 接口名称: 助力爆品抢购
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18548318#
     */
    getData() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpgoods/getUserHelpGoods?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/act-explosion.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /** 商品点击 */
    goodsClick(goodsId) {
      let url = '/' + goodsId + '.html';
      // 跳转
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: url,
        });
      } else {
        location.href = url;
      }
    },
    add_url(){
      if(this.isApp){
        native.Browser.open({
          url: '/348.html?dp=yhzz_wjs_b1018'
        })
      }else{
        window.location.href='/348.html?dp=yhzz_wjs_b1018';
      }
    }
  },
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        // // 设置app头部标题栏
        // native.custom.initHead({
        //   shareOnHead: 0,
        //   btnOnHead: '0'
        // });
        //
        // // 设置app头部标题栏
        // native.custom.setHead({
        //   title: document.title,
        //   homeBtn: '1',
        //   shareBtn: '0',
        //   rightBtn: {    // rightBtn会覆盖其他字段
        //     text: '',
        //     textColor: '#ff4a7d',
        //     action: ''
        //   },
        // });
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          homeBtn: '0',
          shareBtn: '1',
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: '大V店周年庆，超值爆品等你来~',
            desc: '1018当天5个场次，可以持续不断买买买啦~',
            link: location.href,
            imgUrl: `${location.protocol}[[static]]/page/act_1018_explosion_list/img/share.png`
          }, ts.response);
        } catch (err) {
          console.error(err);
        }

        // 选中最近的已开抢
        let index = 0;
        for (let i in this.timer) {
          if (ts.response.sys_time >= ts.screenings[i]) {
            index = parseInt(i);
          }
        }
        if(index != 0) {
          var id = '#active-tab' + index;
          var topHeight = $(id).offset().top - $(window).scrollTop();
          $('html,body').animate({scrollTop: topHeight - "44" + "px"}, 300);
        }
      });
    }
  }
});
