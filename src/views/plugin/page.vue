<template>
  <div class="cont-box">
    <Pagination :dataList="pmList" :size="sizeNum" @getCurrentPage="getPage">
      <table class="pm-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>年龄</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in resultData" :key="i">
            <td>{{ currentIndex(i) }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
          </tr>
        </tbody>
      </table>
    </Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/base/pagination";
export default {
  data() {
    return {
      pmList: [],
      resultData: [],
      currentPage: 1, // 当前页面
      sizeNum: 10, // 每页显示的行数
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initData();
      this.initResultData();
    });
  },
  methods: {
    // 获取数据
    initData() {
      let datalength = 50;
      for (let i = 1; i <= datalength; i++) {
        let pmObj = {
          name: "人物" + i,
          age: Math.ceil(15 * (1 + Math.random())),
        };
        this.pmList.push(pmObj);
      }
    },
    // 根据当前页码currentPage来决定显示的数据
    initResultData() {
      this.resultData = [];
      let startRow = (this.currentPage - 1) * this.sizeNum;
      let endRow = this.currentPage * this.sizeNum;
      for (let j = startRow; j < endRow; j++) {
        this.resultData.push(this.pmList[j]);
      }
    },
    // 获取当前页码值currentPage；重新获取显示的数据
    getPage(num) {
      this.currentPage = num;
      this.initResultData();
    },
    // 序号
    currentIndex(n) {
      return (this.currentPage - 1) * this.sizeNum + n + 1;
    },
  },
  components: {
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.pm-table {
  width: 100%;
  th,
  td {
    padding: 5px;
    border-collapse: collapse;
    border: 1px solid #eee;
    font-size: 14px;
    line-height: 20px;
  }
  th {
    color: #fff;
    background-color: rgba(39, 163, 230, 1);
  }
}
</style>
