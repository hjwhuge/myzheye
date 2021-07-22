<template>
  <div>
    <GobalHeader :user="user" />
    <div class="container mx-auto">
      <ColumnList :list="list" v-if="false" />
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
              Submit
            </span>
          </template>
        </ValidateForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import GobalHeader, { UserProps } from "./components/GobalHeader.vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import ValidateForm from "./components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
const testUser: UserProps = {
  isLogin: true,
  name: "huarong",
};
const testData: ColumnProps[] = [
  {
    id: 1,
    avatar:
      "https://i.picsum.photos/id/515/200/200.jpg?hmac=d6WMJkHOOB7pT-6y_yjHKrJdVp3v17ry6bMzGVuyb68",
    title: "标题1",
    description: "描述111111111111111111111",
  },
  {
    id: 2,
    avatar:
      "https://i.picsum.photos/id/515/200/200.jpg?hmac=d6WMJkHOOB7pT-6y_yjHKrJdVp3v17ry6bMzGVuyb68",
    title: "标题2",
    description: "描述2222222222",
  },
  {
    id: 3,
    avatar:
      "https://i.picsum.photos/id/515/200/200.jpg?hmac=d6WMJkHOOB7pT-6y_yjHKrJdVp3v17ry6bMzGVuyb68",
    title: "标题3",
    description: "描述111111111111111111111",
  },
  {
    id: 4,
    title: "标题4-默认头像",
    description: "描述2222222222",
  },
  {
    id: 5,
    avatar:
      "https://i.picsum.photos/id/515/200/200.jpg?hmac=d6WMJkHOOB7pT-6y_yjHKrJdVp3v17ry6bMzGVuyb68",
    title: "标题5",
    description: "描述111111111111111111111",
  },
  {
    id: 6,
    avatar:
      "https://i.picsum.photos/id/515/200/200.jpg?hmac=d6WMJkHOOB7pT-6y_yjHKrJdVp3v17ry6bMzGVuyb68",
    title: "标题6",
    description: "描述2222222222",
  },
];
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GobalHeader,
    ValidateForm,
    ValidateInput,
  },
  setup() {
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
      console.log(result);
    };
    return {
      emailValue,
      emailRules,
      passwordValue,
      passwordRules,
      onFormSubmit,
      list: testData,
      user: testUser,
    };
  },
});
</script>
