<script lang="ts">
import { useStore } from "@/store/useStore";
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Document",
  setup() {
    const route = useRoute();
    const { state } = useStore();

    const docId = computed(() => route.params.id);
    const document = computed(() =>
      state.documents.find((document) => document.id === docId.value)
    );

    return { document };
  },
});
</script>

<template>
  <h1>{{ document.title }}</h1>
  <p>{{ document.description }}</p>
  <img :src="document.url" />
</template>
