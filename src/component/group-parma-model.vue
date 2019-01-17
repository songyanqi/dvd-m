<template>
  <div class="ui-box" v-show="showSelf">
    <div id="cover" class="ui-cover" @click="hiddenModel()"></div>
    <div id="model" class="ui-model" :class="{'ui-up':showSelf}">

      <div class="ui-model-tip1">
        <!-- 选中商品头图 -->
        <div class="ui-top-pic">
          <img v-lazy="selectedImg" width="100%" height="100%">
        </div>
        <!-- 选中商品信息 -->
        <div class="ui-selected-info">
          <div>
            <span>¥</span>
            <span>{{selectedPic}}</span>
          </div>
          <div>选择</div>
          <div>
            <span>{{selectedFirst.title}}</span>
            <span>{{selectedSecond.title}}</span>
          </div>
        </div>
        <!-- 关闭弹框按钮 -->
        <div class="ui-close-btn" @click="hiddenModel()">
          <img src="//9i.dvmama.com/free/2018/06/25/close.png" width="50%" height="50%">
        </div>
      </div>

      <div class="ui-model-tip2">
        <!-- 一级参数 -->
        <div class="ui-title">
          <span>{{firstTitle}}</span>
        </div>
        <div class="ui-color-box">
          <div class="ui-color-btn"
               v-for="item in firstList"
               :class="{'ui-selected-btn':item.id === selectedFirst.id,'ui-disabled-btn':item.stock == 0}"
               @click="chooseChild(item,'color')"
          >
            {{item.title}}
          </div>
        </div>
        <!-- 二级参数 -->
        <div class="ui-title">
          <span>{{secondTitle}}</span>
        </div>
        <div class="ui-color-box">
          <div class="ui-color-btn"
               v-for="item in secondList"
               :class="{'ui-selected-btn':item.id === selectedSecond.id,'ui-disabled-btn':item.stock == 0}"
               @click="chooseChild(item,'size')"
          >
            {{item.title}}
          </div>
        </div>


      </div>

      <!--底部购买按钮-->
      <div class="ui-btn" id="btn" @click="confirmToBuy()">
        <div v-if="is_pay === false">
          <span v-if="modelType === 0">立即购买</span>
          <span v-if="modelType === 1">确定</span>
        </div>

        <div v-else>
          <span>{{btnArray[1].btnTxt}}</span>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  /**
   * 组团商品详情多规格弹框
   * 父组件控制本组件的隐藏和显示
   * 本组件展示的头图和选中状态完全由父组件传入
   * 父组件传入规格参数和默认选中参数后在本组件进行显示
   * 本组件更改选中状态通知父组件改变默认选中参数
   * */
  import $ from 'jquery';
  import encrypt from 'dvd-service-js-encrypt';
  import popup from 'dvd-service-js-popup';

  export default {
    name: 'group-parma-model',
    props: {
      isShow: {},
      selectedId: {}, // 选中商品id
      modelType: {}, // 按钮显示文案类型
      goodsId: {}, // 请求多规格静态json使用的id
      skuList: {}, // 全部sku商品(内含 价格 和 库存)
      btnArray: {}, // 组团商品详情页面底部按钮状态 用于多规格弹框判断状态使用
      goodsImgUrl: {}, // 商品头图 统一使用外部商品图子商品json目前没有图片
      jsonData: {} // 父商品的json信息

    },
    data() {
      return {
        showSelf: false,
        list: [], // 静态化json下所有sku商品（内含一二级参数）
        childs: {}, // 商品规格
        selectedImg: '', // 选中商品图链接
        selectedPic: '', // 选中商品价格
        firstTitle: '', // 一类参数标题
        secondTitle: '', // 二类参数标题
        selectedFirst: '', // 选中商品颜色(一类参数)
        selectedSecond: '', // 选中商品尺码(二类参数)
        firstList: [], // 颜色(一类参数列表)
        secondList: [], // 尺码(二类参数列表)
        is_pay: false, // 是否(已经下单未支付)
        goodsName: '', // 商品名称
      };
    },
    watch: {
      isShow() {
        let _this = this;
        _this.showSelf = _this.isShow;
        let btn = document.getElementById('btn');
        if (_this.showSelf === true) {
          btn.style.bottom = '0';
        }
        //判断底部按钮
        if (_this.btnArray[1].btnType === 'pay') {
          _this.is_pay = true;
        }
      }
    },
    created() {
      let _this = this;
      // 获取多规格json
      _this.getParmaJson();
    },
    methods: {
      /**
       * 获取多规格json
       * */
      getParmaJson() {
        let _this = this;
        let res = _this.jsonData;
        // console.log(res)
        _this.childs = res.basis.childs;
        _this.list = _this.childs.list;
        _this.goodsName = res.basis.goodsName;
        // console.log(_this.goodsName)
        // 获取多规格商品1 2级规格参数
        if (_this.childs.tags[0] && _this.childs.tags[0].detail && _this.childs.tags.length > 0) {
          _this.firstTitle = _this.childs.tags[0].title;
          _this.firstList = _this.childs.tags[0].detail;
        }
        if (_this.childs.tags[1] && _this.childs.tags[1].detail && _this.childs.tags.length > 1) {
          _this.secondTitle = _this.childs.tags[1].title;
          _this.secondList = _this.childs.tags[1].detail;
        }


        // console.log(_this.skuList);
        // 获取每个sku的库存和价格 收入 原价 差价
        _this.skuList.forEach((i) => {
          _this.list.forEach((j) => {
            if (i.goods_id == j.goodsId) {
              j.stock = i.goods_stock;
              j.price = i.price;
              j.income = i.income;
              j.shopPrice = i.shop_price;
              j.discount = i.discount;
            }
          });
        });
        _this.getSelectSku(); // 获取默认选中商品
      },
      /**
       * 获取选中商品
       * */
      getSelectSku() {
        let _this = this;
        _this.list.forEach((item) => {
          if (item.goodsId == _this.selectedId) {
            // console.log(item); // 选中商品
            _this.selectedImg = item.image;// 选中商品图链接 1
            if (item.tag.split(':')[0]) {
              let firstId = item.tag.split(':')[0];
              _this.firstList.forEach((i) => {
                if (i.id === firstId) {
                  _this.selectedFirst = i;// 选中一级规格 1
                }
              });
            }
            if (item.tag.split(':')[1]) {
              let secondId = item.tag.split(':')[1];
              _this.secondList.forEach((i) => {
                if (i.id === secondId) {
                  _this.selectedSecond = i;// 选中二级规格 2
                }
              });
            }

            _this.selectedPic = item.price;// 选中商品组团价格

            // 把一级规格 二级规格 价格 商品头图 传给父组件
            let obj = {
              image: _this.selectedImg,
              color: _this.selectedFirst,
              size: _this.selectedSecond,
              price: _this.selectedPic,
              income: item.income,
              name: _this.goodsName,
              shopPrice: item.shopPrice,
              discount: item.discount,
            };
            _this.$emit('gparma', obj);
            // 根据当前1 2级规格计算对应2 1级规格不可选的规格
            _this.getInventory();
          }
        });
      },
      /**
       * 点击规格按钮
       * */
      chooseChild(item, type) {
        // console.log(id);
        let _this = this;
        if (_this.is_pay === true) {
          // 已下单未支付弹出tost提示
          popup.toast('已经下单，快去支付吧~');
          return;
        }
        if (item.stock == 0) {
          //库存为0时不可选
          return;
        }
        let firstId = _this.selectedFirst.id;
        if (type === 'color') {
          firstId = item.id;
        }

        let secondId = _this.selectedSecond.id;
        if (type === 'size') {
          secondId = item.id;

        }
        let tag = '';
        if (secondId) {
          tag = firstId + ':' + secondId;
        } else {
          tag = firstId;
        }

        // console.log(tag);
        _this.list.forEach((i) => {
          if (i.tag === tag) {
            _this.selectedId = i.goodsId;
          }
        });
        _this.getSelectSku();
        _this.$emit('change', _this.selectedId);
      },
      /**
       * 根据当前1 2级规格计算对应2 1级规格不可选的
       * 优先1级规格
       * */
      getInventory() {
        let _this = this;
        // console.log(_this.list);
        // console.log(_this.firstList);
        // console.log(_this.secondList);
        // console.log(_this.selectedId);
        let tagF = '';
        let tagS = '';
        _this.list.forEach((item) => {
          if (item.goodsId == _this.selectedId) {
            // console.log(item); // 当前选中的sku商品
            let tagArr = item.tag.split(':');
            tagF = tagArr[0];
            if (tagArr.length > 1) {
              tagS = tagArr[1];
            }
          }
        });
        // console.log(tagF); // 当前选中的商品的1级规格id
        // console.log(tagS); // 当前选中的商品的2级规格id

        // 如果只有1级规格先过滤1级规格
        if (_this.secondList.length === 0) {
          // console.log('此商品只有1级规格');
          _this.list.forEach((item) => {
            // console.log(item);
            _this.firstList.forEach((Fitem) => {
              if (item.tag === Fitem.id) {
                Fitem.stock = item.stock;
              }
            });
          });
        } else {
          // 优先从1级规格过滤2级规格
          _this.list.forEach((item) => {
            let tagArr = item.tag.split(':');
            if (tagArr[0] === tagF) {
              if (_this.secondList.length > 0) {
                let Sid = tagArr[1];
                _this.secondList.forEach((Sitem) => {
                  if (Sid === Sitem.id) {
                    Sitem.stock = item.stock;
                  }
                });
              }
            }
          });
          // 再从2级规格过滤1级规格
          if (_this.secondList.length > 0) {
            _this.list.forEach((item) => {
              let tagArr = item.tag.split(':');
              if (tagArr[1] === tagS) {
                let Fid = tagArr[0];
                _this.firstList.forEach((Fitem) => {
                  if (Fid === Fitem.id) {
                    Fitem.stock = item.stock;
                  }
                });
              }
            });
          }
        }
      },
      /**
       * 隐藏弹框
       * */
      hiddenModel() {
        let _this = this;
        let cover = document.getElementById('cover');
        let model = document.getElementById('model');
        let btn = document.getElementById('btn');
        cover.style.opacity = '0';
        model.style.bottom = '-4.5rem';
        btn.style.bottom = '-4.5rem';
        setTimeout(() => {
          _this.$emit('hidden');
          cover.style.opacity = '1';
          model.style.bottom = '0';
          btn.style.bottom = '0';
        }, 500);
      },
      /**
       * 点击确认按钮
       * */
      confirmToBuy() {
        let _this = this;
        if (_this.is_pay === true) {
          location.href = _this.btnArray[1].btnUrl;
        } else {
          _this.$emit('confirmtobuy');
        }
      }
    },
  };
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  @import "../common/css/util";

  .ui-btn {
    width: 100%;
    max-width: 640px;
    height: r(50);
    line-height: r(50);
    background: linear-gradient(to right, #FF5B5B, #FA1862);
    color: white;
    text-align: center;
    z-index: 103 !important;
    animation: up_down 500ms;
    position: fixed;
    bottom: r(-450);
    font-size: r(14);
  }

  .ui-box {
    font-size: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    /*z-index: 100;*/
    div {
      transition: 500ms
    }
    .ui-cover {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 101;
      animation: show 500ms;
    }
    .ui-model {
      position: fixed;
      font-size: 0;
      z-index: 102;
      bottom: r(-450);
      height: r(430);
      width: r(375);
      max-width: 640px;
      padding: r(10) 0;
      background-color: #ffffff;
      animation: up_down 500ms;
      .ui-model-tip1 {
        font-size: 0;
        border-bottom: 1px solid #e1e1e1;
        width: r(355);
        height: r(66);
        padding: 0 r(10) r(10) r(10);
        .ui-top-pic {
          float: left;
          width: r(100);
          height: r(100);
          border-radius: r(5);
          background: #ffffff;
          position: absolute;
          top: r(-24);
          display: inline-block;
          img {
            border-radius: r(5);
          }
        }
        .ui-selected-info {
          float: left;
          margin-left: r(107);
          div {
            position: relative;
            font-size: r(12);
          }
          div:nth-child(1) {
            color: #FF4A7D;
            font-size: r(20);
            span:nth-child(1) {
              font-size: r(14);
            }
          }
        }
        .ui-close-btn {
          width: r(24);
          height: r(24);
          float: right;
          img {
            float: right;
          }
        }
      }
      .ui-model-tip2 {
        font-size: 0;
        /*width: r(355);*/
        padding: 0 r(10);
        height: r(364);
        .ui-color-box {
          border-bottom: solid 1px #efefef;
          .ui-color-btn {
            width: auto;
            min-width: r(30);
            height: r(30);
            line-height: r(30);
            border: solid 1px #999999;
            border-radius: r(25);
            font-size: r(12);
            text-align: center;
            display: inline-block;
            margin: 0 r(10) r(10) 0;
            padding: 0 r(10);
            transition: 0ms !important;
          }
          .ui-selected-btn {
            color: #FF4A7D;
            border: solid 1px #FF4A7D;
          }
          .ui-disabled-btn {
            color: #DDD;
            border: 1px solid #DDD;
          }
        }
      }

    }
    .ui-up {
      bottom: 0;
    }

    .ui-title {
      width: r(355);
      font-size: r(14);
      color: #999999;
      text-align: left;
      float: left;
      margin: r(10) 0;
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes up_down {
    0% {
      bottom: r(-450);
    }
    to {
      bottom: r(0);
    }
  }

</style>
