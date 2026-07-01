import { api, saveTokens } from './client';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string | null;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  reputationPoints: number;
  isVerified: boolean;
  createdAt: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const tokens = await api.post<AuthResponse>('/auth/login', { email, password }, { skipAuth: true });
  saveTokens(tokens.accessToken, tokens.refreshToken);
  return tokens;
}

export function getMe() {
  return api.get<AdminUser & { role: string }>('/users/me');
}
