<template>
  <h1>驾驶舱1号</h1>
  <div class="c-wrapper">
    <ul class="c-main cm01">
      <li class="cm-item cmi01">
        <h4>项目一</h4>
        <ul class="cg-main">
          <li class="cg-item cg01">
            <p class="cg-msg">分类一</p>
            <p class="cg-num">1111</p>
          </li>
          <li class="cg-item cg02">
            <p class="cg-msg">分类二</p>
            <p class="cg-num">2222</p>
          </li>
        </ul>
      </li>
      <li class="cm-item cmi06">
        <h4>项目六<span>单位：万元</span></h4>
        <sim-select :optionArr="pList01"></sim-select>
      </li>
      <li class="cm-item cmi09"></li>
    </ul>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";
import simSelect from "../../components/base/simSelect";
export default {
  components: { simSelect },
  data() {
    return {
      pList01: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      // setTimeout(() => {
      this.getData();
      // }, 1000);
    });
  },
  methods: {
    getData() {
      localServer
        .get("/baseD/echartsData01.json")
        .then((res) => {
          this.pList01 = res.data.pList01;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
