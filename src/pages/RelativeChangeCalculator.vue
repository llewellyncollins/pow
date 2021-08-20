<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "RelativeChangeCalculator",
  setup() {
    const initialValueRef = ref<HTMLInputElement>();
    const finalValueRef = ref<HTMLInputElement>();
    const changeValue = ref<number | null>(null);

    const onSubmit = () => {
      if (!(finalValueRef.value?.value && initialValueRef.value?.value)) {
        return;
      }

      const finalValue = parseInt(finalValueRef.value?.value, 10);
      const initialValue = parseInt(initialValueRef.value?.value, 10);

      changeValue.value = ((finalValue - initialValue) / initialValue) * 100;
    };

    return { changeValue, initialValueRef, finalValueRef, onSubmit };
  },
});
</script>

<template>
  <h1>Relative Change</h1>

  <form @submit.prevent="onSubmit" :class="$style.form" data-test="form">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input
        class="mdl-textfield__input"
        type="text"
        pattern="-?[0-9]*(\.[0-9]+)?"
        id="initialValue"
        ref="initialValueRef"
      />
      <label class="mdl-textfield__label" for="initialValue"
        >Initial Value</label
      >
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input
        class="mdl-textfield__input"
        type="text"
        pattern="-?[0-9]*(\.[0-9]+)?"
        id="finalValue"
        ref="finalValueRef"
      />
      <label class="mdl-textfield__label" for="finalValue">Final Value</label>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>

    <button
      type="submit"
      class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
    >
      Calculate
    </button>
  </form>

  <p v-if="changeValue !== null" :class="$style.result" data-test="result">
    The relative change is {{ changeValue }}%
  </p>
</template>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 300px;
  }
}

.result {
  font-size: 24px;
  text-align: center;
  padding: 20px 0;
}
</style>
