// 第三方模块
import Vue from 'vue';
import $ from 'jquery';

// H5项目间基础业务模块
require('dvd-service-js-common');

// H5项目间通用模块
import ua from 'dvd-base-js-ua';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import encrypt from 'dvd-service-js-encrypt';
import util from 'dvd-service-js-util';

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'dvd-service-com-title': require('dvd-service-com-title').default,
    'dvd-service-com-go-page-top': require('dvd-service-com-go-page-top').default
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
      statisticData: null,
      userList: [],
      title: '',
      btnFlag: true,
      phone: '',
      copyFlag: false,
      isAjax: false,
      isMore: false,
      endId: ''
    };
  },
  computed: {},
  beforeCreate() {
    login.needLogin();
  },
  created() {
    this.getData();
    util.pageScrollToBottom(this.getData, this);
  },
  methods: {
    getData() {
      if (this.isMore || this.isAjax) {
        return false;
      }
      this.isAjax = true;
      popup.loading(true);
      $.post('/api/mg/user/weixin/vipUserInviteUser', encrypt.ajax({end_id: this.endId}), res => {
        if (!res.code) {
          let data = res.data.data;
          this.statisticData = data.textConf;
          this.title = data.title;
          this.userList = this.userList.concat(data.userList);
          this.endId = data.end_id;
          this.btnFlag = !data.vipStatus;
          this.isMore = data.endFlag;
          this.isAjax = false;
          popup.loading(false);
        } else {
          this.isAjax = false;
          popup.loading(false);
          popup.toast(res.msg || res.data.msg, 4000);
        }
      });
    },
    changeBtnFlag() {
      if (this.btnFlag) {
        this.closeNotify();
      } else {
        this.openNotify();
      }
    },
    openNotify() {
      $.post('/api/mg/user/weixin/updateVipInviteStatus', encrypt.ajax({
        userId: login.getUserId(),
        status: 0,
        type: 1
      }), res => {
        if (!res.code) {
          this.btnFlag = !this.btnFlag;
          popup.toast('您的通知已开启，如有人通过您的店铺注册或购买商品，我们将尽快通知您', 4000);

          // setTimeout(() => {
          //   location.href = `${location.origin}${location.pathname}?_=${Date.now()}`;
          // }, 4000);
        } else {
          popup.toast(res.msg || res.data.msg, 4000);
        }
      });

    },
    closeNotify() {
      let that = this;
      popup.confirm({
        text: '关闭通知后，用户通过您的店铺注册或购买商品，我们将无法通知到您',
        cancelBtnTitle: '',
        okBtnCallback() {
          $.post('/api/mg/user/weixin/updateVipInviteStatus', encrypt.ajax({
            userId: login.getUserId(),
            status: 1,
            type: 1
          }), res => {
            if (!res.code) {
              that.btnFlag = !that.btnFlag;

              // setTimeout(() => {
              //   location.href = `${location.origin}${location.pathname}?_=${Date.now()}`;
              // }, 1000);
            } else {
              popup.toast(res.msg || res.data.msg, 4000);
            }
          });
        }
      });
    },
    copyPhoneNumber(data) {
      this.phone = data.mobile_phone;
      this.copyFlag = true;
    },
    changeInvite(data) {
      let msg = data.invite_status ?
        '已恢复通知，后续此人的购买通知将发送给您' :
        '已忽略此人，后续此人的购买通知将不再通知';
      $.post('/api/mg/user/weixin/updateVipInviteStatus', encrypt.ajax({
        userId: data.user_id,
        status: data.invite_status ? 0 : 1,
        type: 2
      }), res => {
        if (!res.code) {
          let status = data.invite_status ? 0 : 1;
          popup.toast(msg, 4000);
          for (let item of this.userList) {
            if (item.mobile_phone === data.mobile_phone) {
              item.invite_status = status;
            }
          }
        } else {
          popup.toast(res.msg || res.data.msg, 4000);
        }
      });
    }
  }
});
