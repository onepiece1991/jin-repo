<template>
  <div class="root">
    <header>
      <div class="search-box">
        <input type="search" class="search-input" />
        <i class="search-btn"></i>
      </div>
      <div class="login-msg" @mouseover="showSetInfo" @mouseout="hideSetInfo">
        <div class="user-img">
          <img :src="userImg" />
        </div>
        <p class="user-name">{{ userName }}</p>
        <div
          class="login-set"
          @mouseover="showSetInfo"
          @mouseout="hideSetInfo"
          v-show="setInfoShow"
        >
          <ul>
            <li @click="setInfoShow = !setInfoShow">
              <router-link to="/about">个人中心</router-link>
            </li>
            <li @click="logOut">退出登录</li>
          </ul>
        </div>
      </div>
    </header>
    <div class="main">
      <nav class="menu-box">
        <ul>
          <li class="menu-item" v-for="(item, i) in menuList" :key="i">
            <router-link :to="item.link">{{ item.name }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="main-page">
        <router-view></router-view>
      </div>
    </div>
    <popupAlert
      popupMsg="确定退出登录？"
      ref="logout"
      @onclick="confirmQuit"
      @onclickCancel="cancelQuit"
      cancelbtn="true"
    ></popupAlert>
  </div>
</template>

<script>
import popupAlert from "@/components/base/popupAlert";
export default {
  data() {
    return {
      logOutFlag: false, // 未登录
      errorNameTips: "111",
      errorPasswordTips: "222",
      userImg: require("@/assets/images/jxx.jpg"),
      userName: "Jiniuer",
      menuList: [
        {
          name: "Home",
          link: "/home",
        },
        {
          name: "About",
          link: "/about",
        },
        {
          name: "Plugin",
          link: "/plugin",
        },
        {
          name: "EchartsGroup",
          link: "/echartsGroup",
        },
      ],
      setInfoShow: false, // 个人信息下拉列表
    };
  },
  methods: {
    showSetInfo() {
      this.setInfoShow = true;
    },
    hideSetInfo() {
      this.setInfoShow = false;
    },
    // logIn() {
    //   this.logOutFlag = false;
    // },
    logOut() {
      this.$refs.logout.show();
    },
    // 确定退出登录---确定
    confirmQuit() {
      this.logOutFlag = true;
      this.$refs.logout.hide();
      this.$router.push("/");
    },
    // 确定退出登录---取消
    cancelQuit() {
      this.$refs.logout.hide();
    },
  },
  components: {
    popupAlert,
  },
};
</script>
<style src="@/assets/styles/reset.css"></style>
<style lang="less" scoped>
body > div {
  height: 100%;
}
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
</style>
