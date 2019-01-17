<style>
body {
  padding-bottom: 45px;
  padding-top: 0;
}
.dvd-service-com-popup-toast {
  z-index:602!important;
}
</style>
<!--loadBefore-->
<template>
  <div>
    <div v-if="loadBefore">
      <!-- <spinner class = "spinnerStyle" :type="type" slot="value"></spinner> -->
    </div>
    <div v-else :class="[{'big_gift':isBigGiftGoods,'from_earn':fromEarn}]">
      <div v-if="isGoods">
        <no-find-goods :isapp="isApp"></no-find-goods>
      </div>
      <div v-else>

        <!--显示动态条-->
        <div v-if="Number(goodsStockNumber) > 0 && goodStatusonSale == 1 ">
          <div v-if="firstScreenFinish && Number(goodsStockNumber) > 0" v-show="swiperInfo.trendsList && swiperInfo.trendsList.length" class="tends_wrapper isProTends" :class="{ proTends: !isPrompt, isAppTends: isApp }">
            <div id="tends">
              <img class="avarImg" :src="trendAvatar" alt="">
              <span>{{ trendInfo }}</span>
            </div>
          </div>
        </div>
        <!--商品详情页及文章详情未开店用户提示开店-->
        <div v-if="firstScreenFinish&&shopUrl.length && !isApp && visitorStatus != '3' && !isBigGiftGoods">
          <div v-if="isPrompt" class="kd_prompt_con">
            <i class="modal-close prompt_close" @click="handleClosePrompt"></i>
            <span class="title">{{ shopMemo }}</span>
            <a :href="shopUrl">
              <span class="kd_btn">成为会员</span>
            </a>
          </div>
        </div>

        <!-- 标题栏 -->
        <com-top-title :back="ua.isWeiXin() ? false : true" opacity home share :share-money1="shareMoney" :share-click="shareMessage" :class="{'picTabtop': ua.isDvdApp() || !isPrompt || isBigGiftGoods}">
          <title-nav slot="center" :isbiggift="isBigGiftGoods"></title-nav>
        </com-top-title>

        <div>
          <div class="goodsWrapper" :class="{ pciTabMtopT: isPrompt && !isApp && !isBigGiftGoods}">
            <goods-swiper :albuminfo="albuminfo" :isapp="isApp" :infoobj="infoObj" :singleactivity="singleActivity" :isshowactive="isShowActive" :actendtime="actEndTime" :goodstatusonsale="goodStatusonSale" :goodstatus="goodStatus" :trendavatar="trendAvatar" :trendname="trendName" :swiperinfo="swiperInfo" :videoobj="videoObj" :iscomingactive="isComingActive" :singlecomeactivity="singleComeActivity" :visitorstatus="visitorStatus" :otheract="otherAct" :isbiggift="isBigGiftGoods" :seller="sellerNameGift" :goodsimglist="goodsImgList"></goods-swiper>
            <goods-intro :isbiggift="isBigGiftGoods" :isshowactive="isShowActive" :shopurl="shopUrl" :membercont="memberCont" :datarepresentid="dataRepresentId" :seckill="secKill" :native="native" :ua="ua" :isshowa="isShowa" :isshowb="isShowb" :saleactivity="saleActivity" :singleactivity="singleActivity" :visitorstatus="visitorStatus" :goodsname="goodsName" :goodsstocknumber="goodsStockNumber" :infoobj="infoObj" :otheract="otherAct" :response="response" :goodsdatabasis="goodsDataBasis" :goodsparamobj="goodsParamObj"></goods-intro>
            <!--广告banner-->
            <ad-banner :ad-img="response.data.ADBanner.imageUrl" :ad-url="response.data.ADBanner.content" v-if="response && response.data && response.data.ADBanner && response.data.ADBanner.imageUrl&&!isBigGiftGoods">
            </ad-banner>
            <!-- 赚钱养家专用图  -->
            <div class="zhuanqian-box" v-if="isBigGiftGoods">
              <h5 class="zhuanqian-title">购买
                <span>礼包</span>后将获得:</h5>
              <img class="zhuanqian-banner" src="//9i.dvmama.com/free/Pictures/zhuanqian_icon2.png" alt="">
            </div>
            <activity-types v-if="firstScreenFinish" :isbiggift="isBigGiftGoods" :userbuygift="userBuyGift" :infoobj="infoObj" :actendtime="actEndTime" :isshowactive="isShowActive" :visitorstatus="visitorStatus" :goodslimitnum="goodsLimitNum" :activitynum="activityNum" :activityinfo="activityInfo" :activityslist="activitysList" :activityindex="activityIndex" :activityurl="activityUrl" :dataseller="dataSeller" @confirm-id="handleConfirmId" @change-type="handleChangeType" :goodstags="goodsTags" :isclose="isClose" :goodsmodalobj="goodsModalObj" :datarepresentid="dataRepresentId" :islimitnum="isLimitNum" :seckill="secKill" :handlechangenum="handleChangeNum" @change-cartnum="handleCartNum" :relativegoodslist="relativeGoodsList" @relative-goods="relativeGoods" :goodstatusonsale="goodStatusonSale" :goodstatus="goodStatus" :otheract="otherAct" :goodsstocknumber="goodsStockNumber" :allgoodsstocknumber='allGoodsStockNumber' :ismultigoods="isMultiGoods" :goodsid="goodsId" :fromearnact="fromEarnAct" :dataextralist="dataExtraList" :datagoodsid="dataRepresentId"></activity-types>

            <div v-if="addModuleMes&& !isBigGiftGoods">
              <!--搭配好课-->
              <course :response="addModuleMes" v-if="addModuleMes && addModuleMes.data && addModuleMes.data.course"></course>

              <!--v友试用-->
              <article-share :response="addModuleMes" v-if="addModuleMes && addModuleMes.data && addModuleMes.data.page"></article-share>
            </div>
            <!--商品素材-->
            <goods_material v-if="infoObj.price && !isBigGiftGoods" :goodsdatabasis="goodsDataBasis" :materials="materials" :price="infoObj.price" :goodsid="goodsId" :sellername="sellerName" :otheract="otherAct" :activityinfo="activityInfo" @ievent="ievent"></goods_material>

            <goods-evaluate v-if="firstScreenFinish&& !isBigGiftGoods" :commentobj="commentObj"></goods-evaluate>

            <brand-type visitorstatus="visitorStatus" v-if="firstScreenFinish" :brandlist="brandList"></brand-type>

            <div class="parmas_wrapper clearfix" v-if="firstScreenFinish" id="detail_area">
              <tab v-if="goodsParamObj.length" class="picTab" :line-width=2 active-color='#FF4A7D' v-model="detailIndex">
                <tab-item :selected="detailTitle === item" v-if="goodsParamObj.length" v-for="(item, detailIdx) in detailListTitle" :key="detailIdx">
                  {{item}}
                </tab-item>
                <span v-if="goodsParamObj.length" class="tabLine">|</span>
              </tab>
              <tab v-else class="picTab" :line-width=1 active-color='#FF4A7D' v-model="detailIndex">
                <tab-item :selected="detailTitle === item" v-for="(item, detailIdx) of detailListNav" :key="detailIdx">
                  {{item}}
                </tab-item>
              </tab>
              <div class="detialWrapper">
                <div class="parames clearfix" v-show="detailIndex == 0">
                  <detail-pic :isbiggift="isBigGiftGoods" :isprompt="isPrompt" :mayyoulikenomore="mayYouLikeNoMore" @loadmayyoulike="handleMayYouLike" :mayyoulikelist="mayYouLikeList" :isapp="isApp" :videoobj="videoObj" :goodsimglist="goodsImgList" :goodsid="goodsId" :picdetails="picDetails" :addmodulemes="addModuleMes"></detail-pic>
                </div>
                <div class="picCont" v-if="goodsParamObj.length" :style="{ minHeight: minHeight + 'px', background: '#fff' }" v-show="detailIndex == 1">
                  <goods-params :isprompt="isPrompt" :isapp="isApp" :goodsparamobj="goodsParamObj"></goods-params>
                </div>
              </div>
            </div>
          </div>
        </div>
        <goods-bottom :infoobj="infoObj" :actendtime="actEndTime" :isshowactive="isShowActive" :parentid="parentId" :ismultigoods="isMultiGoods" :goodslimitnum="goodsLimitNum" :goodstatusonsale="goodStatusonSale" :goodstatus="goodStatus" @change-type="handleChangeType" @confirm-id="handleConfirmId" :goodstags="goodsTags" :isclose="isClose" :goodsmodalobj="goodsModalObj" :datarepresentid="dataRepresentId" :cartnum="cartNum" :handlechangenum="handleChangeNum" @change-cartnum="handleCartNum" :islimitnum="isLimitNum" :mayyoulikelist="mayYouLikeList" :relativegoodslist="relativeGoodsList" @relative-goods="relativeGoods" :visitorstatus="visitorStatus" :spread="spread" :seckill="secKill" :otheract="otherAct" :isbook="isVipBookGoods" :goodsstocknumber="goodsStockNumber" :allgoodsstocknumber='allGoodsStockNumber' :isbiggiftgoods="isBigGiftGoods" :fromearn="fromEarn" :isseller="isSeller" :position="position" :userbuygift="userBuyGift" :fromearnact="fromEarnAct" :dataextralist="dataExtraList" :datagoodsid="dataRepresentId"></goods-bottom>
      </div>
      <confirm v-if="confirmShow" title="提示" @on-cancel="handleConfirmCancel" :confirm-text='confirmText' :cancel-text='cancelText' @on-confirm="handleConfirmOk">
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
      <loading v-model="loadingShow"></loading>
      <!--返回顶部-->
      <dvd-service-com-go-page-top></dvd-service-com-go-page-top>
      <!--馆配按钮 icon-->
      <libraryconfig v-if="library&&library.status === 1" :img="cartGoodsImg" :library="library" :goodid="goodsId"></libraryconfig>
    </div>
  </div>
</template>

<script>
import '../css/goods_detail.scss';
import goods_detail from './goods_detail.es6';

export default goods_detail;
</script>
