import { useEffect, useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { listPendingReports, updateReportStatus, ReportItem } from '../api/reports';

export default function ModerationPage() {
  const [queue, setQueue] = useState<ReportItem[]>([]);

  const load = () => listPendingReports().then(setQueue).catch(console.error);

  useEffect(() => { load(); }, []);

  const resolve = async (id: string, status: 'DISMISSED' | 'ACTION_TAKEN') => {
    await updateReportStatus(id, status);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">Moderation Queue</h1>
        <p className="mt-1 text-sm text-textSecondary">{queue.length} item{queue.length !== 1 ? 's' : ''} waiting for review.</p>
      </div>

      {queue.length === 0 ? (
        <div className="rounded-xl2 border border-cardBorder bg-card p-10 text-center">
          <p className="text-sm text-textSecondary">Queue is clear. Nothing needs review right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-xl2 border border-cardBorder bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge label={item.type} variant="info" />
                  <span className="text-xs text-textMuted">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-semibold text-textPrimary">{item.title}</p>
                <p className="mt-1 text-sm text-textSecondary">{item.reason}</p>
                <p className="mt-2 text-xs text-textMuted">
                  Reported by <span className="text-textSecondary">{item.reportedBy}</span> · Submitted by{' '}
                  <span className="text-textSecondary">{item.submittedBy}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => resolve(item.id, 'DISMISSED')}>Dismiss</Button>
                <Button variant="danger" onClick={() => resolve(item.id, 'ACTION_TAKEN')}>Remove content</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
