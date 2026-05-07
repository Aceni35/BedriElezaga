import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Controller, useFieldArray, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateNews, useUpdateNews } from '../../hooks/useNews';
import { uploadsService } from '../../services/uploads.service';
import { getApiErrorMessage } from '../../api/client';
import { Spinner } from '../../ui/Spinner';
import { Select } from '../../ui/Select';
import { DatePicker } from '../../ui/DatePicker';
import { FileDropZone } from '../../ui/FileDropZone';
import { newsFormSchema, type NewsFormValues } from '../schemas/news.schema';
import {
  NEWS_CATEGORIES,
  type AttachmentKind,
  type CreateNewsInput,
  type News,
  type NewsAttachmentInput,
  type UpdateNewsInput,
} from '../../types/news';
import { useI18n, interpolate, tError } from '../../i18n/I18nContext';

interface PendingAttachment {
  id: string;
  file: File;
  kind: AttachmentKind;
  previewUrl?: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  error?: string;
}

interface KeptAttachment {
  key: string;
  kind: AttachmentKind;
  url: string;
}

function detectKind(contentType: string): AttachmentKind | null {
  if (contentType.startsWith('image/')) return 'image';
  if (contentType.startsWith('video/')) return 'video';
  if (
    contentType === 'application/pdf' ||
    contentType === 'application/msword' ||
    contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) return 'document';
  return null;
}

const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

type NewsFormProps =
  | { mode: 'create'; initial?: undefined; onDone?: (article: News | null) => void }
  | { mode: 'edit'; initial: News; onDone?: (article: News | null) => void };

export function NewsForm(props: NewsFormProps) {
  const { mode, onDone } = props;
  const initial = mode === 'edit' ? props.initial : undefined;
  const navigate = useNavigate();
  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const { t } = useI18n();
  const fNews = t.admin.forms.news;
  const aCommon = t.admin.common;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema) as Resolver<NewsFormValues>,
    defaultValues: initial
      ? {
          title: initial.title,
          category: initial.category,
          publishedAt: initial.publishedAt,
          paragraphs: initial.body.length ? initial.body.map((text) => ({ text })) : [{ text: '' }],
        }
      : {
          title: '',
          category: 'Lajme',
          publishedAt: new Date().toISOString(),
          paragraphs: [{ text: '' }],
        },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'paragraphs' });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);

  const [keptAttachments, setKeptAttachments] = useState<KeptAttachment[]>(
    (initial?.attachments ?? []).map((a) => ({ key: a.key, kind: a.kind, url: a.url }))
  );
  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachment[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  useEffect(() => {
    return () => {
      pendingAttachments.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCoverFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setCoverError(fNews.coverMustBeImage);
      return;
    }
    setCoverError(null);
    setCoverFile(file);
  };

  const handleAttachmentFiles = (files: File[]) => {
    const next: PendingAttachment[] = [];
    for (const file of files) {
      const kind = detectKind(file.type);
      if (!kind) continue;
      const previewUrl = kind === 'image' ? URL.createObjectURL(file) : undefined;
      next.push({ id: crypto.randomUUID(), file, kind, previewUrl, status: 'pending' });
    }
    setPendingAttachments((curr) => [...curr, ...next]);
  };

  const removePending = (id: string) =>
    setPendingAttachments((curr) => {
      const target = curr.find((a) => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return curr.filter((a) => a.id !== id);
    });
  const removeKept = (key: string) =>
    setKeptAttachments((curr) => curr.filter((a) => a.key !== key));

  const setPendingStatus = (id: string, patch: Partial<PendingAttachment>) =>
    setPendingAttachments((curr) => curr.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const categoryOptions = useMemo(
    () => NEWS_CATEGORIES.map((c) => ({ value: c, label: t.news.categoryLabels[c] || c })),
    [t]
  );

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setCoverError(null);

    if (mode === 'create' && !coverFile) {
      setCoverError(fNews.coverRequired);
      return;
    }

    try {
      let coverKey: string | undefined;
      if (coverFile) {
        const cover = await uploadsService.uploadFile(coverFile);
        coverKey = cover.key;
      }

      const newlyUploaded: NewsAttachmentInput[] = [];
      for (const att of pendingAttachments) {
        setPendingStatus(att.id, { status: 'uploading' });
        try {
          const result = await uploadsService.uploadFile(att.file);
          newlyUploaded.push({ kind: att.kind, key: result.key });
          setPendingStatus(att.id, { status: 'uploaded' });
        } catch (err) {
          setPendingStatus(att.id, { status: 'error', error: getApiErrorMessage(err) });
          throw err;
        }
      }

      const allAttachments: NewsAttachmentInput[] = [
        ...keptAttachments.map((a) => ({ kind: a.kind, key: a.key })),
        ...newlyUploaded,
      ];

      const cleanedBody = values.paragraphs.map((p) => p.text.trim()).filter(Boolean);
      const isoPublishedAt = new Date(values.publishedAt).toISOString();

      if (mode === 'create') {
        const payload: CreateNewsInput = {
          title: values.title.trim(),
          body: cleanedBody,
          coverImageKey: coverKey as string,
          category: values.category,
          publishedAt: isoPublishedAt,
          attachments: allAttachments,
        };
        const created = await createNews.mutateAsync(payload);
        if (onDone) onDone(created);
        else navigate(`/news/${created.id}`);
      } else {
        const payload: UpdateNewsInput = {
          title: values.title.trim(),
          body: cleanedBody,
          category: values.category,
          publishedAt: isoPublishedAt,
          attachments: allAttachments,
        };
        if (coverKey) payload.coverImageKey = coverKey;
        const updated = await updateNews.mutateAsync({ id: initial!.id, input: payload });
        if (onDone) onDone(updated);
        else navigate('/admin/news');
      }
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  });

  const submitting = mode === 'create' ? createNews.isPending : updateNews.isPending;
  const submitLabel = mode === 'create' ? fNews.publish : aCommon.saveChanges;

  const currentCoverUrl = coverPreview ?? initial?.coverImage.url ?? null;
  const currentCoverName = coverFile?.name ?? (initial ? fNews.currentPhoto : null);
  const currentCoverSize = coverFile ? formatBytes(coverFile.size) : null;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label className={labelClass}>{fNews.titleField}</label>
        <input {...register('title')} className={inputClass} />
        {errors.title && <div className="mt-1 text-xs text-red-600">{tError(t, errors.title.message)}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{fNews.category}</label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => field.onChange(v)}
                options={categoryOptions}
                ariaLabel={fNews.category}
              />
            )}
          />
        </div>
        <div>
          <label className={labelClass}>{fNews.publishedAt}</label>
          <Controller
            control={control}
            name="publishedAt"
            render={({ field }) => (
              <DatePicker value={field.value} onChange={(iso) => field.onChange(iso)} />
            )}
          />
          {errors.publishedAt && (
            <div className="mt-1 text-xs text-red-600">{tError(t, errors.publishedAt.message)}</div>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>{fNews.cover}</label>
        {currentCoverUrl && (
          <div className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-line mb-3">
            <img src={currentCoverUrl} alt="" className="w-24 h-24 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentCoverName}</div>
              {currentCoverSize && <div className="text-xs text-ink-soft">{currentCoverSize}</div>}
              {!coverFile && initial && (
                <div className="text-xs text-ink-soft mt-0.5">
                  {fNews.replaceHint}
                </div>
              )}
            </div>
            {coverFile && (
              <button
                type="button"
                onClick={() => setCoverFile(null)}
                className="text-xs text-ink-soft hover:text-red-600 shrink-0"
              >
                {aCommon.remove}
              </button>
            )}
          </div>
        )}
        <FileDropZone
          accept="image/*"
          onFiles={handleCoverFiles}
          icon={<ImageIcon />}
          title={currentCoverUrl ? fNews.replaceCover : fNews.uploadCover}
          hint={fNews.coverHint}
        />
        {coverError && <div className="mt-1 text-xs text-red-600">{coverError}</div>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelClass + ' mb-0'}>{fNews.content}</label>
          <button
            type="button"
            onClick={() => append({ text: '' })}
            className="text-xs text-primary font-medium"
          >
            {fNews.addParagraph}
          </button>
        </div>
        <div className="space-y-3">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2">
              <textarea
                {...register(`paragraphs.${idx}.text` as const)}
                rows={3}
                className={inputClass + ' resize-y'}
                placeholder={interpolate(fNews.paragraphPlaceholder, { n: idx + 1 })}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="px-3 text-xs text-ink-soft hover:text-red-600"
                >
                  {aCommon.remove}
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.paragraphs && (
          <div className="mt-1 text-xs text-red-600">
            {tError(t, (errors.paragraphs.root?.message ?? errors.paragraphs.message) as string)}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>{fNews.attachments}</label>
        <FileDropZone
          accept="image/*,video/*,application/pdf,.doc,.docx"
          multiple
          onFiles={handleAttachmentFiles}
          icon={<PaperclipIcon />}
          title={fNews.attachmentsClickOrDrag}
          hint={fNews.attachmentsHint}
        />
        {(keptAttachments.length > 0 || pendingAttachments.length > 0) && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {keptAttachments.map((a) => (
              <AttachmentCard
                key={a.key}
                kind={a.kind}
                title={a.key.split('/').pop() ?? a.key}
                subtitle={fNews.existing}
                previewUrl={a.kind === 'image' ? a.url : undefined}
                onRemove={() => removeKept(a.key)}
                removeLabel={aCommon.remove}
              />
            ))}
            {pendingAttachments.map((a) => (
              <AttachmentCard
                key={a.id}
                kind={a.kind}
                title={a.file.name}
                subtitle={
                  a.status === 'uploading' ? fNews.uploading :
                  a.status === 'uploaded' ? fNews.uploaded :
                  a.status === 'error' ? interpolate(fNews.errorPrefix, { msg: a.error ?? '' }) :
                  formatBytes(a.file.size)
                }
                previewUrl={a.previewUrl}
                statusIcon={
                  a.status === 'uploading' ? <Spinner size={12} /> :
                  a.status === 'uploaded' ? <CheckIcon /> :
                  a.status === 'error' ? <ErrorDot /> :
                  null
                }
                onRemove={() => removePending(a.id)}
                removeLabel={aCommon.remove}
              />
            ))}
          </div>
        )}
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
          onClick={() =>
            onDone ? onDone(null) : navigate(mode === 'edit' ? '/admin/news' : '/admin')
          }
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-surface transition-colors"
        >
          {aCommon.cancel}
        </button>
      </div>
    </form>
  );
}

interface AttachmentCardProps {
  kind: AttachmentKind;
  title: string;
  subtitle: string;
  previewUrl?: string;
  statusIcon?: ReactNode;
  onRemove: () => void;
  removeLabel: string;
}

function AttachmentCard({ kind, title, subtitle, previewUrl, statusIcon, onRemove, removeLabel }: AttachmentCardProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface border border-line text-sm">
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg flex items-center justify-center shrink-0 text-ink-soft">
        {previewUrl ? (
          <img src={previewUrl} alt="" className="w-full h-full object-cover" />
        ) : kind === 'video' ? (
          <VideoIcon />
        ) : (
          <DocumentIcon />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-ink">{title}</div>
        <div className="text-xs text-ink-soft flex items-center gap-1.5">
          {statusIcon && <span className="inline-flex items-center text-primary">{statusIcon}</span>}
          <span className="truncate">{subtitle}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs text-ink-soft hover:text-red-600 shrink-0"
      >
        {removeLabel}
      </button>
    </div>
  );
}

function ImageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ErrorDot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-red-500" />;
}
