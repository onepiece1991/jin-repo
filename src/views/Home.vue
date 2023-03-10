<template>
  <div class="cont-box">
    <HelloWorld msg="Welcome to the jin-repo!" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="less" scoped></style>
