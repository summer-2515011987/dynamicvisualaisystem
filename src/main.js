import Vue from "vue";
// 导入包
// 导入样式
import ElementUI from "element-ui";
import Cookies from 'js-cookie'
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import '@/styles/index.scss'
// import 'normalize.css/normalize.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
import '@/permission';
// 注册到VUE实例
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");