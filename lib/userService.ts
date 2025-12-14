import api from "./api";
import { User } from "@/types/user";
import { Post } from "@/types/post";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users");
  return res.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const res = await api.post<User>("/users", data);
  return res.data;
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  const res = await api.put<User>(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getPostsByUser = async (userId: number): Promise<Post[]> => {
  const res = await api.get<Post[]>(`/users/${userId}/posts`);
  return res.data;
};
