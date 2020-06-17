<template>
  <q-form @submit="searchData" id="searchForm">
    <div style="display: flex; justifyContent: center">
      <q-btn-toggle
        v-model="searchBy"
        push
        glossy
        toggle-color="primary"
        :options="options"
      />
      <q-input
        dense
        v-model.lazy="keyword"
        input-class="text-right"
        class="q-ml-md searchInput"
        debounce="500"
        type="text"
        placeholder="search"
      >
        <template v-slot:append>
          <q-icon v-if="keyword === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="keyword = ''"
          />
        </template>
      </q-input>
      <!-- <q-btn @click="clearKeyword" label="reset" /> -->
    </div>
    <q-space />
  </q-form>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchBy: "name",
      keyword: "",
      options: [
        { label: "Name", value: "name" },
        { label: "Username", value: "username" }
      ]
    };
  },
  props: {
    tableData: Array
  },
  methods: {
    searchData() {
      let tableData = [...this.tableData];
      if (this.tableDataTemp.length === 0) {
        this.$store.commit("tables/SET_TABLE_DATA_TEMP", [...tableData]);
      } else {
        tableData = [...this.tableDataTemp];
      }
      tableData = tableData.filter(
        el =>
          el[this.searchBy].toLowerCase().includes(this.keyword) ||
          el[this.searchBy].toUpperCase().includes(this.keyword)
      );
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
    },
    clearKeyword() {
      const tableData = [...this.tableDataTemp];
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.keyword = "";
    }
  },
  watch: {
    keyword() {
      this.searchData();
      this.$emit("attachDomToClass");
    }
  },
  computed: {
    tableDataTemp() {
      return this.$store.state.tables.tableDataTemp;
    }
  }
};
</script>

<style lang="scss" scoped>
#searchForm {
  margin-bottom: 10px;
}

.searchInput {
  // border: 1px solid black;
  height: 100%;
}
</style>
