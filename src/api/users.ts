import { api } from './client';
import type { AdminUser } from './auth';

export function listUsers(q?: string) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  return api.get<AdminUser[]>(`/users${qs}`);
}

export function suspendUser(id: string) {
  return api.patch(`/users/${id}/suspend`);
}

export function banUser(id: string) {
  return api.patch(`/users/${id}/ban`);
}

export function reactivateUser(id: string) {
  return api.patch(`/users/${id}/reactivate`);
}

export function verifyUser(id: string) {
  return api.patch(`/users/${id}/verify`);
}

export function getLeaderboard() {
  return api.get<{ id: string; name: string; reputationPoints: number; expertise?: { category: { name: string } }[] }[]>(
    '/users/leaderboard',
  );
}
