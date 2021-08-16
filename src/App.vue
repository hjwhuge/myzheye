<template>
  <div>
    <GobalHeader :user="userinfo" />
    <Loader v-if="isLoading" text="这是loading文本内容，拼命加载中"></Loader>
    <!-- <Message
      type="success"
      message="这是一个提示信息，一条成功的提示消息"
    ></Message> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import GobalHeader from "./components/GobalHeader.vue";
import Loader from "./components/Loader.vue";
// import Message from "./components/Message.vue";

export default defineComponent({
  name: "App",
  components: {
    GobalHeader,
    Loader,
    // Message,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const userinfo = computed(() => {
      let data = store.state.user;
      const tempUserinfo = localStorage.getItem("userinfo");
      if (tempUserinfo) {
        data = JSON.parse(tempUserinfo);
      }
      return data;
    });
    const isLoading = computed(() => store.state.loading);
    // let userinfo = computed(() => store.state.user);
    // const tempUserinfo = localStorage.getItem("userinfo");
    // if (tempUserinfo) {
    //   userinfo = JSON.parse(tempUserinfo);
    // }
    return {
      userinfo,
      isLoading,
    };
  },
});
</script>
