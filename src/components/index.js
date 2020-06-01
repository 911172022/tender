import Vue from "vue"

import NavBar from './NavBar.vue'
import Test from './test.vue'

import Page from './Pagination.vue' //分页组件
import Select from "./select/z-select.vue" // select组件
import Input from './input/z-input.vue' // input组件
import Button from './button/z-button.vue' //button组件

Vue.component("NavBar", NavBar)
Vue.component("Test", Test)

Vue.component("z-page", Page)
Vue.component("z-select", Select)
Vue.component("z-input", Input)
Vue.component("z-button", Button)