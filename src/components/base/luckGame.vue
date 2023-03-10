<template>
  <div class="draw-main">
    <div class="draw-close"></div>
    <!-- 抽奖滚动区域 -->
    <div class="draw-wrap">
      <div class="game-box">
        <div
          class="game-item"
          v-for="(cell, j) in new Array(3)"
          :key="j"
          ref="gameItem"
        >
          <ul
            :ref="'ulItem' + j"
            :class="{ not_trans: animateEnd }"
            :style="{
              transition: speed + 'ms ease ' + j * 300 + 'ms',
              transform: 'translate(0px, -' + tHeight(j) + 'px)',
            }"
          >
            <li class="draw-li" v-for="(item, i) in prizeResultArr" :key="i">
              <p class="draw-num">{{ item }}</p>
              <p>积分</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 还未抽奖的时候传空字符串 -->
      <div class="draw-tips">
        <p class="dt-txt" v-if="prizeTxt">恭喜您获得{{ prizeTxt }}积分</p>
      </div>
      <div class="draw-btn">
        <button class="db-b" @click="drawStart">开始抽奖</button>
      </div>
    </div>
    <!-- 手柄 -->
    <div
      class="draw-handle"
      :class="{ active: !animateEnd && chanceSum != 0 }"
    ></div>
    <!-- 礼花 -->
    <div class="draw-lh01"></div>
    <div
      class="draw-lh02"
      :class="{ lucky: animateEnd && chanceSum != 0 }"
    ></div>
    <popupAlert
      :popupMsg="popupInfo"
      ref="tipsPop"
      @onclick="confirm"
    ></popupAlert>
  </div>
</template>

<script>
import popupAlert from "@/components/base/popupAlert";
export default {
  props: {
    // 奖品列表
    prizeArr: {
      type: Array,
      default: () => [],
    },
    // 滚动时间
    speed: {
      type: Number,
      default: 2000,
    },
    // 循环几圈
    circle: {
      type: Number,
      default: 3,
    },
    // 抽奖机会
    chance: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      prizeResultArr: [],
      listHeight: 0,
      randArr: [],
      animateEnd: false,
      prizeTxt: "",
      chanceSum: 0,
      popupInfo: "", // 弹框提示信息
    };
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        for (let i = 0; i < this.circle; i++) {
          for (let j in this.prizeArr) {
            this.prizeResultArr[
              parseInt(j) + parseInt(i) * this.prizeArr.length
            ] = this.prizeArr[j];
          }
        }
      }, 500);
    });
  },
  methods: {
    /*
     * 前端获取中奖随机数（三个数字一样的）
     * n: 随机数组中的元素个数
     * min: 随机数组中的元素的最小值
     * max: 随机数组中的元素的最大值
     */
    getRandArr(n, min, max) {
      let randNo = Math.floor(Math.random() * (max - min + 1)) + min;
      for (let i = 0; i < n; i++) {
        this.randArr[i] = randNo;
      }
    },
    // 开始抽奖
    drawStart() {
      if (this.chanceSum < this.chance) {
        this.chanceSum++;
        this.animateEnd = false;
        this.getRandArr(3, 0, 4);
        this.listHeight = this.$refs.gameItem[0].offsetHeight;
        setTimeout(() => {
          this.animateEnd = true;
          this.prizeTxt = this.prizeArr[this.randArr[0]];
        }, this.speed + 600);
        this.$emit("drawEnd", this.prizeArr[this.randArr[0]], this.chanceSum);
      } else {
        // 抽奖机会用完
        this.popupInfo = "抱歉，抽奖机会用完。下期活动敬请期待！";
        this.$refs.tipsPop.show();
      }
    },
    tHeight(n) {
      if (this.animateEnd) {
        return this.randArr[n] * this.listHeight;
      } else {
        return (
          (this.randArr[n] + this.prizeArr.length * (this.circle - 1)) *
          this.listHeight
        );
      }
    },
    // 弹框-确定
    confirm() {
      this.$refs.tipsPop.hide();
      this.$emit("popConfirm");
    },
  },
  components: {
    popupAlert,
  },
};
</script>

<style lang="less" scoped>
.animW2 {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.draw-main {
  position: relative;
  width: 100%;
  min-height: 550px;
  padding-top: 34px;
  background-color: #fff;
  z-index: 2;
}
.draw-close {
  position: absolute;
  top: 0;
  left: calc(50% + 150px);
  width: 28px;
  height: 48px;
  background: url(../../assets/images/luck/draw_close@2x.png) no-repeat center;
  background-size: 100%;
  cursor: pointer;
  z-index: 10;
}
.draw-wrap {
  /* min-height: 400px; */
  padding-top: 64px;
  background: url(../../assets/images/luck/luckyDraw_bg@2x.png) no-repeat top
    center;
  background-size: 420px 322px;
}
.game-box {
  height: 300px;
}
.draw-tips {
  padding: 14px 0 6px;
  height: 50px;
}
.dt-txt {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  line-height: 30px;
  letter-spacing: 1px;
  text-align: center;
  background: url(../../assets/images/luck/tip@2x.png) no-repeat top center;
  background-size: 372px 30px;
}
.draw-btn {
  height: 210px;
  text-align: center;
  background: url(../../assets/images/luck/draw_btn@2x.png) no-repeat top center;
  background-size: 586px 210px;
}
.db-b {
  position: relative;
  display: inline-block;
  padding: 0 50px;
  font-size: 28px;
  line-height: 48px;
  font-weight: bold;
  color: transparent;
  color: #ffffff\0;
  letter-spacing: 5px;
  background-image: linear-gradient(to right, #fff, #fff2d7);
  background-image: none\0;
  background-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  cursor: pointer;
  border: 0;
  z-index: 10;
}
.draw-handle {
  position: absolute;
  top: 178px;
  left: calc(50% + 165px);
  width: 100px;
  height: 140px;
  background: url(../../assets/images/luck/draw_handle@2x.png) no-repeat center;
  background-size: 100%;
  z-index: -1;
  transition: all 0.3s;
  &.active {
    transform: rotateX(180deg);
    transform-origin: 0 92px;
  }
}

/* 抽奖主内容区域 */
.game-box {
  width: 393px;
  height: 189px;
  margin: 0 auto;
  padding: 20px 10px;
  font-size: 0;
  text-align: center;
  background: url(../../assets/images/luck/luckyDraw_light.gif) no-repeat center;
  background-size: 100%;
  overflow: hidden;
}
.game-item {
  display: inline-block;
  margin: 0 2px 0 3px;
  width: 115px;
  height: 152px;
  overflow: hidden;
  vertical-align: top;
  ul {
    &.not_trans {
      transition: 0s !important;
    }
  }
}
.draw-li {
  list-style: none;
  position: relative;
  width: 100%;
  padding-top: 94px;
  height: 152px;
  font-size: 10px;
  font-weight: bold;
  line-height: 12px;
  color: #feffda;
  text-align: center;
  background: url(../../assets/images/luck/redpacket@2x.png) no-repeat center;
  background-size: 115px 152px;
}
.draw-num {
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  text-align: center;
}
.draw-lh01 {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 608px;
  height: 311px;
  background: url(../../assets/images/luck/lh01@2x.png) no-repeat center;
  background-size: 100%;
}

.draw-lh02 {
  position: absolute;
  top: -60px;
  left: 50%;
  width: 867px;
  height: 545px;
  margin-left: -433px;
  transform: scale(0);
  background: url(../../assets/images/luck/lh02@2x.png) no-repeat center;
  background-size: 100%;
  z-index: -1;
  &.lucky {
    animation: drawLh02 3s linear infinite;
    -webkit-animation: drawLh02 3s linear infinite;
  }
}
/* 礼花动画 */
@keyframes drawLh02 {
  0% {
    transform: scale(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
@-webkit-keyframes drawLh02 {
  0% {
    transform: scale(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.ag-hide {
  display: none !important;
}
</style>
