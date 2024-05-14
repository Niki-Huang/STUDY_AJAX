import Vue from "vue";
import App from "./App.vue";

// 路由
import VueRouter from "vue-router";
import router from "./router";
Vue.use(VueRouter);

// 进度条功能
import VueProgressBar from "vue-progressbar";
const options = {
  color: "#137dd4",
  // failedColor: '#874b4b',
  thickness: "4px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};
Vue.use(VueProgressBar, options);

// 弹窗功能
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
Vue.use(VueIziToast);

// 用于手机平板调试
Vue.prototype.mobileurl = "";

// 创建实例
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
