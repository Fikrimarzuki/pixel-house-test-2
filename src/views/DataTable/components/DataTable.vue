<template>
  <div>
    <div>
      <p>{{column.name}}</p>
    </div>
    <span>
      <a href="" @click.prevent="update(rowData, index)">Update</a>
      <a href="" @click.prevent="deleteRow(rowData, index)">Delete</a>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    column: Object    
  },
  created() {
    console.log(this.column)
  }
}
</script>

<style></style>
