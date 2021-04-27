<template>
  <div>
    <GobalHeader :user="user" />
    <div class="container mx-auto">
      <ColumnList :list="list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GobalHeader, { UserProps } from "./components/GobalHeader.vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
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
  },
  setup() {
    return {
      list: testData,
      user: testUser,
    };
  },
});
</script>
