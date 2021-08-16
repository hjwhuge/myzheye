<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-6">
    <ValidateForm @form-submit="onFormSubmit">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="country" class="block text-sm font-medium text-gray-700"
              >专栏</label
            >
            <select
              v-model="columnIdValue"
              id="country"
              name="country"
              autocomplete="country"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option v-for="item in columns" :key="item.id" :value="item.id">
                {{ item.title }}
              </option>
            </select>
          </div>
          <div class="col-span-6 sm:col-span-4">
            <label
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >文章标题</label
            >
            <ValidateInput
              :rules="titleRules"
              v-model="titleValue"
              type="text"
              name="email-address"
              placeholder="请输入文章标题"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="street-address"
              class="block text-sm font-medium text-gray-700"
              >文章详情</label
            >
            <ValidateInput
              tag="textarea"
              rows="10"
              :rules="detailRules"
              v-model="contentValue"
              name="abc"
              placeholder="请输入文章详情"
            />
          </div>
        </div>
      </div>
      <template v-slot:submit>
        <span
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          发表文章
        </span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps } from "@/store";
import createMessage from "@/components/createMessage";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
export default defineComponent({
  name: "Create",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();

    const columnIdValue = ref("");
    const titleValue = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentValue = ref("");
    const detailRules: RulesProp = [
      { type: "required", message: "文章详情不能为空" },
    ];
    const columns = computed(() => store.state.columns);
    const onFormSubmit = (result: boolean) => {
      // console.log(result, columnIdValue.value);
      if (result) {
        if (!columnIdValue.value) {
          createMessage("error", "请先选择专栏列表");
          return;
        }
        const newPost: PostProps = {
          id: new Date().getTime(),
          title: titleValue.value,
          content: contentValue.value,
          columnId: +columnIdValue.value,
          createdAt: new Date().toLocaleString(),
        };
        store.commit("createPost", newPost);

        router.push({ name: "column", params: { id: columnIdValue.value } });
      }
    };
    return {
      columnIdValue,
      titleValue,
      titleRules,
      contentValue,
      detailRules,
      columns,
      onFormSubmit,
    };
  },
});
</script>
<style scoped></style>
