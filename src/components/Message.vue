<template>
  <teleport to="#message">
    <div
      v-if="isVisible"
      class="message-content fixed top-16 w-1/4 px-6 py-4 border-0 rounded"
      :class="classObject"
    >
      <span>
        <svg
          class="inline-block mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="getSvg()"
          />
        </svg>
      </span>
      <span class="inline-block align-middle">
        {{ message }}
      </span>
      <button
        class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        @click.prevent="hide"
      >
        <span>×</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useDOMCreate from "@/hooks/useDOMCreate";
export type MessageType = "success" | "error" | "warn" | "info";
export default defineComponent({
  name: "Message",
  props: {
    message: String,
    type: {
      tyep: String as PropType<MessageType>,
      default: "info",
    },
  },
  emits: ["close-message"],
  setup(props, context) {
    let isVisible = ref(true);
    const hide = () => {
      isVisible.value = false;
      context.emit("close-message", true);
    };
    const getSvg = () => {
      let svgPath = "";
      switch (props.type) {
        case "success":
          svgPath = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
          break;
        case "error":
          svgPath =
            "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
          break;
        case "warn":
          svgPath =
            "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9";
          break;
        case "info":
          svgPath = "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
          break;

        default:
          svgPath = "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
          break;
      }
      return svgPath;
    };
    const classObject = {
      "alert-success": props.type === "success",
      "alert-error": props.type === "error",
      "alert-warn": props.type === "warn",
      "alert-info": props.type === "info",
    };
    useDOMCreate("message");
    return {
      isVisible,
      classObject,
      hide,
      getSvg,
    };
  },
});
</script>
<style scoped>
.message-content {
  margin-left: 50%;
  transform: translateX(-50%);
}
/* 以下颜色参考自 element-ui */
.alert-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.alert-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.alert-warn {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.alert-info {
  border-color: #ebeef5;
  background-color: #edf2fc;
  color: #909399;
}
</style>
