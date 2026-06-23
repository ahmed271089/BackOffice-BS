import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call POST /api/auth/login, then verify role === 'ADMIN' before granting access
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl2 border border-cardBorder bg-card p-8">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            BS
          </div>
          <span className="text-sm font-bold text-textPrimary">Best Solving Admin</span>
        </div>

        <h1 className="text-xl font-bold text-textPrimary">Sign in</h1>
        <p className="mt-1 text-sm text-textSecondary">Admin and moderator access only.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-textSecondary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bestsolving.app"
              className="h-11 w-full rounded-lg border border-cardBorder bg-bgElevated px-3 text-sm text-textPrimary placeholder:text-textMuted focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-textSecondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 w-full rounded-lg border border-cardBorder bg-bgElevated px-3 text-sm text-textPrimary placeholder:text-textMuted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
