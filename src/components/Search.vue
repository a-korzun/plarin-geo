<template>
  <div class="search-form">
    <form v-on:submit="submit">
      <div class="input-container">
        <input v-model="filter"
          name="q"
          type="text"
          placeholder="Поиск"
          autofocus
          class="search-input"
        >
        <div class="input-tip">Введите ID, набор ID через запятую, название региона или города</div>
      </div>
      <button type="submit" class="search-button">Искать</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'msgform',
    methods: {
      submit: function(event) {
        event.preventDefault();
        this.updateFilter(this.filter)
      },
      updateFilter: function(data) {
        this.$store.commit('updateFilter', data)
      }
    },
    data: function() {
      return {
        filter: ''
      }
    }
  }
</script>

<style>
  .search-form{
    padding: 20px 0;
    width: 100%;;
  }
  .input-container{
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 110px);
  }
  .input-tip{
    width: 100%;
    display: block;
    font-size: 10px;
    color: #cccccc;
    font-style: italic;
    pointer-events: none;
    user-select: none;
    margin: 2px 0 0 10px;
  }
  .search-input{
    width: 100%;
    height: 30px;
    padding: 0 10px;
    line-height: 20px;
    display: inline-block;
    border: 1px solid #009DE7;
    color: #020202;
    font-size: 14px;
    border-radius: 2px;
    margin: 0;
    vertical-align: top;
  }
  .search-button{
    display: inline-block;
    padding: 0 10px;
    height: 30px;
    line-height: 20px;
    background-color: #009DE7;
    border: 0 solid transparent;
    color: #ffffff;
    font-size: 14px;
    border-radius: 2px;
    margin: 0;
    width: 100px;
  }
  @media all and (max-width: 768px) {
    .input-container{
      display: block;
      vertical-align: top;
      width: 100%;
    }
    .search-button{
      width: 100%;
      display: block;
      margin-top: 10px;
    }
  }
</style>