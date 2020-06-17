<template>
  <q-dialog v-model="deleteModal" persistent>
    <q-card style="width: 300px; height: 160px;">
      <div class="modal-delete">
        <q-card-section class="row items-center">
          <p class="q-ml-sm">
            Are you sure gonna delete these selected items ?
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeModal" />
          <q-btn flat label="Confirm" color="primary" @click="bulkDelete" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "bulk-delete-modal",
  props: {
    showBulkDelete: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    bulkDelete() {
      this.$emit("bulkDelete");
    }
  },
  computed: {
    deleteModal() {
      return this.$props.showBulkDelete;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-delete {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
