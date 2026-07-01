import { api } from './client';

export interface ReportItem {
  id: string;
  type: string;
  title: string;
  reason: string;
  status: string;
  reportedBy: string;
  submittedBy: string;
  createdAt: string;
}

export function listPendingReports() {
  return api.get<ReportItem[]>('/admin/reports');
}

export function updateReportStatus(id: string, status: 'DISMISSED' | 'ACTION_TAKEN') {
  return api.patch(`/admin/reports/${id}`, { status });
}
