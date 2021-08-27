<template>
  <div class="post-detail-page container mx-auto">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentPost.image"
        alt="currentPost.title"
        class="w-80 mt-4"
        v-if="currentPost.image"
      />
      <h2 class="my-4 text-4xl">{{ currentPost.title }}</h2>
      <div
        class="flex items-center justify-between border-t-2 border-b-2 py-4 my-8"
      >
        <user-profile :user="currentPost.author"></user-profile>
        <span class="text-muted text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-if="showEditArea" class="space-x-3 mb-2">
        <button
          class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <router-link :to="{ name: 'create', query: { id: currentPost.id } }">
            编辑
          </router-link>
        </button>
        <button
          class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div>
      <div v-html="currentHTML"></div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import MarkdownIt from "markdown-it";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getPost } from "@/api";
import { GlobalDataProps, PostProps } from "../store";
import UserProfile from "@/components/UserProfile.vue";
import createMessage from "../components/createMessage";

export default defineComponent({
  name: "post-detail",
  components: {
    UserProfile,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const modalIsVisible = ref(false);
    const currentId = +route.params.id;
    const md = new MarkdownIt();
    let currentPost = ref<PostProps>();
    let currentHTML = ref("");
    onMounted(() => {
      getPost(currentId).then((res) => {
        // console.log(res);
        currentPost.value = res.data;
        currentHTML.value = md.render(res.data.content);
      });
    });
    const showEditArea = computed(() => {
      const { id } = store.state.user;
      if (currentPost.value && currentPost.value.id) {
        return currentPost.value.columnId === id;
      } else {
        return false;
      }
    });
    // const hideAndDelete = () => {
    //   modalIsVisible.value = false;
    //   store
    //     .dispatch("deletePost", currentId)
    //     .then((rawData: ResponseType<PostProps>) => {
    //       createMessage("删除成功，2秒后跳转到专栏首页", "success", 2000);
    //       setTimeout(() => {
    //         router.push({
    //           name: "column",
    //           params: { id: rawData.data.column },
    //         });
    //       }, 2000);
    //     });
    // };
    return {
      currentPost,
      currentHTML,
      showEditArea,
      modalIsVisible,
      //   hideAndDelete,
    };
  },
});
</script>
