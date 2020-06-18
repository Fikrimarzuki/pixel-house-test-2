<template>
  <q-dialog
    v-model="modalDetail"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card style="min-width: 350px">
      <q-bar>
        <span class="material-icons">
          account_circle
        </span>
        <div>DETAIL DATA</div>

        <q-space />

        <q-btn dense flat icon="close" @click="closeModal">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <span><b>Name</b>: {{ payload.name }}</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span><b>Username</b>: {{ payload.username }}</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span><b>Address</b>: {{ payload.address }}</span>
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
