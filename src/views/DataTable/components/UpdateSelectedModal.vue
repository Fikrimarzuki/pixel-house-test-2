<template>
  <q-dialog v-model="showEditWithValue">
    <q-card style="min-width: 350px;">
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
        <q-btn flat label="Save" @click="bulkUpdateWithValue" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import EventBus from "../../../eventBus";

export default {
  name: "update-selected-modal",
  props: {
    showEditWithValue: Boolean,
    payloadSelected: Object,
    tableData: Array,
    selections: Array
  },
  computed: {
    name: {
      get: function() {
        return this.$props.payloadSelected.name;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD_SELECTED", { name: newValue });
      }
    },
    username: {
      get: function() {
        return this.$props.payloadSelected.username;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD_SELECTED", { username: newValue });
      }
    },
    address: {
      get: function() {
        return this.$props.payloadSelected.address;
      },
      set: function(newValue) {
        EventBus.$emit("SET_PAYLOAD_SELECTED", { address: newValue });
      }
    },
    tableDataTemp() {
      return this.$store.state.tables.tableDataTemp;
    }
  },
  methods: {
    bulkUpdateWithValue() {
      let tableData = [...this.tableData];
      let tableDataTemp = [...this.tableDataTemp];
      this.selections.forEach(el => {
        tableData = tableData.map(data => {
          if (+data.id === +el.id) {
            data = {
              ...data,
              name: this.name,
              username: this.username,
              address: this.address
            };
          }
          return data;
        });
        tableDataTemp = tableDataTemp.map(data => {
          if (+data.id === +el.id) {
            data = {
              ...data,
              name: this.name,
              username: this.username,
              address: this.address
            };
          }
          return data;
        });
      });
      this.$store.commit("tables/SET_TABLE_DATA_TEMP", tableDataTemp);
      this.$store.commit("tables/SET_TABLE_DATA", tableData);
      this.$emit("closeModal", false);
    },
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card__section {
  margin: 5px 8px;
}
.q-card__actions {
  .q-btn {
    margin-bottom: 10px;
  }
}
</style>
