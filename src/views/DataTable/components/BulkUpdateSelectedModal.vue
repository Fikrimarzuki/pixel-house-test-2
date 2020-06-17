<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 350px;">
      <div v-for="(data, index) in tableData" :key="data.id">
        <q-card-section v-if="index === current - 1" class="card-section">
          <q-input clearable filled v-model="data.name" label="Name" required />
          <q-input
            clearable
            filled
            v-model="data.username"
            label="username"
            required
          />
          <q-input
            clearable
            filled
            v-model="data.address"
            label="address"
            required
          />
          <q-pagination
            v-model="current"
            :max="tableData.length"
            class="pagination"
          >
          </q-pagination>
        </q-card-section>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closeModal" />
        <q-btn flat label="Save All Data" @click="saveAllData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      current: 1
    };
  },
  props: {
    showBulkEdit: Boolean,
    index: Number,
    saveAllData: Function
  },
  computed: {
    showModal() {
      return this.$props.showBulkEdit;
    },
    tableData() {
      return this.$store.state.tables.tableDataEdit;
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-section {
  .q-input {
    margin: 5px;
  }
}
.pagination {
  padding-top: 20px;
  padding-left: 10px;
  margin-bottom: -15px;
}

.q-card__actions {
  .q-btn {
    margin-bottom: 10px;
  }
}
</style>
