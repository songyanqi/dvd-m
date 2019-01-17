// 基础模块
require('dvd-service-js-common');
// require('babel-polyfill'); // es6 方法

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
import Cookies from 'js-cookie';

// 业务模块
import tj from 'dvd-service-js-tj';
import util from 'dvd-service-js-util';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import popup from 'dvd-service-js-popup';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import layout from "../../index/module/index/layout.es6";
import localCache from 'dvd-base-js-cache';
import vueLazyload from 'dvd-service-js-img-lazyload';
import common from 'dvd-service-js-common';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      res: null,
      response:null,
      resCar:null,
      shareInfo:{}, // 分享信息
      dataList:[], // 数据列表
      pageIndex: 1,
      ajaxing: false,
      loading: false,
      no_more: false,
      isSeller: login.isSeller(),
      priceData:{}, // 购物车接口
      activityIn:{}, // 活动类型
      activityId: param.get('act_id', window.location.href), // 获取url 的活动Id
      sysTime:0, // 当前时间戳
      maskPopupFlag:false, // 弹窗显示
      messagePrompt:false,
      counter:1, // 商品数量控制
      list:[],
      tags:[], // 规格
      tagsLen: 2,
      chooseColorId: '', // 颜色
      chooseSizeId: '', // 规格
      goodsId: '', // 选中的商品id
      goodsStock:'', // 库存
      goodsStockTotal:0,//总库存
      titleColor:'', // 选择标题的title
      titleSize:'', // 选择标题的title
      price:'', // 价钱
      goodsImg:'', // 默认图片
      image:'', // 商品图片
      tagsColorTitle:'', // 未选择提示文案
      tagsSizeTitle:'', // 未选择提示文案
      colorUseNum: true,
      sizeUseNum: true,
      ajaxFlag:false,// 限制ajax 没有返回时重复点击
      ua,
      sysTimeCar:0,//服务器时间

    };
  },
  computed:{
    inpNum:{
      get:function() {
        return this.counter;
      },
      set:function(newValue) {
        this.counter = String(newValue).replace(/[^\d]/g,'');
      }
    }
  },
  watch: {
    // 监听response变化
    shareInfo() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;
        // 设置分享信息
        share.setShareInfo({
          shareSource:27,
          title: that.shareInfo.title,
          desc: that.shareInfo.desc,
          link: location.href,
          imgUrl: that.shareInfo.imgUrl
        });
      });
    },
    counter(val, oldVal) {
      if(this.counter > Number(this.goodsStock)) {
        this.counter = oldVal;
        this.inpNum = oldVal;
      } else {
        this.inpNum = val;
      }
    }
  },
  beforeCreate() {
  },
  created() {
    this.getDataList();
    this.getGoodsPrice();
  },
  mounted() {
    /*分页*/
    let that = this;
    //页面滚动加载
    window.onscroll = function() {
      var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);//真实内容高度
      //视窗高度
      var viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
      //隐藏高度即滚动的高度
      var scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
      if (pageHeight - viewportHeight - scrollHeight <= 20) {
        that.getDataList('scroll');
      }
    };
  },
  methods: {
    /**
     * 接口名称:/api/mg/sale/activity/getGoods
     * 接口文档:http://wiki.bravetime.net/pages/viewpage.action?pageId=20382727
     */
    //数据列表
    getDataList() {
      var that = this;
      if(scroll) {
        // 已经结尾,不要再调接口 根据条数判断
        if (that.res && that.res.data && that.res.data.more === false ) {
          that.no_more = true;
          return;
        } else {
          that.loading = true;
        }
        // 正在请求接口中,不要再调接口
        if (that.ajaxing) {
          return;
        }
        that.ajaxing = true;
      }
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/activity/getGoods?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          pageIndex:that.pageIndex,
          activityId:that.activityId,
        }),
        success(res) {
          try {
            common.checkRedirect(res);
            that.res = res;
            that.shareInfo = res.data.shareInfo;// 分享信息
            that.activityIn = res.data.activityInfo;// 活动类型
            that.sysTime = res.sys_time;// 当前时间

            // 如果活动结束3秒后跳转到首页
            if(!(that.sysTime > that.activityIn.start_time && that.sysTime < that.activityIn.end_time)) {
              that.refundIndex();
            }
            // 如果没有数据
            if (that.res && that.res.data && that.res.data.more === false ) {
              that.no_more = true;
            }
            if(scroll) {
              // 数据列表
              that.dataList = that.dataList.concat(res.data.dataList);
            } else {
              that.dataList = res.data.dataList;
            }
            that.pageIndex++;
            that.ajaxing = false;
            if(that.loading) {
              that.loading = false;
            }
            if(res.data.dataList.length === 0){
              setTimeout(function() {
                location.href = '/';
              }, 2000);
            }
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/preferential_activities.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=preferential_activities.json`);
        }
      });
    },

    //底部小计
    getGoodsPrice() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/activity/calActDiscount?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          actId:that.activityId
        }),
        success(priceData) {
          try {
            that.sysTimeCar = priceData.sys_time;
            that.priceData = priceData.data;
          } catch (err) {
            // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
          }
        },
        error(error) {
          console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
          this.success(require('../json/preferential_activities.json'));
          console.warn(`ajax已使用mock数据: url=${this.url}, mock=preferential_activities.json`);
        }
      });
    },

    // 计算colorNumObj
    setColorTags(id) {
      let that = this;
      this.list.forEach(function (listItem) {
        if (listItem.tag.split(':')[1] == id) {
          let detailItem = that.tags[0].detail.find(function (d) {
            return d.id == listItem.tag.split(':')[0];
          });
          if (detailItem) {
            detailItem.num = listItem.goodsStock;
          }
        }
      });
    },

    // 计算sizeNumObj
    setSizeTags(id) {
      let that = this;
      this.list.forEach(function(listItem) {
        if (listItem.tag.split(':')[0] == id) {
          let detailItem = that.tags[1].detail.find(function (d) {
            return d.id == listItem.tag.split(':')[1];
          });
          if (detailItem) {
            detailItem.num = listItem.goodsStock;
          }
        }
      });
    },
    // 改变选择颜色变量
    changeChooseColor(id) {
      this.chooseColorId = id;
    },

    // 改变选择尺码变量
    changeChooseSize(id) {
      this.chooseSizeId = id;
    },

    // 改变goodsId
    changeGoodsId(id) {
      this.goodsId = id;
    },
    // 点击颜色规格事件
    checkColorNum(obj, num) {
      this.counter = 1; // 每次点击就将数量改为1
      this.messagePrompt = false; // 库存不足 隐藏
      // 判断如果id 相等 就取消选中
      if (obj.id == this.chooseColorId) {
        this.chooseColorId = '';
        this.goodsId = '';
        this.sizeUseNum = false;
      } else {
        if (num > 0 || !this.colorUseNum) {
          this.sizeUseNum = true;
          this.handleColor(obj);
        }
      }

    },

    // 点击尺码规格事件
    checkSizeNum(obj, num) {
      this.counter = 1; // 每次点击就将数量改为1
      this.messagePrompt = false; // 库存不足 隐藏
      // 判断如果id 相等 就取消选中
      if (obj.id == this.chooseSizeId) {
        this.chooseSizeId = '';
        this.goodsId = '';
        this.colorUseNum = false;
      } else {
        if (num > 0 || !this.sizeUseNum) {
          this.colorUseNum = true;
          this.handleSize(obj);
        }
      }
    },

    handleColor(obj) {
      this.titleColor = obj.title;
      let chooseColorObj = this.list.find(function(listColorObj) {
        return listColorObj.tag.split(':')[0] == obj.id;
      });
      if (this.tagsLen === 2) {
        this.setSizeTags(obj.id);
      }
      if (chooseColorObj) {
        if(this.tagsLen === 1){
          this.goodsId = chooseColorObj.goodsId;
        }
        this.changeChooseColor(chooseColorObj.tag.split(':')[0]);
        if (chooseColorObj.image && chooseColorObj.image != '') {
          this.image = chooseColorObj.image;//取到图片
        } else {
          this.image = this.goodsImg;//默认图片
        }
      }

      this.commonTags();//点击匹配list里面的tag字段

    },
    handleSize(obj) {
      this.titleSize = obj.title;
      let chooseSizeObj = this.list.find(function(listSizeObj) {
        return listSizeObj.tag.split(':')[1] == obj.id;
      });
      if (this.tagsLen === 2) {
        this.setColorTags(obj.id);
      }
      if (chooseSizeObj) {
        this.changeChooseSize(chooseSizeObj.tag.split(':')[1]);
      }
      this.commonTags();//点击匹配list里面的tag字段
    },

    // 通过选中的id 去 list 里面匹配
    commonTags() {
      var tag = this.chooseColorId + ':' + this.chooseSizeId;
      let foundTag = this.list.find(function(tagList) {
        return tagList.tag == tag;
      });
      if (foundTag) {
        this.goodsId = foundTag.goodsId;//第一次默认选中取到的id
        this.goodsStock = foundTag.goodsStock;//取到的库存数量
        this.price = foundTag.price;//取到价钱
      }
      // if(this.chooseColorId === "" && this.chooseSizeId === ""){
      //   this.goodsStock = this.goodsStockTotal;
      // }
    },
    // 显示购物车
    showCar(obj) {
      var that = this;
      if (that.ajaxFlag) {
        return;
      }
      that.ajaxFlag = true;

      // 每次点击购物车将数量清空
      that.counter = 1;
      that.goodsId = '';

      // 记录购物车点击次数
      tj.send({
        production: 27,
        action: 1,
        action_type: 1
      });
      // 查找匹配商品对应的图片
      // value 当前成员  当前数组  原数组
    //   [1,5,15,20,25].find((value,index,arr) => {
    //     return value > 20;
    // })    // 25
      let chooseGoodsImg = that.dataList.find(function(imgs) {
        return imgs.goods_id == obj.goods_id;
      });
      if(chooseGoodsImg) {
        that.goodsImg = chooseGoodsImg.goodsImg;//商品初始默认图片
      }
      // 商品售罄提示
      if(obj.status == 1) {
        popup.toast("商品已售罄无法加入购物车");
        that.ajaxFlag = false;
      }else {
        // 发送ajax请求 点击加入购物车
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/sale/activity/getGoodChilds?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            goodsId:obj.goods_id
          }),
          success(response) {
            that.ajaxFlag = false;
            try {
              that.response = response;
              // 如果返回数据存在data && data不为空 则弹窗多规格弹窗
              if(that.response && that.response.data && that.response.data.list && that.response.data.list.length != 0) {
                // 获取tags的长度
                that.tagsLen = that.response.data.tags.length;
                that.maskPopupShow();// 多规格弹窗
                that.list = response.data.list;
                that.tags = response.data.tags;
                that.tagsColorTitle = response.data.tags[0].title;
                if(that.tagsLen === 2) {
                  that.tagsSizeTitle = response.data.tags[1].title;
                }
                // 匹配goodsId  ListObj 代表list 里面的每一项
                let chooseObj = that.list.find(function(ListObj) {
                  return ListObj.goodsId == obj.specialGoodsId;
                });
                if (chooseObj) {
                  that.goodsId = chooseObj.goodsId;//第一次默认选中取到的id
                  if (chooseObj.image && chooseObj.image != '') {
                    that.image = chooseObj.image;//取到图片
                  } else {
                    that.image = that.goodsImg;//默认图片
                  }
                  that.goodsStock = chooseObj.goodsStock;//第一次默认选中取到的库存
                  that.price = chooseObj.price;//取到价钱
                  if (that.tagsLen === 2) {
                    that.titleColor = chooseObj.title.split('_')[0];//第一次默认选中取到的id
                    that.titleSize = chooseObj.title.split('_')[1];
                    let tagColor = chooseObj.tag.split(':')[0];
                    let tagSize = chooseObj.tag.split(':')[1];
                    that.changeChooseColor(tagColor);
                    that.changeChooseSize(tagSize);
                    // 处理颜色尺码数量
                    that.setColorTags(tagSize);
                    that.setSizeTags(tagColor);
                  } else if (that.tagsLen === 1) {
                    that.titleColor = chooseObj.title;
                    that.changeChooseColor(chooseObj.tag);

                    // that.list.forEach(function (listItem) {
                    //     let detailItem = that.tags[0].detail.find(function (d) {
                    //       return d.id == listItem.tag;
                    //     });
                    //     if (detailItem) {
                    //       detailItem.num = listItem.goodsStock;
                    //     }
                    // });

                    // 简写 
                    that.list.forEach(listItem =>{
                      let detailItem = that.tags[0].detail.find(d =>{
                        return d.id == listItem.tag;
                      })
                      if(detailItem){
                        detailItem.num = listItem.goodsStock;
                      }
                    })
                  }

                }
              }else {
                //请求加入购物车接口（单规格）
                let goods = {
                  "number":1,
                  "goods_id":obj.goods_id
                };
                $.ajax({
                  cache: false,
                  async: true,
                  url: '/index.php?m=default&c=cart&a=add_to_cart&rp=goods_detail&rl=add?_=' + Date.now(),
                  type: 'post',
                  dataType: 'json',
                  data: { goods: JSON.stringify(goods) },
                  success(resCar) {
                    that.ajaxFlag = false;
                    try {
                      that.resCar = resCar;
                      if(that.resCar.error == 0) {
                        popup.toast("加入购物车成功");
                        that.getGoodsPrice();//加入购物车成功调用

                        if(that.sysTimeCar > that.activityIn.end_time){
                          setTimeout(function() {
                            popup.toast("当前活动已过期，商品价格不享受优惠");
                          }, 3200);
                        }
                      } else {
                        popup.toast(that.resCar.message, 3000);
                      }
                    } catch (err) {
                      // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
                    }
                  },
                  error(error) {
                    that.ajaxFlag = false;
                    console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
                    this.success(require('../json/preferential_activities.json'));
                    console.warn(`ajax已使用mock数据: url=${this.url}, mock=preferential_activities.json`);
                  }
                });
              }

            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/preferential_activities.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=preferential_activities.json`);
          }
        });


      }
    },

    // 弹窗
    maskPopupShow() {
      this.maskPopupFlag = true;
      if (document.documentElement && document.documentElement.scrollTop) {
        this.scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        this.scrollTop = document.body.scrollTop;
      }
      document.body.style.top = -this.scrollTop + "px";
      document.body.classList.add("fiexAuto");
     
    },
    maskPopupHide() {
      this.maskPopupFlag = false;
      // document.body.classList.remove("fiexAuto");
      document.body.classList.remove("fiexAuto");
      $(document).scrollTop(this.scrollTop);
    },

    //弹框消失时
    handleModalHide() {
      document.body.classList.remove("fiexAuto");
      $(document).scrollTop(this.scrollTop);
    },

    // 商品数量控制
    addChange() {
      if(this.counter >= 1 && this.counter < this.goodsStock) {
        this.counter = parseInt(this.counter) + 1;
      }
      if(this.counter >= this.goodsStock) {
        this.messagePrompt = true;
      }
    },
    minChange() {
      if(this.counter > 1) {
        this.counter = parseInt(this.counter) - 1;
      }
      if( this.counter < this.goodsStock ) {
        this.messagePrompt = false;
      }
    },
    //返回购物车
    returnCar() {
      window.location.href = '/cart.html?rp=goods_detail&rl=cart';
    },
    //跳转————>商品详情
    goGoodsMessage(obj) {
      // window.location.href = `/${obj.goods_id}.html`;
      util.open(`/${obj.goods_id}.html`);
    },
    //多规格商品点击确定
    confirmBtn() {
      let that = this;
      let goods = {
        "number":that.counter,
        "goods_id":that.goodsId
      };
      if(that.goodsId){
        $.ajax({
          cache: false,
          async: true,
          url: '/index.php?m=default&c=cart&a=add_to_cart&rp=goods_detail&rl=add?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: { goods: JSON.stringify(goods) },
          success(resCar) {
            try {
              that.resCar = resCar;
              if(that.resCar.error == 0) {
                that.maskPopupHide();
                popup.toast("加入购物车成功");
                that.getGoodsPrice();//加入购物车成功调用
                if(that.sysTimeCar > that.activityIn.end_time){
                  setTimeout(function() {
                    popup.toast("当前活动已过期，商品价格不享受优惠");
                  }, 3200);
                }
              } else {
                popup.toast(that.resCar.message,3000);
              }
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error(`ajax已执行error回调方法: url=${this.url}, reason=${error.status} ${error.statusText} `);
            this.success(require('../json/preferential_activities.json'));
            console.warn(`ajax已使用mock数据: url=${this.url}, mock=preferential_activities.json`);
          }
        });
      }else {
        if(that.chooseColorId === "") {
          popup.toast("请选择" + that.tagsColorTitle);
          return false;
        }
        if(that.chooseSizeId === "") {
          popup.toast("请选择" + that.tagsSizeTitle);
          return false;
        }
      }
    },
    //活动结束3秒跳回首页
    refundIndex() {
      let that = this;
      if(!(that.sysTime > that.activityIn.start_time && that.sysTime < that.activityIn.end_time)) {
        setTimeout(function() {
          location.href = '/';
        }, 2000);
      }
    }
  },
});
