<template>
  <div class="list">
    <table class="table">
      <tr>
        <th class="t-head ids">ID</th>
        <th class="t-head titles">Название региона или города</th>
      </tr>
      <tr v-for="item in filteredItems || data" :key="item.id">
        <td class="ids">{{ item.id }}</td>
        <td class="titles">{{ item.title }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'chat',
    data: function(){
      return {
        loading: false
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
        if (this.filter.length === 0) {
          return this.data;
        } 

        this.loading = true;

        const list = this.$store.state.data.map((item) => {
          const filter = this.filter.split(',').map(el => el.trim());
          const res = filter.some(el => item.id === el || item.title.toLowerCase().includes(el.toLowerCase()));
          return res ? item : null;
        }).filter(e => e);

        this.loading = false;

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
  .table tr:nth-child(2n){
    background-color: #fbfbfb;
  }
  .t-head{
    font-size: 14px;
    font-weight: normal;
    color: #020202;
    background-color: #f1f1f1;
  }
  .ids{
    text-align: right;
    width: 100px;
  }
  .titles{
    text-align: left;
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
