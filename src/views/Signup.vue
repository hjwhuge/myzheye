<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-6">
    <ValidateForm @form-submit="onFormSubmit">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
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
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api";
import createMessage from "@/components/createMessage";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
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
    const onFormSubmit = (result: boolean) => {
      // console.log(result);
      if (result) {
        const params = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password,
        };
        signup(params).then(() => {
          // console.log(res);
          createMessage("success", "注册成功");
          router.push("/login");
        });
      }
    };
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
    };
  },
});
</script>
<style scoped></style>
