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
              v-model="emailValue"
              type="text"
              name="email-address"
              placeholder="请输入邮箱地址"
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
              v-model="passwordValue"
              type="password"
              name="password"
              placeholder="请输入密码"
            />
          </div>
        </div>
      </div>
      <template v-slot:submit>
        <span
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          登录
        </span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api";
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
    const emailValue = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱地址不能为空" },
      { type: "email", message: "请输入正确的邮箱地址" },
    ];
    const passwordValue = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const onFormSubmit = (result: boolean) => {
      // console.log(result);
      if (result) {
        const params = {
          email: emailValue.value,
          password: passwordValue.value,
        };
        login(params).then(() => {
          // console.log(res);
          createMessage("success", "登录成功");
          store.dispatch("fetchUserinfo").then(() => {
            router.push("/");
          });
        });
      }
    };
    return {
      emailValue,
      emailRules,
      passwordValue,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>
<style scoped></style>
