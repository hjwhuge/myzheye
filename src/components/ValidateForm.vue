<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div
      class="submit-area py-3 text-left w-60 ml-6"
      @click.prevent="submitForm"
    >
      <slot name="submit">
        <span
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          提交
        </span>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
type Events = {
  "form-item-created": any;
};
type ValidateFunc = () => boolean;
export const emitter = mitt<Events>();
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((res) => res);
      context.emit("form-submit", result);
    };
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>
<style scoped></style>
