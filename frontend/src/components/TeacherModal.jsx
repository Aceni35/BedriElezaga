// TeacherModal.jsx — detail modal for teachers / staff
import React from 'react';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import PH from './PH.jsx';
import ImageFit from './ImageFit.jsx';
import { useI18n, interpolate } from '../i18n/I18nContext';

const initialsOf = (name) =>
  (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

function TeacherModal({ staff, onClose }) {
  const { t } = useI18n();
  const tt = t.teacher;

  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const initials = initialsOf(staff.fullName);
  const years = Math.max(0, new Date().getFullYear() - staff.memberSince);
  const firstName = staff.fullName.split(/\s+/)[0] || staff.fullName;

  const facts = [
    [tt.factPosition, staff.position],
    [tt.factMember, String(staff.memberSince)],
    years > 0 ? [tt.factExperience, interpolate(tt.yearsExperience, { n: years })] : null,
    staff.email ? [tt.factEmail, staff.email] : null,
    staff.phone ? [tt.factPhone, staff.phone] : null,
  ].filter(Boolean);

  return (
    <div onClick={onClose} className="fade-in fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div onClick={(e) => e.stopPropagation()} className="modal-in bg-bg rounded-[28px] max-w-[640px] w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center z-10 hover:bg-primary hover:text-white hover:border-primary transition-all"><Icon path={ICONS.x} size={18} /></button>

        <div className="grid grid-cols-[160px_1fr] max-sm:grid-cols-1 gap-7 p-9 pb-7">
          <div className="rounded-[20px] overflow-hidden max-sm:max-w-[140px]">
            {staff.picture?.url
              ? <ImageFit src={staff.picture.url} alt={staff.fullName} aspectRatio="1/1" />
              : <PH label={initials} ratio="1/1" />}
          </div>
          <div>
            <div className="text-[11px] tracking-[.12em] uppercase text-primary font-semibold mb-2">{staff.position}</div>
            <h2 className="text-[28px] mb-1.5">{staff.fullName}</h2>
            <div className="text-[15px] text-ink-soft mb-4">{interpolate(tt.memberSince, { y: staff.memberSince })}</div>
            <div className="flex gap-2 flex-wrap">
              {years > 0 && <span className={CX.chip}>{interpolate(tt.yearsExperience, { n: years })}</span>}
              {staff.email && <a href={`mailto:${staff.email}`} className={CX.chip + ' hover:border-primary hover:text-primary transition-colors'}><Icon path={ICONS.mail} size={11} /> {staff.email}</a>}
              {staff.phone && <a href={`tel:${staff.phone}`} className={CX.chip + ' hover:border-primary hover:text-primary transition-colors'}><Icon path={ICONS.phone} size={11} /> {staff.phone}</a>}
            </div>
          </div>
        </div>

        <div className="px-9 pb-9 border-t border-line pt-7">
          <p className="text-ink-soft leading-[1.7] mb-6 whitespace-pre-line">{staff.description || tt.noDescription}</p>
          <div className="grid grid-cols-2 gap-4 p-5 bg-surface rounded-[14px]">
            {facts.map(([l, v]) => (
              <div key={l}>
                <div className="text-[11px] tracking-[.1em] uppercase text-ink-soft mb-1">{l}</div>
                <div className="text-sm font-medium break-words">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherModal;
