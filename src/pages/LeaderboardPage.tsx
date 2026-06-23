import { Trophy } from 'lucide-react';
import { leaderboard } from '../data/mockData';

const MEDAL_COLORS: Record<number, string> = {
  1: '#F59E0B',
  2: '#9AA1B5',
  3: '#B45309',
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">Leaderboard</h1>
        <p className="mt-1 text-sm text-textSecondary">Top contributors ranked by reputation points.</p>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-cardBorder bg-card">
        {leaderboard.map((u, i) => (
          <div
            key={u.id}
            className="flex items-center gap-4 border-b border-cardBorder px-5 py-4 last:border-0"
          >
            <div className="flex w-8 items-center justify-center">
              {u.rank <= 3 ? (
                <Trophy size={18} color={MEDAL_COLORS[u.rank]} />
              ) : (
                <span className="text-sm font-bold text-textMuted">#{u.rank}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-textPrimary">{u.name}</p>
              <p className="truncate text-xs text-textSecondary">{u.category}</p>
            </div>
            <span className="text-sm font-bold text-primary-light">{u.points.toLocaleString()} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
