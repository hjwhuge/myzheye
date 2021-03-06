<template>
  <div class="validate-input-container">
    <input
      v-if="tag !== 'textarea'"
      class="mt-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :class="[{ 'border-red-400': inputRef.error }]"
      v-model="inputRef.val"
      v-bind="$attrs"
      @blur="validateInput"
    />
    <textarea
      v-else
      class="mt-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :class="[{ 'border-red-400': inputRef.error }]"
      v-bind="$attrs"
      v-model="inputRef.val"
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
import { defineComponent, PropType, reactive, onMounted, computed } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /\S+@\S+\.\S+/;
interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || "",
        set: (val) => {
          context.emit("update:modelValue", val);
        },
      }),
      error: false,
      message: "",
    });
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
            case "custom":
              passed = rule.validator ? rule.validator() : true;
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
    };
  },
});
</script>
<style></style>
