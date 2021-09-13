<script lang="ts">
import { useStore } from "@/store/useStore";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "List",
  setup() {
    const { state, dispatch } = useStore();

    const documents = computed(() => state.documents);

    const deleteDocument = (id: string, imagePath: string) => {
      dispatch("deleteDocument", { docId: id, imagePath });
    };

    return { documents, deleteDocument };
  },
});
</script>

<template>
  <ul>
    <li v-for="document in documents" :key="document.id">
      <div>{{ document.title }}</div>
      <div><a :href="document.url">View</a></div>
      <button @click="deleteDocument(document.id, document.imagePath)">
        Delete
      </button>
    </li>
  </ul>
</template>
