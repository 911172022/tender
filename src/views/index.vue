<template>
  <div class="index">
    <NavBar :navList="navList"></NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components: {NavBar},
  data() {
    return {
      navList: [
        {name: "首页"},
        {name: "通知公告"},
        {name: "帮助中心"},
        {name: "关于我们"}
      ]
    }
  }
};
</script>

<style lang="scss" scope>

</style>