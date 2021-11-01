<script lang="ts">
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { IPage, PAGES } from "./BaseNav.models";
import { useStore } from "@/store/useStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BaseNav",
  setup() {
    const router = useRouter();
    const { state } = useStore();
    const navStack = ref<number[]>([]);
    const currentList = ref<IPage[]>(PAGES);
    const tagId = ref("");
    const canGoBack = computed(() => navStack.value.length > 0);
    const documents = computed(() =>
      state.documents.filter((document) => document.tag === tagId.value)
    );

    const onSelect = (index: number) => {
      const nextItem = currentList.value[index];

      if (nextItem.isPage) {
        router.push(nextItem.url || "404");
      } else if (nextItem.isDocument) {
        window.open(nextItem.url, "_blank");
      } else if (nextItem?.url) {
        navStack.value.push(index);
        const documents = state.documents.filter(
          (document) => document.tag === nextItem.url
        );
        currentList.value = documents.map((doc) => ({
          text: doc.title,
          url: doc.url,
          children: [],
          isDocument: true,
        }));
      } else if (nextItem.children) {
        navStack.value.push(index);
        currentList.value = nextItem.children || [];
      }
    };

    const onOpen = (url: string) => {
      window.open(url, "_blank");
    };

    const onBack = () => {
      tagId.value = "";
      navStack.value.pop();

      currentList.value = PAGES;

      navStack.value.forEach((pageIndex) => {
        currentList.value = currentList.value[pageIndex].children || [];
      });
    };

    return { documents, currentList, canGoBack, onSelect, onBack, onOpen };
  },
});
</script>

<template>
  <nav :class="$style['nav']" v-if="currentList.length > 0">
    <button
      v-for="(item, index) of currentList"
      :key="index"
      :class="$style['nav-button']"
      @click="onSelect(index)"
    >
      {{ item.text }}
    </button>
  </nav>
  <div :class="$style['empty']" v-else>No entries found</div>
  <section :class="$style.controls" v-show="canGoBack">
    <button :class="$style.button" @click="onBack">Back</button>
  </section>
</template>

<style lang="scss" module>
.nav {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0.5rem;
  overflow-x: hidden;

  .nav-button {
    flex: 1 1;
    height: 10rem;
    padding: 0.5rem;
    cursor: pointer;

    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;

    border: solid #000 0.5rem;
    background: radial-gradient(circle, #fff, var(--alt-color));
    transition: color 0.3s;
    &:hover {
      color: #fff;
      background: var(--alt-color);
      text-shadow: #000 0.1rem 0.1rem;
    }
  }
}

.empty {
  text-align: center;
  font-size: 3rem;
  color: #fff;
}

.controls {
  position: fixed;
  height: 10%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  z-index: 10001;

  .button {
    flex-grow: 1;
    height: 100%;
    cursor: pointer;
    border: none;

    font-size: 1.5rem;

    color: #fff;
    background-color: var(--alt-color-2);

    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #000;
    }
  }
}
</style>
