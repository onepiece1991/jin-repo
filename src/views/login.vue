<template>
  <div class="root login-root">
    <div class="login-main">
      <h2>Welcome to the jin-repo!</h2>
      <div class="login-form">
        <input
          class="login-input"
          type="text"
          placeholder="请输入用户名"
          v-model="userName"
          @blur="nameBlur"
        />
        <p class="error-msg">{{ errorNameTips }}</p>
        <input
          class="login-input"
          type="password"
          placeholder="请输入密码"
          v-model="userPassword"
        />
        <p class="error-msg">
          {{ errorPasswordTips }}
        </p>
        <button class="login-btn" @click="logIn">登录</button>
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
      errorNameTips: "",
      errorPasswordTips: "",
    };
  },
  methods: {
    logIn() {
      let that = this;
      // 用户验证-先不传
      // if (this.userName != "金金") {
      //   this.errorNameTips = "请输入正确的用户名！";
      //   this.errorPasswordTips = "";
      // } else if (this.userPassword != 520) {
      //   this.errorNameTips = "";
      //   this.errorPasswordTips = "请输入正确的密码！";
      // } else {
      //   this.errorNameTips = "";
      //   this.errorPasswordTips = "";
      // }
      goPage(that, "/main");
      // this.$router.push("/main");
    },
    // 失去焦点验证用户名
    nameBlur() {
      if (this.userPassword != 520) {
        this.errorNameTips = "请输入用户名！";
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
