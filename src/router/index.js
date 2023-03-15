import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: "/",
  // },
  {
    path: "/login",
    redirect: "login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/main",
    name: "Main",
    redirect: "home", // 默认跳转到home页
    component: () => import("@/views/main"),
    children: [
      {
        path: "/home",
        name: "HomePage",
        component: () => import("@/views/Home"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/About"),
      },
      {
        path: "/plugin",
        name: "Plugin",
        component: () => import("@/views/plugin/plugin"),
      },
      {
        path: "/echartsGroup",
        name: "EchartsGroup",
        component: () => import("@/views/echarts/echartsGroup"),
      },
      {
        path: "/fadePlay",
        name: "FadePlay",
        component: () => import("@/views/plugin/fadePlay"),
      },
      {
        path: "/slidePlay",
        name: "SlidePlay",
        component: () => import("@/views/plugin/slidePlay"),
      },
      {
        path: "/similarBDCalendar",
        name: "SimilarBDCalendar",
        component: () => import("@/views/plugin/similarBDCalendar"),
      },
      {
        path: "/calendarNormal",
        name: "CalendarNormal",
        component: () => import("@/views/plugin/calendarNormal"),
      },
      {
        path: "/countdown",
        name: "Countdown",
        component: () => import("@/views/plugin/countdown"),
      },
      {
        path: "/dormancyTime",
        name: "DormancyTime",
        component: () => import("@/views/plugin/dormancyTime"),
      },
      {
        path: "/page",
        name: "Page",
        component: () => import("@/views/plugin/page"),
      },
      {
        path: "/tableData",
        name: "TableData",
        component: () => import("@/views/plugin/tableData"),
      },
      {
        path: "/bigWheel",
        name: "BigWheel",
        component: () => import("@/views/plugin/bigWheel"),
      },
      {
        path: "/slotMachine",
        name: "SlotMachine",
        component: () => import("@/views/plugin/slotMachine"),
      },
      {
        path: "/BHDConverter",
        name: "BHDConverter",
        component: () => import("@/views/plugin/BHDConverter"),
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
  },
  {
    path: "/cockpitTwo",
    name: "CockpitTwo",
    component: () => import("@/views/echarts/cockpitTwo"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
