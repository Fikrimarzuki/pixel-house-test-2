<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">
        <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="home">
            <h1>GO TO TABLES</h1>
            <router-link to="/table" class="link-btn">
              <q-btn
                padding="xl"
                color="primary"
                glossy
                round
                icon="table_view"
              />
            </router-link>
          </div>
        </q-parallax>
      </div>
    </div>
  </q-page>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
.link-btn {
  text-decoration: none;
}
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h1 {
  color: white;
}
</style>
