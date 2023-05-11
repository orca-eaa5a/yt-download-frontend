<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar style="background-color: #ff6a6a"> </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { route } from "quasar/wrappers";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    // EssentialLink
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
});
</script>
