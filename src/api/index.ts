import request from "@/utils/request";
import { PostProps, UserProps, LoginProps, pageProps } from "@/store";

export function getColumns(params: pageProps) {
  return request({
    url: "/columns",
    method: "get",
    params,
  });
}

export function getColumn(columnId: number) {
  return request({
    url: `/columns/${columnId}`,
    method: "get",
  });
}

export function getPosts(columnId: number) {
  return request({
    url: "/posts",
    method: "get",
    params: {
      columnId,
      page: 1,
      size: 10,
    },
  });
}

export function getPost(columnId: number) {
  return request({
    url: `/posts/${columnId}`,
    method: "get",
  });
}

export function createPost(data: PostProps) {
  return request({
    url: "/posts",
    method: "post",
    data,
  });
}

export function updatePost(data: PostProps, postId: number) {
  return request({
    url: `/posts/${postId}`,
    method: "put",
    data,
  });
}

export function delPost(id: number) {
  return request({
    url: `/posts/delete`,
    method: "post",
    data: {
      id,
    },
  });
}

export function getUserinfo() {
  return request({
    url: "/user",
    method: "get",
  });
}

export function signup(data: UserProps) {
  return request({
    url: "/user",
    method: "post",
    data,
  });
}

export function login(data: LoginProps) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}
