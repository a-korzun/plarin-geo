<template>
  <div class="app">
    <img v-bind:src="'assets/plarin.png'" alt="Plarin" class="logo">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
  import List from './components/List.vue';
  import Search from './components/Search.vue';
  import axios from 'axios';

  export default {
    components: {
      List,
      Search
    },
    beforeMount(){
      axios.get('./assets/data.json')
        .then((res) => {

          const list = res.data.data.map((item) => {
            let newItem = {
              id: item.id,
              title: item.title
            };
            if (item.id.includes('-')) {
              const params = item.id.split('-');
              newItem = {
                id: params[1],
                title: item.title + ` (${res.data.data.find(el => el.id === params[0]).title})`
              }
            }
            return newItem;
          });

          this.$store.commit('loadData', res.data.data);
        })
        .catch((err) => {});
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
    margin: 0 auto;
    padding: 20px;
    max-width: 800px;
    width: 100%;
  }
  .logo{
    display: block;
    max-width: 200px;
    margin: 20px auto;
  }
  @media all and (max-width: 768px) {
    .app{
      padding: 10px;
    }
  }
</style>
