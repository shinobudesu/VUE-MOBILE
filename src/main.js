import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import router from "@/router/index.js"
import store from "@/store/index.js"
import api from "@/api/index.js"
import _ from 'lodash'
import moment from 'moment'
import 'vant/lib/index.css';
import { Button, Popup, RadioGroup, Radio, Panel, Divider, Form, Field, Icon } from 'vant';
Vue.use(Button);
Vue.use(Popup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Panel);
Vue.use(Divider);
Vue.use(Form);
Vue.use(Field);
Vue.use(Icon);
Vue.prototype.$moment = moment; //赋值使用
moment.locale('zh-cn'); //需要汉化
Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$loadsh = _; // 将utils挂载到vue的原型上
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')