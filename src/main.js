import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "default-passive-events";

// 引入 echarts
// import * as echarts from "echarts";
// 引入封装好的初始化方法
import { drawChart } from "@/utility/initEcharts";
// 在vue的原型上绑上 刚刚封装的方法，将来可以在组件中通过this.$drawChart()来进行调用
const app = createApp(App);
app.config.globalProperties.$drawChart = drawChart;
// 全局挂载 echarts
// app.config.globalProperties.$echarts = echarts;

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
app.use(store).use(router).mount("#app");
