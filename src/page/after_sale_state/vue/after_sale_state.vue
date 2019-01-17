<template>
  <div>
    <vue-city-picker title=""  :data="uuu" style="z-index: 2;" ref="picker" @select="select"></vue-city-picker>
    <!-- 不同状态的页面顶部状态展示 -->
    <div class="listCont" v-if='data.statusCode!=3'>
      <div class="p_titles">
        <span class="p1_icon" v-if='data.statusCode==2 || data.statusCode==4 || data.statusCode==7'></span>
        <span class="p2_icon" v-if='data.statusCode==1'></span>
        <span class="p3_icon" v-if='data.statusCode==6'></span>
        <span class="p4_icon" v-if='data.statusCode==5'></span>
        <span class="list_title">{{data.status}}</span>
      </div>
      <div class="list_cont" v-if='data.statusCode==1'>审核结果将以短信形式告知，您也可以在售后进度中查询。</div>
      <div class="list_cont" v-if='data.statusCode==2'>您已撤销本次换货申请。</div>
      <div class="list_cont" v-if='data.statusCode==4'>{{data.statusRemark}}</div>
      <!-- 极速 -->
      <div class="list_cont"
           v-if='data.statusCode==5 && data.returnStatus == 2 && data.deliveryStatus < 2  && data.expType==1'>
        尊敬的会员，平台获取到揽件信息后会第一时间给您换货，请耐心等待哦。
      </div>
      <div class="list_cont"
           v-if='data.statusCode==5 && data.returnStatus == 2 && data.deliveryStatus >= 2 && data.deliveryStatus < 4 && data.expType==1'>
        平台已获取到揽件信息，将会在48小时内为您换货，请耐心等待哦。
      </div>
      <div class="list_cont"
           v-if='(data.statusCode==5 || data.statusCode==6) && data.returnStatus == 3 && data.deliveryStatus < 4 && data.expType==1'>
        我们已经收到您寄回的商品，将会在48小时内为您换货，请耐心等待哦。
      </div>
      <!-- 普通 -->
      <div class="list_cont"
           v-if='data.statusCode==5 && data.returnStatus < 3 && data.deliveryStatus < 4 && data.expType==0'>
        如我们收到您寄回的商品，将会在48小时内为您换货。
      </div>
      <div class="list_cont"
           v-if='data.statusCode==5 && data.returnStatus == 3 && data.deliveryStatus < 4 && data.expType==0'>
        我们已经收到您寄回的商品，将会在48小时内为您换货。
      </div>

      <div class="list_cont" v-if='data.statusCode==6 && data.deliveryStatus >= 4 && data.expType==0'>换货商品已寄出，请您注意查收。
      </div>
      <div class="list_cont" v-if='data.statusCode==6 && data.deliveryStatus < 4  && data.expType==0'>
        我们已经收到您寄回的商品，将会在48小时内为您换货。
      </div>
      <div class="list_cont" v-if='data.deliveryStatus >= 4  && data.expType==1'>换货商品已寄出，请您注意查收。</div>

      <div class="list_cont" v-if='data.statusCode==7 && data.statusRemark'>{{data.statusRemark}}</div>
      <div class="list_cont" v-if='data.statusCode==7 && !data.statusRemark'>超时未退回商品。</div>

      <div class="cancleApply" v-if='data.statusCode==1'><span class="cancleApplyBtn" @click='repeal'>撤销申请</span></div>
      <div class="cancleApply" v-if='data.statusCode!=1 && data.invoiceNo
			&& data.shippingCompany  && (data.statusCode==6 && data.deliveryStatus >= 4 && data.expType==0 || data.deliveryStatus >= 4 && data.expType==1)'>
        <span class="cancleApplyBtn" @click='goLogistics'>查看物流</span>
      </div>
    </div>
    <!-- 极速退款和普通退款模块 -->
    <div class='refund_container' v-if='data.statusCode==3'>
      <div class='title' v-if='data.expType==0'>
        <span class="p6_icon"></span>请寄回商品，填写快递信息
      </div>
      <div class='title' v-if='data.expType==1'>
        <span class="p6_icon"></span>进入极速换货流程，请退回商品
      </div>
      <div class='title_text' v-if='data.expType==0'>请在五天内填写快递单号，逾期申请将自动关闭。</div>
      <div class='title_text' v-if='data.expType==1'>尊敬的用户，您申请的换货享有极速换货特权，请在五天内填写快递单号，平台获取到揽件信息后将立即为您换货。</div>
      <div class='refund_content line1'>
        <div class='refund_content_text'>退货地址：{{data.addressInfo.region}} {{data.addressInfo.address}}
          {{data.addressInfo.consignee}} {{data.addressInfo.mobile}}
        </div>
        <div class='refund_left'></div>
        <div class='refund_right'></div>
        <div class='refund_top'></div>
        <div class='refund_bottom'></div>
      </div>
      <div class='refund_content line2'>
        <div class='refund_content_text'>退货须知 :<span v-html="data.returnNotice"></span></div>
        <div class='refund_left'></div>
        <div class='refund_right'></div>
        <div class='refund_top'></div>
        <div class='refund_bottom'></div>
      </div>
      <div class='refund_content line3'>
        <div class='refund_content_text'>快递公司</div>
        <!-- <input type="" name="" placeholder="必填" v-model="expressCompany"> -->
        <select v-model="expressCompany">
          <option v-for="option in data.expressList" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div class='refund_left'></div>
        <div class='refund_right'></div>
        <div class='refund_top'></div>
        <div class='refund_bottom'></div>
      </div>
      <div class='refund_content line4'>
        <div class='refund_content_text'>快递单号</div>
        <input type="" name="" placeholder="必填" v-model="expressNo">
        <div class='refund_left'></div>
        <div class='refund_right'></div>
        <div class='refund_bottom'></div>
      </div>

    </div>
    <!-- 填写运费模块 -->
    <div class='change_type'
         v-if='data.statusCode==3 && data.reasonId != 32 && data.noWorries == 15 || data.statusCode==3 && data.noWorries == 0'>
      <div class='change_type_content'>
        <div class='change_type_text'>寄回商品产生的运费将由大V店承担，请按实际情况填写运费，我们会根据您填写的支付宝或银行账户进行转账。</div>
        <div class='change_type_content_input'>
          <span>寄回运费 :</span>
          <input type="number" class="check" name="" placeholder="请按实际情况填写" v-model.number="shippingFee">
          <div class='change_type_content_input_top'></div>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
      </div>
      <div class='change_type_change_content'>
        <div class='change_type_change'>
          <span class='change_type_change_left'>运费返还方式：</span>
          <span class='change_type_change_right' @click='selectStandard' v-if='!accountType'>请选择运费返还方式</span>
          <span class='change_type_change_right' v-if='accountType == 3' @click='selectStandard'>转账到支付宝</span>
          <span class='change_type_change_right' v-if='accountType == 2' @click='selectStandard'>转账到银行卡</span>
        </div>
        <div class='change_type_content_input' v-if='accountType == 3' style="margin-top: 10px;">
          <span>姓名:</span>
          <input type="" name="" placeholder="请填写支付宝的真实姓名" v-model='returnName'>
          <div class='change_type_content_input_top'></div>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div class='change_type_content_input' v-if='accountType == 3'>
          <span>支付宝账号:</span>
          <input style='width: 2.3rem' type="" name="" placeholder="必填" v-model='returnAccount'>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div class='change_type_content_input' v-if='accountType == 2' style="margin-top: 10px;">
          <span>姓名:</span>
          <input type="" name="" placeholder="必填" v-model='returnName'>
          <div class='change_type_content_input_top'></div>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div class='change_type_content_input' v-if='accountType == 2'>
          <span>银行卡卡号:</span>
          <input type="" name="" placeholder="不支持信用卡" v-model='returnAccount'>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div class='change_type_content_input' v-if='accountType == 2'>
          <span>银行卡开户行:</span>
          <input type="" name="" placeholder="不支持地方银行" v-model="returnBank">
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div class='change_type_content_input' v-if='accountType == 2'>
          <span>开户行所在省市:</span>
          <!--<input type="" name="" placeholder="必填" v-model="returnBank">-->
          <div class="text_lable" @click="show"><span v-if="text == ''">必填</span><span style="color:black;">{{text}}</span></div>
          <div class='change_type_content_input_left'></div>
          <div class='change_type_content_input_bottom'></div>
          <div class='change_type_content_input_right'></div>
        </div>
        <div style="width: 100%; height: 10px;" v-if='accountType'></div>
      </div>
    </div>
    <!-- 换货商品列表展示 -->
    <div class="orderList" @click='goshopInfo(item)' v-for='(item, index) in data.goodsList'>
      <a class="order_goods_item" href="javascript:void(0)">
        <div class="order_good_img_container">
          <img :src="item.imageUrl">
        </div>
        <div class="order_good_info_container dav-small">
          <div class="order_good_name">{{item.title}}</div>
          <div class="order_good_price">¥{{item.nowPrice}} <span class="f14">X</span>{{item.goodsNum}}</div>
        </div>
      </a>
    </div>
    <!-- 所有订单信息展示 -->
    <div class="bgf">
      <div class="order_list order_descript">
        <div v-if='data.orderSn'>订单号：{{data.orderSn}}</div>
        <div v-if='data.reasonName'>换货原因：{{data.reasonName}}</div>
        <div v-if='data.issueDescription'>问题描述：{{data.issueDescription}}</div>
        <!-- <div v-if='data.supplyAddress.consignee'>收货人：{{data.supplyAddress.consignee}}</div>
                <div v-if='data.supplyAddress.mobile'>联系电话：{{data.supplyAddress.mobile}}</div>
                <div v-if='data.supplyAddress.address'>收货地址：{{data.supplyAddress.address}}</div>
                <div v-if='data.expCompany'>快递公司：{{data.expCompany}}</div>
                <div v-if='data.expNo'>快递单号：{{data.expNo}}</div> -->
        <div v-if='data.expMoney'>寄回运费：{{data.expMoney}}</div>
        <div v-if='data.expMoneyAcc && data.expMoneyAccType==3'>支付宝账号：{{data.expMoneyAcc}}</div>
        <div v-if='data.expMoneyAcc && data.expMoneyAccType==2'>银行卡卡号：{{data.expMoneyAcc}}</div>
        <div v-if='data.expMoneyAccName && data.expMoneyAccType==3'>支付宝姓名：{{data.expMoneyAccName}}</div>
        <div v-if='data.expMoneyAccName && data.expMoneyAccType==2'>银行卡姓名：{{data.expMoneyAccName}}</div>
        <div v-if='data.expMoneyAccBank && data.expMoneyAccType==2'>银行：{{data.expMoneyAccBank}}</div>
      </div>
    </div>
    <!-- 换货商品展示 -->
    <div class="change_goods">
      <div class="title">换成的商品</div>
      <div class="content" v-for='(item, index) in data.selectGoodsList'>
        <div class='line'><span class='span'><span>{{item.title}}</span></span> <span
          class='span1'>{{item.goodsNum}}</span>件
        </div>
      </div>
    </div>
    <!-- 进度详情 -->
    <div class="common mb20" @click="handleDetail">
      <span class="flex1">进度详情</span>
    </div>
    <!-- 提交物流信息按钮 -->
    <div class="submit" v-if='data.statusCode==3'>
      <div class="submit_btn" @click='expressAdd'>确定</div>
    </div>
    <div style='height: 80px;'></div>
    <div class='slide_container' id='slide_container' v-if='showSlide'>
      <div class='slide_bg' id='slide_bg' @click='selectStandard'></div>
      <div class='slide_content'>
        <div class='slide_container_type'>
          <div class='slide_title'>请选择运费返还方式</div>
          <div class='slide_text' @click='changeResult(3)'>返还到支付宝</div>
          <div class='slide_text' @click='changeResult(2)'>返还到银行卡</div>
        </div>
        <div class='slide_btn' @click='selectStandard(1)'>取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../../common/js/api.es6"
  import popup from 'dvd-service-js-popup';
  import native from 'dvd-service-js-native';
  import {getQuery} from "../../../common/js/utils.es6"
  import vueCityPicker from 'vue-city-bspicker'
  import $ from 'jquery';
  export default {
    props: ['data'],
    data() {
      return {
        uuu: [],
        province:[],
        city:[],
        area:[],
        text:'',

        provinceString:"",
        cityString:"",
        areaString:"",

        isModal: false,
        showSlide: false,
        barterId: getQuery('barterId'),
        expressCompany: '请选择',
        expressNo: '',
        shippingFee: '',
        accountType: null,
        returnName: '',
        returnAccount: '',
        returnBank: '',

        ajaxUrl:""
      }
    },
    components:{
      vueCityPicker
    },
    mounted() {
      console.log(this.data, 111111);
      this.ajaxUrl=this.data.addrStaticDataUrl;
      this.getInitData();
      console.log("this.ajaxUrl",this.ajaxUrl);
    },
    methods: {
      getInitData(){
        var _this=this;
        var cityCount=1000;
        $.ajax({
          url: _this.ajaxUrl,
          dataType: "json",
          success: function (result) {
            result.map( (item,index) => {
              var obj={
                "text":item[1],
                "parentId":0,
                "value":index
              }
              _this.province.push(obj);
              if(typeof item[2][0] != 'undefined'){
                item[2].map( (item2,index2) => {
                  cityCount++;
                  var obj={
                    "text":item2[1],
                    "parentId":index,
                    "value":cityCount
                  }
                  _this.city.push(obj);
                  if(typeof item2[2][0] != "undefined"){
                    item2[2].map( (item3,index3) => {
                      var obj={
                        "text":item3[1],
                        "parentId":cityCount,
                        "value":parseInt(index3)+100000
                      }
                      _this.area.push(obj);
                    } )
                  }
                })
              }
            })
//            console.log("_this.province",_this.province);
//            console.log("_this.city",_this.city);
//            console.log("_this.area",_this.area);
//            _this.uuu=[];
            _this.uuu.push(_this.province);
            _this.uuu.push(_this.city);
            _this.uuu.push(_this.area);
          },
          error: function () {
          }
        });
      },
      show: function(){
        this.$refs['picker'].show();
      },
      select: function(){
        this.provinceString=arguments[2][0];
        this.cityString=arguments[2][1];
        this.areaString=arguments[2][2];

        this.text = arguments[2][0]+" "+arguments[2][1]+ "市 " +arguments[2][2];
        console.log(arguments)
      },
      goLogistics() {
        var url = 'http://cha.chawuliu.cn/?stype=kd&q=' + this.data.invoiceNo
        // var url = 'https://m.baidu.com/s?word=' + encodeURIComponent(this.data.shippingCompany) + this.data.invoiceNo
        this.handleJump(url);
      },
      goshopInfo(item) {
        var url = '/' + item.goodsId + '.html'
        this.handleJump(url);
      },
      repeal() {
        var obj = {
          barterId: this.getQuery('barterId')
        }
        api('/api/mg/order/exchangeGoodsOrder/repeal', obj).then(function (res) {
          if (res.code == 0) {
            window.location.reload();
          } else {
            popup.toast(res.data.msg);
          }
        }).catch(function(e) {
          popup.toast('网络异常，请稍后');
        })
      },
      expressAdd() {
        if (this.expressCompany == '请选择') {
          popup.toast('请填写快递公司名称~');
          return;
        }
        if (this.expressNo == '') {
          popup.toast('请填写快递单号~');
          return;
        }
        // if (this.shippingFee == ''){
        // 	popup.toast('请填写物流运费~');
        // 	return
        // }
        if (this.shippingFee && Number(this.shippingFee) && Number(this.shippingFee) > 30) {
          popup.alert({
            text: '线上申请运费报销不能高于30，可正常提交其他页面信息，运费联系客服处理~'
          });
          return;
        }

        if (this.shippingFee) {
          if (!this.accountType) {
            popup.toast('请选择运费返回方式~');
            return;
          }
          if (this.returnName == '') {
            popup.toast('请填写姓名~');
            return;
          }
          if (this.returnAccount == '') {
            if (this.accountType == 3) {
              popup.toast('请填写支付宝账号~');
            } else if (this.accountType == 2) {
              popup.toast('请填写银行卡卡号~');
            }
            return;
          }
          if (this.accountType == 2 && this.returnBank == '') {
            popup.toast('请填写银行卡开户行~');
            return;
          }
          if (this.accountType == 2 && this.text == '') {
            popup.toast('请填写开户行所在省市~');
            return;
          }
        }
        if (this.returnAccount || this.returnBank || this.text != '') {
          if (this.shippingFee == '') {
            popup.toast('请填写运费金额~');
            return;
          }
          if (this.returnName == '') {
            popup.toast('请填写姓名~');
            return;
          }
          if (this.returnAccount == '') {
            if (this.accountType == 3) {
              popup.toast('请填写支付宝账号~');
            } else if (this.accountType == 2) {
              popup.toast('请填写银行卡卡号~');
            }
            return;
          }
          if (this.accountType == 2 && this.returnBank == '') {
            popup.toast('请填写银行卡开户行~');
            return;
          }
        }
        var obj = {
          barterId: this.getQuery('barterId'),
          expressCompany: this.expressCompany,
          expressNo: this.expressNo
        }
        if (this.shippingFee) {
          obj.shippingFee = this.shippingFee;
        }
        if (this.accountType) {
          obj.accountType = this.accountType;
        }
        if (this.returnName) {
          obj.returnName = this.returnName;
        }
        if (this.returnAccount) {
          obj.returnAccount = this.returnAccount;
        }
        if (this.accountType == 2) {
          obj.returnBank = this.returnBank;
        }

        if (this.provinceString) {
          obj.bankProvince = this.provinceString;
        }
        if (this.cityString) {
          obj.bankCity = this.cityString;
        }
        if (this.areaString) {
          obj.bankDistrict = this.areaString;
        }

          api('/api/mg/order/exchangeGoodsOrder/expressAdd', obj).then(function(res) {
            if (res.code == 0) {
              window.location.reload();
            } else {
              popup.toast(res.data.msg);
              // window.location.reload()
            }
          }).catch(function(e) {
            popup.toast('网络异常，请稍后');
          })

        console.log(obj, 123123)
      },
      changeResult(index) {
        if (index != this.accountType) {
          this.returnAccount = '';
          this.returnName = '';
          this.accountType = index;
        }
        this.selectStandard();
      },
      selectStandard() {
        var that = this;
        setTimeout(function() {
          if (that.showSlide) {
            $('#slide_bg').fadeOut(500);
            $('#slide_container').css({
              height: '1300px'
            });
            setTimeout(function() {
              that.showSlide = false;
              document.body.classList.remove('dialog-open');
              window.scrollTo(0, that.scrollTop);
              $('.com-top-title').css({
                top: '0',
                position: 'fixed'
              })
            }, 400)
          } else {
            that.showSlide = true;
            setTimeout(function() {
              //定位body的scroll
              that.scrollTop = window.scrollY;
              document.body.classList.add('dialog-open');
              document.body.style.top = -that.scrollTop + 'px';
              setTimeout(function() {
                $('.com-top-title').css({
                  top: '1px',
                  position: 'fixed'
                })
              }, 100)
              $('#slide_container').css({
                height: document.documentElement.clientHeight
              });
              $('#slide_bg').fadeIn(300)
            }, 200)
          }
        }, 200)
      },
      getQuery(name) {
        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null
      },
      handleDetail() {
        var url = '/order_progress_detail.html?barterId=' + this.getQuery('barterId');
        this.handleJump(url);
      },
      isapp() {
        let u = navigator.userAgent;
        return !!u.match(/davdian|bravetime|vyohui/);
      },
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      handleJump(url) {
        if (this.isapp()) {
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
    }
  }
</script>
