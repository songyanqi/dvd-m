// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

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
import imgLazyload from 'dvd-service-js-img-lazyload/dvd-service-js-img-lazyload';
import hybrid from 'dvd-service-js-hybrid';
// import Swiper from 'swiper';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default,
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
    };
  },
  computed: {},
  beforeCreate() {
    // 图片懒加载
    imgLazyload.init();
    // 是否使用mock数据
    window.mock = 1;
  },
  created() {
  },
  mounted() {
    let ts = this;
    // this.fn_7();
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置分享信息
        try {
          if (!ts.response || !ts.response.data) return;
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg,
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
  filters: {},
  methods: {
    fn_1() {
      hybrid.Network.uploadFile({
        type: '0',
        limit: '5',
        dir: 'test',
        sourceType: '0',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },


    fn_1_1() {
      hybrid.Network.uploadFile({
        type: '1',
        limit: '5',
        dir: 'test',
        sourceType: '1',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },
    fn_1_2() {
      hybrid.Network.uploadFile({
        type: '2',
        limit: '5',
        dir: 'test',
        sourceType: '2',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_2() {
      hybrid.Network.uploadFile({
        type: 'Video',
        limit: '3',
        dir: 'test',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_3() {
      hybrid.Network.downloadFile({
        list: [
          'https://9i.dvmama.com/activity/2018/07/24/1125_480_b100d9c305b76d9efb291f8ccdaed708.png?x-oss-process=image/quality,Q_90',
          // 'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg',
          'https://9i.dvmama.com/free/1018/zhufu-4.mp4',
        ],
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_4() {
      hybrid.Image.showBigImage({
        bigImages: [
          'https://9i.dvmama.com/activity/2018/07/24/1125_480_b100d9c305b76d9efb291f8ccdaed708.png?x-oss-process=image/quality,Q_90',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/goods/2018/07/24/1125_843_74c6dd9f39a26b12c22f439d85494fc2.jpg?x-oss-process=image/format,webp',
          'https://9i.dvmama.com/activity/2018/07/24/1125_480_b100d9c305b76d9efb291f8ccdaed708.png?x-oss-process=image/quality,Q_90',
        ],
        showIndex: '1',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_5() {
      hybrid.Location.getLocation({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_6() {
      hybrid.Account.getUserInfo({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_7() {
      hybrid.Audio.showAudioContent({
        itemList: [
          {
            src: 'https://m5.dvmama.com/contentAudio/201804125458/15235287502034.mp3',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_9c208dde9dc2c723ca486653b4cef149.jpg',
            title: '再见，电视机',
          },
          {
            src: 'https://m5.dvmama.com/contentAudio/201804128431/15235277954106.mp3',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_aecdcac1aaefb068fdec3d88b9b9d7c0.jpg',
            title: '《如果把银河系装进盘子里》-地球的历史和生命',
          },
          {
            src: 'https://m5.dvmama.com/contentAudio/201804197500/15241410098701.mp3',
            img: 'https://9i.dvmama.com/article/2018/04/19/1200_1200_5c7caf4b183e66d6798221eb47ffa96e.jpg',
            title: 'I am a Bunny',
          },
        ],
        showIntroduce: '0',
        startIndex: '0',
        startTime: '0',
        bottom: '100',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_8() {
      hybrid.Audio.play({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_9() {
      alert(1)
      hybrid.Audio.pause({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_10() {
      hybrid.Audio.stop({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_11() {
      hybrid.Audio.next({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_12() {
      hybrid.Audio.last({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_13() {
      hybrid.Audio.showAudioContent({
        itemList: [
          {
            src: 'https://m5.dvmama.com/contentAudio/201804125458/15235287502034.mp3',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_9c208dde9dc2c723ca486653b4cef149.jpg',
            title: '再见，电视机',
            introduce: '啊啊啊啊<img src="https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp">',
            shareInfo: {
              title: '111111111111',
              desc: '2222222222222',
              imgUrl: 'https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp',
              link: location.href,
            },
          },
          {
            src: 'https://m5.dvmama.com/contentAudio/201804128431/15235277954106.mp3',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_aecdcac1aaefb068fdec3d88b9b9d7c0.jpg',
            title: '《如果把银河系装进盘子里》-地球的历史和生命',
            introduce: '哈哈哈<img src="https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp">',
            shareInfo: {
              title: '3333333',
              desc: '44444444444',
              imgUrl: 'https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp',
              link: location.href,
            },
          },
          {
            src: 'https://m5.dvmama.com/contentAudio/201804197500/15241410098701.mp3',
            img: 'https://9i.dvmama.com/article/2018/04/19/1200_1200_5c7caf4b183e66d6798221eb47ffa96e.jpg',
            title: 'I am a Bunny',
            introduce: '嘎嘎嘎<img src="https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp">',
            shareInfo: {
              title: '555555555',
              desc: '6666666',
              imgUrl: 'https://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp',
              link: location.href,
            },
          },
        ],
        showIntroduce: '1',
        startIndex: '0',
        startTime: '0',
        bottom: '100',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_14() {
      hybrid.Video.showVideoContent({
        itemList: [
          {
            src: 'https://9i.dvmama.com/free/1018/zhufu-4.mp4',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_9c208dde9dc2c723ca486653b4cef149.jpg',
            title: '视频标题1',
          },
          {
            src: 'https://9i.dvmama.com/free/1018/1019PageHead.mp4',
            img: 'https://9i.dvmama.com/goods/2018/04/12/1200_1200_aecdcac1aaefb068fdec3d88b9b9d7c0.jpg',
            title: '视频标题2',
          },
          {
            src: 'https://9i.dvmama.com/free/1018/1018PageHeadBalloonMotion.mp4',
            img: 'https://9i.dvmama.com/article/2018/04/19/1200_1200_5c7caf4b183e66d6798221eb47ffa96e.jpg',
            title: '视频标题3',
          },
        ],
        startIndex: '0',
        startTime: '0',
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_15() {
      hybrid.Audio.getAudioContentInfo({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_16() {
      hybrid.Audio.onAudioChangeListener({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_17() {
      hybrid.Record.startRecord({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_18() {
      hybrid.Record.stopRecord({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_19() {
      hybrid.System.getSystemInfo({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_20() {
      hybrid.Popup.showToast({
        content: "showToast",
        duration: 10000,
        success: function () {
          setTimeout(() => {
            hybrid.Popup.hideToast()
          }, 3000)
          alert("success")
        },
        error: function (e) {
          alert(e)
        }
      });
    },

    fn_21() {
      hybrid.Popup.hideToast({
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_22() {
      hybrid.Popup.showLoading({
        data: true,
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_23() {
      hybrid.Popup.hideLoading({
        data: false,
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_24() {
      hybrid.Popup.showModal({
        type: "alert",
        title: "标题title大V店",
        content: "内容content而且可能是一大长段内容很长一大长段内容很长一大长段内容很长",
        btnTitle: "确ure",

        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_25() {
      hybrid.Popup.showModal({
        type: "confirm",
        title: "标题title大V店",
        content: "内容content而且可能是一大长段内容很长一大长段内容很长一大长段内容很长",
        btnTitle: "确ure",
        cancelBtnTitle: "取消按钮",
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        cancelCallback: function () {
          alert("取消");
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_26() {
      hybrid.Popup.showModal({
        type: "prompt",
        title: "标题title大V店",
        content: "内容content而且可能是一大长段内容很长一大长段内容很长一大长段内容很长",
        btnTitle: "确ure",
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        cancelCallback: function () {
          alert("取消");
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_27() {
      hybrid.Popup.showActionSheet({
        title: "测试标题",
        data: JSON.stringify({list: ["拍照", "相册"]}),
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_28() {
      hybrid.Browser.setStatusBar({
        type: "color",
        color: "#ff00ff",
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_29() {
      hybrid.Browser.setStatusBar({
        type: "image",
        image: "http://9i.dvmama.com/free/1111/1112.png",
        success: function (data) {
          alert(`成功：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_30() {
      hybrid.PullDownRefresh.onPullDownRefresh({
        success: function (data) {
          alert(`成功 onPullDownRefresh：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_31() {
      hybrid.PullDownRefresh.startPullDownRefresh({
        success: function (data) {
          alert(`成功 startPullDownRefresh：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },

    fn_32() {
      hybrid.PullDownRefresh.stopPullDownRefresh({
        success: function (data) {
          alert(`成功 stopPullDownRefresh：${JSON.stringify(data)}`);
        },
        error: function (err) {
          alert("失败")
        }
      });
    },


  },
});
