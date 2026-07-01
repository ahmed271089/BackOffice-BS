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
