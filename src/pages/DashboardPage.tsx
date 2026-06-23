import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle2, ShieldCheck, TrendingUp, Flame } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import {
  platformStats,
  moderationQueue,
  categoryHealth,
  platformLoadSeries,
  leaderboard,
} from '../data/mockData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>
        <p className="mt-1 text-sm text-textSecondary">Platform health at a glance.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Problems Solved"
          value={platformStats.totalSolved.toLocaleString()}
          icon={<CheckCircle2 size={18} />}
          accentClassName="text-primary-light"
        />
        <StatCard
          label="Verified Experts"
          value={platformStats.expertsVerified.toLocaleString()}
          icon={<ShieldCheck size={18} />}
        />
        <StatCard
          label="Success Rate"
          value={platformStats.successRate}
          icon={<TrendingUp size={18} />}
          accentClassName="text-success"
        />
        <StatCard
          label="Active Problems"
          value={String(platformStats.activeProblems)}
          icon={<Flame size={18} />}
          accentClassName="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Moderation queue preview */}
        <div className="rounded-xl2 border border-cardBorder bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-textPrimary">Moderation Queue</h2>
            <Link to="/moderation" className="text-xs font-medium text-primary-light">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {moderationQueue.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-lg border border-cardBorder bg-bgElevated p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge label={item.type} variant="info" />
                    <span className="text-xs text-textMuted">{item.createdAt}</span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-textPrimary">{item.title}</p>
                  <p className="truncate text-xs text-textSecondary">{item.reason}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    Approve
                  </Button>
                  <Button size="sm" variant="danger">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard preview */}
        <div className="rounded-xl2 border border-cardBorder bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-textPrimary">Leaderboard</h2>
            <Link to="/leaderboard" className="text-xs font-medium text-primary-light">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {leaderboard.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <span className="w-5 text-sm font-bold text-textMuted">#{u.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-textPrimary">{u.name}</p>
                  <p className="truncate text-xs text-textSecondary">{u.category}</p>
                </div>
                <span className="text-sm font-bold text-primary-light">{u.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Category health */}
        <div className="rounded-xl2 border border-cardBorder bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold text-textPrimary">Category Health</h2>
          <div className="space-y-4">
            {categoryHealth.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-textPrimary">{c.name}</span>
                  <span className="text-textSecondary">
                    {c.openCount} open · {c.solvedRate}% solved
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-bgElevated">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.solvedRate}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform load chart */}
        <div className="rounded-xl2 border border-cardBorder bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-textPrimary">Platform Load</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformLoadSeries}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#5C6178', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ background: '#161A26', border: '1px solid #22273A', borderRadius: 8 }}
                  labelStyle={{ color: '#F4F5F8' }}
                />
                <Bar dataKey="posts" fill="#6C5CE7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
