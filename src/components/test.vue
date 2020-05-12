<template>
  <div class="container">
    <slot :user="user">{{user.name}}</slot>
    <button @click="show = !show">Toggle render</button>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <p v-if="show">Demo</p>
    </transition>
    <input type="text" v-focus />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "张三",
        age: 222
      },
      show: true
    };
  },
  // 自定义局部指令
  directives: {
    focus: {
      inserted: el => {
        el.focus();
      }
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      el.style.opacity = 1;
      el.style.transformOrigin = "right";
    },
    leave: function(el, done) {
      el.style.fontSize = "20px";
    }
  }
};
</script>

<style>
</style>