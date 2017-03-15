<template>
  <div class="search-form">
    <form v-on:submit="submit">
      <div class="input-container">
        <input v-model="filter"
          name="q"
          type="text"
          placeholder="Введите ID, набор ID через запятую, название региона или города"
          autofocus
          class="search-input"
        >
        <div class="clear" @click="clear" :class="{ hidden: !filter }">
          <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/>
            <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/>
          </svg>
        </div>  
        <div class="input-tip">Введите ID, набор ID через запятую, название региона или города</div>
      </div>
      <button type="submit" class="search-button">Искать</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    methods: {
      submit: function(event) {
        event.preventDefault();
        this.updateFilter(this.filter)
      },
      updateFilter: function(data) {
        this.$store.commit('updateFilter', data)
      },
      clear: function(){
        this.filter = '';
        this.$store.commit('updateFilter', '');
      }
    },
    data: function() {
      return {
        filter: ''
      }
    }
  }
</script>

<style scoped>
  .search-form{
    padding: 20px 0;
    width: 100%;;
  }
  .input-container{
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 110px);
    position: relative;
  }
  .clear{
    position: absolute;
    top: 50%;
    right: 10px;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .clear.hidden{
    display: none;
  }
  .clear svg {
    display: block;
    width: 12px;
    height: 12px;
  }
  .input-tip{
    display: none;
    position: absolute;
    top: calc(-100% - 3px);
    left: 0;
    background-color: #CCEEFF;
    border-radius: 2px;
    display: block;
    font-size: 10px;
    color: #020202;
    padding: 5px 10px;
    font-style: italic;
    pointer-events: none;
    user-select: none;
    display: none;
  }
  .input-tip:after{
    content: '';
    display: block;
    position: absolute;
    left: 20px;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transform: rotate(45deg) translateY(50%);
    background-color: #CCEEFF;
  }
  .search-input{
    display: none;
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
    .input-tip{
      display: none;
    }
    .search-input:not(:focus) ~ .input-tip{
      display: none;
    }
    .search-input:focus ~ .input-tip{
      display: block;
    }
    .input-tip{
      display: block;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #fff;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #fff;
      opacity: 1;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #fff;
      opacity: 1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #fff;
    }
  }
</style>
