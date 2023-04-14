<template>
  <div class="cont-box">
    <p>默认下班时间是下午17:00（每10s刷新一次）</p>
    <p>请输入下班时间(24小时制):</p>
    <div class="c-wrap">
      <input
        class="t-input"
        v-model="hourVal"
        placeholder="请输入小时"
        @blur="checkHour"
      /><span>:</span>
      <input
        class="t-input"
        v-model="minuteVal"
        placeholder="请输入分钟"
        @blur="checkMinute"
      />
    </div>
    <div class="btn-group">
      <button class="t-btn" @click="refreshTime">更新</button>
      <button class="t-btn gray" @click="resetTime">重置</button>
    </div>
    <p class="min-p error" v-if="overtime">
      你已经下班了！！！下班不积极，脑瓜有问题！哼~
    </p>
    <p class="min-p" v-else>
      距离下班还有<span>{{ countTime }}</span
      >分钟
    </p>
  </div>
  <popupAlert
    :popupMsg="popInfo"
    ref="errorAlert"
    @onclick="confirmQuit"
  ></popupAlert>
</template>

<script>
import popupAlert from "@/components/base/popupAlert";
export default {
  data() {
    return {
      defaultTimeH: "17",
      defaultTimeM: "00",
      hourVal: "",
      minuteVal: "",
      countTime: 0,
      overtime: false,
      timer: "",
      popInfo: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.resetTime();
      this.timing();
    });
  },
  methods: {
    timing() {
      this.timer = setInterval(this.refreshTime, 1000);
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

    confirmQuit() {
      this.$refs.errorAlert.hide();
    },
    // 失去焦点校验小时
    checkHour() {
      if (this.hourVal.trim() != "") {
        if (parseInt(this.hourVal) < 9) {
          this.popInfo = "还没上班呢！";
          this.$refs.errorAlert.show();
        } else if (
          parseInt(this.hourVal) >= 9 &&
          parseInt(this.hourVal) <= 24 &&
          this.hourVal.length <= 2
        ) {
          this.refreshTime();
        } else {
          this.popInfo = "请按照24小时制输入正确的小时数！";
          this.$refs.errorAlert.show();
        }
      }
    },
    // 失去焦点校验分钟
    checkMinute() {
      if (this.minuteVal.trim() != "") {
        if (
          parseInt(this.minuteVal) >= 0 &&
          parseInt(this.minuteVal) <= 60 &&
          this.minuteVal.length <= 2
        ) {
          this.refreshTime();
        } else {
          this.popInfo = "请按照24小时制输入正确的分钟数！";
          this.$refs.errorAlert.show();
        }
      }
    },
    // 更新
    refreshTime() {
      this.initTime(this.hourVal, this.minuteVal);
    },
    // 重置
    resetTime() {
      this.hourVal = this.defaultTimeH;
      this.minuteVal = this.defaultTimeM;
      this.initTime(this.defaultTimeH, this.defaultTimeM);
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  components: {
    popupAlert,
  },
};
</script>

<style lang="less" scoped>
.c-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .t-input {
    flex: 1;
    height: 40px;
    min-width: 100px;
    margin: 10px 0;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
    border: 1px solid #ddd;
  }
  span {
    width: 50px;
    text-align: center;
  }
}
.btn-group {
  display: flex;
  .t-btn {
    width: 80px;
    padding: 5px 15px;
    color: #fff;
    font-size: 14px;
    line-height: 28px;
    border-radius: 8px;
    background-color: #00a4ea;
    &.gray {
      margin-left: 10px;
      background-color: #aaa;
    }
  }
}
.min-p {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  line-height: 22px;
  text-align: center;
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
// @media screen and (max-width: 500px) {
//   .c-wrap {
//     .t-input {
//     }
//   }
// }
</style>
