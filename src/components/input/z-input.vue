<template>
  <div>
    <div v-if="inputType == 'textarea'">
      <textarea
        :placeholder="placeholder"
        :class="['z-input','z-textarea',{'z-disabled': disabled,'border-hover': !disabled}]"
        :value="inputValue"
        :disabled="disabled"
        :autofocus="autofocus"
        :readonly="readonly"
        @input="inputValue = $event.target.value"
        @blur="blur"
        @focus="focus"
        @keydown.enter="enter"
        :rows="rows"
      ></textarea>
    </div>
    <div v-else>
      <input
        :type="inputType"
        :placeholder="placeholder"
        :class="['z-input',{'z-disabled': disabled,'border-hover': !disabled}]"
        :value="inputValue"
        :disabled="disabled"
        :autofocus="autofocus"
        :readonly="readonly"
        @input="inputValue = $event.target.value"
        @blur="blur"
        @focus="focus"
        @keydown.enter="enter"
      />
      <button type="text">×</button>
    </div>
  </div>
</template>

<script>
import { emailReg, phoneReg } from "@/validate/index";
export default {
  props: {
    rows: Number,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value: [String, Number]
  },
  data() {
    return {
      inputValue: this.value,
      inputType: this.type
    };
  },
  methods: {
    blur(e) {
      switch (this.type) {
        case "phone":
          phoneReg(this.inputValue);
          break;
        case "email":
          emailReg(this.inputValue);
          break;
        default:
          break;
      }
      this.$emit("blur", e);
    },
    focus(e) {
      this.$emit("focus", e);
    },
    enter(e) {
      this.$emit("enter", e.target.value);
    }
  },
  watch: {
    inputValue(e) {
      this.$emit("input", e);
    },
    type(e) {}
  }
};
</script>

<style>
</style>