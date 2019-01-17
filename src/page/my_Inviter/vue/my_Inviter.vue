<template>
  <div class="myInviter_wrap" v-if="response">
    <div v-if="show_code_input">
      <div class="login_text">请输入邀请码</div>
      <div class="inputbox check_input">
        <div><input type="tel" placeholder="" v-model="mobile" name="mobile"></div>
        <div class="get_check_code" v-if="mobile != ''" @click="verification">确认</div>
        <div class="get_check_code greybtn" v-else>确认</div>
      </div>
    </div>
    <!--我的邀请人-->
    <div v-if="my_inviterPage" class="myInviter">
      <div class="myInviter_img">
        <img
          :src="response.data.headImage || '//5e.dvmama.com/wap/static/dist/static/page/center/img/default-head.png'"
          alt="">
      </div>
      <div class="myInviter_name">
        {{response.data.nickName || response.data.mobile.substr(0, 3) + "****" + response.data.mobile.substr(7)}}
      </div>
    </div>
    <!--修改邀请人-->
    <div class="bottoms" v-if="(response.data && response.data.editable != 0)&& modifier_inviter">
      <div v-if="trun_grey" class="changeBtn greybtn">{{btnName}}</div>
      <div v-else class="changeBtn" @click="modify_inviter">{{btnName}}</div>


      <!--mahenan新增只能修改一次但是没有时间限制了-->
      <!--<div class="change_time" v-if="response.data && response.data.endTime && show_edntime">-->
        <!--{{response.data.endTime * 1000 | getFullTime}}后不可再修改-->
      <!--</div>-->
    </div>

    <!--什么是邀请码-->
    <div v-if="show_code_input" class="invitation_info">
      <div>
        <p>邀请码规则：</p>
        <p>1.可联系你的好友获取大V店邀请码；</p>
        <p>2.一个用户只能绑定一个邀请码，绑定后不得修改。</p>
        <p>3. 绑定邀请人后，您在大V店APP及果敢时代大V店公众号内都将访问邀请人店铺；</p>
        <p>4. 一个用户只能有一个邀请人，在您绑定邀请人后，可在7天内更换一次邀请人。</p>
      </div>
    </div>
  </div>
</template>
<script>
  // 基础模块
  import common from 'dvd-service-js-common';
  import encrypt from 'dvd-service-js-encrypt';
  import param from 'dvd-base-js-param';

  import popup from 'dvd-service-js-popup';  import $ from 'jquery';


  export default {
    props: {},
    data() {
      return {
        response: null,
        my_inviterPage: false, //显示我的邀请人页
        show_code_input: false,  //显示邀请码输入框
        trun_grey: false,   //按钮置灰
        btnName: '',
        show_edntime: true,
        mobile: '',
        inviteCode: '',
        info_bottom: false,
        modifier_inviter:true,

        nextReferer:param.get('nextReferer') ? param.get('nextReferer') : "",
      }
    },
    computed: {
      origin_shop:function(){
        return location.origin
      }
    },
    created() {
      var that = this;
      that.getData()
    },
    mounted() {
    },
    methods: {
      /*获取邀请人信息*/
      getData() {
        let that = this;
        $.ajax({
          url: 'api/mg/auth/inviter/getInviter?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({}),
          success(response) {
            common.checkRedirect(response);
            that.response = response;
            if (response.code) {
              popup.toast(response.data.msg || response.msg);
            }
            if (response.data) {
              that.$emit("titlename", "我的邀请人");
              document.title = "我的邀请人";
              that.my_inviterPage = true;
              that.btnName = '修改邀请人';
              if(response.data.editable != 1){
                that.trun_grey = true;
              }
            } else {
              that.$emit("titlename", "添加邀请人");
              document.title = "添加邀请人";
              that.show_code_input = true;
              that.add_inviterPage = true;
              that.btnName = '添加邀请人';
              that.trun_grey = true;
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*去修改邀请人*/
      to_modify: function () {
        var that = this;
        that.show_code_input = true;  //显示邀请码输入框
        that.my_inviterPage = false; //隐藏我的邀请人
        that.show_edntime = false; //不显示截至修改时间
        that.trun_grey = true;  //置灰按钮
        that.btnName = '确认修改';
        that.$emit("titlename", "修改邀请人");
        document.title = "修改邀请人";
        that.mobile = '';
        that.info_bottom = false;
      },
      /*验证*/
      verification: function () {
        var that = this;
        $.ajax({
          url: 'api/mg/auth/inviter/check?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({
            "inviteCode": that.mobile
          }),
          success(response) {
            common.checkRedirect(response);
            if (response.code) {
              popup.toast(response.data.msg || response.msg);
              that.my_inviterPage = false; //显示我的邀请人
              that.trun_grey = true;  //置灰
            } else {
              that.my_inviterPage = true; //显示我的邀请人
              that.trun_grey = false;  //按钮可用
              that.response = response;
              if (window.screen.height < 580) {
                that.info_bottom = true;
              }
              that.inviteCode = JSON.parse(JSON.stringify(that.mobile));
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*修改邀请人*/
      modify_inviter: function () {
        var that = this;
        if (!that.show_code_input) {
          that.to_modify()
        } else {
          $.ajax({
            url: '/api/mg/auth/inviter/edit?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt.ajax({
              "inviteCode": that.mobile
            }),
            success(response) {
              common.checkRedirect(response);
              if (response.code) {
                popup.toast(response.data.msg || response.msg);
                return false;
              }else{
                that.show_code_input = false;  //显示邀请码输入框
                that.my_inviterPage = true; //隐藏我的邀请人
                that.show_edntime = false; //不显示截至修改时间
                that.trun_grey = false;  //置灰按钮
                if(that.btnName == '确认修改'){
                  that.modifier_inviter = false;
                }
                that.btnName = '修改邀请人';
                that.$emit("titlename", "我的邀请人");
                document.title = "我的邀请人";
                if(response.shop_url != that.origin_shop){
                  popup.alert({
                    title: '邀请人修改成功',        // 标题（支持传入html。有则显示。）
                    text: '请重新登录',         // 文本（支持传入html。有则显示。）
                    btnCallback() {   // 按钮点击回调（有则执行该回调）
                      if(that.nextReferer){
                        location.replace(that.nextReferer.replace(that.origin_shop, response.shop_url));
                      }else{
                        location.href = location.href.replace(that.origin_shop, response.shop_url);
                      }
                    }
                  });
                }else{
                  //有nextReferer填写完邀请码要继续跳转到指定页面
                  if(that.nextReferer){
                    location.replace(that.nextReferer);
                  }
                }
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        }
      },
      isTel: function (t) {
        var tel = $.trim(t);
        var reg = /^1\d{10}$/;
        return reg.test(tel);
      },
    },
    filters: {
      getFullTime: function (second) {
        var y = new Date(second).getFullYear();
        var monthtime = new Date(second).getMonth();
        var daytime = new Date(second).getDate();
        var s = new Date(second).getSeconds();
        var m = new Date(second).getMinutes();
        var h = new Date(second).getHours();
        var str;
        var fullTime;
        if (h) {
          str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        } else if (m) {
          str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        } else {
          str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }
        fullTime = y + '年' + (monthtime + 1) + '月' + daytime + '日' + str;

        return fullTime;
      },
    }
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  .myInviter_wrap {
    /*padding-bottom: 215px;*/
  }

  .myInviter {
    width: 89.333%;;
    height: 100px;
    margin: 20px auto 0;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(255, 74, 125, 0.11);
    overflow: hidden;
  }

  .myInviter div {
    float: left;
  }

  .myInviter_img {
    width: 60px;
    height: 60px;
    margin: 20px 0 0 20px;
  }

  .myInviter_img img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .myInviter_name {
    font-size: 14px;
    color: #666666;
    margin: 40px 0 0 10px;
  }

  .bottoms {
    margin-top: 40px;
    position: relative;

    z-index: 1;
  }

  .changeBtn {
    width: 91px;
    height: 24px;
    color: #FF4A7D;
    font-size: 12px;
    margin: 0 auto;
    line-height: 24px;
    text-align: center;
    position: relative;
  }

  .changeBtn.greybtn {
    color: #666666;
  }

  .changeBtn.greybtn:after {
    border-color: #E1E1E1;
  }

  .changeBtn:after {
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: 1px solid;
    border-color: #FF4A7D;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .change_time {
    height: 24px;
    color: #666666;
    font-size: 12px;
    margin: 10px auto 0;
    line-height: 24px;
    text-align: center;
  }

  .inputbox {
    width: 100%;
    margin: 15px auto 0;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }

  .inputbox.check_input div:nth-of-type(1) {
    width: 2.95rem;
    height: 100%;
    background-color: #F8F8F8;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    display: inline-block;
  }

  .inputbox input {
    background-color: #FFFFFF;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    padding: 5px 30px 5px 16px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 1px;
    border: none;
  }

  .inputbox.check_input .get_check_code {
    width: 1.44rem;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    text-align: center;
    color: #FF4A7D;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: normal;
    position: relative;
    margin-top: 30px;
  }

  .inputbox.check_input .get_check_code:after {
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: 1px solid;
    border-color: #FF4A7D;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .inputbox.check_input .get_check_code.greybtn {
    color: #333333;
  }

  .inputbox.check_input .get_check_code.greybtn:after {
    border-color: #666666;
  }

  .login_text {
    width: 73.3333%;
    height: 14px;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
    margin: 100px auto 0;
    color: #666666;
  }

  .changeTip {
    font-size: 12px;
    color: #666666;
    text-align: center;
    width: 228px;
    margin: 20px auto 0;
    line-height: 17px;
  }

  .invitation_info {
    font-size: 12px;
    font-weight: 300;
    padding: 0 20px;
    color: #999999;
    line-height: 17px;
    left: 0;
    right: 0;
    margin-top: 60px;
    max-width: 467px;
  }

  .invitation_info.bottom {
    position: static;
  }

  .invitation_info div:nth-of-type(1) {
    text-align: left;
  }

  .invitation_info div:nth-of-type(1) span:nth-of-type(1) {
    transform: scale(30, 0.5);
    display: inline-block;
    position: relative;
    right: 45px;
  }

  .invitation_info div:nth-of-type(1) span:nth-of-type(2) {
    transform: scale(30, 0.5);
    display: inline-block;
    position: relative;
    left: 37px;
  }

  .invitation_info p {
    margin-top: 8px;
  }

  .invitation_info p:nth-of-type(1) {
    margin-top: 16px;
  }
</style>
<style>
  body,html{
    height: 100%;
  }
  .app{
    min-height: 100%;
  }
</style>
