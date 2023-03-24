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
      if (this.errorNameTips != "金金") {
        this.errorNameTips = "请输入正确的用户名！";
      } else {
        this.errorNameTips = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.root {
  height: 100%;
  &.login-root {
    background: url(../assets/images/bg.png) no-repeat center;
    background-size: cover;
  }
  .login-main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h2 {
      margin-bottom: 20px;
      font-size: 20px;
      color: #fff;
      line-height: 30px;
      font-weight: bold;
      text-align: center;
    }
    .login-form {
      width: 400px;
      padding: 40px 20px 20px;
      background-color: #fff;
      border-radius: 8px;
      .login-input {
        display: block;
        width: 100%;
        height: 40px;
        padding-left: 10px;
        font-size: 14px;
        color: #333;
        line-height: 38px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .error-msg {
        height: 20px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #f65a5a;
        line-height: 20px;
      }
    }
    .login-btn {
      display: block;
      margin: 0 auto;
      width: 100%;
      font-size: 15px;
      color: #fff;
      line-height: 40px;
      font-weight: bold;
      text-align: center;
      background-color: #42b983;
      border-radius: 6px;
      &:active {
        background-color: #04a55c;
      }
    }
  }
  .main {
    display: flex;
    height: calc(100% - 60px);
    .menu-box {
      padding: 10px;
      .menu-item {
        border-bottom: 1px solid #eee;
        a {
          display: block;
          min-width: 160px;
          padding: 10px 0;
          font-weight: bold;
          color: #2c3e50;
          line-height: 1.5;
          &.router-link-exact-active,
          &:hover {
            color: #42b983;
          }
        }
      }
    }
    .main-page {
      flex: 1;
      height: 100%;
      padding: 30px;
      background-color: #f3f5fb;
    }
  }
}
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.search-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #c4c7ce;
  border-radius: 4px;
  .search-input {
    flex: 1;
    padding-left: 10px;
    width: 200px;
    height: 36px;
    font-size: 14px;
    line-height: 34px;
    color: #333;
    border: 0;
    border-radius: 4px;
  }
  .search-btn {
    width: 30px;
    height: 34px;
    cursor: pointer;
    background: url(../assets/images/search.png) no-repeat center;
  }
}
@media screen and (max-width: 500px) {
  .root {
    &.login-root {
      background-image: url(../assets/images/bg_app.png);
    }
    .login-main {
      h2 {
        font-size: 0.2rem;
      }
      .login-form {
        width: 3.2rem;
      }
    }
  }
}
</style>
