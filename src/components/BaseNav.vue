<script lang="ts">
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { IPage, PAGES } from "./BaseNav.models";

export default defineComponent({
  name: "BaseNav",
  setup() {
    const navStack = ref<number[]>([]);
    const currentList = ref<IPage[]>(PAGES);
    const canGoBack = computed(() => navStack.value.length > 0);

    const onSelect = (index: number) => {
      const nextItem = currentList.value[index];
      if (nextItem?.url) {
        console.log(`navigate to ${nextItem.url}`);
      } else if (nextItem.children) {
        navStack.value.push(index);
        currentList.value = nextItem.children || [];
      }
    };

    const onBack = () => {
      navStack.value.pop();

      currentList.value = PAGES;

      navStack.value.forEach((pageIndex) => {
        currentList.value = currentList.value[pageIndex].children || [];
      });
    };

    return { currentList, canGoBack, onSelect, onBack };
  },
});
</script>

<template>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Menu</span>
    <button
      class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
      :class="$style.button"
      v-show="canGoBack"
      @click="onBack"
    >
      <i class="material-icons">arrow_back</i>
    </button>
    <nav class="mdl-navigation">
      <a
        class="mdl-navigation__link"
        v-for="(item, index) of currentList"
        :key="index"
        :class="$style['nav-item']"
        @click="onSelect(index)"
        >{{ item.text }}</a
      >
    </nav>
  </div>
</template>

<style module>
.button {
  position: absolute;
  right: 10px;
  top: 45px;
  z-index: 2;
}

.nav-item {
  cursor: pointer;
}
</style>
