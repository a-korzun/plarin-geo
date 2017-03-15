<template>
  <div class="app">
    <img v-bind:src="'assets/plarin.png'" alt="Plarin" class="logo">
    <h1 class="header">myTarget {{geo}}</h1>
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
    data: function(){
      return {
        geo: '{{geo}}'
      }
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
          }).sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          });

          this.$store.commit('loadData', list);
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
    font-family: sans-serif;
    font-size: 14px;
    font-weight: normal;
    color: #020202;
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
  .header{
    font-size: 24px;
    text-align: center;
    font-family: sans-serif;
    color: #252525;
  }
  @media all and (max-width: 768px) {
    .app{
      padding: 10px;
    }
  }
</style>
