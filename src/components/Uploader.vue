<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading"
        ><button class="btn-indigo">正在上传</button></slot
      >
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
        ><button class="btn-indigo">上传成功</button></slot
      >
      <slot v-else name="default"
        ><button class="btn-indigo">点击上传</button></slot
      >
    </div>

    <input
      type="file"
      class="file-input hidden"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
import createMessage from "@/components/createMessage";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  name: "",
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  inheritAttrs: false,
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const uploadedData = ref();
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.action, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.code !== 2000) {
              createMessage("error", res.data.message || "Error");
            }
            uploadedData.value = res.data;
            fileStatus.value = "success";
            context.emit("file-uploaded", res.data);
          })
          .catch((err) => {
            fileStatus.value = "error";
            context.emit("file-uploaded-error", err);
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      fileStatus,
      uploadedData,
      triggerUpload,
      handleFileChange,
    };
  },
});
</script>
<style lang="postcss">
.btn-indigo {
  @apply px-5 py-1 font-semibold rounded text-white bg-blue-600 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2;
}
</style>
