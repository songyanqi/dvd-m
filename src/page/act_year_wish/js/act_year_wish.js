// 基础模块
import common from 'dvd-service-js-common';

// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// import Cookies from 'js-cookie';

// 业务模块
import encrypt from 'dvd-service-js-encrypt';
import param from 'dvd-base-js-param';
// import tj from 'dvd-service-js-tj';
import localCache from 'dvd-base-js-cache';
import nativeAncestry from '../../../common/js/nativeAncestor.js';
import ua from 'dvd-base-js-ua';
import login from 'dvd-service-js-login';
import date from 'dvd-base-js-date';
import native from 'dvd-service-js-native';
import share from 'dvd-service-js-share';
import vueLazyload from 'dvd-service-js-img-lazyload';
import popup from 'dvd-service-js-popup';

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
// login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('dvd-service-com-title').default,
    'com-to-top-icon': require('dvd-service-com-go-page-top').default,
  },
  data() {
    return {
      response: null,
      date: date,
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),
      error: false,
      isRule: true,
      // 作品信息
      workInfo: {
        // 是否是自己
        isSelf: true,
        // 是否有作品
        hasWork: false,
        dataList: [],
      },
      pageIndex: 1,
      pageSize: 18,
      noMore: false,
      isList: true,
      timer: null,
      isApp: false,
      isLongTabTime: null,
      isLongTap: true,
      isAjax: true,
      isModal: false,
      framePic: '',
      isLogin: login.isLogined(),
    }
  },
  computed: {
  },
  watch: {
    // 监听response变化
    response(newObj,oldObj){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        const that = this;
        if(ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
          native.custom.initHead({
            shareOnHead: 1,
            isAudioAbsorb:1,
            isShowAudio:1
          });
        }else {
          native.Browser.setHead({
            backBtn: 1,
            isAudioAbsorb:'1',
            isShowAudio:'1',
            hideHead: '1',
          });
        }
        // 设置分享信息
        try {
          // share.setShareInfo({
          //   title: that.response.data.shareTitle,
          //   desc: that.response.data.shareDesc,
          //   link: location.href,
          //   imgUrl: that.response.data.shareImg
          // });
          let bigImgUrl = '';
          let url = '';
          // 如果有作品
          if (newObj.data && newObj.data.mergeImageUrl) {
            bigImgUrl = newObj.data.mergeImageUrl;
          }
          if (newObj.data && newObj.data.workId) {
            url = `${location.origin}/act_year_wish.html?workId=${newObj.data.workId}`;
          } else {
            url = `${location.origin}/act_year_wish.html`;
          }
          share.setShareInfo({
            title: "大V店 | 画出新年愿望，赢666元愿望基金",
            desc: "上传宝宝作画，点赞超过50，获得20元愿望优惠券(无门槛)，入选100幅还能获得666元愿望基金哦~",
            link: url,
            imgUrl: "http://9i.dvmama.com/free/cardList/newyearBkg.png?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&",
            bigImgUrl: bigImgUrl,
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getMoreData();
  },
  methods: {
    /**
     * 接口名称: 我的1018
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18546918
     */
    getData(){
      let that = this;

      this.isApp = ua.isDvdApp();
      let workId = '';
			if (ua.getQuery("workId")) {
				workId = ua.getQuery("workId");
			}
      // const url = `https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/getInfo?_=${Date.now()}`;
      const url = `/api/mg/sale/yearwish/getInfo?_=${Date.now()}`;
      $.ajax({
        cache: false,
        async: true,
        url: url,
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
          workId: workId,
        }),
        success(response) {
          common.checkRedirect(response);

          that.response = response;

          that.operateData(response);
          if (response.code != "0") {
            popup.toast(response.data.msg);
          }
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          that.error = true;
        }
      });
    },
    // 得到画框
    getFramePic() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: `/api/mg/sale/yearwish/getFrame?_${Date.now()}`,
        type: 'post',
        dataType: 'json',
        data: encrypt.ajax({
          js_wx_info: 1,
        }),
        success(res) {
          if (res.data.status == "0") {
            that.framePic = res.data.frameImg;
          } else {
            popup.toast(res.data.msg);
          }
        }
      })
    },
    operateData(res) {
      const that = this;
      if (res.code === 0) {
        let resData = res.data;
        if (resData.status === '5') {
          popup.toast("活动未开始");
        }
        if (resData.status === '6') {
          popup.toast("活动已结束");
        }
        that.workInfo.hasWork = true;
        that.isRule = false;
        if (resData.status === '4') {
          that.workInfo.isSelf = false;
        }
        if (resData.status === '3') {
          that.workInfo.hasWork = false;
          that.isRule = true;
          // 没有作品并且已经登陆
          if (login.isLogined()) {
            this.getFramePic();
          }
        }
        that.workInfo.dataList = resData.topList.slice(0,that.pageSize * that.pageIndex);
      }
    },
    handleRule() {
      this.isRule = !this.isRule;
    },
    handleUpload() {
      if (this.response.code != "0") {
        popup.toast(this.response.data.msg);
        return;
      }

      this.handleJump("/act_add_opus.html");
    },
    // 跳转方式
    handleJump(url) {
      if (ua.isDvdApp()) {
        native.Browser.open({
          url: url
        });
      } else if (ua.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
    handleShare() {
      let that = this;
      if (ua.isDvdApp()) {
        native.custom.shareImg({
          "bigImageUrl": that.response.data.mergeImageUrl,
          "shareType": '3',
          "v":"4.2.0"
        });
      } else {
        // 弹框
      }
    },
    // 点赞接口封装
    zanAjax(isConfirm, url) {
      login.needLogin();
      let that = this;
      // 点赞接口
      if(that.isAjax) {
        that.isAjax = false;
        $.ajax({
          cache: false,
          async: true,
          url: url,
          // url: ' https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/parise',
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            js_wx_info: 1,
            workId: that.response.data.workId,
            isConfirm: isConfirm,
          }),
          success(res) {
            that.isAjax = true;
            if (res.code == "0") {
              if ( res.data.status == "0") {
                let isPraise = that.response.data.isPraise,
                    praiseNumber = Number(that.response.data.praiseNumber);

                if(that.response.data.isPraise == "2") {
                  that.response.data.isPraise = '1';
                  that.response.data.praiseNumber = praiseNumber + 1;
                  return;
                }

                that.response.data.praiseNumber = isPraise == '0' ? praiseNumber + 1 : praiseNumber - 1;
                that.response.data.isPraise = isPraise == '0' ? '1' : '0';
              }
            }
            popup.toast(res.data.msg);
          },
          error(error) {
            that.isAjax = true;
          }
        });
      }
    },
    handleZan() {
      let that = this;
      if (this.workInfo.isSelf) {
        popup.toast('自己不能给自己点赞哦～');
      } else {
        let url = `/api/mg/sale/yearwish/parise?_${Date.now()}`;
        if (this.response.data.isPraise == "1") {
          url = `/api/mg/sale/yearwish/cancelParise?_${Date.now()}`;
        }
        let okFun = () => {
          that.zanAjax("1",url);
        }
        // 是否给别人点过赞
        if (this.response.data.isPraise == "2") {
          popup.confirm({
            title: "提示",            // 标题（支持传入html。有则显示。）
            text: "已经给其他好友点赞啦~，只能给一个好友点赞，给新的好友点赞后，上个赞将自动取消",             // 文本（支持传入html。有则显示。）
            okBtnTitle: "点赞",       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
            cancelBtnTitle: "取消",   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
            okBtnCallback: okFun,
            // cancelBtnCallback: cancleFun,
          });
          return;
        }

        that.zanAjax("0",url);
      }
    },
    addList() {
      if (this.isList) {
        this.isList = false;
        this.pageIndex++;
        this.workInfo.dataList = this.workInfo.dataList.concat(this.response.data.topList.slice(this.pageSize * (this.pageIndex-1),this.pageSize * this.pageIndex));
        if (this.workInfo.dataList.length > this.response.data.topList.length) {
          this.noMore = true;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isList = true;
        },300);

      }
    },
    // 触底加载另一页
    getMoreData() {
      let that = this;
      window.addEventListener('scroll',function () {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        if (!that.noMore) {
          if (document.documentElement.clientHeight + scrollTop >= document.body.clientHeight * 0.95) {
            that.addList();
          }
        }
      },false);
    },
    // 查看宝宝作品
    handleLook() {
      login.needLogin();
      this.handleJump(`/act_year_wish.html?workId=${this.response.data.myWorkId}`);
    },
    handleTouchStart (e) {
			this.isLongTabTime = setTimeout(() => {
				if (this.isLongTap) {
					let picSrc = e.target.getAttribute('src');
					nativeAncestry.savePic(picSrc);
				}
			},500);
		},
		handleTouchMove (e) {
			this.isLongTap = false;
			clearTimeout(this.isLongTabTime);
		},
		handleTouchEnd (e) {
			this.isLongTap = true;
			clearTimeout(this.isLongTabTime);
		},
		handleTouchCancle (e) {
			this.isLongTap = true;
			clearTimeout(this.isLongTabTime);
    },
    handleMain() {
      let dateNow = Date.now();
      if (dateNow > new Date("January 11, 2018 00:00:00").getTime()) {
        this.handleJump('/admin_topic.html?topicId=18148');
      } else if (dateNow > new Date("February 17, 2018 00:00:00").getTime()) {
        this.handleJump('/admin_topic.html?topicId=18293');
      } else if (dateNow > new Date("February 19, 2018 00:00:00").getTime()) {
        this.handleJump('/admin_topic.html?topicId=18294');
      } else if (dateNow > new Date("February 21, 2018 00:00:00").getTime()) {
        this.handleJump('/t-18144.html');
      }
    },
    handleAgainUpLoad() {
      if (this.response.data.editNum >= 3) {
        popup.toast('最多能重新上传三次哦~');
        return;
      }
      let id = this.response.data.id;
      this.handleJump(`/act_add_opus.html?id=${id}`);
    },
    handleClose() {
      this.isModal = false;
    },
    handleMaskTask(e) {
      this.isModal = false;
    },
    // 拿框
    handleAddFrame() {
      login.needLogin();
      if (ua.isDvdApp()) {
        native.custom.shareImg({
          "bigImageUrl": this.framePic,
          "shareType": '3',
          "v":"4.2.0"
        });
      } else {
        if (!this.framePic) {
          this.getFramePic();
        }
        this.isModal = true;
      }
    },
    //活动规则
    handleRuleLink() {
      this.handleJump('/t-18140.html');
    },
    handleList(item) {
      // this.handleJump(`/act_year_wish.html?workId=${item.workId}`);
      location.href = `/act_year_wish.html?workId=${item.workId}`;
    },
    handleUploadpage() {
      this.handleJump(`/act_add_opus.html`);
    }
  },
  filters: {},
});
