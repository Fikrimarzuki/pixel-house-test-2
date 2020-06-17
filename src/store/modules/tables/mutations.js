export default {
  SET_COLUMNS(state, payload) {
    // console.log("columns", payload);
    state.columns = payload;
  },
  SET_TABLE_DATA(state, payload) {
    // console.log("table Data", payload);
    state.tableData = payload;
  },
  SET_TABLE_DATA_TEMP(state, payload) {
    state.tableDataTemp = payload;
  },
  SET_TABLE_DATA_EDIT(state, payload) {
    state.tableDataEdit = payload;
  },
  SET_ISLOADING(state, payload) {
    state.isLoading = payload;
  }
};
