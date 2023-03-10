<template>
  <div>
    <div class="page-main">
      <slot></slot>
    </div>
    <div class="page-wrapper">
      <div class="page-group">
        <a class="page-btn" :class="{ active: prevActive }" @click="prevBtn"
          >上一页</a
        >
        第<input
          class="page-input"
          v-model="currentPage"
          @blur="checkInput"
        />/{{ totalPage }}页
        <!-- <div class="page-total"></div> -->
        <a class="page-btn" :class="{ active: nextActive }" @click="nextBtn"
          >下一页</a
        >
        <a class="go" @click="setCurrentPage">Go</a>
      </div>
    </div>
    <PopupAlert
      ref="pagePopup"
      :popupMsg="popupTxt"
      @onclick="confirmQuit"
    ></PopupAlert>
  </div>
</template>

<script>
import PopupAlert from "@/components/base/popupAlert";
export default {
  props: {
    dataList: {
      type: Object,
      default: () => {},
    },
    size: {
      type: Number,
      default: 10,
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.totalPage = Math.ceil(this.dataList.length / this.size);
      }, 100);
    });
  },
  data() {
    return {
      prevActive: false, // 默认：上一页不可点
      nextActive: true, // 默认：下一页可点
      totalPage: 0, // 总页数
      currentPage: 1, // 当前页码
      prevVal: 1, // 用于存储前一个有效的页码值
      popupTxt: "",
    };
  },
  methods: {
    setCurrentPage() {
      this.$emit("getCurrentPage", this.currentPage);
    },
    // 上一页
    prevBtn() {
      if (this.prevActive) {
        this.currentPage--;
        this.setCurrentPage();
      }
      return;
    },
    // 下一页
    nextBtn() {
      if (this.nextActive) {
        this.currentPage++;
        this.setCurrentPage();
      }
      return;
    },
    checkInput() {
      if (this.currentPage > this.totalPage || this.currentPage < 0) {
        this.popupTxt = "请输入大于0且小于" + this.totalPage + "的整数";
        this.$refs.pagePopup.show();
        // alert("请输入大于0且小于" + this.totalPage + "的整数");
        this.currentPage = this.prevVal;
        return;
      }
      if (!this.checkNum(this.currentPage)) {
        // alert("请输入有效值");
        this.popupTxt = "请输入有效值";
        this.$refs.pagePopup.show();
        this.currentPage = this.prevVal;
        return;
      }
      this.prevVal = this.currentPage;
      this.setCurrentPage();
    },
    checkNum(pageIndex) {
      var reg = /^\+?[1-9][0-9]*$/;
      return reg.test(pageIndex);
    },
    // 提示弹框按钮-确定
    confirmQuit() {
      this.$refs.pagePopup.hide();
    },
  },
  watch: {
    currentPage(newVal) {
      if (newVal == 1) {
        this.prevActive = false;
      } else if (newVal == this.totalPage) {
        this.nextActive = false;
      } else if (newVal > 1 && newVal < this.totalPage) {
        this.prevActive = true;
        this.nextActive = true;
      }
    },
  },
  components: {
    PopupAlert,
  },
};
</script>

<style lang="less" scoped>
.page-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  margin-top: 20px;
  .page-group {
    display: flex;
    align-items: center;
    .page-btn {
      margin: 0 10px;
      height: 32px;
      font-size: 14px;
      color: #999;
      line-height: 32px;
      cursor: default;
      &.active {
        color: #00a4ea;
        cursor: pointer;
      }
    }
    .page-total {
      display: flex;
      align-items: center;
      height: 32px;
      font-size: 14px;
      color: #666;
      line-height: 32px;
    }
    .page-input {
      width: 47px;
      height: 32px;
      margin: 0 5px;
      font-size: 14px;
      line-height: 30px;
      color: #333333;
      padding-left: 5px;
      border: 1px solid #d9d9d9;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    .go {
      width: 45px;
      height: 30px;
      font-size: inherit;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      background-color: #00a4ea;
      border: 1px solid #ffffff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
