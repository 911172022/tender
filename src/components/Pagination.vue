<template>
  <div class="flex-row">
    <span>共 {{total}} 条</span>
    <div class="page-size flex-row" :class="{'background': backGround}" @click="pitchOn">
      <button
        :class="['pre', 'el-icon-arrow-left', 'page-size-btn',{'background': backGround, 'z-disabled': preDisable}]"
      ></button>
      <ul class="flex-row">
        <li>
          <button
            :class="['page-size-btn',{'btn-pitch-on': backGround && current == 1,'btn-pitch-on-no-background': !backGround && current == 1}]"
          >1</button>
        </li>
        <li
          v-show="showPreMore"
          @mouseenter="preMoreClass = false"
          @mouseleave="preMoreClass = true"
        >
          <button
            :class="['page-size-btn','leftMore',{'el-icon-more': preMoreClass,'el-icon-d-arrow-left': !preMoreClass}]"
            @click.stop="morePage"
          ></button>
        </li>
        <li v-for="item in page" :key="item">
          <button
            :class="['page-size-btn',{'btn-pitch-on':backGround && current == item,'btn-pitch-on-no-background': !backGround && current == item}]"
          >{{item}}</button>
        </li>
        <li
          v-show="showNextMore"
          @mouseenter="nextMoreClass = false"
          @mouseleave="nextMoreClass = true"
        >
          <button
            :class="['page-size-btn','rightMore',{'el-icon-more': nextMoreClass,'el-icon-d-arrow-right': !nextMoreClass}]"
            @click.stop="morePage"
          ></button>
        </li>
        <li v-if="Math.ceil(total / currentPageSize) != 1">
          <button
            :class="['page-size-btn',{'btn-pitch-on':backGround && (current == total || current == Math.ceil(total / currentPageSize)),'btn-pitch-on-no-background': !backGround && (current == total || current == Math.ceil(total / currentPageSize))}]"
          >{{currentPageSize ? Math.ceil(total / currentPageSize) :total}}</button>
        </li>
      </ul>
      <button
        :class="['next', 'el-icon-arrow-right', 'page-size-btn',{'background': backGround, 'z-disabled': nextDisable}]"
      ></button>
    </div>
    <div class="z-jump-page">
      <span>跳至</span>
      <input
        class="z-input z-input-inner border-hover"
        type="number"
        @keydown.enter="jumpCurrent"
        v-model="jumpPage"
      />
      <span>页</span>
    </div>
    <div :class="['z-select','border-hover',{'border-click': show}]" v-if="pageSizes">
      <div @click="selectClick" class="select-box">
        <span class="z-select-inner">
          {{currentPageSize ? currentPageSize : pageSize[0]}} 条 / 页
          <span
            :class="['z-arrow-down',{'z-arrow-down-rotate': show}]"
          >></span>
        </span>
      </div>
      <transition name="fade">
        <div class="z-select-dropdown" v-if="show">
          <ul class="z-select-list" v-if="pageSize.length > 0">
            <li
              v-for="(item, index) in pageSize"
              :key="index"
              :class="['z-select-item',{'z-select-item-selected': selectIndex == index}]"
              @click="clickSelectItem(item, index)"
            >{{item}} 条 / 页</li>
          </ul>
          <ul v-else class="z-select-none">
            <li>暂无数据</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 总数
    total: {
      type: Number,
      default: 0,
      required: true
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 7,
      validator: function(value) {
        return (
          (value | 0) === value && value > 4 && value < 22 && value % 2 === 1
        );
      }
    },
    backGround: {
      type: Boolean,
      default: false
    },
    // 每页显示的数据数量
    pageSizes: {
      type: Array
    }
  },
  data() {
    return {
      jumpPage: 1,
      current: 1,
      showPreMore: false,
      showNextMore: false,
      nextMoreClass: true,
      preMoreClass: true,
      preDisable: false,
      nextDisable: false,
      show: false,
      selectIndex: "",
      currentPageSize: ""
    };
  },
  computed: {
    pageSize() {
      if (this.pageSizes.length == 0) {
        return [10, 20, 50, 100];
      } else {
        this.currentPageSize = this.pageSizes[0];
        return this.pageSizes;
      }
    },
    page() {
      // 当前页数
      const current = Number(this.current);
      // 显示的页码数量
      const pagerCount = this.pagerCount;
      // 显示的页码数量 / 2
      const halfPagerCount = (pagerCount - 1) / 2;
      // 总数
      let total = this.total;
      if (this.currentPageSize) {
        total = Math.ceil(this.total / this.currentPageSize);
      }
      let showPreMore = false;
      let showNextMore = false;
      // 总数大于页码数量
      if (total > pagerCount) {
        // 当前的页数 大于 页码数量 - 页码数量 / 2 显示showPreMore
        if (current > pagerCount - halfPagerCount) {
          showPreMore = true;
        }
        // 当前页数 小于 总数 - 页码数量 / 2 显示showNextMore
        if (current < total - halfPagerCount) {
          showNextMore = true;
        }
      }
      const array = [];
      if (showPreMore && !showNextMore) {
        const startPage = total - (pagerCount - 2);
        for (let i = startPage; i < total; i++) {
          array.push(i);
        }
      } else if (!showPreMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPreMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = current - offset; i <= current + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < total; i++) {
          array.push(i);
        }
      }

      this.showPreMore = showPreMore;
      this.showNextMore = showNextMore;
      this.showPreMore;
      return array;
    }
  },
  watch: {
    current: {
      handler(val) {
        if (val == 1) {
          this.preDisable = true;
          this.nextDisable = false;
        } else if (val == Math.ceil(this.total / this.currentPageSize)) {
          this.preDisable = false;
          this.nextDisable = true;
        } else {
          this.preDisable = false;
          this.nextDisable = false;
        }
      },
      deep: true,
      immediate: true
    },
    currentPageSize(val) {
      if (this.current > Math.ceil(this.total / this.currentPageSize)) {
        this.current = Math.ceil(this.total / this.currentPageSize);
      }
    }
  },
  methods: {
    // 点击页面或prev,next
    pitchOn(e) {
      let vm = this;
      let className = e.target.className;
      if (className.indexOf("next") != -1) {
        if (
          vm.currentPageSize &&
          vm.current != Math.ceil(vm.total / vm.currentPageSize)
        ) {
          vm.current++;
        }
      } else if (className.indexOf("pre") != -1) {
        if (vm.current != 1) {
          vm.current--;
        }
      } else {
        vm.current = Number(e.target.textContent);
      }
      this.$emit("current-change", this.current);
    },
    // 点击展示更多页码
    morePage(e) {
      let className = e.target.className;
      let pageLast = this.page.pop();
      let pageFirst = this.page.shift();
      if (className.indexOf("leftMore") != -1) {
        if (pageLast == this.total - 1) {
          this.current = pageFirst;
        } else {
          this.current = this.current - this.pagerCount + 2;
          if (!this.current) {
            this.current = "1";
          }
        }
      } else {
        if (pageFirst == 2) {
          this.current = pageLast;
        } else {
          this.current = this.current + this.pagerCount - 2;
          if (this.current > this.total) {
            this.current = this.total;
          }
        }
      }
      this.$emit("current-change", this.current);
    },
    showMore() {
      if (this.total > this.pagerCount) {
        this.showPreMore = true;
        this.showNextMore = true;
      } else {
        this.showPreMore = false;
        this.showNextMore = false;
      }
    },
    jumpCurrent() {
      this.current = Number(this.jumpPage);
      this.$emit("current-change", this.current);
    },
    clickSelectItem(item, index) {
      this.show = false;
      this.currentPageSize = item;
      this.selectIndex = index;
      this.$emit("pageSizes", item);
    },
    selectClick() {
      this.show = !this.show;
    }
  },
  mounted() {
    this.showMore();
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    });
  }
};
</script>

<style lang="scss" scope>
@import "./select/css.scss";
.flex-row {
  display: flex;
  align-items: center;
}
.page-size-btn {
  margin: 0 5px;
  min-width: 30px;
  min-height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #409eff;
  }
}
.background {
  button {
    background-color: #f4f4f5;
  }
}
.btn-pitch-on {
  background-color: #409eff;
  color: #fff;
  cursor: default !important;
  &:hover {
    color: #fff;
  }
}
.btn-pitch-on-no-background {
  color: #409eff;
  cursor: default !important;
}
.z-jump-page {
  display: flex;
  font-size: 14px;
  width: 120px;
  align-items: center;
  justify-content: space-between;
  .z-input-inner {
    text-align: center;
    width: 50px;
    padding: 0;
  }
}
</style>