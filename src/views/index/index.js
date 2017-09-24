import 'static/css/style.css';

import Vue from 'vue';
import hello from 'components/hello';
<% if(eslint){ %>
/* eslint-disable no-new */<% } %>
new Vue({
  el: '#app',
  components: {
    hello
  }
});
