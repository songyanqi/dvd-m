<template>
  <div>
    <div v-if="response">
      <!-- 小书库介绍信息 -->
      <div v-if="stack_list">
        <div class="book_stack_infos">
          <img src="//9i.dvmama.com/free/2017/12/21/book_info_trang.png" alt="" />
          <img src="//9i.dvmama.com/free/2017/12/21/book_info_trang.png" alt="" />
          <img src="//9i.dvmama.com/free/2017/12/21/book_stacks_logo.png" alt="" />
          <p>小书库是大V店推出的阅读解决方案，￥365可一年选24本童书包邮到家。</p>
          <a href="/index.php?c=ShopGoods&amp;a=index&amp;id=623534" class="info_mores">了解更多
            <span>&gt;</span>
          </a>
        </div>
      </div>
      <div v-else>
        <div>
          <div v-if="response.data.userInfo" class="user_infos">
            <div class="user_img">
              <img :src="response.data.userInfo.avatar || '[[static]]/page/center/img/default-head.png'" alt="" /></div>
            <div class="user_desc">
              <p>{{response.data.userInfo.nickname}}</p>
              <p>宝宝姓名：{{response.data.userInfo.babyName || &quot;未添加&quot;}}</p>
              <p>宝宝生日：{{response.data.userInfo.babyBirthday || &quot;未添加&quot;}}</p>
            </div>
            <a @click="opens('/book_stacks_baby_info.html')" class="user_info_change">
              <span>更新资料</span>
              <img src="//5e.dvmama.com/wap/static/dist/static/page/center/img/arrow-right.png" class="arrow" />
            </a>
          </div>
        </div>
        <div v-if="response.data.recommendBooks&&response.data.recommendBooks.length" class="foryoucom">
          <p>为你推荐：</p>
          <p>{{response.data.userInfo.ageStr || &quot;订购小书库&quot;}}的{{response.data.userInfo.ageStr ? '宝宝':'妈妈'}}更喜欢这{{response.data.recommendBooks.length}}本书：</p>
        </div>
        <div v-if="response.data.recommendBooks&&response.data.recommendBooks.length" class="pre_goods_list">
          <div class="goods_list">
            <section v-for="(goods,index) in response.data.dataList" :key="index">
              <div v-for="(item,num) in goods.book_stacks_list" :key="num" v-if="tuijian(item.goodsId)" class="goods_items">
                <span v-if="!stack_list">
                  <div v-if="item.goodsStock &gt; 0" class="select_btn" :class="{'selected':item.checkeds&amp;&amp;item.checkeds == true}" @click="select_book(index,num,item.goodsId)">
                    <span v-if="item.checkeds&amp;&amp;item.checkeds">已选</span>
                    <span v-else>选TA</span>
                  </div>
                  <div v-else class="select_btn border_grey">
                    <span>暂无货</span>
                  </div>
                </span>
                <span @click="openSetitem(item.command.content)">
                  <div class="goods_img">
                    <img :src="item.imgUrl" />
                    <div class="audiobtn" :class="{'playing':isplaying[item.goodsId]}" v-if="item._audio&&item._audio!=''" @click.stop="audioplay(item.goodsId,item._audio)">{{audiosedata['audio'+item.goodsId] | durations}}</div>
                  </div>
                  <div class="goods_desc" :class="{'no_goodsstock':item.goodsStock < 1}">
                    <p>{{item.title}}</p>
                    <p>{{item.recomWord}}</p>
                    <div v-if="item.goodsStock < 1" class="replenishment">补货中</div>
                    <p>
                      <span>
                        <em class="price_symbol">￥</em>
                        <span>{{(item.shopPrice.toString().split(&quot;.&quot;)[0])}}
                          <span v-if="item.shopPrice.toString().split('.').length &gt; 1">.{{item.shopPrice.toString().split(&quot;.&quot;)[1]}}</span>
                        </span>
                      </span>
                    </p>
                    <div>{{item.selected}}位妈妈已选</div>
                  </div>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <!-- 小书库完整书单 -->
      <div class="all_list_title">
        <span>|</span>小书库完整书单</div>
      <div class="order_list_container">
        <div class="order_list_switcher dav-shadow">
          <div v-for="(names,index) in response.data.dataList" :key="index" :class="{'selected':table_select == index}" @click="select_table(index)" class="switcher_item">
            <span>{{names.book_stacks_name}}</span>
            <div v-for="(audios,index1) in names.book_stacks_list" :key="index1">
              <audio v-if="audios._audio && audios._audio!=''" preload="none" :id="'audio'+audios.goodsId" :data="audios.goodsId" :src="audios._audio"></audio>
            </div>
          </div>
        </div>
        <div v-for="(goods,index) in response.data.dataList" :key="index" v-if="table_select == index" class="goods_list">
          <div v-for="(item,num) in goods.book_stacks_list" :key="num" class="goods_items">
            <span v-if="!stack_list">
              <div v-if="item.goodsStock &gt; 0" class="select_btn" :class="{'selected':item.checkeds&amp;&amp;item.checkeds == true}" @click="select_book(index,num,item.goodsId)">
                <span v-if="item.checkeds&amp;&amp;item.checkeds">已选</span>
                <span v-else>选TA</span>
              </div>
              <div v-else class="select_btn border_grey">
                <span>暂无货</span>
              </div>
            </span>
            <span @click="openSetitem(item.command.content)">
              <div class="goods_img">
                <img v-if="num < 6" :src="item.imgUrl" alt="" />
                <img v-if="num > 5" v-lazy="item.imgUrl" alt="" />
                <div class="audiobtn" :class="{'playing':isplaying[item.goodsId],'preplay':preplay[item.goodsId]}" v-if="item._audio&&item._audio!=''" @click.stop="audioplay(item.goodsId,item._audio)">{{audiosedata['audio'+item.goodsId] | durations}}</div>
              </div>
              <div class="goods_desc" :class="{'left100':stack_list,'no_goodsstock':item.goodsStock < 1}">
                <p>{{item.title}}</p>
                <p>{{item.recomWord}}</p>
                <div v-if="item.goodsStock < 1" class="replenishment">
                  <span v-if="item.noTime == ''">补货中</span>
                  <span v-else>预计{{item.noTime}}前到货</span>
                </div>
                <p>
                  <span>
                    <em class="price_symbol">￥</em>
                    <span>{{(item.shopPrice.toString().split(&quot;.&quot;)[0])}}
                      <span v-if="item.shopPrice.toString().split('.').length &gt; 1">.{{item.shopPrice.toString().split(&quot;.&quot;)[1]}}</span>
                    </span>
                  </span>
                </p>
              </div>
            </span>
          </div>
        </div>
        <!-- 书单将会持续 -->
        <div class="bottom_tip">书单将会持续更新，敬请期待</div>
        <div v-if="!stack_list" class="bottom_btn_next">
          <div class="bottom_btn_num" @click="checkselect">查看已选({{selected_ids.length}}/{{response.data.number}}）</div>
          <div class="bottom_btn_to" @click="nexts">下一步</div>
        </div>
        <div v-else class="bottom_btn_next">
          <a href="/index.php?c=ShopGoods&amp;a=index&amp;id=623534" class="bottom_btn_to" style="width: 100%;">了解更多</a>
        </div>
        <div v-show="showselected" @click="checkselect" class="g-pop">
          <div class="goods_list" v-if="showselected">
            <section @click.stop="events" v-for="(goods,index) in response.data.dataList" :key="index">
              <div v-for="(item,num) in goods.book_stacks_list" :key="num" v-if="xuanzhong(item.goodsId)" class="goods_items">
                <div class="select_btn" @click="select_book(index,num,item.goodsId)">
                  <span>取消选择</span>
                </div>
                <span>
                  <div class="goods_img">
                    <img :src="item.imgUrl" /></div>
                  <div class="goods_desc">
                    <p>{{item.title}}</p>
                    <p>{{item.recomWord}}</p>
                    <p>
                      <span>
                        <em class="price_symbol">￥</em>
                        <span>{{(item.shopPrice.toString().split(&quot;.&quot;)[0])}}
                          <span v-if="item.shopPrice.toString().split('.').length &gt; 1">.{{item.shopPrice.toString().split(&quot;.&quot;)[1]}}</span>
                        </span>
                      </span>
                    </p>
                  </div>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 基础模块
import common from "dvd-service-js-common";
// 第三方模块
import Vue from 'vue';
import $ from 'jquery';
// 业务模块
require("es6-promise").polyfill();
import encrypt from "dvd-service-js-encrypt";
import popup from "dvd-service-js-popup";
import native from "dvd-service-js-native";
import login from "dvd-service-js-login";
import share from "dvd-service-js-share";
import ua from "dvd-base-js-ua";
import tj from "dvd-service-js-tj";
import param from "dvd-base-js-param";
import vueLazyload from "dvd-service-js-img-lazyload";
import localCache from "dvd-base-js-cache";

// 懒加载初始化
vueLazyload.init(true);

/*判断是否是列表页*/
if (location.href.indexOf("stack_list") > 0) {
  var stack_list = true;
  document.title = "小书库最新书单";
  /*如果是列表页，判断是否是分享过来的*/
  if (location.href.indexOf("share") > 0) {
    var shares = true;
    // 埋点 分享也浏览数据
    try {
      tj.send({
        production: 23,
        action: 1,
        action_type: 6
      });
    } catch (error) {
      console.log(error);
    }
  }
} else {
  login.needLogin();
}

var uradata = param.getAll();
/*
*判断是否是 奖品书领取 如果是 接口则有所不同
*/
var type = uradata.type;
// 渲染页面
export default {
  data() {
    return {
      response: null,
      table_select: 0,
      selected_ids: [],
      stack_list: stack_list || false,
      shares: shares || false,
      showselected: false,
      audiosedatacopy: {}, //倒计时存储复制
      audiosedata: {}, //倒计时存储
      timerdata: {},
      isplaying: {}, //是否正在播放
      audioData: [],
      preplay: {}
    };
  },
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function() {
        let that = this;
        // 设置app头部标题栏
        native.custom.initHead({
          showHead: 1, // 是否展示头部
          backOnHead: 1, // 头部返回按钮
          shareOnHead: 1, // 头部分享按钮
          btnText: ""
        });
        setTimeout(function() {
          native.custom.setHead({
            title: "小书库",
            shareBtn: 1,
            rightBtn: {
              text: ""
            }
          });
        }, 200);
        try {
          share.setShareInfo({
            title: "小书库最新书单",
            desc:
              "大V店童书专家甄选的儿童必读书单，按年龄段分类，来看看你的孩子今年该读哪些书",
            imgUrl:
              "http://9i.dvmama.com/free/2017/12/27/2501_2501_9263c7beaf5ca679a1df7b075d958c31.jpg?x-oss-process=image/resize,m_lfit,h_200,w_200",
            link: location.origin + "/book_stacks_new.html?stack_list"
          });
        } catch (err) {
          console.error(err);
        }
      });
    },
    showselected() {
      let ts = this;
      if (ts.showselected) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.documentElement.style.height = "100%";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        document.documentElement.style.height = "";
      }
    }
  },
  created() {
    let ts = this;
    let isdetail = sessionStorage.getItem("isdetail");
    let datas = localCache.getItem("responsedata"); //数据十分钟后失效
    // 如果有存储数据就不再请求，如果没有就从新请求
    //如果是微信判断如此
    if (datas) {
      if (isdetail == 1 || isdetail == "1") {
        sessionStorage.setItem("isdetail", 0);
        let selected_ids = sessionStorage.getItem("selected_ids");
        ts.response = datas;
        // table选中的年龄段更新
        ts.table_select = ts.response.table_select || 0;
        if (!selected_ids) {
        } else {
          ts.selected_ids = JSON.parse(selected_ids);
        }
        if (document.body.className.indexOf("loaded") === -1) {
          document.body.className += " loaded";
        }
      } else {
        ts.getData();
      }
    } else {
      ts.getData();
    }
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let ts = this;
      if (ts.stack_list) {
        var sdata = {
          stack_list: 1
        };
      } else {
        var sdata = {};
      }
      sdata.quarter = uradata.quarter || "";
      sdata.year = uradata.year || "";
      let bookUrl = "/api/mg/good/vipbook/vipBooksList";
      // alert(type);
      if (type && type == "gift") {
        bookUrl = "/api/mg/good/giftBook/booksList";
      }
      $.ajax({
        url: bookUrl + "?_=" + Date.now(),
        type: "post",
        dataType: "json",
        data: encrypt.ajax(sdata),
        success(response) {
          common.checkRedirect();
          if (response.code == "0") {
            ts.response = response;
            ts.response.table_select = 0;
            // 将整个response 存储在sesstion里
            localCache.setItem({
              key: "orignresponse",
              data: response,
              expires: {
                m: 5
              }
            });
            sessionStorage.setItem("responsedata", JSON.stringify(response));
          } else if (response.code == "96001") {
            location.href = "/index.php?c=ShopGoods&a=index&id=623534";
          } else if (response.code == "1") {
            location.href = response.data.url;
          } else {
            popup.toast(response.data.msg);
          }
        },
        error(error) {
          console.error("ajax error:" + error.status + " " + error.statusText);
        }
      });
    },
    /**
     * 切换年龄段table
     */
    select_table(index) {
      let ts = this;
      if (ts.table_select != index) {
        // ts.stopplay();
        ts.table_select = index;
        ts.response.table_select = index;
      }
    },
    /**
     * 选中图书
     */
    select_book(index, num, id) {
      let ts = this;
      if (ts.stack_list) {
        popup.alert({
          title: "购买小书库！",
          text: "",
          btnTitle: "我知道了"
        });
        return false;
      }
      if (!ts.response.data.dataList[index].book_stacks_list[num].checkeds) {
        if (ts.selected_ids.length == ts.response.data.number) {
          popup.toast("只能领" + ts.response.data.number + "本书哦");
          return false;
        }
        ts.$set(
          ts.response.data.dataList[index].book_stacks_list[num],
          "checkeds",
          true
        );
        ts.selected_ids.push(id);
      } else {
        ts.$set(
          ts.response.data.dataList[index].book_stacks_list[num],
          "checkeds",
          false
        );
        ts.removeByValue(ts.selected_ids, id);
      }
      if (ts.selected_ids.length == 0) {
        ts.showselected = false;
      }
    },
    /**@param
     * 下一步
     * */
    nexts() {
      let ts = this;
      if (ts.stack_list) {
        popup.alert({
          title: "购买小书库！",
          text: "",
          btnTitle: "我知道了"
        });
        return false;
      }
      if (ts.selected_ids.length < ts.response.data.number) {
        popup.alert({
          title:
            "可以领取" +
            ts.response.data.number +
            "本书，你还有" +
            (ts.response.data.number - ts.selected_ids.length) +
            "本书需要领取",
          text: "", // 文本（支持传入html。有则显示。）
          btnTitle: "我知道了" // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
        });
        return false;
      } else {
        // 如果是领取的奖品则不进购物车和请求
        if (type && type == "gift") {
          //直接跳转链接
          location.href =
            "/index.php?c=GiftBooks&a=book_check_info&book_ids=" +
            ts.selected_ids.join(",");
          return;
        }
        // 点击下一步请求成功后直接进购物车页
        $.ajax({
          url: "/api/mg/good/vipbook/choose?_=" + Date.now(),
          type: "post",
          dataType: "json",
          data: encrypt.ajax({
            book_ids: ts.selected_ids.join(",")
          }),
          success(response) {
            if (response.code == "0") {
              // 去购物车
              location.href = "/cart.html?rp=book_stacks&rl=cart";
            } else {
              popup.toast(response.data.msg);
            }
          },
          error(error) {
            console.error(
              "ajax error:" + error.status + " " + error.statusText
            );
          }
        });
      }
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    tuijian(id) {
      let ts = this;
      let itemz;
      let sizenum = 0;
      for (itemz in ts.response.data.recommendBooks) {
        if (ts.response.data.recommendBooks[itemz] == id) {
          sizenum++;
        }
      }
      if (sizenum > 0) {
        return true;
      } else {
        return false;
      }
    },
    xuanzhong(id) {
      let ts = this;
      let itemz;
      let sizenum = 0;
      for (itemz in ts.selected_ids) {
        if (ts.selected_ids[itemz] == id) {
          sizenum++;
        }
      }
      if (sizenum > 0) {
        return true;
      } else {
        return false;
      }
    },
    checkselect() {
      let ts = this;
      if (ts.stack_list) {
        popup.alert({
          title: "购买小书库！",
          text: "",
          btnTitle: "我知道了"
        });
        return false;
      }
      if (ts.selected_ids.length == 0) {
        popup.toast("还没有选书哦~");
      } else {
        ts.showselected = !ts.showselected;
      }
    },
    //打开新的页面
    opens(url) {
      if (ua.isDvdApp()) {
        native.Browser.open({
          url: url
        });
      } else {
        window.open(url);
      }
    },
    openSetitem(url) {
      let ts = this;
      sessionStorage.setItem("isdetail", 1);
      // 每次选中图书后都要将（本地存储）内存里的数据更新了
      // 将整个response 存储在sesstion里
      localCache.setItem({
        key: "responsedata",
        data: ts.response,
        expires: {
          m: 10
        }
      });
      sessionStorage.setItem("selected_ids", JSON.stringify(ts.selected_ids));
      window.location.href = url;
    },
    //播放音频
    audioplay(id, src) {
      let ts = this;
      let $audio = document.getElementById("audio" + id);
      //如果没有加载回来音频 则现在加载 如果有加载音频
      if (ts.audiosedata["audio" + id] && ts.audiosedata["audio" + id] > 0) {
      } else {
        if (
          ts.audiosedatacopy["audio" + id] &&
          ts.audiosedatacopy["audio" + id] > 0
        ) {
          Vue.set(ts.audiosedata, "audio" + id, ts.audiosedatacopy[id]);
        } else {
          //为保证获取成功先load()下 然后再将新获取的音频时间存入内存
          if ($audio.duration) {
          } else {
            $audio.load();
          }
        }
      }
      if ($audio.paused || $audio.ended) {
        //暂停其他音乐和销毁定时器
        ts.stopplay();
        Vue.set(ts.preplay, id, true);

        if ($audio.duration) {
          $audio.play();
          if ($audio.ended) {
            Vue.set(ts.audiosedata, "audio" + id, ts.audiosedatacopy[id]);
          }
          // 监听音频是否开始播放
          // $audio.addEventListener("play", ts.addEventListenerplay($audio, id), false);
          ts.addEventListenerplay($audio, id);
          // 关闭其他播放状态
          for (let play in ts.isplaying) {
            ts.isplaying[play] = 0;
          }
          Vue.set(ts.isplaying, id, 1);
        } else {
          $audio.addEventListener("canplay", function() {
            $audio.play();
            Vue.set(ts.preplay, id, false);
            Vue.set(ts.audiosedata, "audio" + id, $audio.duration);
            Vue.set(ts.audiosedatacopy, "audio" + id, $audio.duration);
            ts.addEventListenerplay($audio, id);
            // 关闭其他播放状态
            for (let play in ts.isplaying) {
              ts.isplaying[play] = 0;
            }
            Vue.set(ts.isplaying, id, 1);
          });
        }
      } else {
        $audio.pause();
        clearInterval(ts.timerdata["timers" + id]);
        $audio.removeEventListener("play", ts.addEventListenerplay());
        Vue.set(ts.isplaying, id, false);
        delete ts.timerdata["timers" + id];
      }
    },
    // 监听触发后操作
    addEventListenerplay(audio, id) {
      let ts = this;
      Vue.set(ts.preplay, id, false);
      ts.timerdata["timers" + id] = setInterval(function() {
        if (!audio) {
          clearInterval(ts.timerdata["timers" + id]);
          delete ts.timerdata["timers" + id];
          Vue.set(ts.isplaying, id, false);
          return false;
        }
        if (audio.ended || audio.paused) {
          clearInterval(ts.timerdata["timers" + id]);
          delete ts.timerdata["timers" + id];
          if (audio.ended) {
            ts.audiosedata["audio" + id] = 0;
          }
          Vue.set(ts.isplaying, id, 0);
          return false;
        }
        ts.audiosedata["audio" + id] = audio.duration - audio.currentTime;
        if (ts.audiosedata["audio" + id] == 0) {
          Vue.set(ts.isplaying, id, 0);
          ts.audiosedata["audio" + id] = audio.duration;
        }
      }, 1000);
    },
    stopplay() {
      let ts = this;
      let audios = document.getElementsByTagName("audio");
      // 暂停其他音乐  修改为暂停正在播放的音乐  暂定
      for (var i = 0; i < audios.length; i++) {
        audios[i].pause();
      }
      //销毁定时器
      for (var i in ts.timerdata) {
        clearInterval(ts.timerdata[i]);
        delete ts.timerdata[i];
      }
      // 关闭其他播放状态
      for (let play in ts.isplaying) {
        ts.isplaying[play] = 0;
      }

      ts.preplay = {};
    },
    events() {}
  },
  filters: {
    durations(result) {
      if (result == undefined) {
        return "精读";
      }
      if (!result || result < 1) {
        return "精读";
      }
      var h = Math.floor(result / 3600);
      var m = Math.floor((result / 60) % 60);
      var s = Math.floor(result % 60);
      if (m > 9) {
        if (s > 9) {
          return m + ":" + s;
        } else {
          return m + ":0" + s;
        }
      } else {
        if (s > 9) {
          return "0" + m + ":" + s;
        } else {
          return "0" + m + ":0" + s;
        }
      }
    }
  }
};
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
@import "../../../common/css/util/all";
.user_infos {
  overflow: hidden;
  div {
    float: left;
  }
  .user_img {
    @include circle(70px);
    overflow: hidden;
    margin: 15px 0 25px 10px;
    img {
      @include square(100%);
    }
  }
  .user_desc {
    margin: 17px 0 0 10px;
    p {
      font-size: 12px;
      height: 17px;
      line-height: 17px;
      color: #666666;
    }
    p:nth-of-type(1) {
      font-size: 16px;
      height: 22px;
      line-height: 22px;
      color: #333333;
      font-weight: 400;
    }
    p:nth-of-type(2) {
      margin-top: 5px;
    }
    p:nth-of-type(3) {
      margin-top: 3px;
    }
  }
  .user_info_change {
    font-size: 12px;
    height: 17px;
    line-height: 17px;
    color: #333333;
    float: right;
    margin: 42px 10px 0 0;
    span {
      position: relative;
      top: -3px;
      right: -5px;
    }
    img {
      height: 90%;
    }
  }
}

.foryoucom {
  margin-left: 10px;
  font-size: 13px;
  color: #666666;
  margin-bottom: 15px;
  p {
    height: 18px;
    line-height: 18px;
  }
  p:nth-of-type(1) {
    height: 25px;
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 6px;
    font-weight: 400;
  }
}

.all_list_title {
  font-size: 18px;
  height: 25px;
  color: #333333;
  margin: 20px 0 20px 10px;
  line-height: 25px;
  span {
    font-weight: 900;
    color: #ff4a7d;
    margin: 4px 5px 0 0;
    font-size: 16px;
    position: relative;
    bottom: 1px;
  }
}

.order_list_container .order_list_switcher {
  background-color: #fff;
  font-size: 0;
  display: table;
  width: 100%;
  top: 0;
  max-width: 640px;
  position: relative;
}

.order_list_container .order_list_switcher:after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid #e1e1e1;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.order_list_container .order_list_switcher .switcher_item {
  line-height: 14px;
  text-align: center;
  font-size: 14px;
  border: none;
  display: table-cell;
  width: 33.333%;
  position: relative;
  span {
    display: inline-block;
    height: 44px;
    line-height: 44px;
  }
}

.order_list_container .order_list_switcher .switcher_item.selected span {
  // color: #ff4a7d;
  // border-bottom: 2px solid #ff4a7d;
  color: #ff4a7d;
  border-bottom: 2px solid #ff4a7d;
}

.order_list_container .order_list_item {
  background-color: #fff;
  margin-top: 10px;
}

.order_list_container .order_good_list {
  padding: 14px 76px 14px 10px;
  display: block;
  border-bottom: #f1f1f1 solid 1px;
  background-color: #fff;
}

.order_delivery_container .order_good_list {
  padding: 14px 62px 14px 0;
  display: block;
  border-bottom: #f1f1f1 solid 1px;
  background-color: #fff;
}

.order_list_container .margin44 {
  top: 44px;
}

.goods_list {
  padding-top: 13px;
}

.goods_items {
  margin: 10px 10px 0;
  height: 120px;
  position: relative;
  .select_btn {
    width: 70px;
    height: 22px;
    position: absolute;
    text-align: center;
    color: #fff;
    line-height: 22px;
    right: 0;
    bottom: 11px;
    border-radius: 50px;
    box-sizing: border-box;
    background: -webkit-linear-gradient(left top, #ff7676, #ff4a8f);
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#ff7676),
      to(#ff4a8f)
    );
    background: -webkit-linear-gradient(top left, #ff7676, #ff4a8f);
    background: linear-gradient(to bottom right, #ff7676, #ff4a8f);
    z-index: 1;
    font-size: 11px;
  }
  .select_btn.border_grey {
    color: #ffffff;
    background: -webkit-linear-gradient(left top, #c0c0c0, #999999);
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#c0c0c0),
      to(#999999)
    );
    background: -webkit-linear-gradient(top left, #c0c0c0, #999999);
    background: linear-gradient(to bottom right, #c0c0c0, #999999);
  }
  .select_btn.selected {
    background: #ffffff;
    color: #ff4a7d;
    ::after {
      content: "";
      -webkit-transform: scale(0.5);
      -ms-transform: scale(0.5);
      transform: scale(0.5);
      width: 200%;
      height: 200%;
      border: #ff4a7d solid 1px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
      border-radius: 50px;
    }
  }
  .goods_img {
    width: 120px;
    height: 120px;
    position: relative;
    .audiobtn {
      position: absolute;
      width: 55px;
      height: 18px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 9px;
      bottom: 0;
      margin: 5px;
      line-height: 18px;
      text-indent: 18px;
      background-image: url("//9i.dvmama.com/free/2017/12/13/audio_btn_icon.png");
      background-size: 14px 14px;
      background-repeat: no-repeat;
      background-position: 3px 2px;
      font-size: 12px;
      text-align: center;
    }
    .audiobtn.playing {
      background-image: url("//9i.dvmama.com/free/2018/02/27/playing.gif");
      background-size: 11px 10px;
      background-position: 4px 4px;
    }
    .audiobtn.preplay {
      background-image: none;
    }
    .audiobtn.preplay:after {
      content: "";
      display: block;
      height: 18px;
      width: 18px;
      left: 0;
      top: 0;
      background-image: url(//9i.dvmama.com/free/2018/02/28/loadingaudio.png);
      z-index: 9;
      position: absolute;
      background-size: 14px 14px;
      background-repeat: no-repeat;
      background-position: center;
      animation: rotation 0.7s linear infinite;
    }
    img {
      width: 120px;
      height: 120px;
    }
  }
  .goods_desc.no_goodsstock {
    p {
      margin-top: 7px;
    }
  }
  .goods_desc {
    position: absolute;
    left: 130px;
    top: 0;
    right: 0;
    bottom: 0;
    .replenishment {
      font-size: 11px;
      color: #ff4a7d;
      height: 11px;
      line-height: 11px;
      margin-top: 5px;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-line;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      height: 20px;
      line-height: 20px;
      color: #ff4a7d;
      margin-top: 15px;
      span {
        em {
          font-size: 12px;
          font-style: normal;
        }
        span {
          font-size: 20px;
          white-space: nowrap;
          span {
            font-size: 18px;
          }
        }
      }
    }
    p:nth-of-type(1) {
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font-size: 14px;
      color: #333333;
      height: 40px;
      line-height: 20px;
      margin-top: 10px;
    }
    p:nth-of-type(2) {
      -webkit-line-clamp: 1;
      line-clamp: 1;
      font-size: 12px;
      color: #999999;
      height: 17px;
      line-height: 17px;
      margin-top: 5px;
    }
  }
}

.bottom_tip {
  font-size: 12px;
  color: #999999;
  text-align: center;
  padding: 10px 0 80px;
}

.bottom_btn_next {
  width: 100%;
  height: 49px;
  position: fixed;
  display: block;
  bottom: 0;
  left: 0;
  max-width: 640px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  line-height: 50px;
  z-index: 4;
  right: 0;
  margin: auto;
  .bottom_btn_to {
    background: -webkit-linear-gradient(left top, #ff5c5c, #fa1862);
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#ff5c5c),
      to(#fa1862)
    );
    background: -webkit-linear-gradient(top left, #ff5c5c, #fa1862);
    background: linear-gradient(to bottom right, #ff5c5c, #fa1862);
    height: 100%;
    width: 50%;
    float: left;
  }
  .bottom_btn_num {
    width: 50%;
    height: 100%;
    background: #ffffff;
    float: left;
    color: #ff4a7d;
  }
  ::after {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    border-bottom: 1px solid #e1e1e1;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

.select_check_no_stock {
  position: absolute;
  bottom: 10px;
  left: -3px;
  font-size: 12px;
  color: #999999;
}

.book_stack_ind {
  padding: 10px;
  font-size: 12px;
  color: #999999;
  line-height: 15px;
}

.pre_goods_list {
  margin: 0 10px;
  background: #ffe7e7;
  border-radius: 5px;
  .goods_list {
    padding: 1px 0 10px 0;
    .goods_items {
      background: #ffffff;
      border-radius: 5px;
      overflow: hidden;
      .goods_desc {
        right: 10px;
        p:nth-of-type(2) {
          margin-top: 1px;
        }
        p:nth-of-type(3) {
          margin-top: 10px;
        }
        div {
          color: #666666;
          font-size: 11px;
          height: 16px;
          line-height: 16px;
          text-align: right;
          margin-top: 2px;
        }
      }
      .select_btn {
        right: 10px;
        bottom: 23px;
      }
    }
  }
}

/* 手机号弹出面板 */

.g-pop {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3; // display: none;
}

.g-pop.active {
  display: block;
}

@keyframes g-pop-show-animation {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.g-pop .goods_list {
  position: absolute;
  bottom: 49px;
  width: 100%;
  animation: g-pop-show-animation 0.5s;
  background-color: #ffffff;
  max-height: 420px;
  overflow-y: scroll;
}

.book_stack_infos {
  min-height: 100px;
  margin: 10px 20px 20px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  position: relative;
  img:nth-of-type(1) {
    height: 17px;
    display: inline-block;
    position: absolute;
    top: 6px;
    left: 6px;
  }
  img:nth-of-type(2) {
    height: 17px;
    display: inline-block;
    position: absolute;
    bottom: 6px;
    right: 6px;
    transform: rotateZ(180deg);
  }
  img:nth-of-type(3) {
    height: 23px;
    display: inline-block;
    margin: 10px 0;
  }
  p {
    line-height: 25px;
    font-size: 14px;
    color: #333333;
    margin: 0 10px;
    text-align: left;
  }
  .info_mores {
    width: 78px;
    height: 21px;
    display: inline-block;
    background: #ffeef3;
    line-height: 21px;
    color: #ff4a7d;
    border-radius: 10px;
    padding: 0 4px;
    margin: 10px 0 15px;
    font-size: 12px;
    span {
      color: #ff4a7d;
      display: inline-block;
      transform: scaleY(1.3);
      position: relative;
      bottom: 2px;
    }
  }
}
</style>

<style>
body {
  background: #ffffff;
}

body .app {
  overflow: inherit;
}
.dvd-service-com-title{
  z-index: 2 !important;
}
</style>



