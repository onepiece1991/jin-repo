<template>
  <div class="cont-box">
    <LuckGame
      :prizeArr="prizeData"
      :speed="speedTime"
      :circle="circleNum"
      :chance="chanceNo"
      @drawEnd="draw"
    ></LuckGame>
  </div>
</template>

<script>
import LuckGame from "@/components/base/luckGame";
export default {
  data() {
    return {
      prizeData: [10000, 20000, 30000, 40000, 50000], // 奖品列表
      speedTime: 2000, // 完成滚动时间
      circleNum: 3, // 循环圈数
      chanceNo: 2, // 抽奖次数
    };
  },
  methods: {
    // 点击开始抽奖
    // data01: 抽中的奖品
    // data02: 抽了几次
    draw(data01, data02) {
      console.log("抽中" + data01 + "积分");
      console.log("总共用了" + data02 + "次机会");
    },
  },
  components: {
    LuckGame,
  },
};
</script>

<style lang="less" scoped></style>
