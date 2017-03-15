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
    <span v-if="isEmpty" class="nothing">Соответствий не найдено</span>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data: function(){
      return {
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
        if (typeof this.filter === 'string' && this.filter.length === 0) {
          this.isEmpty = false;
          return this.data;
        } else if (this.filter === null) {
          this.isEmpty = true;
          return [];
        }

        const list = this.$store.state.data.map((item) => {
          const filter = this.filter.split(',').map(el => el.trim());
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
