<template>
  <q-dialog v-model="isModalUpdate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input clearable filled v-model="name" label="Name" required />
        <q-input
          clearable
          filled
          v-model="username"
          label="Username"
          required
        />
        <q-input clearable filled v-model="address" label="Address" required />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closeModal" />
        <q-btn flat label="Save" @click="saveData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import EventBus from "../../../eventBus";

export default {
  name: "update-modal",
  props: {
    showUpdate: Boolean,
    payload: Object,
    index: Number,
    tableData: Array
  },
  methods: {
    saveData() {
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
      let tableDataTemp = this.tableDataTemp.map(el => {
        if (el.id === this.tableData[this.index].id) {
          el = {
            ...el,
            name: this.name,
            username: this.username,
            address: this.address
          };
        }
        return el;
      });
      this.$store.commit("tables/SET_TABLE_DATA_TEMP", tableDataTemp);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.$emit("closeModal", false);
      this.$store.commit("SET_ISLOADING", false);
    },
    closeModal() {
      this.$emit("closeModal", false);
    }
  },
  computed: {
    isModalUpdate() {
      return this.$props.showUpdate;
    },
    name: {
      get: function() {
        return this.$props.payload.name;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD", { name: newValue });
      }
    },
    username: {
      get: function() {
        return this.$props.payload.username;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD", { username: newValue });
      }
    },
    address: {
      get: function() {
        return this.$props.payload.address;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD", { address: newValue });
      }
    },
    tableDataTemp() {
      return this.$store.state.tables.tableDataTemp;
    }
  }
};
</script>

<style></style>
