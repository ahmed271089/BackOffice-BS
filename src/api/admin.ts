import { api } from './client';

export interface DashboardStats {
  platformStats: {
    totalSolved: number;
    expertsVerified: number;
    successRate: string;
    activeProblems: number;
  };
  categoryHealth: { id: string; name: string; openCount: number; solvedRate: number; color: string }[];
  platformLoadSeries: { day: string; posts: number }[];
  moderationQueue: { id: string; type: string; title: string; reason: string; reportedBy: string; createdAt: string }[];
  leaderboard: { id: string; rank: number; name: string; category: string; points: number }[];
}

export function getDashboardStats() {
  return api.get<DashboardStats>('/admin/stats');
}

export function togglePostVisibility(id: string, isHidden: boolean) {
  return api.patch(`/admin/posts/${id}/visibility`, { isHidden });
}

export function deletePost(id: string) {
  return api.delete(`/admin/posts/${id}`);
}

export function toggleCommentVisibility(id: string, isHidden: boolean) {
  return api.patch(`/admin/comments/${id}/visibility`, { isHidden });
}

export function deleteComment(id: string) {
  return api.delete(`/admin/comments/${id}`);
}

export function suspendUser(id: string) {
  return api.patch(`/users/${id}/suspend`);
}

export function banUser(id: string) {
  return api.patch(`/users/${id}/ban`);
}
