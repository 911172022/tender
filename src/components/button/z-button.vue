<template>
  <button
    :class="[
      'z-button',
      type ? `z-button_${type}` : 'z-button_default',
      size ? `z-button-size_${size}` : 'z-button-size_default',
      {'z-disabled': disabled},
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    round: Boolean,
    plain: Boolean,
    type: String,
    size: String
  }
};
</script>

<style lang="scss" scope>
@import "./css.scss";
</style>