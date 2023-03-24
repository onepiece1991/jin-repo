// import { createRouter, createWebHistory } from "vue-router";
// 打包
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/main",
    name: "Main",
    redirect: "home", // 默认跳转到home页
    component: () => import("@/views/main"),
    meta: {
      title: "主页",
    },
    children: [
      {
        path: "/home",
        name: "HomePage",
        component: () => import("@/views/Home"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/About"),
        meta: {
          title: "关于",
        },
      },
      {
        path: "/plugin",
        name: "Plugin",
        component: () => import("@/views/plugin/plugin"),
        meta: {
          title: "插件集合",
        },
      },
      {
        path: "/echartsGroup",
        name: "EchartsGroup",
        component: () => import("@/views/echarts/echartsGroup"),
        meta: {
          title: "echarts",
        },
      },
      {
        path: "/fadePlay",
        name: "FadePlay",
        component: () => import("@/views/plugin/fadePlay"),
        meta: {
          title: "淡入淡出",
        },
      },
      {
        path: "/slidePlay",
        name: "SlidePlay",
        component: () => import("@/views/plugin/slidePlay"),
        meta: {
          title: "淡入淡出",
        },
      },
      {
        path: "/similarBDCalendar",
        name: "SimilarBDCalendar",
        component: () => import("@/views/plugin/similarBDCalendar"),
        meta: {
          title: "仿百度日历",
        },
      },
      {
        path: "/calendarNormal",
        name: "CalendarNormal",
        component: () => import("@/views/plugin/calendarNormal"),
        meta: {
          title: "日历(常规)",
        },
      },
      {
        path: "/countdown",
        name: "Countdown",
        component: () => import("@/views/plugin/countdown"),
        meta: {
          title: "下班时间倒计时",
        },
      },
      {
        path: "/dormancyTime",
        name: "DormancyTime",
        component: () => import("@/views/plugin/dormancyTime"),
        meta: {
          title: "休眠时间计算",
        },
      },
      {
        path: "/page",
        name: "Page",
        component: () => import("@/views/plugin/page"),
        meta: {
          title: "分页",
        },
      },
      {
        path: "/tableData",
        name: "TableData",
        component: () => import("@/views/plugin/tableData"),
        meta: {
          title: "表格数据遍历(可编辑，可跨行)",
        },
      },
      {
        path: "/bigWheel",
        name: "BigWheel",
        component: () => import("@/views/plugin/bigWheel"),
        meta: {
          title: "大转盘之今天吃什么",
        },
      },
      {
        path: "/slotMachine",
        name: "SlotMachine",
        component: () => import("@/views/plugin/slotMachine"),
        meta: {
          title: "老虎机",
        },
      },
      {
        path: "/BHDConverter",
        name: "BHDConverter",
        component: () => import("@/views/plugin/BHDConverter"),
        meta: {
          title: "进制转换器",
        },
      },
    ],
  },
  // echarts
  // {
  //   path: "/line",
  //   name: "Line",
  //   component: () => import("@/views/echarts/line"),
  // },
  // {
  //   path: "/gauge",
  //   name: "Gauge",
  //   component: () => import("@/views/echarts/gauge"),
  // },
  // 驾驶舱
  // {
  //   path: "/otherPage",
  //   name: "OtherPage",
  //   component: () => import("@/views/otherPage"),
  // },
  {
    path: "/cockpitOne",
    name: "CockpitOne",
    component: () => import("@/views/echarts/cockpitOne"),
    meta: {
      title: "驾驶舱一号",
    },
  },
  {
    path: "/cockpitTwo",
    name: "CockpitTwo",
    component: () => import("@/views/echarts/cockpitTwo"),
    meta: {
      title: "驾驶舱二号",
    },
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 打包
  history: createWebHashHistory(),
  routes,
});

export default router;
