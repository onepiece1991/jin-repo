<template>
  <div class="cont-box">
    <p>默认下班时间是下午17:00（每10s刷新一次）</p>
    <input
      class="t-input"
      v-model="timeVal"
      placeholder="请输入下班时间点XX:XX(24小时制)"
    />
    <button class="t-btn" @click="getNewTime()">更新</button>
    <p class="min-p error" v-if="overtime">
      你已经下班了！！！下班不积极，脑瓜有问题！哼~
    </p>
    <p class="min-p" v-else>
      距离您下班还有<span>{{ countTime }}</span
      >分钟
    </p>
  </div>
  <popupAlert
    popupMsg="请按照正确的格式输入!"
    ref="errorAlert"
    @onclick="confirmQuit"
  ></popupAlert>
</template>

<script>
import popupAlert from "@/components/base/popupAlert";
const defaultTimeH = 17;
const defaultTimeM = 0;
export default {
  data() {
    return {
      timeVal: "",
      countTime: 0,
      overtime: false,
      timer: "",
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
    // 初始化
    initTime(h, m) {
      var myDate = new Date();
      var myHour = myDate.getHours();
      var myMinute = myDate.getMinutes();
      if (myHour > h || (myHour == h && myMinute >= m)) {
        this.overtime = true;
      } else {
        this.overtime = false;
        var timeS;
        if (m - myMinute < 0) {
          timeS =
            (parseInt(h) - myHour - 1) * 60 + (parseInt(m) + 60 - myMinute);
        } else {
          timeS = (parseInt(h) - myHour) * 60 + (parseInt(m) - myMinute);
        }
        this.countTime = timeS;
      }
    },
    // 更新时间
    getNewTime() {
      var strT = this.timeVal;
      if (strT.trim() != "") {
        var stArr = strT.split(":");
        if (stArr.length != 2) {
          this.$refs.errorAlert.show();
        } else {
          var newH = stArr[0];
          var newM = stArr[1];
          this.initTime(newH, newM);
        }
      } else {
        this.initTime(defaultTimeH, defaultTimeM);
      }
    },
    confirmQuit() {
      this.$refs.errorAlert.hide();
      this.timeVal = "17:00";
    },
  },
  components: {
    popupAlert,
  },
};
</script>

<style lang="less" scoped>
.t-input {
  width: 300px;
  height: 40px;
  margin: 10px 0;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 28px;
  color: #333;
  border: 1px solid #ddd;
}
.t-btn {
  padding: 5px 15px;
  margin-left: 10px;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  border-radius: 8px;
  background-color: #00a4ea;
}
.min-p {
  font-size: 16px;
  color: #333;
  line-height: 22px;
  &.error {
    font-size: 18px;
    color: #f00;
  }
  span {
    display: inline-block;
    font-size: 20px;
    color: #f00;
    font-weight: bold;
  }
}
</style>
