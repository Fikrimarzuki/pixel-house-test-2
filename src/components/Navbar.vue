<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-toolbar-title>
        <router-link to="/" class="navBrand">
          T<q-icon name="line_style" />BLE
        </router-link>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped>
.navBrand {
  text-decoration: none;
  color: white;
}
.navBrand:hover {
  color: black;
}
</style>
