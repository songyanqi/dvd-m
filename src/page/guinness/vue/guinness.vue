<template>
  <div>
    <div class="banner">
      <img class="all_background" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/27/%E6%8C%91%E6%88%98%E5%90%89%E5%B0%BC%E6%96%AF-%E8%83%8C%E6%99%AF1%203.jpg" alt="">
      <com1 @close="closeAlert" :address="btnFlag" :img="alertImgUrl" v-if="alertFlag && imgsCompleted" :count="signNum"></com1>
      <share-alert :img="shareImgUrl" @close="closeShareAlert" v-if="shareAlertFlag"></share-alert>
      <!--<div class="title">最大线上的书籍照片集</div>-->
      <!--<div class="sec_title">吉尼斯世界纪录™ 荣誉</div>-->
      <!--<div class="thr_title">-->
        <!--<div class="time">时间:2018年4月22日   </div>-->
        <!--<div class="place" style="margin-left: 0.1rem;"> 地点:中国北京</div>-->
      <!--</div>-->
      <div class="swiperBanner" v-if="typeof bossImgList[0] != 'undefined'">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in bossImgList"><img :src="item" alt=""></div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="count">{{userNum}}人已挑战</div>

      <div class="all">
        <img class="backIMg" :style="{'animationName': imgsCompleted ? 'photowall' : 'null' }" :src="bgImg" alt="">
        <img class="backIMg2" :style="{'animationName': imgsCompleted ? 'photowall' : 'null' }" v-if="myownImgUrl != ''" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/27/123123.png" alt="">
        <div class="myownBack" :style="{'animationName': imgsCompleted ? 'photowall' : 'null' }" v-if="myownImgUrl != ''" ></div>
        <img class="myown" :style="{'animationName': imgsCompleted ? 'photowall' : 'null' }" v-if="myownImgUrl != ''" :src="myownImgUrl" alt="">
        <div v-for="(item,index) in leftImagesList" class="left" :style="{'animationName': imgsCompleted ? 'myfirst' : 'null' , 'top': imgsLeftTopArr[index], 'animationDelay' : imgsLeftAnimteTimeArr[index] }"><img :src="item" alt=""></div>
        <div v-for="(item,index) in rightImagesList" class="right" :style="{'animationName': imgsCompleted ? 'myfirst2' : 'null' , 'top': imgsRightTopArr[index], 'animationDelay' : imgsRightAnimteTimeArr[index] }"><img :src="item" alt=""></div>
      </div>

      <div class="upload" @click="go_upload" v-if="status == 2 && signNum == 0">参与挑战</div>
      <div class="upload" @click="go_upload" v-if="status == 2 && signNum >= 1">参与第{{parseInt(signNum)+1}}天挑战</div>

      <template v-if="status == 1">
        <div class="share" @click="showImg">生成海报炫耀一下</div>
      </template>

    </div>
    <!--<div class="content_btn" @click="content_btn">添加收货地址</div>-->
    <!--<div class="content_btn" @click="content_btn">添加收货地址</div>-->
    <!--<div class="content_btn" @click="content_btn">添加收货地址</div>-->

    <div class="add_content" v-if="signNum >= 21">
      <div class="content"></div>
      <template v-if="btnFlag">
        <div class="content_btn" @click="content_btn">添加收货地址</div>
        <div class="content_text">填写地址，图书相册挑战吉尼斯成功后，我们将在15个工作日内勋章快递给您。</div>
      </template>
      <template v-else>
        <div class="content_text2">
          <div class="user">
            <div style="margin-right: 0.4rem;">{{userAddress.consignee}}</div>
            <div>{{userAddress.mobile}}</div>
          </div>
          <div class="address">{{userAddress.province}} {{userAddress.city}} {{userAddress.district}} {{userAddress.address}}</div>
          <div class="line"></div>
          <div class="idea">地址已添加，我们将在4月22日挑战吉尼斯结束后的15个工作日内发货，如需修改地址可以联系客服。</div>
        </div>
      </template>
    </div>
    <div class="back2">
      <img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/back2.png" alt="">
      <div class="back2_rule" @click="go_rule">活动规则 ></div>
      <div class="back2_title">坚持21天，赢吉尼斯实体纪念勋章！</div>
      <div class="sign_list">
        <div style="left: 0.25rem;" v-if="selectArr[0] == 0"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A01.png" alt=""></div>
        <div style="left: 0.25rem;" v-if="selectArr[0] == 1"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A01%E9%80%89%E4%B8%AD.png" alt=""></div>

        <div class="rightArrow" style="left: 0.86rem;"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/disclosureIndicator.png" alt=""></div>


        <div style="left: 1.13rem;" v-if="selectArr[1] == 0"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A02.png" alt=""></div>
        <div style="left: 1.13rem;" v-if="selectArr[1] == 1"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A02%E9%80%89%E4%B8%AD.png" alt=""></div>

        <div class="rightArrow" style="left: 1.75rem;"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/disclosureIndicator.png" alt=""></div>


        <div style="left: 2.01rem;" v-if="selectArr[2] == 0"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A03.png" alt=""></div>
        <div style="left: 2.01rem;" v-if="selectArr[2] == 1"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A03%E9%80%89%E4%B8%AD.png" alt=""></div>

        <div class="rightArrow" style="right: 0.99rem;"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/disclosureIndicator.png" alt=""></div>

        <div class="last" style="right: 0.25rem;" v-if="selectArr[3] == 0"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A04.png" alt=""></div>
        <div class="last" style="right: 0.25rem;" v-if="selectArr[3] == 1"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/16/%E8%99%9A%E6%8B%9F%E5%BE%BD%E7%AB%A04%E9%80%89%E4%B8%AD.png" alt=""></div>

        <div class="arrow_text">
          <div style="left: 0.25rem;">第1天</div>
          <div style="left: 1.13rem;">第3天</div>
          <div style="left: 2.01rem;">第10天</div>
          <div style="right: 0.2rem;width: 0.6rem;">第21天</div>
        </div>
      </div>
      <div class="logo">
        <img src="http://9i.dvmama.com/free/2018/04/04/1231231999.png" alt="">
      </div>
    </div>
    <template v-if="!imgsCompleted">
      <div class="mask"></div>
      <div class="mask_text">挑战吉尼斯世界纪录™ 荣誉</div>
      <div class="mask_text2">数据加载中...</div>
    </template>


  </div>
</template>
<script>
  import com1 from "./alert.vue";
  import api from "../../../common/js/api.es6"
  import popup from "dvd-service-js-popup"
  import login from 'dvd-service-js-login';
  import native from "dvd-service-js-native"
  import share from "dvd-service-js-share"
  import shareAlert from "./share.vue";
  import ajaxFileUpload from 'dvd-service-js-ajax-file-upload';
  import Swiper from "swiper";
  import util from "../../../common/js/utils.es6"
  import $ from 'jquery';

  export default {
      mounted(){
        var _this=this;
        if(localStorage.getItem("fromGuinness")){
          localStorage.removeItem("fromGuinness");
        }
        this.theFirst();
        this.getAddressId();
        this.getShareInfo();
        share.setShareInfo({
          title: "一起挑战吉尼斯世界纪录™称号！",
          desc: "加入大V店21天阅读打卡，和宝宝一起挑战吉尼斯世界纪录™称号，从此爱上阅读！",
          link: window.location.href,
          imgUrl: "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/04/18/%E5%90%89%E5%B0%BC%E6%96%AF%E5%88%86%E4%BA%AB%E5%9B%BE.jpg"
        })
      },
      components:{
        com1:com1,
        shareAlert:shareAlert
      },
      data(){
        return {
          userNum:0,
          status:2,
          signNum:0,
          imgList:[],
          confImgList:[],
          bgImg:'',

          alertFlag:false,
          alertImgUrl:'',

          imgsCompleted:false,
          selectArr:[0,0,0,0],

          btnFlag:true,

          initImagesList:['http://9i.dvmama.com/activity/2018/03/17/400_400_32f8eb8e0f1907eb2eec03b612e077cc.png','http://9i.dvmama.com/activity/2018/03/17/400_400_93d05da8acbe51657edde7e432ea6d81.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_9c4e8f59c12ef62f0468d24f9c3deb45.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_a6e1c635136161325f021cd8436dd070.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_ed111ff013fed2980f58916843f936f0.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_0e876c4be144de495bb0d41a24572c9a.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_778898241ef06c14b64f8a653eb6a871.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_51eea94a0a71b145042c1b46b426c8d4.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_082c35c968aeb6112f493d828790472e.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_dd8725912838381015c30b255ee6fcf3.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_4f179dfa7b70ba151d20593fc99779f0.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_c2e32416e7c6883c7b130c4665d503ca.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_7e6d47b4015311374c1f897215f73030.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_34c5357b23739ee14f445817e21ec0f6.png'],
          imagesList:[],
          leftImagesList:[],
          rightImagesList:[],

          imgsLeftTopArr:[],
          imgsLeftAnimteTimeArr:[],

          imgsRightTopArr:[],
          imgsRightAnimteTimeArr:[],

          myownImgUrl:'',


          shareInfoHeadImg:'',
          shareInfoImg:'',
          shareInfoRanking:'',
          shareInfoName:'',
          shareInfoWxFlag:false,
          shareInfoCount:0,

          shareImgUrl:'',
          shareAlertFlag:false,


          shareImgRotateValue:-1,
          bossImgList:[],

          userAddress:{}
        }
      },
      watch:{
        imgsCompleted(value,value2){

        },
        shareImgUrl(value,value2){
          console.log("value:"+value+",,,,value2"+value2);
        }
      },
      methods:{
        DataFormat(timeStamp){
          var data=new Date(timeStamp*1000);
          var year=data.getFullYear();
          var month=(data.getMonth()+1) < 10 ? "0"+(data.getMonth()+1) : (data.getMonth()+1);
          var day=data.getDate() < 10 ? "0"+data.getDate() : data.getDate();
          return year+"-"+ month +"-"+ day;
        },
        renderSwiper(){
          this.$nextTick(function () {
            var mySwiper = new Swiper ('.swiper-container', {
              direction: 'horizontal',
              loop: true,
              autoplay : 2500,
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              pagination: '.swiper-pagination',
              paginationClickable :true
            })
          })
        },
        go_rule(){
            window.location.href="https://bravetime.davdian.com/t-19165.html";
        },
        closeShareAlert(value){
          this.shareAlertFlag=value;
        },
        renderImg(){
          var _this=this;
          this.shareImgUrl=this.poster(this.shareInfoHeadImg,this.shareInfoImg,this.shareInfoName,this.shareInfoRanking);
          console.log(this.shareImgUrl);

          $.ajax({
            url:"https://e.davdian.com/shorturl",
            type:"POST",
            dataType:"JSON",
            data:{
              longurl:_this.shareImgUrl
            },
            success:function(res){
              _this.shareImgUrl="https://e.davdian.com/"+res.shorturl.split("/")[1];
            },error:function(err){
              console.log("err",err);
            }
          });
          _this.shareAlertFlag=true;
        },
        getShareImgRotateValue(p_ossUploadImg){
          var _this=this;
          if(p_ossUploadImg.indexOf("?x-oss-process=image/format,webp") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("?x-oss-process=image/format,webp","");
          }
          if(p_ossUploadImg.indexOf("?x-oss-process=image/quality,Q_90") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("?x-oss-process=image/quality,Q_90","");
          }
          var url=p_ossUploadImg + "@infoexif";

          $.ajax({
            url: url,
            success: function (result) {
              if(result && result.Orientation && result.Orientation.value){
                _this.shareImgRotateValue=result.Orientation.value;
              }
            },
            error: function () {

            }
          });
        },
        getShareInfo(){
          var _this=this;
          api("/api/mg/content/guinness/shareInfo").then( res => {
              if(res && res.data && res.data.headImg){
                this.shareInfoHeadImg=res.data.headImg;
              }
              if(res && res.data && res.data.img){
                this.shareInfoImg=res.data.img;
              }
              this.getShareImgRotateValue(this.shareInfoImg);
              if(res && res.data && res.data.ranking){
                this.shareInfoRanking=res.data.ranking;
              }
              if(res && res.data && res.data.nickName){
                this.shareInfoName=res.data.nickName;
              }
              if(res.data.headImg&&res.data.headImg.indexOf("http://9i.dvmama.com") == -1){
                ajaxFileUpload.uploadImgFile({
                  dir: 'test',
                  imgs: [
                    _this.shareInfoHeadImg
                  ],
                  loading: 1,
                  maxSize: 1,
                }).then((data) => {
                  var obj={
                      "headImg":data[0],
                      "nickName":_this.shareInfoName,
                      "version":res.data.version
                  }
                  api("/api/mg/content/guinness/wxInfoCommit",obj).then( res => {
                    if(!res.code){
                      if(res.data && res.data.msg){
                        console.log(res.data.msg);
                      }
                    }else{
                      console.log("res.code",res.code);
                    }
                  });
                }, (err) => {
                  console.error(err);
                });
              }
              if(res && res.data && res.data.userNum){
                this.shareInfoCount=res.data.userNum;
              }
          })
        },
        safeB64(t){
          return Base64.encode(t)
            .replace(/\+/g, '-') // Convert '+' to '-'
            .replace(/\//g, '_') // Convert '/' to '_'
            .replace(/=+$/, ''); // Remove ending '='
        },
        poster(p_ossUserImg,p_ossUploadImg,realNickName,p_ranking){
          var _this=this;
//          var bg = "https://9i.dvmama.com/free/c5.jpg"; // 背景图
//          var bg = "http://9i.dvmama.com/free/2018/03/27/%E6%8C%91%E6%88%98%E5%90%89%E5%B0%BC%E6%96%AF%20-%E7%94%9F%E6%88%90%E6%B5%B7%E6%8A%A5%20copy6.jpg"; // 背景图
          if(_this.signNum < 10){
            var bg = "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/04/08/1111.jpg"; // 背景图
          }else if(_this.signNum >= 10){
            var bg = "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/04/08/2222.jpg"; // 背景图
          }
//          var bg = "http://9i.dvmama.com/free/2018/04/04/%E7%94%9F%E6%88%90%E6%B5%B7%E6%8A%A5-%E5%A4%A9%E5%8D%95%E6%95%B0copy3x.jpg"; // 背景图

          var ossUserImg='';
          if(p_ossUserImg.indexOf("http://9i.dvmama.com/") != -1 ){
            p_ossUserImg=p_ossUserImg.replace("http://9i.dvmama.com/","");
          }else if(p_ossUserImg.indexOf("https://9i.dvmama.com/") != -1 ) {
            p_ossUserImg = p_ossUserImg.replace("https://9i.dvmama.com/", "");
          }
          ossUserImg=p_ossUserImg;
//          var ossUploadImg = "free/112.jpg";
          var ossUploadImg='';
          if(p_ossUploadImg.indexOf("?x-oss-process=image/format,webp") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("?x-oss-process=image/format,webp","");
          }
          if(p_ossUploadImg.indexOf("?x-oss-process=image/quality,Q_90") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("?x-oss-process=image/quality,Q_90","");
          }

          if(this.shareImgRotateValue == "6"){
            p_ossUploadImg = p_ossUploadImg+"?x-oss-process=image/resize,w_356,limit_0,h_366,m_fill/rounded-corners,r_15/rotate,90"
          }else if(this.shareImgRotateValue == "3"){
            p_ossUploadImg = p_ossUploadImg+"?x-oss-process=image/resize,w_356,limit_0,h_366,m_fill/rounded-corners,r_15/rotate,180"
          }else if(this.shareImgRotateValue == "8"){
            p_ossUploadImg = p_ossUploadImg+"?x-oss-process=image/resize,w_356,limit_0,h_366,m_fill/rounded-corners,r_15/rotate,270"
          }else{
//            p_ossUploadImg = p_ossUploadImg+"?x-oss-process=image/resize,w_296,limit_0,h_296,m_fill/rounded-corners,r_15"
            p_ossUploadImg = p_ossUploadImg+"?x-oss-process=image/resize,w_356,limit_0,h_356,m_fill/rounded-corners,r_15"

          }

          if(p_ossUploadImg.indexOf("http://9i.dvmama.com/") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("http://9i.dvmama.com/","");
          }
          if(p_ossUploadImg.indexOf("https://9i.dvmama.com/") != -1 ){
            p_ossUploadImg=p_ossUploadImg.replace("https://9i.dvmama.com/","");
          }
          ossUploadImg=p_ossUploadImg;

          var textArr=['让阅读成为每天生活的一部分，就算每天只有几分钟','试试让宝宝来翻页吧!','给绘本中的角色都配上独有的声音吧，会有意想不到的效果哦~','配合绘本情节，创造独特的阅读环境吧！','也许你不相信，但是没有字的绘本反而更能激发孩子的创造力！孩子还会比你讲的更好!','教会孩子认识一个简单的字吧，比如"我"','然后让他们去书里找找看！找对了记得奖励一个小红花哦。','试试创建一个固定的家庭传统吧，比如每周日晚上全家人都和宝宝一起读一本书。','当绘本里出现了好吃的小零食的时候，不妨试试也给宝宝做一次吧~','阅读与完美无关。','让绘本角色活起来！例如当小朋友碰到困难的时候，请TA想想看，小猪佩奇会怎么办呢？','家有二宝的爸爸妈妈们，不妨试试让哥哥姐姐给弟弟妹妹读读看绘本~','不管去哪里，都带上一本书吧，随时随地，都是读书的好机会','和孩子一起做一个阅读存折，把读过的书都存起来。','永远相信阅读的力量，阅读能力是形成学习能力的基础。','试试看用一个玩偶给孩子讲故事吧。','尊重孩子的选择，允许他拒绝读不喜欢的绘本。','好的阅读就是悦读，不要让孩子的阅读带有功利性。读书本是一件快乐的事。', '让孩子感受收到书的惊喜，请和孩子一起打开绘本的快递箱吧。','养成睡前阅读的习惯，买一盏床头灯，一起度过睡前美妙的亲子时光吧。','定期和好朋友进行旧书交换的活动吧，节约成本还能增进友谊哦。','让环境带动和影响孩子，多去绘本馆，书店和读书会吧。','坚持！从今天起，每天坚持30分钟，数十年后便能跟孩子读上好几千册书了！','慢慢来。如果孩子一天两天没有改变，别着急，请坚持鼓励他。','设定不插电的阅读时间，把手机、ipad、电视都关掉，静静享受阅读的乐趣。',' 去旅行前，不妨看看有没有相关的绘本哦。','读书给TA听，坚持读书给TA听，不断读书给TA听，每天读书给TA听。','建立属于孩子的家庭阅读区，让孩子轻松愉快选到自己想读的书，并且随手都能拿到书。','给孩子创造阅读惊喜，做有趣的摘抄，给有趣的阅读建议。','准备便签本，让孩子随时随地观察记录，写下想写的东西。','带孩子经常去图书馆，让孩子去图书馆借书、买书、和朋友们一起看书。','给孩子买任何他们感兴趣的书，这是最便宜的投资。','父母自己也要看书，因为父母的行为会潜移默化影响孩子。','把阅读和有趣的户外活动联系起来，一切能给孩子新鲜有趣体验的阅读活动都能帮助Ta爱上阅读。','把图书作为生日礼物，潜移默化让他们认识到阅读重要性。','不只有图书才能阅读，报纸、杂志、各种广告等印刷品都可以作为阅读素材'];
          var silkText = textArr[parseInt(Math.random()*33)];
//          var nickName = "我是Nemo我爱笑"

          var nickName='';
          if(realNickName == ""){
            nickName = "大v店";
          }else{
            nickName = realNickName;
          }

//          var num = 10023;
          var num = p_ranking;

          var baseY = 900;
          var silkArr = silkText.split("，");
          var src = "";
          src += bg+"?x-oss-process=image/resize,w_1125,h_3038";

          // 图片添加用户上传图片
//          src += "/watermark,image_"+this.safeB64(ossUploadImg)+",g_nw,x_413,y_965";

          src += "/watermark,image_"+this.safeB64(ossUploadImg)+",g_nw,x_385,y_950";

          // 图片添加头像
          src += "/watermark,image_"+this.safeB64(ossUserImg+"?x-oss-process=image/resize,w_150,limit_0/rounded-corners,r_75/format,png")+",g_nw,x_85,y_"+(baseY+1115);
          // 图片添加锦囊
          for(var i=0;i<silkArr.length;i++){
            src += "/watermark,size_36,color_ffffff,g_nw,x_90,y_"+(baseY+1390+i*52)+",text_"+this.safeB64(silkArr[i]+(i!==silkArr.length-1?"，":""));
          }
          // 图片添加昵称
          src += "/watermark,size_48,color_ffffff,g_nw,x_260,y_"+(baseY+1140)+",text_"+this.safeB64(nickName);
          //打卡天数
          if(_this.signNum < 10){
            src += "/watermark,size_41,color_3648A2,g_nw,x_886,y_"+(baseY+1178)+",text_"+this.safeB64(_this.signNum);
          }else if(_this.signNum >= 10){
            src += "/watermark,size_40,color_3648A2,g_nw,x_878,y_"+(baseY+1178)+",text_"+this.safeB64(_this.signNum);
          }
//          src += "/watermark,size_40,color_3648A2,g_nw,x_870,y_"+(baseY+1180)+",text_"+this.safeB64(_this.signNum);

          // 图片添加跳转次序
          src += "/watermark,size_36,color_ffffff,g_nw,x_260,y_"+(baseY+1215)+",text_"+this.safeB64('成为第'+num+'位挑战者');
          // 图片加章
          if(this.signNum == 1){
            src += "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
          }else if(this.signNum == 3){
            src += "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
          }else if(this.signNum == 10){
            src += "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
          }else if(this.signNum == 21){
            src += "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
          }
//          console.log("src",src);
          return src;
        },
        getInitImages(){
          var _this=this;
          var length = this.imagesList.length;
          var leftCount=Math.floor(length/2);
          var rightCount=length-leftCount;
          var leftImgs=[];
          var rightImgs=[];
          this.imagesList.map( (item,index) => {
            if(index >= 0 && index <= leftCount-1){
              leftImgs.push(item);
            }else if(index >= leftCount && index <= length-1){
              rightImgs.push(item)
            }
          });
          this.leftImagesList=leftImgs;
          this.rightImagesList=rightImgs;
          this.leftImagesList.map( (item,index) => {
            this.$set(this.imgsLeftTopArr,index,parseInt(Math.random()*10)-2 + "rem");
            this.$set(this.imgsLeftAnimteTimeArr,index,(Math.random()*4).toString().substr(0,3) + "s");
          });
          this.rightImagesList.map( (item,index) => {
            this.$set(this.imgsRightTopArr,index,parseInt(Math.random()*10)-2 + "rem");
            this.$set(this.imgsRightAnimteTimeArr,index,(Math.random()*4).toString().substr(0,3) + "s");
          });
//          console.log("length",length);
//          console.log("leftCount",leftCount);
//          console.log("rightCount",rightCount);
//          console.log("leftImgs",leftImgs);
//          console.log("rightImgs",rightImgs);


          _this.imgsLoaded();
        },
        getData(){
          var _this=this;
          api("/api/mg/content/guinness/index").then( res => {
            if(!res.code){
              if(res.sys_time && res.sys_time > 1524384000){
                  window.location.href="/act/guinness_result.html";
                  return;
              }

              if(res.data && (res.data.userNum || res.data.userNum == 0)){
                this.userNum=res.data.userNum;
              }
              if(res.data && (res.data.status)){
                if(res.data.status == 1 || res.data.status == 2){
                  this.status=res.data.status;
                }
              }
              if(res.data && (res.data.signNum || res.data.signNum == 0)){
                this.signNum=res.data.signNum;
                this.getContent();
              }

              if(res.data && res.data.issetAddress){
                if(res.data.issetAddress > 0){
                  this.btnFlag=false;
                }else if(res.data.issetAddress == 0){
                  this.btnFlag=true;
                }
              }

              if(res.data && res.data.bgImg){
                    this.bgImg=res.data.bgImg;
              }

              if(res.data && res.data.bossImgList){
                this.bossImgList=res.data.bossImgList;
                if(this.bossImgList.length > 8){
                  this.bossImgList=this.bossImgList.slice(0,8);
                }
              }
//              this.bossImgList=['http://9i.dvmama.com/activity/2018/03/17/400_400_32f8eb8e0f1907eb2eec03b612e077cc.png','http://9i.dvmama.com/activity/2018/03/17/400_400_93d05da8acbe51657edde7e432ea6d81.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_9c4e8f59c12ef62f0468d24f9c3deb45.png','http://9i.dvmama.com/activity/2018/03/17/400_400_32f8eb8e0f1907eb2eec03b612e077cc.png','http://9i.dvmama.com/activity/2018/03/17/400_400_93d05da8acbe51657edde7e432ea6d81.png', 'http://9i.dvmama.com/activity/2018/03/17/400_400_9c4e8f59c12ef62f0468d24f9c3deb45.png'];
              this.renderSwiper();


              if(res.data && res.data.imgList){
                this.imagesList=this.imagesList.concat(res.data.imgList);

                if(res.data.imgList.length != 0){
                  if(res.data.imgList[res.data.imgList.length-1].indexOf("?x-oss-process") != -1){
                    if(this.signNum == 1){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 3){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 10){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 21){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else{
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1];
                    }
                  }else{
                    if(this.signNum == 1){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 3){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 10){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else if(this.signNum == 21){
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1] + "?x-oss-process=image/watermark,image_ZnJlZS8yMDE4LzAzLzE2L2ltZzQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA=,g_se,x_10,y_10"
                    }else{
                      this.myownImgUrl=res.data.imgList[res.data.imgList.length-1]
                    }
                  }
                }

              }
              if(res.data && res.data.confImgList){
                this.imagesList=this.imagesList.concat(res.data.confImgList);
              }

              if(res.data && res.data.userAddress){
                this.userAddress=res.data.userAddress;
              }

//
//              if(util.utils.isApp()){
//                this.initImagesList.map( (item,index) => {
//                  _this.initImagesList[index]=item+ "?x-oss-process=image/quality,Q_90";
//                })
//              }else{
//                this.initImagesList.map( (item,index) => {
//                  _this.initImagesList[index]=item+ "?x-oss-process=image/format,webp";
//                })
//              }
//              console.log("this.initImagesList",this.initImagesList);
              this.imagesList=this.imagesList.concat(this.initImagesList);

              this.getInitImages();
            }else{
              console.log(res.code);
            }
          }).catch( error => {
            console.log(error);
          } )
        },
        getAddressId(){
          var _this=this;
          if(localStorage.getItem('address_id')){
            var address_id=localStorage.getItem('address_id');
            localStorage.removeItem('address_id');
            var obj = {
              "addressId": address_id
            };
            api("/api/mg/content/guinness/addressCommit",obj).then( res => {
                if(!res.code){
                  console.log(res.code);
                  this.btnFlag=false;
                  _this.getData();
                }else{
                  console.log(res.code);
                  _this.getData();
                  this.btnFlag=false;
                }
            } )
          }else{
            _this.getData();
          }
        },
        content_btn(){
          if(localStorage.getItem("fromGuinness")){
            localStorage.removeItem("fromGuinness");
          }
          localStorage.setItem("fromGuinness","123123123");
          window.location.href="/user_address.html";
        },
        showImg(){
          this.renderImg();
        },
        getContent(){
          if(this.signNum >= 1 && this.signNum < 3){
            this.$set(this.selectArr,0,1);
          }else if(this.signNum >= 3 && this.signNum < 10){
            this.$set(this.selectArr,0,1);
            this.$set(this.selectArr,1,1);
          }else if(this.signNum >= 10 && this.signNum < 21){
            this.$set(this.selectArr,0,1);
            this.$set(this.selectArr,1,1);
            this.$set(this.selectArr,2,1);
          }else if(this.signNum >= 21){
            this.$set(this.selectArr,0,1);
            this.$set(this.selectArr,1,1);
            this.$set(this.selectArr,2,1);
            this.$set(this.selectArr,3,1);
          }
        },
        theFirst(){
          if(localStorage.getItem('imgUrl')){
            this.alertImgUrl=localStorage.getItem('imgUrl').toString();
            console.log("alertImgUrl",this.alertImgUrl);
            localStorage.removeItem('imgUrl');
            this.alertFlag=true;
          }
        },
        closeAlert(value){
          this.alertFlag=value;
        },
        go_upload(){
//          if (!login.isLogined()) {
//            location.href = '/login.html?referer=' + encodeURIComponent('/guinnessUpload.html');
//          }else{
//            window.location.href="/guinnessUpload.html";
//          }
          login.login({
            failUrl: '/guinness.html',
            url:'/guinnessUpload.html'
          });
        },
        imgsLoaded(){
          var _this=this;
          this.$nextTick(function () {
            var imgs=$('body img');
            var imgIndex=0;
            for(var i=0;i<imgs.length;i++){
//              console.log(imgs[i]);
//              console.log("complete",imgs[i].complete);
              if(imgs[i].complete){
                imgIndex++;
                if(imgIndex==$('body img').length){
                  console.log("加载完毕");
                  _this.imgsCompleted=true;
                }
              }else{
                imgs[i].onload = function () {
                  imgIndex++;
                  console.log(imgIndex);
                  console.log($('body img').length);
                  console.log(imgIndex==$('body img').length);
                  if(imgIndex==$('body img').length){
                    console.log("加载完毕");
                    _this.imgsCompleted=true;
                  }
                };
                imgs[i].onerror = function () {
                  imgIndex++;
//                  console.log(imgIndex);
//                  console.log("-----error------");
//                  console.log($('body img').length);
//                  console.log(imgIndex==$('body img').length);
                  if(imgIndex==$('body img').length){
                    console.log("加载完毕");
                    _this.imgsCompleted=true;
                  }
                };
              }
            }
          });
        }
      }
  }
</script>
<style scoped lang="sass" lang="scss">
  @import "../css/swiper-4.2.0.min.css";
  @keyframes myfirst
  {
    /*from {left: -300px;}*/
    to {
      left: 0.82rem;
      top: 0.73rem;
      transform: scale(0);
    }
  }
  @keyframes myfirst2
  {
    /*from {right: -300px;}*/
    to {
      right: 0.82rem;
      top: 0.73rem;
      transform: scale(0);
    }
  }
  @keyframes photowall
  {
    /*from {right: -300px;}*/
    to {
      transform: scale(1);
    }
  }
  .mask{
    background: linear-gradient(to left, #949EFF, #9EA3FF);
    z-index:2;
    max-width: 640px;
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
  }
  .mask_text{
    position: fixed;
    z-index: 3;
    color: #ffffff;
    font-size: 0.2rem;
    top: 45%;
    width: 100%;
    text-align: center;
    left: 0;
  }
  .mask_text2{
    position: fixed;
    z-index: 3;
    color: #ffffff;
    font-size: 0.2rem;
    top: 55%;
    width: 100%;
    text-align: center;
    left: 0;
  }
  .banner{
    /*background-image: url("http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2018/03/12/%E5%90%89%E5%B0%BC%E6%96%AF%E9%A1%B5%E9%9D%A2%E8%83%8C%E6%99%AF-1125.jpg");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 3.75rem auto;*/

    height: 6.38rem;
    position: relative;
    overflow: hidden;
    .all_background{
      width: 3.75rem;
      height: 6.38rem;
      position: absolute;
    }
    .title{
      font-size:0.2rem;
      text-align: center;
      width:100%;
      top:1.1rem;
      color:#002c4d;
      position: absolute;
    }
    .sec_title{
      font-size:0.22rem;
      font-weight: 900;
      text-align: center;
      width:100%;
      top:1.35rem;
      position: absolute;
      color:#002c4d;
    }
    .thr_title{
      width: 100%;
      top:1.65rem;
      text-align: center;
      position: absolute;
      font-size: 0;
    div{
        display: inline-block;
        vertical-align: middle;
        font-size: 0.14rem;
        font-weight: 700;
        color:#002c4d;
      }
    }
    .count{
      width: 1.16rem;
      text-align: center;
      height: 0.2rem;
      line-height: 0.2rem;
      top: 0.87rem;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      margin-left: -0.58rem;
      font-size: 0.12rem;
      background: #002C50;
      border-radius: 0.1rem;
    }
    .swiperBanner{
      width: 3.36rem;
      height: 1.24rem;
      display: inline-block;
      position: absolute;
      top: 1.25rem;
      z-index:0;
      left: 0.2rem;
      background: #A9A0FF;
      border-radius:4px;
      box-shadow: 2px 3px 3px 0 rgba(120,93,255,0.49);
      /*box-shadow: 3px 3px 4px 1px rgba(99, 31, 81, 0.51)*/
        .swiper-container {
          width: 100%;
          height: 1.24rem;
          border-radius:4px;
          .swiper-wrapper{
            border-radius:4px;
            .swiper-slide{
              width: 100%;
              border-radius:4px;
              height: 1.14rem;
              img{
                width: 100%;
                height: 1.14rem;
                border-radius:4px;
              }
            }
          }
          .swiper-pagination{
            bottom: 0;
            height: 0.12rem;
            line-height: 0.12rem;
            background: #8381F8;
            .swiper-pagination-bullet-active{
              background-color: #ffffff!important;
            }
          }
        }
    }
    .sign {
      color: #ffffff;
      font-size: 0.13rem;
      text-align: center;
      width: 100%;
      top: 2.35rem;
      position: absolute;
    }
    .all{
      position: absolute;
      top: 2.69rem;
      /*background-image: url('');*/
      /*background-repeat: no-repeat;*/
      /*background-size: 3.75rem 3.09rem;*/
      height: 2.83rem;
      box-sizing: border-box;
      width: 100%;
      .backIMg{
        width: 3.75rem;
        height: 2.83rem;
        transform: scale(0);
        position: absolute;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        animation-delay: 6s;
      }
      .backIMg2{
        width: 3.75rem;
        position: absolute;
        height: 2.83rem;
        transform: scale(0);
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        animation-delay: 6s;
      }
      .myown{
        position: absolute;
        top: 0.534rem;
        left: 50%;
        width: 1.12rem;
        height: 1.13rem;
        margin-left: -0.56rem;
        transform: scale(0);
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        animation-delay: 8s;
      }
      .myownBack{
        position: absolute;
        top: 0.5rem;
        left: 50%;
        width: 1.2rem;
        height: 1.2rem;
        margin-left: -0.6rem;
        transform: scale(0);
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        animation-delay: 8s;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 3px 3px 4px 1px rgba(99,31,81,0.51);
      }
      div{
        img{

        }
      }
      .left{
        position: absolute;
        top: 0;
        left: -3rem;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        width: 2.14rem;
        height: 1.62rem;
        img{
          width: 2.14rem;
          height: 1.62rem;
        }
      }
      .right{
        position: absolute;
        top: 0;
        right: -3rem;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-play-state: running;
        animation-fill-mode:forwards;
        width: 2.14rem;
        height: 1.62rem;
        img{
          width: 2.14rem;
          height: 1.62rem;
        }
      }
    }
    .upload{
      width: 1.5rem;
      text-align: center;
      height: 0.3rem;
      line-height: 0.3rem;
      position: absolute;
      left: 50%;
      margin-left: -0.75rem;
      /* border: 1px solid #002c4d; */
      top: 5.6rem;
      color: white;
      font-size: 0.14rem;
      border-radius: 0.15rem;
      background: linear-gradient(to right, #FF5C5C, #FA1862);
    }
    .share{
      width: 1.5rem;
      text-align: center;
      height: 0.3rem;
      line-height: 0.3rem;
      position: absolute;
      left: 50%;
      margin-left: -0.75rem;
      /* border: 1px solid #002c4d; */
      top: 5.6rem;
      color: white;
      font-size: 0.14rem;
      border-radius: 0.15rem;
      background: linear-gradient(to left, #FF7C32, #FFB21B);
    }
  }
  .add_content{
    overflow: hidden;
    height: 1.6rem;
    width: 3.75rem;
    margin-top: -0.01rem;
    background: linear-gradient(to left, #949EFF, #9EA3FF);
    .content{
      width: 3.38rem;
      height: 1.31rem;
      background: #FFFFFF;
      border-radius:5px;
      position: absolute;
      left: 50%;
      margin-left: -1.69rem;
      opacity: 0.2;
      &:after{
         content: '';
         border: 1px solid #FFFFFF;
         position: absolute;
         top: 0;
         border-radius: 5px;
         left: 0;
         bottom: 0;
         transform: scale(0.5);
         right: 0;
         width: 200%;
         height: 200%;
         transform-origin: 0 0;
       }
    }
    .content_btn{
      width: 2.75rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      color: #FF4A7D;
      font-size: 0.14rem;
      position: relative;
      background: #FFFFFF;
      border-radius: 100px;
      margin: 0.2rem  auto;
      box-shadow: 0 4px 4px #9095D8;
    }
    .content_text{
      color:#FFFFFF;
      font-size: 0.12rem;
      width: 3.18rem;
      margin: 0 auto;
      line-height: 0.18rem;
    }
    .content_text2{
      color:#FFFFFF;
      font-size: 0.12rem;
      width: 3.18rem;
      margin: 0 auto;
      height: 1.31rem;
      .user{
        font-size:0.14rem;
        display: block;
        margin-top: 0.15rem;
        div{
          display: inline-block;
        }
      }
      .address{
        font-size:0.14rem;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .line{
        height: 1px;
        width: 200%;
        background: #FFFFFF;
        opacity:0.5;
        transform: scale(0.5);
        transform-origin: 0 0;
      }
      .idea{
        font-size:0.12rem;
        display: block;
        margin-top:0.1rem;
        line-height:0.18rem;
      }
    }
  }
  .back2{
    /*background-image: url("");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 3.75rem 2.79rem;*/
    background: #FFECEA;
    position: relative;
    font-size: 0;
    height: 6.9rem;
    img{
      width: 3.75rem;
      height: 2.79rem;
      position: absolute;
      margin-top: -0.01rem;
    }
    div{
      width: 0.5rem;
      height: 0.66rem;
      display: inline-block;
      vertical-align: middle;
      top: 1.2rem;
      position:absolute;
      img{
        width: 0.5rem;
        height: 0.66rem;
      }
    }
    .last{
      width: 0.5rem;
      height: 0.66rem;
      top: 1.2rem;
      img{
        width: 0.5rem;
        height: 0.66rem;
      }
    }
    .back2_rule{
      font-size: 0.14rem;
      height: 0.3rem;
      line-height: 0.3rem;
      top: -0.1rem;
      text-align: center;
      display: inline-block;
      width: 1rem;
      right: 0;
      color: #012B4F;
    }
    .rightArrow{
      top: 1.4rem;
      width: 0.06rem;
      height: 0.13rem;
      img{
        width: 0.06rem;
        height: 0.13rem;
      }
    }
    .back2_title{
      color:#012B4F;
      font-size:0.18rem;
      position: absolute;
      top: 0.6rem;
      text-align: center;
      font-weight: 600;
      width: 3rem;
      margin-left: 0.375rem;
    }
    .sign_list{
      width: 100%;
      height: 1rem;
      top:1rem;
      div{
        top: 0;
      }
      .rightArrow{
        top: 0.25rem;
      }
      .arrow_text{
        top: 0.7rem;
        height: 0.2rem;
        width: 100%;
        div{
          display: inline-block;
          font-size: 0.12rem;
          color:#012B4F;
          line-height: 0.2rem;
          height: 0.2rem;
          width: 0.5rem;
          top: 0;
          text-align: center;
        }
      }
    }
    .logo{
      position: absolute;
      width: 3.5rem;
      top: 2.1rem;
      height: 4.42rem;
      margin-left: 0.125rem;
      img{
        width: 3.5rem;
        height: 4.42rem;
      }
    }
  }
  .content_btn{
    width: 2.75rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    color: #FF4A7D;
    font-size: 0.14rem;
    position: relative;
    background: #FFFFFF;
    border-radius: 100px;
    margin: 0.2rem  auto;
    box-shadow: 0 4px 4px #9095D8;
  }


</style>
