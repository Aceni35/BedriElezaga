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
          {staff.file?.url && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-[14px] bg-surface border border-line">
              <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <Icon path="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{tt.fileTitle}</div>
                <div className="text-xs text-ink-soft truncate">{decodeURIComponent(staff.file.key.split('/').pop() || staff.file.key)}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={staff.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-line hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" size={12} />
                  {tt.btnView}
                </a>
                <a
                  href={staff.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white hover:bg-primary-deep transition-colors"
                >
                  <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={12} />
                  {tt.btnDownload}
                </a>
              </div>
            </div>
          )}
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
