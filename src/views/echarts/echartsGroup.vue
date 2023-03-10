<template>
  <div class="cont-box">
    <ul class="list-box">
      <li>
        <div class="chart-box">
          <h4 class="title">折线图 line</h4>
          <chart-compo
            height="180px"
            ref="lineChart"
            id="lineChart"
            :option="lineOption"
          ></chart-compo>
        </div>
      </li>
      <li>
        <div class="chart-box">
          <h4 class="title">仪表盘 gauge</h4>
          <chart-compo
            height="180px"
            ref="gaugeChart"
            id="gaugeChart"
            :option="gaugeOption"
          ></chart-compo>
        </div>
      </li>
      <li>
        <div class="chart-box">
          <h4 class="title">仪表盘 gauge2</h4>
          <chart-compo
            height="180px"
            ref="gaugeChart2"
            id="gaugeChart2"
            :option="gaugeOption2"
          ></chart-compo>
        </div>
      </li>
      <li>
        <div class="chart-box">
          <h4 class="title">柱状图</h4>
          <chart-compo
            height="180px"
            ref="barChart"
            id="barChart"
            :option="barOption"
          ></chart-compo>
        </div>
      </li>
    </ul>
    <p><router-link to="/cockpitOne">驾驶舱1号</router-link></p>
    <p><router-link to="/cockpitTwo">驾驶舱2号</router-link></p>
  </div>
</template>

<script>
import { localServer } from "@/utility/global";
import chartCompo from "../../components/echarts/chartCompo.vue";
// 折线图配置option
const lineOption = {
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
      itemStyle: {
        normal: {
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
        },
      },
      smooth: true,
    },
  ],
};
// 仪表盘画半圆或弧线
const gaugeOption = {
  title: {
    text: "8,720.75",
    subtext: "资金流入总占比",
    bottom: 20,
    x: "center",
    textStyle: {
      fontSize: 9,
      color: "#AFBDD1",
      lineHeight: "12",
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 10,
      color: "#AFBDD1",
      lineHeight: "14",
      align: "center",
    },
    itemGap: 5,
  },
  series: [
    {
      type: "gauge",
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      center: ["50%", "60%"],
      radius: "90%",
      splitNumber: 0,
      itemStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
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
      },
      progress: {
        show: true,
        roundCap: true,
        width: 10,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        color: "#fff",
        lineStyle: {
          opacity: 0.15,
          width: 10,
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        fontSize: 18,
        fontWeight: "bolder",
        color: "#2FE7F5",
        opacity: 0,
        lineHeight: 22,
        offsetCenter: [0, "50%"],
        valueAnimation: true,
        formatter: "{value}%",
      },
      data: [
        {
          value: 52.77,
        },
      ],
    },
  ],
};
const gaugeOption2 = {
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 0,
      radius: 50,
      center: ["16%", "50%"],
      legendHoverLink: false,
      silent: true,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#5FDDFF", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#6078EA", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      progress: {
        show: true,
        roundCap: true,
        width: 14,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
          color: [[1, "rgba(0,0,0,0)"]],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        offsetCenter: [0, 0],
        valueAnimation: true,
        formatter: function (value) {
          if (value == 0) {
            return "{value|" + value.toFixed(0) + "\n}{unit|剩余额度}";
          } else {
            return "{value|" + value.toFixed(4) + "\n}{unit|剩余额度}";
          }
        },
        rich: {
          value: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#F6FAF7",
            lineHeight: 17,
          },
          unit: {
            fontSize: 10,
            color: "#8796B0",
            lineHeight: 14,
          },
        },
      },
      data: [],
    },
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 0,
      radius: 50,
      center: ["50%", "50%"],
      legendHoverLink: false,
      silent: true,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#5FDDFF", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#6078EA", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      progress: {
        show: true,
        roundCap: true,
        width: 14,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
          color: [[1, "rgba(0,0,0,0)"]],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        offsetCenter: [0, 0],
        valueAnimation: true,
        formatter: function (value) {
          if (value == 0) {
            return "{value|" + value.toFixed(0) + "\n}{unit|剩余额度}";
          } else {
            return "{value|" + value.toFixed(4) + "\n}{unit|剩余额度}";
          }
        },
        rich: {
          value: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#F6FAF7",
            lineHeight: 17,
          },
          unit: {
            fontSize: 10,
            color: "#8796B0",
            lineHeight: 14,
          },
        },
      },
      data: [],
    },
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 0,
      radius: 50,
      center: ["84%", "50%"],
      legendHoverLink: false,
      silent: true,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#5FDDFF", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#6078EA", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      progress: {
        show: true,
        roundCap: true,
        width: 14,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
          color: [[1, "rgba(0,0,0,0)"]],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        offsetCenter: [0, 0],
        valueAnimation: true,
        formatter: function (value) {
          if (value == 0) {
            return "{value|" + value.toFixed(0) + "\n}{unit|剩余额度}";
          } else {
            return "{value|" + value.toFixed(4) + "\n}{unit|剩余额度}";
          }
        },
        rich: {
          value: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#F6FAF7",
            lineHeight: 17,
          },
          unit: {
            fontSize: 10,
            color: "#8796B0",
            lineHeight: 14,
          },
        },
      },
      data: [],
    },
  ],
};
const barOption = {
  xAxis: {
    type: "category",
    axisLine: {
      lineStyle: {
        color: "#485573",
      },
    },
    axisLabel: {
      color: "#8796B0",
    },
    axisTick: {
      show: false,
    },
    // 今年的年份后需+(今年)
    data: [],
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      lineStyle: {
        color: "#8796B0",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#485573",
        type: "dashed",
      },
    },
  },
  grid: {
    top: 30,
    left: 56,
    right: 26,
    bottom: 40,
  },
  tooltip: {
    trigger: "item",
    axisPointer: {
      show: false,
    },
    position: "top",
    borderColor: "#8796B0",
    borderWidth: 1,
    backgroundColor: "#2B3648",
    textStyle: {
      fontSize: 12,
      lineHeight: 14,
      color: "#8796B0",
    },
    formatter: "{c}",
  },
  series: [
    {
      data: [],
      type: "bar",
      barWidth: 20,
      itemStyle: {
        borderRadius: 6,
      },
    },
  ],
  color: "#5C48DA",
};

export default {
  components: { chartCompo },
  data() {
    return {
      lineOption: lineOption,
      gaugeOption: gaugeOption,
      gaugeOption2: gaugeOption2,
      barOption: barOption,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      localServer
        .get("/baseD/echartsData.json")
        .then((res) => {
          lineOption.series[0].data = res.data.lineData.yVal;
          // 仪表盘-弧线
          gaugeOption.series[0].data[0].value = res.data.gaugeData.val;
          // 仪表盘-接近圆形
          // 判断值是否为0，为0不显示
          let gOptionData = res.data.gaugeData2;
          for (let i in gOptionData) {
            let optionObj = {
              value: gOptionData[i].value,
              itemStyle: {
                opacity: 1,
              },
              name: gOptionData[i].name,
              title: {
                fontSize: 12,
                lineHeight: 14,
                color: "#afbdd1",
                offsetCenter: [0, 66],
              },
            };

            if (gOptionData[i].value == 0) {
              optionObj.itemStyle.opacity = 0;
            }
            gaugeOption2.series[i].max = gOptionData[i].maxVal;
            console.log(gaugeOption2.series[i]);
            // optionArr.push(optionObj);
            gaugeOption2.series[i].data.push(optionObj);
          }

          // 柱状图数据处理
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          let barXVal = res.data.barData.xVal;
          let barYVal = res.data.barData.yVal;
          for (let i in new Array(barXVal)) {
            if (barXVal[i] == currentYear) {
              barXVal[i] = barXVal[i] + "(今年)";
              barYVal[i] = {
                value: barYVal[i],
                itemStyle: {
                  color: "#34A996",
                },
              };
            }
          }
          barOption.xAxis.data = barXVal;
          barOption.series[0].data = barYVal;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>

<style lang="less" scoped>
.list-box {
  font-size: 0;
  li {
    display: inline-block;
    width: 50%;
    padding: 10px;
    vertical-align: top;
    .chart-box {
      background: #061726 url(../../assets/images/echarts/line@2x.png) no-repeat
        top center;
      background-size: 100% 2px;
      border-radius: 10px;
      .title {
        padding: 10px;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
      // &:hover {
      //   .title {
      //     color: #42b983;
      //   }
      // }
    }
  }
}
</style>
