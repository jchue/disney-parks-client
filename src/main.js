import Vue from 'vue';
import { DateTime } from 'luxon';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('formatDate', (rawDate) => {
  if (!rawDate) return 'Present';

  const parsedDate = DateTime.fromISO(rawDate);
  const formattedDate = parsedDate.toLocaleString(DateTime.DATE_FULL);

  return formattedDate;
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
