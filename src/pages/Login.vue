<script lang="ts">
import { useStore } from "@/store/useStore";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
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
    const elemRef = ref<Element>();
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
      ui.start(elemRef.value || "#auth-container", {
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

    return {
      elemRef,
    };
  },
});
</script>

<template>
  <div id="auth-container" ref="elemRef"></div>
</template>

<style></style>
