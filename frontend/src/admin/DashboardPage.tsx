import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

export function DashboardPage() {
  const { t } = useI18n();
  const d = t.admin.dashboard;
  const cards = [
    { to: '/admin/news',      title: d.newsTitle,     hint: d.newsHint },
    { to: '/admin/staff',     title: d.staffTitle,    hint: d.staffHint },
    { to: '/admin/documents', title: d.docsTitle,     hint: d.docsHint },
    { to: '/admin/settings',  title: d.settingsTitle, hint: d.settingsHint },
  ];

  return (
    <div className="px-8 py-10 max-w-[840px]">
      <h1 className="font-display text-2xl font-semibold mb-2">{d.welcome}</h1>
      <p className="text-sm text-ink-soft mb-8">{d.subtitle}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="block p-5 rounded-xl border border-line bg-surface hover:border-primary transition-colors"
          >
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-ink-soft mt-1">{c.hint}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
