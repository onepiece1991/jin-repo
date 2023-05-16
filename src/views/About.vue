<template>
  <div class="cont-box">
    <h3 class="a-title">项目：jin-repo</h3>
    <p class="a-title2">项目简介</p>
    <p class="a-msg">
      主要是记录平时用到的一些插件(<a
        href="https://onepiece1991.github.io/2018/11/21/plugins-demo-2018/"
        target="_blank"
        rel="noopener"
        class="a-link"
        >友情链接</a
      >)
    </p>
    <p class="a-title2">更多好用的工具推荐：</p>
    <a target="_blank" class="a-link mr20" href="https://c.runoob.com/"
      >菜鸟工具</a
    >
    <a
      target="_blank"
      class="a-link mr20"
      href="https://c.runoob.com/front-end/58/"
      >在线进制转换器</a
    >
    <p class="a-title2">amuseMyself：</p>
    <p><router-link to="/lottery" class="a-link mr20">lottery</router-link></p>
    <p class="a-title2">节流和防抖</p>
    <p>
      函数节流：是确保函数特定的时间内至多执行一次。
      函数防抖：是函数在特定的时间内不被再调用后执行。
    </p>
    <div>
      <router-link to="/throttle" class="a-link mr20"
        >节流（throttle）</router-link
      >
      <router-link to="/debounce" class="a-link mr20"
        >防抖（debounce）</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.a-title {
  font-size: 16px;
  color: #333;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
}
.a-title2 {
  margin: 10px 0;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  font-weight: bold;
}
.a-msg {
  font-size: 14px;
  color: #333;
  line-height: 20px;
}
.mr20 {
  margin-right: 20px;
}
</style>
