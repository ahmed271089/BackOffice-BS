import { useEffect, useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { listPendingReports, listHistoryReports, updateReportStatus, getReportDetails, ReportItem, ReportDetails } from '../api/reports';
import { deletePost, deleteComment, suspendUser, banUser } from '../api/admin';

export default function ModerationPage() {
  const [tab, setTab] = useState<'PENDING' | 'HISTORY'>('PENDING');
  const [queue, setQueue] = useState<ReportItem[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<ReportDetails | null>(null);

  const load = () => {
    const fetcher = tab === 'PENDING' ? listPendingReports : listHistoryReports;
    fetcher().then(setQueue).catch(console.error);
  };

  useEffect(() => { load(); }, [tab]);

  const resolve = async (id: string, status: 'DISMISSED' | 'ACTION_TAKEN') => {
    await updateReportStatus(id, status);
    if (selectedReportId === id) setSelectedReportId(null);
    alert(`Report ${status.toLowerCase()} successfully.`);
    load();
  };

  const handleReview = async (id: string) => {
    setSelectedReportId(id);
    setSelectedDetails(null);
    try {
      const { data } = await getReportDetails(id);
      setSelectedDetails(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load report details');
      setSelectedReportId(null);
    }
  };

  const performAction = async (item: ReportItem, action: string) => {
    try {
      if (action === 'DELETE') {
        if (item.type === 'POST') await deletePost(item.targetId);
        else if (item.type === 'COMMENT') await deleteComment(item.targetId);
      } else if (action === 'SUSPEND') {
        await suspendUser(item.targetAuthorId);
      } else if (action === 'BAN') {
        await banUser(item.targetAuthorId);
      }
      
      alert(`Action ${action} executed successfully!`);
      // Auto-resolve report as action taken
      await updateReportStatus(item.id, 'ACTION_TAKEN');
      if (selectedReportId === item.id) setSelectedReportId(null);
      load();
    } catch (err) {
      console.error(err);
      alert('Failed to perform action');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Moderation</h1>
          <p className="mt-1 text-sm text-textSecondary">{queue.length} item{queue.length !== 1 ? 's' : ''} in {tab.toLowerCase()} queue.</p>
        </div>
        <div className="flex bg-surface rounded-lg p-1 border border-cardBorder">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === 'PENDING' ? 'bg-primary text-white shadow' : 'text-textSecondary hover:text-textPrimary'}`}
            onClick={() => setTab('PENDING')}
          >
            Pending Review
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === 'HISTORY' ? 'bg-primary text-white shadow' : 'text-textSecondary hover:text-textPrimary'}`}
            onClick={() => setTab('HISTORY')}
          >
            History
          </button>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="rounded-xl2 border border-cardBorder bg-card p-10 text-center">
          <p className="text-sm text-textSecondary">Queue is clear.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-xl2 border border-cardBorder bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge label={item.type} variant="neutral" />
                  <Badge 
                    label={item.status} 
                    variant={item.status === 'PENDING' ? 'warning' : item.status === 'DISMISSED' ? 'success' : 'danger'} 
                  />
                  <span className="text-xs text-textMuted">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface text-textSecondary border border-cardBorder">
                    Report ID: {item.id.slice(0, 8)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-textPrimary">Target: {item.title}</p>
                <p className="mt-1 text-sm text-textSecondary"><span className="font-medium text-textPrimary">Summary:</span> {item.reason}</p>
                <p className="mt-2 text-xs text-textMuted">
                  Reported by <span className="text-textSecondary">{item.reportedBy}</span> · Submitted by{' '}
                  <span className="text-textSecondary">{item.submittedBy}</span>
                </p>
                {item.audit && item.status !== 'PENDING' && (
                  <div className="mt-3 bg-surface border border-cardBorder p-2 rounded-lg text-xs">
                    <span className="font-semibold text-textPrimary">Action Result: </span>
                    <span className="text-textSecondary">{item.audit.action}</span> 
                    <span className="text-textMuted mx-2">•</span>
                    <span className="font-semibold text-textPrimary">By: </span>
                    <span className="text-textSecondary">{item.audit.actorName}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="primary" onClick={() => handleReview(item.id)}>Review</Button>
                {tab === 'PENDING' && (
                  <>
                    <Button variant="secondary" onClick={() => resolve(item.id, 'DISMISSED')}>Dismiss</Button>
                    <Button variant="danger" onClick={() => resolve(item.id, 'ACTION_TAKEN')}>Hide Content</Button>
                    <select 
                      className="bg-surface p-2 text-sm text-textPrimary rounded-lg border border-cardBorder outline-none"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (action) performAction(item, action);
                        e.target.value = "";
                      }}
                    >
                      <option value="">More Actions...</option>
                      {item.type !== 'USER' && <option value="DELETE">Delete Content</option>}
                      <option value="SUSPEND">Suspend User</option>
                      <option value="BAN">Ban User</option>
                    </select>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReportId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-cardBorder shadow-2xl p-6">
            {!selectedDetails ? (
              <p className="text-textSecondary text-center py-10">Loading details...</p>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-textPrimary">Review Report</h2>
                    <p className="text-sm text-textSecondary mt-1">
                      Reason: <span className="font-medium text-textPrimary">{selectedDetails.reason}</span>
                    </p>
                    {selectedDetails.details && (
                      <p className="text-sm text-textSecondary mt-1">
                        Details: <span className="italic">{selectedDetails.details}</span>
                      </p>
                    )}
                  </div>
                  <Badge label={selectedDetails.type} variant="info" />
                </div>
                
                <div className="rounded-xl border border-cardBorder bg-surface p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-textMuted uppercase tracking-wider">Reported Content</h3>
                  
                  {selectedDetails.type === 'POST' && selectedDetails.targetContent && (
                    <div className="space-y-2">
                      <p className="font-bold text-lg text-textPrimary">{selectedDetails.targetContent.title}</p>
                      <p className="text-textSecondary whitespace-pre-wrap">{selectedDetails.targetContent.description}</p>
                      {selectedDetails.targetContent.attachments?.length > 0 && (
                        <div className="flex gap-2 mt-2 overflow-x-auto">
                          {selectedDetails.targetContent.attachments.map((att: any) => (
                            <img key={att.id} src={att.url} alt="Attachment" className="h-32 w-32 object-cover rounded-lg border border-cardBorder" />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedDetails.type === 'COMMENT' && selectedDetails.targetContent && (
                    <div className="space-y-2">
                      <p className="text-sm text-textMuted">On post: {selectedDetails.targetContent.post?.title}</p>
                      <div className="bg-card p-3 rounded-lg border border-cardBorder">
                        <p className="text-textPrimary whitespace-pre-wrap">{selectedDetails.targetContent.content}</p>
                      </div>
                    </div>
                  )}

                  {selectedDetails.type === 'USER' && selectedDetails.targetContent && (
                    <div className="flex items-center gap-4">
                      {selectedDetails.targetContent.avatarUrl ? (
                        <img src={selectedDetails.targetContent.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full bg-surface" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-surface border border-cardBorder flex items-center justify-center text-textMuted">N/A</div>
                      )}
                      <div>
                        <p className="font-bold text-textPrimary">{selectedDetails.targetContent.name}</p>
                        <p className="text-sm text-textSecondary">{selectedDetails.targetContent.email}</p>
                        <p className="text-sm text-textMuted mt-1">{selectedDetails.targetContent.bio || 'No bio provided.'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-cardBorder pt-4 mt-6">
                  {tab === 'PENDING' && (
                    <select 
                      className="bg-surface p-2 text-sm text-textPrimary rounded-lg border border-cardBorder outline-none"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (action) {
                          const item = queue.find(q => q.id === selectedReportId);
                          if (item) performAction(item, action);
                        }
                        e.target.value = "";
                      }}
                    >
                      <option value="">More Actions...</option>
                      {selectedDetails.type !== 'USER' && <option value="DELETE">Delete Content</option>}
                      <option value="SUSPEND">Suspend User</option>
                      <option value="BAN">Ban User</option>
                    </select>
                  )}
                  <Button variant="secondary" onClick={() => setSelectedReportId(null)}>Close</Button>
                  {tab === 'PENDING' && (
                    <Button variant="danger" onClick={() => resolve(selectedReportId, 'ACTION_TAKEN')}>Hide Content</Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
