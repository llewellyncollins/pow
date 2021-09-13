<script lang="ts">
import { useStore } from "@/store/useStore";
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Tag",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { state } = useStore();

    const tagId = computed(() => route.params.tag);
    const documents = computed(() =>
      state.documents.filter((document) => document.tag === tagId.value)
    );

    const viewDocument = (docId: string) => {
      router.push({ path: `/doc/${docId}` });
    };

    return { documents, viewDocument };
  },
});
</script>

<template>
  <ul>
    <li v-for="document in documents" :key="document.id">
      <div>{{ document.title }}</div>
      <button @click="viewDocument(document.id)">View</button>
    </li>
  </ul>
</template>
