<script lang="ts">
import { IDocument } from "@/store/models";
import { useStore } from "@/store/useStore";
import { computed, defineComponent } from "@vue/runtime-core";
import { Field, Form, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "Create",
  components: { Field, Form, ErrorMessage },
  setup() {
    const { state, dispatch } = useStore();

    const tags = computed(() => state.tags);

    const onSubmit = async (values: any, actions: any) => {
      console.log(values, actions);

      try {
        await dispatch("createDocument", {
          title: values.title,
          tag: values.tag,
          description: values.description,
          file: values.image,
        } as IDocument);
      } catch (e) {
        actions.setFieldError("form", "Failed to create new document");
      }
    };

    return { tags, onSubmit };
  },
});
</script>

<template>
  <Form @submit="onSubmit" v-slot="{ isSubmitting }">
    <ErrorMessage name="form" />

    <Field
      name="title"
      type="text"
      rules="required|alpha_spaces|min:4|max:20"
    />
    <ErrorMessage name="title" />

    <Field name="description" type="text" rules="max:140" />
    <ErrorMessage name="description" />

    <Field name="tag" as="select" rules="required">
      <option v-for="(tag, index) in tags" :key="index" :value="tag">
        {{ tag }}
      </option>
    </Field>
    <ErrorMessage name="tag" />

    <Field name="image" type="file" rules="required|image" />
    <ErrorMessage name="image" />

    <button :disabled="isSubmitting">Submit</button>
  </Form>
</template>
