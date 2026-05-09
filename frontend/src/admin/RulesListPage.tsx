import { useEffect, useMemo, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Spinner } from '../ui/Spinner';
import { Select } from '../ui/Select';
import { getApiErrorMessage } from '../api/client';
import {
  useCreateRule,
  useDeleteRule,
  useRulesList,
  useTranslateRules,
  useUpdateRule,
} from '../hooks/useRules';
import type { Lang, Rule, RuleTranslated } from '../types/rules';
import { useI18n, interpolate } from '../i18n/I18nContext';

const labelClass = 'block text-xs font-medium text-ink-soft mb-1.5';
const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-bg border border-line focus:border-primary focus:outline-none text-sm';

const LANGS: Lang[] = ['sq', 'en', 'me'];

function emptyTranslated(): RuleTranslated {
  return { sq: '', en: '', me: '' };
}

function isComplete(field: RuleTranslated): boolean {
  return !!field.sq.trim() && !!field.en.trim() && !!field.me.trim();
}

export function RulesListPage() {
  const { t } = useI18n();
  const a = t.admin;
  const r = a.rules;

  const { data, isLoading, isError, error } = useRulesList();
  const deleteRule = useDeleteRule();

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Rule | null>(null);

  const items = data?.items ?? [];

  const handleDelete = (id: string, name: string) => {
    if (!confirm(interpolate(a.common.confirmDelete, { name }))) return;
    deleteRule.mutate(id);
  };

  return (
    <div className="px-8 py-10 max-w-[1100px]">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">{r.title}</h1>
          <p className="text-sm text-ink-soft mt-1">{r.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep transition-colors whitespace-nowrap"
        >
          {r.newButton}
        </button>
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

      {!isLoading && !isError && items.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-ink-soft border border-dashed border-line rounded-xl">
          {r.empty}
        </div>
      )}

      {items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-line bg-bg hover:bg-surface transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-display font-semibold text-sm shrink-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.title.sq}</div>
                <ul className="mt-2 space-y-1">
                  {item.items.map((it, j) => (
                    <li
                      key={j}
                      className="text-sm text-ink-soft grid grid-cols-[14px_1fr] gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <div>{it.sq}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-line hover:border-primary hover:text-primary transition-colors"
                >
                  {a.common.edit}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title.sq)}
                  disabled={deleteRule.isPending && deleteRule.variables === item.id}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-line text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
                >
                  {deleteRule.isPending && deleteRule.variables === item.id ? (
                    <Spinner size={12} />
                  ) : (
                    a.common.delete
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <RuleCreateModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
      <RuleEditModal rule={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RuleCreateModal({ isOpen, onClose }: CreateModalProps) {
  const { t } = useI18n();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.rules.createTitle} maxWidth="720px">
      <RuleForm mode="create" onDone={onClose} />
    </Modal>
  );
}

interface EditModalProps {
  rule: Rule | null;
  onClose: () => void;
}

function RuleEditModal({ rule, onClose }: EditModalProps) {
  const { t } = useI18n();
  return (
    <Modal isOpen={!!rule} onClose={onClose} title={t.admin.rules.editTitle} maxWidth="720px">
      {rule && <RuleForm mode="edit" rule={rule} onDone={onClose} />}
    </Modal>
  );
}

type FormProps =
  | { mode: 'create'; rule?: undefined; onDone: () => void }
  | { mode: 'edit'; rule: Rule; onDone: () => void };

function RuleForm(props: FormProps) {
  const { mode, onDone } = props;
  const initial = mode === 'edit' ? props.rule : undefined;
  const { t } = useI18n();
  const r = t.admin.rules;
  const aCommon = t.admin.common;

  const [sourceLang, setSourceLang] = useState<Lang>('sq');
  const [activeTab, setActiveTab] = useState<Lang>('sq');
  const [title, setTitle] = useState<RuleTranslated>(
    initial ? { ...initial.title } : emptyTranslated()
  );
  const [items, setItems] = useState<RuleTranslated[]>(
    initial ? initial.items.map((it) => ({ ...it })) : [emptyTranslated()]
  );
  const [hasTranslated, setHasTranslated] = useState<boolean>(!!initial);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setTitle({ ...initial.title });
      setItems(initial.items.map((it) => ({ ...it })));
      setHasTranslated(true);
    }
  }, [initial]);

  const createRule = useCreateRule();
  const updateRule = useUpdateRule();
  const translate = useTranslateRules();
  const submitting = mode === 'create' ? createRule.isPending : updateRule.isPending;

  const langLabels: Record<Lang, string> = {
    sq: r.langLabelSq,
    en: r.langLabelEn,
    me: r.langLabelMe,
  };
  const langOptions = useMemo(
    () => LANGS.map((l) => ({ value: l, label: langLabels[l] })),
    [langLabels]
  );

  const setItemAt = (idx: number, lang: Lang, v: string) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [lang]: v } : it)));
  };
  const addItem = () => setItems((prev) => [...prev, emptyTranslated()]);
  const removeItemAt = (idx: number) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)));
  };

  const sourceFilled =
    !!title[sourceLang].trim() && items.some((it) => it[sourceLang].trim());

  const handleTranslate = async () => {
    setSubmitError(null);
    if (!sourceFilled) {
      setSubmitError(r.titleRequired);
      return;
    }
    const sourceTitle = title[sourceLang].trim();
    const sourceItems = items.map((it) => it[sourceLang].trim());

    try {
      const { translations } = await translate.mutateAsync({
        source: sourceLang,
        texts: [sourceTitle, ...sourceItems],
      });
      const [titleT, ...itemsT] = translations;
      setTitle((prev) => ({
        ...prev,
        ...titleT,
        [sourceLang]: sourceTitle,
      }));
      setItems((prev) =>
        prev.map((it, i) => {
          const t2 = itemsT[i];
          if (!t2) return it;
          return { ...it, ...t2, [sourceLang]: it[sourceLang].trim() };
        })
      );
      setHasTranslated(true);
      const otherTab = LANGS.find((l) => l !== sourceLang);
      if (otherTab) setActiveTab(otherTab);
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const cleanedTitle: RuleTranslated = {
      sq: title.sq.trim(),
      en: title.en.trim(),
      me: title.me.trim(),
    };
    const cleanedItems = items
      .map((it) => ({ sq: it.sq.trim(), en: it.en.trim(), me: it.me.trim() }))
      .filter((it) => it.sq || it.en || it.me);

    if (!isComplete(cleanedTitle)) {
      setSubmitError(r.missingLanguages);
      return;
    }
    if (cleanedItems.length === 0 || cleanedItems.some((it) => !isComplete(it))) {
      setSubmitError(r.missingLanguages);
      return;
    }

    try {
      if (mode === 'create') {
        await createRule.mutateAsync({ title: cleanedTitle, items: cleanedItems });
      } else {
        await updateRule.mutateAsync({
          id: initial!.id,
          input: { title: cleanedTitle, items: cleanedItems },
        });
      }
      onDone();
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="px-3 py-2 text-xs rounded-lg bg-primary-soft text-primary border border-primary/20">
        {r.translateHint}
      </div>

      <div>
        <label className={labelClass}>{r.sourceLanguage}</label>
        <Select
          value={sourceLang}
          onValueChange={(v) => {
            const lang = v as Lang;
            setSourceLang(lang);
            setActiveTab(lang);
          }}
          options={langOptions}
          ariaLabel={r.sourceLanguage}
        />
      </div>

      <div>
        <div className="flex items-center gap-1 border-b border-line">
          {LANGS.map((l) => {
            const active = activeTab === l;
            const filled = !!title[l].trim() && items.every((it) => !!it[l].trim());
            return (
              <button
                key={l}
                type="button"
                onClick={() => setActiveTab(l)}
                className={
                  'relative px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ' +
                  (active
                    ? 'text-primary border-primary'
                    : 'text-ink-soft border-transparent hover:text-ink')
                }
              >
                <span className="flex items-center gap-1.5">
                  {langLabels[l]}
                  {l === sourceLang && (
                    <span className="text-[10px] uppercase tracking-wider text-ink-soft">
                      ·
                    </span>
                  )}
                  {filled && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          {r.titleField} · {langLabels[activeTab]}
        </label>
        <input
          type="text"
          value={title[activeTab]}
          onChange={(e) =>
            setTitle((prev) => ({ ...prev, [activeTab]: e.target.value }))
          }
          className={inputClass}
          maxLength={500}
          placeholder={r.titlePlaceholder}
        />
      </div>

      <div>
        <label className={labelClass}>
          {r.itemsField} · {langLabels[activeTab]}
        </label>
        <div className="space-y-2">
          {items.map((it, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={it[activeTab]}
                  onChange={(e) => setItemAt(i, activeTab, e.target.value)}
                  className={inputClass}
                  maxLength={500}
                  placeholder={r.itemPlaceholder}
                />
              </div>
              <button
                type="button"
                onClick={() => removeItemAt(i)}
                disabled={items.length <= 1}
                aria-label={aCommon.remove}
                className="px-3 py-2.5 rounded-lg border border-line text-ink-soft hover:text-red-600 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed border-line hover:border-primary hover:text-primary transition-colors"
        >
          + {r.addItem}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleTranslate}
          disabled={translate.isPending || !sourceFilled}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary-soft disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {translate.isPending ? (
            <>
              <Spinner size={14} />
              {r.translatingBtn}
            </>
          ) : hasTranslated ? (
            r.retranslateBtn
          ) : (
            r.translateBtn
          )}
        </button>
        {hasTranslated && (
          <span className="text-xs text-ink-soft">{r.reviewHint}</span>
        )}
      </div>

      {submitError && (
        <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
          {submitError}
        </div>
      )}

      <div className="flex gap-3 pt-2 border-t border-line">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 min-w-32 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 transition-colors"
        >
          {submitting ? (
            <Spinner size={16} />
          ) : mode === 'create' ? (
            aCommon.add
          ) : (
            aCommon.saveChanges
          )}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-surface transition-colors"
        >
          {aCommon.cancel}
        </button>
      </div>
    </form>
  );
}
