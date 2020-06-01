import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./components/index"

Vue.use(ElementUI);

require('../mock')

Vue.config.productionTip = false
Vue.directive("drag", {
  // 指令的定义
  bind: function (el) {
    let odiv = el;   //获取当前元素
    odiv.onmousedown = (e) => {
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;

      document.onmousemove = (e) => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置  
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
