<template>
  <div class="cont-box">
    <p>休眠指令启动时间</p>
    <input class="dt-input" placeholder="年" v-model="yearVal" />年
    <input class="dt-input" placeholder="月" v-model="monthVal" />月
    <input class="dt-input" placeholder="日" v-model="dayVal" />日
    <input class="dt-input" placeholder="时" v-model="hourVal" />时
    <input class="dt-input" placeholder="分" v-model="minuteVal" />分
    <button class="t-btn" @click="getNewTime">更新</button>
    <p class="min-p" v-if="sleep">
      休眠时间：<span>{{ this.days }}</span
      >天<span>{{ this.hours }}</span
      >小时<span>{{ this.minutes }}</span
      >分<span>{{ this.second }}</span
      >秒
    </p>
    <p class="min-p" v-else>{{ minTxt }}</p>
  </div>
</template>

<script>
const myDate = new Date();
const myYear = myDate.getFullYear();
const myMonth = myDate.getMonth() + 1;
// const myDay = myDate.getDate();
// const myHour = myDate.getHours();
// const myMinute = myDate.getMinutes();
const myDay = 1;
const myHour = 0;
const myMinute = 0;
export default {
  data() {
    return {
      yearVal: myYear,
      monthVal: myMonth,
      dayVal: myDay,
      hourVal: myHour,
      minuteVal: myMinute,
      minTxt: "",
      timer: "",
      sleep: true,
      days: "",
      hours: "",
      minutes: "",
      second: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.timing();
    });
  },
  methods: {
    timing() {
      this.timer = setInterval(this.getNewTime, 1000);
    },
    initTime(old_time) {
      let now_time = Date.parse(new Date()); // 当前时间的时间戳
      let prev_time = Date.parse(new Date(old_time));
      if (prev_time > now_time) {
        //  你醒着的
        this.sleep = false;
        this.minTxt = "你醒着的!!!";
      } else {
        // 计算相差天数
        let time_dis = (now_time - prev_time) / 1000; // 相差的总秒数
        this.days = Math.floor(time_dis / (24 * 3600));
        // 计算相差小时数
        let rest1 = time_dis % (24 * 3600); // 计算天数后剩余的秒数
        this.hours = Math.floor(rest1 / 3600);
        // 计算相差分钟数
        let rest2 = rest1 % 3600; // 计算小时数后剩余的秒数
        this.minutes = Math.floor(rest2 / 60);
        // 计算相差秒数
        this.second = rest2 % 60; // 计算分钟数后剩余的秒数
        this.sleep = true;
      }
    },

    // 更新时间
    getNewTime() {
      let endOldTime =
        this.yearVal +
        "-" +
        this.standardNum(this.monthVal) +
        "-" +
        this.standardNum(this.dayVal) +
        " " +
        this.standardNum(this.hourVal) +
        ":" +
        this.standardNum(this.minuteVal) +
        ":" +
        "00";
      this.initTime(endOldTime);
    },
    standardNum(n) {
      return ("00" + n).slice(-2);
    },
  },
};
</script>

<style lang="less" scoped>
.dt-input {
  width: 100px;
  height: 40px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 28px;
  color: #333;
  border: 1px solid #ddd;
}
.t-btn {
  padding: 10px;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  border-radius: 8px;
  background-color: #00a4ea;
}
.min-p {
  padding: 50px 0;
  font-size: 16px;
  color: #333;
  line-height: 22px;
  text-align: center;
  font-weight: bold;
  span {
    display: inline-block;
    padding: 0 4px;
    font-size: 20px;
    color: #f00;
    font-weight: bold;
  }
}
</style>
