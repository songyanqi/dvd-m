  import native from 'dvd-service-js-native';
  import util from 'dvd-service-js-util';
  import ua from 'dvd-base-js-ua';
  import encrypt from 'dvd-service-js-encrypt';
  import login from 'dvd-service-js-login';
  import Img from 'dvd-base-js-img';
  import qrcode from 'dvd-base-js-qrcode';
  import ajaxFileUpload from 'dvd-service-js-ajax-file-upload';
  import comSwiper from './swiper/com-swiepr.vue';
  import popup from "dvd-service-js-popup";
  import $ from "jquery";

  export default {
    props:['goodsdatabasis','materials','price','goodsid','memprice','otheract','sellername','activityinfo'],
    data() {
      return {
        onOffFlag:false,// 素材模块
        opePereviewVideo:false,//微信视频预览
        opePereviewPic:false,//多图
        openDef:false,//默认打开合成图片
        onOffClassArr:['key-bottom','key-top'],
        clipedImg: null,
        selectIndex:0, //默认选中第0个
        selectItem: {},
        firstItem: {}, // 初始化第一条数据时，同时给selectItem 赋值
        isSeller: login.isSeller(),//判断是否是已登录卖家rectangle_bg.png
        ua,
        needShowShare:false,
        dataImg:'',
        earningMoney:'', // 分享奖励
        items:[
          {
            type: 'img',
            img: '//pic.davdian.com/free/2018/05/09/goods_material_bg.png',
            x: 0,
            y: 0,
            width: 345,
            height: 453
          },
          // 卖点
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
          //商品名称
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
          //价钱
          {
            type: 'text',
            hollow: false,
            x:172,
            y: 333,
            text:'',
            color: '#FF4A7D',
            fontSize: 15,
            fontFamily: 'Helvetica',
            align: 'center',
            baseline: 'top',
            direction: 'ltr'
          },
          //商品图片
          {
            type: 'img',
            img: this.goodsdatabasis.goodsImg,
//            img: 'http://pic.davdian.com/supplier/2017/12/12/800_800_877bd186b4dadea40e9620b0e07c8dcf.jpg',
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
            text: '@'+ this.sellername,
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
      };
    },
    components: {
      'com-swiper':comSwiper,
    },
    watch: {

    },
    created() {
      // 价钱
      this.$root.eventHub.$on("finalPrices",(price) => {
        this.earningMoney = this.price.totalIncome;//分享赚
        if (this.otheract.isStacks) {
          this.items[3].text = '¥'+ this.price.marketPrice;
        } else {
          this.items[3].text = '¥'+ price;
        }
      });

      // 字符截取
      if(this.goodsdatabasis.sellingPoint != ''){
        this.items[1].text = '#'+ this.goodsdatabasis.sellingPoint +'#';
      }else {
        this.items[1].text = '';
      }
      let obj = this.getStr(this.goodsdatabasis.goodsName, 40);
      this.items[2].text = obj.str1;
      this.items.push({
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
      this.goodsListData(this.choose);

    },
    mounted() {
      this.$nextTick(function() {
        this.swiper = new Swiper('.box-container', {
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          initialSlide:0,
          observer:true ,
          observeParents:true
        });
      });
    },
    methods: {
      goodsListData(callback) {
        let that = this;
        //生成二维码
        qrcode.getBase64({
          minVersion: 1,
          maxVersion: 40,
          // error correction level: 'L', 'M', 'Q' or 'H'（容错率，H最高）
          ecLevel: 'Q',
          // offset in pixel if drawn onto existing canvas
          left: 0,
          top: 0,
          // size in pixel
          size: 120,
          fill: '#000',
          text: window.location.href,
          mode: 4,
          mSize: 0.3,
          mPosX: 0.5,
          mPosY: 0.5,
          logo: '//pic.davdian.com/free/2018/05/09/logo_bg_icon.png'
        })
          .then(function (base64) {
            that.items[7].img = base64;
            callback();
          });
      },
      //展开收起按钮
      trunOff() {
        if (this.onOffFlag === false) {
          this.onOffFlag = true;
        } else {
          this.onOffFlag = false;
        }
      },

      //关闭微信分享展示分享预览图片
      closePreviewVideo() {
        this.opePereviewVideo = false;
        this.maskPopupHide();
      },
      closeCanvas() {
        this.openDef = false;
        this.maskPopupHide();
      },
      closePereviewPic() {
        this.opePereviewPic = false;
        this.maskPopupHide();
      },

      // 合成图片
      choose() {
      	let that = this;
        //判断有没有活动
        if(this.activityinfo && this.activityinfo.activitys.length > 0) {
          this.items[9].text = this.activityinfo.activitys[0].actLabel;
          this.items[8].img = '//pic.davdian.com/free/2018/05/09/group_icon.png';
        }else {
          this.items.splice(8, 1);
        }

        Img.compound({
          canvas: {
            width: 345,
            height: 453,
          },
          items: this.items,
          ratio: 2,
          returnType: 'base64'
        }).then(result => {
          that.clipedImg = result;
          //先上传在转化成url
          ajaxFileUpload.uploadImg({
            dir: 'goods',
            imgs: [result],
            loading: 0,
            maxSize: 1,
          }).then((dataImg) => {
            that.dataImg = dataImg[0];
            if(that.needShowShare){
            	that.onKeyShareNext();
            	popup.loading(0);
            	that.needShowShare = false;
            }
            

            that.$emit('ievent',dataImg);
          }, (err) => {
            console.error(err);
          });

        },(err) => {
          alert(err);
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
      // 选中分享信息
      toSelect(index, item) {
        this.selectIndex = index;
        this.selectItem = item;
      },

      // 一键分享
      oneKeyShare() {
        let that = this,
          parentId;
        if(that.goodsdatabasis.parentId == 0){
          parentId = that.goodsdatabasis.goodsId;
        }else {
          parentId = that.goodsdatabasis.parentId;
        }
        //分享人数统计
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

        // 多图  生成二维码请求图片数据处理
        if(that.selectItem.materialType == 1) {
          document.body.className = ""
          let imgIndex = 0;
          if(that.selectItem.imageList){
            that.selectItem.imageList.forEach(function (imgObj, i, list) {
              if (imgObj.imgSplice.indexOf("speard.php") > -1) {
                var imagesObj = {
                  host:window.location.host
                };
                var pa = imgObj.imgSplice.split("?")[1].split("&");

                pa.forEach(function (p) {
                  imagesObj[p.split("=")[0]] = p.split("=")[1];
                });

                (function(imgListObj, index) {
                  $.ajax({
                    url: "/images/api/speard/index?redirect_flag=0",
                    data: imgListObj,
                    type: 'POST',
                    dataType: "json",
                    success: function (result) {
                      imgIndex++;
                      if (!+result.code) {
                        list[index].imgSplice = result.data.url;
                      }
                      if (imgIndex >= list.length) {
                        document.body.className = "loaded";
                        that.onKeyShareNext();
                      }
                    },
                    error: function (err) {
                      list[index].imgSplice = list[index].imgOriginal;
                      document.body.className = "loaded";
                      that.onKeyShareNext();

                    }
                  });
                })(imagesObj, i);
              } else {
                imgIndex++;
                if (imgIndex >= list.length) {
                  document.body.className = "loaded";
                  that.onKeyShareNext();
                }
              }
            });
          }else {
            document.body.className = "loaded";
          }
        } else {
          that.onKeyShareNext();
        }
      },
      onKeyShareNext(){
        let that = this;
        //合成图片点击调用command
        if(that.dataImg === '') {
          // popup.toast('图片合成中，请稍等~');
          // 合成图片
          setTimeout(function(){
          	if(that.dataImg === ''){
          		popup.loading(true);
          	}
          },500)
          
          that.needShowShare = true;

        }else {
          if(ua.isDvdApp()) {
            //多图common
            if(that.selectItem.materialType == 1) {
              var imageList = [];
              for(let i =0; i < this.selectItem.imageList.length; i++) {
                if(this.selectItem.imageList[i].imgSplice === ''){
                  imageList.push(this.selectItem.imageList[i].imgOriginal);
                }else {
                  imageList.push(this.selectItem.imageList[i].imgSplice);
                }

              }
              native.Share.imgListShare({
                title:"分享赚"+this.earningMoney+'元',
                desc:"好友通过您的分享购买商品，您就能够获得返现",
                shareDesc: that.selectItem.copywriting,
                url: window.location.protocol + '//' + window.location.host+'/'+ that.selectItem.goodsId+ '.html',
//                url: window.location.href,
                imgList: imageList,
                //打点统计信息
                production: 31,
                actionType: 2
              });

            } else if(that.selectItem.materialType == 2) {
              // 视频分享
              native.Share.videoShare({
                title:"分享赚"+this.earningMoney+'元',
                desc:"好友通过您的分享购买商品，您就能够获得返现",
                imgUrl: that.selectItem.videoImg,
//                goodsUrl:window.location.protocol + '//' + window.location.host +'/'+this.goodsid+'.html',
                goodsUrl:window.location.protocol + '//' + window.location.host +'/'+that.selectItem.goodsId+'.html',
                shareTitle: this.goodsdatabasis.shareGoodsName,//分享商品名称
                shareDesc: that.selectItem.copywriting,
                url: window.location.protocol + '//'+ window.location.host + '/m/commodity_material.html?goodsId='+that.selectItem.goodsId+'&materialId='+that.selectItem.materialId,
                videoUrl: that.selectItem.videoUrl,
                //打点统计信息
                production: 31,
                actionType: 2
              });
            } else {
              native.Share.imageShare({
                title:"分享赚"+this.earningMoney+'元',
                desc:"好友通过您的分享购买商品，您就能够获得返现",
                //合成图片分享
                imgUrl:that.dataImg,
                production:31,
                actionType:2
              });
            }
          }else {
            //H5
            if(that.selectItem.materialType == 1){
              this.opePereviewPic = true;
              this.maskPopupShow();
            }else if(that.selectItem.materialType == 2){
              this.opePereviewVideo = true;
              this.maskPopupShow();
            }else {
              this.openDef = true;
              this.maskPopupShow();
            }
          }
        }
      },
      //全部素材页面
      toMaterial() {
        window.location.href = '/m/commodity_material.html?goodsId='+this.goodsdatabasis.goodsId+'&rp=goods_detail&rl=spread';
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

    }
  }