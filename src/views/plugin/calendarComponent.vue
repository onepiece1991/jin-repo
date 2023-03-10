<template>
  <div class="con">
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
    ></Calendar>
  </div>
</template>

<script>
/* eslint-disable */
import Calendar from 'vue-calendar-component';
export default {
  components: {
    Calendar
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    }
  },
};
</script>
 