<template>
  <div class="root login-root">
    <div class="login-main">
      <h2>Welcome to the jin-repo!</h2>
      <div class="login-form">
        <input
          class="login-input"
          type="text"
          placeholder="请输入用户名"
          id="userName"
          @focus="nameFocus"
          @blur="nameBlur"
        />
        <p class="error-msg">{{ errorNameTips }}</p>
        <input
          class="login-input"
          type="password"
          placeholder="请输入密码"
          id="userPassword"
        />
        <p class="error-msg">{{ errorPasswordTips }}</p>
        <button class="login-btn" @click="logIn">登录</button>
        <p>firstName：{{ firstName }} <input v-model="firstName" /></p>
        <p>lastName：{{ lastName }}</p>
        <p>fullName：{{ fullName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { goPage } from "@/utility/global";
export default {
  data() {
    return {
      logOutFlag: false, // 未登录
      errorNameTips: "111",
      errorPasswordTips: "222",
      firstName: "张",
      lastName: "三",
      fullName: "张-三",
    };
  },
  //监视属性
  watch: {
    //简写形式
    firstName(val) {
      //当firstName修改后，1秒后触发计时器修改fullName
      //不写成setTimeout(function(){this.fullName = val +'-'+ this.lastName},1000);
      setTimeout(() => {
        this.fullName = val + "-" + this.lastName;
      }, 1000);
    },
  },
  methods: {
    logIn() {
      let that = this;
      goPage(that, "/main");
      console.log(that);
      // this.$router.push("/main");
    },
  },
};
</script>

<style lang="less" scoped></style>
