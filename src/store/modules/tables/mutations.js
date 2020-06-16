export default {
  SET_COLUMNS(state, payload) {
    // console.log("columns", payload);
    state.columns = payload;
  },
  SET_TABLE_DATA(state, payload) {
    // console.log("table Data", payload);
    state.tableData = payload;
  },
  SET_ISLOADING(state, payload) {
    state.isLoading = payload;
  }
};
