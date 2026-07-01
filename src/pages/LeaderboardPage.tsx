import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { getLeaderboard } from '../api/users';

const MEDAL_COLORS: Record<number, string> = { 1: '#F59E0B', 2: '#9AA1B5', 3: '#B45309' };

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<{ id: string; name: string; reputationPoints: number; expertise?: { category: { name: string } }[] }[]>([]);

  useEffect(() => {
    getLeaderboard().then(setLeaderboard).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">Leaderboard</h1>
        <p className="mt-1 text-sm text-textSecondary">Top contributors ranked by reputation points.</p>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-cardBorder bg-card">
        {leaderboard.map((u, i) => {
          const rank = i + 1;
          return (
            <div key={u.id} className="flex items-center gap-4 border-b border-cardBorder px-5 py-4 last:border-0">
              <div className="flex w-8 items-center justify-center">
                {rank <= 3 ? <Trophy size={18} color={MEDAL_COLORS[rank]} /> : <span className="text-sm font-bold text-textMuted">#{rank}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-textPrimary">{u.name}</p>
                <p className="truncate text-xs text-textSecondary">{u.expertise?.[0]?.category.name ?? 'General'}</p>
              </div>
              <span className="text-sm font-bold text-primary-light">{u.reputationPoints.toLocaleString()} pts</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
