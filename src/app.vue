<template>
  <div><% if(router){ %>
    <router-view></router-view><% }else{ %>
    <hello></hello><% } %>
  </div>
</template>
<% if(!router){ %>
<script>
  import hello from 'components/hello';
  export default {
    components: {
      hello
    }
  };
</script>
<% } %>