/**
 * create by dony in 2017.03.13
 **/
// import {  Group, Cell,
//   Scroller, XInput } from 'vux';
// import { Group, Cell, Scroller } from "vux";
import Cell from 'vux/src/components/cell/index.vue';
import Group from 'vux/src/components/group/index.vue';
import Scroller from 'vux/src/components/scroller/index.vue';
import XNumber from '../../vux-fix/xnumber.vue';

import Popup from '../../vux-fix/popup.vue';
import confirm from './confirm.vue';
import popup from 'dvd-service-js-popup';
import encrypt from 'dvd-service-js-encrypt';
import ua from 'dvd-base-js-ua';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import login from 'dvd-service-js-login';
import $ from 'jquery';
import hybrid from 'dvd-service-js-hybrid';

const GoodsBottom = {
  components: {
    Popup: Popup,
    Group: Group,
    Cell: Cell,
    XNumber: XNumber,
    Scroller: Scroller,
    confirm: confirm

    // XInput: XInput,
  },
  props: [
    'goodstatus',
    'goodstatusonsale',
    'goodstags',
    'ismultigoods',
    'goodslimitnum',
    'goodsmodalobj',
    'datarepresentid',
    'isclose',
    'handlechangenum',
    'mayyoulikelist',
    'relativegoodslist',
    'cartnum',
    'visitorstatus',
    'infoobj',
    'actendtime',
    'isshowactive',
    'islimitnum',
    'spread',
    'seckill',
    'parentid',
    'otheract',
    'goodsstocknumber',
    'allgoodsstocknumber', // 库存
    'isbook',
    'isbiggiftgoods',
    'fromearn',
    'isseller',
    'userbuygift',
    'position',
    'fromearnact',
    'dataextralist',
    'datagoodsid'
  ],
  data: () => {
    return {
      cartModal: false,

      // 购车数量
      cartNum: 1,

      // 推荐展开和拉起
      isSlide: true,
      isOver: false,
      tipsShow: false,
      telVal: 0,
      cartURL: window.cartURL,
      collected: 0,

      // 弹框是否是点击立即购买跳出来的
      isBuyModal: false,
      allPrice: 0,
      modalHeight: `${window.innerHeight * 0.65}px`,

      // 在goods_details获取大礼包分享标题文案
      giftShareText:localStorage.getItem('giftShareText'),

      // 在goods_details获取用户是否有30元抵用券
      validVoucer:localStorage.getItem('validVoucer'),
      earnActId: 0, //养家砍价商品id
      loginstatus: 0,
    };
  },
  created() {
    let that = this;
    that.loginstatus = login.isLogined();
    this.$root.eventHub.$on('time_over', isover => {
      that.isOver = isover;
      that.allPrice = that.infoobj.price.shopPrice;

      // that.infoobj.item.typeId = 0;
    });
    this.$root.eventHub.$on('finalPrices', finalPrice => {
      that.allPrice = finalPrice;
    });
    this.$root.eventHub.$on('xNumberActive', num => {
      that.cartNum = num;
    });
    console.log(that.isbiggiftgoods);
    console.log(that.isseller);
  },

  watch: {
    datarepresentid: {
      handler() {
        let offsetH = 0;
        if (this.infoobj.presale) {
          offsetH = 70;
        } else {
          offsetH = 50;
        }
        if (!this.relativegoodslist.length && !this.goodstags.length) {
          this.modalHeight = `${window.innerHeight * 0.4}px`;
        } else {
          this.modalHeight = `${window.innerHeight * 0.65}px`;
        }

        // 当所有dom都渲染完后执行
        this.$nextTick(function() {
          $('.sku-control').css({top: this.$refs.selects.offsetHeight + offsetH + 'px'});
        });
      },
      deep: true
    }
  },
  methods: {
    giftShare() {
      console.log('gift share');
      share.callShare();
    },

    // 弹框弹出时，给body添加position:fixed；width: 100%;并且让body跳到当前位置。
    handleModalShow() {

      // this.skuTop = ($(".modalHeadTitle").height + 50) + 'px';
      if (document.documentElement && document.documentElement.scrollTop) {
        this.scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        this.scrollTop = document.body.scrollTop;
      }
      document.body.style.top = -this.scrollTop + 'px';
      document.body.classList.add('bodyFix');
    },

    // 弹框消失时
    handleModalHide() {
      document.body.classList.remove('bodyFix');

      $(document).scrollTop(this.scrollTop);
    },
    gobook() {
      window.location.href = '/book_stacks_new.html?stack_list=';
    },
    handleGuess(item) {
      location.href = item.command.content;
    },

    // 收藏
    handleCollect(e) {
      // hybrid.Network.request({
      $.ajax({
        url: collectURL,
        type: 'GET',
        dataType: 'JSON',
        data: encrypt.ajax({
          id: this.parentid,
          collect: this.goodstatus.collected == 0 ? 1 : 0
        }),
        success: result => {
          if (result.error == -1) {
            window.location.href = result.url;
          } else if (result.error) {
            popup.toast(result.msg, 3000);
          } else {
            this.showToast = true;
            if (this.goodstatus.collected == 0) {
              this.goodstatus.collected = 1;
              popup.toast('收藏成功', 3000);
            } else {
              this.goodstatus.collected = 0;
              popup.toast('取消成功', 3000);
            }
          }
        },
        error(error) {
          console.log(error);
        }
      });
    },

    // 多个商品时弹框
    handleAddCart() {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      if (this.infoobj.isComingActivity) {
        let contText;
        if (this.visitorstatus == '3') {
          contText =
            '此商品将在' +
            this.infoobj.comingBegTime +
            '参加限时购会员返现¥' +
            this.infoobj.comingActIncome +
            '';
        } else {
          contText = '此商品将在' + this.infoobj.comingBegTime + '参加限时购';
        }

        // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
        let okFun = () => {

          // 立即购买是否跳出弹框
          this.isBuyModal = false;
          this.cartModal = !this.cartModal;
        };
        let cancleFun = () => {};
        let Title = '限时购活动预告',
          okText = '任性买',
          cancleText = '再等等';

        // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
        popup.confirm({
          title: Title, // 标题（支持传入html。有则显示。）
          text: contText, // 文本（支持传入html。有则显示。）
          okBtnTitle: okText, // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          cancelBtnTitle: cancleText, // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
          okBtnCallback: okFun,
          cancelBtnCallback: cancleFun
        });
      } else {

        // 立即购买是否跳出弹框
        this.isBuyModal = false;
        this.cartModal = !this.cartModal;
      }

      // 立即购买是否跳出弹框
      // this.isBuyModal = false;
      //
      // this.cartModal = !this.cartModal;
    },

    // 立即购买没选择时
    handleAddCartBuy() {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      if (this.infoobj.isComingActivity) {
        let contText;
        if (this.visitorstatus == '3') {
          contText =
            '此商品将在' +
            this.infoobj.comingBegTime +
            '参加限时购会员返现¥' +
            this.infoobj.comingActIncome +
            '';
        } else {
          contText = '此商品将在' + this.infoobj.comingBegTime + '参加限时购';
        }

        // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
        let okFun = () => {

          // 立即购买是否跳出弹框
          this.isBuyModal = true;
          this.cartModal = !this.cartModal;
        };
        let cancleFun = () => {};
        let Title = '限时购活动预告',
          okText = '任性买',
          cancleText = '再等等';

        // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
        popup.confirm({
          title: Title, // 标题（支持传入html。有则显示。）
          text: contText, // 文本（支持传入html。有则显示。）
          okBtnTitle: okText, // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          cancelBtnTitle: cancleText, // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
          okBtnCallback: okFun,
          cancelBtnCallback: cancleFun
        });
      } else {

        // 立即购买是否跳出弹框
        this.isBuyModal = true;
        this.cartModal = !this.cartModal;
      }
    },

    // 点击单个商品的加入购物车
    handleSingleCart() {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      if (this.infoobj.isComingActivity) {
        let contText;
        if (this.visitorstatus == '3') {
          contText =
            '此商品将在' +
            this.infoobj.comingBegTime +
            '参加限时购会员返现¥' +
            this.infoobj.comingActIncome +
            '';
        } else {
          contText = '此商品将在' + this.infoobj.comingBegTime + '参加限时购';
        }

        // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
        let okFun = () => {

          // 立即购买是否跳出弹框
          this.$emit('confirm-id', '', 0);
        };
        let cancleFun = () => {};
        let Title = '限时购活动预告',
          okText = '任性买',
          cancleText = '再等等';

        // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
        popup.confirm({
          title: Title, // 标题（支持传入html。有则显示。）
          text: contText, // 文本（支持传入html。有则显示。）
          okBtnTitle: okText, // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          cancelBtnTitle: cancleText, // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
          okBtnCallback: okFun,
          cancelBtnCallback: cancleFun
        });
      } else {

        // 立即购买是否跳出弹框
        this.$emit('confirm-id', '', 0);
      }
    },

    // 立即付定金,bottom下面的按钮
    handleModalPresale() {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      if (Number(this.goodstatus.goodsStocks) <= 0) {
        return;
      }
      if (this.ismultigoods) {
        this.isBuyModal = true;
        this.cartModal = !this.cartModal;
      } else {
        this.$emit('confirm-id', '', 1);
      }
    },
    change(num) {
      this.$emit('change-cartnum', num);
      this.cartNum = num;
      this.$root.eventHub.$emit('xNumberBottom', num);
    },
    handleTypes(items, item, index, idx, e) {
      let ts =this;
      if (item.isDisabled) {
        return;
      }
      this.$emit('change-type', item);
    },
    handleModalConfirm(e) {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      let dataId = e.target.getAttribute('dataid');
      let isClose = e.target.getAttribute('isclose');
      if (isClose) {
        this.cartModal = !this.cartModal;
      }

      // 立即购买是否跳出弹框，区分是加入购物车还是立即购买
      if (this.isBuyModal) {
        this.$emit('confirm-id', dataId, 1);
      } else {
        this.$emit('confirm-id', dataId, 0);
      }
    },

    // 关闭弹窗
    handleClose() {
      this.cartModal = !this.cartModal;
    },
    handleBuy(e) {
      if (!window.navigator.onLine) {
        popup.toast('网络不太顺畅哦~');
        return;
      }
      if (Number(this.goodstatus.goodsStocks) <= 0) {
        return;
      }
      let goodId = e.target.getAttribute('dataid');

      // 新增的
      if (this.infoobj.isComingActivity) {
        let contText;
        if (this.visitorstatus == '3') {
          contText =
            '此商品将在' +
            this.infoobj.comingBegTime +
            '参加限时购会员返现¥' +
            this.infoobj.comingActIncome +
            '';
        } else {
          contText = '此商品将在' + this.infoobj.comingBegTime + '参加限时购';
        }

        // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
        let okFun = () => {
          if (this.seckill) {
            if (this.ismultigoods) {
              this.cartModal = !this.cartModal;
            } else {
              this.$emit('confirm-id', goodId, 1);
            }
          } else {
            this.cartModal = !this.cartModal;
          }
          this.isBuyModal = true;
        };
        let cancleFun = () => {};
        let Title = '限时购活动预告',
          okText = '任性买',
          cancleText = '再等等';

        // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
        popup.confirm({
          title: Title, // 标题（支持传入html。有则显示。）
          text: contText, // 文本（支持传入html。有则显示。）
          okBtnTitle: okText, // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          cancelBtnTitle: cancleText, // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
          okBtnCallback: okFun,
          cancelBtnCallback: cancleFun
        });
      } else {
        if (this.seckill) {
          if (this.ismultigoods) {
            this.cartModal = !this.cartModal;
          } else {
            this.$emit('confirm-id', goodId, 1);
          }
        } else {
          this.cartModal = !this.cartModal;
        }
        this.isBuyModal = true;
      }
    },

    // 点击推荐收起和展开
    handleRecommendGoods() {
      $('.other_goods').slideToggle();
      $('.self-mask').toggleClass('vux-popup-show');
      this.isSlide = !this.isSlide;

      if (this.isSlide) {
        this.$emit('mask-modal', 1);
      } else {
        this.$emit('mask-modal', 0);
      }
    },
    handleMask() {
      $('.other_goods').slideUp();
      $('.self-mask').removeClass('vux-popup-show');
      this.isSlide = !this.isSlide;
    },

    // 串商品
    handleRelativeGoods(item, list, e) {
      if (item.onSale == '0') {
        return;
      }
      this.$emit('relative-goods', item);
    },

    // 推广
    handleSpread(e) {
      window.location = this.spread;
    },

    // 到货提醒ajax
    getUrl(tel) {
      let that = this;
      let data = {
        c: 'goods',
        a: 'save_goods_stock_remind',
        goodId: this.datarepresentid,
        tel: tel,
        logRefererPage: 'goods_detail',
        logRefererLocation: 'guess'
      };
      // hybrid.Network.request({
      $.ajax({
        url: '/index.php',
        type: 'GET',
        dataType: 'JSON',
        data:encrypt.ajax(data),
        success(res) {
          if (res.error_code) {
            popup.toast(res.error_msg);
          } else {
            popup.toast(res.error_msg);
          }
        },
        error(err) {
          console.log(err);
        }
      });
    },

    // 到货提醒
    handleTips() {
      if (window.loginTel) {
        this.getUrl(window.loginTel);
      } else {
        this.tipsShow = !this.tipsShow;
      }
    },
    handleConfirm() {
      this.getUrl(this.telVal);
      this.tipsShow = false;
    },
    handleConfirmCancel() {
      this.tipsShow = false;
    },
    hadleBlur(e) {
      this.telVal = e.target.value;
    },

    // 再逛逛；
    handleLook() {
      window.location.href = '/';
    },

    // 预定商品跳转链接
    handlePresale() {

      // location.href = this.infoobj.goPayAdvance.payUrl;
      location.href = `/o-${
        this.infoobj.goPayAdvance.orderId
      }.html?rp=order_pay_success&rl=order_detail`;
    },

    // 小书库返回
    handleBookBack() {

      // 如果在app中，调用app返回功能

      if (history.length > 1) {
        history.back();

        // 如果返回到了第一页，再返回就关闭窗口
      } else {

        // 微信
        if (ua.isWeiXin() && window.wx) {
          window.wx.closeWindow();

          // 大V店app
        } else if (ua.isDvdApp()) {
          native.Browser.close();

          // 浏览器
        } else {
          window.location.href = 'about:blank';
          window.close();
        }
      }
    },
    handdleChoose() {
      let ts = this;
      if (ts.seckill) {
        if (ts.ismultigoods) {
          ts.cartModal = !this.cartModal;
        }
      } else {
        ts.cartModal = !ts.cartModal;
      }
    },
    //养家砍价活动选择礼包
    choose() {
      let ts = this;
      var data = JSON.parse(localStorage.getItem('act_gift_select_goods_data'));
      hybrid.Network.request({
        cache: false,
        async: true,
        url: '/api/mg/community/earning/addBargainGoods?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: {
          bargainId: data.id,
          goodsId: ts.datagoodsid ? ts.datagoodsid : data.goodsId,
          type: data.type
        },
        success(response) {
          try {
            if (response.code === 0) {
              location.href = '/earn/act_gift_haggle.html';
            } else {
              popup.toast(response.data.msg);
            }
          } catch (err) {
            // 这个try-catch不要去掉，因 为有异常时会阻止强制跳转
          }
        },
        error(error) {

        }
      });
    }
  }
};
export default GoodsBottom;
