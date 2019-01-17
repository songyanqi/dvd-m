<style scoped lang = "sass" lang="scss" rel="stylesheet/scss">
  .header-title {
    width:100%;
    padding: 0.15rem 0.1rem;
    color: #999999;
    border-bottom: 1px solid #E1E1E1;
    /*margin-top: 44px;*/
    font-size: 0.12rem;
  }
  .header-ios {
    margin-top: 0;
  }
  .reason {
    padding:0 10px;
  }
  .reason-list {
    position:relative;
    padding:.16rem 0;
    border-bottom: 1px solid #dddddd;
  }
  .message {
    display: inline-block;
    width:80%;
    line-height:16px;
    font-size: 14px;
    color: #666666;
  }
  .feedBack,
  .btn{
    display: inline-block;
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
    width:.6rem;
    height:.2rem;
    line-height:.2rem;
    text-align: center;
    border-radius:.2rem;
    font-size: 12px;
  }
  .feedBack {
    border: 1px solid #FF4A7D;
    box-sizing:border-box;
    color: #FF4A7D;
  }
  .btn {
    background: linear-gradient(to right, #C0C0C0, #999999);
    color: #ffffff;
  }
</style>


<template>
  <div v-if="dataList.hasOwnProperty('data')">
    <div class="header-title" :class="{'header-ios':isApp}">您的快递如遇到以下问题，可以直接点击"反馈"我们会尽快解决。</div>
    <div class="reason">
      <div class="reason-list" v-for="(item,index) in dataList.data.list" :key="index">
        <span class="message">{{item.desc}}</span>
        <span class="feedBack" @click="feedBackBefore(item, index)" v-if="item.isSubmitted == 0">反馈</span>
        <span class="btn" @click="overFeedBack()" v-if="item.isSubmitted == 1">已反馈</span>
      </div>
    </div>
  </div>
</template>


<script>
  import layout from '../../index/module/index/layout.es6';
  import util from "../../../common/js/utils.es6";  import $ from 'jquery';

  //弹窗
  import popup from 'dvd-service-js-popup';
  import param from 'dvd-base-js-param';
//  import dialog from '../../../../utils/dialog.es6'
  export default {
    data(){
      return{
        dataList:{},
        isApp: util.utils.isApp(),
        //获取deliveryId issueId
        deliveryId: param.get('deliveryId'),
        flagClick: true
      }
    },

    created(){
      this.getData();
    },
    methods:{
     //初始化获取数据接口
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/order/workOrder/issueList?_=' + Date.now(),
          type: 'post',
          data: layout.strSign('orders', {
            deliveryId: param.get('did'),
            logisticsCode: param.get('logisticsCode')
          }),
          dataType: 'json',
          success(dataList) {
            if (dataList.code == 0) {
              ts.dataList = dataList;
            }else {
              if(dataList.data.msg){
//                dialog.alert(dataList.data.msg);
              }else{
//                dialog.alert('code:'+dataList.code);
              }
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      feedBackBefore(obj, index){
        if (!this.flagClick)
          return
        this.flagClick = false
        var that = this
        $.ajax({
            cache: false,
            async: true,
            url: '/api/mg/order/workOrder/check?_=' + Date.now(),
            type: 'post',
            data: layout.strSign('orders', {
              issueId: obj.issueId,
              logisticsCode: param.get('logisticsCode'),
              deliveryId: param.get('did')
            }),
            dataType: 'json',
            success(result) {
              that.flagClick = true
              if (result.code == 0) {
                popup.confirm({
                  text: '请确保提问的问题与实际情况一致，方便我们更好的跟进问题，每次只能提交一种类型的反馈哦',
                  okBtnTitle:' 确定',
                  okBtnCallback: function(){
                    that.feedBack(obj, index)
                  },
                  cancelBtnTitle:'取消'
                });
              } else {
                  if(result.data.msg){
                    popup.alert({
                      text:result.data.msg,
                      okBtnTitle:' 确定'
                    });
                  }else{
                    popup.toast('code:' + result.code);
                  }
              }
            },
            error(error) {
              that.flagClick = true
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
      },
      // 反馈
      feedBack(obj, index) {
        //用户点击反馈发送ajax 请求
        var that = this
        if (!this.flagClick)
          return
        this.flagClick = false
          let ts = this;
          $.ajax({
            cache: false,
            async: true,
            url: '/api/mg/order/workOrder/create?_=' + Date.now(),
            type: 'post',
            data: layout.strSign('orders', {
              issueId: obj.issueId,
              logisticsCode: param.get('logisticsCode'),
              deliveryId: param.get('did')
            }),
            dataType: 'json',
            success(result) {
              that.flagClick = true
              if (result.code == 0) {
                ts.result = result;
                //反馈后对应的按钮状态变成已反馈状态
                ts.dataList.data.list[index].isSubmitted = 1
                popup.alert({
                  text: '我们已收到了您的反馈，处理结果会在24小时内发送系统消息和短信通知，请注意查看。您也可在物流页面随时查看处理进度。',
                  btnTitle: '我知道了',
                });
              } else {
//                if (result.data.msg) {
//                  dialog.alert(result.data.msg);
//                } else {
//                  dialog.alert('code:' + result.code);
//                }
              }
            },
            error(error) {
              that.flagClick = true
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
      },
      //已反馈
      overFeedBack() {
        popup.alert({
          text: '反馈信息已发送，请不要重复提交哦～',
          btnTitle: '确定',
        });
      },
    }
  }
</script>
