<template>
  <div class="row justify-center">
    <div class="col col-md-8">
      <div v-if="isLoading">
        <Loading />
      </div>
      <div v-else>
        <p class="text-h1 text-center">Table</p>
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
        <v-table
          style="width:100%"
          :columns="columns"
          :table-data="tableData"
          :show-vertical-border="false"
          :multiple-sort="multipleSort"
          :select-all="selectAll"
          :select-change="selectChange"
          :select-group-change="selectGroupChange"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          @sort-change="sortChange"
        >
        </v-table>
        <q-btn @click="bulkUpdate" :disabled="this.selections.length === 0">
          Selection Edit
        </q-btn>
        <q-btn
          @click="showUpdateAllWithValue"
          :disabled="this.selections.length === 0"
        >
          Edit Selected with value
        </q-btn>
        <q-btn @click="bulkDelete" :disabled="this.selections.length === 0">
          Delete
        </q-btn>

        <q-dialog
          v-model="showDetail"
          transition-show="rotate"
          transition-hide="rotate"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ name }}</div>
              <p>{{ username }}</p>
              <p>{{ address }}</p>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" @click="closeModal" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">
                Are you sure gonna delete this row ?
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Confirm" color="primary" @click="deleteRow" />
              <q-btn flat label="Cancel" color="primary" @click="closeModal" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="name"
                label="Name"
                required
              />
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="username"
                label="username"
                required
              />
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="address"
                label="address"
                required
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" @click="closeModal" />
              <q-btn flat label="Save" @click="saveData" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showEditWithValue" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="nameAll"
                label="Name"
                required
              />
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="usernameAll"
                label="username"
                required
              />
              <q-input
                clearable
                filled
                color="purple-12"
                v-model="addressAll"
                label="address"
                required
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" @click="closeModal" />
              <q-btn flat label="Save" @click="bulkUpdateWithValue" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showBulkEdit" persistent>
          <q-card style="min-width: 350px">
            <div v-for="(data, index) in tableDataEdit" :key="data.id">
              <q-card-section v-if="index === current - 1">
                <q-input
                  clearable
                  filled
                  color="purple-12"
                  v-model="data.name"
                  label="Name"
                />
                <q-input
                  clearable
                  filled
                  color="purple-12"
                  v-model="data.username"
                  label="username"
                />
                <q-input
                  clearable
                  filled
                  color="purple-12"
                  v-model="data.address"
                  label="address"
                />
                <q-pagination v-model="current" :max="tableDataEdit.length">
                </q-pagination>
              </q-card-section>
            </div>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" @click="closeModal" />
              <q-btn flat label="Save All Data" @click="saveAllData" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";

export default {
  name: "tables",
  components: {
    Loading
  },
  data() {
    return {
      multipleSort: true,
      selections: [],
      prompt: false,
      confirm: false,
      index: null,
      name: "",
      username: "",
      address: "",
      nameAll: "",
      usernameAll: "",
      addressAll: "",
      showEditWithValue: false,
      showBulkEdit: false,
      tableDataEdit: [],
      current: 1,
      showDetail: false,
      keyword: "",
      tableDataTemp: [],
      options: [
        { label: "Name", value: "name" },
        { label: "Username", value: "username" }
      ],
      searchBy: "name"
    };
  },
  methods: {
    searchData() {
      console.log(this.keyword);
      console.log(this.searchBy);
      let tableData = [...this.tableData];
      if (this.tableDataTemp.length === 0) {
        this.tableDataTemp = [...tableData];
      } else {
        tableData = [...this.tableDataTemp];
      }
      // if (this.keyword === "") {
      //   tableData = [...this.tableDataTemp];
      // }
      tableData = tableData.filter(el =>
        el[this.searchBy].includes(this.keyword)
      );
      // console.log(this.tableData, "<<<<<<<<");
      // console.log(this.tableDataTemp, ">>>>>>>");
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
    },
    clearKeyword() {
      const tableData = [...this.tableDataTemp];
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.keyword = "";
    },
    sortChange(params) {
      let columns = this.columns;
      let tableData = this.tableData;
      for (let key in params) {
        columns = columns.map(el => {
          if (el.field === key) {
            if (el.orderBy !== params[key]) {
              // console.log(el, "same field different orderBy", el.orderBy, params[key]);
              if (params[key] === "desc") {
                tableData.sort(function(a, b) {
                  return b.username.localeCompare(a.username);
                });
                el = { ...el, orderBy: "desc" };
              } else {
                tableData.sort((a, b) => a.username.localeCompare(b.username));
                el = { ...el, orderBy: "asc" };
              }
            }
          }
          return el;
        });
      }
      this.$store.commit("tables/SET_COLUMNS", columns);
      // this.$store.commit("tables/SET_TABLE_DATA", tableData);
    },
    selectAll(selection) {
      // console.log("select all", selection);
      this.selections = selection;
    },
    selectChange(selection) {
      // console.log("select-change", selection);
      this.selections = selection;
    },
    selectGroupChange(selection) {
      // console.log("select-group-change", selection);
      this.selections = selection;
    },
    showUpdateModal(index) {
      console.log("UPDATE", index);
      const { name, username, address } = this.tableData[index];
      this.index = index;
      this.name = name;
      this.username = username;
      this.address = address;
      this.prompt = true;
    },
    saveData() {
      console.log("save data");
      this.$store.commit("SET_ISLOADING", true);
      let tableData = this.tableData.map((el, i) => {
        if (+i === +this.index) {
          el = {
            ...el,
            name: this.name,
            username: this.username,
            address: this.address
          };
        }
        return el;
      });
      // console.log(tableData);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.name = "";
      this.username = "";
      this.address = "";
      this.prompt = false;
      this.$store.commit("SET_ISLOADING", false);
    },
    saveAllData() {
      console.log(this.tableDataEdit, "edit");
      // console.log(this.tableData, "table data");
      let tableData = this.tableData;
      this.tableDataEdit.forEach(el => {
        tableData = tableData.map(data => {
          if (+data.id === +el.id) {
            data = { ...el };
          }
          return data;
        });
      });
      console.log(tableData, "tableData");
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.showBulkEdit = false;
    },
    showDeleteModal(index) {
      this.index = index;
      this.confirm = true;
    },
    deleteRow() {
      let dataTable = this.tableData;
      dataTable.splice(this.index, 1);
      this.confirm = false;
    },
    closeModal() {
      this.index = null;
      this.prompt = false;
      this.confirm = false;
      this.showBulkEdit = false;
      this.showDetail = false;
      this.showEditWithValue = false;
      this.tableDataEdit = [];
      this.name = "";
      this.username = "";
      this.address = "";
      this.nameAll = "";
      this.usernameAll = "";
      this.addressAll = "";
    },
    bulkUpdate() {
      let newTableData = [];
      for (let i = 0; i < this.selections.length; i++) {
        const table = this.tableData.filter(
          data => +data.id === +this.selections[i].id
        );
        newTableData.push({
          id: table[0].id,
          name: table[0].name,
          username: table[0].username,
          address: table[0].username
        });
      }
      // console.log(newTableData, "cg=h<<<<");
      this.tableDataEdit = [...newTableData];
      // console.log(this.tableDataEdit, "table data edit");
      this.showBulkEdit = true;
      // console.log(newTableData);
    },
    showUpdateAllWithValue() {
      this.showEditWithValue = true;
    },
    bulkUpdateWithValue() {
      let tableData = [...this.tableData];
      this.selections.forEach(el => {
        tableData = tableData.map(data => {
          if (+data.id === +el.id) {
            data = {
              ...data,
              name: this.nameAll,
              username: this.usernameAll,
              address: this.addressAll
            };
          }
          return data;
        });
      });
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.showEditWithValue = false;
    },
    bulkDelete() {
      console.log("bulk delete");
      let tableData = this.tableData;
      for (let i = 0; i < this.selections.length; i++) {
        tableData = tableData.filter(
          data => +data.id !== +this.selections[i].id
        );
      }
      this.selections = [];
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
    },
    showDetailModal(index) {
      this.index = index;
      const { name, username, address } = this.tableData[index];
      this.name = name;
      this.username = username;
      this.address = address;
      this.showDetail = true;
    }
  },
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
  },
  mounted() {
    const updateClass = document.querySelectorAll(".update");
    updateClass.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.showUpdateModal(i);
      });
    });
    const deleteRow = document.querySelectorAll(".delete");
    deleteRow.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.showDeleteModal(i);
      });
    });
    const showDetailByName = document.querySelectorAll(".showDetailByName");
    showDetailByName.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.showDetailModal(i);
      });
    });
    const showDetailByUsername = document.querySelectorAll(
      ".showDetailByUsername"
    );
    showDetailByUsername.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.showDetailModal(i);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.searchInput {
  border: 1px solid black;
}
</style>
