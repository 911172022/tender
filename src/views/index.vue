<template>
  <div class="index">
    <NavBar :navList="navList" ref="nav"></NavBar>
    <Test>
      <!-- 独占默认插槽 -->
      <template v-slot="testSlot">{{testSlot.user.age}}</template>
      <!-- 结构插槽 -->
      <template v-slot="{user}">{{user.age}}</template>
      <!-- 重命名 -->
      <template v-slot="{user: person}">{{person.age}}</template>
      <!-- 作用域插槽 -->
      <template slot-scope="{user}">{{user.name}}</template>
    </Test>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { name: "首页" },
        { name: "通知公告" },
        { name: "帮助中心" },
        { name: "关于我们" }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scope>
</style>