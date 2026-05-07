import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useLogin } from '../hooks/useAuth';
import { getApiErrorMessage } from '../api/client';
import { loginSchema, type LoginFormValues } from './schemas/auth.schema';
import { Spinner } from '../ui/Spinner';
import { useI18n, tError } from '../i18n/I18nContext';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const from = (location.state as { from?: string } | null)?.from || '/admin';

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: () => navigate(from, { replace: true }),
    });
  });

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative">
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[380px] bg-surface border border-line rounded-2xl p-7 shadow-sm"
      >
        <div className="mb-6">
          <div className="font-display text-xl font-semibold">{t.admin.login.title}</div>
          <div className="text-sm text-ink-soft mt-1">{t.admin.login.subtitle}</div>
        </div>

        <div className="mb-4">
          <div className="text-xs font-medium text-ink-soft mb-1.5">{t.admin.login.email}</div>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm"
          />
          {errors.email && <div className="mt-1 text-xs text-red-600">{tError(t, errors.email.message)}</div>}
        </div>

        <div className="mb-5">
          <div className="text-xs font-medium text-ink-soft mb-1.5">{t.admin.login.password}</div>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm"
          />
          {errors.password && <div className="mt-1 text-xs text-red-600">{tError(t, errors.password.message)}</div>}
        </div>

        {login.isError && (
          <div className="mb-4 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
            {getApiErrorMessage(login.error)}
          </div>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 transition-colors"
        >
          {login.isPending ? <Spinner size={16} /> : t.admin.login.submit}
        </button>
      </form>
    </div>
  );
}
