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
        return {};
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
