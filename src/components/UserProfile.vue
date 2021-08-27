<template>
  <figure class="flex rounded-xl justify-center items-center" v-if="user">
    <img
      class="w-16 h-16 rounded-full border mr-2"
      :src="user.userImage"
      alt=""
    />
    <div class="text-center md:text-left space-y-1">
      <blockquote>
        <p class="text-lg font-semibold">
          {{ user.nickName }}
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">{{ user.userDescription }}</div>
      </figcaption>
    </div>
  </figure>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store/index";
export default defineComponent({
  name: "user-profile",
  setup() {
    const store = useStore<GlobalDataProps>();
    const user = computed(() => {
      return store.state.user;
    });
    return {
      user,
    };
  },
});
</script>
<style scoped></style>
