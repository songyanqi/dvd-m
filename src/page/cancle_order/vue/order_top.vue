<style scoped lang = "sass" lang="scss" rel="stylesheet/scss">
/*$themeColor: #FF4A7D;
.newRefund_progress {
  position: relative;
  padding: 10px 0;
  color: #333;
  margin: 5px 0;
}
.newRefund_progress_cont {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0 10.7%;
  font-size: 12px;
  margin-top: 4px;
  position: relative;
  height: 12px;
  line-height: 12px;
}
.newRefund_line {
  position: relative;
  margin: 0 10.7%;
  padding: 0 8%;
  margin-bottom: 3px;
  font-size: 12px;
}
.progress_one {
  text-align: center;
  position: absolute;
  left: 13.2%;
}
.progress_two {
  text-align: center;
  position: absolute;
  right: 12%;
}
.longWord {
  right: 9%;
}
.shortWord {
  right: 16%;
}
.progress_one_date,.progress_two_date {
  font-size: 10px;
}
.progress_line {
  position: relative;
  left: -1%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
}
.progress_two_dot,.progress_one_dot,.progress_three_dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #DDD;
}
.progress_one_dot,.old_status {
  background: #BBB;
}
.progress_line_dot {
  position: relative;
  width: 45%;
  top: -10px;
  display: inline-block;
  height: 1px;
}
.progress_line_dot:after {
  position: absolute;
  top: 2px;
  content: '';
  left: 14%;
  width: 80%;
  height: 1px;
  border-bottom: 1px dashed rgba(225, 225, 225,.95);
  color:  rgba(225, 225, 225,.95);
}
.current_dot {
  display: inline-block;
  position: relative;
  width: 6px;
  height: 6px;
  background: $themeColor;
  border-radius: 50%;
}
.currentColor {
  color: $themeColor;
}
.current_dot:after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  border: 1px solid $themeColor;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  -webkit-transform: translate(-25%,-25%);
  transform: translate(-25%,-25%);
}
.twoLen {
  margin: 0 24%;
}
.twoLenLeft {
  left: 26.2%;
}
@media screen and (min-width: 400px) {
  .newRefund_progress_cont {
    padding: 0 13.7%;
    position: relative;
  }
  .progress_line {
    left: -2%;
  }
  .progress_one {
    left: 28.5%;
  }
  .progress_two {
    right: 15%;
  }
  .longWord {
    right: 12%;
  }
  .shortWord {
    right: 17%;
  }
}
.threeDot {
  position: absolute;
  right: -15px;
  top: -4px;
  width: 84px;
}
.mt8 {
  margin-top: 8px;
}
.textCenter {
  text-align: center;
}
.one_dot {
  position: absolute;
  width: 84px;
  left:: -10px;
  top: -4px;
}
.porgress_two {
  position: relative;
  top: -5px;
}
.line_pos1 {
  width: 95%;
  left: 2%;
}
.color9 {
  color: #999;
}
*/
.newRefund_progress{
  text-align: center;
  font-size: 0;
  /*height: 0.48rem;*/
}
.container{
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  margin-top: 0.12rem;
  margin-bottom: 0.1rem;
}
.container_item{
  display: inline-block;
  vertical-align: top;
  font-size: 0.12rem;
  width: 0.72rem;
  padding-top: 0.03rem;
  position: relative;
  .container_item_desc{
    height: 0.14rem;
    line-height: 0.16rem;
    overflow: hidden;
    font-size: 0.1rem;
    color: #666666;
  }
  .select{
    color: #FF4A7D;
  }
  .line{
    position: absolute;
    height: 1px;
    left: 0.52rem;
    border-bottom: 1px dashed rgba(225, 225, 225, 0.95);
    width: 0.39rem;
    top: 0.05rem;
  }
  .line_none{
    border: 0;
  }
}
.container_item_twoline{
  width: 1.4rem;
  .line{
    left: 0.9rem;
    width: 1rem;
  }
}

.progress_one_dot{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #DDD;
  margin-bottom: 0.05rem;
  text-align: center;
}
.current_dot {
  position: relative;
  background: #FF4A7D;
  border-radius: 50%;
}
.current_dot:after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  border: 1px solid #FF4A7D;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  -webkit-transform: translate(-25%,-25%);
  transform: translate(-25%,-25%);
}
</style>
<template>
  <div class="newRefund_progress" v-if = "data && data[0]">
    <div class='container'>
         <div v-for='(item, index) in data' class='container_item' :class="{ container_item_twoline: data.length == 2}">
            <span class = "progress_one_dot" :class = "{ current_dot: item.status == 'now' }"></span>
            <div class='container_item_desc' :class= "{ select: item.status == 'now' }">{{item.desc}}</div>
            <div class='line' :class= "{ line_none: index == data.length-1}"></div>
         </div>
    </div>
    <!-- <div class = "newRefund_line" :class = "{ twoLen: data.length == 2 }">
      <div class = "textCenter one_dot">
        <div class = "progress_one_dot" :class = "{ current_dot: data[0].status == 'now' }"></div>
        <div class = "mt8">{{ data[0].desc }}</div>
      </div>

      <span class = "progress_line_dot" :class = "{ line_pos1: data.length == 2 }"></span>
      <span v-if = "data.length == 3" class = "progress_two_dot porgress_two" :class = "{ current_dot: data[1].status == 'now',old_status: data[1].status == 'history' }"></span>
      <span v-if = "data.length == 3" class = "progress_line_dot"></span>

      <div v-if = "data.length == 3" class = "textCenter threeDot">
        <div class = "progress_three_dot" :class = "{ current_dot: data[2].status == 'now' }"></div>
        <div class = "mt8" :class = "{ currentColor: data[2].status == 'now',color9: data[2].status == 'future' }">{{ data[2].desc }}</div>
      </div>
      <div v-else class = "textCenter threeDot">
        <div class = "progress_three_dot" :class = "{ current_dot: data[1].status == 'now' }"></div>
        <div class = "mt8" :class = "{ currentColor: data[1].status == 'now',color9: data[1].status == 'future' }">{{ data[1].desc }}</div>
      </div>
    </div>
    <div class = "newRefund_progress_cont">
      <div class = "progress_line" :class = "{ currentColor: data[1].status == 'now',color9: data[1].status == 'future' }">
        <span v-if = "data.length == 3">{{ data[1].desc }}</span>
      </div>
    </div> -->
  </div>
</template>
<script>
	export default {
		data () {
			return {
        isTwoData: 0,
        changeData: [],
			}
		},
		props: ["data"],
		mounted() {

		},
		methods: {},
	}
</script>
