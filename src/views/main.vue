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
          <li
            class="menu-item"
            v-for="(item, i) in menuList"
            :key="'menu0' + i"
          >
            <!-- <router-link :to="item.link">{{ item.name }}</router-link> -->
            <a
              @click="gotoView(i, item.link)"
              :class="{ active: currentMenu == i }"
              >{{ item.name }}</a
            >
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
import { goPage } from "@/utility/global";
export default {
  data() {
    return {
      userImg: require("@/assets/images/jxx.jpg"),
      userName: "Jiniuer",
      currentMenu: 0,
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
    gotoView(n, url) {
      let that = this;
      goPage(that, url);
      this.currentMenu = n;
    },
    showSetInfo() {
      this.setInfoShow = true;
    },
    hideSetInfo() {
      this.setInfoShow = false;
    },
    logOut() {
      this.$refs.logout.show();
    },
    // 确定退出登录---确定
    confirmQuit() {
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
          &.active,
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
@media screen and (max-width: 500px) {
  .root {
    header {
      height: 0.6rem;
    }
    .main {
      height: calc(100% - 1.2rem);
      .menu-box {
        position: absolute;
        bottom: 0;
        padding: 0;
        width: 100%;
        z-index: 10;
        background-color: #fff;
        ul {
          display: flex;
          justify-content: space-around;
          .menu-item {
            a {
              min-width: auto;
              text-align: center;
              padding: 0 0.1rem;
              font-size: 0.14rem;
              height: 0.6rem;
              line-height: 0.6rem;
            }
          }
        }
      }
      .main-page {
        padding: 0.1rem;
        overflow-y: auto;
        .cont-box {
          padding: 0.1rem;
        }
      }
    }
  }
}
</style>
