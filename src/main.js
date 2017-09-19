import Vue from 'vue';<% if(router){ %>
import router from './router';<% } %>
import app from './views/app.vue';

/* eslint-disable no-new */
new Vue({
  el: '#app',<% if(router){ %>
  router,<% } %>
  render: h => h(app)
});
