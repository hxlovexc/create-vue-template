import 'static/css/style.css';

import Vue from 'vue';<% if(router){ %>
import router from './router';<% } %>
import app from './app.vue';
<% if(eslint){ %>
/* eslint-disable no-new */<% } %>
new Vue({
  el: '#app',<% if(router){ %>
  router,<% } %>
  render: h => h(app)
});
