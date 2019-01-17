<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";
    .fiexAuto {
      position: fixed;
      left:0;
      right:0;
      margin:auto;
      width:100%;
    }
    .goods-material {
      background: #ffffff;
      margin-top: 10px;
      border-radius: 10px 10px 0 0;
    }
    .goods-material-title {
      position:relative;
      height:44px;
      background: linear-gradient(to right, #E3B3FA, #FF6CA4);
      border-radius: 10px 10px 0 0;
      .key-top {
        position:absolute;
        right:16px;
        top:6px;
        bottom:0;
        margin:auto;
        width: 10px;
        height: 10px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        cursor: pointer;
      }
      .key-bottom {
        position:absolute;
        right:16px;
        top:-6px;
        bottom:0;
        margin:auto;
        width: 10px;
        height: 10px;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        cursor: pointer;
      }
      .buy-title {
        text-align: center;
        color:#fff;
        font-size:15px;
        line-height:44px;
      }
    }
    .share-earn {
      position: relative;
      height:47px;
      .share-earn-left {
        position:absolute;
        left:15px;
        top:14px;
        font-size:0;
        height:17px;
        line-height:17px;
        .earn-content {
          display:inline-block;
          width:40px;
          height:17px;
          text-align: center;
          font-size: 11px;
          color: #fff;
          background:linear-gradient(to right, #FF8960, #FF4B98);
          vertical-align: middle;
        }
        .earn-money {
          display:inline-block;
          height:17px;
          text-align: center;
          font-size: 11px;
          padding:0 3px;
          color:#FF4A7D;
          border: 1px solid #FF4B98;
          box-sizing:border-box;
          vertical-align: middle;
        }
       }
      .share-earn-center {
        line-height: 47px;
        text-align: center;
        color: #333333;
        font-size:12px;
        margin:0 auto;
        span {
          color:#FF4a7d;
        }
      }
      .share-earn-right {
        position:absolute;
        right:15px;
        top:13px;
        color: #999999;
        font-size:11px;
      }
      .share-earn-right:after {
        display: inline-block;
        content: "";
        width:8px;
        height:8px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        margin-left: 5px;
        margin-top:-2px;
      }
    }

    .box-container {
      /*padding:20px 0 20px 15px;*/
      padding:20px 0 0 0;
    }
    .swiper-wrapper {
      padding-bottom: 20px;
      padding-left: 15px;
    }
    .sw-list {
      width:r(137);
      height:r(235);
      background:#fff;
      border-radius:4px;
      box-shadow: 0px 4px 8px 5px #F4F4F4;
      margin-right:10px;
      .goods-cavs-pic {
        padding-top:r(20);
      }
      .goods-pic {
        position:relative;
        padding:r(26) 10px 10px;
          .flex-picList {
            font-size: 0;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .picList-box {
            position: relative;
            display: inline-block;
            width:r(55);
            height:r(66);
            box-sizing:border-box;
            img{
              display: inline-block;
              width:100%;
              height:100%;
              max-width: 100%;
              border-radius: 4px;
              object-fit:cover;

            }
          }
          .picList-box:after {
            content:'';
            position:absolute;
            top:0;
            left:0;
            height:200%;
            width:200%;
            border:1px solid #E1E1E1;
            transform-origin:0 0;
            transform:scale(0.5,0.5);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            box-sizing:border-box;
          }
          .picList-box:nth-of-type(2) {
            margin-bottom: r(5);
          }
          .picList-box:nth-of-type(3) {
            margin-bottom: r(5);
          }
          .videoPicBoc,
          .PicBox{
            position: relative;
            width:r(115);
            height:r(136);
            margin:0 auto;
            img {
              display: block;
              width:100%;
              height:100%;
              max-width: 100%;
              border-radius: 4px;
              object-fit:cover;
            }
          }
          .videoPicBoc:after,
          .PicBox:after{
            content:'';
            position:absolute;
            top:0;
            left:0;
            height:200%;
            width:200%;
            border:1px solid #E1E1E1;
            transform-origin:0 0;
            transform:scale(0.5,0.5);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            box-sizing:border-box;
          }
    }
  }
  .vidio-icon {
    position: absolute;
    width:26px;
    height:26px;
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin:auto;
    img{
      display: block;
      width: 100%;
      height:100%;
      max-width: 100%;
      object-fit:cover;
    }
  }
  .sw-list:last-child {
    margin-right: r(20);
  }
  .one-key-share {
    height:40px;
    line-height: 40px;
    text-align:center;
    color:#FF4A7D;
    font-size: 13px;
  }
  .one-key-share:after {
    display: inline-block;
    content: "";
    width:14px;
    height:13px;
    background: url(//pic.davdian.com/free/2018/05/09/share_icon.png) no-repeat center;
    background-size: 14px 13px;
    vertical-align:middle;
    margin-left: 6px;
  }
  .text-box {
    width:100%;
    height:r(53);
    margin-bottom: 8px;
    .text-cont {
      transform-origin:top left;
      transform:scale(0.5);
      font-size: r(18);
      width:200%;
      height:r(106);
      line-height:r(27);
      color:#333;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
  .cancel-select {
    position:absolute;
    right:13px;
    top:4px;
    width:r(50);
    height:r(18);
    line-height: r(18);
    background: url(//pic.davdian.com/free/2018/05/09/select_icon.png) no-repeat right center;
    background-size: r(16.5) r(16.5);
  }
  .confirm-select {
    position:absolute;
    right:13px;
    top:4px;
    width:r(50);
    height:r(18);
    line-height: r(18);
    background: url(//pic.davdian.com/free/2018/05/09/seleced_icon.png) no-repeat right center;
    background-size: r(16.5) r(16.5);
  }
  .cavs-pic {
    width:100%;
    height:auto;
    img {
      display: block;
      width: 100%;
      height:100%;
      max-width: 100%;
    }

  }
  .p-line {
    width: 200%;
    height: 1px;
    background: #E1E1E1;
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
    overflow: hidden
  }


  /*大图预览*/
  .preview-big-picture {
    width: 100%;
    /*height: r(667);*/
    height:100%;
    background: #ffffff;
    opacity: 0.95;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    z-index: 200;
    opacity: 1;
    margin:auto;
    max-width:640px;
    .preview-pic {
      .pic {
        width:345px;
        height:453px;
        line-height:21px;
        margin:r(50) auto 0;
        box-shadow: 0px 4px 8px 5px #F4F4F4;
        img {
          display: block;
          width:100%;
          height:100%;
          max-width: 100%;
          object-fit:cover;
        }
      }
    }
    .preview-video {
      padding: 50px 33px 0;
      .video-content {
        line-height: 23px;
        font-size: 14px;
        color: #333333;
      }
      span {
        display:inline-block;
        line-height: 23px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .video-link {
        padding: 9px 15px 13px;
        line-height: 18px;
        /*height:r(60);*/
        background:#F1F1F1;
        color: #848484;
        font-size: 13px;
        margin:0 auto;
      }
     }
    .preview-more-pic {
      padding:r(50) 0 0;
      p {
        padding:0 r(33);
      }
      .swiper-preview-container {
        padding-left: r(33);
      }
      .pic-content {
        padding:0 33px;
        line-height: 23px;
        font-size: 14px;
        color: #333333;
        margin-bottom: 21px;
      }
      .pre-pic {
        width:100%;
        /*height:301px;*/
        object-fit:cover;
        img {
          display: block;
          max-width: 100%;
          width:100%;
          height:100%;
          max-height: 301px;
          object-fit:cover;
          border-radius: 8px;
          border:1px solid #E1E1E1;
          box-sizing: border-box;
        }
      }

    }
      .text {
        color: #666;
        font-size: 14px;
        margin: 19px 0 11px;
        text-align: center;
      }
      .text-cont {
        font-size: 11px;
        color: #999;
        text-align: center;
      }
  }
  @media screen and (max-width: 360px) {
    .preview-big-picture {
      overflow-y: scroll !important;
    }
    .text-cont {
      margin-bottom: 15px;
    }
  }
  .swiper-slide-pl {
    width:242px !important;
    margin-right: 20px;
  }
  .close-preview {
    position: absolute;
    right:33px;
    top:12px;
    width:20px;
    height:20px;
    background: url(//pic.davdian.com/free/2018/05/09/wx_close_icon.png)no-repeat center;
    background-size:20px;
  }
  .close-preview-first {
    right:20px;
  }

</style>

<template>
  <div class="goods-material" v-if="isSeller">
    <!--标题-->
    <div class="goods-material-title" @click.stop="trunOff">
      <p class="buy-title">爱分享，赚多多</p>
      <span :class="onOffFlag == false ? onOffClassArr[0] : onOffClassArr[1]"></span>
    </div>
    <!--赚钱-->
    <div class="share-earn">
      <div class="share-earn-left">
        <span class="earn-content" :class="{androidEarn : ua.isAndroid()}">分享赚</span>
        <span class="earn-money">{{earningMoney}}元</span>
      </div>
      <!--<p class="share-earn-center">已经有<span>{{sharenum}}人</span>分享了该商品</p>-->
      <span class="share-earn-right" @click.stop="toMaterial">全部素材</span>
    </div>
    <!--底部展示隐藏区域-->
    <div class="sw-box" v-show="onOffFlag == true">
      <div class="p-line"></div>
      <div class="swiper-container box-container">
        <div class="swiper-wrapper">
          <!--第一个swiper 是固定的-->
          <div class="swiper-slide sw-list">
            <div class="goods-cavs-pic">
              <div class="cancel-select" :class="{'confirm-select': selectIndex == 0}" @click.stop="toSelect(0, firstItem)"></div>
              <div class="cavs-pic">
                <img v-lazy="clipedImg" v-if="clipedImg">
              </div>
            </div>
          </div>

          <!--materials如果长度大于2-->
          <!--v-if="materials && materials.length >=2"-->
          <template v-if="materials && materials.length > 0">
            <div class="swiper-slide sw-list" v-for="(item,i) in Math.min(2,materials.length)">
              <div class="goods-pic">
                <div class="cancel-select" :class="{'confirm-select': selectIndex== i+1}" @click.stop="toSelect(i+1, materials[i])"></div>
                <!--判断视频图片的类型-->
                <div class="picList" v-if="materials[i].materialType == 1">
                  <!--文字缩放-->
                  <div class="text-box">
                    <p class="text-cont">{{materials[i].copywriting}}</p>
                  </div>
                  <!--如果长度1时，改变样式-->
                  <div class="PicBox" v-for="(list,index) in materials[i].imageList" v-if="materials[i].imageList.length == 1">
                    <img v-lazy="list.imgOriginal" alt="">
                  </div>
                  <!--如果长度大于等于4时，只展示4张图片-->
                  <div class="flex-picList" v-if="materials[i].imageList.length >= 4">
                    <div class="picList-box" v-for="(list,index) in 4">
                      <img :src="materials[i].imageList[index].imgOriginal" alt="">
                    </div>
                  </div>
                  <!--如果小于4时-->
                  <div class="flex-picList" v-if="materials[i].imageList.length < 4 && materials[i].imageList.length > 1">
                    <div class="picList-box" v-for="(list,index) in materials[i].imageList">
                      <img :src="list.imgOriginal" alt="">
                    </div>
                  </div>
                </div>

                <div class="picList" v-if="materials[i].materialType==2">
                  <div class="text-box">
                    <p class="text-cont">{{materials[i].copywriting}}</p>
                  </div>
                  <div class="videoPicBoc">
                    <i class="vidio-icon"><img src="//pic.davdian.com/free/goodsDetail/record_icon.png" alt=""></i>
                    <img :src="materials[i].videoImg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </template>

        </div>
        <div class="p-line"></div>
      </div>
      <div class="one-key-share" @click="oneKeyShare()">一键分享</div>
    </div>

    <!--微信分享实现大图预览-->
    <div class="preview-big-picture" v-if="openDef == true">
      <!--合成图片预览-->
      <div class="preview-pic">
        <div class="close-preview close-preview-first" @click="closeCanvas"></div>
        <div class="pic">
          <img v-lazy="clipedImg" v-if="clipedImg">
        </div>
        <p class="text">（长按图片保存）</p>
        <p class="text-cont">体验更便捷的分享，可登录app进行操作</p>
      </div>
    </div>
    <template v-if="selectItem.materialType == 2">
      <div class="preview-big-picture" v-if="opePereviewVideo">
        <div class="close-preview" @click="closePreviewVideo"></div>
        <!--视频链接-->
        <div class="preview-video">
          <div class="video-content">{{selectItem.copywriting}}</div>
          <span>视频链接：</span>
          <div class="video-link">{{selectItem.videoUrl}}</div>
          <p class="text">（长按复制文字和视频链接）</p>
          <p class="text-cont">体验更便捷的分享，可登录app进行操作</p>
        </div>
      </div>
    </template >
    <template v-if="selectItem.materialType == 1">
      <div class="preview-big-picture" v-if="opePereviewPic">
        <div class="close-preview" @click="closePereviewPic"></div>
        <!--多图-->
        <div class="preview-more-pic">
          <div class="pic-content">{{selectItem.copywriting}}</div>

          <!--组件-->
          <com-swiper v-if="selectItem.imageList" :image-list="selectItem.imageList"></com-swiper>
          <!--组件-->
          <p class="text">（长按图片保存）</p>
          <p class="text-cont">体验更便捷的分享，可登录app进行操作</p>
        </div>
      </div>
    </template>


  </div>
</template>
<script>

 import goods_material from "./goods_material.es6";
  export default goods_material;

</script>

