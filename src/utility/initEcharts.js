// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入各种图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart, GaugeChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  // GeoCoComponent
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// DIV 宽高变化监听
import { EleResize } from "@/utility/eleResize";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  LineChart,
  GaugeChart,
  CanvasRenderer,
]);

/** 封装 echart初始化方法，需要传入 绘制图表的dom元素和绘制图表缩需要的相关配置项 *
 *   同时还添加了图表自动适应dom的宽高变化的功能，需要引入EleResize.js
 */
export function drawChart(dom, option) {
  const $Chart = echarts.init(document.getElementById(dom));
  const resizeDiv = document.getElementById(dom);
  $Chart.setOption(option);
  const listener = function () {
    $Chart.resize();
  };
  EleResize.on(resizeDiv, listener);
  return $Chart;
}

/** 封装 echart初始化方法，传入class类名
 */
export function drawChartC(classname, optionArr) {
  setTimeout(() => {
    const myEchart = document.getElementsByClassName(classname);
    let chart = null;
    Array.prototype.forEach.call(myEchart, function (element, i) {
      element.setAttribute("_echarts_instance_", "");
      chart = echarts.init(element);
      chart.setOption(optionArr[i]);
    });
    // 或者
    // for (let i = 0; i < myEchart.length; i++) {
    //   myEchart[i].setAttribute("_echarts_instance_", "");
    //   chart = echarts.init(myEchart[i]);
    //   chart.setOption(optionArr[i]);
    // }
  });
}
