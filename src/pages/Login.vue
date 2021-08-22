<script lang="ts">
import { useStore } from "@/store/useStore";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
} from "@vue/runtime-core";
import firebase from "firebase/app";
import { auth as authUI } from "firebaseui";
import { auth } from "../firebase";
import router from "../router";

export default defineComponent({
  name: "Login",
  setup() {
    const ui = new authUI.AuthUI(auth);
    const { state } = useStore();

    watch(
      () => state.uid,
      (newValue, oldValue) => {
        if (newValue && newValue !== oldValue) {
          router.push("/");
        }
      }
    );

    onMounted(() => {
      ui.start("#auth-container", {
        signInSuccessUrl: router.resolve("/").path,
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
        ],
      });
    });

    onUnmounted(() => {
      ui.delete();
    });

    return {};
  },
});
</script>

<template>
  <div id="auth-container"></div>
</template>

<style></style>
