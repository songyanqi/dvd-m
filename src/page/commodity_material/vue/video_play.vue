<template>
  <div class="video-player">
    <div class="video_wrapper" @click="handleVideo">
      <video
        :style="{'background-image': poster ? `url(${poster})` : none,'background-color':'#000'}"
        width="100%"
        height="100%"
        ref="video"
        preload="none"
        poster="http://9i.dvmama.com/5/61/transparent.png"
        @timeupdate = "ontimeUpdate($event)"
        @waiting = "handleWait"
        @ended = "handleEnded"
        @playing = "handlePlaying"
        webkit-playsinline
        playsinline>
        <source :src="videoUrl" type='video/mp4'/>
      </video>
      <loading v-if="isLoad"></loading>
      <div v-if="isShowRecord">
        <div class="record" v-if="!isPlay"></div>
      </div>
      <div class="control-bar" :class="{ controlUp: isShowControl }">
        <a href="javascript:void(0);"
           @click="handlePlay"
           :class="{ playIcon: isPlay, pauseIcon: !isPlay }"></a>
        <div class="total">{{ currTime }}</div>
        <div class="progressCont">
          <div class="progress">
            <div class="loaded" :style = "{ width: Math.ceil(barLeft) + '%' }"></div>
            <div class="line" :style = "{ width: Math.ceil(buffPro) + '%' }"></div>
            <div class="bar" :style = "{ left: barLeft + '%' }"></div>
          </div>
        </div>
        <div class="endTimer">
          <span class="current">{{ duration }}</span>
        </div>
      </div>
    </div>
    <confirm v-if="confirmShow"
      @on-cancel="handleConfirmCancel"
      :confirm-text='confirmText'
      :cancel-text='cancelText'
      @on-confirm="handleConfirmOk">
      <p style="text-align:center;">{{ confirmMsg }}</p>
    </confirm>
  </div>
</template>

<script>
  import popup from 'dvd-service-com-popup';
  import loading from './loading.vue';
  import confirm from './confirm.vue';
  import $ from 'jquery';
  export default {
    name: 'VideoPlayer',
    components: {
      loading,
      confirm
    },
    props: {
      poster: {
        type: String,
        default () {
          return '';
        }
      },
      videoUrl: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        isPlay: false, // 是否在播放
        isLoad: false, // loading加载
        isWaitTime: true,
        isShowControl: false, // 是否显示进度条

        currTime: "00:00", // 当前时间
        duration: "00:00", // 视频总时间
        barLeft: 0,
        buffPro: 0,

        timeVideo: null,
        isShowRecord: true,

        isWifiFlag: true,
        confirmShow: false,
        confirmText: '继续观看',
        cancelText: '取消播放',
        confirmMsg: '温馨提示：您正处于非 wifi 环境，继续观看将消耗流量',
        showText: '当前网络环境较差',
      };
    },
    methods: {
      handleVideo() {
        let video = this.$refs.video;

        if (video.paused) {
          if (this.isWifi()) {
            video.style.backgroundImage = 'none';
            //第一次播放后如果不是在最新的苹果消失record;
            if (!this.isNewIos) {
              this.isShowRecord = false;
            }
            video.play();
            this.isPlay = true;

            this.changeShowControl();
          }else {
            this.confirmShow = true;
            this.maskPopupShow();
          }
        } else {
          this.changeShowControl();
        }
      },
      // 改变control的显示
      changeShowControl () {
        this.isShowControl = true;
        clearTimeout(this.timeVideo);
        this.timeVideo = setTimeout(() => {
          this.isShowControl = false;
        },6000);
      },
      // 点击播放按钮
      handlePlay (e) {
        e.preventDefault();
        e.stopPropagation();

        this.changeShowControl();

        let video = this.$refs.video;
        if (video.paused) {
          video.play();
          this.isPlay = true;
        } else {
          video.pause();
          this.isPlay = false;
          this.isLoad = false;
        }
      },
      // 当播放时间更新
      ontimeUpdate (e) {
        console.log(this.$refs.video.currentTime);
        //当前播放时间
        this.currTime = this.getFormatTime(this.$refs.video.currentTime);
        if (this.$refs.video.duration == 'Infinity') {
          this.isDuration = false;
          return;
        }
        // 视频总时长
        this.duration = this.getFormatTime(this.$refs.video.duration);
        // 百分比
        this.barLeft = (this.$refs.video.currentTime / this.$refs.video.duration) * 100;

        // 获取要缓冲的进度
        let buffered = this.$refs.video.buffered.end(0); // 当前已缓冲长度
        for (var i = 0; i < this.$refs.video.buffered.length; i++) {
          buffered = this.$refs.video.buffered.end(i);
        }
        this.buffPro = parseInt((buffered / this.$refs.video.duration) * 100);
      },

      // 正在加载等待时出现loading
      handleWait() {
        this.isLoad = true;
        setTimeout(() => {
          if (this.isWaitTime) {
            popup.toast(this.showText,3000);
          }
        },5000);
      },

      //播放时消失loading
      handlePlaying() {
        this.isWaitTime = false;
        this.isLoad = false;
      },

      //播放完毕
      handleEnded() {
        this.$refs.video.currentTime = 0;
        this.currTime = this.getFormatTime();
        this.barLeft = 0;
        this.isPlay = false;
        this.isShowControl = true;
        this.isLoad = false;
      },

      // wifi确认框点击取消
      handleConfirmCancel () {
        this.confirmShow = false;
        this.maskPopupHide();
      },

      // wifi确认框点击ok
      handleConfirmOk () {
        let video = this.$refs.video;
        video.style.backgroundImage = "none";
        video.play();
        this.isPlay = true;

        this.changeShowControl();
        this.confirmShow = false;
        this.maskPopupHide();
      },
      // 格式化时间 (05:34)
      getFormatTime(time) {
        let times = time || 0;

        let h = parseInt(times/3600),
            m = parseInt(times%3600/60),
            s = parseInt(times%60);
        h = h < 10 ? "0"+h : h;
        m = m < 10 ? "0"+m : m;
        s = s < 10 ? "0"+s : s;

        return m+":"+s;
      },
      // 判断是否是wifi
      isWifi() {
        let wifi = true;

        let con = window.navigator.connection;

        if (con && con.type) {
          let network = con.type;
          if (network != "wifi" && network != "2" && network != "unknown") {  // unknown是为了兼容Chrome Canary
            wifi = false;
          }
        }
        return wifi;
      },
      maskPopupShow() {
        this.maskPopupFlag = true;
        if (document.documentElement && document.documentElement.scrollTop) {
          this.scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          this.scrollTop = document.body.scrollTop;
        }
        document.body.style.top = -this.scrollTop + "px";
        document.body.classList.add("fiexAuto");
        // document.body.classList.add("fiexAuto");
      },
      maskPopupHide() {
        this.maskPopupFlag = false;
        // document.body.classList.remove("fiexAuto");
        document.body.classList.remove("fiexAuto");
        $(document).scrollTop(this.scrollTop);
      }
    }
  }
</script>


<style lang="scss" scoped>
  .video-player {
    position: relative;
    width: 3.05rem;
    height:2.4rem;
    margin:0 auto 10px;
    .video_wrapper {
      width: 100%;
      height: 100%;
    }
    video {
      width:100%;
      height:100%;
      background-size: cover;
    }
    .record, .loadIcon {
      width: 60px;
      height: 60px;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 10;
    }
    .record {
      background: url("//9i.dvmama.com/free/2018/05/09/video_icon.png");
      background-size: 100%;
      z-index: 0;
    }
    .loadIcon {
      background: url("//9i.dvmama.com/free/goodsDetail/spin.gif");
      background-size: 100%;
    }
    .control-bar {
      position: absolute;
      opacity: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 0.44rem;
      z-index: 99;
      display: flex;
      align-items: center;
      transition: .5s;
      background-color: rgba(43,51,63,.7);
      &.controlUp {
        opacity: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        bottom: 0;
      }
      .playIcon,.pauseIcon {
        display: inline-block;
        width: 0.4rem;
        height: 0.44rem;
      }
      .playIcon {
        background: url('//9i.dvmama.com/free/goodsDetail/play_icon.png') center;
        background-size: 100%;
      }
      .pauseIcon {
        background: url('//9i.dvmama.com/free/goodsDetail/pause_icon.png') center;
        background-size: 100%;
      }
      .total {
        color: #fff;
        font-size: 0.12rem;
      }
      .endTimer {
        margin-right: 0.1rem;
        color: #FFF;
        font-size: 0.12rem;
      }
      .progressCont {
        overflow: hidden;
        flex: 1;
        height: 0.2rem;
      }
      /*进度条*/
      .progress {
        height: 0.03rem;
        border-radius: 50px;
        background-color: #555;
        margin: 0 0.1rem;
        cursor: pointer;
        position: relative;
        top: 0.08rem;
        z-index: 100;
        flex: 1;
        /*下载进度*/
        .loaded {
          position: absolute;
          z-index: 10;
          width: 0;
          height: 100%;
          border-radius: 50px;
          background: linear-gradient(to right,#FF5B5B,#FA1862);
        }

        /*播放进度*/
        .line {
          width: 0;
          height: 100%;
          border-radius: 50px;
          background-color: #FFF;
          position: absolute;
          top: 0;
          left: 0;
        }

        /*小圆点*/
        .bar {
          width: 10px;
          height: 10px;
          position: absolute;
          top: -3px;
          z-index: 10;
          border-radius: 50%;
          background: #fff;
        }
      }
    }

  }

</style>

