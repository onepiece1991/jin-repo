<template>
  <div class="cont-box">
    <button @click="sendCode" :class="{ disabled: !flag }">{{ btnTxt }}</button>
    <button @click="submit">节流（阻止用户短时间内多次提交）</button>
  </div>
</template>

<script>
import { throttle2 } from "@/utility/global";
export default {
  data() {
    return {
      btnTxt: "发送验证码",
      timeNo: 6,
      flag: true,
      timer: null,
    };
  },
  methods: {
    sendCode() {
      if (!this.flag) {
        return;
      }
      this.flag = false;
      let t = this.timeNo;
      this.timer = setInterval(() => {
        if (t < 1) {
          this.btnTxt = "发送验证码";
          this.flag = true;
          clearInterval(this.timer);
        } else {
          this.btnTxt = t + "s后重新发送";
        }
        t -= 1;
      }, 1000);
    },
    submit: throttle2(function () {
      console.log("提交");
    }, 2000),
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
button {
  display: inline-block;
  padding: 0 10px;
  margin-right: 10px;
  height: 30px;
  line-height: 28px;
  font-size: 14px;
  color: #fff;
  background-color: #42b983;
  border-radius: 4px;
  transition: all 0.5s;
  &.disabled {
    background-color: #999;
  }
}
</style>
