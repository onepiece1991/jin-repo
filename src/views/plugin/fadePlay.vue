<template>
  <div class="cont-box">
    <div class="fade-container" @mouseover="stopFade" @mouseout="continueFade">
      <ul class="fade-wrapper">
        <li
          :class="['fade-item', currentIndex == i ? 'active' : '']"
          v-for="(item, i) in fadeList"
          :key="'item' + i"
        >
          <div class="fade-div">fade-item {{ i + 1 }}</div>
        </li>
      </ul>
      <div class="location-wrapper">
        <div
          :class="['local-item', currentIndex == k ? 'active' : '']"
          v-for="(loc, k) in fadeList"
          :key="'index' + k"
          @click="localIndex(k)"
        ></div>
      </div>
      <button class="arrow-L" @click="prevOne">&lt;</button>
      <button class="arrow-R" @click="nextOne">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fadeList: ["", "", "", "", "", "", ""],
      //定时器触发时间
      timeT: 2000, //2s触发一次定时器
      //左右箭头是否显示
      arrowShow: true,
      // 默认选中第一个
      currentIndex: 0,
      // 定时器
      timer: null,
    };
  },
  methods: {
    startAnimate() {
      this.timer = setInterval(() => {
        //需要做的事情
        this.nextOne();
        console.log(this.currentIndex);
      }, this.timeT);
    },
    nextOne() {
      if (this.currentIndex < this.fadeList.length - 1) this.currentIndex++;
      else this.currentIndex = 0;
    },
    prevOne() {
      if (this.currentIndex > 0) this.currentIndex--;
      else this.currentIndex = this.fadeList.length - 1;
    },
    clear() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 鼠标移上停止动画
    stopFade() {
      this.clear();
    },
    // 鼠标移走开始动画
    continueFade() {
      this.startAnimate();
    },
    // 点击小圆点
    localIndex(m) {
      this.currentIndex = m;
    },
  },
  mounted() {
    this.startAnimate();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.fade-container {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  .fade-wrapper {
    position: relative;
    height: 300px;
    .fade-item {
      position: absolute;
      width: 100%;
      opacity: 0;
      z-index: 1;
      transition: all 1s;
      &.active {
        opacity: 1;
        z-index: 100;
      }
      .fade-div {
        line-height: 300px;
        height: 300px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: #016aa3;
      }
      &:nth-child(2n) {
        .fade-div {
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
    white-space: nowrap;
    .local-item {
      display: inline-block;
      margin: 0 10px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: #999;
      cursor: pointer;
      transition: all 0.5s;
      &.active {
        width: 20px;
        background: #fff;
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
@media screen and (max-width: 500px) {
  .arrow-L,
  .arrow-R {
    width: 1rem;
    height: 3rem;
    font-size: 0.5rem;
    line-height: 3rem;
  }
  .local-item {
    margin: 0 0.1rem;
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 0.05rem;
    &.active {
      width: 0.2rem;
    }
  }
}
</style>
