import { api } from './client';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  _count?: { posts: number };
}

export function listCategories() {
  return api.get<Category[]>('/categories');
}

export function createCategory(data: { name: string; slug: string; icon?: string }) {
  return api.post<Category>('/categories', data);
}

export function deleteCategory(id: string) {
  return api.delete(`/categories/${id}`);
}
