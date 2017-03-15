<template>
  <div class="list">
    <table class="table">
      <tr>
        
        <th class="t-head titles">Название региона или города</th>
        <th class="t-head ids">ID</th>
      </tr>
      <tr v-for="(item, index) in filteredItems" :key="index">
        
        <td class="titles">{{ item.title }}</td>
        <td class="ids">{{ item.id }}</td>
      </tr>
    </table>
    <span v-if="loaded && isEmpty" class="nothing">Соответствий не найдено</span>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data: function(){
      return {
        loaded: false,
        isEmpty: false,
      }
    },
    computed: {
      data() {
        return this.$store.state.data
      },
      filter() {
        return this.$store.state.filter
      },
      filteredItems() {
        if (typeof this.filter === 'string' && this.filter.trim().length === 0) {
          this.isEmpty = false;
          this.loaded = true;
          return this.data;
        }

        const filter = this.filter.split(',').map(el => {
          const element = el.trim();
          return /([^0-9а-яА-ЯЁё,\s-'])/.test(element) ? null : element;
        }).filter(e => e);

        const list = this.data.map((item) => {
          const res = filter.some(el => {
            if (item.id === el && Number(el)) {
              return true;
            } else if (item.title.toLowerCase().includes(el.toLowerCase()) && !Number(el)) {
              return true;
            } else {
              return false;
            }
          });
          return res ? item : null;
        }).filter(e => e);

        this.isEmpty = !list.length;
        this.loaded = true;
        return list;
      }
    }
  };
</script>

<style>
  .table{
    width: 100%;
    font-family: sans-serif;
    font-size: 13px;
  }
  .table th {
    padding: 7px 10px;
  } 
  .table td {
    padding: 5px 10px;
  }
  .table tr:nth-child(2n+1){
    background-color: #fbfbfb;
  }
  .t-head{
    font-size: 14px;
    font-weight: normal;
    color: #020202;
    background-color: #f1f1f1;
    font-weight: bold;
  }
  .ids{
    text-align: right;
    width: 100px;
  }
  .titles{
    text-align: left;
  }
  .nothing {
    text-align: center;
    padding: 60px;
    display: block;
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    .ids{
      width: 50px;
      font-size: 11px;
    }
    .titles{
      font-size: 11px;
    }
  }
</style>
