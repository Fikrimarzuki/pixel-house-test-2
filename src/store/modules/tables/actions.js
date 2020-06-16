import { tableData, columns } from "../../../../data/data";

export default {
  fetchData(context) {
    // console.log(tableData, columns, "fetch");
    context.commit("SET_COLUMNS", columns);
    context.commit("SET_TABLE_DATA", tableData);
    context.commit("SET_ISLOADING", false);
  }
};
