import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";

interface LoadParams {
  page: number;
  size: number;
}
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams
) => {
  const store = useStore();
  const page = ref(params.page);
  const requestParams = computed(() => ({
    page: page.value,
    size: params.size,
  }));
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value);
    page.value++;
  };
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.size) < page.value;
  });
  return {
    loadMorePage,
    isLastPage,
  };
};

export default useLoadMore;
