import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios  from "axios";
import '@/permission'   //路由拦截
import Storage from 'vue-ls';
import VueClipboard from 'vue-clipboard2'
import VueI18n from 'vue-i18n'
import messages from './lib/messages.js'
Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.use(Storage);
Vue.use(Vant);
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages
})
// import vueg from 'vueg'
// Vue.use(vueg);
Vue.prototype.$axios = axios
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {    
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})
new Vue({
  router,
  store,
  axios,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')




