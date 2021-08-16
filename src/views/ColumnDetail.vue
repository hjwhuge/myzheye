<template>
  <div class="container mx-auto">
    <figure class="flex rounded-xl p-8 justify-center" v-if="column">
      <img
        class="w-32 h-32 rounded-full border"
        :src="column.avatar"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-lg font-semibold">
            {{ column.title }}
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div class="text-cyan-600">{{ column.description }}</div>
        </figcaption>
      </div>
    </figure>
    <PostList :list="list"></PostList>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import PostList from "../components/PostList.vue";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = +route.params.id;
    const column = computed(() => store.getters.getColumnById(currentId));
    const list = computed(() => store.state.posts);
    // const list = computed(() =>
    //   store.state.posts.filter((post) => post.columnId === currentId)
    // );
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
      store.dispatch("fetchColumn", currentId);
    });
    return {
      column,
      list,
    };
  },
});
</script>
<style scoped></style>
