<script lang="ts">
import { useStore } from "@/store/useStore";
import { defineComponent } from "@vue/runtime-core";
import router from "../router";

export default defineComponent({
  name: "Logout",
  setup() {
    const { dispatch } = useStore();

    const logout = () => {
      dispatch("signOut").then(() => {
        router.push("/");
      });
    };

    return { logout };
  },
});
</script>

<template>
  <button @click="logout">Logout</button>
</template>

<style></style>
