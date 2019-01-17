<style>

</style>

<template>
  <div>
    <div class = "listWrapper">
      <div class = "listCont" :class = "{ addFixed: isApps }">
        <div class = "tabNav"
            :class = "{ currentColor: (status -1) == index }"
            @click = "handleTab(item,index)"
            v-for = "(item,index) of itemlist" :key = "index">
            {{ item.name }}
              <span v-if = "Number(item.countNum) > 0">({{ item.countNum }})</span>
            </div>
      </div>
    </div>
    <div class = "lists" v-show = "(status - 1) == listIdx" v-for = "(listNav,listIdx) of itemlist">
      <div v-if = "datalist[listNav.idx].length > 0" class = "listNav"  v-for = "(item,index) of datalist[listNav.idx]" :key = "listIdx">
        <div class = "goodsTitle">{{ item.actName }}</div>
        <div class = "cuntDown">
          <counter :status = "status" :endtime = "item.endSeconds"></counter>
        </div>
        <!-- 奖励规则 -->
        <div class = "goodsRule">
          <div class = "ruleTitle">奖励规则：</div>
          <div class = "ruleCont">
            <div @click = "handleUp(item)" class = "upTitle"><span class = "upDot" :class = "{ downDot: item.isUp }"></span></div>
            <div class = "upCont">
              <div v-for = "(ruleItem,ruleIdx) of item.ruleList" class = "ruleList">第{{ ruleItem.ladder }}梯度 | 店铺销售&ge;{{ ruleItem.number }}件后，每件获得奖励{{ ruleItem.reward }}元；</div>
              <!-- <div class = "ruleList">第二梯度 | 店铺销售&ge;10件后，每件获得奖励15元；</div> -->
              <div v-if = "!item.isUp">
                <!-- <div class = "ruleDemo">例：活动期间，当店铺销售5件时，发放日可获得50元奖励；若销售12件，则发放日可获得180元奖励。</div> -->
                <div class = "ruleDemo">例：{{ item.actRules }}</div>
                <div class = "ruleList ruleTime">活动区间 | <span class = "timeList">{{ item.startTime }} — {{ item.endTime }}</span></div>
                <div class = "ruleList">奖励发放 | {{ item.settlementTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 奖励件数 -->
        <div class = "awardNumCont">
          <div class = "rewardNCont">
            <div class = "reDetail">明细 | <span class = "fb">有效销售 {{ item.payNumber }} 件</span> * <span class = "fw">即售出总数减退货总数</span></div>
            <!-- <div class = "reNumMore">再售出 <span class = "fc">1</span>件，可满足第一梯度条件，发放日预计获得 <span class = "fc">30元</span></div> -->
            <!-- <div class = "reNumMore" v-if = "item.gradsNum.isGrads">再售出 <span class = "fc">{{ item.gradsNum.one[0] }}</span>件，{{ item.gradsNum.two[1] }}，发放日预计获得 <span class = "fc">{{ item.gradsNum.one[1] }}元</span></div>
            <div class = "reNumMore" v-else>
              <span>{{ item.gradsNum.two[0] }}， 预计可获得奖励<span class = "fc">{{ item.gradsNum.one[0] }}元</span></span>
              <span class = "reNumTips">*在奖励发放日前，若不再产生退货，将按时到账</span>
            </div> -->
            <!-- 未满足门槛 -->
            <div class = "reNumMore" v-if = "item.ladder == '0'">
              <span v-if = "listIdx == '0'">再售出 <span class = "fc">{{ item.nextNumber }}</span> 件，即可满足第{{ item.nextLadder }}梯度，发放日预计获得 <span class = "fc">{{ item.nextRemarkAmount }}元</span></span>
              <span v-else>未满足奖励规则，没有获得奖励呀，下次加油吧～</span>
            </div>
            <!-- 满足门槛但不是最后门槛 -->
            <div class = "reNumMore" v-if = "item.ladder != '0' && item.lastLadder == '0'">
              <span v-if = "listIdx == '0'">已符合第{{ item.ladder }}梯度，预计可获得 <span class = "fc">{{ item.remarkAmount }}元</span>，再售出 <span class = "fc">{{ item.nextNumber }}</span> 件，即可满足第{{ item.nextLadder }}梯度条件，发放日可获得 <span class = "fc">{{ item.nextRemarkAmount }}元</span></span>
              <span v-if = "listIdx == '1'">
                <span>已符合第{{ item.ladder }}梯度，预计可获得<span class = "fc">{{ item.remarkAmount }}元</span></span>
                <span class = "reNumTips">*在奖励发放日前，若不再产生退货，将于发放日按时到账</span>
              </span>
              <span v-if = "listIdx == '2'">
                <span>已符合第{{ item.ladder }}梯度，应获得<span class = "fc">{{ item.remarkAmount }}元</span></span>
                <span class = "reNumTips">*若【可提现】收入中金额有误，请及时联系客服</span>
              </span>
            </div>
            <!-- 满足最高门槛 -->
            <div class = "reNumMore" v-if = "item.ladder != '0' && item.lastLadder == '1'">
              <span v-if = "listIdx == '0'">已符合第{{ item.ladder }}梯度，目前售出 <span class = "fc">{{ item.payNumber }}</span>件，预计可获得奖励 <span class = "fc">{{ item.remarkAmount }}元</span></span>
              <span v-if = "listIdx == '1'">
                <span>已符合第{{ item.ladder }}梯度，预计可获得<span class = "fc">{{ item.remarkAmount }}元</span></span>
                <span class = "reNumTips">*在奖励发放日前，若不再产生退货，将于发放日按时到账</span>
              </span>
              <span v-if = "listIdx == '2'">
                <span>已符合第{{ item.ladder }}梯度，应获得<span class = "fc">{{ item.remarkAmount }}元</span></span>
                <span class = "reNumTips">*若【可提现】收入中金额有误，请及时联系客服</span>
              </span>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class = "goodsCont">
          <div class = "goodList" @click = "handleGoodList($event,itemgoods)" v-for = "(itemgoods,idx) of item.goodsList.slice(0,3)" :key = "idx">
            <div class = "goodImg"><img :src="itemgoods.goodsImg" alt=""></div>
            <div class = "goodsInfo">
              <div class = "goodTitle">{{ itemgoods.goodsName }}</div>
              <div class = "goodPrice">¥
                <span v-if = "(itemgoods.goodsPrice+'').split('.').length == 2">
                <span class = "f16">{{ itemgoods.goodsPrice.split(".")[0] }}</span><span>.{{ itemgoods.goodsPrice.split(".")[1] }}</span></span>
                <span class = "f16" v-else>{{ itemgoods.goodsPrice }}</span>
              </div>
              <div class = "goodsNum">
                <div class = "saleNum">
                  <span class = "fc" v-if = "Number(itemgoods.payNumber) > 0">售出{{ itemgoods.payNumber }}件</span>
                  <span v-if = "Number(itemgoods.returnNumber) > 0"><span class = "fgray"> | </span>退货{{ itemgoods.returnNumber }}件</span>
                </div>
                <div @click = "handleShare(itemgoods)" class = "goodsShare"></div>
              </div>
            </div>
          </div>
          <div @click = "handleAllGoods(item)" class = "moreGoods">
            <span class = "moreGoodsTips">查看全部活动商品 <span class = "moreDot"></span></span>
          </div>
        </div>
      </div>
      <div v-if = "datalist[listNav.idx].length == 0" class = "noList">暂无活动哦～</div>
    </div>

  </div>
</template>

<script>
  import counter from "./counter.vue";
  import ua from 'dvd-base-js-ua';
  import native from 'dvd-service-js-native';

  export default  {
    data() {
      return {
        currentIdx: 0,
        isApps: false,
        targetTop: 0,
        isFixed: false,
        isUp: true,
      }
    },
    components:{
      counter: counter,
    },
    props: ["response","datalist","itemlist","status","shareinfo"],
    mounted() {
      let that  = this;
      that.isApp();
      window.onscroll = () => {
        that.targetTop = document.querySelector(".listCont").offsetTop;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        if (scrollTop >= that.targetTop) {
          that.isFixed = true;
        } else {
          that.isFixed = false;
        }
      }
    },
    methods: {
      handleTab(item,index) {
        // this.status = index;
        this.$emit("tabnav",item);
      },
      isApp() {
        if (ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.2.0') < 0) {
          this.isApps = true;
        }
      },
      handleJump(url) {
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url
          });
        } else if (ua.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
      handleShare(item) {
        if (ua.isDvdApp()) {
          native.custom.share({
            title: item.shareGoodsName,
            desc: item.shareRecommend,
            link: `${location.origin}/${item.goodsId}.html`,
            imgUrl: item.shareImg,
          })
        } else {
          let url = `${location.origin}/${item.goodsId}.html`;
          this.handleJump(url);
        }
      },
      // 展开收起
      handleUp(item) {
        this.$emit("upevent",item);
      },
      handleAllGoods(item) {
        let url = `/sale_award_detail.html?actId=${item.actId}&list=list`;
        if (this.shareinfo.param.get("detail")) {
          url = `/sale_award_detail.html?actId=${item.actId}&list=list&second=second`
        }
        if (this.shareinfo.param.get('second')) {
          location.replace(url);
        } else {
          this.handleJump(url);
        }
      },
      handleGoodList(e, item) {
        let url = `${location.origin}/${item.goodsId}.html?detail=detail`;
        if (this.shareinfo.param.get("goodsDetail")) {
          url = `${location.origin}/${item.goodsId}.html?detail=detail&second=second`;
        }

        if (ua.isDvdApp() && e.target.className == "goodsShare") {
            return;
        }

        if (this.shareinfo.param.get("second")) {
          location.replace(url);
        } else {
          this.handleJump(url);
        }
      }
    }
  }
</script>

