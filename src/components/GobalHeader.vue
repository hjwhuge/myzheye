<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-blue-600">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div
        class="relative flex items-center justify-between h-16 text-white text-lg"
      >
        <div>
          <div>花荣专栏</div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          v-if="user.isLogin"
        >
          <div>你好：{{ user.name }}</div>

          <!-- Profile dropdown -->
          <Dropdown />
        </div>
        <div v-else>
          <button
            class="px-5 py-1 font-semibold rounded border border-purple-200 hover:text-black hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mr-3"
          >
            登录
          </button>
          <button
            class="px-5 py-1 font-semibold rounded border border-purple-200 hover:text-black hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            注册
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "@/components/Dropdown.vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  components: {
    Dropdown,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
});
</script>
