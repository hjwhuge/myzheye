<template>
  <div class="validate-input-container">
    <input
      class="mt-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :class="[{ 'border-red-400': inputRef.error }]"
      :value="inputRef.val"
      v-bind="$attrs"
      @input="updateValue"
      @blur="validateInput"
    />
    <p
      v-if="inputRef.error"
      class="mt-2 text-sm text-gray-500"
      :class="[{ 'text-red-400': inputRef.error }]"
    >
      {{ inputRef.message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /\S+@\S+\.\S+/;
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      const { rules } = props;
      if (rules) {
        const allPassed = rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;

            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
<style></style>
