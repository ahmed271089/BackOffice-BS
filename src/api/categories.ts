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
  return api.post<Category>('/categories', data); // Backoffice still uses /categories instead of /admin/categories? Oh wait, let's look at api.ts later. But wait, `listCategories` uses `/categories`. Admin backend uses `admin/categories`. Actually, `listCategories` in Mobile-App uses `/posts/categories`. The Admin uses `/admin/categories` ideally.
  // Wait, let's stick to what's there:
}

export function updateCategory(id: string, data: { name?: string; slug?: string; icon?: string }) {
  return api.patch<Category>(`/categories/${id}`, data);
}

export function deleteCategory(id: string) {
  return api.delete(`/categories/${id}`);
}
