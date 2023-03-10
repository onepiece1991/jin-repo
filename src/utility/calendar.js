/**
 * @Author: JXX
 * @Time: 2018/11/26
 * @Description: calendar javascript
 */
import * as JCLunar from "@/utility/lunar";
//获取当前时间
const Nowtime = new Date();
//当前年份
const currYear = Nowtime.getFullYear();
//当前月份
const currMonth = Nowtime.getMonth() + 1;
//当前日
const currDate = Nowtime.getDate();
const holidays = [
  "假期安排",
  "元旦",
  "除夕",
  "春节",
  "清明节",
  "劳动节",
  "端午节",
  "中秋节",
  "国庆节",
];
let hVal = [];

//存放当前被选中的或者今天的日期
let selectedDate = currYear + "-" + currMonth + "-" + currDate;
//输入框中显示今天的日期
// withID("input").value = currYear + "-" + currMonth + "-" + currDate;

//显示外框
// showContainer("body");
// //创建年份下拉,并给对应事件
// createSelectYear();
// //创建月份下拉，并给对应事件
// createMonthSelect();
// //创建假期安排给事件
// holidaySelect();

// // //根据年，月，用table绘制日历。 年月变动则 重新绘制
// createTabledate(
//   parseInt(withID("selectedYear").innerText),
//   parseInt(withID("selectedMonth").innerText)
// );
// //设置右边详细信息
// setRight(currYear, currMonth, currDate);
// //上月下月的a标签给事件
// leftrightclick();
// let signData = {

//加载外框
export function showContainer(idT) {
  let str =
    '<div class="calendar-container">' +
    '<div class="calendar-left">' +
    '<div class="calendar-select-box clearfix">' +
    '<div class="calendar-select-wrapper clearfix">' +
    '<div class="calendar-year-box"></div>' +
    '<div class="calendar-month-box"></div>' +
    '<div class="calendar-holiday-box"></div>' +
    "</div>" +
    '<a href="javascript:void(0);" class="calendar-backtotoday">返回今天</a>' +
    "</div>" +
    '<div class="calendar-table-wrapper">' +
    '<table class="calendar-table-box" cellspacing="0" cellpadding="0">' +
    "<thead>" +
    "<tr>" +
    "<th>一</th>" +
    "<th>二</th>" +
    "<th>三</th>" +
    "<th>四</th>" +
    "<th>五</th>" +
    '<th class="calendar-table-weekend">六</th>' +
    '<th class="calendar-table-weekend">日</th>' +
    "</tr>" +
    "</thead>" +
    '<tbody class="calendar-tbody">' +
    "</tbody>" +
    "</table>" +
    "</div>" +
    "</div>" +
    '<div class="calendar-right">' +
    '<p class="calendar-right-date"></p>' +
    '<p class="calendar-right-day"></p>' +
    '<p class="calendar-right-lunar"></p>' +
    '<div class="calendar-right-almanacbox">万<br/>事<br/>皆<br/>宜</div>' +
    "</div>" +
    "</div>";
  // console.log(document.getElementById(idT));
  let rootEle;
  if (idT == "body") {
    rootEle = document.body;
  } else {
    rootEle = document.getElementById(idT);
  }
  let div = newElement("div");
  div.innerHTML = str;
  div.setAttribute("class", "calendar-wrapper");
  rootEle.appendChild(div);
}

//创建年份下拉,并给对应事件
//选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
export function createSelectYear() {
  let strY =
    '<div class="calendar-select-ceil">' +
    '<div class="dropdown-btn-group" id="yearBtnGroup">' +
    '<div class="dropdown-btn" id="selectedYear" data-value="' +
    currYear +
    '">' +
    currYear +
    "年</div>" +
    '<div class="dropdown-btn-icon"><div class="dropdown-icon-border"><i class="arrow-down"></i></div></div>' +
    "</div>" +
    '<div class="dropdown-menu" id="yearDropMenu" style="display: none;">' +
    '<div class="dropdown-menu-wrapper">' +
    '<ul class="dropdown-menu-box" id="yearMenuBox">' +
    "</ul>" +
    "</div>" +
    '<div class="dropdown-scroll">' +
    '<div class="scroll-axis"></div>' +
    '<div class="scroll-slider"></div>' +
    "</div>" +
    "</div>" +
    "</div>";
  withClass("calendar-year-box").innerHTML = strY;
  //填充下拉框中的年份
  let yearBox = withID("yearMenuBox");
  //总年数
  // let lenY = 20;
  for (let i = 0; i <= 20; i++) {
    let li = newElement("li");
    li.className = "dropdown-item";
    li.setAttribute("data-value", currYear - 10 + i);
    li.innerText = currYear - 10 + i + "年";
    //给li添加点击事件
    li.onclick = function () {
      let selectyear = withID("selectedYear");
      let year = this.getAttribute("data-value");
      let month = withID("selectedMonth").getAttribute("data-value");
      selectyear.innerHTML = year + "年";
      selectyear.setAttribute("data-value", year);
      yearMenu.style.display = "none";
      createTabledate(year, month);
      //切换时是否会遇到假期安排的时间selectedDate
      if (isSelectedDate(selectedDate)) {
        withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
      } else {
        removeClassName("calendar-holidaystyle");
      }
    };
    yearBox.appendChild(li);
  }

  //点击年份下拉框
  let yearBtn = withID("yearBtnGroup");
  let yearMenu = withID("yearDropMenu");
  yearBtn.onclick = function () {
    let ymd = yearMenu.style.display;
    if (ymd == "none") {
      hideDropdown("dropdown-menu");
      yearMenu.style.display = "block";
    } else {
      yearMenu.style.display = "none";
    }
  };
}

//创建月份下拉，并给对应事件
export function createMonthSelect() {
  let strM =
    '<a href="javscript:void(0)" class="calender-month-prev"></a>' +
    '<a href="javscript:void(0)" class="calender-month-next"></a>' +
    '<div class="calendar-select-ceil">' +
    '<div class="dropdown-btn-group" id="monthBtnGroup">' +
    '<div class="dropdown-btn" id="selectedMonth" data-value="' +
    currMonth +
    '">' +
    currMonth +
    "月</div>" +
    '<div class="dropdown-btn-icon"><div class="dropdown-icon-border"><i class="arrow-down"></i></div></div>' +
    "</div>" +
    '<div class="dropdown-menu" id="monthDropMenu" style="display: none;">' +
    '<div class="dropdown-menu-wrapper">' +
    '<ul class="dropdown-menu-box" id="monthMenuBox">' +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>";
  withClass("calendar-month-box").innerHTML = strM;
  //填充下拉框中的年份
  let monthBox = withID("monthMenuBox");
  //总年数
  // let lenM = 12;
  for (let i = 1; i <= 12; i++) {
    let li = newElement("li");
    li.className = "dropdown-item";
    li.setAttribute("data-value", i);
    li.innerText = i + "月";
    //给li添加点击事件
    li.onclick = function () {
      let selectmonth = withID("selectedMonth");
      let month = this.getAttribute("data-value");
      let year = withID("selectedYear").getAttribute("data-value");
      selectmonth.innerHTML = month + "月";
      selectmonth.setAttribute("data-value", month);
      monthMenu.style.display = "none";
      createTabledate(year, month);
      //切换时是否会遇到假期安排的时间selectedDate
      if (isSelectedDate(selectedDate)) {
        withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
      } else {
        removeClassName("calendar-holidaystyle");
      }
    };
    monthBox.appendChild(li);
  }

  //点击月份下拉框
  let monthBtn = withID("monthBtnGroup");
  let monthMenu = withID("monthDropMenu");
  monthBtn.onclick = function () {
    let mmd = monthMenu.style.display;
    if (mmd == "none") {
      hideDropdown("dropdown-menu");
      monthMenu.style.display = "block";
    } else {
      monthMenu.style.display = "none";
    }
  };
}

//创建假期安排给事件

export function holidaySelect() {
  let strH =
    '<div class="calendar-select-ceil">' +
    '<div class="dropdown-btn-group" id="holidayBtnGroup">' +
    '<div class="dropdown-btn" id="selectedHoliday">假期安排</div>' +
    '<div class="dropdown-btn-icon">' +
    '<div class="dropdown-icon-border">' +
    '<i class="arrow-down"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="dropdown-menu" id="holidayDropMenu" style="display: none;">' +
    '<div class="dropdown-menu-wrapper">' +
    '<ul class="dropdown-menu-box" id="holidayMenuBox"></ul>' +
    "</div>" +
    "</div>" +
    "</div>";
  withClass("calendar-holiday-box").innerHTML = strH;
  //如果当前选择的年份超过今年的年份，此时假期安排还没出来，则假期安排下拉列表中没有内容
  let selectYearVal = withID("selectedYear").getAttribute("data-value");
  //获得对应年份的假期安排的日期
  //  let hVal = [];
  for (let k = 0; k < holidays.length; k++) {
    switch (holidays[k]) {
      case "元旦":
        hVal[k] = selectYearVal + "-1-1";
        break;
      case "除夕":
        hVal[k] =
          selectYearVal +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 1, 0).cMonth +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 1, 0).cDay;
        break;
      case "春节":
        hVal[k] =
          selectYearVal +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 1, 1).cMonth +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 1, 1).cDay;
        break;
      case "清明节":
        hVal[k] = selectYearVal + "-4-" + JCLunar.getTerm(selectYearVal, 7);
        break;
      case "劳动节":
        hVal[k] = selectYearVal + "-5-1";
        break;
      case "端午节":
        hVal[k] =
          selectYearVal +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 5, 5).cMonth +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 5, 5).cDay;
        break;
      case "中秋节":
        hVal[k] =
          selectYearVal +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 8, 15).cMonth +
          "-" +
          JCLunar.lunar2solar(selectYearVal, 8, 15).cDay;
        break;
      case "国庆节":
        hVal[k] = selectYearVal + "-10-1";
        break;
      default:
        hVal[k] = 0;
    }
  }
  //  if((selectYearVal <= currYear) && (selectYearVal > (currYear-7))) {
  for (let i = 0; i < holidays.length; i++) {
    let li = newElement("li");
    li.className = "dropdown-item";
    li.setAttribute("data-value", hVal[i]);
    li.innerText = holidays[i];
    //给li添加点击事件
    li.onclick = function () {
      let time = this.getAttribute("data-value");
      time = time.split("-");
      let calendar_wrapper = withClass("calendar-wrapper");
      if (time[0] == 0) {
        //如果点击的是假期安排
        removeClassName("calendar-holidaystyle");
        hideDropdown("dropdown-menu");
      } else {
        calendar_wrapper.classList.add("calendar-holidaystyle");
        let year = time[0];
        let month = time[1];
        let day = time[2];
        let selectYear = withID("selectedYear");
        selectYear.innerHTML = year + "年";
        selectYear.setAttribute("data-value", year);

        let selectMonth = withID("selectedMonth");
        selectMonth.innerHTML = parseInt(month) + "月";

        selectMonth.setAttribute("data-value", parseInt(month));
        holidayMenu.style.display = "none";

        createTabledate(year, parseInt(month));
        setRight(year, month, day);
        let selectedA = dateToA(year + "-" + month + "-" + day);
        selectedA.classList.add("calendar-table-selected");
      }
      //看情况添加这一句
      withID("selectedHoliday").innerHTML = this.innerHTML;
    };
    withID("holidayMenuBox").appendChild(li);
  }
  //  }

  //点击假期安排下拉框
  let holidayBtn = withID("holidayBtnGroup");
  let holidayMenu = withID("holidayDropMenu");
  holidayBtn.onclick = function () {
    let mmd = holidayMenu.style.display;
    if (mmd == "none") {
      hideDropdown("dropdown-menu");
      holidayMenu.style.display = "block";
    } else {
      holidayMenu.style.display = "none";
    }
  };
}
//根据年，月，用table绘制日历。 年月变动则 重新绘制
export function createTabledate(year, month) {
  let calendar_tbody = withClass("calendar-tbody");
  if (
    calendar_tbody != "" &&
    calendar_tbody != null &&
    calendar_tbody != "undefined"
  ) {
    calendar_tbody.parentNode.removeChild(calendar_tbody);
  }
  let calendar_body = newElement("tbody");
  calendar_body.setAttribute("class", "calendar-tbody");
  let calendarTable = withClass("calendar-table-box");
  calendarTable.appendChild(calendar_body);
  //先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
  let fixedDate = setdateinfo(year, month, 1);
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
  let pervMonthlastDay = getPervMonthLastDay(year, month);
  //上月最后几天循环
  let lastdays = pervMonthlastDay - pervLastDay + 1;
  let tr = newElement("tr");
  for (let i = lastdays; i <= pervMonthlastDay; i++) {
    let td = newElement("td");
    let tdDiv = newElement("div");
    tdDiv.className = "calendar-relative";
    td.appendChild(tdDiv);
    let a = getA(
      parseInt(month) - 1 == 0 ? parseInt(year) - 1 : year,
      parseInt(month) - 1 == 0 ? 12 : parseInt(month) - 1,
      i
    );
    //上个月最后几天的样式
    // a.className = 'calendar-table-other-month';
    a.classList.add("calendar-table-other-month");
    tdDiv.appendChild(a);
    tr.appendChild(td);
  }
  //这个月开始的循环
  //这个月startDays的取值 1-2-3-4-5-6-7
  let startDays = 8 - firstDay == 8 ? 1 : 8 - firstDay;
  for (let i = 1; i <= startDays; i++) {
    let td = newElement("td");
    let tdDiv = newElement("div");
    tdDiv.className = "calendar-relative";
    td.appendChild(tdDiv);
    let b = getA(year, month, i);
    tdDiv.appendChild(b);
    tr.appendChild(td);
  }
  calendar_body.appendChild(tr);
  //指定年月最后一天
  let currMonthLashDay = getCurrMonthLashDay(year, month);
  //当月除开第一行的起点
  // let currmonthStartDay = startDays + 1;
  //当月还剩余的天数
  let restDays = currMonthLashDay - startDays;
  //循环次数
  let loopT = 5;
  if (check(restDays / 7)) {
    //是小数
    loopT = Math.ceil(restDays / 7); //向上取整
  } else {
    loopT = restDays / 7;
  }
  //如果一个月占六行
  // if ((loopT + 1) == 6) {
  //     calendarTable.setAttribute('class','calendar-table-box calendar-table-box-six');
  // } else {
  //     calendarTable.setAttribute('class','calendar-table-box');
  // }

  //这是下个月开始的变量;
  let lastFirstDay = 1;
  for (let i = 0; i < loopT; i++) {
    let tr1 = newElement("tr");
    for (let n = 1; n <= 7; n++) {
      let td = newElement("td");
      let tdDiv = newElement("div");
      tdDiv.className = "calendar-relative";
      td.appendChild(tdDiv);
      if (startDays == 0) {
        //下个月
        let c = getA(
          parseInt(month) + 1 == parseInt(13) ? parseInt(year) + 1 : year,
          parseInt(month) + 1 == parseInt(13) ? 1 : parseInt(month) + 1,
          lastFirstDay
        );
        //下个月最后几天的样式
        // c.className = 'calendar-table-other-month';
        c.classList.add("calendar-table-other-month");
        tdDiv.appendChild(c);
        lastFirstDay++;
        tr1.appendChild(td);
        continue;
      } else {
        startDays++;
        let d = getA(year, month, startDays);
        tdDiv.appendChild(d);
        if (startDays == currMonthLashDay) {
          //下个月
          startDays = 0;
        }
        tr1.appendChild(td);
      }
    }
    calendar_body.appendChild(tr1);
  }
  setHolidayred(); //设置星期六星期天的样式
  holidaySelect(); //更新假期安排
  setA(); //设置td中a的事件
  //左上角休息和上班的标记
  daySign();

  //获取当前被选中的a，如果没有被选中的则查找今天
  let sarr = [];
  if (isHasClass("calendar-table-selected")) {
    selectedDate = withClass("calendar-table-selected").getAttribute("date");
    sarr = selectedDate.split("-");
  } else if (isHasClass("calendar-table-today")) {
    selectedDate = withClass("calendar-table-today").getAttribute("date");
    sarr = selectedDate.split("-");
  } else {
    sarr = selectedDate.split("-");
    let syear = withID("selectedYear").getAttribute("data-value");
    let smonth = withID("selectedMonth").getAttribute("data-value");
    sarr[0] = syear;
    sarr[1] = smonth;
  }
  if (sarr[2] > getCurrMonthLashDay(sarr[0], sarr[1])) {
    sarr[2] = getCurrMonthLashDay(sarr[0], sarr[1]);
  }
  selectedDate = sarr[0] + "-" + sarr[1] + "-" + sarr[2];
  setRight(sarr[0], sarr[1], sarr[2]);
}

//切换上一个月，下一个月和返回今天
export function leftrightclick() {
  let LeftBtn = withClass("calender-month-prev");
  let rightBtn = withClass("calender-month-next");
  //上一个月
  LeftBtn.onclick = function () {
    let monthSelect = withID("selectedMonth");
    let monthVal = parseInt(monthSelect.getAttribute("data-value"));
    let yearSelect = withID("selectedYear");
    let yearVal = parseInt(yearSelect.getAttribute("data-value"));
    if (monthVal == 1) {
      yearVal -= 1;
      monthVal = 12;
    } else {
      monthVal -= 1;
    }
    yearSelect.setAttribute("data-value", yearVal);
    yearSelect.innerHTML = yearVal + "年";
    monthSelect.setAttribute("data-value", monthVal);
    monthSelect.innerHTML = monthVal + "月";
    //重新画表
    createTabledate(yearVal, monthVal);
    //切换时是否会遇到假期安排的时间selectedDate
    if (isSelectedDate(selectedDate)) {
      withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
    } else {
      removeClassName("calendar-holidaystyle");
    }
  };
  //下一个月
  rightBtn.onclick = function () {
    let monthSelect = withID("selectedMonth");
    let monthVal = parseInt(monthSelect.getAttribute("data-value"));
    let yearSelect = withID("selectedYear");
    let yearVal = parseInt(yearSelect.getAttribute("data-value"));
    if (monthVal == 12) {
      yearVal += 1;
      monthVal = 1;
    } else {
      monthVal += 1;
    }
    yearSelect.setAttribute("data-value", yearVal);
    yearSelect.innerHTML = yearVal + "年";
    monthSelect.setAttribute("data-value", monthVal);
    monthSelect.innerHTML = monthVal + "月";
    //重新画表
    createTabledate(yearVal, monthVal);
    //切换时是否会遇到假期安排的时间selectedDate
    if (isSelectedDate(selectedDate)) {
      withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
    } else {
      removeClassName("calendar-holidaystyle");
    }
  };
  //返回今天
  let toToday = withClass("calendar-backtotoday");
  toToday.onclick = function () {
    let monthSelect = withID("selectedMonth");
    let yearSelect = withID("selectedYear");
    yearSelect.setAttribute("data-value", currYear);
    yearSelect.innerHTML = currYear + "年";
    monthSelect.setAttribute("data-value", currMonth);
    monthSelect.innerHTML = currMonth + "月";
    //重新画表
    createTabledate(currYear, currMonth);
    setRight(currYear, currMonth, currDate);
    hideDropdown("dropdown-menu");
    //切换时是否会遇到假期安排的时间selectedDate
    if (isSelectedDate(selectedDate)) {
      withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
    } else {
      removeClassName("calendar-holidaystyle");
    }
  };
}

//得到id对象
export function withID(id) {
  return document.getElementById(id);
}
//得到传入参数为class的对象(同名返回第一个)
export function withClass(classname) {
  let targets;
  targets = targets || document.getElementsByTagName("*");
  for (let k in targets) {
    let target = targets[k];
    if (target.className != "") {
      if (target.className.indexOf(classname) > -1) {
        return target;
      }
    }
  }
  return "";
}
//创建元素
export function newElement(val) {
  return document.createElement(val);
}
//根据传入的年月日获取具体的时间信息
export function setdateinfo(year, month, day) {
  let date1 = new Date();
  date1.setFullYear(parseInt(year));
  date1.setMonth(parseInt(month) - parseInt(1), parseInt(day));
  return date1;
}
//得到指定月的上个月最后一天传进来按 12月算
export function getPervMonthLastDay(year, month) {
  //当月就是  month-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
  return parseInt(new Date(year, month - 1, 0).getDate());
}

//创建日历表中的a标签并设置公用属性
export function getA(year, month, day) {
  //获取农历信息
  let almanacTxt;
  let lunarObj = JCLunar.solar2lunar(year, month, day);
  /**
   * Animal: 生肖
   * IDayCn: 农历-日
   * IMonthCn: 农历-月
   * Term: 24节气
   * astro: 星座
   * cDay: 公历—日
   * cMonth: 公历-月
   * cYear: 公历-年
   * gzDay: 天干地支-日
   * gzMonth: 天干地支-月
   * gzYear: 天干地支-年
   * isLeap: 是否为闰月
   * isTerm: 是否是24节气日
   * isToday: 是否是今天
   * lDay: 农历-日
   * lMonth: 农历-月
   * lYear: 农历-年
   * nWeek: 星期几(3)
   * ncWeek: 星期几(星期三)
   * isLunarH: 是否是农历的节日
   * isSolarH: 是否是阳历的节日
   * lunarH: 农历节日
   * solarH: 阳历节日
   */
  let a = newElement("a");

  let nyEveObj = JCLunar.lunar2solar(year, 1, 0);
  if (month == nyEveObj.cMonth && day == nyEveObj.cDay) {
    //除夕
    almanacTxt = "除夕";
    a.classList.add("calendar-table-festival");
  } else if (lunarObj.isLunarH) {
    //农历节日
    almanacTxt = lunarObj.lunarH;
    a.classList.add("calendar-table-festival");
  } else if (lunarObj.isSolarH) {
    //阳历节日
    almanacTxt = lunarObj.solarH;
    a.classList.add("calendar-table-festival");
  } else if (lunarObj.isTerm) {
    //是24节气
    almanacTxt = lunarObj.Term;
    a.classList.add("calendar-table-festival");
  } else if (lunarObj.IDayCn == "初一") {
    almanacTxt = lunarObj.IMonthCn;
  } else {
    almanacTxt = lunarObj.IDayCn;
  }
  a.href = "javascript:;";
  a.innerHTML =
    '<span class="calendar-table-daynumber">' +
    day +
    "</span>" +
    '<span class="calendar-table-almanac">' +
    almanacTxt +
    "</span>";
  a.setAttribute("date", year + "-" + month + "-" + day);
  return a;
}

//得到指定月最后一天，传进来按 12月算
export function getCurrMonthLashDay(year, month) {
  if (month >= 12) {
    year = year + 1;
    month = month - 12;
  }
  return parseInt(new Date(year, month, 0).getDate());
}

//判断c是否是小数
export function check(c) {
  let r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
  return r.test(c);
}

//给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
//这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
export function setA() {
  let tbody = withClass("calendar-tbody");
  let arr = tbody.getElementsByTagName("a");
  for (let i = 0; i < arr.length; i++) {
    let date = arr[i].getAttribute("date");
    let datearr = date.split("-");
    if (arr[i].className == "calendar-table-other-month") {
      arr[i].setAttribute(
        "onclick",
        "javascript:setOther(" +
          datearr[0] +
          "," +
          datearr[1] +
          "," +
          datearr[2] +
          ",this);javascript:stopBubble(this);"
      );
    } else {
      arr[i].setAttribute(
        "onclick",
        "javascript:setRight(" +
          datearr[0] +
          "," +
          datearr[1] +
          "," +
          datearr[2] +
          ",this);javascript:stopBubble(this);"
      );
    }
  }
}

//给rightdiv框创建元素并赋值，根据传入的年月日给内部的元素赋值 ,月份是 1-12
export function setRight(year, month, day, data) {
  //  year=year.toString();
  //  month=month.toString();
  //  day=day.toString();
  removeClassName("calendar-table-selected");
  if (data) {
    //获取当前点击的元素的date
    let aDate = data.getAttribute("date");
    if (hVal.indexOf(aDate) > -1) {
      withClass("calendar-wrapper").classList.add("calendar-holidaystyle");
    } else {
      removeClassName("calendar-holidaystyle");
    }
    data.classList.add("calendar-table-selected");
  }
  hideDropdown("dropdown-menu");

  //右边明细栏内容
  let dateObj = JCLunar.solar2lunar(year, month, day);
  withClass("calendar-right-date").innerHTML =
    year + "-" + month + "-" + day + " " + dateObj.ncWeek;
  withClass("calendar-right-day").innerHTML = day;
  withClass("calendar-right-lunar").innerHTML =
    "<span>" +
    dateObj.IMonthCn +
    dateObj.IDayCn +
    "</span>" +
    "<span>" +
    dateObj.gzYear +
    "年【" +
    dateObj.Animal +
    "】年</span>" +
    "<span>" +
    dateObj.gzMonth +
    "月 " +
    dateObj.gzDay +
    "日</span>";
  selectedDate = year + "-" + month + "-" + day;
  //输入框中显示选择的日期
  // withID("input").value = year + "-" + month + "-" + day;
}
//给上一个月最后几天和下一个月头几天设置点击跳转月份
export function setOther(year, month, day, data) {
  createTabledate(year, month); //创建对应的table(日期)
  setRight(year, month, day, data); //设置右边明细栏内容
  updateSelect(year, month); //改变年月select值
}

//更新日历下拉选项中的年和月
export function updateSelect(year, month) {
  let selectmonth = withID("selectedMonth");
  let selectyear = withID("selectedYear");
  selectmonth.innerHTML = month + "月";
  selectyear.innerHTML = year + "年";
}

//阻止冒泡
export function stopBubble(event) {
  if (event && event.stopPropagation) {
    // 别的浏览器
    event.stopPropagation();
  } else {
    //IE
    let e = event || window.event;
    e.cancelBubble = true;
  }
}

//设置星期六星期天的样式
export function setHolidayred() {
  let rows = withClass("calendar-tbody").rows;
  //行遍历
  for (let i = 0; i < rows.length; i++) {
    //列遍历
    for (let j = 0; j < rows[i].cells.length; j++) {
      let cell = rows[i].cells[j];
      let cellDiv = cell.childNodes[0];
      let cellA = cellDiv.childNodes[0];
      let aDate = cellA.getAttribute("date");
      let arr = aDate.split("-");
      //判断是否是今天
      if (arr[0] == currYear && arr[1] == currMonth && arr[2] == currDate) {
        cellA.setAttribute("class", "calendar-table-today");
      }
      if (j >= rows[i].cells.length - 2) {
        // if(cellA.getAttribute("class") != "calendar-table-other-month"){
        // }
        cellA.classList.add("calendar-table-weekend");
      }
    }
  }
}

//隐藏所有的下拉框
export function hideDropdown(classname) {
  //获取body下所有的子元素
  let allTag = document.getElementsByTagName("*");
  for (let i = 0; i < allTag.length; i++) {
    if (allTag[i].className == classname) {
      allTag[i].style.display = "none";
    }
  }
}

//移除某个classname
export function removeClassName(classname) {
  //获取body下所有的子元素
  let allTag = document.getElementsByTagName("*");
  for (let i = 0; i < allTag.length; i++) {
    allTag[i].classList.remove(classname);
  }
}

//判断是否有某个classname
export function isHasClass(classname) {
  //获取body下所有的子元素
  let allTag = document.getElementsByTagName("*");
  for (let i = 0; i < allTag.length; i++) {
    if (allTag[i].classList.contains(classname)) {
      return true;
    } else {
      return false;
    }
  }
}

//通过a标签上的date值找到对应的a元素
export function dateToA(val) {
  //获取body下的所有a标签
  let allTagA = document.getElementsByTagName("a");
  for (let i = 0; i < allTagA.length; i++) {
    let attrs = allTagA[i].getAttribute("date");
    if (attrs == val) {
      return allTagA[i];
    }
  }
}

//是否是假期安排的时间
export function isSelectedDate(str) {
  if (hVal.indexOf(str) > -1) {
    return true;
  } else {
    return false;
  }
}

//上班---标记
export function daySign() {
  let signdays;
  let weekdays = [
    "2020-1-19",
    "2020-2-1",
    "2020-4-26",
    "2020-5-9",
    "2020-6-28",
    "2020-9-27",
    "2020-10-10",
  ];
  let weekends = [
    "2020-1-1",
    "2020-1-24",
    "2020-1-25",
    "2020-1-26",
    "2020-1-27",
    "2020-1-28",
    "2020-1-29",
    "2020-1-30",
    "2020-1-31",
    "2020-2-1",
    "2020-2-2",
    "2020-4-4",
    "2020-4-5",
    "2020-4-6",
    "2020-5-1",
    "2020-5-2",
    "2020-5-3",
    "2020-6-25",
    "2020-6-26",
    "2020-6-27",
    "2020-10-1",
    "2020-10-2",
    "2020-10-3",
    "2020-10-4",
    "2020-10-5",
    "2020-10-6",
    "2020-10-7",
    "2020-10-8",
  ];
  if (window.XMLHttpRequest) {
    signdays = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    signdays = new window.ActiveXObject();
  } else {
    alert("请升级您的浏览器");
  }

  if (signdays != null) {
    // signdays.open("GET", "./week.json", true);
    // signdays.send(null);
    // signdays.onreadystatechange = function () {
    //   if (signdays.readyState == 4 && signdays.status == 200) {
    // let signObj = signData;
    // weekdays = signObj.weekdays;
    // weekends = signObj.weekends;
    //工作日
    let allTagA = document.getElementsByTagName("a");
    for (let i = 0; i < allTagA.length; i++) {
      let attrs = allTagA[i].getAttribute("date");
      if (weekdays.indexOf(attrs) > -1) {
        allTagA[i].classList.add("calendar-table-work");
        allTagA[i].innerHTML +=
          '<span class="calendar-table-holiday-sign">班</span>';
      }
      if (weekends.indexOf(attrs) > -1) {
        allTagA[i].classList.add("calendar-table-rest");
        allTagA[i].innerHTML +=
          '<span class="calendar-table-holiday-sign">休</span>';
      }
    }
    //   }
    // };
  }
}
