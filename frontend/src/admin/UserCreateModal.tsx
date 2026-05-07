import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Spinner } from '../ui/Spinner';
import { useCreateUser } from '../hooks/useUsers';
import { getApiErrorMessage } from '../api/client';
import type { UserRole } from '../types/users';
import { useI18n, tError } from '../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const formSchema = z.object({
  firstName: z.string().min(2, 'errors.min2').max(50).trim(),
  lastName: z.string().min(2, 'errors.min2').max(50).trim(),
  email: z.string().email('errors.invalidEmail').toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'errors.min8')
    .regex(/[A-Z]/, 'errors.uppercase')
    .regex(/[a-z]/, 'errors.lowercase')
    .regex(/[0-9]/, 'errors.digit')
    .regex(/[^A-Za-z0-9]/, 'errors.special'),
  role: z.enum(['regular', 'admin']),
});

type FormValues = z.infer<typeof formSchema>;

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserCreateModal({ isOpen, onClose }: UserCreateModalProps) {
  const createUser = useCreateUser();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useI18n();
  const u = t.admin.users;

  const roleOptions: { value: UserRole; label: string }[] = [
    { value: 'regular', label: u.roleRegularLong },
    { value: 'admin',   label: u.roleAdminLong },
  ];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'regular',
    },
  });

  const handleClose = () => {
    reset();
    setSubmitError(null);
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await createUser.mutateAsync({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
        role: values.role,
      });
      handleClose();
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={u.createTitle} maxWidth="560px">
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{u.firstName}</label>
            <input {...register('firstName')} className={inputClass} />
            {errors.firstName && (
              <div className="mt-1 text-xs text-red-600">{tError(t, errors.firstName.message)}</div>
            )}
          </div>
          <div>
            <label className={labelClass}>{u.lastName}</label>
            <input {...register('lastName')} className={inputClass} />
            {errors.lastName && (
              <div className="mt-1 text-xs text-red-600">{tError(t, errors.lastName.message)}</div>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>{u.email}</label>
          <input type="email" {...register('email')} className={inputClass} />
          {errors.email && <div className="mt-1 text-xs text-red-600">{tError(t, errors.email.message)}</div>}
        </div>

        <div>
          <label className={labelClass}>{u.password}</label>
          <input type="password" {...register('password')} className={inputClass} />
          {errors.password && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.password.message)}</div>
          )}
        </div>

        <div>
          <label className={labelClass}>{u.roleAriaLabel}</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => field.onChange(v as UserRole)}
                options={roleOptions}
                ariaLabel={u.roleAriaLabel}
              />
            )}
          />
        </div>

        {submitError && (
          <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={createUser.isPending}
            className="inline-flex items-center justify-center gap-2 min-w-32 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 transition-colors"
          >
            {createUser.isPending ? <Spinner size={16} /> : t.admin.common.add}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-surface transition-colors"
          >
            {t.admin.common.cancel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
