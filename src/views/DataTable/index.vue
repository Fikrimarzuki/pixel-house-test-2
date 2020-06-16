<template>
  <div class="row justify-center">
    <div class="col col-md-8">
      <div v-if="isLoading">
        <Loading />
      </div>
      <div v-else>
        <p class="text-h1 text-center">Table</p>
        <CustomColumn :columns="columns" :tableData="tableData" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import CustomColumn from "./components/Custom-columns";

export default {
  name: "tables",
  components: {
    CustomColumn,
    Loading
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$store.commit("tables/SET_ISLOADING", true);
    this.$store.dispatch("tables/fetchData");
  },
  computed: {
    isLoading() {
      return this.$store.state.tables.isLoading;
    },
    columns() {
      return this.$store.state.tables.columns;
    },
    tableData() {
      return this.$store.state.tables.tableData;
    }
  }
};
</script>

<style></style>
