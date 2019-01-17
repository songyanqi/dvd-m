// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
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

import comCountDown from '../vue/com-count-down.vue';
import groupBottomBtns from '../../../component/group-bottom-btns';
import groupParmaModel from '../../../component/group-parma-model.vue';
import hybrid from 'dvd-service-js-hybrid';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'com-count-down': comCountDown,
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
      currentTab: 1, // 1显示商品详情,2活动须知
      goodsInfo: null,
      remainSecond: 5,
      comAlertIsShow: true,
      hasParma: false, // 商品是否有可选规格
      jsonData: {}, // 父商品的json信息
      showModel: false, // 控制显示规格弹框
      childs: {}, // 多规格商品信息
      goodsId: '', // 多规格商品请求json时使用的id
      selectedId: '', // 选中商品id
      selectedColor: {}, // 选中商品颜色
      selectedSize: {}, // 选中商品尺寸
      selectedImg: '', // 选中商品图片
      selectPrice: "", // 选中商品的价格
      selectIncome: "", // 选中商品的价格
      selectGoodsName: "", // 选中商品的名称
      selectShopPrice: "", // 选中商品的原价
      selectDiscount: "", // 选中商品的差价
      skuList: [], // 全部sku商品
      colorList: [], // 颜色列表
      sizeList: [], // 尺寸列表
      modelType: '', // 唤起模版类型(0页面点击规格唤起的模版 1开团买/参团买唤起的模版)
      checkUrl: '', // 多规格面板点击确定后跳转的链接 由服务端下发前端拼接多规格商品的id组成
      joinEntry: {}, // 参团开团提示
      checking: false, // 防刷 正在下单
      isSoldOut: false, // 是否已经全部售罄
      isColonel: false, // 是否是团长
    };
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
    let _this = this;

    // 设置app头部标题栏
    native.custom.initHead({
      shareOnHead: 1,
      homeOnHead: 1
    });
  },
  watch: {
    // 监听response变化
    response() {
      let _this = this;
      // console.log(_this.response)
      // 已下架
      if (!_this.response.data.goodsInfo) {
        popup.alert({
          text: '<p>该商品组团已结束啦～</p>看看其他组团商品吧～',         // 文本（支持传入html。有则显示。）
          btnCallback() {    // 按钮点击回调（有则执行该回调）
            location.href = '/group_list.html';
          }
        });
      }
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let _this = this;
        console.log(_this.response)
        // 设置分享信息
        try {
          if (!_this.response || !_this.response.data) return;
          share.setShareInfo({
            // title: _this.response.data.shareTitle,
            // desc: _this.response.data.shareDesc,
            // link: location.href,
            // imgUrl: _this.response.data.shareImg,
            title: _this.response.data.shareInfo.title,
            desc: _this.response.data.shareInfo.desc,
            link: location.href,
            imgUrl: _this.response.data.shareInfo.imgUrl,
          }, _this.response);
        } catch (err) {
          console.error(err);
        }

      });
    },
  },
  filters: {},
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    getData() {
      let _this = this;

      // 取缓存
      /*let response = cache.getItem('/[[project]]/group_goods');
       if (response) {
       _this.response = response;
       document.body.className += ' loaded';
       return;
       }*/

      // 调接口
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/sale/reverse/getGoodsInfo?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          reverseId: param.get('reverse_id') || '', // || '3584',
          groupId: param.get('group_id') || '',
          sourceRefer: param.get('sourceRefer') || ''
        },
        success(response) {
          try {
            if (response.code === 0) {
              _this.response = response;
              // console.log(_this.response)
              // PHP控制页面跳转逻辑(3该商品已参团或参团)
              if (response && response.data.type == '3' && response.data.redirectUrl) {
                // window.addEventListener('DOMContentLoaded', function () {
                location.replace(response.data.redirectUrl);
                // }, false);
                return;
              }
              _this.response = response;
              _this.goodsInfo = _this.response.data.goodsInfo;
              _this.joinEntry = _this.response.data.joinEntry;
              // 设置分享信息
              let shareInfo = response.data.shareInfo;
              if (shareInfo) {
                share.setShareInfo(shareInfo, response);
              }

              // 判断是否是团长
              if (_this.response.data.joinEntry && _this.response.data.joinEntry.join && _this.response.data.joinEntry.join === 1) {
                _this.isColonel = true
              } else {
                _this.isColonel = false
              }

              _this.skuList = _this.response.data.extra.dataList;
              _this.goodsId = _this.response.data.goodsInfo.goodsId;
              _this.selectedId = _this.response.data.extra.dataList[0].goods_id;
              _this.selectShopPrice = _this.goodsInfo.realShopPrice;
              popup.loading(false);
              //根据json里的子商品长度判断单规格和多规格
              _this.getParmaJson()
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          // 只有本地调试版本才能使用mock数据
          if (!'[[env]]') {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/group_goods.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=group_goods.json`);
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
          if (res.basis.childs.list) {
            childsList = res.basis.childs.list;
          }
          _this.jsonData = res;
          if (childsList.length === 0) {
            _this.hasParma = false;
          } else {
            _this.hasParma = true;
          }
          popup.loading(false);
        },
        error(err) {
          console.log(err);
        }
      });
    },

    joinOtherGroupClick() {
      tj.send({
        production: 12,
        action: 1,
        action_type: 1
      });
    },
    /**
     * 点击显示规格弹框
     * 1、显示遮罩层
     * 2、规格弹框从下向上缓动出现
     * */
    showParmaModel() {
      let _this = this;
      _this.modelType = 0;
      _this.showModel = true;
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
     * 隐藏规格弹框
     * */
    hiddenModel() {
      let _this = this;
      _this.showModel = false;
    },
    /**
     * 多规格商品更改选中商品
     * */
    chooseChild(id) {
      let _this = this;
      _this.selectedId = id;
    },
    /**
     * 获取多规格信息
     * */
    postParma(data) {
      let _this = this;
      _this.selectedImg = data.image;
      _this.selectedColor = data.color;
      _this.selectedSize = data.size;
      _this.selectPrice = data.price;
      _this.selectIncome = data.income;
      _this.selectGoodsName = data.name;
      _this.selectShopPrice = data.shopPrice;
      _this.selectDiscount = data.discount;

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
        _this.checkUrl = _this.goodsInfo.clickBtn[1].btnUrl + '&child_id=' + _this.selectedId;
      } else {
        _this.checkUrl += '&child_id=' + _this.selectedId;
      }
      location.href = _this.checkUrl;
    }
  }
});
