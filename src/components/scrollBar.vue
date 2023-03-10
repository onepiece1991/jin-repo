<template>
  <div
    class="scroll-content"
    :class="{ 'sc-hide': !showYearList }"
    ref="scrollContent"
    @click="scrollClick"
  >
    <div
      class="scroll-main"
      ref="scrollMain"
      :style="{
        top: sBoxTop + 'px',
        left: sBoxLeft + 'px',
      }"
    >
      <div class="year-scroll" ref="yearScroll">
        <div
          class="select-item"
          :class="{ active: selectedYear == yitem }"
          v-for="(yitem, i) in yearList"
          :key="i"
          @click="yearClick($event, i)"
        >
          {{ yitem }}年
        </div>
      </div>
    </div>
    <!-- 垂直 -->
    <div
      v-if="verticalBar"
      ref="vScrollBox"
      class="scroll-box vertical"
      :style="{ width: sWidth + 'px' }"
    >
      <div
        ref="vScrollBar"
        class="scroll-bar vertical-bar"
        :style="{
          top: barTop + 'px',
          right: barRight + 'px',
          width: sWidth + 'px',
          height: barHeight + 'px',
        }"
        @mousedown="startScroll($event)"
        @mouseup="stopScroll"
      ></div>
    </div>
    <!-- 水平 -->

    <div
      v-if="horizontalBar"
      ref="hScrollBox"
      class="scroll-box horizontal"
      :style="{ height: sHeight + 'px' }"
    >
      <div
        ref="hScrollBar"
        class="scroll-bar horizontal-bar"
        :style="{
          bottom: barBottom + 'px',
          left: barLeft + 'px',
          height: sHeight + 'px',
          width: barWidth + 'px',
        }"
        @mousedown="startScroll($event)"
        @mouseup="stopScroll"
      ></div>
    </div>
  </div>
</template>

<script>
const Nowtime = new Date();
//当前年份
const currYear = Nowtime.getFullYear();
export default {
  props: {
    showYearList: {
      type: Boolean,
      default: false,
    },
    // 垂直滚动条宽度
    sWidth: {
      type: [Number, String],
      default: 6,
    },
    // 水平滚动条高度
    sHeight: {
      type: [Number, String],
      default: 6,
    },
    // 目前被选中的年
    selectedYear: {
      type: [Number, String],
      default: currYear,
    },
  },
  data() {
    return {
      currYear: currYear,
      position: "x,y",
      verticalBar: true,
      horizontalBar: false,
      yearList: [], //年份列表
      sBoxTop: 0,
      // sBoxRight: 0,
      // sBoxBottom: 0,
      sBoxLeft: 0,
      barTop: 0,
      barRight: 0,
      barBottom: 0,
      barLeft: 0,
      verticalMove: false,
      horizontalMove: false,
      disX: 0,
      disY: 0,
      // 滚动条宽高
      barWidth: 0,
      barHeight: 0,
      currentId: 1,
      wheelDis: 20,
    };
  },
  created() {
    // 年份列表
    for (let i = 1900; i <= 2050; i++) {
      this.yearList[i - 1900] = i;
    }
    this.$nextTick(() => {
      this.initBar();
      this.scrollTo();
    });
  },
  mounted() {
    // 鼠标移动
    document.addEventListener("mousemove", (e) => {
      e = e || window.event;
      if (this.verticalMove) {
        let scrollH = this.$refs.scrollMain.scrollHeight;
        let innerH = this.$refs.scrollContent.clientHeight;
        let vHeight =
          this.$refs.vScrollBox.offsetHeight -
          this.$refs.vScrollBar.offsetHeight;

        let topCount = null;

        if (e.clientY - this.disY <= 0) {
          topCount = 0;
        } else if (e.clientY - this.disY >= vHeight) {
          topCount = vHeight;
        } else {
          topCount = e.clientY - this.disY;
        }

        this.barTop = topCount;

        this.sBoxTop = -((topCount * (scrollH - innerH)) / vHeight);
      }
      if (this.horizontalMove) {
        let scrollW = this.$refs.scrollMain.scrollWidth;
        let innerW = this.$refs.scrollContent.clientWidth;
        let hWidth =
          this.$refs.hScrollBox.offsetWidth - this.$refs.hScrollBar.offsetWidth;
        let leftCount = null;
        if (e.clientX - this.disX <= 0) {
          leftCount = 0;
        } else if (e.clientX - this.disX >= hWidth) {
          leftCount = hWidth;
        } else {
          leftCount = e.clientX - this.disX;
        }
        this.barLeft = leftCount;
        this.sBoxLeft = -((leftCount * (scrollW - innerW)) / hWidth);
      }
    });
    // 鼠标松开
    document.addEventListener("mouseup", () => {
      this.verticalMove = false;
      this.horizontalMove = false;
    });

    // 鼠标滚轮
    window.addEventListener(
      "mousewheel",
      (e) => {
        this.handleScroll(e);
      },
      true
    ) ||
      window.addEventListener(
        "DOMMouseScroll",
        (e) => {
          this.handleScroll(e);
        },
        false
      );
  },
  methods: {
    initBar() {
      this.barHeight =
        this.$refs.scrollContent.clientHeight *
        (this.$refs.scrollMain.offsetHeight /
          this.$refs.scrollMain.scrollHeight);
      this.barWidth =
        this.$refs.scrollContent.clientWidth *
        (this.$refs.scrollMain.offsetWidth / this.$refs.scrollMain.scrollWidth);
    },
    // 滚动条拖拽-开始
    startScroll(e) {
      e = e || window.event;
      if (e.target.className.indexOf("vertical") > 0) {
        this.verticalMove = true;
        this.disY = e.clientY - this.$refs.vScrollBar.offsetTop;
      }
      if (e.target.className.indexOf("horizontal") > 0) {
        this.horizontalMove = true;
        this.disX = e.clientX - this.$refs.hScrollBar.offsetLeft;
      }
    },
    // 滚动条拖拽-停止
    stopScroll() {
      this.verticalMove = false;
      this.horizontalMove = false;
    },
    // 点击年
    yearClick(e, n) {
      e.stopPropagation();
      this.$emit("onclickYear", n);
    },
    // 点击年下拉框
    scrollClick() {
      this.$emit("onclick");
    },
    //判断滚动方向
    handleScroll(e) {
      if (
        e.target.className.indexOf("select-item") < 0 &&
        e.target.className.indexOf("year-scroll") < 0 &&
        e.target.className.indexOf("scroll-main") < 0 &&
        e.target.className.indexOf("scroll-content") < 0
      ) {
        return;
      }
      let direction = e.deltaY > 0 ? "down" : "up";
      if (this.currentId <= 1) {
        direction == "down" ? this.currentId++ : (this.currentId = 1);
      } else if (this.currentId >= this.yearList.length) {
        direction == "down"
          ? (this.currentId = this.yearList.length)
          : this.currentId--;
      } else {
        direction == "down" ? this.currentId++ : this.currentId--;
      }
      //业务操作
      if (this.$refs.scrollMain) {
        let scrollH = this.$refs.scrollMain.scrollHeight;
        let innerH = this.$refs.scrollContent.clientHeight;
        let vHeight =
          this.$refs.vScrollBox.offsetHeight -
          this.$refs.vScrollBar.offsetHeight;
        if (direction == "down") {
          this.barTop += this.wheelDis;
        } else {
          this.barTop -= this.wheelDis;
        }
        if (this.barTop < 0) {
          this.barTop = 0;
        } else if (this.barTop >= vHeight) {
          this.barTop = vHeight;
        }
        this.sBoxTop = -((this.barTop * (scrollH - innerH)) / vHeight);
      }
    },
    // 初始化：滚动到当前年的位置
    scrollTo() {
      let yNo = this.currYear - this.yearList[0] - 5;
      this.sBoxTop = -yNo * 27;
      let scrollH = this.$refs.scrollMain.scrollHeight;
      let innerH = this.$refs.scrollContent.clientHeight;
      let vHeight = this.$refs.vScrollBox.offsetHeight - this.barHeight;
      this.barTop = (Math.abs(this.sBoxTop) * vHeight) / (scrollH - innerH);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-content {
  position: relative;
  max-height: 312px;
  max-width: 500px;
  min-width: 94px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  background: #ffffff;
  z-index: 10;
  overflow: hidden;
  cursor: default;
  &.sc-hide {
    opacity: 0;
    z-index: -10000;
  }
  .scroll-main {
    position: relative;
    top: 0;
    max-width: 500px;
    max-height: 312px;
    box-sizing: border-box;
    padding: 9px 16px;
    transition: all 0.1s linear;
    .year-scroll {
      user-select: none;
      // 横向滚动条内容不换行
      // white-space: nowrap;
    }
  }
  .scroll-box {
    position: absolute;
    width: 6px;
    border-top: none;
    background-color: #fff;
    &.vertical {
      height: calc(100% - 18px);
      top: 9px;
      right: 0;
    }
    &.horizontal {
      width: calc(100% - 18px);
      left: 9px;
      bottom: 0;
    }

    .scroll-bar {
      position: absolute;
      top: 0;
      z-index: 10;
      margin-left: -2px;
      width: 4px;
      height: 14px;
      border: none;
      background: #4e6ef2;
      border-radius: 3px;
      overflow: hidden;
      transition: all 0.1s linear;
      &.vertical-bar {
        right: 0;
      }
      &.horizontal-bar {
        left: 0;
      }
    }
  }
}
.select-item {
  display: inline-block;
  width: 74px;
  padding-bottom: 7px;
  padding-top: 7px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: top;
  &.active,
  &:hover {
    color: #315efb;
  }
}
</style>
