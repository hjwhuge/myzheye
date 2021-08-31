<template>
  <div class="container mx-auto">
    <figure class="flex rounded-xl p-8 justify-center" v-if="column">
      <img
        class="w-32 h-32 rounded-full border"
        :src="column.columnImage"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-lg font-semibold">
            {{ column.columnName }}
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div class="text-cyan-600">{{ column.columnDescription }}</div>
        </figcaption>
      </div>
    </figure>
    <PostList :list="postList"></PostList>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ColumnProps } from "@/store";
import { getColumn, getPosts } from "@/api";
import PostList from "../components/PostList.vue";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const currentId = +route.params.id;
    const column = ref<ColumnProps>();
    const postList = ref([]);
    onMounted(() => {
      getColumn(currentId).then((res) => {
        // console.log(res.data);
        column.value = res.data;
      });
      getPosts(currentId).then((res) => {
        // console.log(res.data);
        postList.value = res.data.list;
      });
    });
    return {
      column,
      postList,
    };
  },
});
</script>
<style scoped></style>
