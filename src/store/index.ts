import { createStore } from "vuex";
import { getColumns, getColumn, getPosts, getUserinfo } from "@/api";
export interface ResponseType<P> {
  code: number;
  msg: string;
  data: P;
}
export interface UserProps {
  id?: number;
  email?: string;
  nickName?: string;
  password?: string;
  userImage?: string;
  userDescription?: string;
  columnImage?: string;
  columnName?: string;
  columnDescription?: string;
}
export interface ColumnProps {
  id: number;
  columnName: string;
  columnImage?: string;
  columnDescription: string;
}
export interface PostProps {
  id?: number;
  title: string;
  description:string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
  author?: UserProps;
}
export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: {},
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id);
    },
    getPostsById: (state) => (id: number) => {
      return state.posts.filter((post) => post.columnId === id);
    },
  },
  mutations: {
    logout(state) {
      state.user = {};
      localStorage.removeItem("userinfo");
    },
    fetchColumns(state, data) {
      state.columns = data?.list || [];
    },
    fetchColumn(state, data) {
      state.columns = data || [];
    },
    fetchPost(state, data) {
      state.posts = data.list;
    },
    fetchUserinfo(state, data) {
      const userinfo = { ...data };
      state.user = { ...state.user, ...userinfo };
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  actions: {
    async fetchColumns(context) {
      const res = await getColumns();
      context.commit("fetchColumns", res?.data);
    },
    async fetchColumn({ commit }, currentId) {
      const { data } = await getColumn(currentId);
      commit("fetchColumn", [data]);
    },
    async fetchPost({ commit }, currentId) {
      // console.log(currentId);
      const { data } = await getPosts(currentId);
      commit("fetchPost", data);
    },
    async fetchUserinfo({ commit }) {
      const { data } = await getUserinfo();
      commit("fetchUserinfo", data);
    },
  },
});

export default store;
