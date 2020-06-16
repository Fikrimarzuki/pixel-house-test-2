<template>
  <span>
    <a href="" @click.prevent="update(rowData, index)">Update</a>
    <a href="" @click.prevent="deleteRow(rowData, index)">Delete</a>
  </span>
</template>

<script>
export default {
  name: "TableOperation",
  props: {
    rowData: Object,
    field: String,
    index: Number
  },
  methods: {
    update() {
      let params = { type: "edit", index: this.index, rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    deleteRow() {
      let params = { type: "delete", index: this.index };
      this.$emit("on-custom-comp", params);
    }
  },
  created() {
    console.log("masuk");
  }
};
</script>

<style></style>
