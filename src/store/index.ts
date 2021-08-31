import { createStore } from "vuex";
import { getColumns, getUserinfo } from "@/api";
import { arrayDeduplication } from '@/utils/helper'
export interface ResponseType<P> {
  code: number;
  msg: string;
  data: P;
}
export interface pageProps {
  columnId?: number;
  page: number;
  size: number;
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
  description: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
  author?: UserProps;
}
export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  columnsTotal: number;
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    columnsTotal: 0,
    user: {},
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
      // state.columns = data?.list || [];
      const newList = state.columns.concat(data.list)
      state.columns = arrayDeduplication(newList, 'id');
      state.columnsTotal = data?.totalCount || [];
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  actions: {
    async fetchColumns(context, params = { page: 1, size: 3 }) {
      const res = await getColumns(params);
      context.commit("fetchColumns", res?.data);
    },
    async fetchUserinfo({ commit }) {
      const { data } = await getUserinfo();
      commit("fetchUserinfo", data);
    },
  },
});

export default store;
