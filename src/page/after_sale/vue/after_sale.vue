<template>
  <div class='container'>
    <!-- 商品模块 -->
    <div class='container_goods' v-if='data.goodsList' v-for='(item,index) in data.goodsList'>
      <div class='goods_img'
           :style="{'background-image': 'url(' + item.imageUrl + ')','background-repeat':'no-repeat','background-position':'center center','background-size': '100% 100%' ,'background-size': 'cover'}"></div>
      <div class='goods_content'>
        <div class='goods_title' v-text='item.title'></div>
        <div class='goods_price'>￥{{item.nowPrice}}x{{item.goodsNum}}</div>
      </div>
    </div>
    <!-- 金额模块 -->
    <!-- <div class='container_goods_content'>
            <span class='container_goods_price_left'>实付金额</span>
            <span class='container_goods_price_right'>￥{{data.moneyPaid}}</span>
        </div> -->
    <!-- 换货原因select模块 -->
    <div class='container_goods_content'>
      <span class='container_goods_change_left'>换货原因：</span>
      <div class='container_goods_change_select' @click='selectStandard(2)'>
        <span v-text='resultText'></span>
      </div>

      <img @click='selectStandard(2)' class='container_goods_change_right'
           src="//9i.dvmama.com/free/2018/01/17/expandTheList.png">
    </div>
    <!-- 申请数量模块 -->
    <div class='container_goods_content'>
      <span class='container_goods_change_left'>申请数量：</span>
      <div class='container_goods_number_input'>
        <span class='span1' @click="calcurator(0, 'applyNumber')" v-if='applyNumber!=0'>－</span>
        <span class='span1' style='color: #E1E1E1;' v-else>－</span>
        <input type="tel" name="" v-model.number='applyNumber' v-on:keyup="changenumber">
        <span class='span2' @click='calcurator(1, "applyNumber")'
              v-if='applyNumber < data.goodsList[0].goodsNum'>＋</span>
        <span class='span2' style='color: #E1E1E1;' v-else>＋</span>
      </div>
    </div>
    <!-- 选择换货商品模块 -->
    <div class='container_change_goods'>
      <div class='change_goods_title'>
        <span class='change_goods_title_left'>选择你要换成的商品：</span>
        <span class='change_goods_title_right' @click='addStandard'><img
          src="//9i.dvmama.com/free/2018/01/17/addTo.png">添加</span>
      </div>
      <div class='change_goods_content' v-for='(item,index) in standardList'>
        <div class='change_goods_select_border' @click='selectStandard(1, index)'>
          {{item.name}}
          <img src="//9i.dvmama.com/free/2018/01/17/expandTheList.png">
        </div>
        <img @click='delStandard(index)' src="//9i.dvmama.com/free/2018/01/17/delete.png">
        <div class='container_goods_number_input'>
          <span class='span1' @click='calcurator(0,"standard",index)' v-if='item.number!=0'>－</span>
          <span class='span1' style="color:#E1E1E1;" v-else>－</span>
          <input type="tel" name="" v-model='item.number' v-on:keyup="changenumberlist(item,index)">
          <span class='span2' @click='calcurator(1,"standard",index)'>＋</span>
        </div>
        <div class='container_goods_number'>数量：</div>
      </div>
    </div>
    <!-- 收货地址 -->
    <div class='container_address' v-if='data.addressInfo'>
      <div class='title'>收货地址：</div>
      <div class='content'>
        <div class='top'>
          <span v-text='data.addressInfo.consignee'></span>
          <span v-text='data.addressInfo.mobile'></span>
        </div>
        <div class='address'>{{data.addressInfo.provinceName}} {{data.addressInfo.cityName}}
          {{data.addressInfo.districtName}} {{data.addressInfo.townName}} {{data.addressInfo.address}}
        </div>
        <img src="//9i.dvmama.com/free/2018/01/17/more.png">
        <div class='changeAddressClickBlock' @click='goChangeAddress'></div>
      </div>
    </div>
    <div class='btn_apply' @click='apply'>提交申请</div>
    <!-- 问题描述模块 -->
    <div class='container_goods_content'>
      <span class='container_goods_change_left'>问题描述：</span>
      <input style="margin-top: 14px;" type="" name="" placeholder="选填" v-model='describe' maxlength="200">
    </div>
    <!-- 上传图片模块 -->
    <div class='container_upImg'>
      <div class='upImg_title'>上传图片</div>
      <div class='upImg_container'>
        <div class='up_click_img' v-if='imgList && imgList[0]' v-for='(item, index) in imgList'
             :style="{'background-image': 'url(' + item + ')','background-repeat':'no-repeat','background-position':'center center','background-size': '100% 100%' ,'background-size': 'cover'}">
          <img @click='deleteImg(index)'
               src="//9i.dvmama.com/free/2017/04/01/40_40_7c423e206433bfb989b51ee3b5553ba7.png">
        </div>
        <div class='up_click_content' v-bind:style="{ display: imgList.length<8?'inline-block':'none'}" @click="addImg()">
          <!--<input class='inputStyle' type="file" multiple="multiple" accept="image/*" name="">-->
          <img src="//9i.dvmama.com/free/2018/01/17/up_img.png">
          <span>最多上传8张</span>
        </div>
      </div>
      <div class='upImg_text'>
        <p class='title'>为了更好的处理您的申请，请务必上传如下要求照片：</p>
        <p class='content'>1.无理由退换货请保证商品完好不影响二次销售并原包装寄回（如影响二次销售，原路返回）</p>
        <p class='content'>2.请在包裹内附上一张便签：购买人订单信息（订单号、收件人姓名、及手机号码）及退货/换货原因</p>
        <p class='content'>3.请您在申请退换货并审核通过后的2天内寄出，5天内未上传寄回单号将自动关闭退换货申请</p>
      </div>
    </div>
    <div style="height: 100px;"></div>
    <!-- 滑动效果 -->
    <div class='slide_container' id='slide_container' v-if='showSlide'>
      <div class='slide_bg' id='slide_bg' @click='selectStandard'></div>
      <div class='slide_content'>
        <!-- slideFlag判断条件为1为选择多规格，2位选择换货 -->
        <!-- title -->
        <div class='slide_title' v-if='slideFlag == 1'>请选择规格<img @click='selectStandard'
                                                                 src="//9i.dvmama.com/free/2018/01/17/shutDown15.png"
                                                                 class='slide_title_img'></div>
        <div class='slide_title' v-if='slideFlag == 2'>请选择换货原因<img @click='selectStandard'
                                                                   src="//9i.dvmama.com/free/2018/01/17/shutDown15.png"
                                                                   class='slide_title_img'></div>
        <!-- 换货列表 -->
        <div class='slide_text_container' v-if='slideFlag == 2'>
          <div id='slide_text_content'>
            <div class='slide_text' @click='changeResult(item)' v-for="(item,index) in data.reasonList">
              {{item.reasonName}}
              <img v-if='resultId == item.reasonId' src="//9i.dvmama.com/free/2018/01/17/select.png">
              <img v-else src="//9i.dvmama.com/free/2018/01/17/unselected.png">
              <div class='slide_text_bottom'></div>
            </div>
          </div>
        </div>
        <!-- 规格列表判断是否多规格 -->
        <div class='slide_text_container' v-if='data.selectGoodsList && data.selectGoodsList.childs
 && data.selectGoodsList.childs[0]&& slideFlag == 1'>
          <div id='slide_text_content'>
            <div class='slide_text' @click='changeResult(item)' v-for="(item,index) in data.selectGoodsList.childs"
                 v-if='item.goodsNum > 0'>{{item.title}}
              <img v-if='standardList[selectstandardListIndex].goodsId == item.goodsId'
                   src="//9i.dvmama.com/free/2018/01/17/select.png">
              <img v-else src="//9i.dvmama.com/free/2018/01/17/unselected.png">
              <div class='slide_text_bottom'></div>
            </div>
          </div>
        </div>
        <!-- 单规格 -->
        <div class='slide_text_container' v-if='data.selectGoodsList && data.selectGoodsList.childs
 && !data.selectGoodsList.childs[0] &&slideFlag == 1'>
          <div id='slide_text_content'>
            <div class='slide_text' @click='changeResult(data.selectGoodsList)'>{{data.selectGoodsList.title}}
              <img v-if='standardList[selectstandardListIndex].goodsId == data.selectGoodsList.goodsId'
                   src="//9i.dvmama.com/free/2018/01/17/select.png">
              <img v-else src="//9i.dvmama.com/free/2018/01/17/unselected.png">
              <div class='slide_text_bottom'></div>
            </div>
          </div>
        </div>
      </div>
      <div class='slide_btn' @click='selectStandard(1)'>
        确定
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../../common/js/api.es6"
  import popup from 'dvd-service-js-popup';
  import native from 'dvd-service-js-native';
  import $ from 'jquery';
  import ua from 'dvd-base-js-ua';
  import ajaxFileUpload from 'dvd-service-js-ajax-file-upload'
  import Img from 'dvd-base-js-img';


  export default {
    props: ['list'],
    data: function () {
      return {
        imgList: [],
        showSlide: false,
        slideFlag: 2,
        resultId: null,
        standedid: null,
        goodsId: null,
        applyNumber: 0,
        describe: '',
        resultText: '请选择换货原因',
        standardList: [{
          name: '规格',
          number: 0,
          goodsId: null
        }],
        selectstandardListIndex: null
      }
    },
    computed: {
      data() {
        return this.list || {}
      }
    },
    mounted() {
      var that = this
      this.$nextTick(function () {
        if (sessionStorage.getItem('after_sale_data_' + this.getQuery('deliveryId'))) {
          var obj = JSON.parse(sessionStorage.getItem('after_sale_data_' + this.getQuery('deliveryId')))
          that.imgList = obj.imgList
          // that.showSlide = obj.showSlide
          that.slideFlag = obj.slideFlag
          that.resultId = obj.resultId
          that.standedid = obj.standedid
          that.goodsId = obj.goodsId
          that.applyNumber = obj.applyNumber
          that.describe = obj.describe
          that.resultText = obj.resultText
          that.standardList = obj.standardList
          that.selectstandardListIndex = obj.selectstandardListIndex
        }
      });
    },
    methods: {
      deleteImg(index) {
        this.imgList.splice(index, 1)
      },
      sessionData() {
        var that = this
        window.onbeforeunload = function () {
          if (!window.isonbeforeunloadFlag) {
            var obj = {
              imgList: that.imgList,
              // showSlide: that.showSlide,
              slideFlag: that.slideFlag,
              resultId: that.resultId,
              standedid: that.standedid,
              goodsId: that.goodsId,
              applyNumber: that.applyNumber,
              describe: that.describe,
              resultText: that.resultText,
              standardList: that.standardList,
              selectstandardListIndex: that.selectstandardListIndex
            }
            sessionStorage.setItem('after_sale_data_' + that.getQuery('deliveryId'), JSON.stringify(obj))
          }
        }
      },
      changenumber() {
        if (isNaN(parseInt(this.applyNumber))) {
          this.applyNumber = 0
        } else {
          if (this.applyNumber > this.data.goodsList[0].goodsNum) {
            this.applyNumber = this.data.goodsList[0].goodsNum
          }
          this.applyNumber = parseInt(this.applyNumber)
        }
      },
      changenumberlist(item, i) {
        console.log(this.standardList[i].number, i)
        if (isNaN(parseInt(this.standardList[i].number))) {
          this.standardList[i].number = 0
        } else {
          this.standardList[i].number = parseInt(this.standardList[i].number)
        }
      },
      getQuery(name) {
        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.match(reg)
        if (r != null) return decodeURIComponent(r[2])
        return null
      },
      goChangeAddress() {
        var that = this
        var obj = {
          imgList: that.imgList,
          // showSlide: that.showSlide,
          slideFlag: that.slideFlag,
          resultId: that.resultId,
          standedid: that.standedid,
          goodsId: that.goodsId,
          applyNumber: that.applyNumber,
          describe: that.describe,
          resultText: that.resultText,
          standardList: that.standardList,
          selectstandardListIndex: that.selectstandardListIndex
        }
        sessionStorage.setItem('after_sale_data_' + that.getQuery('deliveryId'), JSON.stringify(obj))
        window.location.href = '/user_address.html?refer_page_type=barter&after_sale=1&deliveryId=' + this.getQuery('deliveryId')
      },
      delStandard(index) {
        this.standardList.splice(index, 1)
      },
      addStandard() {
        this.standardList.push({
          name: '规格',
          number: 0
        })
      },
      calcurator(state, name, index) {
        //state +为1 －为0
        if (state) {
          if (name == 'applyNumber') {
            this.applyNumber = parseInt(this.applyNumber + 1)
          } else if (name == 'standard') {
            this.standardList[index].number = parseInt(this.standardList[index].number + 1)
            console.log(index)
          }
        } else {
          if (name == 'applyNumber') {
            this.applyNumber = parseInt(this.applyNumber == 0 ? 0 : this.applyNumber - 1)
          } else if (name == 'standard') {
            this.standardList[index].number = parseInt(this.standardList[index].number == 0 ? 0 : this.standardList[index].number - 1)
            console.log(index)
          }
        }
      },
      changeResult(item) {
        console.log(item, this.slideFlag, this.selectstandardListIndex)
        if (this.slideFlag == 1) {
          this.goodsId = item.goodsId
          if (this.selectstandardListIndex || this.selectstandardListIndex == 0) {
            this.standardList[this.selectstandardListIndex].name = item.title
            this.standardList[this.selectstandardListIndex].goodsId = item.goodsId
          }
        } else if (this.slideFlag == 2) {
          this.resultId = item.reasonId
          this.resultText = item.reasonName
        }
      },
      selectStandard(i, index) {
        var that = this
        this.slideFlag = i || '1'
        if (this.slideFlag == 1) {
          this.selectstandardListIndex = index || 0
        }
        if (this.showSlide) {
          $('#slide_bg').fadeOut(500)
          $('#slide_container').css({
            height: '1300px'
          })
          setTimeout(function () {
            that.showSlide = false
            document.body.classList.remove('dialog-open');
            window.scrollTo(0, that.scrollTop)
          }, 400)
        } else {
          this.showSlide = true
          setTimeout(function () {
            //定位body的scroll
            that.scrollTop = window.scrollY
            document.body.classList.add('dialog-open')
            document.body.style.top = -that.scrollTop + 'px'
            $('#slide_container').css({
              height: document.documentElement.clientHeight
            })
            $('#slide_bg').fadeIn(300)
          }, 200)
        }
      },
      addImg() {
        let _this = this;
        let isApp = ua.isDvdApp();
        let appV = "";
        if (isApp == true) {
          appV = ua.getDvdAppVersion();
        }
        if (isApp === true && ua.compareVersion(appV, "5.6.0") >= 0) {
          native.Browser.uploadImage({
            sourceType: "2",
            maxImageNumber: "8",
            tailor: "0",
            biz: "3",
            success(data) {
              if (data && data.dataList) {
                let dataList = JSON.parse(data.dataList);
                for (let i = 0; i < dataList.length; i++) {
                  _this.imgList.push(dataList[i]);
                }
              } else {
                console.log("数据未返回");
              }
            }
          });
        }else{
          ajaxFileUpload.chooseLocalImgFile({
            accept: 'image/png,image/jpeg,image/jpg',
            maxSize: 10,
          }).then((data) => {
            // 判断上传后items的长度
            if ((data.length + _this.imgList.length) > 8) {
              popup.alert({text: "最多可以上传8张照片"})
              return;
            }
            // 压缩图片返回压缩后列表
            document.body.className = ""
            _this.imgCompress(data, "File", (Cback) => {
              _this.imgWebUpLoad(Cback, (c) => {
                for (let i = 0; i < c.length; i++) {
                  _this.imgList.push(c[i]);
                }
              });
              document.body.className = "loaded";
            });
          });
        }
      },
      isapp() {
        let u = navigator.userAgent
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
          window.location.href = url
        } else {
          window.location.href = url
        }
      },
      apply() {
        var that = this
        var obj = {
          deliveryId: this.getQuery('deliveryId'),
          returnGoodsId: this.getQuery('goodsId')
        }
        var exGoodsInfo = []
        var allNum = 0
        for (var i = 0; i < this.standardList.length; i++) {
          if (this.standardList[i].goodsId && this.standardList[i].number) {
            exGoodsInfo.push({
              exGoodsId: this.standardList[i].goodsId,
              exGoodsNum: this.standardList[i].number
            })
            allNum = allNum + this.standardList[i].number
          }
        }
        if (this.data.addressInfo.addressId) {
          obj.addressId = this.data.addressInfo.addressId
        }
        if (this.describe) {
          obj.describe = this.describe
        }

        if (this.resultId || this.resultId == 0) {
          obj.reasonId = this.resultId
        } else {
          popup.toast('请选择换货原因~');
          return
        }

        if (this.applyNumber) {
          obj.returnGoodsNum = this.applyNumber
        } else {
          popup.toast('申请数量不能为0~');
          return
        }

        if (this.imgList && this.imgList.length > 1) {
          obj.imgs = JSON.stringify(this.imgList || [])
        } else {
          popup.toast('请上传至少两张图片~');
          return
        }

        if (exGoodsInfo && exGoodsInfo[0]) {
          obj.exGoodsInfo = JSON.stringify(exGoodsInfo)
        } else {
          popup.toast('请选择换货规格和数量~');
          return
        }

        if (allNum != this.applyNumber) {
          popup.alert({
            text: '换货规格数量和申请换货数量不相同~'
          });
          return
        }
        console.log('obj-->', obj)
        if (this.applyFlag) {
          return
        }
        this.applyFlag = true
        api('/api/mg/order/exchangeGoodsOrder/create', obj).then(function (res) {
          window.isonbeforeunloadFlag = true
          if (res.code == 0) {
            try {
              for (var p in sessionStorage) {
                sessionStorage.removeItem(p)
              }
            } catch (e) {
              console.log(e)
            }
            var url = '/after_sale_state.html?barterId=' + res.data.barterId
            that.handleJump(url)
          } else {
            for (var p in sessionStorage) {
              sessionStorage.removeItem(p)
            }
            popup.toast(res.data.msg)
          }
          setTimeout(function () {
            that.applyFlag = false
          }, 5000)
        }).catch(function () {
          popup.toast('网络异常，请稍后');
          setTimeout(function () {
            that.applyFlag = false
          }, 5000)
        });
      },
      /**
       * 压缩图片
       * files:必传 数组 上传的图片到本地后产生的文件流
       * */
      imgCompress(files, type, callback) {
        if (files.length === 0) {
          console.error("至少传入一个文件")
          return;
        }
        // 压缩
        Img.multiAutoCompress(files, 1, type).then((cBack) => {
          callback(cBack)
        });
      },
      /**
       *  前端自己的图片上传
       * */
      imgWebUpLoad(url, callback) {
        if (url.length === 0) {
          console.error("至少传入一个文件")
          return;
        }
        ajaxFileUpload.uploadImg({
          dir: 'storyMother',    // 上传目标文件夹名称。建议每个功能页面的上传功能是一个独立的文件夹，方便日后统一处理。例如微信头像可以起名为'wx-head'，请到oss手动检查dir是否与已知目录重名
          imgs: url,  // 上传的图片（数组可接受File、url、base64url）
          loading: 1, // 是否自动显示loading（默认开启，如需关闭请传0）
          maxSize: 1,   // 图片最大尺寸（单位MB，如果传2MB图片文件时，会自动降质0.5转成1MB的文件并上传）
        }).then((data) => {
          callback(data);
        }, (err) => {
          console.log("上传图片出错")
          console.error(err);
          document.body.className = "loaded";
        });
      },
    }
  }
</script>
