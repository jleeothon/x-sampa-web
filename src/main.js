import Vue from 'vue';
import decodeUriComponent from 'decode-uri-component';
import App from './App.vue';
import router from './router';
import store from './store';

// eslint-disable-next-line
import 'modern-normalize';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit('setInput', decodeUriComponent(this.$route.query.q));
  },
}).$mount('#app');
