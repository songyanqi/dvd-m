<template>
	<div class = "order_list_container" v-if = "response">
    <com-top-title back title="售后列表" home></com-top-title>
    <div id='order_list_menu' class='order_list_menu' :class='{order_list_menu_inapp: isAppTop}'>
      <div class='order_menu_left' :class='{selected: menuFlag==1}' @click='changeMenu(1)'>售后申请</div>
      <div class='order_menu_right' :class='{selected: menuFlag==2}' @click='changeMenu(2)'>申请记录</div>
      <div class='order_menu_line'></div>
      <div class='order_menu_line1'></div>
      <div class='order_menu_line2'></div>
    </div>
    <div style='height: 4px;'></div>
    <div v-if = "list.length">
  		<div class="order_list_item dav-shadow" v-for = "(item,index) of list">
          <!--店铺信息-->
          <div class="order_name">
              <!--店铺名-->
              <a :href="item.shopUrl">
                  <span class="shop_icon"></span>
                  <span class="shop_title">{{ item.shopName }}</span>
                  <span class="shop_arrow"></span>
              </a>
              <!--退货单状态-->
              <span class="pull-right color3" v-if='menuFlag==2'>{{ item.status }}</span>
              <span class="pull-right mg5 color3" v-if='menuFlag==2'>{{ item.cusTypeDec }}</span>
          </div>
          <!--订单内容-->
          <!-- <a v-if = "item.goodsList && item.goodsList.length == 1"  -->
          <a v-if = "item.goodsList"
              @click = "handleClick(item)"
              href = "javascript:void(0)"
          	  class="order_good_list single_good">
              <div class="img_container" v-for = "(nav,index) of item.goodsList" @click = "shopDetail(item,index)">
                  <div class="img_container_inner">
                      <span><img style="display: inline" :src="nav.imageUrl" /></span>
                  </div>
                  <div class="order_good_info_container">
                      <div class="order_good_name" >
                          {{ nav.title }}
                      </div>
                      <div class="order_good_price">
                          ¥ {{ nav.nowPrice }} x {{ nav.goodsNum }}
                      </div>
                  </div>
                  <div class='apply_btn' v-if='menuFlag==1 && item.isSupervisor != 1' @click.stop="afterSaleFn(item,index)">申请售后</div>
              </div>
          </a>
          <!--退款信息-->
          <div class="order_buttons" v-if='menuFlag==2 && item.customerType!=6'>
              <div style="float: right;">
                  退款金额：
                  <span class="span-right dav-red">¥ {{ item.refundMoney }}</span>
              </div>
              <div style="float: right;margin-right: 10px">
                  实付金额：
                  <span class="span-right">¥ {{ item.paidMoney }}</span>
              </div>
              <div style="clear: both"></div>
          </div>
      </div>
      <div v-if = "loading" class="no_more">
          商品加载中 <img src="//9i.dvmama.com/free/loading_03252.svg">
      </div>
      <div class = "noMore" v-if = "page > 1 && noMore">没有更多啦</div>
    </div>
    <div v-else>
      <div class="center">
        <div class="theEndPageWoman"></div>
        <div class = "center mt_10 c6">暂无记录</div>
      </div>
    </div>
	</div>
</template>
<script>
import layout from "../../index/module/index/layout.es6";
import popup from 'dvd-service-js-popup';
import native from 'dvd-service-js-native';
import common from 'dvd-service-js-common';
import usrAgent from 'dvd-base-js-ua';  import $ from 'jquery';

export default {
    components: {
      'com-top-title': require('dvd-service-com-title').default,
    },
		data() {
			return {
				pageSize: 10,
				page: 1,
        pageNew:1,
				response: null,
				list: [],
				noMore: false,
        noMoreNew:false,
        isAjax: true,
        loading: true,
        isShowRecord: false,
        afterSaleList:[],
        recordList:[],
        listTop:0,
        afterSaleTop:0,
        recordTop:0,
        menuFlag:1,//1申请列表2申请
        isAppTop:true,
        serverTime:null
			}

		},
		mounted() {
      var that = this
      this.$nextTick(function(){
        this.getMoreData();
        let scrollTop = sessionStorage.getItem("afterSaleTop");
        window.onscroll = function(){
          that.listTop = window.scrollY
          if (window.scrollY < 0) {
            document.getElementById('order_list_menu').style.position = 'absolute';
          } else {
            document.getElementById('order_list_menu').style.position = 'fixed';
          }
        }
        window.onbeforeunload = function(){
          that.unonload()
        }
      })

		},
		created() {
      if (this.isapp()){
        if(usrAgent.compareVersion(usrAgent.getDvdAppVersion(), '5.2.0') >= 0) {
          this.isAppTop = false
        }else {
          this.isAppTop = true
        }
      } else {
        this.isAppTop = false
      }
      var that = this
      if (sessionStorage.getItem('return_list_' + this.getQuery('_tt'))){
        var o = JSON.parse(sessionStorage.getItem('return_list_' + this.getQuery('_tt')))
        this.pageSize = o.pageSize
        this.page = o.page
        this.pageNew = o.pageNew
        this.response = o.response
        this.list = o.list
        this.noMore = o.noMore
        this.noMoreNew = o.noMoreNew
        this.loading = that.loading
        this.isShowRecord = o.isShowRecord
        this.afterSaleList = o.afterSaleList
        this.recordList = o.recordList
        this.listTop = o.listTop
        this.afterSaleTop = o.afterSaleTop
        this.recordTop = o.recordTop
        this.menuFlag = o.menuFlag
        this.serverTime = o.serverTime
        this.loading = false
        document.body.setAttribute('class','loaded')
        if (this.listTop){
          setTimeout(function(){
            window.scrollTo(0,that.listTop)
          },100)
        }
      } else {
        this.getData();
      }
		},
		methods: {
      // 是否为mobile
      afterSaleFn(obj,index){
        if (this.serverTime && obj.completedTime && this.serverTime-obj.completedTime>1296000){
          this.handleJump('/sale_error_page.html')
        }else if (obj.orderType==6){
          this.handleJump('/sale_error_page.html?state=2')
        } else if (obj && obj.goodsList && obj.goodsList[index] && obj.goodsList[index].aftersaleNum>0){
          var url = '/sale_change_page.html?aftersaleNum=' + obj.goodsList[index].aftersaleNum +'&goodsId=' + obj.goodsList[index].goodsId + '&deliveryId=' + obj.deliveryId + '&hadReturn=' +obj.goodsList[index].hadReturn
          this.handleJump(url)
        }else {
          this.handleJump('/sale_error_page.html?state=1')
        }
      },
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      isapp() {
        let u = navigator.userAgent
        return !!u.match(/davdian|bravetime|vyohui/);
      },
      changeMenu(flag) {
        var that = this
        if (flag!=this.menuFlag){
          this.menuFlag = flag
          if (flag==1){
            that.recordList = that.list
            that.recordTop = that.listTop
            that.list = that.afterSaleList
            setTimeout(function(){
              window.scrollTo(0,that.afterSaleTop)
            },100)
          }else {
            if (that.isShowRecord){
              that.afterSaleList = that.list
              that.afterSaleTop = that.listTop
              that.list = that.recordList
              setTimeout(function(){
                window.scrollTo(0,that.recordTop)
              },100)
            }else{
              that.afterSaleList = that.list
              this.getData(2)
              that.isShowRecord=true
            }
          }
        }
      },
      getQuery (name) {
        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.match(reg)
        if (r != null) return decodeURIComponent(r[2])
        return null
      },
      unonload(){
        var that = this
        var obj = {
          pageSize: that.pageSize,
          page: that.page,
          pageNew: that.pageNew,
          response: that.response,
          list: that.list,
          noMore: that.noMore,
          noMoreNew: that.noMoreNew,
          isAjax: that.isAjax,
          loading: that.loading,
          isShowRecord: that.isShowRecord,
          afterSaleList:that.afterSaleList,
          recordList: that.recordList,
          listTop: that.listTop,
          afterSaleTop:that.afterSaleTop,
          recordTop:that.recordTop,
          menuFlag:that.menuFlag,
          serverTime: that.serverTime
        }
        sessionStorage.setItem('return_list_' + this.getQuery('_tt'),JSON.stringify(obj))
      },
      // 跳转方式
      handleJump(url) {
        var that = this
        this.unonload()
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
      shopDetail(item,index){
        if (this.menuFlag == 1){
          this.handleJump('/' + item.goodsList[index].goodsId + '.html');
        }
      },
      //判断是取消订单还是售后订单
      handleClick(item, index) {
        console.log('te-->', item)
        if (item.customerType == 2) {
          this.handleJump(`/refund-${item.subId}.html`);
        }
        if (item.customerType == 1) {
          this.handleJump(`/return_progress.html?cancelId=${item.subId}`);
        }
        if (item.customerType == 3) {
          this.handleJump(`/return_progress.html?refundId=${item.subId}&flag=1`);
        }
        if (item.customerType == 6) {
          this.handleJump(`/after_sale_state.html?barterId=${item.subId}`);
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
          if (that.menuFlag==1){
            if (!that.noMoreNew) {
              if (document.documentElement.clientHeight + scrollTop >= document.body.clientHeight * 0.95) {
                that.getData();
              }
            }
          }else {
            if (!that.noMore) {
              if (document.documentElement.clientHeight + scrollTop >= document.body.clientHeight * 0.95) {
                that.getData();
              }
            }
          }

				},false);
			},
			getData(flag) {
				let that = this;
        let queryObj = layout.strSign('returnOrderList',{
           _t:Date.now()+Math.random(),
            pageSize: that.pageSize,
            pageIndex: that.menuFlag==1?that.pageNew:that.page
        });
        if (that.isAjax) {
          that.isAjax = false;
          that.loading = true;
  				$.ajax({
            url: that.menuFlag==1?'/api/mg/order/deliveryOrder/list':'/api/mg/order/afterCustomer/list',
            dataType: "JSON",
            type: "POST",
            data: queryObj,
            success(res) {
              common.checkRedirect(res);
              that.serverTime = res.sys_time
              that.isAjax = true;
              that.loading = false;
            	if (res.code == 0) {
                that.response = res;
                if (flag == 1){
                  that.list = that.afterSaleList.concat(res.data.list);
                }else if (flag == 2){
                  that.list = that.recordList.concat(res.data.list)
                }else {
                  that.list = that.list.concat(res.data.list);
                }

                if(that.menuFlag==1){
                  that.pageNew++;
                }else {
                  that.page++;
                }

                if (res.data.list.length != that.pageSize) {
                  if(that.menuFlag==1){
                    that.noMoreNew = true;
                  }else {
                    that.noMore = true;
                  }

                }
  	          } else {
                popup.toast(res.data.msg);
              }
            },
            error(err) {
              that.isAjax = true;
              that.loading = false;
            	// console.log(err);
            	// let data = require("../json/return_list.json").data.list;
            	// that.list = that.list.concat(data);
            	// console.log(data);
            }
          });
        }
			}
		}
	}
</script>
