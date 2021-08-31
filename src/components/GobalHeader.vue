<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-blue-600">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div
        class="relative flex items-center justify-between h-16 text-white text-lg"
      >
        <div>
          <div>
            <router-link to="/">花荣专栏</router-link>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          v-if="user.id"
        >
          <div>你好：{{ user.nickName }}</div>

          <!-- Profile dropdown -->
          <!-- <Dropdown /> -->
          <Dropdown :userImage="user.userImage || defalutImage">
            <DropdownItem @click.prevent="onCreate">新建文章</DropdownItem>
            <DropdownItem @click.prevent="onMyColumn">我的专栏</DropdownItem>
            <DropdownItem disabled>编辑资料</DropdownItem>
            <DropdownItem @click="onLogout">退出登录</DropdownItem>
          </Dropdown>
        </div>
        <div v-else>
          <button
            class="px-5 py-1 font-semibold rounded border border-purple-200 hover:text-black hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mr-3"
            @click="onLogin"
          >
            登录
          </button>
          <button
            class="px-5 py-1 font-semibold rounded border border-purple-200 hover:text-black hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            @click="onSignup"
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserProps } from "@/store";
import { logout } from "@/api";
import Dropdown from "@/components/Dropdown.vue";
import DropdownItem from "@/components/DropdownItem.vue";
// 解决ts require 类型报错
declare function require(moduleName: string): never;

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const onLogin = () => {
      router.push("/login");
    };
    const onSignup = () => {
      router.push("/signup");
    };
    const onCreate = () => {
      router.push("/create");
    };
    const onMyColumn = () => {
      const { id } = props.user;
      if (id) {
        router.push({
          name: "column",
          params: { id },
        });
      }
    };
    const onLogout = () => {
      logout().then(() => {
        store.commit("logout");
        router.push("/login");
      });
    };
    const defalutImage: string = require("@/assets/logo.png");
    return {
      onLogin,
      onSignup,
      onLogout,
      onCreate,
      onMyColumn,
      defalutImage,
    };
  },
});
</script>
