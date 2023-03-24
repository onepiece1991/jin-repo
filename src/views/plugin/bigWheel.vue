<template>
  <div class="cont-box main">
    <div class="cb-left">
      <p class="title">品类</p>
      <div class="checkbox-group">
        <div class="checkbox-item" v-for="(cell, k) in foodList" :key="k">
          <input
            @click="clickCheckbox($event, k, foodList)"
            type="checkbox"
            :id="`xx${k}`"
            :name="cell.text"
            v-model="cell.checkFlag"
          />
          <label :for="`xx${k}`" class="ui-checkbox"></label>
          <label :for="`xx${k}`" class="ui-label">{{ cell.text }}</label>
        </div>
      </div>
      <div class="other">
        其它：<input type="text" v-model="otherVal" class="other-input" />
      </div>
      <button class="confirm" @click="confirmDataList">确定</button>
    </div>
    <div class="cb-right">
      <p class="title">今天吃什么呐？</p>
      <div class="wheel">
        <div
          class="round"
          :class="{ not_roting: !roting }"
          :style="{
            transition: round_time + 'ms',
            transform: 'rotate(' + deg + 'deg)',
          }"
        >
          <!-- 转盘图片 -->
          <img :src="bgImg" alt="大转盘" class="rotate-bgimg" />
          <!-- 内容区域 -->
          <div class="prize" id="prizeBox">
            <div
              class="item-box"
              v-for="(item, i) in prizeList"
              :key="i"
              :style="{
                transform: 'rotate(' + (360 / prizeList.length) * i + 'deg)',
              }"
            >
              <div
                class="item-bg"
                :class="{ transparent: i % 2 != 0 }"
                :style="{ 'border-width': sWidth + 'px' }"
              ></div>
              <div class="prize-item">
                <p class="draw-txt">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 转转 -->
        <div class="start-btn">
          <img :src="startBtn" alt="按钮背景" class="start-img" />
          <button class="rotate-btn" @click="startTurn">转转</button>
        </div>
      </div>
      <p class="tips" v-if="prizeList.length % 2 != 0">
        注：备选种类再加一种或者再减一种吧！
      </p>
    </div>
    <popupAlert
      :popupMsg="tipsTxt"
      ref="tipsPop"
      @onclick="confirmDinner"
    ></popupAlert>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";
import popupAlert from "@/components/base/popupAlert";
const bgImg = require("@/assets/images/draw/bg.png");
const startBtn = require("@/assets/images/draw/start@2x.png");
export default {
  data() {
    return {
      foodList: [],
      otherVal: "",
      prizeList: [],
      bgImg: bgImg,
      startBtn: startBtn,
      roting: false,
      loading: false,
      sWidth: 100,
      deg: 0,
      // 获取到奖品后转盘旋转动画时间
      round_time: 5000,
      tipsTxt: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      localServer
        .get("./baseD/food.json")
        .then((res) => {
          this.foodList = res.data.foodList;
          this.initPrizeList(this.foodList);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    initPrizeList(arr) {
      this.prizeList = [];
      for (let i in arr) {
        let prize = {
          id: "",
          text: "",
        };
        if (arr[i].checkFlag) {
          prize.id = arr[i].id;
          prize.text = arr[i].text;
          this.prizeList.push(prize);
        }
      }
      let sectorDeg = ((2 * Math.PI) / 360) * (360 / this.prizeList.length / 2);
      this.sWidth = (145 * Math.sin(sectorDeg)) / Math.cos(sectorDeg);
      if (this.sWidth < 0) {
        this.sWidth = 0;
      }
    },
    // 开始抽奖
    startTurn() {
      if (this.roting || this.loading) return;
      this.loading = true;
      // 前端生成随机数奖品
      setTimeout(() => {
        let randomNo = Math.floor(Math.random() * this.prizeList.length);
        let activePrize = this.prizeList[randomNo];
        // 使用 some 循环，获取到奖品即停止遍历
        this.prizeList.some((item, index) => {
          if (item.id === activePrize.id) {
            // 获取该奖品的一个随机角度，具体见下方函数注释
            let newDeg = this.getRote(index, this.prizeList.length);
            // roting 为 true 时，转盘有旋转动画，时间为 round_time
            this.roting = true;
            this.deg = newDeg;
            setTimeout(() => {
              // 经过 round_time 的时间后，转盘进行复位，方便下一次抽取，deg 不取 0 而是 NewDeg % 360 以确保用户看不到转盘闪动
              this.roting = false;
              this.deg = newDeg % 360;
              this.tipsTxt = "今天吃" + activePrize.text;
              this.$refs.tipsPop.show();
            }, this.round_time);
            return true;
          }
        });
        this.loading = false;
      }, 100);
    },
    /**
     * 根据奖品获取转盘角度
     * @param {number} index 获得奖品在 prizeList 中的 index
     * @param {number} count 奖品数量
     * @return {number}
     */
    getRote(index, count) {
      if (!count) {
        count = 8;
      }
      const MAX_ROUND = 10;
      const MIN_ROUND = 8;
      const OFFSET_MULTIPLE = 0;
      const unit = 360 / count;
      const offset = Math.floor(Math.random() * -unit) + unit / 2;
      const roundNo = Math.floor(
        Math.random() * (MAX_ROUND - MIN_ROUND + 1) + MIN_ROUND
      );
      const newDeg = 360 * roundNo - unit * index;
      return newDeg + OFFSET_MULTIPLE * offset;
    },
    confirmDinner() {
      this.$refs.tipsPop.hide();
    },
    // 点击复选框更新foodList和prizeList
    clickCheckbox(e, i, objArr) {
      e.stopPropagation();
      objArr[i].checkFlag = !objArr[i].checkFlag;
      this.initPrizeList(objArr);
    },
    // 点击确定-更新转盘信息
    confirmDataList() {
      if (this.otherVal.trim() != "") {
        this.foodList.push({
          id: this.foodList.length,
          text: this.otherVal,
          checkFlag: true,
        });
        this.otherVal = "";
        this.initPrizeList(this.foodList);
      }
    },
  },
  components: {
    popupAlert,
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  // 左边-选择区
  .cb-left {
    width: 40%;
    .confirm {
      display: block;
      width: 80px;
      height: 30px;
      margin: 20px auto;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: #2e8cff;
      border-radius: 4px;
    }
  }
  .cb-right {
    flex: 1;
  }
}
// 复选框
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  .checkbox-item {
    padding: 5px 0;
    width: 33.33%;
    display: flex;
    align-items: center;
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 16px;
      height: 16px;
      filter: alpha(opacity=0);
      cursor: pointer;
      z-index: -1;
      &:checked + .ui-checkbox {
        background-image: url(../../assets/images/check.png);
      }
    }

    .ui-checkbox {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../assets/images/uncheck.png) no-repeat;
      overflow: hidden;
      vertical-align: top;
    }
    .ui-label {
      padding-left: 3px;
    }
  }
}
// 右边-大转盘
.title {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
  line-height: 22px;
  font-weight: bold;
}
.wheel {
  position: relative;
  width: 358px;
  height: 358px;
  margin: 0 auto;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    height: 340px;
    background: url(../../assets/images/draw/light@2x.png) no-repeat;
    background-size: 100%;
    z-index: 2;
  }
  .round {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 抽完奖后复位时，旋转不需要过渡时间 */
    &.not_roting {
      transition: 0s !important;
    }
    .rotate-bgimg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .prize {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 290px;
      height: 290px;
      border-radius: 50%;
      overflow: hidden;
      .item-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .item-bg {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-top-color: #fff;
          border-top-width: 145px !important;
          &.transparent {
            border-top-color: transparent;
          }
        }
        .prize-item {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          .draw-txt {
            width: 16px;
            font-size: 13px;
            font-weight: bold;
            line-height: 20px;
            color: #2e8cff;
            text-align: center;
          }
        }
      }
    }
  }
}

/* 开始抽奖 居中 */
.start-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 97px;
  height: 108px;
  transform: translate(-50%, -50%);
  z-index: 10;
  .start-img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .rotate-btn {
    position: absolute;
    left: 0;
    top: 7px;
    width: 97px;
    height: 97px;
    font-size: 22px;
    line-height: 25px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
    border: 0;
    background-color: transparent;
  }
}
// 奇数条显示提示
.tips {
  color: #f65a5a;
  text-align: center;
}
</style>
