<template>
  <q-layout view="lHh Lpr lFf">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else>
      <Navbar />
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
    Loading
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style lang="scss">
.v-table-sort-icon {
  margin-left: 2px;
}
</style>
