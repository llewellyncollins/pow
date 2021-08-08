<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseNav from "./components/BaseNav.vue";

export default defineComponent({
  name: "App",
  components: { BaseNav },
});
</script>
<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Pearls of Wisdom</span>
      </div>
    </header>
    <base-nav />
    <main class="mdl-layout__content">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
.mdl-layout__drawer-button {
  margin: 4px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
