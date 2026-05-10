// Footer.jsx — site footer
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useI18n } from '../i18n/I18nContext';

const socials = [{ icon: ICONS.facebook, link: 'https://www.facebook.com/profile.php?id=100072091956362' }];

function Footer() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const f = t.footer;
  const go = (path) => { navigate(path); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const menuLinks = [
    [f.menu.home,      () => go('/')],
    [f.menu.about,     () => go('/about/overview')],
    [f.menu.staff,     () => go('/staff/directorate')],
    [f.menu.students,  () => go('/students/orari')],
    [f.menu.documents, () => go('/documents')],
    [f.menu.news,      () => go('/news')],
  ];

  return (
    <footer id="footer" className="bg-primary text-accent-soft pt-20 pb-8 mt-20">
      <div className={CX.container}>
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 mb-14">
          <div className="flex gap-4 items-start max-w-sm">
            <img
              src="https://pub-a1b19793d15448139486af8924561c8b.r2.dev/logo-bedri-2.png"
              alt={t.common.schoolShortName}
              className="h-11 w-11 object-contain shrink-0"
            />
            <div>
              <div className="font-display text-[22px] font-medium text-white mb-2 leading-tight">{t.common.schoolFullName}</div>
              <div className="text-sm leading-relaxed opacity-80">{f.schoolDescription}</div>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="font-display text-sm font-medium text-white mb-5">{f.visitUs}</div>
              <div className="flex gap-3 items-start mb-3.5 text-sm leading-relaxed opacity-85">
                <Icon path={ICONS.pin} size={16} className="mt-0.5 shrink-0 opacity-70" />
                <div>{f.address}</div>
              </div>
              <div className="flex gap-3 items-start mb-3.5 text-sm opacity-85"><Icon path={ICONS.phone} size={16} className="mt-0.5 opacity-70" /><div>+38230459230</div></div>
              <div className="flex gap-3 items-start text-sm opacity-85"><Icon path={ICONS.mail} size={16} className="mt-0.5 opacity-70" /><div>skola@os-belezaga.edu.me</div></div>
            </div>

            <div>
              <div className="font-display text-sm font-medium text-white mb-5">{f.menuTitle}</div>
              {menuLinks.map(([l, fn]) => (
                <button key={l} onClick={fn} className="footer-link block text-left w-full py-1.5 text-sm">{l}</button>
              ))}
            </div>

            <div>
              <div className="font-display text-sm font-medium text-white mb-2">{f.hoursTitle}</div>
              <div className="text-[13px] text-white/90 mb-3">{f.hoursDays}</div>
              <div className="text-[13px] mb-6">
                {f.hours.map((row, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-white/10 opacity-85"><span>{row.d}</span><span>{row.h}</span></div>
                ))}
              </div>
              <div className="flex gap-2.5">
                {socials.map(({ icon: p, link: l }, i) => (
                  <a key={i} target="_blank" rel="noopener noreferrer" href={l} className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary hover:-translate-y-0.5 transition-all">
                    <Icon path={p} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-0 h-px bg-white/10" />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-8 text-[13px] opacity-70">
          <div>{f.rights}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
