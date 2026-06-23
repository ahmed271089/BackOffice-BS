import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { users as initialUsers, UserStatus } from '../data/mockData';

const STATUS_VARIANT: Record<UserStatus, 'success' | 'warning' | 'danger'> = {
  ACTIVE: 'success',
  SUSPENDED: 'warning',
  BANNED: 'danger',
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()),
  );

  const updateStatus = (id: string, status: UserStatus) => {
    // TODO: call PATCH /api/users/:id/suspend or /ban or /verify
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">User Management</h1>
          <p className="mt-1 text-sm text-textSecondary">{filtered.length} users</p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email…"
          className="h-10 w-full rounded-lg border border-cardBorder bg-card px-3 text-sm text-textPrimary placeholder:text-textMuted focus:border-primary focus:outline-none sm:w-64"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl2 border border-cardBorder bg-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cardBorder text-left text-xs uppercase text-textMuted">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Reputation</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-cardBorder last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-textPrimary">{u.name}</span>
                    {u.isVerified && <ShieldCheck size={14} className="text-success" />}
                  </div>
                  <p className="text-xs text-textMuted">{u.email}</p>
                </td>
                <td className="px-5 py-3">
                  <Badge label={u.status} variant={STATUS_VARIANT[u.status]} />
                </td>
                <td className="px-5 py-3 text-textSecondary">{u.reputation.toLocaleString()}</td>
                <td className="px-5 py-3 text-textSecondary">{u.joined}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {u.status !== 'SUSPENDED' && (
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(u.id, 'SUSPENDED')}>
                        Suspend
                      </Button>
                    )}
                    {u.status !== 'BANNED' && (
                      <Button size="sm" variant="danger" onClick={() => updateStatus(u.id, 'BANNED')}>
                        Ban
                      </Button>
                    )}
                    {u.status !== 'ACTIVE' && (
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(u.id, 'ACTIVE')}>
                        Reactivate
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((u) => (
          <div key={u.id} className="rounded-xl2 border border-cardBorder bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-textPrimary">{u.name}</span>
                {u.isVerified && <ShieldCheck size={14} className="text-success" />}
              </div>
              <Badge label={u.status} variant={STATUS_VARIANT[u.status]} />
            </div>
            <p className="mt-1 text-xs text-textMuted">{u.email}</p>
            <div className="mt-2 flex justify-between text-xs text-textSecondary">
              <span>{u.reputation.toLocaleString()} reputation</span>
              <span>Joined {u.joined}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {u.status !== 'SUSPENDED' && (
                <Button size="sm" variant="secondary" onClick={() => updateStatus(u.id, 'SUSPENDED')}>
                  Suspend
                </Button>
              )}
              {u.status !== 'BANNED' && (
                <Button size="sm" variant="danger" onClick={() => updateStatus(u.id, 'BANNED')}>
                  Ban
                </Button>
              )}
              {u.status !== 'ACTIVE' && (
                <Button size="sm" variant="secondary" onClick={() => updateStatus(u.id, 'ACTIVE')}>
                  Reactivate
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
