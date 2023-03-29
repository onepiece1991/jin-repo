<template>
  <div class="cont-box">
    <div class="c-header">
      <div class="c-btn" @click="prevYear">&lt;&lt;</div>
      <div class="c-btn" @click="prevMonth">&lt;</div>
      <div class="c-seleced">{{ selectedYear }}年{{ selectedMonth }}月</div>
      <div class="c-btn" @click="nextMonth">&gt;</div>
      <div class="c-btn" @click="nextYear">&gt;&gt;</div>
    </div>
    <div class="content-box">
      <!-- thead -->
      <div class="content-thead">
        <div class="content-th" v-for="(thTxt, i) in thList" :key="i">
          {{ thTxt }}
        </div>
      </div>
      <div class="content-row" v-for="(item, j) in tbodyList" :key="j">
        <div class="content-td" v-for="(cell, k) in item.tdList" :key="k">
          <div
            class="cell-box"
            :class="{
              other: cell.otherMonth,
              festival: cell.festivalDay,
              'cell-weekday-box': cell.sign == '班',
              'cell-weekend-box': cell.sign == '休',
              selected: cellSelected(j, k),
              today: currentStyle(j, k),
            }"
            :data-date="
              cell.yearNo.toString() +
              '-' +
              cell.monthNo.toString() +
              '-' +
              cell.daynumber.toString()
            "
            @click="clickDate(j, k)"
          >
            <div class="cell-holiday-sign">{{ cell.sign }}</div>
            <div class="cell-daynumber" :class="{ weekend: cell.weekendsDay }">
              <span class="number">{{ cell.daynumber }}</span>
            </div>
            <div class="cell-almanac" v-if="currentStyle(j, k)">今天</div>
            <div class="cell-mark" v-if="markStyle(j, k)"><i></i></div>
          </div>
        </div>
      </div>
    </div>
    <button class="back-today" ref="todayS" @click="backtoToday">
      返回今天
    </button>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";

const Nowtime = new Date();
//当前年份
const currYear = Nowtime.getFullYear();
//当前月份
const currMonth = Nowtime.getMonth() + 1;
//当前日
const currDay = Nowtime.getDate();

export default {
  props: {
    markDate: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      weekdays: [], // 班
      weekends: [], // 休
      currYear: currYear,
      currMonth: currMonth,
      currDay: currDay,
      thList: ["一", "二", "三", "四", "五", "六", "日"],
      yearList: [], //年份列表
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      tbodyList: [],
      selectedDay: "",
      isFestivalDay: false,
    };
  },
  created() {
    this.selectedYear = this.currYear;
    this.selectedMonth = this.currMonth;
    this.selectedDay = this.currDay;
    // 年份列表
    for (let i = 1900; i <= 2050; i++) {
      this.yearList[i - 1900] = i;
    }
    this.getWeekData();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initCalendar(this.selectedYear, this.selectedMonth);
      }, 200);
    });
  },
  methods: {
    initCalendar(y, m) {
      this.createCalendar(y, m);
    },
    getWeekData() {
      localServer
        .get("./baseD/week.json")
        .then((res) => {
          this.weekdays = res.data.weekdays;
          this.weekends = res.data.weekends;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    // 今天
    currentStyle(i1, i2) {
      let dayInfo = this.tbodyList[i1].tdList[i2];
      if (
        dayInfo.yearNo == this.currYear &&
        dayInfo.monthNo == this.currMonth &&
        dayInfo.daynumber == this.currDay
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 选中
    cellSelected(j1, j2) {
      let dayInfo2 = this.tbodyList[j1].tdList[j2];
      if (
        dayInfo2.yearNo == this.selectedYear &&
        dayInfo2.monthNo == this.selectedMonth &&
        dayInfo2.daynumber == this.selectedDay
      ) {
        // 如果被选中的是节假日当天
        if (dayInfo2.festivalDay) {
          this.isFestivalDay = true;
        } else {
          this.isFestivalDay = false;
        }
        return true;
      } else {
        return false;
      }
    },
    // 根据年月绘制表格，年月变动则重新绘制
    createCalendar(y, m) {
      //先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
      let fixedDate = this.setdateinfo(y, m, 1);
      //当前月第一天星期几,星期一到星期日的值分别是1-2-3-4-5-6-0
      let firstDay = fixedDate.getDay();
      //上个月的最后一天是星期几
      let pervLastDay;
      if (firstDay != 0) {
        pervLastDay = firstDay - 1;
      } else {
        pervLastDay = 6;
      }
      //得到上个月最后一天;
      let pervMonthlastDay = this.getPervMonthLastDay(y, m);
      //上月最后几天循环
      let lastdays = pervMonthlastDay - pervLastDay + 1;
      let tbodyListResult = [];
      let tdListResult = [];
      // tdData = {
      //   sign: "",  取值：“班”;“休”
      //   yearNo: 年
      //   monthNo: 月
      //   daynumber: "", 公立日期
      //   almanac: "", 今天（old：农历日期）
      //   weekendsDay: Boolean, 是否是周末
      //   otherMonth: Boolean, 上个月和下个月取值true,当前月取值false
      //   festivalDay: Boolean, 是否是假日当天
      // };
      for (let previ = lastdays; previ <= pervMonthlastDay; previ++) {
        let tdData = {
          // sign: this.signDayTxt(y, m - 1, previ),
          sign: this.signDayTxt(
            parseInt(m) - 1 > 0 ? y : parseInt(y) - 1,
            parseInt(m) - 1 > 0 ? parseInt(m) - 1 : 12,
            previ
          ),
          yearNo: parseInt(m) - 1 > 0 ? y : parseInt(y) - 1,
          monthNo: parseInt(m) - 1 > 0 ? parseInt(m) - 1 : 12,
          daynumber: previ,

          weekendsDay: false,
          otherMonth: true,
        };
        // if (JCLunar.solar2lunar(y, m, previ).nWeek > 5) {
        //   tdData.weekendsDay = true;
        // }
        tdListResult.push(tdData);
      }

      //这个月开始的循环
      //这个月startDays的取值 1-2-3-4-5-6-7
      let startDays = 8 - firstDay == 8 ? 1 : 8 - firstDay;
      for (let curri = 1; curri <= startDays; curri++) {
        let tdData2 = {
          sign: this.signDayTxt(y, m, curri),
          yearNo: y,
          monthNo: m,
          daynumber: curri,
          weekendsDay: false,
          otherMonth: false,
        };
        // if (JCLunar.solar2lunar(y, m, curri).nWeek > 5) {
        //   tdData2.weekendsDay = true;
        // }
        tdListResult.push(tdData2);
      }

      tbodyListResult.push({ tdList: tdListResult });

      // 指定年月最后一天
      let currMonthLashDay = this.getCurrMonthLashDay(y, m);
      // 当月除开第一行的起点
      // let currmonthStartDay = startDays + 1;
      // 当月还剩余的天数
      // let restDays = currMonthLashDay - startDays;
      // 循环次数-每个月都有6行，就不需要计算循环次数；
      let loopT = 5;
      // if (this.check(restDays / 7)) {
      //   //是小数
      //   loopT = Math.ceil(restDays / 7); //向上取整
      // } else {
      //   loopT = restDays / 7;
      // }
      //这是下个月开始的变量;
      let lastFirstDay = 1;
      let tbodyListResult3 = [];
      for (let i = 0; i < loopT; i++) {
        let tdListResult3 = [];
        for (let j = 0; j < 7; j++) {
          let tdData3 = {
            sign: "",
            yearNo: "",
            monthNo: "",
            daynumber: "",
            almanac: "",
            weekendsDay: false,
            otherMonth: false,
            festivalDay: "",
          };
          if (startDays == 0) {
            tdData3.sign = this.signDayTxt(
              parseInt(m) + 1 == 13 ? parseInt(y) + 1 : y,
              parseInt(m) + 1 == 13 ? 1 : parseInt(m) + 1,
              lastFirstDay
            );
            tdData3.yearNo = parseInt(m) + 1 == 13 ? parseInt(y) + 1 : y;
            tdData3.monthNo = parseInt(m) + 1 == 13 ? 1 : parseInt(m) + 1;
            tdData3.daynumber = lastFirstDay;
            tdData3.otherMonth = true;
            lastFirstDay++;
          } else {
            startDays++;
            tdData3.sign = this.signDayTxt(y, m, startDays);
            tdData3.yearNo = y;
            tdData3.monthNo = m;
            tdData3.daynumber = startDays;
            tdData3.otherMonth = false;
            if (startDays == currMonthLashDay) {
              //下个月
              startDays = 0;
            }
          }
          tdListResult3.push(tdData3);
        }
        tbodyListResult3.push({ tdList: tdListResult3 });
      }
      this.tbodyList = tbodyListResult.concat(tbodyListResult3);
    },
    //根据传入的年月日获取具体的时间信息
    setdateinfo(year, month, day) {
      let date1 = new Date();
      date1.setFullYear(parseInt(year));
      date1.setMonth(parseInt(month) - parseInt(1), parseInt(day));
      return date1;
    },
    //得到指定月的上个月最后一天传进来按 12月算
    getPervMonthLastDay(year, month) {
      //当月就是  month-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
      return parseInt(new Date(year, month - 1, 0).getDate());
    },
    // 计算是否是节假日

    // 得到指定月最后一天，传进来按 12月算
    getCurrMonthLashDay(year, month) {
      if (month >= 12) {
        year = year + 1;
        month = month - 12;
      }
      return parseInt(new Date(year, month, 0).getDate());
    },
    //判断c是否是小数
    check(c) {
      let r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
      return r.test(c);
    },
    // 判断日期是“休”,“班”还是“”
    signDayTxt(y, m, d) {
      // weekdays: return "班"
      // weekends: return "休"
      for (let i in this.weekdays) {
        let weekDTxt = this.weekdays[i];
        let weekDArr = weekDTxt.split("-");
        if (
          parseInt(weekDArr[0]) == y &&
          parseInt(weekDArr[1]) == m &&
          parseInt(weekDArr[2]) == d
        ) {
          return "班";
        }
      }
      for (let j in this.weekends) {
        let weekETxt = this.weekends[j];
        let weekEArr = weekETxt.split("-");
        if (
          parseInt(weekEArr[0]) == y &&
          parseInt(weekEArr[1]) == m &&
          parseInt(weekEArr[2]) == d
        ) {
          return "休";
        }
      }
      return "";
    },
    // 点击某一天
    clickDate(m, n) {
      let dateInfo = this.tbodyList[m].tdList[n];
      this.selectedYear = dateInfo.yearNo;
      this.selectedMonth = dateInfo.monthNo;
      this.selectedDay = dateInfo.daynumber;
      this.initCalendar(this.selectedYear, this.selectedMonth);
      this.$emit("choseDay");
    },
    // 去年
    prevYear() {
      this.selectedYear = parseInt(this.selectedYear) - 1;
      this.initCalendar(this.selectedYear, this.selectedMonth);
    },
    // 明年
    nextYear() {
      this.selectedYear = parseInt(this.selectedYear) + 1;
      this.initCalendar(this.selectedYear, this.selectedMonth);
    },
    // 上一个月
    prevMonth() {
      this.selectedYear =
        parseInt(this.selectedMonth) - 1 > 0
          ? this.selectedYear
          : parseInt(this.selectedYear) - 1;
      this.selectedMonth =
        parseInt(this.selectedMonth) - 1 > 0
          ? parseInt(this.selectedMonth) - 1
          : 12;
      this.initCalendar(this.selectedYear, this.selectedMonth);
      this.$emit("changeMonth");
    },
    // 下一个月
    nextMonth() {
      this.selectedYear =
        parseInt(this.selectedMonth) + 1 > 12
          ? parseInt(this.selectedYear) + 1
          : this.selectedYear;

      this.selectedMonth =
        parseInt(this.selectedMonth) + 1 > 12
          ? 1
          : parseInt(this.selectedMonth) + 1;
      this.initCalendar(this.selectedYear, this.selectedMonth);
      this.$emit("changeMonth");
    },
    // 返回今天
    backtoToday() {
      this.selectedYear = this.currYear;
      this.selectedMonth = this.currMonth;
      this.selectedDay = this.currDay;
      this.initCalendar(this.currYear, this.currMonth);
      this.$emit("isToday");
    },
    // 标记
    markStyle(i1, i2) {
      let dayInfo = this.tbodyList[i1].tdList[i2];
      for (let i in this.markDate) {
        let markArr = this.markDate[i].split("/");
        if (
          markArr[0] == dayInfo.yearNo &&
          markArr[1] == dayInfo.monthNo &&
          markArr[2] == dayInfo.daynumber
        ) {
          return true;
        } else continue;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.c-header {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  .c-btn {
    margin: 0 5px;
    width: 30px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #2e8cff;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .c-seleced {
    margin: 0 5px;
    width: 120px;
    font-size: 14px;
    line-height: 20px;
    color: #2e8cff;
    font-weight: bold;
    text-align: center;
  }
}
// 回到今天
.back-today {
  position: relative;
  right: calc(-100% + 68px);
  margin-top: 20px;
  width: 68px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background: #2e8cff;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #315efb;
  }
}

// 具体日期区域
.content-box {
  user-select: none;
  .content-thead {
    margin-top: 14px;
    justify-content: center;
    align-items: center;
    height: 36px;
    display: flex;
    .content-th {
      flex: 1;
      height: 13px;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #333333;
      text-align: center;
      line-height: 13px;
    }
  }
  .content-row {
    display: flex;
    .content-td {
      flex: 1;
      padding: 2px;
      .cell-box {
        position: relative;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        height: 56px;
        padding: 4px 2px 2px 2px;
        box-sizing: border-box;
        border: 2px solid transparent;
        overflow: hidden;
        line-height: 1;
        zoom: 1;
        cursor: pointer;
        .cell-holiday-sign {
          position: absolute;
          left: 4px;
          top: 4px;
          color: #f73131;
          font-size: 12px;
          line-height: 12px;
        }
        .cell-daynumber {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          line-height: 30px;
          color: #000;
          text-align: center;
          .number {
            width: 30px;
            height: 30px;
            background-color: transparent;
            border-radius: 50%;
          }
          &.weekend {
            color: #f73131;
          }
        }
        .cell-almanac {
          color: #333;
          font-size: 12px;
          text-align: center;
        }
        &.selected {
          border: 2px solid #bdbfc8;
        }
        &.today {
          border: 2px solid #4e6ef2 !important;
          .number {
            background-color: #2e8cff;
            color: #fff;
          }
        }
        &.cell-weekend-box {
          background: #fde3e4;
          &:hover {
            border: 2px solid #f38686 !important;
          }
        }
        &.cell-weekday-box {
          background: #f5f5f6;
          .cell-holiday-sign {
            color: #626675;
          }
          .cell-daynumber {
            &.weekend {
              color: #000;
            }
          }
        }
        &.other {
          filter: alpha(opacity=40);
          opacity: 0.4;
        }
        &:hover {
          border-color: #bdbfc8;
        }
        // &.festival {
        //   &.selected {
        //     border: 2px solid #f38686 !important;
        //   }
        // }
        &.cell-weekend-box {
          &.selected {
            border: 2px solid #f38686 !important;
          }
        }
      }
    }
  }
}

// 标记
.cell-mark {
  display: flex;
  justify-content: center;
  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #f0f;
  }
}
@media screen and (max-width: 500px) {
  .back-today {
    right: calc(-100% + 0.68rem);
    margin-top: 0.2rem;
    width: 0.68rem;
    height: 0.3rem;
    font-size: 0.12rem;
    line-height: 0.3rem;
    border-radius: 0.06rem;
  }
}
</style>
