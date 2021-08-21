<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "@vue/runtime-core";
import firebase from "firebase/app";
import BaseNav from "./components/BaseNav.vue";
import { auth } from "./firebase";
import mutations from "./store/mutations";
import { useStore } from "./store/useStore";

export default defineComponent({
  name: "App",
  components: { BaseNav },
  setup() {
    const { commit } = useStore();
    let unsubscribe: firebase.Unsubscribe;

    onMounted(() => {
      unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          commit(mutations.SAVE_UID, user.uid);
        }
      });
    });

    onUnmounted(() => {
      unsubscribe();
    });

    return {};
  },
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
