<template>
  <div :id="id" :style="style"></div>
</template>

<script>
export default {
  mounted() {
    this.darwChart();
  },
  data() {
    return {
      lineChart: null,
    };
  },
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    option: {
      type: Object,
      default() {
        return {
          // xAxis: {
          //   show: false,
          //   type: "category",
          //   boundaryGap: false,
          // },
          // grid: {
          //   top: "20px",
          //   left: "0",
          //   right: "0",
          //   bottom: "1px", // 数值为0的部分能完全显示出来
          //   width: "100%", //图例宽度
          //   // height: "100%", //图例高度
          // },
          // yAxis: {
          //   show: false,
          //   type: "value",
          // },
          // series: [
          //   {
          //     data: [],
          //     type: "line",
          //     symbol: "none",
          //     itemStyle: {
          //       normal: {
          //         lineStyle: {
          //           width: 2, //折线宽度
          //           // opacity: 0.14,
          //           color: {
          //             type: "linear",
          //             x: 0,
          //             y: 0,
          //             x2: 1,
          //             y2: 0,
          //             colorStops: [
          //               {
          //                 offset: 0,
          //                 color: "#90FEDB", // 0% 处的颜色
          //               },
          //               {
          //                 offset: 1,
          //                 color: "#22E4F8", // 100% 处的颜色
          //               },
          //             ],
          //             global: false, // 缺省为 false
          //           },
          //         },
          //         areaStyle: {
          //           opacity: 0.14,
          //           color: {
          //             type: "linear",
          //             x: 0,
          //             y: 0,
          //             x2: 1,
          //             y2: 0,
          //             colorStops: [
          //               {
          //                 offset: 0,
          //                 color: "#90FEDB", // 0% 处的颜色
          //               },
          //               {
          //                 offset: 1,
          //                 color: "#22E4F8", // 100% 处的颜色
          //               },
          //             ],
          //             global: false, // 缺省为 false
          //           },
          //         },
          //       },
          //     },
          //     smooth: true,
          //   },
          // ],
        };
      },
    },
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  methods: {
    darwChart() {
      setTimeout(() => {
        this.lineChart = this.$drawChart(this.id, this.option);
      }, 100);
    },
  },
  watch: {
    option: {
      handler(newVal) {
        if (this.chart) {
          this.chart.setOption(newVal);
        } else {
          this.init();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
