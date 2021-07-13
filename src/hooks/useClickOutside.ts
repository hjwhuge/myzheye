import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    const { value } = elementRef;
    if (value) {
      //   点击的位置包含下拉列表
      if (value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside;
};
export default useClickOutside;
