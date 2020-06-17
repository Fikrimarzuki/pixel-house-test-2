<template>
  <q-form @submit="searchData">
    <q-btn-toggle
      v-model="searchBy"
      push
      glossy
      toggle-color="primary"
      :options="options"
    />
    <q-input
      class="searchInput"
      type="text"
      v-model="keyword"
      placeholder="search"
    />
    <q-btn @click="clearKeyword" label="reset" />
  </q-form>
</template>

<script>
export default {
  name: "filter",
  data() {
    return {
      options: [
        { label: "Name", value: "name" },
        { label: "Username", value: "username" }
      ]
    }
  },
  props: {
    searchData: Function,
    clearKeyword: Function
  },
  methods: {
    searchData() {
      // console.log(this.keyword);
      // console.log(this.searchBy);
      let tableData = [...this.tableData];
      if (this.tableDataTemp.length === 0) {
        this.tableDataTemp = [...tableData];
      } else {
        tableData = [...this.tableDataTemp];
      }
      tableData = tableData.filter(el =>
        el[this.searchBy].toLowerCase().includes(this.keyword) ||
        el[this.searchBy].toUpperCase().includes(this.keyword)
      );
      // console.log(this.tableData, "<<<<<<<<");
      // console.log(this.tableDataTemp, ">>>>>>>");
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
    }
  }
};
</script>
