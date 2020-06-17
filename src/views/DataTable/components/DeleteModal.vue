<template>
  <q-dialog v-model="showDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          Are you sure gonna delete this row ?
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeModal" />
        <q-btn flat label="Confirm" color="primary" @click="deleteRow" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "delete-modal",
  props: {
    showDelete: Boolean,
    deleteRow: Function
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style></style>
