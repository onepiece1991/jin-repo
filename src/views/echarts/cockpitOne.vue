<template>
  <div class="chart-body">
    <h1>
      <i class="i-wave left"></i>驾驶舱<i class="i-wave right"></i
      ><span class="date">{{ dateInfo }}</span>
    </h1>
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
          <h4>项目六<span class="pdw">单位：万元</span></h4>
          <sim-select :optionArr="pList01"></sim-select>
        </li>
        <li class="cm-item cmi09">
          <h4>项目九</h4>
          <ul class="progress-box">
            <li class="pb-item" v-for="(item, i) in pList09" :key="'li' + i">
              <p class="pb-title">{{ item.name }}</p>
              <div :class="['pb-main', 'pbm0' + parseInt(i) + 1]">
                <div class="pb-bg"></div>
                <div class="pb-fill">
                  <i class="pb-icon">{{ item.value }}</i>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="c-main cm02">
        <li class="cm-item cmi02">
          <swiper
            class="swpier"
            :modules="modules"
            direction="vertical"
            loop="true"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            v-if="pList02.length"
          >
            <swiper-slide
              v-for="(item, i) in pList02"
              :key="item.name + i"
              :index="i"
            >
              <h4>
                {{ item.name }}
                <span class="small">({{ item.sumNo }}笔)</span>
                <span class="i-direction" :class="{ down: !item.fDirectionUp }"
                  >{{ item.floatNum }}%</span
                >
              </h4>
              <p class="pw-money">¥{{ item.money }}</p>
              <div class="w2 chartSwiper2" :ref="'lineChart' + i"></div>
            </swiper-slide>
          </swiper>
        </li>
        <li class="cm-item cmi03">
          <swiper
            class="swpier"
            :modules="modules"
            direction="vertical"
            :loop="true"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            v-if="pList03.length"
          >
            <swiper-slide
              v-for="(item, i) in pList03"
              :key="item.name + i"
              :index="i"
            >
              <h4>
                {{ item.name }}
                <span class="small">({{ item.sumNo }}笔)</span>
                <span class="i-direction" :class="{ down: !item.fDirectionUp }"
                  >{{ item.floatNum }}%</span
                >
              </h4>
              <p class="pw-money">¥{{ item.money }}</p>
              <div class="w2 chartSwiper3" :ref="'lineChart' + i"></div>
            </swiper-slide>
          </swiper>
        </li>
        <li class="cm-item cmi04">
          <h4>项目四<span class="pdw">单位：万元</span></h4>
          <p class="pw-money">¥7,356,023.24</p>
          <p class="pw-info">
            <span class="pwi-txt">较上日</span
            ><span class="i-direction up">23.24</span>
          </p>
          <p class="pw-info">
            <span class="pwi-txt">较上月末</span
            ><span class="i-direction down">108,223.24</span>
          </p>
        </li>
        <li class="cm-item cmi07">
          <h4>项目七<span class="pdw">单位：万元</span></h4>
          <!-- <ul class="building-box">
             原排列
              1   4   6   8
              2           9
                          10
              3   5   7   11
             
              现排列
              1   2   3   4
              11          5
                          6
              10   9   8   7
              <li class="bb-list bb01">
                <p>杭州市运河综合保护开发建设集团有限责任公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb02">
                <p>杭州市金融投资集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb03">
                <p>杭州市实业投资集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb04">
                <p>杭州市地铁集团有限责任公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb05">
                <p>杭州种业集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb06">
                <p>西湖电子集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb07">
                <p>杭州市交通投资集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb08">
                <p>杭州市商贸旅游集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb09">
                <p>杭州市钱江新城投资集团有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb10">
                <p>杭州市国有资本投资运营有限公司</p>
                <p class="bb-money"><span>¥235,825.00</span></p>
              </li>
              <li class="bb-list bb11">
                <p>杭州市城市建设投资集团有限公司</p>
                <p class="bb-money"><span>¥678,825.00</span></p>
              </li>
            </ul> -->
          <ul class="building-box popmax-box active">
            <li class="bb-list bb01">
              <p>杭州市运河综合保护开发建设集团有限责任公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb02">
              <p>杭州市金融投资集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb03">
              <p>杭州市实业投资集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb04">
              <p>杭州市地铁集团有限责任公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb05">
              <p>杭州种业集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb06">
              <p>西湖电子集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb07">
              <p>杭州市交通投资集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb08">
              <p>杭州市商贸旅游集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb09">
              <p>杭州市钱江新城投资集团有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb10">
              <p>杭州市国有资本投资运营有限公司</p>
              <p class="bb-money"><span>¥235,825.00</span></p>
            </li>
            <li class="bb-list bb11">
              <p>杭州市城市建设投资集团有限公司</p>
              <p class="bb-money"><span>¥678,825.00</span></p>
            </li>
          </ul>
        </li>
        <li class="cm-item cmi10">
          <div class="clearfix">
            <p class="pw-title fl">
              资金余额走势(近30日)<span class="pdw">单位：万元</span>
            </p>
            <div class="fr f0 ss-right">
              <div class="input-area">
                <input type="text" class="pw-input" placeholder="请输入" />万
              </div>
              <div class="sim-select ss2">
                <p class="ss-txt">系统外</p>
                <ul class="ss-box">
                  <li class="ss-list">系统外</li>
                  <li class="ss-list">系统内</li>
                </ul>
              </div>
              <button class="pw-btn active" onclick="fundIn(this)">
                资金流入
              </button>
              <button class="pw-btn" onclick="fundOut(this)">资金流出</button>
            </div>
          </div>
          <div class="table-box">
            <div class="fixed-head">
              <table class="pw-table">
                <tr>
                  <th width="30%">收款方</th>
                  <th width="20%">所属集团</th>
                  <th width="30%">付款方</th>
                  <th width="10%">金额(万元)</th>
                  <th width="10%">交易时间</th>
                </tr>
              </table>
            </div>
            <div id="copTable">
              <table class="pw-table hideth">
                <tr>
                  <th width="30%">收款方</th>
                  <th width="20%">所属集团</th>
                  <th width="30%">付款方</th>
                  <th width="10%">金额(万元)</th>
                  <th width="10%">交易时间</th>
                </tr>
                <tr>
                  <td>杭州市城市建设投资集团有限公司</td>
                  <td>城市建设投资集团</td>
                  <td>xx城市建设投资集团</td>
                  <td>7,342.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市国有资本投资运营有限公司</td>
                  <td>国有资本投资运营集团</td>
                  <td>xx国有资本投资运营集团</td>
                  <td>12,324.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市金融投资集团有限公司</td>
                  <td>金融投资集团</td>
                  <td>xx金融投资集团</td>
                  <td>5,790.24</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市运河综合保护开发建设集团有限责任公司</td>
                  <td>运河综合保护开发建设集团</td>
                  <td>xxx运河综合保护开发建设集团</td>
                  <td>1,329.09</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市城市建设投资集团有限公司</td>
                  <td>城市建设投资集团</td>
                  <td>xx城市建设投资集团</td>
                  <td>7,342.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市国有资本投资运营有限公司</td>
                  <td>国有资本投资运营集团</td>
                  <td>xx国有资本投资运营集团</td>
                  <td>12,324.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市金融投资集团有限公司</td>
                  <td>金融投资集团</td>
                  <td>xx金融投资集团</td>
                  <td>5,790.24</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市运河综合保护开发建设集团有限责任公司</td>
                  <td>运河综合保护开发建设集团</td>
                  <td>xxx运河综合保护开发建设集团</td>
                  <td>1,329.09</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市运河综合保护开发建设集团有限责任公司</td>
                  <td>运河综合保护开发建设集团</td>
                  <td>xxx运河综合保护开发建设集团</td>
                  <td>1,329.09</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市城市建设投资集团有限公司</td>
                  <td>城市建设投资集团</td>
                  <td>xx城市建设投资集团</td>
                  <td>7,342.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市国有资本投资运营有限公司</td>
                  <td>国有资本投资运营集团</td>
                  <td>xx国有资本投资运营集团</td>
                  <td>12,324.00</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市金融投资集团有限公司</td>
                  <td>金融投资集团</td>
                  <td>xx金融投资集团</td>
                  <td>5,790.24</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
                <tr>
                  <td>杭州市运河综合保护开发建设集团有限责任公司</td>
                  <td>运河综合保护开发建设集团</td>
                  <td>xxx运河综合保护开发建设集团</td>
                  <td>1,329.09</td>
                  <td>2021-11-24<br />11:34:57</td>
                </tr>
              </table>
            </div>
          </div>
        </li>
      </ul>
      <ul class="c-main cm03">
        <li class="cm-item cmi05">
          <h4>项目五</h4>
          <p class="pdw">单位：万元</p>
          <div class="sim-select ss3">
            <p class="ss-txt">杭州市国资委(全部下属单位)</p>
            <ul class="ss-box">
              <li class="ss-list">杭州市国资委(全部下属单位)</li>
              <li class="ss-list">杭州市城市建设投资集团有限公司</li>
              <li class="ss-list">杭州市国有资本投资运营有限公司</li>
              <li class="ss-list">
                杭州市运河综合保护开发建设集团有限责任公司
              </li>
              <li class="ss-list">杭州市金融投资集团有限公司</li>
              <li class="ss-list">杭州市实业投资集团有限公司</li>
              <li class="ss-list">杭州市商贸旅游集团有限公司</li>
              <li class="ss-list">杭州市交通投资集团有限公司</li>
              <li class="ss-list">杭州市钱江新城投资集团有限公司</li>
              <li class="ss-list">杭州市地铁集团有限责任公司</li>
              <li class="ss-list">西湖电子集团有限公司</li>
              <li class="ss-list">杭州种业集团有限公司</li>
            </ul>
          </div>
          <div class="zb-box">
            <p class="w5-sum">52.77%</p>
            <p class="w5-sum ws2">27.62%</p>
            <div class="w5" id="container051"></div>
            <div class="w5" id="container052"></div>
          </div>
        </li>
        <!-- <li class="cm-item cmi06">
            <p class="pw-title clearfix">资金流量分析(近30日)<span class="pdw">单位：万元</span></p>
            <div class="sim-select ss4">
              <p class="ss-txt">杭州市国资委(全部下属单位)</p>
              <ul class="ss-box">
                <li class="ss-list">杭州市国资委(全部下属单位)</li>
                <li class="ss-list">杭州市城市建设投资集团有限公司</li>
                <li class="ss-list">杭州市国有资本投资运营有限公司</li>
                <li class="ss-list">杭州市运河综合保护开发建设集团有限责任公司</li>
                <li class="ss-list">杭州市金融投资集团有限公司</li>
                <li class="ss-list">杭州市实业投资集团有限公司</li>
                <li class="ss-list">杭州市商贸旅游集团有限公司</li>
                <li class="ss-list">杭州市交通投资集团有限公司</li>
                <li class="ss-list">杭州市钱江新城投资集团有限公司</li>
                <li class="ss-list">杭州市地铁集团有限责任公司</li>
                <li class="ss-list">西湖电子集团有限公司</li>
                <li class="ss-list">杭州种业集团有限公司</li>
              </ul>
            </div>
            <ul class="legend-box">
              <li class="lb-list lb01">
                <p>资金流入</p>
                <p class="lb-money">125,237,654.27</p>
              </li>
              <li class="lb-list lb02">
                <p>资金流出</p>
                <p class="lb-money">25,000,357.07</p>
              </li>
            </ul>
            <div class="w8" id="container8"></div>
          </li> -->
        <li class="cm-item cmi08">
          <div class="clearfix">
            <h4>项目八<span class="pdw">单位：万元</span></h4>
            <div class="fr ss-right">
              <div class="sim-select ss2">
                <p class="ss-txt">系统外</p>
                <ul class="ss-box">
                  <li class="ss-list">系统外</li>
                  <li class="ss-list">系统内</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w8" id="container8"></div>
        </li>
        <li class="cm-item cmi11">
          <div class="clearfix">
            <h4>项目十一<span class="pdw">单位：万元</span></h4>
            <div class="fr ss-right">
              <div class="sim-select ss2">
                <p class="ss-txt">系统外</p>
                <ul class="ss-box">
                  <li class="ss-list">系统外</li>
                  <li class="ss-list">系统内</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w9" id="container11"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";
import { drawChartC } from "@/utility/initEcharts";
import simSelect from "../../components/base/simSelect";
// import chartCompo from "../../components/echarts/chartCompo.vue";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

import "swiper/swiper.min.css";
import "swiper/modules/autoplay/autoplay.min.css";
// 当前日期
const NowDate = new Date();
const currentYear = NowDate.getFullYear();
const currentMonth = NowDate.getMonth() + 1;
const currentDate = NowDate.getDate();
const currentDay = NowDate.getDay();

export default {
  components: { simSelect, Swiper, SwiperSlide },
  data() {
    return {
      dateInfo: "", // 年.月.日 星期几
      dayList: ["日", "一", "二", "三", "四", "五", "六"],
      pList01: [],
      pList02: [],
      lineOptionArr01: [],
      pList03: [],
      lineOptionArr02: [],
      pList09: [],
    };
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log(this.lineOption01.series[0].data);
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
  mounted() {
    this.$nextTick(() => {
      // setTimeout(() => {
      this.getData();
      // }, 1000);
      // 年.月.日 星期几
      this.dateInfo =
        currentYear +
        "." +
        currentMonth +
        "." +
        currentDate +
        " 星期" +
        this.dayList[currentDay];
    });
  },
  methods: {
    getData() {
      let that = this;
      localServer
        .get("./baseD/echartsData01.json")
        .then((res) => {
          that.pList01 = res.data.pList01;
          // 2
          that.pList02 = res.data.pList02;
          let lineData01 = res.data.lineData01;
          lineData01.unshift(lineData01[lineData01.length - 1]);
          lineData01.push(lineData01[1]);
          for (let i in lineData01) {
            // 折线图配置option
            let lineOption = {
              xAxis: {
                show: false,
                type: "category",
                boundaryGap: false,
              },
              grid: {
                top: "20px",
                left: "0",
                right: "0",
                bottom: "1px", // 数值为0的部分能完全显示出来
                width: "100%", //图例宽度
                // height: "100%", //图例高度
              },
              yAxis: {
                show: false,
                type: "value",
              },
              series: [
                {
                  data: [],
                  type: "line",
                  symbol: "none",
                  lineStyle: {
                    width: 2, //折线宽度
                    // opacity: 0.14,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#90FEDB", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#22E4F8", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  areaStyle: {
                    opacity: 0.14,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#90FEDB", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#22E4F8", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  smooth: true,
                },
              ],
            };
            lineOption.series[0].data = lineData01[i].yVal;
            that.lineOptionArr01.push(lineOption);
          }
          drawChartC("chartSwiper2", that.lineOptionArr01);
          // 图3
          that.pList03 = res.data.pList03;
          let lineData02 = res.data.lineData02;
          lineData02.unshift(lineData02[lineData02.length - 1]);
          lineData02.push(lineData02[1]);
          for (let i in lineData02) {
            // 折线图配置option
            let lineOption02 = {
              xAxis: {
                show: false,
                type: "category",
                boundaryGap: false,
              },
              grid: {
                top: "20px",
                left: "0",
                right: "0",
                bottom: "1px",
                width: "100%", //图例宽度
                // height:"100%", //图例高度
              },
              yAxis: {
                show: false,
                type: "value",
              },
              series: [
                {
                  data: [
                    0, 0, 1200, 860, 1000, 450, 865, 654, 630, 932, 901, 934,
                    1290,
                  ],
                  type: "line",
                  symbol: "none",

                  lineStyle: {
                    width: 2, //折线宽度
                    // opacity: 0.14,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ED80AE", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#79B4E9", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  areaStyle: {
                    opacity: 0.14,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ED80AE", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#79B4E9", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  smooth: true,
                },
              ],
            };
            lineOption02.series[0].data = lineData02[i].yVal;
            that.lineOptionArr02.push(lineOption02);
          }
          drawChartC("chartSwiper3", that.lineOptionArr02);
          // 图9
          that.pList09 = res.data.pList09;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    optionE(i) {
      return this[`${"lineOption0" + (i + 1)}`];
    },
  },
};
</script>

<style lang="less" scoped>
.chart-body {
  // width: 100%;
  min-width: 1920px;
  padding: 20px;
  background-color: #050811;
  h1 {
    position: relative;
    font-size: 46px;
    line-height: 56px;
    text-align: center;
    color: #fff;
    margin-bottom: 24px;
    .i-wave {
      display: inline-block;
      margin-top: 19px;
      width: 67px;
      height: 18px;
      background: url(../../assets/images/chartOne/wave@2x.png) no-repeat center;
      background-size: 100% 100%;
      vertical-align: top;
      &.left {
        margin-right: 16px;
      }
      &.right {
        margin-left: 16px;
        transform: rotateY(180deg);
      }
    }
    .date {
      position: absolute;
      right: 30px;
      top: 22px;
      font-size: 16px;
      color: #fff;
      line-height: 18px;
      font-weight: normal;
    }
  }
  .c-wrapper {
    // font-size: 0;
    display: flex;
    .c-main {
      // display: inline-block;
      // vertical-align: top;
      width: 28%;
      padding: 0 10px;
      &.cm02 {
        width: 44%;
      }
      .cm-item {
        position: relative;
        // display: inline-block;
        // vertical-align: top;
        // margin: 0 10px 20px;
        // width: 100%;
        margin-bottom: 20px;
        background: #061726 url(../../assets/images/chartOne/line@2x.png)
          no-repeat top center;
        background-size: 100% 2px;
        border-radius: 10px;
        &.cmi01,
        &.cmi02,
        &.cmi03,
        &.cmi04,
        &.cmi05 {
          height: 170px;
        }
        &.cmi06,
        &.cmi07,
        &.cmi08,
        &.cmi09,
        &.cmi010,
        &.cmi11 {
          height: 370px;
        }
        &.cmi02,
        &.cmi03 {
          display: inline-block;
          vertical-align: top;
          margin-right: 20px;
          width: 30%;
        }
        &.cmi04 {
          display: inline-block;
          vertical-align: top;
          width: calc(40% - 40px);
        }
        h4 {
          padding: 20px 20px 0;
          font-size: 15px;
          color: #fff;
          line-height: 17px;
          .pdw {
            display: inline-block;
            padding-left: 10px;
            margin-top: 0;
          }
          .small {
            margin-left: 4px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 14px;
          }
        }
        // 单位
        .pdw {
          margin-top: 4px;
          padding-left: 20px;
          color: #fff;
          font-size: 12px;
          line-height: 1;
          opacity: 0.7;
          filter: alpha(opacity=70);
          vertical-align: baseline;
          font-style: italic;
        }
        // 图一
        .cg-main {
          padding: 36px 0 0 20px;
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          .cg-item {
            flex: 1;
            padding-top: 12px;
            padding-left: 70px;
            font-size: 12px;
            line-height: 20px;
            height: 64px;
            color: #fff;
            background: url(../../assets/images/chartOne/1@2x.png) no-repeat
              left center;
            background-size: 64px 64px;
            &.cg02 {
              background-image: url(../../assets/images/chartOne/2@2x.png);
            }
            .cg-msg {
              opacity: 0.7;
              filter: alpah(opacity=70);
            }
            .cg-num {
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
// 图2
.w2 {
  width: 100%;
  height: 104px;
}
.pw-money {
  padding-left: 20px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #4da9ff;
  line-height: 19px;
}
.i-direction {
  position: absolute;
  top: 21px;
  right: 10px;
  height: 16px;
  font-size: 14px;
  color: #81c784;
  line-height: 16px;
  padding-left: 10px;
  background: url(../../assets/images/chartOne/i_up@2x.png) no-repeat left
    center;
  background-size: 8px 8px;
  &.down {
    color: #e57373;
    background-image: url(../../assets/images/chartOne/i_down@2x.png);
  }
}
/* 图4 */
.cmi04 {
  .pw-money {
    margin-bottom: 40px;
  }
  .pw-info {
    position: relative;
    margin-bottom: 13px;
    padding-left: 20px;
    span {
      display: inline-block;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      opacity: 0.7;
      filter: alpha(opacity=70);
      vertical-align: baseline;
      &.pwi-txt {
        width: 62px;
      }
      &.i-direction {
        position: relative;
        top: 0;
        left: 0;
        margin-left: 8px;
        font-size: 14px;
        font-weight: bold;
        opacity: 1;
        filter: alpha(opacity=100);
      }
      &.down {
        color: #fff;
      }
    }
  }
}

// swiper
.swiper {
  height: 170px;
}
</style>
