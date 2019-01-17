<style>
  .box {
    font-size: 0.14rem;
    color: #fff;
    padding: 0.02rem 0.04rem;
    background: #333;
    border-radius: 0.02rem;
    line-height: 0.14rem;
  }
  .boxTitle {
    font-size: 0.14rem;
    font-weight: bold;
    margin-right: 0.05rem;
  }
  .dayNum {
    font-size: 0.13rem;
    font-weight: bold;
  }
</style>
<template>
  <div>
    <span v-if = "!isOver"><span v-if = "changeTime"><span class = "boxTitle"><span v-if = "status == 1">距结束</span><span v-else>距结算</span></span><span v-if = "Number(changeTime.day) > 0" class = "dayNum"><span class = "box">{{ changeTime.day }}</span> 天 </span><span class = "box">{{ changeTime.hour }}</span> : <span class = "box">{{ changeTime.minute }}</span> : <span class = "box">{{ changeTime.second }}</span></span></span>
    <span v-else>已结束</span>
  </div>
</template>
<script>
  import date from 'dvd-base-js-date';
  import number from 'dvd-base-js-number';
  export default {
    data() {
      return {
        now: 0,
        isOver: false,
      }
    },
    props:["endtime","status"],
    computed: {
      // 如果倒计时是日期
      // changeTime() {
      //   this.endtime = Number(this.endtime);
      //   if (this.endtime - this.now > 0) {
      //   if (this.endtime > 0) {
      //     let cuntDown = this.getCountDown(this.endtime - this.now);
      //     return cuntDown;
      //   } else {
      //     this.isOver = true;
      //   }
      // }

      // 如果倒计时是一个倒计时
      changeTime() {
        // 一个变量发生变化，导致新增的changeTime发生变化,changeTime在这里是新创建的
        this.endtime = Number(this.endtime);
        this.now = this.now;
        if (this.endtime > 0) {
          // 如果endtiem反悔的是秒记得除以1000
          let cuntDown = this.getCountDown(this.endtime);
          this.endtime--;
          return cuntDown;
        } else {
          this.isOver = true;
        }
      }
    },
    mounted() {
      let that = this;
      setInterval(() => {
        that.now = new Date().getTime();
      },1000);
    },
    methods: {
      getCountDown(targetDate) {
        targetDate = Object.prototype.toString.call(targetDate) == '[object String]' ? new Date(parseInt(targetDate)) :
      Object.prototype.toString.call(targetDate) == '[object Number]' ? new Date(targetDate) :
        targetDate || new Date();
        // let second = 1000;
        // let minute = 60000;
        // let hour = 3600000;
        // let day = 86400000;

        // 如果倒计时是秒为单位
        let second = 1;
        let minute = 60;
        let hour = 3600;
        let day = 86400;

        let distance = targetDate;

        return {
          second: number.preZero(parseInt(distance % minute / second), 2),
          minute: number.preZero(parseInt(distance % hour / minute), 2),
          hour: number.preZero(parseInt(distance % day / hour), 2),
          day: number.preZero(parseInt(distance / day), 2),
        }
      }
    }
  }
</script>
