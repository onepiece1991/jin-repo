<template>
  <div class="calendar-wrapper" :class="{ 'festival-box': isFestivalDay }">
    <div class="calendar-container">
      <div class="calendar-box-left">
        <div class="header-box">
          <div class="header-block-1">
            <div class="year-select" ref="yearS">
              <div class="year-cont">
                <span :title="selectedYear + '年'">{{ selectedYear }}年</span>
              </div>
              <i class="arrow-down" :class="{ up: yearDown }"></i>
            </div>
            <div ref="yearScrollBox">
              <scroll-bar
                @onclickYear="changeYear($event)"
                :showYearList="yearDown"
                :selectedYear="selectedYear"
              ></scroll-bar>
            </div>
          </div>
          <div class="header-block-2">
            <i class="prev-month" @click="prevMonth"></i>
            <div class="month-select" ref="monthS">
              <div class="month-cont">
                <span :title="selectedMonth + '月'">{{ selectedMonth }}月</span>
              </div>
              <i class="arrow-down" :class="{ up: monthDown }"></i>
            </div>
            <i class="next-month" @click="nextMonth"></i>
            <div class="month-wrapper" v-show="monthDown">
              <div class="month-main">
                <div
                  class="select-item"
                  v-for="(mitem, j) in monthList"
                  :key="j"
                  @click="changeMonth(j)"
                >
                  {{ mitem }}月
                </div>
              </div>
            </div>
          </div>
          <div class="header-block-3">
            <div class="holiday-select" ref="holidayS">
              <div class="holiday-cont">
                <span :title="selectedHoliday">{{ selectedHoliday }}</span>
              </div>
              <i class="arrow-down" :class="{ up: holidayDown }"></i>
            </div>
            <div class="holiday-wrapper" v-show="holidayDown">
              <div class="holiday-main">
                <div
                  class="select-item"
                  v-for="(hitem, k) in holidayList"
                  :key="k"
                  @click="changeHoliday(k)"
                >
                  {{ hitem }}
                </div>
              </div>
            </div>
          </div>
          <button class="back-today" ref="todayS" @click="backtoToday">
            返回今天
          </button>
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
                <div
                  class="cell-daynumber"
                  :class="{ weekend: cell.weekendsDay }"
                >
                  {{ cell.daynumber }}
                </div>
                <div class="cell-almanac">{{ cell.almanac }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-box-right">
        <p class="calendar-right-date">{{ selectedDate }}</p>
        <p class="calendar-right-day">{{ selectedDay }}</p>
        <div class="calendar-right-lunar">
          <p>{{ selectedLunarDay }}</p>
          <p>{{ selectedLunarYear }}</p>
          <p>{{ selectedLunarMD }}</p>
        </div>
        <div class="calendar-right-almanacbox">万<br />事<br />皆<br />宜</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as JCLunar from "@/utility/lunar";
import scrollBar from "@/components/scrollBar";
import { localServer } from "@/utility/global";

const Nowtime = new Date();
//当前年份
const currYear = Nowtime.getFullYear();
//当前月份
const currMonth = Nowtime.getMonth() + 1;
//当前日
const currDay = Nowtime.getDate();

export default {
  components: { scrollBar },
  data() {
    return {
      weekdays: [], // 班
      weekends: [], // 休
      Nowtime: Nowtime,
      currYear: currYear,
      yearDown: false,
      currMonth: currMonth,
      monthDown: false,
      holidayDown: false,
      currDay: currDay,
      holidays: [
        "假期安排",
        "元旦",
        "除夕",
        "春节",
        "清明节",
        "劳动节",
        "端午节",
        "中秋节",
        "国庆节",
      ],
      thList: ["一", "二", "三", "四", "五", "六", "日"],
      // hVal: [],
      yearList: [], //年份列表
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      holidayList: [
        "假期安排",
        "元旦",
        "除夕",
        "春节",
        "清明节",
        "劳动节",
        "端午节",
        "中秋节",
        "国庆节",
      ],
      tbodyList: [],
      selectedDate: "",
      selectedDay: "",
      selectedLunar: "",
      selectedLunarDay: "",
      selectedLunarYear: "",
      selectedLunarMD: "",
      isFestivalDay: false,
      // 下拉列表
      showOption: false,
    };
  },
  created() {
    this.selectedYear = this.currYear;
    this.selectedMonth = this.currMonth;
    this.selectedDay = this.currDay;
    this.selectedHoliday = this.holidayList[0];
    // 年份列表
    for (let i = 1900; i <= 2050; i++) {
      this.yearList[i - 1900] = i;
    }
    this.getWeekData();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initCalendar(
          this.selectedYear,
          this.selectedMonth,
          this.selectedDay
        );
      }, 10);
      document.addEventListener("click", (e) => {
        if (
          this.$refs.yearS ||
          this.$refs.yearScrollBox ||
          this.$refs.monthS ||
          this.$refs.holidayS
        ) {
          if (this.$refs.yearS.contains(e.target)) {
            this.yearDown = !this.yearDown;
            this.monthDown = false;
            this.holidayDown = false;
          } else if (this.$refs.yearScrollBox.contains(e.target)) {
            this.yearDown = true;
            this.monthDown = false;
            this.holidayDown = false;
          } else if (this.$refs.monthS.contains(e.target)) {
            this.monthDown = !this.monthDown;
            this.yearDown = false;
            this.holidayDown = false;
          } else if (this.$refs.holidayS.contains(e.target)) {
            this.holidayDown = !this.holidayDown;
            this.yearDown = false;
            this.monthDown = false;
          } else {
            this.yearDown = false;
            this.monthDown = false;
            this.holidayDown = false;
          }
        }
      });
    });
  },
  methods: {
    initCalendar(y, m, d) {
      this.createCalendar(y, m);
      // 设置日历右边的信息
      this.setRight(y, m, d);
    },
    getWeekData() {
      localServer
        .get("/baseD/week.json")
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
    changeYear(n) {
      this.selectedYear = this.yearList[n];
      this.selectedHoliday = "假期安排";
      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
      this.yearDown = false;
    },
    changeMonth(m) {
      this.selectedMonth = this.monthList[m];
      this.selectedHoliday = "假期安排";
      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
      this.monthDown = false;
    },
    changeHoliday(s) {
      this.selectedHoliday = this.holidayList[s];
      if (this.selectedHoliday == "元旦") {
        this.selectedMonth = 1;
        this.selectedDay = 1;
      } else if (this.selectedHoliday == "除夕") {
        this.selectedMonth = JCLunar.lunar2solar(
          this.selectedYear,
          1,
          0
        ).cMonth;
        this.selectedDay = JCLunar.lunar2solar(this.selectedYear, 1, 0).cDay;
      } else if (this.selectedHoliday == "春节") {
        this.selectedMonth = JCLunar.lunar2solar(
          this.selectedYear,
          1,
          1
        ).cMonth;
        this.selectedDay = JCLunar.lunar2solar(this.selectedYear, 1, 1).cDay;
      } else if (this.selectedHoliday == "清明节") {
        this.selectedMonth = 4;
        this.selectedDay = JCLunar.getTerm(this.selectedYear, 7);
      } else if (this.selectedHoliday == "劳动节") {
        this.selectedMonth = 5;
        this.selectedDay = 1;
      } else if (this.selectedHoliday == "端午节") {
        this.selectedMonth = JCLunar.lunar2solar(
          this.selectedYear,
          5,
          5
        ).cMonth;
        this.selectedDay = JCLunar.lunar2solar(this.selectedYear, 5, 5).cDay;
      } else if (this.selectedHoliday == "中秋节") {
        this.selectedMonth = JCLunar.lunar2solar(
          this.selectedYear,
          8,
          15
        ).cMonth;
        this.selectedDay = JCLunar.lunar2solar(this.selectedYear, 8, 15).cDay;
      } else if (this.selectedHoliday == "国庆节") {
        this.selectedMonth = 10;
        this.selectedDay = 1;
      }

      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
      this.holidayDown = false;
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
      //   almanac: "", 农历日期
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
          almanac: this.lunarTxt(
            parseInt(m) - 1 > 0 ? y : parseInt(y) - 1,
            parseInt(m) - 1 > 0 ? parseInt(m) - 1 : 12,
            previ
          ),
          weekendsDay: false,
          otherMonth: true,
          festivalDay: this.isFestival(
            parseInt(m) - 1 > 0 ? y : parseInt(y) - 1,
            parseInt(m) - 1 > 0 ? parseInt(m) - 1 : 12,
            previ
          ),
        };
        if (JCLunar.solar2lunar(y, m, previ).nWeek > 5) {
          tdData.weekendsDay = true;
        }
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
          almanac: this.lunarTxt(y, m, curri),
          weekendsDay: false,
          otherMonth: false,
          festivalDay: this.isFestival(y, m, curri),
        };
        if (JCLunar.solar2lunar(y, m, curri).nWeek > 5) {
          tdData2.weekendsDay = true;
        }
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
            tdData3.almanac = this.lunarTxt(
              parseInt(m) + 1 == 13 ? parseInt(y) + 1 : y,
              parseInt(m) + 1 == 13 ? 1 : parseInt(m) + 1,
              lastFirstDay
            );
            if (
              JCLunar.solar2lunar(
                parseInt(m) + 1 == 13 ? parseInt(y) + 1 : y,
                parseInt(m) + 1 == 13 ? 1 : parseInt(m) + 1,
                lastFirstDay
              ).nWeek > 5
            ) {
              tdData3.weekendsDay = true;
            }
            tdData3.otherMonth = true;
            tdData3.festivalDay = this.isFestival(
              parseInt(m) + 1 == 13 ? 1 : parseInt(m) + 1,
              lastFirstDay
            );
            lastFirstDay++;
          } else {
            startDays++;
            tdData3.sign = this.signDayTxt(y, m, startDays);
            tdData3.yearNo = y;
            tdData3.monthNo = m;
            tdData3.daynumber = startDays;
            tdData3.almanac = this.lunarTxt(y, m, startDays);
            if (JCLunar.solar2lunar(y, m, startDays).nWeek > 5) {
              tdData3.weekendsDay = true;
            }
            tdData3.otherMonth = false;
            tdData3.festivalDay = this.isFestival(y, m, startDays);
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
    // 算农历
    lunarTxt(y, m, d) {
      let lunarObj = JCLunar.solar2lunar(y, m, d);
      let nyEveObj = JCLunar.lunar2solar(y, 1, 0);
      if (m == nyEveObj.cMonth && d == nyEveObj.cDay) {
        //除夕
        return "除夕";
      } else if (lunarObj.isLunarH) {
        //农历节日
        return lunarObj.lunarH;
      } else if (lunarObj.isSolarH) {
        //阳历节日
        return lunarObj.solarH;
      } else if (lunarObj.isTerm) {
        //是24节气
        return lunarObj.Term;
      } else if (lunarObj.IDayCn == "初一") {
        return lunarObj.IMonthCn;
      } else if (lunarObj.lMonth == "7" && lunarObj.lDay == "7") {
        return "七夕节";
      } else {
        return lunarObj.IDayCn;
      }
    },
    // 计算是否是节假日
    isFestival(y, m, d) {
      let lunarObj = JCLunar.solar2lunar(y, m, d);
      let nyEveObj = JCLunar.lunar2solar(y, 1, 0);
      if (m == nyEveObj.cMonth && d == nyEveObj.cDay) {
        //除夕
        return true;
      } else if (lunarObj.isLunarH) {
        //农历节日
        return true;
      } else if (lunarObj.isSolarH) {
        //阳历节日
        return true;
      } else {
        return false;
      }
    },
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
      this.selectedHoliday = "假期安排";
      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
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
      this.selectedHoliday = "假期安排";
      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
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
      this.selectedHoliday = "假期安排";
      this.initCalendar(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      );
    },
    // 返回今天
    backtoToday() {
      this.selectedYear = this.currYear;
      this.selectedMonth = this.currMonth;
      this.selectedDay = this.currDay;
      this.selectedHoliday = "假期安排";
      this.initCalendar(this.currYear, this.currMonth, this.currDay);
    },
    // 设置日历右边的信息
    setRight(y, m, d) {
      this.selectedDate =
        y + "-" + ("00" + m).substr(-2, 2) + "-" + ("00" + d).substr(-2, 2);
      this.selectedLunar = JCLunar.solar2lunar(y, m, d);
      this.selectedLunarDay =
        this.selectedLunar.IMonthCn + this.selectedLunar.IDayCn;
      this.selectedLunarYear =
        this.selectedLunar.gzYear + "年 " + this.selectedLunar.Animal;
      this.selectedLunarMD =
        this.selectedLunar.gzMonth + "月 " + this.selectedLunar.gzDay + "日";
    },
  },
};
</script>

<style lang="less" scoped>
.calendar-wrapper {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  &.festival-box {
    .calendar-container {
      .calendar-box-left {
        border-color: #eb3636;
      }
      .calendar-box-right {
        background: #eb3636;
      }
    }
  }
  .calendar-container {
    height: 472px;
    position: relative;
    z-index: 1;
    display: flex;
    // 左边区域
    .calendar-box-left {
      width: 480px;
      height: 100%;
      padding: 15px 15px 0;
      border-radius: 16px 0 0 16px;
      border: 2px solid #4e6ef2;
      border-right: none;
      box-sizing: border-box;
    }
    // 右边区域
    .calendar-box-right {
      height: 100%;
      color: #fff;
      text-align: center;
      border-radius: 0 16px 16px 0;
      background: #4e6ef2;
      width: 112px;
      .calendar-right-date {
        line-height: 45px;
        font-size: 13px;
      }
      .calendar-right-day {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        line-height: 80px;
        font-size: 52px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 12px;
      }
      .calendar-right-lunar {
        margin-top: 6px;
      }
      .calendar-right-almanacbox {
        position: relative;
        margin-top: 12px;
        padding-top: 20px;
        font-size: 25px;
        line-height: 50px;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.15);
        height: calc(100% - 206px);
      }
    }
  }
  /*节日样式*/
  &.holiday {
    .calendar-box-left {
      border-color: #cb1c18;
    }
  }
}
// 年-月-日-今天
.header-box {
  position: relative;
  display: flex;
  height: 30px;
  font-size: 13px;
  zoom: 1;
  .header-block-1 {
    width: 96px;
    margin-right: 9px;
    .year-select {
      position: relative;
      padding: 7px;
      height: 100%;
      width: 100%;
      border-radius: 6px;
      line-height: 1;
      background: #ffffff;
      border: 1px solid #d7d9e0;
      user-select: none;
      cursor: pointer;
      &:hover {
        border-color: #a7aab5;
      }
      .year-cont {
        float: left;
        margin-right: 4px;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .year-wrapper {
      position: absolute;
      left: 0px;
      top: 38px;
      max-height: 312px;
      width: 94px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background: #ffffff;
      z-index: 10;
      overflow: hidden;
      cursor: default;
      .year-main {
        position: relative;
        box-sizing: border-box;
        padding: 9px 16px;
        overflow: auto;
      }
      .scroll-wrap {
        position: absolute;
        top: 9px;
        right: 0;
        width: 6px;
        border-top: none;
        background-color: #fff;
        .scroll-roll {
          height: 294px;
          width: 6px;
          background: transparent;
        }
        .scroll-bar {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          margin-left: -2px;
          width: 4px;
          height: 14px;
          border: none;
          background: #4e6ef2;
          border-radius: 3px;
          overflow: hidden;
          transition: all 0s;
        }
      }
    }
  }
  .header-block-2 {
    position: relative;
    width: 148px;
    padding: 0 34px;
    z-index: 1;
    margin-right: 9px;
    .prev-month,
    .next-month {
      position: absolute;
      top: 0;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #9195a3;
      font-size: 16px;
      cursor: pointer;
      background: url(../assets/images/calendar/arrow_left.png) no-repeat center;
      background-size: 14px;
    }
    .prev-month {
      left: 0;
    }
    .next-month {
      right: 0;
      background-image: url(../assets/images/calendar/arrow_right.png);
    }
    .month-select {
      position: relative;
      padding: 7px;
      height: 100%;
      border-radius: 6px;
      line-height: 1;
      background: #ffffff;
      border: 1px solid #d7d9e0;
      user-select: none;
      cursor: pointer;
      &:hover {
        border-color: #a7aab5;
      }
      .month-cont {
        float: left;
        margin-right: 4px;
      }
    }
    .month-wrapper {
      position: absolute;
      left: 34px;
      top: 38px;
      width: 80px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background: #ffffff;
      z-index: 10;
      overflow: hidden;
      cursor: default;
      .month-main {
        position: relative;
        box-sizing: border-box;
        padding: 9px 16px;
      }
    }
  }
  .header-block-3 {
    position: relative;
    width: 96px;
    margin-right: 9px;
    .holiday-select {
      position: relative;
      padding: 7px;
      height: 100%;
      border-radius: 6px;
      line-height: 1;
      background: #ffffff;
      border: 1px solid #d7d9e0;
      user-select: none;
      cursor: pointer;
      &:hover {
        border-color: #a7aab5;
      }
      .holiday-cont {
        float: left;
        margin-right: 4px;
      }
    }
    .holiday-wrapper {
      position: absolute;
      left: 0;
      top: 38px;
      max-height: 312px;
      width: 96px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background: #ffffff;
      z-index: 10;
      overflow: hidden;
      cursor: default;
      .holiday-main {
        padding: 9px 16px;
      }
    }
  }
  .back-today {
    position: absolute;
    right: 0;
    margin-right: 2px;
    width: 68px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #f5f5f6;
    border-radius: 6px;
    color: #333;
    cursor: pointer;
    &:hover {
      color: #315efb;
      background: #f0f0f1;
    }
  }
}
.arrow-down {
  float: right;
  width: 14px;
  height: 14px;
  background: url(../assets/images/calendar/arrow_down.png) no-repeat center;
  background-size: 100%;
  transition: all 0.3s;
  &.up {
    transform: rotateX(180deg);
  }
}
.year-scroll {
  user-select: none;
}
.select-item {
  width: 74px;
  padding-bottom: 7px;
  padding-top: 7px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: top;
  &:hover {
    color: #315efb;
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
      display: flex;
      box-sizing: border-box;
      width: 64px;
      height: 13px;
      padding: 1px;
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
      padding: 2px;
      .cell-box {
        display: flex;
        position: relative;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        cursor: pointer;
        width: 60px;
        height: 56px;
        padding: 4px 2px 2px 2px;
        box-sizing: border-box;
        border: 2px solid transparent;
        overflow: hidden;
        line-height: 1;
        zoom: 1;
        .cell-holiday-sign {
          position: absolute;
          left: 4px;
          top: 4px;
          color: #f73131;
          font-size: 12px;
          line-height: 12px;
        }
        .cell-daynumber {
          height: 22px;
          font-size: 18px;
          color: #000;
          &.weekend {
            color: #f73131;
          }
        }
        .cell-almanac {
          color: #333;
          font-size: 12px;
        }
        &.selected {
          border: 2px solid #bdbfc8;
        }
        &.today {
          border: 2px solid #4e6ef2 !important;
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
</style>
