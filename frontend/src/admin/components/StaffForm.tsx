import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateStaff, useUpdateStaff } from '../../hooks/useStaff';
import { uploadsService } from '../../services/uploads.service';
import { getApiErrorMessage } from '../../api/client';
import { Spinner } from '../../ui/Spinner';
import { Select } from '../../ui/Select';
import { FileDropZone } from '../../ui/FileDropZone';
import { staffFormSchema, type StaffFormValues } from '../schemas/staff.schema';
import {
  STAFF_CATEGORIES,
  type CreateStaffInput,
  type Staff,
  type UpdateStaffInput,
} from '../../types/staff';
import { useI18n, tError } from '../../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

type StaffFormProps =
  | { mode: 'create'; initial?: undefined; onDone?: (member: Staff | null) => void }
  | { mode: 'edit'; initial: Staff; onDone?: (member: Staff | null) => void };

export function StaffForm(props: StaffFormProps) {
  const { mode, onDone } = props;
  const initial = mode === 'edit' ? props.initial : undefined;
  const navigate = useNavigate();
  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();
  const { t } = useI18n();
  const fStaff = t.admin.forms.staff;
  const aCommon = t.admin.common;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema) as Resolver<StaffFormValues>,
    defaultValues: initial
      ? {
          fullName: initial.fullName,
          category: initial.category,
          position: initial.position,
          description: initial.description ?? '',
          memberSince: initial.memberSince,
          email: initial.email ?? '',
          phone: initial.phone ?? '',
        }
      : {
          fullName: '',
          category: 'teachers',
          position: '',
          description: '',
          memberSince: new Date().getFullYear(),
          email: '',
          phone: '',
        },
  });

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [pictureError, setPictureError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!pictureFile) {
      setPicturePreview(null);
      return;
    }
    const url = URL.createObjectURL(pictureFile);
    setPicturePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pictureFile]);

  const handlePictureFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPictureError(fStaff.photoMustBeImage);
      return;
    }
    setPictureError(null);
    setPictureFile(file);
  };

  const categoryOptions = useMemo(
    () => STAFF_CATEGORIES.map((c) => ({ value: c, label: t.staff.categories[c] || c })),
    [t]
  );

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setPictureError(null);

    if (mode === 'create' && !pictureFile) {
      setPictureError(fStaff.photoRequired);
      return;
    }

    try {
      let pictureKey: string | undefined;
      if (pictureFile) {
        const uploaded = await uploadsService.uploadFile(pictureFile);
        pictureKey = uploaded.key;
      }

      const trimmedDescription = values.description?.trim() || undefined;
      const trimmedEmail = values.email?.trim() || undefined;
      const trimmedPhone = values.phone?.trim() || undefined;

      if (mode === 'create') {
        const payload: CreateStaffInput = {
          fullName: values.fullName.trim(),
          category: values.category,
          position: values.position.trim(),
          description: trimmedDescription,
          memberSince: values.memberSince,
          email: trimmedEmail,
          phone: trimmedPhone,
          pictureKey: pictureKey as string,
        };
        const created = await createStaff.mutateAsync(payload);
        if (onDone) onDone(created);
        else navigate('/admin/staff');
      } else {
        const payload: UpdateStaffInput = {
          fullName: values.fullName.trim(),
          category: values.category,
          position: values.position.trim(),
          description: trimmedDescription,
          memberSince: values.memberSince,
          email: trimmedEmail,
          phone: trimmedPhone,
        };
        if (pictureKey) payload.pictureKey = pictureKey;
        const updated = await updateStaff.mutateAsync({ id: initial!.id, input: payload });
        if (onDone) onDone(updated);
        else navigate('/admin/staff');
      }
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  });

  const submitting = mode === 'create' ? createStaff.isPending : updateStaff.isPending;
  const submitLabel = mode === 'create' ? aCommon.add : aCommon.saveChanges;

  const currentPictureUrl = picturePreview ?? initial?.picture?.url ?? null;
  const currentPictureName = pictureFile?.name ?? (initial ? t.admin.forms.news.currentPhoto : null);
  const currentPictureSize = pictureFile ? formatBytes(pictureFile.size) : null;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{fStaff.fullName}</label>
          <input {...register('fullName')} className={inputClass} />
          {errors.fullName && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.fullName.message)}</div>
          )}
        </div>
        <div>
          <label className={labelClass}>{fStaff.position}</label>
          <input {...register('position')} className={inputClass} />
          {errors.position && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.position.message)}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{fStaff.category}</label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => field.onChange(v)}
                options={categoryOptions}
                ariaLabel={fStaff.category}
              />
            )}
          />
        </div>
        <div>
          <label className={labelClass}>{fStaff.memberSinceLabel}</label>
          <input
            type="number"
            min={1900}
            max={new Date().getFullYear()}
            {...register('memberSince', { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.memberSince && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.memberSince.message)}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{fStaff.emailOpt}</label>
          <input type="email" {...register('email')} className={inputClass} />
          {errors.email && <div className="mt-1 text-xs text-red-600">{tError(t, errors.email.message)}</div>}
        </div>
        <div>
          <label className={labelClass}>{fStaff.phoneOpt}</label>
          <input type="tel" {...register('phone')} className={inputClass} />
          {errors.phone && <div className="mt-1 text-xs text-red-600">{tError(t, errors.phone.message)}</div>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{fStaff.descriptionOpt}</label>
        <textarea {...register('description')} rows={4} className={inputClass + ' resize-y'} />
        {errors.description && (
          <div className="mt-1 text-xs text-red-600">{tError(t, errors.description.message)}</div>
        )}
      </div>

      <div>
        <label className={labelClass}>{fStaff.photo}</label>
        {currentPictureUrl && (
          <div className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-line mb-3">
            <img
              src={currentPictureUrl}
              alt=""
              className="w-24 h-24 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentPictureName}</div>
              {currentPictureSize && (
                <div className="text-xs text-ink-soft">{currentPictureSize}</div>
              )}
              {!pictureFile && initial && (
                <div className="text-xs text-ink-soft mt-0.5">
                  {t.admin.forms.news.replaceHint}
                </div>
              )}
            </div>
            {pictureFile && (
              <button
                type="button"
                onClick={() => setPictureFile(null)}
                className="text-xs text-ink-soft hover:text-red-600 shrink-0"
              >
                {aCommon.remove}
              </button>
            )}
          </div>
        )}
        <FileDropZone
          accept="image/*"
          onFiles={handlePictureFiles}
          icon={<PortraitIcon />}
          title={currentPictureUrl ? fStaff.replacePhoto : fStaff.uploadPhoto}
          hint={fStaff.photoHint}
        />
        {pictureError && <div className="mt-1 text-xs text-red-600">{pictureError}</div>}
      </div>

      {submitError && (
        <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
          {submitError}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 min-w-32 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 transition-colors"
        >
          {submitting ? <Spinner size={16} /> : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => (onDone ? onDone(null) : navigate('/admin/staff'))}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-surface transition-colors"
        >
          {aCommon.cancel}
        </button>
      </div>
    </form>
  );
}

function PortraitIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}
