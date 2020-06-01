<template>
  <div :class="['z-select','border-hover',{'border-click': show}]">
    <div @click="selectClick" ref="select">
      <span class="z-select-inner">
        <input
          type="text"
          :class="['z-point']"
          readonly
          v-model="currentData"
          :placeholder="placeholder"
        />
        <span :class="['z-arrow-down',{'z-arrow-down-rotate': show}]">></span>
      </span>
    </div>
    <transition name="fade">
      <div
        ref="selectDropDown"
        :class="['z-select-dropdown']"
        :style="{minWidth: dropDownWidth +'px',top: topCount}"
        v-show="show"
      >
        <ul class="z-select-list" v-if="data.length > 0">
          <li
            v-for="(item, index) in data"
            :key="index"
            :class="['z-select-item',{'z-select-item-selected': selectIndex == index}]"
            @click="clickSelectItem(item, index)"
          >{{item}}</li>
        </ul>
        <ul v-else class="z-select-none">
          <li>暂无数据</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    placeholder: {
      type: String,
      default: "请选择"
    }
  },

  data() {
    return {
      selectIndex: null,
      dropDownWidth: "",
      show: false, // 打开list
      currentData: null, // 选中select
      topCount: "32px"
    };
  },
  methods: {
    clickSelectItem(item, index) {
      this.show = false;
      this.selectIndex = index;
      this.currentData = item;
      this.$emit("pageSizes", this.currentData);
    },
    selectClick(e) {
      this.show = !this.show;
      this.$nextTick(() => {
        let selectHiehgt = this.$refs.select.getBoundingClientRect().top;
        let selectDropDownHeight = this.$refs.selectDropDown.offsetHeight;
        let docHeight = document.documentElement.clientHeight;
        if (selectHiehgt + selectDropDownHeight > docHeight) {
          this.topCount = "-210px";
        } else {
          this.topCount = "30px";
        }
      });
    }
  },
  mounted() {
    this.dropDownWidth = this.$refs.select.clientWidth;
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    });
  }
};
</script>

<style lang="scss">
@import "./css.scss";
</style>