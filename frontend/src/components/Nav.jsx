// Nav.jsx — top navigation with dropdowns + mobile menu
import React from 'react';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import Crest from './Crest.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useI18n } from '../i18n/I18nContext';

function Nav() {
  const { t } = useI18n();
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [staffOpen, setStaffOpen] = React.useState(false);
  const [studentsOpen, setStudentsOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isAbout = !!useMatch('/about/*');
  const isStaff = !!useMatch('/staff/*');
  const isStudents = !!useMatch('/students/*');
  const isDocuments = !!useMatch('/documents');
  const isNews = !!useMatch('/news/*');

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest('[data-nav-item]')) {
        setAboutOpen(false); setStaffOpen(false); setStudentsOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const go = (path) => {
    navigate(path);
    setAboutOpen(false); setStaffOpen(false); setStudentsOpen(false); setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goContact = () => {
    if (isHome) {
      setTimeout(() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }), 200);
    }
    setMobileOpen(false);
  };

  const linkBase = 'px-3.5 py-2.5 rounded-full text-sm font-medium transition-all inline-flex items-center';
  const linkInactive = 'text-ink hover:bg-surface hover:text-primary';
  const linkActive = 'text-primary bg-primary-soft';

  const aboutItems = [
    { id: 'history', t: t.nav.aboutHistoryTitle, s: t.nav.aboutHistorySub },
    { id: 'mission', t: t.nav.aboutMissionTitle, s: t.nav.aboutMissionSub },
  ];
  const studentsItems = [
    { id: 'orari',       t: t.nav.studentsScheduleTitle, s: t.nav.studentsScheduleSub },
    { id: 'rregullorja', t: t.nav.studentsRulesTitle,    s: t.nav.studentsRulesSub },
    { id: 'biblioteka',  t: t.nav.studentsLibraryTitle,  s: t.nav.studentsLibrarySub, href: 'https://example.com' },
  ];
  const staffEntries = Object.entries(t.staff.categories);

  return (
    <>
      <header className={'sticky top-0 z-50 transition-all border-b border-transparent ' + (scrolled ? 'nav-glass-scrolled' : 'nav-glass')}>
        <div className={CX.container + ' flex items-center gap-6 h-[76px]'}>
          <button className="flex items-center gap-3 text-left" onClick={() => go('/')}>
            <Crest />
            <div>
              <div className="font-display text-[17px] font-semibold leading-tight tracking-tight">{t.common.schoolShortName}</div>
              <div className="hidden md:block text-[11px] text-ink-soft tracking-wide">{t.common.schoolTagline}</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            <button onClick={() => go('/')} className={linkBase + ' ' + (isHome ? linkActive : linkInactive)}>{t.nav.home}</button>

            <div className="relative" data-nav-item>
              <button
                onClick={(e) => { e.stopPropagation(); setAboutOpen(!aboutOpen); setStaffOpen(false); setStudentsOpen(false); }}
                className={linkBase + ' ' + (isAbout ? linkActive : linkInactive)}>
                {t.nav.about}
                <Icon path={ICONS.arrowDown} size={14} className={'ml-1 transition-transform ' + (aboutOpen ? 'rotate-180' : '')} />
              </button>
              {aboutOpen && (
                <div className="dd-in absolute top-[calc(100%+8px)] -left-3 min-w-[280px] bg-surface border border-line rounded-[20px] shadow-lg p-2">
                  {aboutItems.map(it => (
                    <button key={it.id} onClick={() => go('/about/' + it.id)}
                      className="group w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-[14px] text-left text-ink hover:bg-primary-soft hover:text-primary transition-colors">
                      <div>
                        <div className="text-sm font-medium">{it.t}</div>
                        <div className="text-xs text-ink-soft group-hover:text-primary/70 mt-0.5">{it.s}</div>
                      </div>
                      <Icon path={ICONS.chevronRight} size={14} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" data-nav-item>
              <button
                onClick={(e) => { e.stopPropagation(); setStaffOpen(!staffOpen); setAboutOpen(false); setStudentsOpen(false); }}
                className={linkBase + ' ' + (isStaff ? linkActive : linkInactive)}>
                {t.nav.staff}
                <Icon path={ICONS.arrowDown} size={14} className={'ml-1 transition-transform ' + (staffOpen ? 'rotate-180' : '')} />
              </button>
              {staffOpen && (
                <div className="dd-in absolute top-[calc(100%+8px)] right-[-12px] min-w-[520px] bg-surface border border-line rounded-[20px] shadow-lg p-2">
                  <div className="grid grid-cols-2 gap-1">
                    {staffEntries.map(([id, label]) => (
                      <button key={id} onClick={() => go('/staff/' + id)}
                        className="group flex items-center justify-between gap-3 px-3.5 py-3 rounded-[14px] text-left text-ink hover:bg-primary-soft hover:text-primary transition-colors">
                        <div className="text-sm font-medium">{label}</div>
                        <Icon path={ICONS.chevronRight} size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" data-nav-item>
              <button
                onClick={(e) => { e.stopPropagation(); setStudentsOpen(!studentsOpen); setAboutOpen(false); setStaffOpen(false); }}
                className={linkBase + ' ' + (isStudents ? linkActive : linkInactive)}>
                {t.nav.students}
                <Icon path={ICONS.arrowDown} size={14} className={'ml-1 transition-transform ' + (studentsOpen ? 'rotate-180' : '')} />
              </button>
              {studentsOpen && (
                <div className="dd-in absolute top-[calc(100%+8px)] -left-3 min-w-[280px] bg-surface border border-line rounded-[20px] shadow-lg p-2">
                  {studentsItems.map(it => (
                    <button key={it.id} onClick={() => it.href ? window.open(it.href, '_blank', 'noopener,noreferrer') : go('/students/' + it.id)}
                      className="group w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-[14px] text-left text-ink hover:bg-primary-soft hover:text-primary transition-colors">
                      <div>
                        <div className="text-sm font-medium">{it.t}</div>
                        <div className="text-xs text-ink-soft group-hover:text-primary/70 mt-0.5">{it.s}</div>
                      </div>
                      <Icon path={ICONS.chevronRight} size={14} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => go('/documents')} className={linkBase + ' ' + (isDocuments ? linkActive : linkInactive)}>{t.nav.documents}</button>
            <button onClick={() => go('/news')} className={linkBase + ' ' + (isNews ? linkActive : linkInactive)}>{t.nav.news}</button>
            <button onClick={goContact} className={linkBase + ' ' + linkInactive}>{t.nav.contact}</button>
            <LanguageSwitcher />
          </nav>


          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-[14px] ml-auto">
            <Icon path={mobileOpen ? ICONS.x : ICONS.menu} size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed top-[76px] left-0 right-0 bottom-0 bg-surface z-40 overflow-y-auto p-5 dd-in">
          <button className="block w-full text-left px-4 py-3.5 rounded-[14px] text-base font-medium hover:bg-primary-soft hover:text-primary" onClick={() => go('/')}>{t.nav.home}</button>
          <div className="pt-4 mt-2 border-t border-line">
            <div className="text-[11px] tracking-[.14em] uppercase text-primary font-semibold px-4 pb-2">{t.nav.about}</div>
            {[['overview', t.nav.aboutOverview],['history', t.nav.aboutHistoryTitle],['mission', t.nav.aboutMissionTitle]].map(([id,l]) => (
              <button key={id} onClick={() => go('/about/' + id)} className="block w-full text-left px-4 py-2.5 text-sm text-ink-soft rounded-lg hover:bg-surface2 hover:text-ink">{l}</button>
            ))}
          </div>
          <div className="pt-4 mt-2 border-t border-line">
            <div className="text-[11px] tracking-[.14em] uppercase text-primary font-semibold px-4 pb-2">{t.nav.staff}</div>
            {staffEntries.map(([id, label]) => (
              <button key={id} onClick={() => go('/staff/' + id)} className="block w-full text-left px-4 py-2.5 text-sm text-ink-soft rounded-lg hover:bg-surface2 hover:text-ink">{label}</button>
            ))}
          </div>
          <div className="pt-4 mt-2 border-t border-line">
            <div className="text-[11px] tracking-[.14em] uppercase text-primary font-semibold px-4 pb-2">{t.nav.students}</div>
            {[['orari', t.nav.studentsScheduleTitle],['rregullorja', t.nav.studentsRulesTitle],['biblioteka', t.nav.studentsLibraryTitle, 'https://example.com']].map(([id,l,href]) => (
              <button key={id} onClick={() => href ? window.open(href, '_blank', 'noopener,noreferrer') : go('/students/' + id)} className="block w-full text-left px-4 py-2.5 text-sm text-ink-soft rounded-lg hover:bg-surface2 hover:text-ink">{l}</button>
            ))}
          </div>
          <button className="block w-full text-left px-4 py-3.5 rounded-[14px] text-base font-medium hover:bg-primary-soft hover:text-primary" onClick={() => go('/documents')}>{t.nav.documents}</button>
          <button className="block w-full text-left px-4 py-3.5 rounded-[14px] text-base font-medium hover:bg-primary-soft hover:text-primary" onClick={() => go('/news')}>{t.nav.news}</button>
          <LanguageSwitcher variant="mobile" />
          <button className={CX.btnPrimary + ' mt-3 w-full justify-center'} onClick={() => go('/about/overview')}>{t.nav.enroll}</button>
        </div>
      )}
    </>
  );
}

export default Nav;
