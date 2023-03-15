<template>
  <!-- <div class="root login-root">
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
      </div>
    </div>
  </div> -->
  <p>test02</p>
  <router-view name="Login"></router-view>
</template>

<script>
// import { goPage } from "@/utility/global";
export default {
  data() {
    return {
      logOutFlag: false, // 未登录
      errorNameTips: "111",
      errorPasswordTips: "222",
    };
  },
  methods: {
    logIn() {
      // goPage("/main");
      this.$router.push("/main");
    },
  },
};
</script>

<style src="@/assets/styles/reset.css"></style>
<style lang="less">
body > div {
  height: 100%;
}
.root {
  height: 100%;
  &.login-root {
    background: url(assets/images/bg.png) no-repeat center;
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
    background: url(assets/images/search.png) no-repeat center;
  }
}
.login-msg {
  display: flex;
  align-items: center;
  position: relative;
  .user-img {
    margin-right: 10px;
    padding: 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #42b983;
    img {
      display: block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  .user-name {
    font-size: 13px;
    line-height: 20px;
    color: #333;
  }
  .login-set {
    position: absolute;
    padding-top: 30px;
    top: 10px;
    right: 0px;
    ul {
      position: relative;
      padding: 10px;
      background-color: #fff;
      border-radius: 8px;
      z-index: 10;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

      &:before {
        content: "";
        position: absolute;
        top: -12px;
        border: 6px solid transparent;
        border-bottom-color: #fff;
      }
      li {
        white-space: nowrap;
        font-size: 14px;
        line-height: 30px;
        color: #666;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        &:last-child {
          border-bottom: 0;
        }
        &:hover {
          color: #42b983;
        }
        a {
          display: block;
          &.router-link-exact-active,
          &:hover {
            color: #42b983;
          }
        }
      }
    }
  }
}
</style>
