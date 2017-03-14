<template>
  <div class="app">
    <img v-bind:src="logo" alt="Plarin" class="logo">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
  import List from './components/List.vue';
  import Search from './components/Search.vue';
  const logo = require('file-loader!../assets/plarin.png');

  export default {
    components: {
      List,
      Search
    },
    data: function() {
      return {
        logo
      };
    }
    
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
  }
  .app{
    display: block;
    margin: 0;
    padding: 20px;
    max-width: 800px;
    width: 100%;
  }
  .logo{
    display: block;
    max-width: 200px;
    margin: 20px 0;
  }
  @media all and (max-width: 768px) {
    .app{
      padding: 10px;
    }
  }
</style>
