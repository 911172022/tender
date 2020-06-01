<template>
  <div class="index container">
    <NavBar :navList="navList" ref="nav"></NavBar>
    <z-select class="container" :data="types" />
    <!-- <Test> -->
    <!-- 独占默认插槽 -->
    <!-- <template v-slot="testSlot">{{testSlot.user.age}}</template> -->
    <!-- 结构插槽 -->
    <!-- <template v-slot="{user}">{{user.age}}</template> -->
    <!-- 重命名 -->
    <!-- <template v-slot="{user: person}">{{person.age}}</template> -->
    <!-- 作用域插槽 -->
    <!-- <template slot-scope="{user}">{{user.name}}</template> -->
    <!-- </Test> -->
    <!-- <div v-for="item in list2" :key="item.id">
      <img :src="item.Image2" style="width: 100%" alt />
    </div>-->
    <!-- <div class="container" v-for="item in list" :key="item.id">
      <a :href="item.Url">超链接</a>
    </div>-->
    <z-page :total="100" @current-change="currentChange" :page-sizes="[20,30,40,50]" />
    <div v-drag class="drag">{{input}}</div>
    <!-- <div>{{input}}</div> -->
    <z-input v-model="input" type="phone" />
    <z-button size="small">提交</z-button>
    <iframe src="public/1.html" frameborder="0" width="1200" height="300" scrolling="auto"></iframe>
  </div>
</template>

<script>
import { testList2, testList } from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      navList: [
        { name: "首页" },
        { name: "通知公告" },
        { name: "帮助中心" },
        { name: "关于我们" }
      ],
      list2: [],
      list: [],
      types: [
        "设计",
        "勘察",
        "施工",
        "咨询",
        "EPC",
        "PPP",
        "建筑合同",
        "大数据类合同",
        "其它"
      ]
    };
  },
  methods: {
    getTestList() {
      testList2().then(res => {
        this.list2 = res;
      });
      testList().then(res => {
        this.list = res.list;
      });
    },
    currentChange(e) {},
    move(e) {
      let odiv = e.target; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
  mounted() {
    this.getTestList();
  }
};
</script>

<style lang="scss" scope>
.drag {
  background-color: red;
  width: 50px;
  height: 50px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  cursor: all-scroll;
}
</style>