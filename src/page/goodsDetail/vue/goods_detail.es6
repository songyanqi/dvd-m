/**
 * create by dony in 2017.3.12
 */
// import { Group, Cell, Tab, TabItem, Alert, Loading, Spinner } from "vux";
import Group from 'vux/src/components/group/index.vue';
import Cell from 'vux/src/components/cell/index.vue';
import Tab from 'vux/src/components/tab/tab.vue';
import TabItem from 'vux/src/components/tab/tab-item.vue';
import Alert from 'vux/src/components/alert/index.vue';
import Spinner from 'vux/src/components/spinner/index.vue';
import Loading from 'vux/src/components/loading/index.vue';

// 页面打开时
import base from '../js/base.es6';
import common1 from '../../index/module/common/common.es6';
import native from 'dvd-service-js-native';
import confirm from './confirm.vue';
import popup from "dvd-service-js-popup";
import share from 'dvd-service-js-share';
import common from 'dvd-service-js-common';
import {isTryShop} from '../../../common/js/utils.es6';
import encrypt from 'dvd-service-js-encrypt';
import $ from 'jquery';
import Vue from 'vue';
import hybrid from 'dvd-service-js-hybrid';
// require('babel-polyfill');
window.tj_path = 'detail';
base.init();

// 引入utils.es6;
// import Utils from "../../../../utils/utils.es6";
import layout from '../../index/module/index/layout.es6';

import GoodsTop from './goods_top.vue';
import GoodsSwiper from './goods_swiper.vue';
import GoodsIntro from './goods_intro.vue';
import ActivityTypes from './activity_types.vue';
import GoodsEvaluate from './goods_evaluate.vue';
import GoodsBottom from './goods_bottom.vue';
import GoodsParams from './goods_params.vue';
import DetailPic from './detail_pic.vue';
import BrandType from './brand_type.vue';
import noFindGoods from './nofind_goods.vue';
import vueLazyload from 'dvd-service-js-img-lazyload';
import api from '../../../common/js/api.es6';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import param from 'dvd-base-js-param';
import Cookies from 'js-cookie';
import libraryconfig from './library_config_icon.vue';

vueLazyload.init(true);

export default {
  data() {
    return {
      ajaxed: false,

      // 商品详情页搭配好课、v友试用、购买此商品的人还买了
      addModuleMes: null,
      shareMoney: '',
      ua: ua,
      native: native,
      login,
      response: null,
      albuminfo: null, // 音频信息
      goodListTitle: ['商品详情'],
      selectedTitle: '商品参数',
      detailListTitle: ['图文详情', '商品参数'],
      detailListNav: ['图文详情'],
      detailTitle: '图文详情',
      brandType: '1',

      // 第一个tab
      index: 0,
      isShow: true,
      detailIndex: 0,
      goodsImgList: [],
      swiperInfo: {},
      trendName: '',
      trendAvatar: '',
      trendInfo: '',
      goodsName: '',
      // 是否是预定善品也放到这里面了
      infoObj: {
        isActivity: false,

        // 是否有预告活动
        isComingActivity: false,
        presale: null
      },
      activityNum: 0,
      activityName: '',
      activityTypename: '',
      activityUrl: '',
      activityInfo: {},
      // 商家信息
      dataSeller: null,

      // 图文详情
      picDetails: null,
      // 评论
      commentObj: {},

      // 品牌
      brandList: [],
      // 商品参数
      goodsParamName: '',
      goodsParamType: '',
      goodsParamObj: [],
      // 是否上架
      goodStatus: {},
      goodStatusonSale: 1,
      // 活动开始结束时间
      isShowActive: 0,
      actBeginTime: 0,
      actEndTime: 0,

      // 显示时间的整个活动
      singleActivity: null,

      // 销售有奖
      saleActivity: {
        isShowTime: 0,
        item: null
      },

      // tags
      goodsTags: [],

      // 改变后的goodsTags,单一的一个tag，每次点击清空
      changeSingletags: [],

      // 为true的tag
      selectedTag: [],

      // 把跟选中后有关的剩下的tag放到这里，每次点击清空
      selectedTagList: [],
      // 数据中的data.extra.dataList
      dataExtraList: '',
      dataBasis: '',
      dataRepresentId: '',
      goodsList: [],

      // 判断是否为多规格商品
      isMultiGoods: false,
      // 多规格弹框里的
      goodsModalObj: {},
      isClose: true,

      // 弹框中的商品数量
      handleChangeNum: 1,

      // 购物车标签上的数量
      cartNum: 0,

      // 是否超过限购或者库存数量
      goodsLimitNum: 1,
      isLimitNum: false,
      loadingShow: false,
      confirmShow: false,
      confirmMsg: '',

      // confirm
      cancelText: '取消',
      confirmText: '确定',

      // 猜你喜欢
      mayYouLikeList: null,
      mayYouLikeNoMore: false,
      isFirstLoad: true,

      // 猜你喜欢传参
      mayLikeData: null,

      // 是推荐商品时为tue,然后请求猜你喜欢，不然不请求
      isRecommend: false,

      // 是否显示开店提示
      isPrompt: true,
      shopUrl: '',
      shopMemo: '',

      // 是否是卖家
      visitorStatus: 1,

      // 串商品
      relativeGoodsList: [],

      // 动态条
      trendsList: [],

      // 判断是否在app中
      isApp: false,

      // 推广
      spread: '',
      activitysList: [],
      activityIndex: 0,

      // secKill: true,
      secKill: false,

      // 商品图片
      cartGoodsImg: '',
      isDev: true,

      // 商品页面是否存在
      isGoods: false,

      // titleBar改变
      isChange: false,
      parentId: 0,
      isMiddleTab: false,
      loadBefore: true,

      firstScreenFinish: false,
      type: 'ios',
      memberCont: {
        memberGoods: '',
        memberPrice: ''
      },

      // 库存
      goodsStockNumber: 0,
      allGoodsStockNumber: 0,
      trendTime: null,
      timeHide: null,
      timeShow: null,
      videoObj: {},

      // 有预告的活动
      isComingActive: 0,
      singleComeActivity: null,

      // 六一八
      isShowa: false,
      isShowb: false,
      backTop: 0,

      // 图文详情
      minHeight: window.innerHeight - 128 + 10,

      // 分享卡id
      sellerId: '',
      goodsId: '',
      goodsDataBasis: null,
      otherAct: {isStacks: false},
      isVipBookGoods: 2,
      materials: [],//商品素材
      newMaterials: [],// 新的数组
      sellerName: '',
      // shareNum:'',
      cavasData: '',
      parentId: null,//父商品id

      isVip: login.isSeller(),

      isVipBookGoods: 2,

      // 是否是大礼包商品
      isBigGiftGoods: false,

      fromEarn: false,

      // 是否为会员
      isSeller: false,
      needShowShare: false,
      userBuyGift: 0,//会员是否可以购买礼包
      position: 0,//会员等级
      sellerNameGift: '大V店',

      fromEarnAct: param.get('fromEarnAct'), //是否从礼包砍价活动跳转过来

      library: null
    };
  },
  created() {
    this.GetUrlPara();
    this.getUrl();
    this.getBigGiftGoodsFromParam();//页面滚动时才调用ts.getAddModule()

    if (window.appData) {
      window.appData.isAudioAbsorb = 1;
      window.appData.isShowAudio = 1;
    } else {
      window.appData = {
        isAudioAbsorb: 1,
        isShowAudio: 1
      };
    }
    this.getCartNum();
    this.getIsApp();
  },
  watch: {
    response() {

      // response变化后并渲染完dom,设置其他事项
      // console.log(this.visitorStatus);
      this.$nextTick(function () {
        let ts = this;
        ts.getAddModule();
        //  要求： 5.6.0 及以上版本且是会员的才展示素材分享且不是会员礼包商品
        if ((!(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), "5.6.0") >= 0)) || !this.isVip || ts.isBigGiftGoods) {
          // console.log("app 5.6.0");
          this.shareMessage = null;
        }

      });
    }
  },
  mounted() {
    var that = this;
    this.$nextTick(function () {
      var goodsId = window.location.href
        .match(/(\d+)\.html/gi)[0]
        .substring(
          0,
          window.location.href.match(/(\d+)\.html/gi)[0].length - 5
        );

      if (
        sessionStorage.getItem('lastHeight?' + goodsId) &&
        sessionStorage.getItem('backData?' + goodsId)
      ) {
        that.mayYouLikeList = JSON.parse(
          sessionStorage.getItem('backData?' + goodsId)
        );
        sessionStorage.removeItem('backData?' + goodsId);
        setTimeout(function () {
          window.scrollTo(
            0,
            JSON.parse(sessionStorage.getItem('lastHeight?' + goodsId))
          );
          sessionStorage.removeItem('lastHeight?' + goodsId);
        }, 700);
      }
      window.onunload = onunload_handler;

      function onunload_handler() {
        sessionStorage.setItem(
          'lastHeight?' + goodsId,
          JSON.stringify(window.scrollY)
        );
      }

    });
  },
  methods: {
    getBigGiftGoodsFromParam() {
      if (param.get('rl') === 'task') {
        this.fromEarn = true;
      }
    },
    ievent(data) {
      // console.log('allData:',data);
      this.cavasData = data[0];
      // this.needShowShare =
      // shareMessage
      if (this.needShowShare) {
        this.needShowShare = false;
        popup.loading(false);
        this.shareMessage();

      }
    },
    GetUrlPara() {
      let url = location.pathname.split('/').join('');
      this.goodsId = url.split(".")[0];
      return this.goodsId;
    },
    //静态化数据
    getStaticResource(resolve) {

      // console.log(this.goodsId,123);
      let that = this,
        url;
      if ('[[env]]' === 'dev') {
        url = 'https://t.vyohui.cn/dev/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      } else if ('[[env]]' === 'beta') {
        url = 'https://t.vyohui.cn/beta/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      } else {
        url = 'https://5t.dvmama.com/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      }

      // hybrid.Network.request({
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'get',
        data: encrypt.ajax({}),
        dataType: 'json',
        success(res) {
          try {
            that.goodsDataBasis = res.basis;
            that.goodsId = res.basis.goodsId;//商品id
            that.parentId = res.basis.parentId;//父商品id

            that.materials = res.basis.materials;

            //数组里面添加一项
            if (that.materials.length > 0) {
              that.newMaterials = that.materials.map(item => {
                let temp = {...item};
                temp.videoShareUrl = window.location.protocol + '//' + window.location.host + '/m/commodity_material.html?goodsId=' + that.goodsId + '&materialId=' + item.materialId;
                if (temp.videoImg !== '') {
                  temp.videoImg = temp.videoImg + '?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzA1LzA5L3ZpZGVvX2ljb24ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTAwLGxpbWl0XzAsaF8xMDAsbV9maWxs,g_center,y_0'
                }

                //host 参数拼接
                // debugger
                if (temp.imageList) {
                  temp.imageList.forEach(function (value) {
                    if (value.imgSplice) {
                      value.imgSplice = value.imgSplice + '&host=' + window.location.host;
                      // console.log(value.imgSplice);
                    }
                  });
                }

                return temp;
              });
              // console.log(that.newMaterials,'newMaterials');
              that.newMaterials = JSON.parse(JSON.stringify(that.newMaterials));
            }
            resolve(res);

          } catch (err) {
            console.log(err);
          }
        },
        error(error) {
          that.loadBefore = false;
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
        }
      });
    },

    // 课程、文章、购买此物的人还购买了
    getAddModule() {
      let ts = this;
      if (ts.ajaxed) {
        return;
      }
      const locationUrl = window.location.href;
      let goods = locationUrl.match(/(\d+)\.html/gi)[0],
        goodsIdLen = goods.length,
        goodsId = goods.substring(0, goodsIdLen - 5);
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/good/src/info?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          goodsId: goodsId
        },
        success(response) {
          ts.addModuleMes = response;
        },
        error(error) {
          ts.addModuleMes = require('../json/goods_detail_add.json');
          // console.log(ts.addModuleMes);
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },

    // 图书活动
    getStackUrl() {
      const locationUrl = window.location.href;
      if (
        locationUrl.indexOf('&stacks') !== -1 ||
        locationUrl.indexOf('?stacks') !== -1
      ) {
        this.otherAct.isStacks = true;
      }
    },
    dumpToMamaAdviser() {
      if (isTryShop()) {
        api('/api/mg/auth/inviter/checkAdviser', {
          dataType: 'json',
          type: 'post'
        })
          .then(function (result) {
            if (!result.code && result.data.needPop) {
              popup.specialAlert({
                title:
                  '<div style=\'width: 1.51rem;margin-left: auto;margin-right: auto;margin-top: -0.5rem;\'><img src=\'http://9i.dvmama.com/free/2017816/mamaguwen.png\'></div>',
                text:
                  ' <div style=\'text-align:left\'>亲爱的大V妈妈，我们将给您分配一个1对1服务的妈妈顾问，您有任何关于购物、学习、育儿、活动等疑问，都可以向她寻求帮助</div>',
                btnTitle: '马上选择',
                btnCallback() {
                  location.replace('/choose_mama_adviser.html');
                }
              });
            }
          })
          .catch(function (error) {
            console.log('error:', error);
          });
      }
    },
    getUrl() {

      // 直接在这里执行判断小书库曹组
      this.getStackUrl();
      if (this.isDev) {
        const locationUrl = window.location.href;
        let goods = locationUrl.match(/(\d+)\.html/gi)[0],
          goodsIdLen = goods.length,
          goodsId = goods.substring(0, goodsIdLen - 5);
        let query = {};
        if (locationUrl.indexOf('search_result') === -1) {
          query = {
            goodsId,
            searchKey: ''
          };
        } else {
          query = {
            goodsId,
            searchKey: 'search_result'
          };
        }
        // console.log(query)
        this.getData(query);
      } else {
        this.getData();
      }
    },

    // 判断是否在app中。isIOS
    getIsApp() {

      // this.isApp = Utils.utils.isApp();
      this.isApp = !!navigator.userAgent.match(/davdian|bravetime|vyohui/);
    },

    // 购物车icon上的数量
    getCartNum() {
      const that = this;
      hybrid.Network.request({
        type: 'POST',
        url: layout.config.cart,
        data: {},
        dataType: 'JSON',
        success(res) {
          if (res.code === 0) {
            that.cartNum = res.data.goodsNum;
            that.isSeller = login.isSeller();
          } else {
            popup.toast(res.data.msg, 3000);
          }
        }
      });
    },

    // 关闭开店提示
    handleClosePrompt() {
      this.isPrompt = false;
      this.isMiddleTab = false;
      $('.parmas_title').css({top: 0});
    },

    // 加载mayyoulike
    handleMayYouLike() {
      if (this.isFirstLoad && !this.isRecommend) {
        if (this.mayLikeData) {
          this.getYouLikeDate(this.mayLikeData);
        }
        this.isFirstLoad = false;
      }
    },

    // 加入购物车动画
    addCartAnimate() {
      let imgUrl = this.cartGoodsImg;
      let goodsImg = $('<img class = "hideImg" src = ' + imgUrl + '>');
      $('body').append(goodsImg);
      $('.hideImg').animate(
        {
          width: '10px',
          height: '10px',
          bottom: '35px',
          left: '10%',
          'margin-left': '0px'
        },
        800,
        () => {
          goodsImg.remove();
        }
      );
    },

    // 第一个tab,优化了
    handleChangeTab() {
      let goodsPagePos = window.sessionStorage.getItem('goodsPagePos');
      if (goodsPagePos > 200) {
        $('html,body').animate({scrollTop: 0}, 500);
      }
    },
    isMobile() {
      let ua = navigator.userAgent;
      return !!ua.match(/Mobile/i);
    },

    // 跳转方式
    handleJump(url) {

      // this.isapp = this.isApp();
      if (this.isApp) {
        native.Browser.open({url: url});
      } else if (this.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },

    // 加入购物车封装的ajax;
    cartAjax(isBuy) {
      let that = this;
      if (!this.secKill) {
        if (isBuy == 1) {
          if (!login.isLogined()) {
            login.needLogin();
            return;
          }

          // 购买就直接跳走
          let goods = encodeURI(
            `goods[0][id]=${this.dataRepresentId}&goods[0][number]=${
              this.handleChangeNum
              }`
          );
          setTimeout(() => {
            window.location.href = `/${buyURL}&${goods}`;

            // that.handleJump(`/${buyURL}&${goods}`);
          }, 500);
          return;
        }
      }
      this.loadingShow = true;
      let goods = {
        number: this.handleChangeNum,
        goods_id: this.dataRepresentId
      };
      $.ajax({
        url: addURL,
        type: 'GET',
        dataType: 'JSON',
        data: {goods: JSON.stringify(goods)},
        success: data => {
          that.loadingShow = false;
          if (data.error > 0) {
            if (data.error == 2) {
              that.confirmShow = true;
              that.confirmMsg = '商品已经在购物车中';
              that.confirmText = '再逛逛';
              that.cancelText = '去购物车';
            } else {
              popup.toast(data.message, 3000);
              if (data.url) {
                setTimeout(() => {
                  window.location = data.url;
                }, 500);
              }
            }
          } else {
            if (isBuy == '0') {
              that.addCartAnimate();
            } else {
              that.loadingShow = false;
              popup.toast('跳转中', 3000);
              // 购买就直接跳走,不是秒杀跳到购物车
              setTimeout(() => {
                window.location = secURL;
              }, 500);
            }
            that.cartNum = data.cart_number;
          }
        },
        error: error => {
          that.loadingShow = false;
          popup.toast(error.message, 3000);
        }
      });
    },

    // 点击规格后的事件
    handleChangeType(value) {
      const that = this;

      // 判断是否关闭弹框
      if (value.isActive) {
        this.isClose = false;
      } else {
        this.isClose = true;
      }

      // 每次点击清空
      that.selectedTag = [];

      // 清空就可以得到单一的勒
      that.changeSingletags = [];
      that.selectedTagList = [];

      // 清空活动
      that.singleActivity = null;
      that.saleActivity = {
        isShowTime: 0,
        item: null
      };
      that.infoObj.isComingActivity = false;
      // 更新全部的goodsTags，使其只有每个规格只有一个为true的
      this.goodsTags.map(item => {

        // 根据添加的parentId令这一类的isActive都为false
        if (item.id === value.parentId) {
          item.detail.map(list => {
            if (list.id !== value.id) {
              list.isActive = false;
            }
          });
        }
        item.detail.map(list => {
          if (list.id === value.id) {
            if (!value.isActive) {
              list.isActive = true;
            } else {
              list.isActive = false;
            }
          }
        });
      });

      // 更新后的再判断是isActive是否为true就好了。
      this.goodsTags.map(item => {
        item.detail.map(list => {
          if (list.isActive) {
            that.selectedTag.push(list);

            // 弹框中的选中
            that.goodsModalObj.goodsType = that.selectedTag;
          }
        });
      });
      // 点击后representId也改变,位置不可改变
      let addSelectedTag = [];
      that.selectedTag.map(item => {
        addSelectedTag.push(item.id);
      });
      // addSelectedTag = addSelectedTag.join(":");
      // that.goodsList.map((item) => {
      //     if (item.tag === addSelectedTag) {
      //         that.dataRepresentId = item.goodsId;
      //     } else {
      //         //如果规格没选够的话是否让dataRepresentId为空
      //         // that.dataRepresentId = 0;
      //     }
      // });
      that.goodsList.map(item => {
        let listTag = item.tag.split(':'),
          listNum = 0;
        listTag.map(list => {
          if (addSelectedTag.indexOf(list) != -1) {
            listNum++;
          }
        });
        if (listNum == addSelectedTag.length) {
          that.dataRepresentId = item.goodsId;
        }
      });

      // 点击后判断是否置灰
      that.getDisabled(that.dataExtraList, that.goodsTags);
      if (that.dataRepresentId) {
        let dataExtra,
          that = this;
        this.dataExtraList.map(item => {
          if (Number(item.goodsId) == Number(that.dataRepresentId)) {
            dataExtra = item;
          }
        });

        if (dataExtra) {

          // 限购或者库存数量
          that.getChanges(dataExtra);
        } else {

          // that.getDataExtra(dataBasis);
        }
      }
    },

    // 弹框中的数量改变
    handleCartNum(nums) {
      if (Number(this.goodsLimitNum) > Number(nums)) {
        this.handleChangeNum = Number(nums);
        this.isLimitNum = false;
      } else {
        this.handleChangeNum = Number(this.goodsLimitNum);
        this.isLimitNum = true;
      }
    },

    // 点击弹框的确定后得到商品id,传goodsId和不传一样
    handleConfirmId(goodId, isBuy) {
      let isTitle,
        that = this;

      // 二维数组判断其中二维数组中的一个都为false的时候，退出
      this.goodsTags.map((item, index) => {
        let itemArray = [];
        item.detail.map((list, idx) => {
          itemArray.push(list.isActive);
        });
        if (itemArray.indexOf(true) === -1) {
          isTitle = item.title;
        }
      });
      if (isTitle) {
        popup.toast('请选择' + isTitle, 3000);
        this.isClose = false;
      } else {
        that.cartAjax(isBuy);
        this.isClose = true;
      }
    },

    // 点击串商品
    relativeGoods(list) {
      this.handleChangeNum = 1;
      const locationUrl = window.location.href;
      this.goodsTags = [];
      let query = {};
      if (locationUrl.indexOf('search_result') === -1) {
        query = {
          goodsId: list.id,
          searchKey: ''
        };
      } else {
        query = {
          goodsId: list.id,
          searchKey: 'search_result'
        };
      }
      this.saleActivity = {
        isShowTime: 0,
        item: null
      };
      this.getData(query);
    },

    // detailURL  数据接口
    getData(querys) {
      // console.log(querys)
      const that = this;
      let dataObj, type;

      if (this.isDev) {
        dataObj = querys;
        type = 'POST';
      } else {
        dataObj = '';
        type = 'GET';
      }

      let getStatic = new Promise(function (resolve, reject) {
        if (querys) {
          that.goodsId = querys.goodsId;
        }
        return that.getStaticResource(resolve, reject);
      });


      let getDetail = new Promise(function (resolve, reject) {

        if (type === 'POST') {
          //hybrid
          hybrid.Network.request({
            type: type,
            url: detailURL,
            data: dataObj,
            dataType: 'JSON',
            success(res) {
              // console.log(res)
              resolve(res);
            },
            error(err) {
              console.log(err)
              that.loadBefore = false;
              reject(err);
            }
          })
        } else {
          //ajax
          $.ajax({
            type: type,
            url: detailURL,
            data: encrypt.ajax(dataObj),
            dataType: 'JSON',
            success(res) {
              // console.log(res)
              resolve(res);
            },
            error(err) {
              console.log(err)
              that.loadBefore = false;
              reject(err);
            }
          })
        }
      });
      getDetail.then(function (detail) {
        if (detail.code == 15020) {
          that.loadBefore = false;
          that.isGoods = true;
          if (document.getElementById('firstPageShowShopCart')) {
            document.getElementById('firstPageShowShopCart').style.display = 'none';
          }
          return;
        } else if (detail.code == 0) {
          that.userBuyGift = detail.data.userBuyGift;
          that.position = detail.data.position;
          // 馆配数据
          that.library = detail.data.library || null;
          getStatic.then(function (staticData) {
            //容错处理
            if (staticData.basis && staticData.basis.childs && staticData.basis.childs.list) {
              let staticList = staticData.basis.childs.list;
              let detailDataList = detail.data.extra.dataList;

              detailDataList.forEach(function (DataItem) {
                let listItem = staticList.find(function (ListItem) {
                  return DataItem.goodsId === ListItem.goodsId;
                })
                if (listItem) {
                  DataItem.tag = listItem.tag;
                }
              });
              // console.log(detailDataList,'detailDataList');
            }

            // 图片压缩处理
            let dvdwebp = Cookies.get('dvdwebp');
            // console.log(dvdwebp,'支持webp格式图片');

            staticData.basis.shareImg = staticData.basis.shareImg + '?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&';

            //素材图片
            if (staticData.basis && staticData.basis.materials) {
              staticData.basis.materials.forEach(function (value) {
                if (value.imageList) {
                  for (var i = 0; i < value.imageList.length; i++) {
                    value.imageList[i].imgOriginal = value.imageList[i].imgOriginal + '?x-oss-process=image/quality,Q_90/resize,m_lfit,w_1000,h_1000';
                  }
                }

              })
            }

            if (dvdwebp == 1) {

              let webpstr = '?x-oss-process=image/resize,m_fill,w_640,h_640/format,webp';
              let webpStrSzie4 = '?x-oss-process=image/resize,m_fill,w_400,h_400/format,webp';
              let webPdetail = '?x-oss-process=image/format,webp'

              staticData.basis.originalImg = staticData.basis.originalImg + webpstr;
              staticData.basis.goodsThumb = staticData.basis.goodsThumb + webpstr;
              staticData.basis.goodsImg = staticData.basis.goodsImg + webpstr;

              if (staticData.basis && staticData.basis.pictures) {
                staticData.basis.pictures.forEach(function (value) {
                  value.imgOriginal = value.imgOriginal + webpstr;
                  value.imgUrl = value.imgUrl + webpstr;
                  value.thumbUrl = value.thumbUrl + webpstr;
                })
                // console.log(staticData.basis.pictures,'basis.pictures')
              }


              if (staticData.basis && staticData.basis.details) {
                staticData.basis.details.forEach(function (value) {
                  if (value.detailUrl && parseInt(value.detailType) === 1) {
                    value.detailUrl = value.detailUrl + webPdetail;
                  }

                })
              }

              if (staticData.basis && staticData.basis.childs && staticData.basis.childs.list) {
                staticData.basis.childs.list.forEach(function (value) {
                  if (value.image) {
                    value.image = value.image + webpStrSzie4;
                  }
                })
              }

            } else {

              let strSize6 = '?x-oss-process=image/resize,m_fill,w_640,h_640/quality,Q_90&';
              let strSize4 = '?x-oss-process=image/resize,m_fill,w_400,h_400/quality,Q_90&';
              let webPsize = '?x-oss-process=image/quality,Q_90';

              staticData.basis.originalImg = staticData.basis.originalImg + strSize6;
              staticData.basis.goodsThumb = staticData.basis.goodsThumb + strSize6;
              staticData.basis.goodsImg = staticData.basis.goodsImg + strSize6;

              if (staticData.basis && staticData.basis.pictures) {
                staticData.basis.pictures.forEach(function (value) {
                  value.imgOriginal = value.imgOriginal + strSize6;
                  value.imgUrl = value.imgUrl + strSize6;
                  value.thumbUrl = value.thumbUrl + strSize6;
                })
              }

              if (staticData.basis && staticData.basis.details) {
                staticData.basis.details.forEach(function (value) {
                  if (value.detailUrl && parseInt(value.detailType) === 1) {
                    value.detailUrl = value.detailUrl + webPsize;
                  }
                })
              }


              if (staticData.basis && staticData.basis.childs && staticData.basis.childs.list) {
                staticData.basis.childs.list.forEach(function (value) {
                  if (value.image) {
                    value.image = value.image + strSize4;
                  }
                })
              }

            }

            //静态化数据不再代下发command H5 处理
            if (!ua.isDvdApp()) {
              if (staticData.basis.brand && staticData.basis.brand.length > 0) {
                staticData.basis.brand.command = {
                  content: staticData.basis.brand.brandSite
                }
              }

              // 循环service 整合command
              if (staticData.basis.service && staticData.basis.service.length > 0) {
                staticData.basis.service.forEach(function (value) {
                  if (value.servicePolicyUrl) {
                    value.command = {
                      content: value.servicePolicyUrl
                    }
                  }
                })

              }

            } else {
              if (staticData.basis.brand && staticData.basis.brand.length > 0) {
                staticData.basis.brand.command = {
                  content: staticData.basis.brand.command
                }
              }
              if (staticData.basis.service && staticData.basis.service.length > 0) {
                staticData.basis.service.forEach(function (value) {
                  if (value.servicePolicyUrl) {
                    value.command = {
                      content: value.command
                    }
                  }
                })
              }
            }

            detail.data.basis = staticData.basis;
            // console.log(detail, 'detail');
            getDataNext(detail);
          })
        } else {
          if (detail.data.msg) {
            popup.toast(detail.data.msg)
          } else {
            popup.toast('code:' + detail.code)
          }

        }
      })
      // Promise.all([getStatic, getDetail])
      //   .then(function ([staticData, detail]) {
      //     console.log(staticData, 'staticData');
      //     console.log(detail, 'detail');
      //
      //   })
      // 老逻辑代码
      function getDataNext(res) {
        //0705获取用户是否有30元抵用券
        localStorage.setItem("validVoucer", res.data.validVoucer);
        //获取大礼包分享标题文案
        localStorage.setItem("giftShareText", res.data.giftShareText);
        common.checkRedirect(res);
        if (document.getElementById('firstPageShowShopCart')) {
          document.getElementById('firstPageShowShopCart').style.display =
            'none';
        }
        that.loadBefore = false;

        //清空，不然有串商品会一直添加
        that.relativeGoodsList = [];
        that.goodsImgList = [];
        that.selectedTag = [];
        that.selectedTagList = [];
        that.brandList = [];
        that.goodsModalObj = {};
        that.isPrompt = false;
        that.spread = '';
        that.trendsList = [];
        that.videoObj = {};

        if (res.code == '15020') {
          that.isGoods = true;
          if (document.getElementById('firstPageShowShopCart')) {
            document.getElementById('firstPageShowShopCart').style.display = 'none';
          }
          return;
        }
        if (res.code == '0') {
          // 新加部分  如果是小书库状态  将下架状态取消
          if (that.otherAct.isStacks) {
            res.data.extra.dataList['0'].status.onSale = 1;
          }
          let data = res.data,
            dataExtra,
            dataComment = data.comments,
            goodsStockSales = data.extra.parent,
            dataBasis = data.basis;
          dataShare = data.shareInfo;


          that.response = res;
          that.albuminfo = res.data.albumInfo;
          // that.shareNum = res.data.shareNum;//分享人数
          // console.log(that.shareNum,'shareNum');
          //分享卡
          that.sellerId = data.shop.sellerId.toString();
          that.goodsId =
            data.representId == '0' ? dataBasis.goodsId : data.representId;

          //商品轮播图
          that.goodsImgList.push({
            img: dataBasis.goodsImg
          });
          dataBasis.pictures.map((item, index) => {
            that.goodsImgList.push({
              img: `${item.imgUrl}`
            });
          });
          //modal添加图片
          that.infoObj.goodsShortPic = dataBasis.goodsImg;

          //图文详情新增视频
          let detailPic = [];
          dataBasis.details.map(item => {
            if (item.detailType == "1") {
              detailPic.push(item);
            } else if (item.detailType == "2") {
              that.videoObj.videoUrl = item.detailUrl;
              that.videoObj.videoImage = item.videoImage;
            } else if (item.detailType == "3") {
              that.videoObj.videoIframe = item.detailUrl;
            }
          });
          //图文详情
          that.picDetails = detailPic;
          // that.picDetails = dataBasis.details;

          //收藏Id
          if (dataBasis.parentId == "0") {
            that.parentId = dataBasis.goodsId;
          } else {
            that.parentId = dataBasis.parentId;
          }

          that.cartGoodsImg = dataBasis.goodsThumb;
          //开店提示
          if (data.shop && data.shop.shopGoods.shopGoodsMemo.length) {
            that.isPrompt = true;
          } else {
            that.isPrompt = false;
          }

          that.shopUrl = data.shop.shopGoods.command.content;
          that.shopMemo = data.shop.shopGoods.shopGoodsMemo;

          if (data.shop && data.shop.sellerNameGift) {
            that.sellerNameGift = data.shop.sellerNameGift;
          }
          that.sellerName = data.shop.sellerName; //店铺名称

          that.visitorStatus = res.visitor_status;
          //推广地址
          if (data.spread) {
            that.spread = data.spread.command.content;
          }
          Vue.nextTick(function () {
            that.firstScreenFinish = true;

            //串商品
            if (dataBasis.kinds) {
              dataBasis.kinds.map((item, index) => {
                if (item.onSale != "0") {
                  that.relativeGoodsList.push({
                    id: item.id,
                    onSale: item.onSale,
                    isActive: item.id == dataBasis.goodsId,
                    title: item.title
                  });
                }
              });
            }
            //动态条
            if (data.trends) {
              that.trendsList = data.trends;
            }

            //猜你喜欢传过去参数
            let cateGory = [];
            dataBasis.cats.map((item, index) => {
              cateGory.push(item.catId);
            });
            let mayYouLikeData = {
              goodsShortName: dataBasis.goodsShortName,
              category: cateGory.join(","),
              goodsId: dataBasis.goodsId
            };
            that.mayLikeData = mayYouLikeData;

            //判断representId是否为0
            if (data.representId != "0") {
              that.dataRepresentId = data.representId;
            } else {
              that.dataRepresentId = dataBasis.goodsId;
            }

            that.dataExtraList = data.extra.dataList;
            that.goodsList = dataBasis.childs.list;

            //商家信息
            if (data.shop) {
              that.dataSeller = data.shop;
            } else {
              that.dataSeller = null;
            }

            //判断是否为多规格商品
            let representTag, tagArr;

            //当不是多规格时也显示赠品标签
            if (data.extra.dataList.length) {
              let allGoodsStockNumber = 0;
              data.extra.dataList.map((list, index) => {
                if (list.goodsId == that.dataRepresentId) {
                  //弹框中的价格
                  that.goodsModalObj.activityName = list.activity;
                  that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
                }
                allGoodsStockNumber += Number(list.sales.goodsStocks);
              });
              // console.log('cal', allGoodsStockNumber);
              that.allGoodsStockNumber = allGoodsStockNumber;
            }
            if (dataBasis.childs.tags && dataBasis.childs.tags.length !== 0) {
              that.isMultiGoods = true;
              data.extra.dataList.map((item, index) => {
                if (item.goodsId == that.dataRepresentId) {
                  dataExtra = item;
                  representTag = item.tag;
                }
              });

              //tag
              if (dataExtra) {
                tagArr = representTag.split(":");
                dataBasis.childs.tags.map((item, index) => {
                  //判断数组中是否存在id，存在的话为true
                  item.detail.map((list, idx) => {
                    if (tagArr.indexOf(list.id) !== -1) {
                      list.isActive = true;
                      that.selectedTag.push(list);
                      //弹框中的选中
                      that.goodsModalObj.goodsType = that.selectedTag;
                    } else {
                      list.isActive = false;
                    }
                    //添加父id，根据父id来使这一类规格的isActivity都为false;
                    list.parentId = item.id;
                  });
                });
                //判断规格是否要置灰,根据是否上架、库存为0
                that.getDisabled(data.extra.dataList, dataBasis.childs.tags);
              }
            } else {
              that.isMultiGoods = false;
              dataExtra = data.extra.dataList[0];
            }

            let swiperObj = {
              crossBorder: dataBasis.crossBorder,
              trendsList: data.trends
            };
            that.swiperInfo = swiperObj;

            that.goodsName = dataBasis.goodsName;
            if (that.isBigGiftGoods) {
              that.goodsName = that.goodsName.split(' ').slice(2).join(' ');
            }

            that.activityInfo.bookAuthor = dataBasis.bookAuthor;
            that.activityInfo.bookPublishing = dataBasis.bookPublishing;

            //服务
            that.activityInfo.service = dataBasis.service;
            //是否为店主
            that.activityInfo.isShopper = res.visitor_status;
            that.activityInfo.shoppUrl = res.shop_url;

            let goodsStockSale = 0;
            if (goodsStockSales.constructor != Array) {
              goodsStockSale = goodsStockSales.goodsStocks;
              that.infoObj.salesNumber = goodsStockSales.salesNumber;
            } else {
              goodsStockSale = dataExtra.sales.goodsStocks;
              that.infoObj.salesNumber = dataExtra.sales.salesNumber;
            }

            //活动
            if (dataExtra) {
              that.getChanges(dataExtra);
            } else {
              that.getDataExtra(dataBasis);
            }
            //快讯
            that.activityInfo.notice = data.notice;

            //评论
            if (dataComment.dataList) {
              that.getComment(dataComment);
            }
            //品牌
            that.getBrand(dataBasis);
            // 父商品下的子商品是否有要付尾款单的
            that.getFinalPay();
            //判断是否时未上架或者无货，如果是，请求猜你喜欢的接口，
            that.getMayLike(dataExtra, that.mayLikeData);

            //动态条
            clearTimeout(that.trendTime);
            that.trendTime = setTimeout(() => {
              that.tendsShow();
            }, 1000);

            //库存不足提示
            if (
              dataExtra.status.onSale == "1" &&
              Number(goodsStockSale) < 20 &&
              Number(goodsStockSale) > 0
            ) {
              $(".stock_tips_wrapper")
                .show()
                .animate({top: "58", opacity: 1}, 1000, () => {
                  setTimeout(() => {
                    $(".stock_tips_wrapper").animate(
                      {top: "0", opacity: 0},
                      1000
                    );
                  }, 3000);
                });
            }
            //是否上架,让提示先隐藏，不然刷新页面会闪现出来
            if (dataExtra.status.onSale == "0") {
              $(".goods_status_wrapper").show();
            }
          });
          //分享
          // 异步获取数据后
          window.title = dataBasis.shareGoodsName;
          window.link = dataShare.link;
          if (param.get('rl') === 'task') {
            window.link = param.remove('rl', window.link);
          }
          window.imgUrl = dataBasis.shareImg.replace(
            "9i.dvmama.com",
            "9i.dvmama.com"
          );
          window.desc = dataBasis.shareRecommend;

          //为了跟礼包分享时相同分享内容
          that.goodsName = dataBasis.goodsName;
          if (res.data.earningGoods == 1) {
            that.goodsName = that.goodsName.split(' ').slice(2).join(' ');
          }
          that.isVipBookGoods = res.data.isVipBookGoods || 2;
          if (res.data.earningGoods) {
            that.isBigGiftGoods = true;
            that.fromEarn = false;
            window.title = that.sellerNameGift + '邀请你加入“养家计划”';
            window.desc = that.goodsName;
            window.moreShareInfo = null;
          }

          if (that.isVipBookGoods == 1 && !that.otherAct.isStacks) {
            popup.confirm({
              title: '',            // 标题（支持传入html。有则显示。）
              text: '本书目前仅供拥有小书库身份的用户领取~',             // 文本（支持传入html。有则显示。）
              okBtnTitle: '',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
            })
          }
        } else {
          popup.toast(res.msg, 3000);
        }
      }
    },

    // 评论
    getComment(dataComment) {
      let commentInfo = {
        commentRate: dataComment.commentRate,
        commentNum: dataComment.commentNum,
        commentUrl: dataComment.command.content
      };
      this.commentObj = commentInfo;
      dataComment.dataList.map((item, index) => {
        item.commentUnRate = 5 - Number(item.commentRate);
      });
      if (dataComment.dataList.length > 3) {
        this.commentObj.commentList = dataComment.dataList.slice(0, 3);
      } else {
        this.commentObj.commentList = dataComment.dataList;
      }
    },

    // 品牌
    getBrand(dataBasis) {
      let that = this,
        brand = dataBasis.brand;

      // 品牌
      if (brand.brandLogo && brand.brandName && brand.brandDesc) {
        that.brandList.push({
          src: brand.brandLogo,
          title: brand.brandName,
          desc: brand.brandDesc,
          //TODO
          url: brand.command.content ? brand.command.content : ''
        });
      }

      // 商品参数
      that.goodsParamObj = dataBasis.attributes;
    },

    // 父商品下的子商品是否有要付尾款单的
    getFinalPay() {
      let goPayAdvanceList = [];
      this.dataExtraList.map(item => {
        if (
          Object.prototype.toString.call(item.goPayAdvance) == '[object Object]'
        ) {
          goPayAdvanceList.push(item.goPayAdvance);
        }
      });

      function campare(a, b) {
        return a.addTime - a.addTime;
      }

      if (goPayAdvanceList.length) {
        if (goPayAdvanceList.length == 1) {
          this.infoObj.goPayAdvance = goPayAdvanceList[0];
        } else {
          goPayAdvanceList.sort(campare);
          this.infoObj.goPayAdvance = goPayAdvanceList[0];
        }
      }
    },

    // 判断是否要置灰
    getDisabled(dataExtraList, dataBasisTags) {
      let that = this;

      // 分一种或多状态的时候(颜色，大小)
      if (dataBasisTags.length > 1) {
        that.selectedTag.map(item => {
          dataExtraList.map(list => {

            // 等于representId的不循环
            if (list.goodsId == that.dataRepresentId) {

              // 弹框中的价格
              that.goodsModalObj.activityName = list.activity;
              that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
              return;
            }
            let listTag = list.tag.split(':');

            // 多种状态的时候(颜色，大小)
            if (listTag.indexOf(item.id) !== -1) {

              // 存在再判断是否上架，0,把除了item剩下tag放到that.selectedTagList中
              if (list.status.onSale == '0') {
                listTag.map(nav => {
                  if (nav != item.id) {
                    that.selectedTagList.push(nav);
                  }
                });
              } else {
                if (list.sales.goodsStocks <= 0) {
                  listTag.map(nav => {
                    if (nav != item.id) {
                      that.selectedTagList.push(nav);
                    }
                  });
                }
              }
            }
          });
        });
      } else {
        dataExtraList.map(list => {

          // 等于representId的不循环
          if (list.goodsId == that.dataRepresentId) {

            // 弹框中的价格
            that.goodsModalObj.activityName = list.activity;
            that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
            return;
          }
          let listTag = list.tag;

          // 判断是否上架，0,把除了item剩下tag放到that.selectedTagList中
          if (list.status.onSale == '0') {
            that.selectedTagList.push(listTag);
          } else {
            if (Number(list.sales.goodsStocks) <= 0) {
              that.selectedTagList.push(listTag);
            }
          }
        });
      }
      dataBasisTags.map(item => {
        item.detail.map(list => {
          if (that.selectedTagList.indexOf(list.id) !== -1) {
            list.isDisabled = true;
          } else {
            list.isDisabled = false;
          }
        });
      });
      that.goodsTags = dataBasisTags;
    },

    // 判断是否时未上架或者无货，如果是，请求猜你喜欢的接口
    getMayLike(dataExtra, mayLikeData) {
      let that = this;
      if (dataExtra) {
        if (dataExtra.status.onSale == '1') {
          if (Number(dataExtra.sales.goodsStocks) <= 0) {
            that.isRecommend = true;
          }
        } else {
          that.isRecommend = true;
        }
      } else {
        that.isRecommend = true;
      }

      // 如果为true,请求ajax
      if (that.isRecommend) {
        if (mayLikeData) {
          that.getYouLikeDate(mayLikeData);
        }
      }
    },

    // 点击多规格和首次要改变的所有，封装成一个
    getChanges(dataExtra) {
      let that = this;
      this.isLimitNum = false;
      this.handleChangeNum = 1;

      // 限购或者库存数量,如果是预定商品，让其等于dataExtra.limitNum
      if (dataExtra.sales.limitNum) {
        that.goodsLimitNum = dataExtra.sales.limitNum;
      } else {
        that.goodsLimitNum = dataExtra.sales.goodsStocks;
      }
      if (that.goodsLimitNum <= 1) {
        this.isLimitNum = true;
      } else {
      }

      // 信息
      $('.isLimit').removeClass('isLimitShow');
      that.infoObj.price = dataExtra.price;

      // 将恢复为多少用到的normalIncome,正常的佣金sellerIncome,sellerIncome乘以倍数得到的佣金
      that.infoObj.goodsStockNumber = dataExtra.sales.goodsStocks;

      // 预定的限制数量
      that.infoObj.limitNum = dataExtra.sales.limitNum;

      // that.infoObj.goPayAdvance = dataExtra.goPayAdvance;

      that.goodsStockNumber = dataExtra.sales.goodsStocks;

      that.memberCont.memberGoods = dataExtra.price.memberGoods;
      that.memberCont.memberPrice = dataExtra.price.memberPrice;

      // 多规格modal添加图片
      if (that.goodsList && that.goodsList.length) {
        that.goodsList.map((item, index) => {
          if (dataExtra.goodsId == item.goodsId) {
            if (item.image) {
              that.infoObj.goodsShortPic = item.image;
            } else {
              that.infoObj.goodsShortPic = that.goodsDataBasis.goodsImg;
            }
          }
        });
      }

      // 判断是否有活动
      if (dataExtra.activity.length || dataExtra.labels.length) {
        that.infoObj.isActivity = true;
      }

      // 异步获取数据后
      if (that.isApp) {
        //如果在App 里面
        let shareMoney = 0;
        if (dataExtra.price.memberGoods == 0) {
          shareMoney = dataExtra.price.totalIncome;
        } else {
          if (dataExtra.price.activityRatio == 0) {
            shareMoney = dataExtra.price.normalIncome;
          } else {
            shareMoney =
              Number(dataExtra.price.normalIncome) *
              Number(dataExtra.price.activityRatio);
          }
        }
        that.shareMoney = shareMoney;
        common1.initShare(5);
        base.ready();
        if (shareMoney > 0 && that.visitorStatus == '3') {
          // 会员
          if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
            //小于5.2.0的版本
            native.Browser.setHead({
              backBtn: 1,
              shareMoney: shareMoney + '',
              shareMoneyStr: '赚' + shareMoney + '元'
            });
            // if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.6.0') < 0)
          }
          if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.6.0') < 0) {
            //大于等于5.2.0
            native.Browser.setHead({
              backBtn: 1,
              shareMoney: shareMoney + '',
              shareMoneyStr: '赚' + shareMoney + '元',
              isAudioAbsorb: '1',
              isShowAudio: '1',
              hideHead: '1'
            });
          }
          window.moreShareInfo = {
            shareTitle: '分享至少赚' + shareMoney + '元',
            shareDesc:
              '当好友点击您分享的链接，并进入您的店铺购物，您就可以获得对应的商品返现啦！',
            bigImgUrl: `http://img.davdian.com/add_qrcode.php?goods_id=${
              that.goodsId
              }&seller_id=${that.sellerId}&t=${Date.now()}`
          };
          if (that.isBigGiftGoods) {
            window.moreShareInfo = null;
          }
        } else {
          // 非会员
          if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
            //小于5.2.0
            native.custom.initHead({
              shareOnHead: 1,
              isAudioAbsorb: 1,
              isShowAudio: 1
            });
            // if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.6.0') < 0)
          }
          if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.6.0') < 0) {
            //大于5.2.0版本
            native.Browser.setHead({
              backBtn: 1,
              isAudioAbsorb: '1',
              isShowAudio: '1',
              hideHead: '1'
            });
          }
          share.setShareInfo({
            shareSource: 5,
            title: window.title, // 分享标题
            desc: window.desc, // 分享描述
            link: window.link, // 分享链接
            imgUrl: window.imgUrl // 分享图标
          }, that.response);
        }
      } else {
        share.setShareInfo({
          shareSource: 5,
          title: window.title, // 分享标题
          desc: window.desc, // 分享描述
          link: window.link, // 分享链接
          imgUrl: window.imgUrl // 分享图标
        }, that.response);
      }
      if (that.response && that.response.share_seller_name) {
        window.descContent = that.response.share_seller_name + ' 推荐：' + window.desc;
      }


      // 活动
      this.activityNum = dataExtra.activity.length;
      if (this.activityNum) {
        let singleAct = dataExtra.activity[0];
        this.activityName = singleAct.actIntro;
        this.activityUrl = singleAct.command.content;
        if (dataExtra.activity[0].actTypeName == '') {
          this.activityTypename = singleAct.typeName;
        } else {
          this.activityTypename = singleAct.actTypeName;
        }
      }
      that.activityInfo.activitys = [];
      // 是否是秒杀,单品赠
      let killArr = [];

      // 是否是预定商品
      that.infoObj.presale = null;
      // 将item默认为0
      that.infoObj.item = {typeId: 0};
      dataExtra.activity.map((item, index) => {
        killArr.push(item.typeId);
        if (item.gifts.length) {
          that.activitysList = item.gifts;
        }
        if (
          item.typeId == 1 ||
          item.typeId == 2 ||
          item.typeId == 8 ||
          item.typeId == 4 ||
          item.typeId == 9 ||
          item.typeId == 12
        ) {
        } else {
          that.activityInfo.activitys.push(item);
        }
        // 是否是预定商品
        if (item.typeId == '9') {
          that.infoObj.presale = item;
          that.infoObj.presale.isLimit = true;
        }

        // 是否是一键购
        if (item.typeId == 11) {
          that.infoObj.item = item;
        }
      });
      if (killArr.indexOf('1') === -1) {
        this.secKill = false;
      } else {
        this.secKill = true;
      }

      // 商品标签单独提出来了
      this.infoObj.labelTag = dataExtra.labels;

      // 活动开始结束时间
      // 默认为false
      that.isShowActive = 0;
      dataExtra.activity.map((item, index) => {

        // 过滤销售有奖的活动，销售有奖跟其他都不冲突
        if (item.showTime == 1) {
          if (item.typeId == '12') {
            that.saleActivity = {
              isShowTime: item.showTime,
              item: item
            };

            // Vue.set(dataExtra.activity,index,item);
          } else {
            that.singleActivity = item;
            that.isShowActive = Number(item.showTime);
            that.actEndTime = this.changeDate(item.endTime * 1000, 1);
          }
        }
      });

      // 预告活动时间
      that.infoObj.isComingActivity = false;
      if (dataExtra.coming.length) {
        dataExtra.coming.map(item => {
          if (item.showTime == '1') {
            that.infoObj.isComingActivity = true;
            that.infoObj.comingActIncome = item.actIncome;
            that.infoObj.comingBegTime = this.changeDate(
              item.begTime * 1000,
              0
            );
            that.infoObj.comingTypeName = item.typeName;
          }
        });
      }

      // 红包
      this.activityInfo.bonus = dataExtra.bonus;

      // 弹框中售罄状态要改变,后来增加的
      that.goodStatusonSale = dataExtra.status.onSale;
      let goodStatusObj = {
        preSale: dataExtra.status.preSale,
        collected: dataExtra.status.collected,
        goodsLimit: dataExtra.status.goodsLimit,
        goodsStocks: dataExtra.sales.goodsStocks
      };
      that.goodStatus = goodStatusObj;
      // 判断妈妈顾问
      that.dumpToMamaAdviser();

      // 判断限时购是否抢光提示。
      if (
        dataExtra.status.onSale == '1' &&
        dataExtra.sales.goodsStocks > '0' &&
        dataExtra.hints.hintsInfo &&
        dataExtra.hints.hintsInfo.length &&
        that.visitorStatus == '3'
      ) {
        popup.alert({
          title: '该商品限时购活动库存售罄', // 标题（支持传入html。有则显示。）
          text: '会员返现已恢复平日金额，返现金额以当前页面为准' // 文本（支持传入html。有则显示。）
        });
      }
    },

    // dataExtra为空的时候
    getDataExtra(dataBasis) {
      let that = this;

      // 活动
      this.activityNum = 0;

      // 移过来的
      that.goodStatusonSale = 1;
      let goodStatusObj = {goodsStocks: 0};
      that.goodStatus = goodStatusObj;
    },

    // 动态条显示
    tendsShow() {
      let num = 0,
        isShow = true,
        that = this,
        trends = document.querySelector('#tends');

      if (trends && that.trendsList.length) {
        that.trendAvatar = that.trendsList[num].trendUserAvatar;
        that.trendInfo = that.trendsList[num].trendInfo;
        that.trendAnimate(num, isShow);
      }
    },
    trendAnimate(num, isShow) {
      let that = this;
      $('.tends_wrapper')[0].style.display = 'inline-block';
      if (isShow) {
        clearTimeout(that.timeHide);
        that.timeShow = setTimeout(() => {
          $('#tends').animate({top: '10px'}, 300, function () {
            isShow = !isShow;
            that.trendAnimate(num, isShow);
          });
        }, 2000);
      } else {
        clearTimeout(that.timeShow);
        that.timeHide = setTimeout(() => {
          $('#tends').animate({top: '-80px'}, 300, function () {
            num++;
            isShow = !isShow;
            if (num <= that.trendsList.length - 1) {
              $('#tends').css({top: '65px'});
              that.trendAnimate(num, isShow);
              that.trendAvatar = that.trendsList[num].trendUserAvatar;
              that.trendInfo = that.trendsList[num].trendInfo;
            } else {
              clearTimeout(that.timeShow);
              clearTimeout(that.timeHide);
              $('#tends').css({top: '65px'});
              $('.tends_wrapper')[0].style.display = 'none';
            }
          });
        }, 1000);
      }
    },

    // 猜你喜欢
    getYouLikeDate(mayLikeData) {
      let that = this;
      hybrid.Network.request({
        url: mayYouLikeURL,
        type: 'POST',
        dataType: 'JSON',
        data: mayLikeData,
        success: res => {
          if (res.code == 0) {
            sessionStorage.setItem(
              'backData?' + that.goodsId,
              JSON.stringify(res.data.dataList)
            );
            let data = res.data;
            let dataList = [];
            if (data && data.dataList.length) {
              dataList = data.dataList;
              if (dataList.length) {
                dataList.map((item, index) => {
                  item.imageUrl = `${item.imageUrl}`;
                });
                that.mayYouLikeList = data.dataList;
                that.mayYouLikeNoMore = true; // 判定值 改为false
                that.isFirstLoad = false;
              }
            } else {
              hybrid.Network.request({
                url: '/api/mg/sale/index/getPageSecond',
                type: 'POST',
                data: {},
                dataType: 'JSON',
                success(res) {
                  if (res.code == 0) {
                    dataList = res.data.feedList[0].body.dataList;
                    if (dataList.length) {
                      dataList.map((item, index) => {
                        item.imageUrl = `${item.imageUrl}`;
                      });
                      that.mayYouLikeList = dataList;
                      that.mayYouLikeNoMore = true; // 判定值 改为false
                      that.isFirstLoad = false;
                    }
                  }
                }
              });
            }
          } else {
            popup.toast(res.data.msg, 3000);
          }
        },
        error: err => {
          that.mayYouLikeNoMore = true;
        }
      });
    },

    // 时间转换
    changeDate(date, val) {
      if (date) {
        date = new Date(Number(date));
        if (date > new Date()) {
          let year = date.getFullYear(),
            month =
              date.getMonth() + 1 < 10 ?
                `0${date.getMonth() + 1}` :
                date.getMonth() + 1,
            dates = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
            hours =
              date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            minutes =
              date.getMinutes() < 10 ?
                `0${date.getMinutes()}` :
                date.getMinutes();
          if (val == 1) {
            return `${year}-${month}-${dates} ${hours}:${minutes}`;
          } else {
            return `${month}月${dates}日${hours}:${minutes}`;
          }
        } else {
          return 0;
        }
      }
    },
    //confirm弹框
    handleConfirmCancel() {
      window.location.href =
        '/cart.html?logRefererPage=goods_detail&logRefererLocation=cart';
      this.confirmShow = false;
    },
    handleConfirmOk() {
      window.location.href = '/';
      this.confirmShow = false;
    },
    //分享5.6.0
    shareMessage() {
      let that = this,
        parentId;
      // console.log(that.selectItem,'selectItem');
      if (that.parentId == 0) {
        parentId = that.goodsId;
      } else {
        parentId = that.parentId;
      }

      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/good/info/shareCount?_=' + Date.now(),
        type: 'post',
        data: {
          goodsId: parentId
        },
        dataType: 'json',
        success(respones) {
          try {
            console.log(respones, 'respones');

          } catch (err) {
            // console.log(err);
          }
        }
      });
      //调用command 时先判断合成图片是否上传成功hama
      if (this.cavasData == '') {
        // popup.toast('图片合成中，请稍候~');
        setTimeout(function () {
          if (that.cavasData === '') {
            popup.loading(true);
          }
        }, 500);
        that.needShowShare = true;
      } else {
        /*推荐*/
        var paramDesc = '';
        if (that.response && that.response.share_seller_name && that.response.share_seller_name != '') {
          if (that.goodsDataBasis.shareRecommend && that.goodsDataBasis.shareRecommend != '') {
            paramDesc = that.response.share_seller_name + ' 推荐：' + that.goodsDataBasis.shareRecommend;
          } else {
            paramDesc = that.response.share_seller_name + ' 推荐';
          }
        }
        /*推荐结束*/
        if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.6.0') >= 0) {
          native.Share.goodsMaterialShare({
            title: "分享至少赚" + this.shareMoney + '元',
            desc: "好友通过您的分享购买商品，您就能够获得返现",
            imgUrl: this.goodsDataBasis.goodsImg,
            shareTitle: this.goodsDataBasis.shareGoodsName,
            shareDesc: paramDesc,
            // url: window.location.protocol + '//' + window.location.host +'/'+this.goodsId+'.html',
            url: window.location.href,
            goodsImageUrl: this.cavasData,//二维码地址
            materials: this.newMaterials,
            production: 31,
            actionType: 1
          });
        }
      }
    },

  },
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'title-nav': require('./title-nav.vue').default,
    libraryconfig: libraryconfig,
    GoodsTop: GoodsTop,
    GoodsSwiper: GoodsSwiper,
    GoodsIntro: GoodsIntro,
    ActivityTypes: ActivityTypes,
    GoodsEvaluate: GoodsEvaluate,
    GoodsBottom: GoodsBottom,
    GoodsParams: GoodsParams,
    DetailPic: DetailPic,
    BrandType: BrandType,
    Group: Group,
    Cell: Cell,
    Tab: Tab,
    TabItem: TabItem,
    Alert: Alert,
    confirm: confirm,
    Loading: Loading,
    Spinner: Spinner,
    noFindGoods: noFindGoods,
    'ad-banner': require('./ad-banner.vue').default,
    course: require('./course.vue').default,
    'article-share': require('./article.vue').default,
    "goods_material": require("./goods_material.vue").default,
  }
};
