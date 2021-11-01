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
  <h1 :class="$style.heading">Relative Change</h1>

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
    The relative change is {{ changeValue.toFixed(2) }}%
  </p>
</template>

<style lang="scss" module>
.heading {
  text-align: center;
  margin-top: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 1.5rem;
    color: #fff;
  }

  input {
    padding: 0.75rem;
    background-color: rgba(0, 0, 0, 0.4);
  }

  button {
    width: 300px;
    background-color: var(--alt-color-3) !important;
  }
}

.result {
  font-size: 2rem;
  text-align: center;
  padding: 2.5rem 0;
}
</style>
