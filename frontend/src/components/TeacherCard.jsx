// TeacherCard.jsx — card used in teacher grid
import React from 'react';
import { ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import PH from './PH.jsx';
import ImageFit from './ImageFit.jsx';
import { useI18n, interpolate } from '../i18n/I18nContext';

function TeacherCard({ staff, onClick }) {
  const { t } = useI18n();
  const years = Math.max(0, new Date().getFullYear() - staff.memberSince);
  return (
    <button
      onClick={onClick}
      className="group bg-surface border border-line rounded-[20px] overflow-hidden text-left transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-primary hover:shadow-lg flex flex-col"
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.05]">
          {staff.picture?.url
            ? <ImageFit src={staff.picture.url} alt={staff.fullName} aspectRatio="4/5" />
            : <PH label={staff.fullName} ratio="4/5" />}
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.40) 100%)' }}
        />
        {years > 0 && (
          <span className="absolute top-3 right-3 bg-bg/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold text-primary shadow-sm">
            {interpolate(t.teacher.yearsBadge, { n: years })}
          </span>
        )}
        <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-bg text-primary flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <Icon path={ICONS.arrowRight} size={13} />
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-primary opacity-70" />
          <span className="text-[11px] tracking-[.10em] uppercase text-primary font-semibold">{staff.position}</span>
        </div>
        <div className="font-display text-[18px] font-medium leading-tight group-hover:text-primary transition-colors duration-200">
          {staff.fullName}
        </div>
      </div>
    </button>
  );
}

export default TeacherCard;
