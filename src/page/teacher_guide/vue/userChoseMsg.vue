<template>
  <div v-show="is_show">
    <div class="ui-all">
      <div class="ui-bg"></div>
      <div class="ui-close-icon" @click="closeModel()">
        <img src="//9i.dvmama.com/free/2018/05/21/close1.png" width="100%" height="100%">
      </div>
      <div class="ui-cnt-box">
        <div class="ui-cnt-title">
          <span>{{data.title}}</span>
        </div>
        <div class="ui-cnt-title-s">
          <span>{{data.desc}}</span>
        </div>


        <div class="ui-user-info" v-for="(item,index) in dataList">
          <div class="ui-user-info-q">
            <span>{{index + 1}}.{{item.title}}</span>
            <!--<span v-if="item.Type === 'radio'">(单选)</span>-->
            <!--<span v-if="item.Type === 'checkbox'">(可多选)</span>-->
          </div>
          <div class="ui-user-info-a">
            <div class="cb-container">
              <div class="ui-a-box" v-for="i in item.optionList">
                <label>
                  <input :type="item.Type" :id="item.name + i.id" :value="i.id" :name="item.name"
                         :checked="i.checked ==='1'">
                  <!--<label :for="item.name + i.id" class="cb-label" :class="{'ui-radio':item.Type === 'radio','ui-checkbox':item.Type === 'checkbox'}"></label>-->
                  <label @click="checkSubBtn(i.id,item.name)" :for="item.name + i.id" class="cb-label ui-radio"></label>
                  <span @click="checkSubBtn(i.id,item.name)">{{i.name}}</span>
                </label>
              </div>
            </div>


          </div>
        </div>


      </div>
      <div class="ui-btn" v-show="can_sub" @click="submit()">完成</div>
      <div class="ui-btn ui-btn-un" v-show="!can_sub">完成</div>
    </div>
  </div>
</template>

<script>
  import encrypt from 'dvd-service-js-encrypt';
  import $ from 'jquery';

  export default {
    name: 'user-chose-msg',
    props: {
      showModelTag: {}// 父组件用于控制本组件展示和隐藏的参数
    },
    data() {
      return {
        is_show: false,// 本组件显示初始化隐藏
        dataList: [], // 问题列表
        can_sub: false,// 按钮可点状态
        data: {},//弹框显示信息
        aList: []//答案列表
      };
    },
    watch: {
      showModelTag() {
        let _this = this;
        // console.log(_this.showModelTag);
        _this.is_show = _this.showModelTag;
      }
    },
    created() {
      let _this = this;
      // 获取内容
      _this.getList((c) => {
        if (c === 'success') {
          // 判断是否可提交（有可能会出现服务端预设选中答案的情况，这里先判断一次，每次点击答案再判断）
          _this.checkSubBtn();
        }
      });
    },
    methods: {
      getList(callback) {
        let _this = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/content/course/user_basic_info?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax({}),
          success(response) {
            // console.log(response);
            try {
              if (response.code === 0) {
                _this.data = response.data;
                _this.dataList = _this.data.selectList;
                _this.dataList.forEach((item, index) => {
                  if (item.type === '0') {
                    item.Type = 'radio';
                  } else if (item.type === '1') {
                    item.Type = 'checkbox';
                  }
                  item.name = item.Type + index;
                });
                callback('success');
              }
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error(error);
          }
        });
      },
      submit() {
        /**
         * 本方法不考虑任意单选或多选未选择的情况 checkSubBtn方法进行判断
         * 当成功提交后通知父组件已经提交
         * 父组件进行跳页或数据刷新
         * 在mobel项目中父组件为feed流模版这时进行跳页
         * 在m项目中父组件为【名师指导】页面这时进行该页面的数据刷新
         */
        let _this = this;
        // console.log(_this.aList);
        let OBJ = {
          mom_age: '',
          baby_num: '',
          baby_age: '',
          baby_sex: ''
        };
        _this.aList.forEach((item) => {
          if (item.inputName === 'mom_age') {
            OBJ.mom_age = item.aList[0];
          }

          if (item.inputName === 'baby_num') {
            OBJ.baby_num = item.aList[0];
          }

          if (item.inputName === 'baby_age') {
            // OBJ.baby_age = item.aList;
            OBJ.baby_age = JSON.stringify(item.aList);
            // OBJ.baby_age = JSON.parse(item.aList);
          }

          if (item.inputName === 'baby_sex') {
            // OBJ.baby_sex = item.aList;
            OBJ.baby_sex = JSON.stringify(item.aList);
            // OBJ.baby_age = JSON.parse(item.aList);

          }
        });
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/content/course/user_basic_info_submit?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt.ajax(OBJ),
          success(response) {
            // console.log(response);
            try {
              if (response.code === 0) {
                // 通知父组件已提交
                _this.$emit('submited');
              }
            } catch (err) {
              // 这个try-catch不要去掉，因为有异常时会阻止强制跳转
            }
          },
          error(error) {
            console.error(error);
          }
        });
      },
      checkSubBtn(aId, qName) {
        let _this = this;
        /**
         * 检查是否可以点击完成按钮
         * 获取问题个数
         * 每个问题是否都已选
         * 如果全部问题都已选则改变按钮状态
         * 每次选择更改数据源中的checked否则会有显示bug
         * */
        setTimeout(() => { //设置0.1秒延迟 否则会获取到之前选择的节点
          let list = [];
          _this.dataList.forEach((item) => {
            let checked = $('input[name=' + item.name + ']:checked');
            if (item.Type === 'radio') {
              let val = '';
              if (checked.length > 0) {
                val = checked[0].value;
                // radio更改数据源
                let qNameR = item.name;
                let aIdR = checked[0].id.split(qNameR)[1];
                for (let j = 0; j < item.optionList.length; j++) {
                  if (item.optionList[j].id === aIdR) {
                    item.optionList[j].checked = '1';
                  } else {
                    item.optionList[j].checked = '0';
                  }
                }
              }
              let checkedBoj = {
                title: item.title,
                name: item.name,
                aList: [],
                inputName: item.inputName
              };
              if (val !== '') {
                checkedBoj.aList.push(val);
              }
              list.push(checkedBoj);

            }
            if (item.Type === 'checkbox') {
              // checkbox更改数据源
              if (aId && qName) {
                if (item.name === qName) {
                  item.optionList.forEach((i) => {
                    if (i.id === aId && i.checked === '0') {
                      i.checked = '1';
                    } else if (i.id === aId && i.checked === '1') {
                      i.checked = '0';
                    }
                  });
                }
              }

              let valList = [];
              if (checked.length > 0) {
                for (let i = 0; i < checked.length; i++) {
                  valList.push(checked[i].value);
                }
              }
              let checkedBoj = {
                title: item.title,
                name: item.name,
                aList: [],
                inputName: item.inputName
              };
              if (valList.length > 0) {
                checkedBoj.aList = valList;
              }
              list.push(checkedBoj);
            }
          });
          // 判断list中每个元素的aList，如果有任意一个元素的aList为空的话则不可以点完成按钮
          let unchoseNum = _this.dataList.length; //计数器 记录已经选答案的问题个数
          list.forEach((item) => {
            if (item.aList.length === 0) {
              unchoseNum--;
            }
          });
          if (unchoseNum === _this.dataList.length) {//已选答案的问题个数和总问题个数相等
            _this.can_sub = true;
          } else if (unchoseNum !== _this.dataList.length || unchoseNum === 0) {
            _this.can_sub = false;
          }
          // console.log(list);
          _this.aList = list;
        }, 100);

      },
      closeModel() {
        let _this = this;
        _this.$emit('model');
      }
    }

  };
</script>

<style lang="sass" lang="scss" scoped>
  @keyframes act {
    0% {
      opacity: 0
    }
    to {
      opacity: 1;
    }
  }

  .ui-all {
    animation: act 500ms;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    font-size: 0;
    z-index: 1000 !important; //弹窗全覆盖底部导航和回顶部按钮
    color: #666666;
    .ui-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.95);
    }
    .ui-close-icon {
      width: 0.133rem;
      height: 0.133rem;
      position: absolute;
      top: 0.261rem;
      left: 100%;
      margin-left: -0.3rem;
    }
    .ui-cnt-box {
      width: 2.45rem;
      height: 3.56rem;
      border: solid 1px #FF4A7D;
      border-radius: 0.08rem;
      position: absolute;
      top: 1.05rem;
      left: 0.45rem;
      background-color: rgba(255, 255, 255, 1);
      padding: 0.2rem;
      .ui-cnt-title {
        width: 100%;
        height: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        font-size: 0.18rem;
      }
      .ui-cnt-title-s {
        width: 100%;
        height: 0.17rem;
        line-height: 0.17rem;
        text-align: center;
        font-size: 0.12rem;
      }
      .ui-user-info {
        width: 100%;
        margin-top: 0.2rem;
        .ui-user-info-q {
          font-size: 0.14rem;
        }
        .ui-user-info-a {
          font-size: 0.12rem;
          $checked-color: #fff;
          $checked-bg: #FF4A7D;
          $unchecked-color: #cfcece;
          $unchecked-bg: rgb(255, 255, 255);
          $checkbox-height: 0.12rem;
          $background-color: #fff;
          $font-color: #dcdcdc;
          $duration: .4s;
          .cb-container {
            width: 100%;
            .ui-a-box {
              min-width: 33%;
              display: inline-block;
              /*float: left;*/
              text-align: left;
              margin-top: 0.03rem;
              input {
                display: none;
              }
            }

          }
          .ui-radio {
            border-radius: 0.25rem;
          }
          .ui-check {
            border-radius: 0;
          }

          .cb-label {
            height: $checkbox-height;
            width: $checkbox-height;
            background: $unchecked-bg;
            border: $checkbox-height * .1 solid $unchecked-color;

            position: relative;
            top: 0.01rem;
            display: inline-block;
            box-sizing: border-box;
            transition: border-color ease $duration/2;
            -moz-transition: border-color ease $duration/2;
            -o-transition: border-color ease $duration/2;
            -webkit-transition: border-color ease $duration/2;
            cursor: pointer;
            &::before, &::after {
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              position: absolute;
              height: 0;
              width: $checkbox-height * 0.2;
              background: $checked-color;
              display: inline-block;
              -moz-transform-origin: left top;
              -ms-transform-origin: left top;
              -o-transform-origin: left top;
              -webkit-transform-origin: left top;
              transform-origin: left top;
              content: '';
              -webkit-transition: opacity ease 0.5s;
              -moz-transition: opacity ease 0.5s;
              transition: opacity ease 0.5s;
            }
            &::before {
              top: $checkbox-height * 0.76;
              left: $checkbox-height * 0.31;
              -moz-transform: rotate(-135deg);
              -ms-transform: rotate(-135deg);
              -o-transform: rotate(-135deg);
              -webkit-transform: rotate(-135deg);
              transform: rotate(-135deg);
            }
            &::after {
              top: $checkbox-height * .45;
              left: $checkbox-height * 0;
              -moz-transform: rotate(-45deg);
              -ms-transform: rotate(-45deg);
              -o-transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
            }
          }

          input[type=radio]:checked + .cb-label, .cb-label.checked, input[type=checkbox]:checked + .cb-label, .cb-label.checked {

            background: $checked-bg;
            border-color: $checked-bg;
            &::after {
              border-color: $checked-color;
              height: $checkbox-height * .35;
              -moz-animation: dothabottomcheck $duration/2 ease 0s forwards;
              -o-animation: dothabottomcheck $duration/2 ease 0s forwards;
              -webkit-animation: dothabottomcheck $duration/2 ease 0s forwards;
              animation: dothabottomcheck $duration/2 ease 0s forwards;
            }

            &::before {
              border-color: $checked-color;
              height: $checkbox-height * 1;
              -moz-animation: dothatopcheck $duration ease 0s forwards;
              -o-animation: dothatopcheck $duration ease 0s forwards;
              -webkit-animation: dothatopcheck $duration ease 0s forwards;
              animation: dothatopcheck $duration ease 0s forwards;
            }

          }
          @-moz-keyframes dothabottomcheck {
            0% {
              height: 0;
            }
            100% {
              height: $checkbox-height *0.35;
            }
          }

          @-webkit-keyframes dothabottomcheck {
            0% {
              height: 0;
            }
            100% {
              height: $checkbox-height *0.35;
            }
          }

          @keyframes dothabottomcheck {
            0% {
              height: 0;
            }
            100% {
              height: $checkbox-height *0.35;
            }
          }

          @keyframes dothatopcheck {
            0% {
              height: 0;
            }
            50% {
              height: 0;
            }
            100% {
              height: $checkbox-height * 0.7;
            }
          }
          @-webkit-keyframes dothatopcheck {
            0% {
              height: 0;
            }
            50% {
              height: 0;
            }
            100% {
              height: $checkbox-height * 0.7;
            }
          }
          @-moz-keyframes dothatopcheck {
            0% {
              height: 0;
            }
            50% {
              height: 0;
            }
            100% {
              height: $checkbox-height * 0.7;
            }
          }

        }
      }
    }
    .ui-btn {
      width: 0.8rem;
      height: 0.24rem;
      line-height: 0.24rem;
      text-align: center;
      color: #FF4a7d;
      border: solid 1px #FF4a7d;
      font-size: 0.14rem;
      position: absolute;
      top: 5.21rem;
      border-radius: 0.25rem;
      left: 1.48rem;
    }
    .ui-btn-un {
      color: #e1e1e1;
      border: solid 1px #e1e1e1;
    }
  }

</style>
