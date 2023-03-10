<template>
  <div class="cont-box">
    <div
      class="slide-container"
      :style="{ width: itemW + 'px' }"
      @mouseover="pasue"
      @mouseout="play"
    >
      <ul
        class="slide-wrapper"
        :class="{ trans: noLast }"
        :style="{
          width: slideList.length * itemW + 'px',
          left: -(currentIndex + 1) * itemW + 'px',
        }"
      >
        <li
          :class="['slide-item', currentIndex == i ? 'active' : '']"
          v-for="(item, i) in slideList"
          :key="i"
        >
          <div class="slide-div" :style="{ width: itemW + 'px' }">
            slide-item {{ item }}
          </div>
        </li>
      </ul>
      <div class="location-wrapper">
        <div
          class="local-item"
          :class="{
            active: currentIndex + 1 == k,
            hide: k == 0 || k == slideList.length - 1,
          }"
          v-for="(loc, k) in slideList"
          :key="k"
          @click="localIndex(k)"
        ></div>
      </div>
      <button class="arrow-L" @click="prev">&lt;</button>
      <button class="arrow-R" @click="next">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideList: ["4", "1", "2", "3", "4", "1"],
      slideListFinal: [],
      itemW: 800, //子元素的宽度
      //定时器触发时间--2s触发一次定时器
      timeT: 2000,
      //左右箭头是否显示
      arrowShow: true,
      // 默认选中第一个
      currentIndex: 0,
      // 定时器
      timer: null,
      noLast: true,
    };
  },
  methods: {
    autoSwitch() {
      this.timer = setInterval(() => {
        //需要做的事情
        this.next();
      }, this.timeT);
    },
    next() {
      this.currentIndex++;
      if (this.currentIndex == this.slideList.length - 2) {
        setTimeout(() => {
          this.noLast = false;
          this.currentIndex = 0;
        }, 100);
      }
      this.noLast = true;
    },
    prev() {
      this.currentIndex--;
      if (this.currentIndex == -1) {
        setTimeout(() => {
          //取消过渡效果,使用css来进行操作transition,如果直接用js来操作transition,达不到我们要的效果
          this.noLast = false;
          //切换到1234的4去，由于ul的translatex索引是this.currentIndex+1,所以1234的4为this.slideList.length - 3 +1 = this.slideList.length -2
          //具体多少，得看你的布局是怎样的，有没有合并在数组里面去
          this.currentIndex = this.slideList.length - 3;
        }, 100); //定时器的时间等于过渡时间
      }
      this.noLast = true;
    },
    // 清除定时器
    clear() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 鼠标移上停止动画
    pasue() {
      this.clear();
    },
    // 鼠标移走开始动画
    play() {
      this.autoSwitch();
    },
    // 点击小圆点
    localIndex(m) {
      this.currentIndex = m;
    },
  },
  mounted() {
    this.autoSwitch();
  },
  created() {},
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.slide-container {
  position: relative;
  margin: 0 auto;
  width: 800px;
  overflow: hidden;
  .slide-wrapper {
    position: relative;
    height: 300px;
    *zoom: 1;
    &:after {
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      content: ".";
    }
    &.trans {
      transition: all 0.5s;
    }
    .slide-item {
      float: left;
      width: 800px;
      // transition: all 1s;
      // &.active {
      //   opacity: 1;
      //   z-index: 100;
      // }
      .slide-div {
        line-height: 300px;
        height: 300px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: #016aa3;
      }
      &:nth-child(2n) {
        .slide-div {
          background-color: #0892bf;
        }
      }
    }
  }
  /*小圆点*/
  .location-wrapper {
    position: absolute;
    bottom: 10px;
    left: 50%;
    font-size: 0;
    text-align: center;
    transform: translateX(-50%);
    z-index: 110;
    .local-item {
      display: inline-block;
      margin: 0 10px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: #999;
      cursor: pointer;
      transition: all 0.3s;
      &.active {
        width: 20px;
        background: #fff;
      }
      &.hide {
        display: none;
      }
    }
  }
}
/*箭头*/
.arrow-L,
.arrow-R {
  position: absolute;
  top: 0;
  width: 100px;
  height: 300px;
  font-size: 50px;
  color: #fff;
  line-height: 300px;
  text-align: center;
  opacity: 0.3;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  z-index: 110;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
}
.arrow-L {
  left: 0;
}
.arrow-R {
  right: 0;
}
</style>
