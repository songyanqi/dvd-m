// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Swiper from 'swiper';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import tj from 'dvd-service-js-tj';
import type from 'dvd-base-js-type';
import date from 'dvd-base-js-date';
import param from 'dvd-base-js-param';
import cache from 'dvd-base-js-cache';
import util from 'dvd-service-js-util';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import share from 'dvd-service-js-share';
import native from 'dvd-service-js-native';
import encrypt from 'dvd-service-js-encrypt';
import pageScrollPosition from 'dvd-base-js-page-scroll-position';
import qrcode from 'dvd-base-js-qrcode';
import Img from 'dvd-base-js-img';
import ajaxFileUpload from 'dvd-service-js-ajax-file-upload';
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';
import Cookies from 'js-cookie';

//大图预览
import preview from '../../../component/com-picture-preview/preview.js';
import videoPlay from '../vue/video_play.vue';
import comSwiper from '../vue/swiper/com-swiper-item.vue';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'video-play':videoPlay,
    'com-swiper-item':comSwiper,
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
      res: null,
      materials:[],
      oldMaterials:[],
      basis:{},
      message:{},
      income:'',
      dataImg:null,
      clipedImg:'',
      goodsId: param.get('goodsId', window.location.href), // 获取url 的活动Id
      materialId: param.get('materialId', window.location.href),
      isSeller: login.isSeller(),
      openDef:false,
      opePereview:false,
      previewItem:{},//微信点击分享获取到的每一项
      items:[
        {
          type: 'img',
          img: '//9i.dvmama.com/free/2018/05/09/goods_material_bg.png',
          x: 0,
          y: 0,
          width: 345,
          height: 453
        },
        // 卖点1
        {
          type: 'text',
          hollow: false,
          x: 172,
          y: 280,
          text: '',
          color: '#333333',
          fontSize: 13,
          fontFamily: 'serif',
          align: 'center',
          baseline: 'top',
          direction: 'ltr'
        },
        //商品名称2
        {
          type: 'text',
          hollow: false,
          x:172,
          y: 300,
          text: '',
          color: '#666666',
          fontSize: 11,
          fontFamily: 'serif',
          align: 'center',
          baseline: 'top',
          direction: 'ltc'
        },
        //价钱3
        {
          type: 'text',
          hollow: false,
          x:172,
          y: 333,
          text:'',
          color: '#FF4A7D',
          fontSize: 13,
          fontFamily: 'serif',
          align: 'center',
          baseline: 'top',
          direction: 'ltr'
        },
        //商品图片4
        {
          type: 'img',
          img: '',
          x: 44.5,
          y: 14.5,
          width: 257,
          height:257
        },
        {
          type: 'text',
          hollow: false,
          x: 172,
          y: 423,
          text: '长按扫描二维码购买',
          color: '#AEAEAE',
          fontSize: 10,
          fontFamily: 'serif',
          align: 'center',
          baseline: 'top'
        },
        {
          type: 'text',
          hollow: false,
          x: 325,
          y: 430,
          text: '',
          color: '#AEAEAE',
          fontSize: 10,
          fontFamily: 'serif',
          align: 'right',
          baseline: 'top'
        },
        //二维码
        {
          type: 'img',
          img: '',
          x: 140.5,
          y: 360,
          width: 60,
          height: 60,
        },
        {
          type: 'img',
          img: '',
          x: 44,
          y: 13,
          width: 83,
          height: 24,
        },
        {
          type: 'text',
          hollow: false,
          x: 82,
          y: 15,
          text: '',
          color: '#fff',
          fontSize: 14,
          fontFamily: 'serif',
          align: 'center',
          baseline: 'top'
        }
      ],
      parentId:null,
      videoFlag:null,
      bigGiftArr:{},
      //优化下载按钮设置的两个开关
      dataImgSwitch:false,   //控制页面第一次进入不显示toast
      dataImgSwitchs:false   //控制页面newVal有值的状态
    };
  },
  computed: {},
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
  },
  created() {
    let that = this;
    that.getData( function(c) {
      // console.log(c);
      that.getStaticResource(function(back) {
        // console.log(back,111);
        that.goodsListData();
      });
    });
    // 获取首屏数据
    // this.getStaticResource(this.goodsListData);
  },
  mounted() {
    this.$nextTick(function() {
      new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide:0,
        observer:true ,
        observeParents:true,
      });
    });
  },
  watch: {
    // 监听response变化
    res() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;
        // 设置分享信息
        try {
          if (!ts.res || !ts.res.data) return;
          share.setShareInfo({
            title: '素材',
            desc: '',
            link: location.href,
            imgUrl: 'http://pic.davdian.com/free/2018/05/29/1024_1024_c8db9fca086bb7453f1f8a9fc2fc1ef5.png',
          }, ts.res);
        } catch (err) {
          console.error(err);
        }
      });
    },
    dataImg(newVal){
      //hama
      if (newVal != null && this.dataImgSwitch==true) {
        popup.loading(false);
        native.Common.downloadImages({
          imgList: this.dataImg
        });
        this.dataImgSwitchs=true;
      }
      if(newVal!=""){
        this.dataImgSwitchs=true;
      }
    }
  },
  filters: {},
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    //获取动态数据
    getData(callback) {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/good/info/shareInfo?_=' + Date.now(),
        type: 'post',
        data: encrypt.ajax({
          goodsId:that.goodsId
        }),
        dataType: 'json',
        success(res) {
          try {
            that.res = res;
            that.message = res.data;
            that.income = res.data.goodsInfo.income;
            if(res.data.goodsInfo.advanceDesc){
              that.items[3].text = '原价'+res.data.goodsInfo.price+' '+res.data.goodsInfo.advanceDesc;
            }else{
              that.items[3].text = '¥'+res.data.goodsInfo.price;
            }

            if(res.data.goodsInfo.goodsLabel && res.data.goodsInfo.goodsLabel != " "){
              that.items[9].text = res.data.goodsInfo.goodsLabel;
              that.items[8].img = '//9i.dvmama.com/free/2018/05/09/group_icon.png';
            }else {
              that.items.splice(8, 1);
            }
            that.items[6].text = '@'+ res.data.shop.sellerName;
            callback('success');
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    goodsListData() {
      //合成图片
      Img.compound({
        canvas: {
          width: 345,
          height: 453
        },
        items: this.items,
        ratio: 2,
        returnType: 'base64'
      }).then(result => {
        // console.log(result,111);
        this.clipedImg = result;
        // console.log(this.clipedImg);
        //先上传在转化成url
        ajaxFileUpload.uploadImg({
          dir: 'goods',
          imgs: [this.clipedImg],
          loading: 0,
          maxSize: 1,
        }).then((dataImg) => {
          this.dataImg = dataImg;
        }, (err) => {
          console.error(err);
        });

      },(err) => {
        alert(err);
      });
    },
    //初始化数据接口
    getStaticResource(callback) {

      let that = this,
          urlJson;

      if('[[env]]' === 'dev') {
        urlJson = 'https://t.vyohui.cn/dev/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      } else if ('[[env]]' === 'beta') {
        urlJson = 'https://t.vyohui.cn/beta/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      } else {
        urlJson = 'https://5t.dvmama.com/goods/goods_' + that.goodsId + '.json?_=' + Date.now();
      }

      $.ajax({
        cache: false,
        async: true,
        // url: 'https://t.vyohui.cn/beta/goods/goods_'+that.goodsId+ '.json?_=' + Date.now(),
        url: urlJson,
        type: 'get',
        data: encrypt.ajax({

        }),
        dataType: 'json',
        success(res) {
          try {
            that.basis = res.basis;
            // console.log(that.basis,'that.basis');

            that.oldMaterials = res.basis.materials;
            that.parentId = res.basis.parentId;//父商品id
            //图片压缩处理
            // var dvdwebp = Cookies.get('dvdwebp');//压缩图片判断图片是否支持webp 格式
            if(res.basis.materials.length > 0 ) {

              //判断分享出去的视频是否还存在
              res.basis.materials.forEach(function(itemList) {
                if (that.materialId == itemList.materialId || that.materialId == undefined){
                  that.videoFlag = -1;
                }
              });

              if(that.videoFlag !== -1){
                popup.toast('该视频已删除')
                setTimeout(function() {
                  location.href = '/';
                }, 2000);
              }

              that.materials = res.basis.materials.map(item => {
                let temp = {...item};
                var webPsize = '?x-oss-process=image/quality,Q_90/resize,m_lfit,w_1000,h_1000';
                if(temp.imageList){
                  for(var i = 0; i < temp.imageList.length; i ++){
                    temp.imageList[i].imgOriginal = temp.imageList[i].imgOriginal + webPsize;
                  }
                }
                return temp;
              });
              // console.log(that.materials,'materials123456789');
            }


            if(res.basis.sellingPoint !=''){
              that.items[1].text = '#'+res.basis.sellingPoint+'#';
            }else{
              that.items[1].text = '';
            }
            let obj = that.getStr(res.basis.goodsName, 40);
            that.items[2].text = obj.str1;
            that.items.push({
              type: 'text',
              hollow: false,
              x:172,
              y: 317,
              text: obj.str2,
              color: '#666666',
              fontSize: 11,
              fontFamily: 'serif',
              align: 'center',
              baseline: 'top',
              direction: 'ltc'
            });

            that.items[4].img = res.basis.goodsImg;
            // console.log(that.items[4].img);

            // console.log(that.items)
            //生成二维码
            qrcode.getBase64({
              minVersion: 1,
              maxVersion: 40,
              ecLevel: 'Q',
              left: 0,
              top: 0,
              size: 120,
              fill: '#000',
              text: window.location.protocol + '//' + window.location.host +'/'+that.goodsId+'.html',
              mode: 4,
              mSize: 0.3,
              mPosX: 0.5,
              mPosY: 0.5,
              logo: '//9i.dvmama.com/free/2018/05/09/logo_bg_icon.png'
            })
              .then(function (base64) {
                // console.log(base64);
                that.items[7].img = base64;
                callback('success');
              });
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    //获取字符串
    getStr(str, splitLength) {
      var currentLength = 0, realLength = 0, len = str.length, charCode = -1, str1 = '', str2 = '';
      for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if(charCode >= 0 && charCode <= 128){
          realLength += 1;
        } else{
          realLength += 2;
        }
        currentLength += 1;
        if (realLength >= splitLength) {
          str1 = str.substr(0, currentLength);
          str2 = str.substr(currentLength);
          let longStrObj = this.getLength(str2, splitLength);
          if (longStrObj.longStr) {
            str2 = str2.substr(0, longStrObj.currentLength);
            str2 += '...';
          }
          return {
            str1: str1,
            str2: str2
          };
        }
      }
      return {
        str1: str,
        str2: ''
      };
    },
    //计算字符串长度
    getLength(str, splitLength) {
      var currentLength = 0, realLength = 0, len = str.length, charCode = -1;
      for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if(charCode >= 0 && charCode <= 128){
          realLength += 1;
        } else{
          realLength += 2;
        }
        currentLength += 1;
        if (realLength >= splitLength) {
          return {
            longStr: true,
            currentLength: currentLength
          };
        }
      }
      return {
        longStr: false,
        currentLength: currentLength
      };

    },
    // 下载
    toDownload(index,item) {
      if (window.gio) {
        gio('track', 'clickDownload', { shareSource: '', shareSourceName: '' });
      }
      if (item.materialType == 1) {
        this.detailData(item.imageList, () => {
          this.toDownloadNext(item);
        });//二维码数据整合
      }else {
        this.toDownloadNext(item);
      }
    },
    toDownloadNext (item) {
      let that = this;
      if(ua.isDvdApp()) {
        //视频
        if(item.materialType == 2) {
          native.Common.downloadVideo({
            videoUrl:item.videoUrl
          });
        }else if(item.materialType == 1) {
          var imageList = [];
          for(let i =0; i < item.imageList.length; i++) {
            if(item.imageList[i].imgSplice  == ''){
              imageList.push(item.imageList[i].imgOriginal);
            } else {
              imageList.push(item.imageList[i].imgSplice);
            }
          }
          native.Common.downloadImages({
            imgList: imageList
          });
        } else {
          this.dataImgSwitch=true;
          if(this.dataImg==null){
            popup.loading(true);
          }
          if(this.dataImg!="" && this.dataImgSwitchs==true){
            native.Common.downloadImages({
              imgList: this.dataImg
            });
          }
        }

        // if(item.materialType == 2) {
        //   native.Common.downloadVideo({
        //     videoUrl:item.videoUrl
        //   });
        // }else if(item.materialType == 1) {
        //   var imageList = [];
        //   for(let i =0; i < item.imageList.length; i++) {
        //     if(item.imageList[i].imgSplice  == ''){
        //       imageList.push(item.imageList[i].imgOriginal);
        //     } else {
        //       imageList.push(item.imageList[i].imgSplice);
        //     }
        //   }
        //   native.Common.downloadImages({
        //     imgList: imageList
        //   });
        // } else {
        //   native.Common.downloadImages({
        //     imgList: this.dataImg
        //   });
        // }
      }
    },
    //分享
    toShare(index,item) {
      let that = this,
        parentId;
      if(that.parentId == 0){
        parentId = that.goodsId;
      }else {
        parentId = that.parentId;
      }
      // 分享统计
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/good/info/shareCount?_=' + Date.now(),
        type: 'post',
        data: encrypt.ajax({
          goodsId:parentId
        }),
        dataType: 'json',
        success(respones) {
          try {
            console.log(respones,'respones');
          } catch (err) {
            console.log(err);
          }
        }
      });

      if (item.materialType == 1) {
        this.detailData(item.imageList, () => {
          this.toShareNext(index,item);
        });//二维码数据整合
      }else {
        this.toShareNext(index,item);
      }

    },
    toShareNext(index,item){
      let that = this;
      that.previewItem = item;
      // console.log(that.previewItem,'previewItem');
      if(ua.isDvdApp()) {
        if(that.isSeller) {
          //截取url参数
          function GetQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
          }
          //为了大礼包商品分享时文案修改 图片分享
          function sharePicFun(){
            native.Share.imageShare({
              title: '邀请好友',
              desc:"好友通过您的分享购买礼包，您将获得现金奖励",
              imgUrl:that.dataImg[0],
              production:"32",
              actionType:"0"
            });
          }
          //多图common
          if(item.materialType == 1) {
            var imageShare = [];
            for(let i =0; i < item.imageList.length; i++) {
              if(item.imageList[i].imgSplice  == ''){
                imageShare.push(item.imageList[i].imgOriginal);
              } else {
                imageShare.push(item.imageList[i].imgSplice);
              }
            }
              native.Share.imgListShare({
                title: GetQueryString("type")==1 ? '邀请好友' : '分享至少赚'+that.income+'元',
                desc: GetQueryString("type")==1 ? "好友通过您的分享购买礼包，您将获得现金奖励" : "好友通过您的分享购买商品，您就能够获得返现",
                shareDesc: item.copywriting,
                imgList: imageShare,
                url: window.location.protocol + '//' + window.location.host+'/'+ item.goodsId+ '.html',
                // url: window.location.href,
                //打点统计信息
                production: "32",
                actionType: "0"
              });
          } else if(item.materialType == 2) {
              // 视频分享
              native.Share.videoShare({
                imgUrl: item.videoImg,
                title: GetQueryString("type")==1 ? '邀请好友' : '分享至少赚'+that.income+'元',
                desc:GetQueryString("type")==1 ? "好友通过您的分享购买礼包，您将获得现金奖励" : "好友通过您的分享购买商品，您就能够获得返现",
                goodsUrl:window.location.protocol + '//' + window.location.host+'/'+item.goodsId+'.html',
                // goodsUrl:window.location.href,
                shareDesc: item.copywriting,
                shareTitle: this.basis.shareGoodsName,//分享商品名称
                url: window.location.protocol + '//' + window.location.host + '/m/commodity_material.html?goodsId='+item.goodsId+'&materialId='+item.materialId,
                videoUrl: item.videoUrl,
                //打点统计信息
                production: "32",
                actionType: "0"
              });
          } else {
              native.Share.imageShare({
                //合成图片分享
                title: GetQueryString("type")==1 ? '邀请好友' : '分享至少赚'+that.income+'元',
                desc: GetQueryString("type")==1 ? "好友通过您的分享购买礼包，您将获得现金奖励" : "好友通过您的分享购买商品，您就能够获得返现",
                imgUrl:that.dataImg[0],
                production:"32",
                actionType:"0"
              });
          }
        } else {
          //多图common
          if(item.materialType == 1) {
            var imgs = [];
            for(let i =0; i < item.imageList.length; i++) {
              if(item.imageList[i].imgSplice  == ''){
                imageShare.push(item.imageList[i].imgOriginal);
              } else {
                imageShare.push(item.imageList[i].imgSplice);
              }
            }
              native.Share.imgListShare({
                title: GetQueryString("type")==1 ? '邀请好友' : '分享至少赚'+that.income+'元',
                desc: GetQueryString("type")==1 ? "好友通过您的分享购买礼包，您将获得现金奖励" : "好友通过您的分享购买商品，您就能够获得返现",
                shareDesc: item.copywriting,
                imgList: imgs,
                url: window.location.protocol + '//' + window.location.host+'/'+ item.goodsId+ '.html',
                // url: window.location.href,
                //打点统计信息
                production: "32",
                actionType: "0"
              });
          } else if(item.materialType == 2) {
            if(GetQueryString("type")==1){
              native.Share.videoShare({
                imgUrl: item.videoImg,
                title: '邀请好友',
                desc:"好友通过您的分享购买礼包，您将获得现金奖励",
                goodsUrl:window.location.protocol + '//' + window.location.host+'/'+item.goodsId+'.html',
                // goodsUrl:window.location.href,
                shareDesc: item.copywriting,
                shareTitle: this.basis.shareGoodsName,//分享商品名称
                url: window.location.protocol + '//' + window.location.host + '/m/commodity_material.html?goodsId='+item.goodsId+'&materialId='+item.materialId,
                videoUrl: item.videoUrl,
                //打点统计信息
                production: "32",
                actionType: "0"
              });
            }else{
              // 视频分享
              native.Share.videoShare({
                imgUrl: item.images,
                desc:"好友通过您的分享购买商品，您就能够获得返现",
                goodsUrl:window.location.protocol + '//' + window.location.host +'/'+item.goodsId+'.html',
                // goodsUrl:window.location.href,
                shareDesc: item.copywriting,
                shareTitle: this.basis.shareGoodsName,//分享商品名称
                url: window.location.protocol + '//' + window.location.host + '/m/commodity_material.html?goodsId='+item.goodsId+'&materialId='+item.materialId,
                videoUrl: item.videoUrl,
                //打点统计信息
                production: "32",
                actionType: "0"
              });
            }
          } else {
            if(GetQueryString("type")==1){
              sharePicFun();
            }else{
              native.Share.imageShare({
                //合成图片分享
                desc:"好友通过您的分享购买商品，您就能够获得返现",
                imgUrl:that.dataImg[0],
                production:"32",
                actionType:"0"
              });
            }
          }
        }

      }else {
        if(index === 0){
          that.openDef = true;
          that.maskPopupShow();
        }else {
          that.opePereview = true;
          that.maskPopupShow();
        }
      }

    },

    // 下载分享二维码数据整合
    detailData(imageList, callback) {
      document.body.className = "";
      let imgIndex = 0;
      if(imageList){
        imageList.forEach(function (imgObj, i, list) {
          if (imgObj.imgSplice.indexOf("speard.php") > -1) {
            var imagesObj = {
              host:window.location.host
            };
            var pa = imgObj.imgSplice.split("?")[1].split("&");
            // console.log(pa, 'pa');
            pa.forEach(function (p) {
              imagesObj[p.split("=")[0]] = p.split("=")[1];
            });
            // console.log(imagesObj, 'imagesObj');
            (function(imgListObj, index) {
              $.ajax({
                url: "/images/api/speard/index?redirect_flag=0",
                data: imgListObj,
                type: 'POST',
                dataType: "json",
                success: function (result) {
                  imgIndex++;
                  if (!+result.code) {
                    // console.log(result.data.url);
                    // console.log(imgIndex, 'imgIndex');
                    list[index].imgSplice = result.data.url;
                  }
                  if (imgIndex >= list.length) {
                    document.body.className = "loaded";
                    if (callback) {
                      callback();
                    }
                  }
                },
                error: function (err) {
                  list[index].imgSplice = list[index].imgOriginal;
                  document.body.className = "loaded";
                  if (callback) {
                    callback();
                  }
                }
              });
            })(imagesObj, i);
          } else {
            imgIndex++;
            if (imgIndex >= list.length) {
              document.body.className = "loaded";
              if (callback) {
                callback();
              }
            }
          }
        });
      }else {
        document.body.className = "loaded";
      }


    },
    closeCanvas(){
      this.openDef = false;
      this.maskPopupHide();
    },
    closePreview(){
      this.opePereview = false;
      this.maskPopupHide();
    },
    //跳转文章
    toClassDetaile(item) {
      window.location.href = '/class_detail.html?pageId='+item.pageId+'&rp=class_list&rl=list';
    },
    // 查看大图
    viewBigPic(i, objList) {
      // console.log(objList,'objList');
      this.detailData(objList, () => {
        let imageList = objList.map(function(item) {
          return item.imgSplice ? item.imgSplice : item.imgOriginal;
        })
        preview.preview(i, imageList);
        // if(ua.isDvdApp()){
        //   native.BookStore.imagesBrowser({
        //     imageList:imageList,
        //     startIndex:i
        //   });
        // }
      });
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
      // document.body.classList.add("fiexAuto");
    },
    maskPopupHide() {
      this.maskPopupFlag = false;
      // document.body.classList.remove("fiexAuto");
      document.body.classList.remove("fiexAuto");
      $(document).scrollTop(this.scrollTop);
    }
  },
});
