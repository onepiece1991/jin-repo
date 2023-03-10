<template>
  <div class="cont-box">
    <p>选中的日期: {{ selectedDay }}</p>
    <Date
      ref="date"
      @choseDay="clickdDay"
      @changeMonth="clickMonth"
      @isToday="clickToday"
      :markDate="markDateArr"
    ></Date>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";
import Date from "@/components/base/date";
// choseDay： 选中某天调用的方法，返回选中的日期 YY-MM-DD; 默认：无	（非必传）
// changeMonth： 切换月份调用的方法，返回切换到某月的日期 YY-MM-DD; 默认：无	（非必传）
// isToday： 切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天; 默认：无	（非必传）
// markDate： 如果需要某月的几天被标注，传当月的日期数组。如["2018/2/2","2018/2/6"]被会标注（相同的标记）; 默认：空数组	（非必传）
// agoDayHide： 某个日期以前的不允许点击,时间戳长度是 10 位; 默认：0	（非必传）
// futureDayHide： 某个日期以后的不允许点击,时间戳长度是 10 位; 默认：很大	（非必传）
// sundayStart： 默认是周一开始 当是true的时候 是周日开始; 默认：false	（非必传）
// textTop：日历头部的文字，默认是 [ '一', '二', '三', '四', '五', '六', '日'] ，可以根据自己的需求进行不同的修改。

export default {
  data() {
    return {
      selectedDay: "",
      markDateArr: [],
      sY: "",
      sM: "",
      sD: "",
    };
  },
  created() {
    this.getWeekData();
  },
  mounted() {
    this.$nextTick(() => {
      this.initSelectedDate();
    });
  },
  methods: {
    // 得到选中的年（sY）月（sM）日（sD）; 选中的日期selectedDay:YY-MM-DD
    initSelectedDate() {
      this.sY = this.$refs.date.selectedYear;
      this.sM = this.$refs.date.selectedMonth;
      this.sD = this.$refs.date.selectedDay;
      this.selectedDay =
        this.sY +
        "-" +
        ("00" + this.sM).substr(-2, 2) +
        "-" +
        ("00" + this.sD).substr(-2, 2);
    },
    // 选中某天
    clickdDay() {
      this.initSelectedDate();
    },
    // 切换月份
    clickMonth() {
      this.initSelectedDate();
    },
    // 点击返回今天
    clickToday() {
      this.initSelectedDate();
    },
    getWeekData() {
      localServer
        .get("/baseD/mark.json")
        .then((res) => {
          this.markDateArr = res.data.markDate;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
  components: { Date },
};
</script>

<style lang="less" scoped></style>
