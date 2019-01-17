import native from 'dvd-service-js-native';
import popup from 'dvd-service-js-popup';
import login from 'dvd-service-js-login';
import encrypt from 'dvd-service-js-encrypt';
import ua from 'dvd-base-js-ua';
import util from "./utils.es6"
import api from "./api.es6"
import $ from 'jquery';

let getEl = function () {
  return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
};

/**
 * 功能：提示框
 * 示例：
 * showBindMobile({
    className: '',        // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
    title: '',            // 标题（支持传入html。有则显示。）
    text: '',             // 文本（支持传入html。有则显示。）
    placeholder: '',      // 输入框占位符（有则显示。）
    btnTitle: '',         // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
    btnCallback(result) { // 按钮点击回调（有则执行该回调，result是输入框输入的值）

    },
    cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
    cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）

    }
  });
 */
let showBindMobile = function (param = {}) {
  new Vue({
    components: {
      'com-ios-pay-bind-mobile': require('../../page/collect/vue/com-ios-pay-bind-mobile.vue').default
    },
    el: getEl(),
    data: {param},
    template: '<com-ios-pay-bind-mobile :class-name="param.className" type="prompt" :title="param.title" :text="param.text" :placeholder="param.placeholder" :ok-btn-title="param.btnTitle" :ok-btn-callback="param.btnCallback" :cancel-btn-title="param.cancelBtnTitle" :cancel-btn-callback="param.cancelBtnCallback"/>',
  });
};

export default {
  /**
   * ios支付流程（普通用户直接唤起ios支付，游客弹出面板选择登录或使用ios支付）
   * @param type {String} 支付类型，取值范围: album(合辑音频类型)， course(大V课)，vip(购买会员)
   * @param dvdGoodsId {String} 大V店虚拟商品id
   * @param appleGoodsId {String} 苹果虚拟商品id
   */
  pay(params) {
    // 必须满足ios app 5.2.0以上
    if (!util.utils.isIOS() || !ua.isDvdApp() || ua.compareVersion(ua.getDvdAppVersion(), '5.3.0') < 0) return;

    let ts = this;

    // 唤起苹果支付
    function callNativePay(){
      if (params && params.type === 'vip') {
        if(params.dvdGoodsId && params.appleId){
          native.Browser.payVip({
            "dvdItemId": params.dvdGoodsId,    // 支付ID
            "appleGoods_id": params.appleId,  // 苹果的商品ID(只在内购中使用)
            success (){
              // alert('支付成功，即将刷新，试完提醒我去掉提示');
              location.reload();
            },
          });
        }else{
          alert("参数异常")
        }
      }
      if (params && (params.type == 'series_course' || params.type == 'course')) {
        if(params.courseId && params.price){
          var amount="";
          var unit="";
          api("/api/mg/content/iap/balance")
            .then(function (res) {
              if(res && !res.code){
                if(res.data.amount && res.data.unit){
                  amount=res.data.amount;
                  unit=res.data.unit;
                  console.log(parseInt(amount) +"----"+(params.price));
                  if(params.type == 'series_course'){
                    params.price=params.price.replace("¥","");
                  }
                  if(parseInt(amount) && parseInt(params.price) && parseInt(amount)  >= parseInt(params.price)){
                    popup.confirm({
                      className: 'ios-pay',
                      title: "购买课程",            // 标题（支持传入html。有则显示。）
                      text: "支付"+ params.price + unit +"购买课程，当前余额 "+ amount + unit,             // 文本（支持传入html。有则显示。）
                      okBtnTitle: '确认支付',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                      okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）
                        var subType="";
                        if(params.type == 'series_course'){
                          subType="series";
                        }else if(params.type == 'course'){
                          subType="common";
                        }
                        var obj={
                          "courseId":params.courseId,
                          "type":subType,
                          "price":params.price
                        }
                        api("/api/mg/content/ios_balance/course_pay",obj)
                          .then(function (res) {
                            if(res && !res.code){
                              if(res.data.msg && res.data.msg=="success"){
                                window.location.reload();
                              }
                            }else{
                              popup.toast(res.data.msg);
                              setTimeout(function () {
                                window.location.reload();
                              },1000);
                            }
                          }).catch(function () {

                        })
                      },
                      cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                    });
                  }else{
                    popup.toast("余额不足，请前往个人中心-余额,进行充值(当前余额为"+ amount + unit+")");
                  }
                }else{
                  popup.toast("缺少字段");
                }
              }else{
                popup.toast(res.data.msg);
                setTimeout(function () {
                  window.location.reload();
                },1000);
              }
            }).catch(function () {

          })


        }else{
          alert("参数异常");
        }
      }
      if(params && params.type == 'album') {
        if(params.albumId && params.price){
          var amount="";
          var unit="";
          api("/api/mg/content/iap/balance")
            .then(function (res) {
              if(res && !res.code){
                if(res.data.amount && res.data.unit){
                  amount=res.data.amount;
                  unit=res.data.unit;
                  if(parseInt(amount) && parseInt(params.price) && parseInt(amount)  >= parseInt(params.price)){
                    popup.confirm({
                      className: 'ios-pay',
                      title: "购买合辑",            // 标题（支持传入html。有则显示。）
                      text: "支付"+ params.price + unit +"购买合辑，当前余额 "+ amount + unit,             // 文本（支持传入html。有则显示。）
                      okBtnTitle: '确认支付',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                      okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）
                        var obj={
                          "albumId":params.albumId,
                          "price":params.price
                        }
                        api("/api/mg/content/ios_balance/album_pay",obj)
                          .then(function (res) {
                            if(res && !res.code){
                              if(res.data.msg && res.data.msg=="success"){
                                window.location.reload();
                              }
                            }else{
                              popup.toast(res.data.msg);
                              setTimeout(function () {
                                window.location.reload();
                              },1000);
                            }
                          }).catch(function () {

                        })
                      },
                      cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
                    });
                  }else{
                    popup.toast("余额不足，请前往个人中心-余额,进行充值(当前余额为"+ amount + unit+")");
                  }
                }else{
                  popup.toast("缺少字段");
                }
              }else{
                popup.toast(res.data.msg);
                setTimeout(function () {
                  window.location.reload();
                },1000);
              }
            }).catch(function () {

          })
        }else{
          alert("参数异常");
        }
      }
    }
    if (!login.isLogined()) {
      var title = '购买会员';
      if(params.type == 'series_course' || params.type == 'course') {
        title = '购买课程';
      }
      if(params.type == 'album') {
        title = '购买音频';
      }

      var text = '登录大V店购买，可享更多会员特权；游客身份购买，需绑定手机号';
      if(params.type == 'series_course' || params.type == 'course' || params.type == 'album') {
        text = '游客身份购买，仅对当前设备有效，更换设备后，已购买内容将无法找回；登录购买可跨设备随时查看已购内容';
      }

      popup.confirm({
        className: 'ios-pay',        // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
        title: title,            // 标题（支持传入html。有则显示。）
        text: text,             // 文本（支持传入html。有则显示。）
        okBtnTitle: '游客身份购买',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
        okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）
          // if (type === 'vip') {
          //   // 收集手机号
          //   ts.mobileVerify(type, dvdGoodsId, appleGoodsId);
          // } else {
          //   callNativePay();
          // }
          callNativePay();
        },
        cancelBtnTitle: '登录大V店购买',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
        cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）
          login.login();
        }
      });
    } else {
      callNativePay();
    }

  },
  /**
   * 手机验证
   * @param type
   */
  mobileVerify(type, dvdGoodsId, appleGoodsId) {
    let ts = this;
    showBindMobile({
      className: '',        // 钩子（支持传入class名。一个页面需要多种弹窗时，可以根据传入的className在页面设定各种样式）
      title: '游客身份购买',            // 标题（支持传入html。有则显示。）
      text: '',             // 文本（支持传入html。有则显示。）
      placeholder: '请输入您的手机号',      // 输入框占位符（有则显示。）
      btnTitle: '下一步',         // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
      btnCallback(mobile, code) { // 按钮点击回调（有则执行该回调，result是输入框输入的值）
        let returnResult = false;
        if (!code) {
          popup.toast('请输入验证码');
          return false;
        }
        $.ajax({
          cache: false,
          async: true,
          url: '/验证码接口?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            mobile: mobile,
            code: code,
          }),
          success(response) {
            if (response.code === 0) {
              returnResult = true;
              debugger
              native.Browser.pay({
                "pay_id": dvdGoodsId,    // 支付IDiosPay
                "appleGoods_id": appleGoodsId,  // 苹果的商品ID(只在内购中使用)
                "iap_type": type        // 内购的商品类型,取值范围：album(合辑音频类型)， course(大V课)，vip(购买会员)
              });
            }
          },
          error(error) {
          }
        });
        popup.toast('验证失败');
        return returnResult;
      },
      cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则不显示，传''时显示默认值'取消'。）
      cancelBtnCallback() { // 取消按钮点击回调（有则执行该回调）
      }
    });
  },
}
