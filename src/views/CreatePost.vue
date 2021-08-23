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
            <Uploader
              action="/api/upload"
              :beforeUpload="uploadCheck"
              @file-uploaded="onFileUploaded"
              class="flex justify-center items-center bg-gray-100 text-gray-600 h-48 rounded cursor-pointer"
            >
              <h2>点击上传文章头图</h2>
              <template v-slot:loading>
                <div class="flex items-center">
                  <div
                    class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
                  ></div>
                  <h2 class="ml-10">正在上传....</h2>
                </div>
              </template>
              <template #uploaded="dataProps">
                <img
                  :src="dataProps.uploadedData.data.url"
                  class="w-full h-full object-contain"
                  alt=""
                />
              </template>
            </Uploader>
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps } from "@/store";
import { createPost } from "@/api";
import createMessage from "@/components/createMessage";
import Uploader from "@/components/Uploader.vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { beforeUploadCheck } from "@/utils/helper";
export default defineComponent({
  name: "Create",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();

    const curImageUrl = ref("");
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
          title: titleValue.value,
          content: contentValue.value,
          columnId: +columnIdValue.value,
          createdAt: new Date().toLocaleString(),
        };
        if (curImageUrl.value) {
          newPost.image = curImageUrl.value;
        }
        createPost(newPost).then(() => {
          // console.log(res);
          createMessage("success", "文章新建成功！");

          router.push({ name: "column", params: { id: columnIdValue.value } });
        });
      }
    };
    const uploadCheck = (file: File) => {
      //   console.log(file);
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("error", "上传图片只能是 JPG 或者 PNG 格式！");
      }
      if (error === "size") {
        createMessage("error", "上传图片大小不能大于 1Mb ！");
      }
      return passed;
    };
    const onFileUploaded = (rawData: any) => {
      console.log(rawData);
      curImageUrl.value = rawData.data.url;
      createMessage("success", "图片上传成功！");
    };
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    return {
      columnIdValue,
      titleValue,
      titleRules,
      contentValue,
      detailRules,
      columns,
      onFormSubmit,
      uploadCheck,
      onFileUploaded,
    };
  },
});
</script>
<style scoped></style>
