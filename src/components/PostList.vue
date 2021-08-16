<template>
  <div class="post-list">
    <article
      v-for="post in posts"
      :key="post.id"
      class="bg-white border rounded-md p-3 mb-3 shadow-sm"
    >
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post.id}/`">{{ post.title }}</router-link>
        </h4>
        <div class="flex my-3 align-items-center">
          <div v-if="post.image" class="mr-5">
            <img :src="post.image" :alt="post.title" class="rounded-lg w-96" />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-gray-500">
            {{ post.content }}
          </p>
        </div>
        <span class="text-gray-400">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    const posts = computed(() => {
      return props.list.map((post) => {
        return post;
      });
    });
    return {
      posts,
    };
  },
});
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>
