<template>
  <div class="s-select" :style="{ width: sWidth + 'px' }">
    <p class="s-txt">{{ defaultTxt }}</p>
    <ul class="s-box">
      <li class="s-list" v-for="(item, i) in optionArr" :key="'option' + i">
        {{ item.txt }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    optionArr: {
      type: Array,
      default: () => [],
    },
    sWidth: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      defaultTxt: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(this.optionArr);
        this.defaultTxt = this.optionArr[0].txt;
      }, 200);
    });
  },
};
</script>

<style lang="less" scoped></style>
