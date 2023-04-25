<template>
  <div class="cont-box">
    <p>methods中定义debounce方法:</p>
    <button @click="jump1('jump1')">总是执行第一次操作</button>
    <button @click="jump2('jump2')">总是执行最后一次操作</button>
    <p>引入封装好的debounce方法:</p>
    <button @click="jump3">总是执行第一次操作</button>
    <button @click="jump4">总是执行最后一次操作</button>
    <div class="info" v-if="infoTxt">
      调用方法及执行情况：
      <p>{{ infoTxt }}</p>
    </div>
  </div>
</template>

<script>
import { debounce1 } from "@/utility/global";
export default {
  data() {
    return {
      timeout: null,
      infoTxt: "",
      jumpFlag: "",
    };
  },
  methods: {
    jump1(str) {
      // 判断是否是第一次点击，当一个页面里只调用一次debounce函数时不需要（引入js中使用的debounce也不需要）
      if (this.jumpFlag != str) {
        this.jumpFlag = str;
        this.timeout = null;
      }
      this.debounce(
        function () {
          console.log("执行jump1");
          this.infoTxt = "methods中定义debounce方法：总是执行第一次操作";
        },
        2000,
        true
      );
    },
    jump2(str) {
      this.jumpFlag = str;
      this.debounce(
        function () {
          console.log("执行jump2");
          this.infoTxt = "methods中定义debounce方法：总是执行最后一次操作";
        },
        2000,
        false
      );
    },
    debounce(fn, wait, immediate) {
      let context = this;
      let args = arguments;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      // 清除计时器，但是timeout本身还在，只是不会在执行
      if (immediate) {
        // 总是执行第一次操作
        console.log("总是执行第一次操作");
        let callNow = !this.timeout; // 第一次为true
        // 多次操作，timeout初始化，多次触发只有当wait等待时间结束timeout才为空
        this.timeout = setTimeout(() => {
          this.timeout = null;
        }, wait);
        // 第一次为true, 执行
        if (callNow) {
          fn.apply(context, args);
        }
      } else {
        // 总是执行最后一次操作
        console.log("总是执行最后一次操作");
        this.timeout = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      }
    },
    jump3: debounce1(
      function () {
        console.log("执行jump3");
        this.infoTxt = "引入封装好的debounce方法：总是执行第一次操作";
      },
      2000,
      true
    ),
    jump4: debounce1(
      function () {
        console.log("执行jump4");
        this.infoTxt = "引入封装好的debounce方法：总是执行最后一次操作";
      },
      2000,
      false
    ),
  },
};
</script>

<style lang="less" scoped>
button {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  background-color: #1f90e7;
  border-radius: 6px;
}
.info {
  padding: 50px 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  p {
    font-size: 16px;
    color: #1f90e7;
    line-height: 36px;
    font-weight: normal;
  }
}
</style>
