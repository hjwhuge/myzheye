<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-6">
    <ValidateForm @form-submit="onFormSubmit">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-4">
            <Uploader
              action="/api/upload"
              :beforeUpload="uploadCheck"
              @file-uploaded="onUserFileUploaded"
              class="flex justify-center items-center bg-gray-100 text-gray-600 h-48 rounded cursor-pointer"
            >
              <h2>点击上传用户头图</h2>
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
                  v-if="dataProps.uploadedData && dataProps.uploadedData.data"
                />
              </template>
            </Uploader>
          </div>
          <div class="col-span-6 sm:col-span-4">
            <label
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >用户简介</label
            >
            <ValidateInput
              :rules="userDescriptionRules"
              v-model="formData.userDescription"
              type="text"
              name="email-address"
              placeholder="请输入用户简介"
            />
          </div>
          <div class="col-span-6 sm:col-span-4">
            <label
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >邮箱地址</label
            >
            <ValidateInput
              :rules="emailRules"
              v-model="formData.email"
              type="text"
              name="email-address"
              placeholder="请输入邮箱地址"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >昵称</label
            >
            <ValidateInput
              :rules="nameRules"
              v-model="formData.nickName"
              type="text"
              name="email-address"
              placeholder="请输入昵称"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="street-address"
              class="block text-sm font-medium text-gray-700"
              >密码</label
            >
            <ValidateInput
              :rules="passwordRules"
              v-model="formData.password"
              type="password"
              name="password"
              placeholder="请输入密码"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="street-address"
              class="block text-sm font-medium text-gray-700"
              >确认密码</label
            >
            <ValidateInput
              :rules="repeatPasswordRules"
              v-model="formData.repeatPassword"
              type="password"
              name="password"
              placeholder="请再次输入密码"
            />
          </div>
          <div class="col-span-6 sm:col-span-4">
            <Uploader
              action="/api/upload"
              :beforeUpload="uploadCheck"
              @file-uploaded="onFileUploaded"
              class="flex justify-center items-center bg-gray-100 text-gray-600 h-48 rounded cursor-pointer"
            >
              <h2>点击上传专栏头图</h2>
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
              >专栏名称</label
            >
            <ValidateInput
              :rules="columnNameRules"
              v-model="formData.columnName"
              type="text"
              name="email-address"
              placeholder="请输入专栏名称"
            />
          </div>
          <div class="col-span-6 sm:col-span-4">
            <label
              for="email-address"
              class="block text-sm font-medium text-gray-700"
              >专栏简介</label
            >
            <ValidateInput
              :rules="columnDescriptionRules"
              v-model="formData.columnDescription"
              type="text"
              name="email-address"
              placeholder="请输入专栏简介"
            />
          </div>
        </div>
      </div>
      <template v-slot:submit>
        <span
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          注册新用户
        </span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { UserProps } from "@/store";
import { signup } from "@/api";
import createMessage from "@/components/createMessage";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import Uploader from "@/components/Uploader.vue";
import { beforeUploadCheck } from "@/utils/helper";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  setup() {
    const router = useRouter();
    const curUserImageUrl = ref("");
    const curImageUrl = ref("");
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
      userDescription: "",
      columnName: "",
      columnDescription: "",
    });
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱地址不能为空" },
      { type: "email", message: "请输入正确的邮箱地址" },
    ];
    const nameRules: RulesProp = [
      { type: "required", message: "昵称不能为空" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const repeatPasswordRules: RulesProp = [
      { type: "required", message: "重复密码不能为空" },
      {
        type: "custom",
        message: "两次输入的密码不一致",
        validator: () => {
          return formData.password === formData.repeatPassword;
        },
      },
    ];
    const userDescriptionRules: RulesProp = [
      { type: "required", message: "用户简介不能为空" },
    ];
    const columnNameRules: RulesProp = [
      { type: "required", message: "专栏名称不能为空" },
    ];
    const columnDescriptionRules: RulesProp = [
      { type: "required", message: "专栏简介不能为空" },
    ];
    const onFormSubmit = (result: boolean) => {
      // console.log(result);
      if (result) {
        const params: UserProps = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password,
          userDescription: formData.userDescription,
          columnName: formData.columnName,
          columnDescription: formData.columnDescription,
        };
        if (curUserImageUrl.value) {
          params.userImage = curUserImageUrl.value;
        }
        if (curImageUrl.value) {
          params.columnImage = curImageUrl.value;
        }
        signup(params).then(() => {
          // console.log(res);
          createMessage("success", "注册成功");
          router.push("/login");
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
    const onUserFileUploaded = (rawData: any) => {
      // console.log(rawData);
      curUserImageUrl.value = rawData.data.url;
      createMessage("success", "图片上传成功！");
    };
    const onFileUploaded = (rawData: any) => {
      // console.log(rawData);
      curImageUrl.value = rawData.data.url;
      createMessage("success", "图片上传成功！");
    };
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      userDescriptionRules,
      columnNameRules,
      columnDescriptionRules,
      onFormSubmit,
      uploadCheck,
      onUserFileUploaded,
      onFileUploaded,
    };
  },
});
</script>
<style scoped></style>
