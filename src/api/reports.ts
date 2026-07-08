import { api } from './client';

export interface ReportItem {
  id: string;
  type: string;
  targetId: string;
  targetAuthorId: string;
  title: string;
  reason: string;
  status: string;
  reportedBy: string;
  submittedBy: string;
  createdAt: string;
  audit?: { action: string; actorName: string } | null;
}

export function listPendingReports() {
  return api.get<ReportItem[]>('/admin/reports');
}

export function listHistoryReports() {
  return api.get<ReportItem[]>('/admin/reports/history');
}

export function updateReportStatus(id: string, status: 'DISMISSED' | 'ACTION_TAKEN') {
  return api.patch(`/admin/reports/${id}`, { status });
}

export interface ReportDetails extends ReportItem {
  targetContent: any;
}

export function getReportDetails(id: string) {
  return api.get<ReportDetails>(`/admin/reports/${id}`);
}
