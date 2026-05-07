import { useMemo, useState } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateDocument, useUpdateDocument } from '../../hooks/useDocuments';
import { uploadsService } from '../../services/uploads.service';
import { getApiErrorMessage } from '../../api/client';
import { Spinner } from '../../ui/Spinner';
import { Select } from '../../ui/Select';
import { FileDropZone } from '../../ui/FileDropZone';
import { documentFormSchema, type DocumentFormValues } from '../schemas/documents.schema';
import {
  DOCUMENT_CATEGORIES,
  type CreateDocumentInput,
  type DocumentItem,
  type UpdateDocumentInput,
} from '../../types/documents';
import { useI18n, tError } from '../../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const ALLOWED_DOC_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function stripExtension(filename: string): string {
  const idx = filename.lastIndexOf('.');
  return idx > 0 ? filename.slice(0, idx) : filename;
}

type DocumentsFormProps =
  | { mode: 'create'; initial?: undefined; onDone?: (doc: DocumentItem | null) => void }
  | { mode: 'edit'; initial: DocumentItem; onDone?: (doc: DocumentItem | null) => void };

export function DocumentsForm(props: DocumentsFormProps) {
  const { mode, onDone } = props;
  const initial = mode === 'edit' ? props.initial : undefined;
  const navigate = useNavigate();
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();
  const { t } = useI18n();
  const fDoc = t.admin.forms.documents;
  const aCommon = t.admin.common;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema) as Resolver<DocumentFormValues>,
    defaultValues: initial
      ? { name: initial.name, category: initial.category }
      : { name: '', category: 'form' },
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (!ALLOWED_DOC_TYPES.has(f.type)) {
      setFileError(fDoc.onlyAllowed);
      return;
    }
    setFileError(null);
    setFile(f);
    if (mode === 'create') {
      setValue('name', stripExtension(f.name), { shouldValidate: true, shouldDirty: true });
    }
  };

  const categoryOptions = useMemo(
    () => DOCUMENT_CATEGORIES.map((c) => ({ value: c, label: t.documents.categoryLabels[c] || c })),
    [t]
  );

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setFileError(null);

    if (mode === 'create' && !file) {
      setFileError(fDoc.fileRequired);
      return;
    }

    try {
      let uploadedKey: string | undefined;
      let uploadedContentType: string | undefined;
      let uploadedSize: number | undefined;
      if (file) {
        const uploaded = await uploadsService.uploadFile(file);
        uploadedKey = uploaded.key;
        uploadedContentType = uploaded.contentType;
        uploadedSize = file.size;
      }

      if (mode === 'create') {
        const payload: CreateDocumentInput = {
          name: values.name.trim(),
          category: values.category,
          fileKey: uploadedKey as string,
          contentType: uploadedContentType as string,
          size: uploadedSize as number,
        };
        const created = await createDocument.mutateAsync(payload);
        if (onDone) onDone(created);
        else navigate('/admin/documents');
      } else {
        const payload: UpdateDocumentInput = {
          name: values.name.trim(),
          category: values.category,
        };
        if (uploadedKey) {
          payload.fileKey = uploadedKey;
          payload.contentType = uploadedContentType;
          payload.size = uploadedSize;
        }
        const updated = await updateDocument.mutateAsync({ id: initial!.id, input: payload });
        if (onDone) onDone(updated);
        else navigate('/admin/documents');
      }
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  });

  const submitting = mode === 'create' ? createDocument.isPending : updateDocument.isPending;
  const submitLabel = mode === 'create' ? aCommon.add : aCommon.saveChanges;

  const currentName = file?.name ?? (initial ? initial.file.key.split('/').pop() ?? t.admin.settings.currentFile : null);
  const currentSize = file ? formatBytes(file.size) : initial ? formatBytes(initial.size) : null;
  const showFileCard = !!file || !!initial;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label className={labelClass}>{fDoc.nameField}</label>
        <input {...register('name')} className={inputClass} />
        {errors.name && <div className="mt-1 text-xs text-red-600">{tError(t, errors.name.message)}</div>}
      </div>

      <div>
        <label className={labelClass}>{fDoc.category}</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
              options={categoryOptions}
              ariaLabel={fDoc.category}
            />
          )}
        />
      </div>

      <div>
        <label className={labelClass}>{fDoc.file}</label>
        {showFileCard && (
          <div className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-line mb-3">
            <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center shrink-0 text-ink-soft">
              <DocumentIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentName}</div>
              {currentSize && <div className="text-xs text-ink-soft">{currentSize}</div>}
              {!file && initial && (
                <div className="text-xs text-ink-soft mt-0.5">
                  {t.admin.forms.news.replaceHint}
                </div>
              )}
            </div>
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-xs text-ink-soft hover:text-red-600 shrink-0"
              >
                {aCommon.remove}
              </button>
            )}
          </div>
        )}
        <FileDropZone
          accept="application/pdf,.pdf,.doc,.docx"
          onFiles={handleFiles}
          icon={<UploadIcon />}
          title={showFileCard ? fDoc.replaceFile : fDoc.uploadFile}
          hint={fDoc.fileHint}
        />
        {fileError && <div className="mt-1 text-xs text-red-600">{fileError}</div>}
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
          onClick={() => (onDone ? onDone(null) : navigate('/admin/documents'))}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-surface transition-colors"
        >
          {aCommon.cancel}
        </button>
      </div>
    </form>
  );
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
