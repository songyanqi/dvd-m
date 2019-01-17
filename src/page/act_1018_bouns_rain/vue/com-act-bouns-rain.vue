<style lang="sass"  rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  @import "../css/act_1018_bouns_rain.scss";
</style>
<template>
  <div class = "bounsCont">
    <div v-if = "Date.now() > 1520438400000 && Date.now() < 1520524800000">
      <div class = "bounsImgs bouns_06">
        <!-- <div class = "bounsMask clearfix" :class = "{ bounsMaskTrans: dateIdx == 1 }"> -->
        <div class = "bounsMask clearfix">
          <div class = "bouns_0" :class = "{ maskImging:isBouns==1,maskImg:(isMask == 1 || isMask == 2 || isMask == 3 || isMask == 4 || isMask == 5 || isMask == 6) }">
            <div>03月08日</div>
            <div :class = "{ maskLine:isBouns==1 }"><span class = "scaleBouns">08点{{ item1 }}</span></div>
          </div>
          <div class = "bouns_1" :class = "{ maskImging:isBouns==2,maskImg:(isMask == 2 || isMask == 3 || isMask == 4 || isMask == 5 || isMask == 6) }">
            <div>03月08日</div>
            <div :class = "{ maskLine: isBouns==2 }"><span class = "scaleBouns">12点{{ item2 }}</span></div>
          </div>
          <div class = "bouns_2":class = "{ maskImging:isBouns==3,maskImg:(isMask == 3 || isMask == 4 || isMask == 5 || isMask == 6)}">
            <div>03月08日</div>
            <div :class = "{ maskLine: isBouns==3 }"><span class = "scaleBouns">16点{{ item3 }}</span></div>
          </div>
          <div class = "bouns_3" :class = "{ maskImging:isBouns==4,maskImg:(isMask == 4 || isMask == 5  || isMask == 6)}">
            <div>03月08日</div>
            <div :class = "{ maskLine: isBouns==4 }"><span class = "scaleBouns">20点{{ item4 }}</span></div>
          </div>
          <!-- <div class = "bouns_4" :class = "{ maskImging:isBouns==5,maskImg: (isMask == 5 || isMask == 6) }">
            <div>12月24日</div>
            <div :class = "{ maskLine: isBouns==5 }"><span class = "scaleBouns">08点{{ item5 }}</span></div>
          </div>
          <div class = "bouns_5" :class = "{ maskImging:isBouns==6,maskImg: isMask == 6 }">
            <div>12月24日</div>
            <div :class = "{ maskLine: isBouns==6 }"><span class = "scaleBouns">20点{{ item6 }}</span></div>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if = "isConfirm">
      <div class = "weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
        <div class="weui-dialog__bd"><slot><div v-html="content"></div></slot></div>
        <div class="weui-dialog__ft">
          <span class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText}}</span>
          <span class="weui-dialog__btn davdian-confirm" @click="_onConfirm">{{confirmText}}</span>
        </div>
      </div>
    </div>
    <!-- <div class = "countDown_s">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_1.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_2.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_3.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_4.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_5.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_6.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_7.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_8.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_9.png">
      <img style = "display:none;" src="//9i.dvmama.com/free/1111/card/count_11.png">
    </div>

    <div class = "countDown_pic">
      <img v-if = "isCountDown == 1" src="//9i.dvmama.com/free/1111/card/count_9.png">
      <img v-if = "isCountDown == 2" src="//9i.dvmama.com/free/1111/card/count_8.png">
      <img v-if = "isCountDown == 3" src="//9i.dvmama.com/free/1111/card/count_7.png">
      <img v-if = "isCountDown == 4" src="//9i.dvmama.com/free/1111/card/count_6.png">
      <img v-if = "isCountDown == 5" src="//9i.dvmama.com/free/1111/card/count_5.png">
      <img v-if = "isCountDown == 6" src="//9i.dvmama.com/free/1111/card/count_4.png">
      <img v-if = "isCountDown == 7" src="//9i.dvmama.com/free/1111/card/count_3.png">
      <img v-if = "isCountDown == 8" src="//9i.dvmama.com/free/1111/card/count_2.png">
      <img v-if = "isCountDown == 9" src="//9i.dvmama.com/free/1111/card/count_1.png">
      <img v-if = "isCountDown == 10" src="//9i.dvmama.com/free/1111/card/count_11.png">
    </div> -->
  </div>
</template>
<script>
import login from 'dvd-service-js-login';
import tongji from '../js/tjAncestor.js';
import layout from "../../index/module/index/layout.es6";
import popup from 'dvd-service-js-popup';
import $ from 'jquery';

  export default {
    data() {
      return {
        bounsId: 158,
        startTime: "",
        endTime: "",
        isStartGame: false,
        actTimeList: [],
        isLimit: true,
        clickNum: 0,
        isStart: false,
        time: null,
        isLastTime: false,
        startURL: "/api/mg/sale/lottery/info",
        bounsURL: "/api/mg/sale/lottery/get",
        isLogin: false,

        title: "提示",
        content: '需要先登录才能参与红包雨活动哦，先去登录吧～',
        cancelText: "取消",
        confirmText: "确定",
        isConfirm: false,
        isBounsMask: 0,
        isBounsing: 0,
        currentTime: 0,
        timeObj: null,
        newTime: null,

        isBouns: 0,
        isMask: 0,
        isNewStart: false,
        item1: '待开抢',
        item2: '待开抢',
        item3: '待开抢',
        item4: '待开抢',
        item5: '待开抢',
        item6: '待开抢',
        isCountDown: 0,
        isFalse: false,
        dateIdx: 0,
        // dateList: [],
        dateList: [
          'March 08, 2018 08:00:00',
          'March 08, 2018 08:10:00',
          'March 08, 2018 12:00:00',
          'March 08, 2018 12:10:00',
          'March 08, 2018 16:00:00',
          'March 08, 2018 16:10:00',
          'March 08, 2018 20:00:00',
          'March 08, 2018 20:10:00',
        ],
        response: null,
      }
    },
    mounted() {
      this.getData();
      console.log(6);
    },
    props: ['currentDate'],
    watch: {
      response() {
        let that = this;
        this.$nextTick(() => {
          // app下拉异步刷新
          window.iosInterface = window.iosInterface || {};
          window.iosInterface.asynRefresh = function () {
            that.getData();
          };
        });
      },
      currentTime: {
        handler() {
          let that = this;
          clearInterval(that.timeObj);
          that.timeObj = setInterval(() => {
            that.currentTime = Date.now();

            if (that.currentTime > new Date(that.dateList[0]).getTime() && that.currentTime <= new Date(that.dateList[1]).getTime()) {
              that.isBouns = 1;
              that.item1 = '已开抢';
            }

            if (that.currentTime > new Date(that.dateList[1]).getTime() && that.currentTime <= new Date(that.dateList[2]).getTime()) {
              that.isBouns = 0;
              that.isMask = 1;
              that.item1 = '已抢光';
            }

            if (that.currentTime > new Date(that.dateList[2]).getTime() && that.currentTime <= new Date(that.dateList[3]).getTime()) {
              that.isBouns = 2;
              that.isMask = 1;
              that.item1 = '已抢光';
              that.item2 = '已开抢';
            }

            if (that.currentTime > new Date(that.dateList[3]).getTime() && that.currentTime <= new Date(that.dateList[4]).getTime()) {
              that.isBouns = 0;
              that.isMask = 2;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
            }

            if (that.currentTime > new Date(that.dateList[4]).getTime() && that.currentTime <= new Date(that.dateList[5]).getTime()) {
              that.isBouns = 3;
              that.isMask = 2;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
              that.item3 = '已开抢';
            }

            if (that.currentTime > new Date(that.dateList[5]).getTime() && that.currentTime <= new Date(that.dateList[6]).getTime()) {
              that.isBouns = 0;
              that.isMask = 3;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
              that.item3 = '已抢光';
            }

            if (that.currentTime > new Date(that.dateList[6]).getTime() && that.currentTime <= new Date(that.dateList[7]).getTime()) {
              that.isBouns = 4;
              that.isMask = 3;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
              that.item3 = '已抢光';
              that.item4 = '已开抢';
            }

            if (that.currentTime > new Date(that.dateList[7]).getTime()) {
              that.isBouns = 0;
              that.isMask = 4;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
              that.item3 = '已抢光';
              that.item4 = '已抢光';
              that.item5 = '已抢光';
            }

            /*if (that.currentTime > new Date(that.dateList[7]).getTime() && that.currentTime <= new Date(that.dateList[8]).getTime()) {
              that.isBouns = 0;
              that.isMask = 4;
              that.item1 = '已抢光';
              that.item2 = '已抢光';
              that.item3 = '已抢光';
              that.item4 = '已抢光';
            }

              if (that.currentTime > new Date(that.dateList[8]).getTime() && that.currentTime <= new Date(that.dateList[9]).getTime()) {
                that.isBouns = 5;
                that.isMask = 4;
                that.item1 = '已抢光';
                that.item2 = '已抢光';
                that.item3 = '已抢光';
                that.item4 = '已抢光';
                that.item5 = '已开抢';
              }
              if (that.currentTime > new Date(that.dateList[9]).getTime() && that.currentTime <= new Date(that.dateList[10]).getTime()) {
                that.isBouns = 0;
                that.isMask = 5;
                that.item1 = '已抢光';
                that.item2 = '已抢光';
                that.item3 = '已抢光';
                that.item4 = '已抢光';
                that.item5 = '已抢光';
              }

              if (that.currentTime > new Date(that.dateList[10]).getTime() && that.currentTime <= new Date(that.dateList[11]).getTime()) {
                that.isBouns = 6;
                that.isMask = 5;
                that.item1 = '已抢光';
                that.item2 = '已抢光';
                that.item3 = '已抢光';
                that.item4 = '已抢光';
                that.item5 = '已抢光';
                that.item6 = '已开抢';
              }

              if (that.currentTime > new Date(that.dateList[11]).getTime()) {
                that.isBouns = 0;
                that.isMask = 6;
                that.item1 = '已抢光';
                that.item2 = '已抢光';
                that.item3 = '已抢光';
                that.item4 = '已抢光';
                that.item5 = '已抢光';
                that.item6 = '已抢光';
              }*/
          }, 1000);
        },
        deep: true,
      },
      startTime: {
        handler() {
          console.log(1);
          let that = this;
          that.currentTime = Date.now();
          this.$nextTick(function () {
            // if (Date.now() > 1513958400000) {
            //   this.dateIdx = 1;
            // }
            // app下拉异步刷新
            window.iosInterface = window.iosInterface || {};
            window.iosInterface.asynRefresh = function () {
              // if (Date.now() < new Date('December 12, 2017 00:00:00').getTime()) {
              //   that.dateList = that.dataList1;
              // }
              // if (Date.now() > new Date('December 12, 2017 00:00:00').getTime()) {
              //   that.dateList = that.dataList2;
              // }
              // if (Date.now() > new Date('December 13, 2017 00:00:00').getTime()) {
              //   that.dateList = that.dataList3;
              // }
              that.getData();
            };
            // 判断红包mask的显示

            if (!that.isStart) {
              that.time = setInterval(function () {
                that.judgeTime(function () {
                   that.judgeLogin(function () {
                     that.loadImg(['//9i.dvmama.com/free/2017/02/24/red_01.png'], function () {
                       that.startGame();
                    });
                  });
                });
              },1000);
            }
          })
        },
        deep: true
      }
    },
    created() {
      this.isLogin = login.isLogined();
      // if (Date.now() > new Date('December 22, 2017 22:00:00').getTime()) {
      //   this.bounsId = 156;
      // }
      // if (Date.now() > new Date('December 23, 2017 22:00:00').getTime()) {
      //   this.bounsId = 157;
      // }
    },
    methods: {
      _onCancel() {
        this.isConfirm = false;
      },
      _onConfirm() {
        this.isConfirm = false;
        location.href = "/login.html?referer=" + encodeURI(location.href);
      },
      getData() {
        let that = this;
        $.ajax({
          url: that.startURL,
          data: layout.strSign("bounsInfo",{
            lotteryActId: that.bounsId,
          }),
          cache: false,
          type: 'POST',
          dataType: "json",
          success: function (res) {
            var data = res.data;
            if (res.code == 0) {
              that.isStartGame = data.joinLimit == 'no' ? true : false;
              that.startTime = data.startTime*1000;
              that.endTime = data.endTime*1000;
              that.actTimeList = data.timeScope;
              that.isNewStart = true;

              if (that.isStartGame) {
                sessionStorage.setItem("20170420_hby",0);
                that.judgeTime(function () {
                  that.judgeLogin(function () {
                    that.loadImg(['//9i.dvmama.com/free/2017/02/24/red_01.png'], function () {
                      that.startGame();
                    });
                  });
                });
              } else {
                that.isLimit = false;
              }
            } else {
              console.log(res.msg);
            }
          },
          error: function (error) {
            $.ajax({
              url: that.startURL,
              data: layout.strSign("bounsInfo",{
                lotteryActId: that.bounsId,
              }),
              type: 'POST',
              cache: false,
              dataType: "json",
              success: function (res) {
                var data = res.data;
                if (res.code == 0) {
                  that.isStartGame = data.joinLimit == 'no' ? true : false;
                  that.startTime = data.startTime*1000;
                  that.endTime = data.endTime*1000;
                  that.actTimeList = data.timeScope;
                  that.isNewStart = true;

                  if (that.isStartGame) {
                    sessionStorage.setItem("20170420_hby",0);
                    that.judgeTime(function () {
                      that.judgeLogin(function () {
                        that.loadImg(['//9i.dvmama.com/free/2017/02/24/red_01.png'], function () {
                          that.startGame();
                        });
                      });
                    });
                  } else {
                    that.isLimit = false;
                  }
                } else {
                  console.log(res.msg);
                }
              },
              error: function (error) {

              }
            })
          }
        })
      },
      loadImg (list, callback) {
        var loaded = 0, callbacked = false;
        for (var i = 0; i < list.length; i++) {
          (function () {
            var img = new Image();
            img.onload = function () {
              loaded++;
              if (loaded == list.length) {
                if (!callbacked) {
                  callbacked = true;
                  callback && callback();
                }
              }
            };
            img.src = list[i];
          })();
        }
        setTimeout(function () {
          if (!callbacked) {
            callbacked = true;
            callback && callback();
          }
        }, 500)
      },
      judgeLogin(callback) {
        if (this.isLogin) {
          callback()
        } else {
          popup.confirm({
            className: '',
            title: '提示',
            text: "需要先登录才能参与红包雨活动哦，先去登录吧～",
            okBtnTitle: '',
            okBtnCallback() {
              location.href = "/login.html?referer=" + encodeURI(location.href);
            },
            cancelBtnTitle: '',
            cancelBtnCallback() {

            }
          });
          // bravetime.newConfirm("需要先登录才能参与红包雨活动哦，先去登录吧～", {
          //   okLink: "/login.html?referer=" + encodeURI(location.href)
          // })
        }
      },
      judgeTime(callback) {
        var that = this;
        if (that.isLimit) {
          var date = new Date(),
            dateYears = date.getFullYear(),
            dateMounth = date.getMonth() + 1,
            dateDay = date.getDate(),
            dateTime = date.getTime();

          if (dateTime > new Date(that.startTime).getTime() && dateTime < new Date(that.endTime).getTime()) {

            that.actTimeList.map(function (item) {
              if (dateTime >= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() && dateTime <= new Date(
                  dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.overTime).getTime()) {
                that.isStart = true;
                clearInterval(that.time);
                callback();
              }
            });
          }
        } else {
          clearInterval(that.time);
        }
      },
      startGame() {
        var that = this;
        if(sessionStorage.getItem("20170420_hby") == '1'){
          return false;
        }
        var $container = $("<div class='game_container'><div class='mask'></div><div class='game'></div> </div>");
        $(document.body).addClass("gaming").append($container);
        var $game = $container.find(".game");
        that.countdown($game);
        // bravetime.tj.pvSend("hongbaoyu_1704_play");
        tongji.pvSend("hongbaoyu_1704_play");
      },
      countdown($game) {
        let that = this;
        var $countdownContainer = $("<div class='red_countdown'><div class='count_con'>" +
        "<img src='//9i.dvmama.com/free/2017/02/24/red_01.png'>" +
        "<span>3</span>" +
        "</div></div> ");
        $game.append($countdownContainer);
        var size = $(".count_con").width() / 4;
        var font = $game.find("span");
        font.css("font-size", size + "px").css("margin-left", -(font.width() / 2) + "px");
        var t = 3;
        var timer = setInterval(function () {
          if (t-- > 1) {
            font.html(t)
          } else {
            that.showGame($game);
            clearInterval(timer);
            $countdownContainer.remove();
          }
        }, 1000);
        //要替换的是这里的图片
        that.loadImg(['//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon1.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon2.png',
          '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon3.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon4.png',
          '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon6.png']);
      },
      showGame($game) {
        let that = this;
        var $redContainer = $("<div class='red_container'></div>");
        $game.append($redContainer);
        setTimeout(function () {
          that.addRed($redContainer, 1);
        }, 300);
        that.loadImg(['//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bounsrain_no11.png', '//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_yes_icon.png'])
      },
      addRed($redContainer, redNum) {
        var that = this;
        var num = 50, removeTime = 4000;
        var index = Math.ceil(Math.random() * 3) + 1;
        var $red;
        if (index === 4) {
          $red = $("<div class='red'><img style = 'width: 44px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
        } else if (index === 2) {
          $red = $("<div class='red'><img style = 'width: 57px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
        } else if (index === 3) {
          $red = $("<div class='red'><img style = 'width: 60px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
        } else {
          $red = $("<div class='red'><img src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
        }
        $red.css("left", (Math.random() * $redContainer.width())*0.8 + "px").css("top", '-100px').css("width", ["", "", 65, 81, 57, 81][index] + "px");

        $redContainer.append($red);

        setTimeout(function () {
          if (redNum < num) {
            that.addRed($redContainer, ++redNum);
          } else {
            setTimeout(function () {
              that.calculateResult();
              $redContainer.remove();
            }, removeTime);
          }
        }, 15000 / num);
        setTimeout(function () {
          $red && $red.length && $red.remove();
        }, removeTime);
        $red.on("mousedown touchstart", function (e) {
          if (!$red.hasClass("clicked")) {
            $red.addClass("clicked");
            that.clickNum++;
            $(this).addClass("boom").css("animation-play-state", "paused").find("img").attr("src", '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon6.png');
            setTimeout(function () {
              $red && $red.length && $red.remove();
            }, 500)
          }
          event.preventDefault();
          e.preventDefault();
          return false;
        })
      },
      calculateResult() {
        console.log("clickNum",this.clickNum);

        if (this.clickNum >= 5) {
          this.showResult(this.bounsId);
        } else {
          this.showResult();
        }
        sessionStorage.setItem("20170420_hby",1);
      },
      r(list) {
        var g = Math.random(), v = 0, theList = list[0];

        console.log(list, g);
        for (var i = 0; i < list.length; i++) {
          v += +list[i].n;
          if (v > g) {
            theList = list[i];
            break;
          }
        }
        return theList.id;
      },
      // 封装倒计时
      setIntervalTime() {
        let that = this;
        let currents = new Date(),
            dateYears = currents.getFullYear(),
            dateMounth = currents.getMonth() + 1,
            dateDay = currents.getDate();

        clearInterval(that.newTime);
        if (!that.isNewStart) {
          that.newTime = setInterval(function () {
            that.actTimeList.map(function (item,index) {
              if (Date.now() > new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() - 30000  && (parseInt(Date.now()/1000))*1000 <= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime()) {
                that.getData();
              };
            });
            // that.judgeTime(function () {
            //    that.judgeLogin(function () {
            //      that.loadImg(['//9i.dvmama.com/free/2017/02/24/red_01.png'], function () {
            //        that.startGame();
            //     });
            //   });
            // });
          },1000);
        }
      },
      showResult(id) {
        let that = this;
        $(document.body).removeClass("gaming");

        var currents = new Date(),
          dateYears = currents.getFullYear(),
          dateMounth = currents.getMonth() + 1,
          dateDay = currents.getDate(),
          currentHour = currents.getHours(),
          nextStr = "";

        that.actTimeList.map(function (item, index) {
          if (that.actTimeList[index+1]) {
            var getMinutes = new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[index+1].beginTime).getMinutes();
            getMinutes = getMinutes < 10 ? '0'+getMinutes : getMinutes;
          }
          var getMinutesTo = new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[0].beginTime).getMinutes();
          getMinutesTo = getMinutesTo < 10 ? '0'+getMinutesTo : getMinutesTo;

          if (currents.getTime() >= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() && currents.getTime() <= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.overTime).getTime()) {
            if (index == that.actTimeList.length-1) {
              if (currents.getDate() == new Date(that.endTime).getDate()) {
                nextStr = '';
                that.isLastTime = true;
              } else {
                nextStr = "下一场红包雨开始时间：明天 "+ new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[0].beginTime).getHours() +":"+ getMinutesTo +":00";
              }
            } else {
              nextStr = "下一场红包雨开始时间：今天 "+ new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[index+1].beginTime).getHours() +":"+ getMinutes +":00";
            }
          }
        });
        var $game = $(".game");
        if (!id) {
          var fStr = nextStr.indexOf('时间');
          var second = nextStr.substring(0,fStr+3);
          var tStr = nextStr.substring(fStr+3);
          nextStr = second + "</br>" + tStr;

          var templateText = "<div class='result_container'>" +
            "<div class='result result_none'><div class='img_con'>";
          if (that.isLastTime) {
            templateText += "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_iconno22.png'>";
          } else {
            templateText += "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bounsrain_no11.png'>";
          }

          templateText += "<div class='text'>" + nextStr + "</div></div>" +
            "<div class='close bounsColseBtn'><img src='//9i.dvmama.com/free/2017/02/24/close_btn.png' alt=''></div> </div></div> ";

          var $resultContainer = $(templateText);
          $game.append($resultContainer);
          $(".close").click(function () {
            $(".game_container").hide();
            that.isNewStart = false;
            that.setIntervalTime();

          });
        } else {
          console.log("抽中id为" + id + "的红包")
          $.ajax({
            url: that.bounsURL,
            data:layout.strSign("bounsResult",{
              lotteryActId: that.bounsId,
            }),
            type: 'POST',
            cache: false,
            dataType: "json",
            success: function (result) {
              if (result.code == 0) {
                var data = result.data;
                if (data.lotteryResult == 'success' && that.clickNum >= 5) {
                  var $resultContainer = $("<div class='result_container'>" +
                    "<div class='result'><div class='img_con'>" +
                    "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_yes_icon.png'>" +
                    "<div class='text'>" + nextStr + "</div>" +
                    "<div class='min_text'>满" + data.bonusInfo.minConsumePrice + "元可用</div>" +
                    "<div class='num_text'><span class = 'num_text_icon'>¥</span>" +data.bonusInfo.bonusMoney+ "</div>" +
                    "<div class='num_time'>有效期：" + data.bonusInfo.useBeginTime +"~"+data.bonusInfo.useEndTime +"</div>" +
                    "<a class='look_red' href='/user_bonus.html?_refer=hongbaoyu'></a>" +
                    "<div class='close bounsColseBtn'></div>" +
                    "</div>" +
                    "<div class='close bounsColseBtn'><img src='//9i.dvmama.com/free/2017/02/24/close_btn.png' alt=''></div> </div></div> ")
                  $game.append($resultContainer);
                  $(".close").click(function () {
                    $(".game_container").hide();
                    that.isNewStart = false;
                    that.setIntervalTime();
                  });
                  $(".look_red").click(function () {
                    $(".game_container").hide();
                    that.isNewStart = false;
                    that.setIntervalTime();
                  })
                  if (!data.bonusInfo.minConsumePrice) {
                    $(".min_text").hide();
                  };
                } else {
                  that.showResult();
                }
              } else {
                popup.toast(result.data.msg);
                $(".game_container").hide();
                that.isNewStart = false;
                that.setIntervalTime();
              }
            }, error: function () {
              popup.toast("网络异常，请稍后重试")
              that.showResult();
            }
          });
        }
      },
    }
  }
</script>
