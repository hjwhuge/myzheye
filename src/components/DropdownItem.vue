<template>
  <a
    href="#"
    class="menuitem block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    :class="{ 'is-disabled': disabled }"
    role="menuitem"
    tabindex="-1"
    id="user-menu-item-0"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style scoped>
.menuitem.is-disabled {
  color: #6c757d;
  background-color: transparent;
  /* pointer-events: none; */
  cursor: not-allowed;
}
</style>
