// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
// import type from 'dvd-base-js-type';
// import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
// import cache from 'dvd-base-js-cache';
// import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
// import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
// import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';

import comCountDown from '../../group_goods/vue/com-count-down.vue';
import groupStateIcon from '../vue/group-state-icon.vue';
import groupHeadPortrait from '../vue/group-head-portrait.vue';
import groupBottomBtns from '../../../component/group-bottom-btns';
import groupParmaModel from '../../../component/group-parma-model.vue';
import tj from "dvd-service-js-tj";
import hybrid from 'dvd-service-js-hybrid';


// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'com-count-down': comCountDown,
    'group-state-icon': groupStateIcon,
    'group-head-portrait': groupHeadPortrait,
    'group-bottom-btns': groupBottomBtns,
    'group-parma-model': groupParmaModel
  },
  data() {
    return {
      // 全局属性
      window,
      document,
      location,

      // H5项目间通用模块
      ua,
      popup,

      // 首屏返回数据
      response: null,
      groupInfo: null,
      detailIsShow: false,
      hasParma: false, // 商品是否有可选规格
      jsonData:{}, // 父商品的json信息
      showModel: false, // 控制显示规格弹框
      selectedId: '', // 选中商品id
      selectedColor: {}, // 选中商品颜色
      selectedSize: {}, // 选中商品尺寸
      selectedImg: '', // 选中商品图片
      selectPrice:"", // 选中商品的价格
      selectIncome:"", // 选中商品的价格
      selectGoodsName:"", // 选中商品的名称
      selectShopPrice:"", // 选中商品的原价
      selectDiscount:"", // 选中商品的差价
      modelType: 1, // 唤起模版类型(0页面点击规格唤起的模版 1开团买/参团买唤起的模版)
      checkUrl: '', // 多规格面板点击确定后跳转的链接 由服务端下发前端拼接多规格商品的id组成
      goodsId: '', // 多规格商品请求json时使用的id
      groupStatus:"",
      type:"",
      groupId:"",
      reverseId:"",
      hotList:"",
      isLogin:"",
      redirectUrl:"",
      goodsInfoUrl:"",
    };
  },
  computed: {
    emptyGroupNum() {
      // debugger
      // 最大5个空位置
      let maxEmptyNum = 5 - this.groupInfo.tourList.length;
      maxEmptyNum = maxEmptyNum > 0 ? maxEmptyNum : 0;
      // 需求空位置
      let emptyNum = parseInt(this.groupInfo.pepoleNumber) - this.groupInfo.tourList.length;
      // 实际显示空位置
      emptyNum = emptyNum < maxEmptyNum ? emptyNum : maxEmptyNum;
      emptyNum = emptyNum > 0 ? emptyNum : 0;
      return emptyNum;
    }
  },
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
    console.log("这里是m项目")
    // 获取首屏数据
    this.getData();
  },
  mounted() {
    let ts = this;
    // 设置app头部标题栏
    native.custom.initHead({
      shareOnHead: 1
    });
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;
        console.log(ts.response)
        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            // title: ts.response.data.shareTitle,
            // desc: ts.response.data.shareDesc,
            // link: location.href,
            // imgUrl: ts.response.data.shareImg,
            title: ts.response.data.shareInfo.title,
            desc: ts.response.data.shareInfo.desc,
            link: location.href,
            imgUrl: ts.response.data.shareInfo.imgUrl,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData() {
      let ts = this;

      // 取缓存
      /*let response = cache.getItem('/[[project]]/group_detail');
       if (response) {
       ts.response = response;
       document.body.className += ' loaded';
       return;
       }*/

      // 调接口
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/sale/reverse/getDetail?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          reverseId: param.get('reverse_id') || '',
          groupId: param.get('group_id') || '',
          js_wx_info: 1
        },
        success(response) {
          try {
            if (response.code === 0) {
              ts.response = response;
              ts.groupStatus = ts.response.data.groupStatus;
              ts.type = ts.response.data.type;
              ts.groupId = ts.response.data.groupId;
              ts.reverseId = ts.response.data.reverseId;
              ts.hotList = ts.response.data.hotList;
              ts.isLogin = ts.response.data.isLogin;
              ts.redirectUrl = ts.response.data.redirectUrl;
              // console.log(ts.response);
              ts.groupInfo = ts.response.data.goodsInfo;
              ts.goodsInfoUrl = ts.response.data.goodsInfo.goodsInfoUrl;
              ts.skuList = ts.response.data.extra.dataList;
              ts.selectedId = ts.response.data.extra.dataList[0].goods_id;
              ts.selectShopPrice = ts.groupInfo.realShopPrice;
              ts.goodsId = ts.response.data.goodsInfo.goodsId;
              //根据json里的子商品长度判断单规格和多规格
              ts.getParmaJson()
              popup.loading(false);
              // // 设置缓存
              // cache.setItem({
              //   key: '/[[project]]/group_detail-getData',        // 缓存key
              //   data: response,           // 缓存data（可以传json或String）
              //   expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
              //     d: 0,             // 天
              //     h: 0,             // 小时
              //     m: 3,             // 分钟
              //     s: 0,             // 秒
              //     ms: 0,            // 毫秒
              //   }
              // })
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/group_detail.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=group_detail.json`);
          }
        }
      });
    },
    /**
     * 获取多规格json来判断是否为多规格
     * */
    getParmaJson() {
      let _this = this;
      // 根据域名更换请求地址
      let domain = document.domain.split('.')[1];
      let url = '';
      if (domain === 'bravetime') {
        url = 'https://t.vyohui.cn/dev/goods/goods_' + _this.goodsId + '.json?_=' + Date.now();
      } else if (domain === 'vyohui') {
        url = 'https://t.vyohui.cn/beta/goods/goods_' + _this.goodsId + '.json?_=' + Date.now();
      } else {
        url = 'https://5t.dvmama.com/goods/goods_' + _this.goodsId + '.json?_=' + Date.now();
      }
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'get',
        data: encrypt.ajax({}),
        dataType: 'json',
        success(res) {
          let childsList = [];
          if(res.basis.childs.list){
            childsList = res.basis.childs.list;
          }
          _this.jsonData = res;
          if(childsList.length === 0){
            _this.hasParma = false;
          }else{
            _this.hasParma = true;
          }
          popup.loading(false);

        },
        error(err) {
          console.log(err);
        }
      });
    },
    hotGroupsItemClick() {
      // debugger
      tj.send({
        production: 12,
        action: 1,
        action_type: 1
      });
    },
    /**
     * 隐藏规格弹框
     * */
    hiddenModel() {
      let _this = this;
      _this.showModel = false;
    },
    /**
     * 点击 参团/开团买
     * */
    startGroup(url) {
      let _this = this;
      _this.modelType = 1;
      if (_this.hasParma === true) {
        _this.showModel = true;
        _this.checkUrl = url;
      } else {
        location.href = url + '&child_id=' + _this.response.data.extra.dataList[0].goods_id;
      }
    },
    /**
     * 多规格商品更改选中商品
     * */
    chooseChild(id) {
      let _this = this;
      _this.selectedId = id;
    },
    /**
     * 多规格商品确认
     * */
    confirmToBuy() {
      let _this = this;
      if (_this.checking === true) {
        return;
      }
      _this.checking = true;
      if (_this.modelType === 0) {
        _this.checkUrl = _this.groupInfo.clickBtn[1].btnUrl + '&child_id=' + _this.selectedId;
      } else {
        _this.checkUrl += '&child_id=' + _this.selectedId;
      }
      location.href = _this.checkUrl;
    },
    /**
     * 获取多规格信息
     * */
    postParma(data) {
      let _this = this;
      console.log(data)
      _this.selectedImg = data.image;
      _this.selectedColor = data.color;
      _this.selectedSize = data.size;
      _this.selectPrice = data.price;
      _this.selectIncome = data.income;
      _this.selectGoodsName = data.name;
      _this.selectShopPrice = data.shopPrice;
      _this.selectDiscount = data.discount;
    },

  },
});
