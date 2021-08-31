import { createStore } from "vuex";
import { getColumns,   getUserinfo } from "@/api";
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
export interface LoginProps {
  email: string;
  password: string;
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
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    user: {},
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id);
    },
  },
  mutations: {
    logout(state) {
      state.user = {};
      localStorage.removeItem("userinfo");
    },
    fetchUserinfo(state, data) {
      const userinfo = { ...data };
      state.user = { ...state.user, ...userinfo };
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
    },
    fetchColumns(state, data) {
      state.columns = data?.list || [];
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
    async fetchUserinfo({ commit }) {
      const { data } = await getUserinfo();
      commit("fetchUserinfo", data);
    },
  },
});

export default store;
