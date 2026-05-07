import { useEffect, useState } from 'react';
import { useSettings, useUpdateSettings } from '../hooks/useSettings';
import { uploadsService } from '../services/uploads.service';
import { getApiErrorMessage } from '../api/client';
import { Spinner } from '../ui/Spinner';
import { FileDropZone } from '../ui/FileDropZone';
import { ChangePasswordSection } from './components/ChangePasswordSection';
import type { SettingsFile, UpdateSettingsInput } from '../types/settings';
import { useI18n, interpolate } from '../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const ALLOWED_DOC_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const fileLabelOf = (key: string) => decodeURIComponent(key.split('/').pop() || key);

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

export function SettingsPage() {
  const { data, isLoading, isError, error } = useSettings();
  const updateSettings = useUpdateSettings();
  const { t } = useI18n();
  const s = t.admin.settings;

  const [directorName, setDirectorName] = useState('');
  const [timetable, setTimetable] = useState<SlotState>({ kind: 'unchanged' });
  const [rules, setRules] = useState<SlotState>({ kind: 'unchanged' });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data) setDirectorName(data.directorName ?? '');
  }, [data]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const input: UpdateSettingsInput = {};
      if (directorName !== data.directorName) input.directorName = directorName.trim();

      if (timetable.kind === 'replace') {
        const uploaded = await uploadsService.uploadFile(timetable.file);
        input.timetableKey = uploaded.key;
      } else if (timetable.kind === 'remove') {
        input.timetableKey = '';
      }

      if (rules.kind === 'replace') {
        const uploaded = await uploadsService.uploadFile(rules.file);
        input.rulesKey = uploaded.key;
      } else if (rules.kind === 'remove') {
        input.rulesKey = '';
      }

      if (Object.keys(input).length === 0) {
        setSubmitting(false);
        return;
      }

      await updateSettings.mutateAsync(input);
      setTimetable({ kind: 'unchanged' });
      setRules({ kind: 'unchanged' });
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-10 max-w-[760px]">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">{s.title}</h1>
        <p className="text-sm text-ink-soft mt-1">
          {s.subtitle}
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-10 text-primary">
          <Spinner size={28} />
        </div>
      )}

      {isError && (
        <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
          {getApiErrorMessage(error)}
        </div>
      )}

      {data && (
        <form onSubmit={onSubmit} className="space-y-8">
          <section>
            <h2 className="font-display text-base font-semibold mb-4">{s.schoolDataHeading}</h2>
            <div>
              <label className={labelClass}>{s.directorName}</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className={inputClass}
                maxLength={200}
                placeholder={s.directorPlaceholder}
              />
            </div>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold mb-4">{s.filesHeading}</h2>
            <div className="space-y-6">
              <FileSlot
                label={s.timetable}
                hint={s.fileHint}
                current={data.timetable}
                state={timetable}
                onChange={setTimetable}
              />
              <FileSlot
                label={s.rules}
                hint={s.fileHint}
                current={data.rules}
                state={rules}
                onChange={setRules}
              />
            </div>
          </section>

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
              {submitting ? <Spinner size={16} /> : t.admin.common.saveChanges}
            </button>
          </div>
        </form>
      )}

      <div className="mt-10">
        <ChangePasswordSection />
      </div>
    </div>
  );
}

type SlotState =
  | { kind: 'unchanged' }
  | { kind: 'replace'; file: File }
  | { kind: 'remove' };

interface FileSlotProps {
  label: string;
  hint: string;
  current: SettingsFile | null;
  state: SlotState;
  onChange: (next: SlotState) => void;
}

function FileSlot({ label, hint, current, state, onChange }: FileSlotProps) {
  const { t } = useI18n();
  const s = t.admin.settings;
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (!ALLOWED_DOC_TYPES.has(f.type)) {
      setError(s.onlyAllowedFiles);
      return;
    }
    setError(null);
    onChange({ kind: 'replace', file: f });
  };

  const showCurrent = state.kind !== 'remove' && state.kind !== 'replace' && current;
  const showPending = state.kind === 'replace';

  return (
    <div>
      <label className={labelClass}>{label}</label>

      {showCurrent && current && (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-line mb-3">
          <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center shrink-0 text-ink-soft">
            <DocumentIcon />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium truncate hover:text-primary block"
            >
              {fileLabelOf(current.key)}
            </a>
            <div className="text-xs text-ink-soft mt-0.5">{s.currentFile}</div>
          </div>
          <button
            type="button"
            onClick={() => onChange({ kind: 'remove' })}
            className="text-xs text-ink-soft hover:text-red-600 shrink-0"
          >
            {t.admin.common.remove}
          </button>
        </div>
      )}

      {showPending && state.kind === 'replace' && (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-line mb-3">
          <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center shrink-0 text-ink-soft">
            <DocumentIcon />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{state.file.name}</div>
            <div className="text-xs text-ink-soft mt-0.5">
              {interpolate(s.pendingUpload, { size: formatBytes(state.file.size) })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(current ? { kind: 'unchanged' } : { kind: 'remove' })}
            className="text-xs text-ink-soft hover:text-red-600 shrink-0"
          >
            {t.admin.common.remove}
          </button>
        </div>
      )}

      {state.kind === 'remove' && (
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-red-50 border border-red-200 mb-3">
          <div className="text-xs text-red-700">{s.willBeRemoved}</div>
          <button
            type="button"
            onClick={() => onChange({ kind: 'unchanged' })}
            className="text-xs text-ink-soft hover:text-ink shrink-0"
          >
            {t.admin.common.cancel}
          </button>
        </div>
      )}

      <FileDropZone
        accept="application/pdf,.pdf,.doc,.docx"
        onFiles={handleFiles}
        icon={<UploadIcon />}
        title={current || state.kind === 'replace' ? s.replaceFile : s.uploadFile}
        hint={hint}
      />

      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
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
