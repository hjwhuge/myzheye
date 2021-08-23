<template>
  <teleport to="#back">
    <div
      class="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-screen z-50 bg-gray-700 opacity-75"
      :style="{ backgroundColor: background || '' }"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
      <!-- <div class="animate-spin h-5 w-5 text-white"></div>
    <span class="flex h-3 w-3">
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
      ></span>
      <span
        class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"
      ></span>
    </span> -->
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">
        {{
          text || `This may take a few seconds, please don't close this page.`
        }}
      </p>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDOMCreate from "@/hooks/useDOMCreate";
export default defineComponent({
  name: "loader",
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  setup() {
    useDOMCreate("back");
  },
});
</script>
