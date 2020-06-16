import actions from "./actions";
import mutations from "./mutations";

export default {
  namespaced: true,
  state: {
    tableData: [],
    columns: [],
    isLoading: false
  },
  actions,
  mutations
};
