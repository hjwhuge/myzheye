<template>
  <ul class="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded p-8 mt-8">
    <li
      class="flex flex-col items-center border rounded py-4"
      v-for="item in columnList"
      :key="item.id"
    >
      <img :src="item.columnImage" class="border rounded-full w-20 h-20" />
      <p class="my-2 font-bold">{{ item.columnName }}</p>
      <p class="my-3 w-4/5 text-left">{{ item.columnDescription }}</p>
      <p>
        <button
          class="px-5 py-1 text-blue-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          @click="onDetails(item.id)"
        >
          进入专栏
        </button>
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { ColumnProps } from "@/store";
// 解决ts require 类型报错
declare function require(moduleName: string): never;

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const route = useRouter();
    const columnList = computed(() => {
      return props.list.map((item) => {
        if (!item.columnImage) {
          item.columnImage = require("@/assets/logo.png");
        }
        return item;
      });
    });
    const onDetails = (id: number) => {
      route.push(`/column/${id}`);
    };
    return {
      columnList,
      onDetails,
    };
  },
});
</script>
