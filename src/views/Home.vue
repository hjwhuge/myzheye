<template>
  <div class="container mx-auto">
    <div class="m-5 text-center">
      <button
        class="px-5 py-1 text-blue-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        @click="onCreate"
      >
        新增文章
      </button>
    </div>
    <ColumnList :list="list" />
    <div class="m-5 text-center">
      <button
        class="px-5 py-1 text-blue-600 font-semibold rounded border border-purple-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        @click="loadMorePage"
        v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { GlobalDataProps } from "@/store";
import ColumnList from "../components/ColumnList.vue";
import useLoadMore from "@/hooks/useLoadMore";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const list = computed(() => store.state.columns);
    const columnsTotal = computed(() => store.state.columnsTotal);
    const onCreate = () => {
      router.push("/create");
    };
    const { loadMorePage, isLastPage } = useLoadMore(
      "fetchColumns",
      columnsTotal,
      {
        page: 2,
        size: 3,
      }
    );
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    return {
      list,
      onCreate,
      loadMorePage,
      isLastPage,
    };
  },
});
</script>
<style scoped></style>
