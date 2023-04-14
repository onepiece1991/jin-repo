<template>
  <div class="cont-box mb20">
    <input
      class="input"
      type="text"
      v-model="inputVal01"
      placeholder="请输入大于等于5的数字"
    />
    <input
      class="input"
      type="text"
      v-model="inputVal02"
      placeholder="请输入大于等于2的数字"
    />
    <button class="button" @click="gotoCP">生成</button>
    <button class="button" @click="colourless = true">无色版</button>
    <button class="button" @click="colourless = false">有色版</button>
  </div>
  <div v-for="(item, n) in numSum" :key="n">
    <span
      v-for="(item01, i) in item.redList"
      :key="i"
      :class="{ red: !colourless }"
      >{{ item01 }}</span
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      v-for="(item02, j) in item.blueList"
      :key="j"
      :class="{ blue: !colourless }"
      >{{ item02 }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal01: "",
      inputVal02: "",
      currentIndex: 0,
      numSum: [],
      colourless: false, // 默认是有颜色的
    };
  },
  methods: {
    // 出号
    gotoCP() {
      var cp1 = this.inputVal01;
      var cp2 = this.inputVal02;

      if (!cp1) {
        cp1 = 5;
      }
      if (!cp2) {
        cp2 = 2;
      }
      if (cp1 < 5) {
        alert("第一个输入框请输入大于等于5的数字");
        return;
      }
      if (cp2 < 2) {
        alert("第二个输入框请输入大于等于2的数字");
        return;
      }
      var max1 = 35;
      var max2 = 12;
      // var len = cp1 + cp2;
      var arr1 = [];
      var arr2 = [];
      var new_arr1 = [];
      var new_arr2 = [];
      for (var i = 0; ; i++) {
        arr1[i] = Math.ceil(Math.random() * max1);
        let items = arr1[i];

        if (new_arr1.indexOf(items) == -1) {
          new_arr1.push(items);
        }
        if (new_arr1.length == 6) {
          break;
        }
      }
      // 排序
      this.sortArr(new_arr1, cp1);

      for (let j = 0; ; j++) {
        arr2[j] = Math.ceil(Math.random() * max2);
        let items = arr2[j];
        if (new_arr2.indexOf(items) == -1) {
          new_arr2.push(items);
        }
        if (new_arr2.length == cp2) {
          break;
        }
      }
      // 排序
      this.sortArr(new_arr2, cp2);
      this.numSum.push({ redList: new_arr1, blueList: new_arr2 });
      this.currentIndex++;
    },
    // 排序
    sortArr(arr, len) {
      for (var k = 0; k < len; k++) {
        for (var m = k + 1; m < len; m++) {
          if (arr[k] > arr[m]) {
            var s = arr[k];
            arr[k] = arr[m];
            arr[m] = s;
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mb20 {
  margin-bottom: 20px;
}
.input {
  display: inline-block;
  margin: 10px;
  padding-left: 10px;
  width: 260px;
  font-size: 14px;
  line-height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.button {
  margin-left: 10px;
  padding: 0 15px;
  font-size: 16px;
  line-height: 42px;
  color: #fff;
  background: #00a4ea;
  border-radius: 6px;
}

span {
  display: inline-block;
  margin: 0 5px;
  width: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 50%;
  &.red {
    border-color: #f00;
    color: #f00;
  }
  &.blue {
    border-color: #00a4ea;
    color: #00a4ea;
  }
}
</style>
