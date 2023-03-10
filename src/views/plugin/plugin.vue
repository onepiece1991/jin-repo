<template>
  <div class="cont-box">
    <ul class="list-box">
      <li v-for="(item, i) in pluginList" :key="i">
        <router-link :to="item.link">
          <h4 class="title">{{ item.title }}</h4>
          <p class="time">{{ item.time }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pluginList: [
        {
          link: "/fadePlay",
          title: "轮播图（淡入淡出）",
          time: "2021",
        },
        {
          link: "/slidePlay",
          title: "轮播图（无缝轮播）",
          time: "2021",
        },
        {
          link: "/similarBDCalendar",
          title: "仿百度日历",
          time: "2021",
        },
        {
          link: "/calendarNormal",
          title: "日历(常规)",
          time: "2021",
        },
        {
          link: "/countdown",
          title: "下班时间倒计时",
          time: "2021",
        },
        {
          link: "/dormancyTime",
          title: "休眠时间计算",
          time: "2021",
        },
        {
          link: "/page",
          title: "分页",
          time: "2021",
        },
        {
          link: "/tableData",
          title: "表格数据遍历(可编辑，可跨行)",
          time: "2021",
        },
        {
          link: "/bigWheel",
          title: "大转盘之",
          time: "2022",
        },
        {
          link: "/slotMachine",
          title: "老虎机",
          time: "2022",
        },
        {
          link: "/BHDConverter",
          title: "进制转换器",
          time: "2022",
        },
      ],
    };
  },
  methods: {
    goPage(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
.list-box {
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;
  font-size: 0;
  li {
    display: inline-block;
    width: 25%;
    padding: 10px;
    vertical-align: top;
    a {
      position: relative;
      display: block;
      padding: 10px;
      height: 120px;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      background-color: #fff;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      &:hover {
        .title {
          color: #42b983;
        }
      }
      .title {
        font-size: 15px;
        line-height: 22px;
        font-weight: bold;
      }
      .time {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #999;
      }
    }
  }
}
</style>
