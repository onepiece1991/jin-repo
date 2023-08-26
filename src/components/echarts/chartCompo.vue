<template>
  <div :id="id" :style="style"></div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.darwChart();
      }, 100);
    });
  },
  data() {
    return {
      chart: null,
    };
  },
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      default: () => {},
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
      this.chart = this.$drawChart(this.id, this.option);
    },
  },
  watch: {
    option: {
      handler(newVal) {
        if (this.chart) {
          this.chart.setOption(newVal);
        } else {
          this.darwChart();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
