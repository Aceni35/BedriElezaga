import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useChangePassword } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../api/client';
import { Spinner } from '../../ui/Spinner';
import { useI18n, tError } from '../../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const schema = z
  .object({
    currentPassword: z.string().min(1, 'errors.required'),
    newPassword: z
      .string()
      .min(8, 'errors.min8')
      .regex(/[A-Z]/, 'errors.uppercase')
      .regex(/[a-z]/, 'errors.lowercase')
      .regex(/[0-9]/, 'errors.digit')
      .regex(/[^A-Za-z0-9]/, 'errors.special'),
    confirmPassword: z.string().min(1, 'errors.required'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'errors.passwordsDontMatch',
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    path: ['newPassword'],
    message: 'errors.newPasswordSameAsOld',
  });

type FormValues = z.infer<typeof schema>;

export function ChangePasswordSection() {
  const changePassword = useChangePassword();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useI18n();
  const s = t.admin.settings;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await changePassword.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      reset();
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  });

  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-base font-semibold mb-1">{s.passwordHeading}</h2>
      <p className="text-sm text-ink-soft mb-4">{s.passwordSubtitle}</p>

      <form onSubmit={onSubmit} className="space-y-4 max-w-md" noValidate>
        <div>
          <label className={labelClass}>{s.currentPassword}</label>
          <input
            type="password"
            autoComplete="current-password"
            {...register('currentPassword')}
            className={inputClass}
          />
          {errors.currentPassword && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.currentPassword.message)}</div>
          )}
        </div>

        <div>
          <label className={labelClass}>{s.newPassword}</label>
          <input
            type="password"
            autoComplete="new-password"
            {...register('newPassword')}
            className={inputClass}
          />
          {errors.newPassword && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.newPassword.message)}</div>
          )}
        </div>

        <div>
          <label className={labelClass}>{s.confirmPassword}</label>
          <input
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={inputClass}
          />
          {errors.confirmPassword && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.confirmPassword.message)}</div>
          )}
        </div>

        {submitError && (
          <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
            {submitError}
          </div>
        )}

        <div className="pt-1">
          <button
            type="submit"
            disabled={changePassword.isPending}
            className="inline-flex items-center justify-center gap-2 min-w-32 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 transition-colors"
          >
            {changePassword.isPending ? <Spinner size={16} /> : s.changeBtn}
          </button>
        </div>
      </form>
    </section>
  );
}
