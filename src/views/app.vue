<template>
  <div>
    <router-view></router-view>
    <hello></hello>
  </div>
</template>

<script>
  import hello from 'components/hello';
  export default {
    components: {
      hello
    }
  };
</script>

