// Staff.jsx — staff directory page shell
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import TeacherCard from './TeacherCard.jsx';
import TeacherModal from './TeacherModal.jsx';
import { Spinner } from '../ui/Spinner';
import { useStaffList } from '../hooks/useStaff';
import { useGallery } from '../hooks/useGallery';
import { useI18n, interpolate } from '../i18n/I18nContext';

const TEACHERS_CATEGORY = 'teachers';

const STAFF_CATEGORY_ICONS = {
  school_bodies: 'M3 7h18M3 12h18M3 17h18',
  directorate: 'M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z',
  administration: 'M9 17v-2a4 4 0 014-4h.01M15 7a3 3 0 11-6 0 3 3 0 016 0zM21 21l-3-3',
  professional_associates: 'M12 4v16m8-8H4',
  teachers: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5v-15z',
  assistants: 'M17 20h5v-2a4 4 0 00-3-3.87',
  maintenance: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
};

const CATEGORY_ORDER = [
  'school_bodies',
  'directorate',
  'administration',
  'professional_associates',
  'teachers',
  'assistants',
  'maintenance',
];

function pluralize(count, one, other) {
  return count === 1 ? one : other;
}

function Staff() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { category } = useParams();

  const categories = CATEGORY_ORDER.map((id) => ({
    id,
    label: t.staff.categories[id] || id,
    icon: STAFF_CATEGORY_ICONS[id],
  }));

  const known = categories.find((c) => c.id === category);
  const activeCat = known ? category : categories[0].id;
  const catData = known || categories[0];

  const [selectedStaff, setSelectedStaff] = React.useState(null);
  const [positionFilter, setPositionFilter] = React.useState('all');

  const { data: staffData, isLoading } = useStaffList({ limit: 100, sort: 'fullName' });
  const { data: galleryData } = useGallery();
  const galleryByCategory = React.useMemo(() => {
    const map = {};
    for (const item of galleryData?.items ?? []) {
      if (item.section === 'staff') map[item.category] = item;
    }
    return map;
  }, [galleryData]);
  const categoryImage = galleryByCategory[activeCat] || null;
  const allStaff = staffData?.items ?? [];
  const peopleInCategory = allStaff.filter((s) => s.category === activeCat);
  const categoryCounts = React.useMemo(() => {
    const map = {};
    for (const s of allStaff) map[s.category] = (map[s.category] || 0) + 1;
    return map;
  }, [allStaff]);

  React.useEffect(() => { setPositionFilter('all'); }, [activeCat]);

  const teacherPositions = activeCat === TEACHERS_CATEGORY
    ? Array.from(new Set(peopleInCategory.map((s) => s.position))).sort()
    : [];

  const filteredTeachers = positionFilter === 'all'
    ? peopleInCategory
    : peopleInCategory.filter((s) => s.position === positionFilter);

  return (
    <main>
      <section className="relative overflow-hidden pt-[72px] pb-14 bg-surface border-b border-line">
        <div className="pointer-events-none absolute -top-36 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative'}>
          <div className={'grid gap-10 items-center ' + (categoryImage ? 'lg:grid-cols-[1fr_minmax(280px,420px)]' : '')}>
            <div>
              <div className={CX.eyebrow}>{t.staff.eyebrow}</div>
              <h1 className="text-[clamp(40px,5vw,60px)] mt-4 mb-5 max-w-[860px] text-balance">{t.staff.title}</h1>
              <p className="text-[18px] text-ink-soft max-w-[640px] leading-relaxed">{t.staff.subtitle}</p>
            </div>
            {categoryImage && (
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-sm border border-line bg-bg">
                <img
                  src={categoryImage.picture.url}
                  alt={catData.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={CX.container}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 py-8">
          {categories.map((c) => {
            const active = activeCat === c.id;
            const count = categoryCounts[c.id] || 0;
            return (
              <button key={c.id} onClick={() => navigate('/staff/' + c.id)}
                className={'flex items-center gap-3.5 px-5 py-4 rounded-[20px] text-left border transition-all ' + (active ? 'bg-primary text-white border-primary' : 'bg-surface border-line hover:border-primary-soft hover:-translate-y-0.5 hover:shadow-sm')}>
                <div className={'w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 ' + (active ? 'bg-white/15 text-accent' : 'bg-primary-soft text-primary')}>
                  <Icon path={c.icon} size={18} />
                </div>
                <div>
                  <div className={'font-medium text-sm leading-tight mb-1 ' + (active ? 'text-white' : 'text-ink')}>{c.label}</div>
                  <div className={'text-xs ' + (active ? 'text-white/80' : 'text-ink-soft')}>{count} {pluralize(count, t.common.person_one, t.common.person_other)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <section className="pt-10 pb-20">
        <div className={CX.container}>
          <div className="flex items-center gap-4 mb-7">
            <h2 className="text-[clamp(28px,3.5vw,40px)]">{catData.label}</h2>
            <span className={CX.chip}>{peopleInCategory.length} {pluralize(peopleInCategory.length, t.common.person_one, t.common.person_other)}</span>
          </div>

          {isLoading && (
            <div className="py-16 flex justify-center text-primary">
              <Spinner size={28} />
            </div>
          )}

          {!isLoading && peopleInCategory.length === 0 && (
            <div className="py-16 text-center text-ink-soft text-sm border border-dashed border-line rounded-[20px]">
              {t.staff.empty}
            </div>
          )}

          {!isLoading && peopleInCategory.length > 0 && activeCat === TEACHERS_CATEGORY && teacherPositions.length > 1 && (
            <div className="flex gap-2 flex-wrap mb-8">
              <button onClick={() => setPositionFilter('all')}
                className={CX.chip + ' ' + CX.chipClickable + ' ' + (positionFilter === 'all' ? CX.chipActive : '')}>
                {t.staff.allFilter} ({peopleInCategory.length})
              </button>
              {teacherPositions.map((p) => {
                const count = peopleInCategory.filter((s) => s.position === p).length;
                return (
                  <button key={p} onClick={() => setPositionFilter(p)}
                    className={CX.chip + ' ' + CX.chipClickable + ' ' + (positionFilter === p ? CX.chipActive : '')}>
                    {p} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {!isLoading && peopleInCategory.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {(activeCat === TEACHERS_CATEGORY ? filteredTeachers : peopleInCategory).map((s) => (
                <TeacherCard key={s.id} staff={s} onClick={() => setSelectedStaff(s)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedStaff && <TeacherModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
    </main>
  );
}

export default Staff;
