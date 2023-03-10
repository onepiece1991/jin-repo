<template>
  <div v-if="popupAlertShow">
    <div class="popup-box">
      <h4 class="title">{{ titleTxt }}</h4>
      <i class="i-close" @click="hide"></i>
      <div class="popup-main">
        <p class="msg">{{ popupMsg }}</p>
        <slot></slot>
      </div>
      <div class="btn-group" v-if="btnGroup">
        <button class="btn active" @click="clickEvent">{{ confirmTxt }}</button>
        <button class="btn" v-if="cancelbtn" @click="clickCancelEvent">
          {{ cancelTxt }}
        </button>
      </div>
    </div>
    <popup-mask></popup-mask>
  </div>
</template>

<script>
import popupMask from "@/components/base/popupMask";
export default {
  components: { popupMask },
  props: {
    titleTxt: {
      type: String,
      default: "温馨提示",
    },
    popupMsg: {
      type: String,
      default: "",
    },
    btnGroup: {
      type: [Boolean, String],
      default: true,
    },
    confirmTxt: {
      type: String,
      default: "确认",
    },
    cancelbtn: {
      type: [Boolean, String],
      default: false,
    },
    cancelTxt: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      popupAlertShow: false,
    };
  },
  methods: {
    show() {
      this.popupAlertShow = true;
    },
    hide() {
      this.popupAlertShow = false;
    },
    clickEvent() {
      this.$emit("onclick");
    },
    clickCancelEvent() {
      this.$emit("onclickCancel");
    },
  },
};
</script>

<style lang="less" scoped>
.popup-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  min-width: 300px;
  border-radius: 10px;
  z-index: 10000;
  .title {
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
  }
  .i-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: url(../../assets/images/cancel.png);
    cursor: pointer;
  }
  .popup-main {
    padding: 20px 10px;
    .msg {
      font-size: 14px;
      text-align: center;
      color: #333;
      line-height: 20px;
    }
  }
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 10px 20px;
    .btn {
      min-width: 80px;
      height: 30px;
      padding: 0 20px;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      font-weight: bold;
      background-color: #ccc;
      border-radius: 4px;
      &.active {
        background-color: #42b983;
      }
    }
  }
}
</style>
