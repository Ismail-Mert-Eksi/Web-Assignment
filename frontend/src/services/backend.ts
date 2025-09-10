import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body?: string;
};

/** USERS **/
export const getUsers = async () => (await api.get<User[]>("/users")).data;
export const createUser = async (u: Omit<User, "id">) =>
  (await api.post<User>("/users", u)).data;
export const updateUser = async (id: number, u: Partial<User>) =>
  (await api.patch<User>(`/users/${id}`, u)).data;
export const deleteUser = async (id: number) =>
  (await api.delete(`/users/${id}`)).data;

/** POSTS **/
export const getPosts = async () => (await api.get<Post[]>("/posts")).data;
export const createPost = async (p: Omit<Post, "id">) =>
  (await api.post<Post>("/posts", p)).data;
export const createPostForUser = async (
  userId: number,
  p: Omit<Post, "id" | "userId">
) => (await api.post<Post>(`/posts/user/${userId}`, p)).data;
export const updatePost = async (id: number, p: Partial<Post>) =>
  (await api.patch<Post>(`/posts/${id}`, p)).data;
export const deletePost = async (id: number) =>
  (await api.delete(`/posts/${id}`)).data;
