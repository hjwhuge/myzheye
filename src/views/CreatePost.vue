<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-6">
    <ValidateForm @form-submit="onFormSubmit">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-4">
            <Uploader
              action="/api/upload"
              :beforeUpload="uploadCheck"
              @file-uploaded="onFileUploaded"
              :uploaded="uploadData"
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
                  :src="
                    dataProps.uploadedData && dataProps.uploadedData.data.url
                  "
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
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >文章简介</label
            >
            <ValidateInput
              :rules="descriptionRules"
              v-model="descriptionValue"
              type="text"
              name="email-address"
              placeholder="请输入文章简介"
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
          {{ isEditMode ? "编辑文章" : "发表文章" }}
        </span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps } from "@/store";
import { createPost, updatePost } from "@/api";
import createMessage from "@/components/createMessage";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import Uploader from "@/components/Uploader.vue";
import { beforeUploadCheck } from "@/utils/helper";
import { getPost } from "@/api";
export default defineComponent({
  name: "Create",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const isEditMode = !!route.query.id;

    const uploadData = ref();
    const curImageUrl = ref("");
    const titleValue = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const descriptionValue = ref("");
    const descriptionRules: RulesProp = [
      { type: "required", message: "文章简介不能为空" },
    ];
    const contentValue = ref("");
    const detailRules: RulesProp = [
      { type: "required", message: "文章详情不能为空" },
    ];
    const onFormSubmit = (result: boolean) => {
      // console.log(result);
      if (result) {
        const { user } = store.state;
        if (!user.id) {
          createMessage("error", "用户信息不存在，请重新登录");
          return;
        }
        const columnId = user.id;
        const newPost: PostProps = {
          title: titleValue.value,
          description: descriptionValue.value,
          content: contentValue.value,
          columnId,
          createdAt: new Date().toLocaleString(),
          author: user,
        };
        if (curImageUrl.value) {
          newPost.image = curImageUrl.value;
        }
        if (route.query.id) {
          updatePost(newPost, +route.query.id).then(() => {
            // console.log(res);
            createMessage("success", "文章编辑成功！");

            router.push({ name: "column", params: { id: columnId } });
          });
        } else {
          createPost(newPost).then(() => {
            // console.log(res);
            createMessage("success", "文章新建成功！");

            router.push({ name: "column", params: { id: columnId } });
          });
        }
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
      // console.log(rawData);
      curImageUrl.value = rawData.data.url;
      createMessage("success", "图片上传成功！");
    };

    onMounted(() => {
      // console.log(route.query);
      if (route.query.id) {
        const currentId = +route.query.id;
        getPost(currentId).then((res) => {
          // console.log(res.data);
          const { image, title, description, content } = res.data;
          if (image) {
            uploadData.value = { data: { url: image } };
          }
          curImageUrl.value = image;
          titleValue.value = title;
          descriptionValue.value = description;
          contentValue.value = content;
        });
      }
    });
    return {
      titleValue,
      titleRules,
      descriptionValue,
      descriptionRules,
      contentValue,
      detailRules,
      onFormSubmit,
      uploadCheck,
      onFileUploaded,
      isEditMode,
      uploadData,
    };
  },
});
</script>
<style scoped></style>
