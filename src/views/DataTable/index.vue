<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-md-8">
        <div v-if="isLoading">
          <Loading />
        </div>
        <div v-else>
          <Search :tableData="tableData" @attachDomToClass="attachDomToClass" />
          <v-table
            style="width:100%"
            multiple-sort
            :columns="columns"
            :table-data="tableData"
            :show-vertical-border="false"
            :select-all="selectAll"
            :select-change="selectChange"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @sort-change="sortChange"
          >
          </v-table>

          <div class="bottomBtn">
            <q-btn
              @click="bulkUpdateShow"
              :disabled="this.selections.length === 0"
            >
              EDIT SELECTED
            </q-btn>
            <q-btn
              @click="showUpdateAllWithValue"
              :disabled="this.selections.length === 0"
            >
              BULK EDIT
            </q-btn>
            <q-btn
              @click="showBulkDeleteModal"
              :disabled="this.selections.length === 0"
            >
              BULK DELETE
            </q-btn>
          </div>

          <DetailModal
            @closeModal="closeModal"
            :showDetail="showDetail"
            :payload="payload"
          />

          <DeleteModal
            :showDelete="showDelete"
            @closeModal="closeModal"
            :deleteRow="deleteRow"
          />

          <UpdateModal
            :showUpdate="showUpdate"
            :payload="payload"
            :tableData="tableData"
            :index="index"
            @closeModal="closeModal"
          />

          <UpdateSelectedModal
            :showEditWithValue="showEditWithValue"
            :payloadSelected="payloadSelected"
            :tableData="tableData"
            :selections="selections"
            @closeModal="closeModal"
          />

          <BulkUpdateSelectedModal
            :showBulkEdit="showBulkEdit"
            :index="index"
            @closeModal="closeModal"
            :saveAllData="saveAllData"
          />

          <BulkDeleteModal
            :showBulkDelete="showBulkDelete"
            @closeModal="closeModal"
            @bulkDelete="bulkDelete"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import EventBus from "../../eventBus";
import Loading from "../../components/Loading";
import Search from "./components/Search.vue";
import DetailModal from "./components/DetailModal.vue";
import DeleteModal from "./components/DeleteModal.vue";
import UpdateModal from "./components/UpdateModal.vue";
import UpdateSelectedModal from "./components/UpdateSelectedModal";
import BulkUpdateSelectedModal from "./components/BulkUpdateSelectedModal";
import BulkDeleteModal from "./components/BulkDeleteModal";

export default {
  name: "tables",
  components: {
    DetailModal,
    DeleteModal,
    UpdateModal,
    UpdateSelectedModal,
    BulkUpdateSelectedModal,
    BulkDeleteModal,
    Loading,
    Search
  },
  data() {
    return {
      showDetail: false,
      showUpdate: false,
      showDelete: false,
      showEditWithValue: false,
      showBulkEdit: false,
      showBulkDelete: false,
      index: null,
      payload: {
        name: "",
        username: "",
        address: ""
      },
      payloadSelected: {
        name: "",
        username: "",
        address: ""
      },
      selections: []
    };
  },
  methods: {
    sortChange(params) {
      let columns = this.columns;
      let tableData = this.tableData;
      for (let key in params) {
        columns = columns.map(el => {
          if (el.field === key) {
            if (el.orderBy !== params[key]) {
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
    },
    selectAll(selection) {
      this.selections = selection;
    },
    selectChange(selection) {
      this.selections = selection;
    },
    showUpdateModal(index) {
      const { name, username, address } = this.tableData[index];
      this.index = index;
      this.payload = { name, username, address };
      this.showUpdate = true;
    },
    saveAllData() {
      let tableData = [...this.tableData];
      let tableDataTemp = [...this.tableDataTemp];
      this.tableDataEdit.forEach(el => {
        tableData = tableData.map(data => {
          if (+data.id === +el.id) {
            data = { ...el };
          }
          return data;
        });
        tableDataTemp = tableDataTemp.map(data => {
          if (+data.id === +el.id) {
            data = { ...el };
          }
          return data;
        });
      });
      this.$store.commit("tables/SET_TABLE_DATA_TEMP", tableDataTemp);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.showBulkEdit = false;
    },
    showDeleteModal(index) {
      this.index = index;
      this.showDelete = true;
    },
    deleteRow() {
      let tableData = this.tableData;
      if (this.$store.state.tables.tableDataTemp.length !== 0) {
        let tableDataTemp = this.tableDataTemp.filter(
          el => el.id !== tableData[this.index].id
        );
        this.$store.commit("tables/SET_TABLE_DATA_TEMP", tableDataTemp);
      }
      tableData.splice(this.index, 1);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.showDelete = false;
    },
    closeModal(status = false) {
      this.index = null;
      this.showUpdate = status;
      this.showDelete = status;
      this.showBulkEdit = status;
      this.showDetail = status;
      this.showEditWithValue = status;
      this.showBulkDelete = status;
      this.$store.commit("tables/SET_TABLE_DATA_EDIT", []);
      this.payload = { name: "", username: "", address: "" };
      this.payloadSelected = { name: "", username: "", address: "" };
    },
    bulkUpdateShow() {
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
      this.$store.commit("tables/SET_TABLE_DATA_EDIT", newTableData);
      this.showBulkEdit = true;
    },
    showUpdateAllWithValue() {
      this.showEditWithValue = true;
    },
    showBulkDeleteModal() {
      this.showBulkDelete = true;
    },
    bulkDelete() {
      let tableData = [...this.tableData];
      let tableDataTemp = [...this.tableDataTemp];
      for (let i = 0; i < this.selections.length; i++) {
        tableData = tableData.filter(
          data => +data.id !== +this.selections[i].id
        );
        tableDataTemp = tableDataTemp.filter(
          data => +data.id !== +this.selections[i].id
        );
      }
      this.selections = [];
      this.$store.commit("tables/SET_TABLE_DATA_TEMP", tableDataTemp);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.showBulkDelete = false;
    },
    showDetailModal(index) {
      this.index = index;
      const { name, username, address } = this.tableData[index];
      this.payload = { name, username, address };
      this.showDetail = true;
    },
    attachDomToClass() {
      setTimeout(() => {
        const updateBtn = document.querySelectorAll(".updateBtn");
        updateBtn.forEach((el, i) => {
          el.addEventListener("click", () => {
            this.showUpdateModal(i);
          });
        });
        const deleteBtn = document.querySelectorAll(".deleteBtn");
        deleteBtn.forEach((el, i) => {
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
      }, 500);
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
    },
    tableDataTemp() {
      return this.$store.state.tables.tableDataTemp;
    },
    tableDataEdit() {
      return this.$store.state.tables.tableDataEdit;
    }
  },
  mounted() {
    this.attachDomToClass();
    EventBus.$on("SET_PAYLOAD", payload => {
      this.payload = { ...this.payload, ...payload };
    });

    EventBus.$on("SET_PAYLOAD_SELECTED", payload => {
      this.payloadSelected = { ...this.payloadSelected, ...payload };
    });
  }
};
</script>

<style lang="scss">
.showDetailByUsername:hover {
  cursor: pointer;
  color: blue;
}

.showDetailByName:hover {
  cursor: pointer;
  color: blue;
}

.updateBtn {
  background-color: white;
  border: 1px solid gold;
  border-radius: 10px;
  height: 100%;
}

.updateBtn:hover {
  background-color: gold;
  border: 1px solid gold;
  color: white;
  cursor: pointer;
}

.updateBtn:active {
  background-color: gold;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}

.deleteBtn {
  background-color: white;
  border: 1px solid crimson;
  border-radius: 10px;
  height: 100%;
}

.deleteBtn:hover {
  background-color: crimson;
  border: 1px solid crimson;
  color: white;
  cursor: pointer;
}

.deleteBtn:active {
  background-color: crimson;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}

.bottomBtn {
  display: flex;
  justify-content: center;
  margin: 15px;
  .q-btn {
    padding: 0 10px;
    margin: 0 10px;
  }
}
</style>
