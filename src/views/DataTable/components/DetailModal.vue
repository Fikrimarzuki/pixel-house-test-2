<template>
  <q-dialog
    v-model="modalDetail"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card>
      <q-card-section>
        <h5>Data Detail</h5>
        <div class="text-h6">{{ payload.name }}</div>
        <p>{{ payload.username }}</p>
        <p>{{ payload.address }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "detail-modal",
  props: {
    payload: Object,
    showDetail: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  },
  computed: {
    modalDetail() {
      return this.$props.showDetail;
    }
  }
};
</script>

<style></style>
