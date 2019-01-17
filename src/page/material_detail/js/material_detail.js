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
import comSwiperItem from '../vue/swiper/com-swiper-item.vue';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
    'video-play':videoPlay,
    'com-swiper-item':comSwiperItem,
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
      pageId: param.get('pageId', window.location.href), // 获取文章的pageId
      topicId:param.get('topicId', window.location.href), //获取专题的topicId
      materialId: param.get('materialId', window.location.href),
      typeId:param.get('typeId', window.location.href),//通过url 区分从文章还是专题跳转过来的
      qrCodeUrl:param.get('qrCodeUrl', window.location.href),//通过url 区分从文章还是专题跳转过来的
      isSeller: login.isSeller(),
      opePereview:false,
      previewItem:{},//微信点击分享获取到的每一项
      videoFlag:null,
    };
  },
  computed: {},
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
  },
  created() {
    let that = this;
    that.getStaticResource();
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
  },
  filters: {},
  methods: {
    /**
     * 获取首屏数据
     * @see wiki 接口名
     */
    //初始化数据接口
    getStaticResource() {

      let that = this,
        urlJson;

      if(that.typeId == 1){
        // urlJson = 'https://t.vyohui.cn/beta/page/page_'+ that.pageId+'.json?_=' + Date.now();
        if ('[[env]]' === 'dev') {
          urlJson = 'https://t.vyohui.cn/dev/page/page_' + that.pageId + '.json?_=' + Date.now();
        } else if ('[[env]]' === 'beta') {
          urlJson = 'https://t.vyohui.cn/beta/page/page_' + that.pageId + '.json?_=' + Date.now();
        } else {
          urlJson = 'https://stc.davdian.com/page/page_' + that.pageId + '.json?_=' + Date.now();
        }
      } else {
        // urlJson = 'https://t.vyohui.cn/beta/topic/topic_' + that.topicId + '.json?_=' + Date.now();
        if ('[[env]]' === 'dev') {
          urlJson = 'https://t.vyohui.cn/dev/topic/topic_' + that.topicId + '.json?_=' + Date.now();
        } else if ('[[env]]' === 'beta') {
          urlJson = 'https://t.vyohui.cn/beta/topic/topic_' + that.topicId + '.json?_=' + Date.now();
        } else {
          urlJson = 'https://stc.davdian.com/topic/topic_' + that.topicId + '.json?_=' + Date.now();
        }
      }

      if(that.typeId == 1){
        var obj = {
          pageId:that.pageId
        }
      }else {
        var obj = {
          topicId:that.topicId
        }
      }
      $.ajax({
        cache: false,
        async: true,
        // url: 'https://www.easy-mock.com/mock/5a01a239eb912629e779443d/class?_=' + Date.now(),
        url: urlJson,
        type: 'get',
        data: encrypt.ajax(
          obj
        ),
        dataType: 'json',
        success(res) {
          try {
            that.res = res;
            // console.log(res,'res');
            //图片压缩处理
            if(res.materials.length > 0 ) {
              // 文字换行符处理
              for(let i = 0;i < res.materials.length; i++) {
                var content_text = res.materials[i].copywriting;
                content_text = content_text.replace(/\n/g,'<br/>');
                res.materials[i].copywriting = content_text;
                // console.log(content_text);
              }

              //判断分享出去的视频是否还存在
              res.materials.forEach(function(itemList) {
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

              that.materials = res.materials.map(item => {
                let temp = {...item};
                var webPsize = '?x-oss-process=image/quality,Q_90&';
                //需要替换的二维码地址，从url查询参数中传递过来的
                let deQrCodeUrl = that.qrCodeUrl;
                // if (deQrCodeUrl) {
                //   deQrCodeUrl = decodeURIComponent(that.qrCodeUrl);
                // }
                if(temp.imageList){
                  for(let i = 0; i < temp.imageList.length; i ++){
                    let value = temp.imageList[i];
                    value.imgOriginal = value.imgOriginal + webPsize;
                    //替换二维码图片
                    if (deQrCodeUrl && value.imgSplice) {
                      //value.imgSplice = value.imgSplice + '&host=' + window.location.host;
                      let split = value.imgSplice.split('?');
                      if (split && split.length > 0) {
                        let obj = param.toObj(split[1]);
                        if (obj && obj.uri) {
                          value.imgSplice = value.imgSplice.replace(obj.uri, deQrCodeUrl) + '&host=' + window.location.host;
                        }
                      }
                    }
                  }
                }
                return temp;
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
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
      if(ua.isDvdApp()) {
        //视频
        if(item.materialType == 2) {
          native.Common.downloadVideo({
            videoUrl:item.videoUrl
          });
        }else {
          var imageList = [];
          for(let i =0; i < item.imageList.length; i++) {
            if(item.imageList[i].imgSplice){
              imageList.push(item.imageList[i].imgSplice);
            } else {
              imageList.push(item.imageList[i].imgOriginal);
            }
          }
          native.Common.downloadImages({
            imgList: imageList
          });
        }

      }
    },
    //分享
    toShare(index,item) {
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
        //打点统计判断是文章还是专题
        if(that.typeId == 1){
          //多图common
          if(item.materialType == 1) {
            var imageShare = [];
            for(let i =0; i < item.imageList.length; i++) {
              if(item.imageList[i].imgSplice){
                imageShare.push(item.imageList[i].imgSplice);
              } else {
                imageShare.push(item.imageList[i].imgOriginal);
              }
            }

            native.Share.imgListShare({
              // title: '分享至少赚'+that.income+'元',
              // desc:"好友通过您的分享购买商品，您就能够获得返现",
              shareDesc: item.copywriting,
              shareTitle: that.res.title,//分享文章标题
              imgList: imageShare,
              url: window.location.protocol + '//' + window.location.host+'/m/class_detail.html?pageId='+that.pageId+'&rp=class_list&rl=list',
              //打点统计信息
              production: 33,
              actionType: 0

            });

          } else if(item.materialType == 2) {
            // 视频分享
            native.Share.videoShare({
              imgUrl: item.videoImg,
              goodsUrl:window.location.protocol + '//' + window.location.host + '/m/material_detail.html?typeId=1&pageId='+that.pageId+'&materialId='+item.materialId,
              shareDesc: item.copywriting,
              shareTitle: that.res.title,//分享文章标题
              url: window.location.protocol + '//' + window.location.host + '/m/material_detail.html?typeId=1&pageId='+that.pageId+'&materialId='+item.materialId,
              videoUrl: item.videoUrl,
              //打点统计信息
              production: 33,
              actionType: 0

            });
          }
        }else{
          //多图common
          $.ajax({
            cache: false,
            async: true,
            url: '/sale/api/topic/getTopicInfo?_=' + Date.now(),
            type: 'post',
            data: encrypt.ajax({
              topicId:that.topicId
            }),
            dataType: 'json',
            success(respones) {
              try {
                if(respones.code == 0){
                  if(respones && respones.data && respones.data.topicContent){
                    var shareTitle = JSON.parse(respones.data.topicContent).info.shareTitle;


                    if(item.materialType == 1) {
                      var imageShare = [];
                      for(let i =0; i < item.imageList.length; i++) {
                        if(item.imageList[i].imgSplice){
                          imageShare.push(item.imageList[i].imgSplice);
                        } else {
                          imageShare.push(item.imageList[i].imgOriginal);
                        }
                      }

                      native.Share.imgListShare({
                        shareTitle: shareTitle,//分享文章标题
                        shareDesc: item.copywriting,
                        imgList: imageShare,
                        url: window.location.protocol + '//' + window.location.host+'/m/class_detail.html?topicId='+that.topicId,
                        //打点统计信息
                        production: 34,
                        actionType: 0

                      });

                    } else if(item.materialType == 2) {
                      // 视频分享
                      native.Share.videoShare({
                        imgUrl: item.videoImg,
                        goodsUrl:window.location.protocol + '//' + window.location.host + '/m/material_detail.html?topicId='+that.topicId+'&materialId='+item.materialId,
                        shareDesc: item.copywriting,
                        shareTitle: shareTitle,//分享文章标题
                        url: window.location.protocol + '//' + window.location.host + '/m/material_detail.html?topicId='+that.topicId+'&materialId='+item.materialId,
                        videoUrl: item.videoUrl,
                        //打点统计信息
                        production: 34,
                        actionType: 0
                      });
                    }

                  }
                }
                // console.log(shareTitle);
              } catch (err) {
                console.log(err);
              }
            }
          });

        }

      }else {
        that.opePereview = true;
        that.maskPopupShow();
      }

    },

    // 分享二维码数据整合
    detailData(imageList, callback) {
      document.body.className = ""
      let imgIndex = 0;
      imageList.forEach(function (imgObj, i, list) {
        if (imgObj.imgSplice && imgObj.imgSplice.indexOf("speard.php") > -1) {
          var imagesObj = {
            host:window.location.host
          };
          var pa = imgObj.imgSplice.split("?")[1].split("&");
          // console.log(pa, 'pa');
          pa.forEach(function (p) {
            imagesObj[p.split("=")[0]] = p.split("=")[1];
          });
          (function(imgListObj, index) {
            $.ajax({
              url: "/images/api/speard/index?redirect_flag=0",
              data: imgListObj,
              type: 'POST',
              dataType: "json",
              success(result) {
                imgIndex++;
                if (!+result.code) {
                  list[index].imgSplice = result.data.url;
                }
                if (imgIndex >= list.length) {
                  document.body.className = "loaded";
                  if (callback) {
                    callback();
                  }
                }
              },
              error(err) {
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
    },
    closePreview(){
      this.opePereview = false;
      this.maskPopupHide();
    },
    // 查看大图
    viewBigPic(i, objList) {
      this.detailData(objList, () => {
        let imageList = objList.map(function(item) {
          return item.imgSplice ? item.imgSplice : item.imgOriginal;
        });
        preview.preview(i, imageList);
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
    },
    maskPopupHide() {
      this.maskPopupFlag = false;
      document.body.classList.remove("fiexAuto");
      $(document).scrollTop(this.scrollTop);
    }
  },
});
