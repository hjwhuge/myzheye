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
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <!-- <div class="col">
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div> -->
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <!-- <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ name: 'create', query: { id: currentPost._id } }"
        >
          编辑
        </router-link>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div> -->
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MarkdownIt from "markdown-it";
import { useRoute, useRouter } from "vue-router";
import { getPost } from "@/api";
import { PostProps, UserProps } from "../store";
// import UserProfile from "../components/UserProfile.vue";
import createMessage from "../components/createMessage";

export default defineComponent({
  name: "post-detail",
  components: {
    // UserProfile,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
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
    // const showEditArea = computed(() => {
    //   const { isLogin, _id } = store.state.user;
    //   if (currentPost.value && currentPost.value.author && isLogin) {
    //     const postAuthor = currentPost.value.author as UserProps;
    //     return postAuthor._id === _id;
    //   } else {
    //     return false;
    //   }
    // });
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
      //   showEditArea,
      modalIsVisible,
      //   hideAndDelete,
    };
  },
});
</script>
