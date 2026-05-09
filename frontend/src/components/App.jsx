// app.jsx — root app (Tailwind) with React Router
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Staff from './Staff.jsx';
import Students from './Students.jsx';
import Documents from './Documents.jsx';
import News from './News.jsx';
import Article from './Article.jsx';
import Footer from './Footer.jsx';
import { LoginPage } from '../admin/LoginPage';
import { AdminLayout } from '../admin/AdminLayout';
import { ProtectedRoute } from '../admin/ProtectedRoute';
import { AdminRoute } from '../admin/AdminRoute';
import { DashboardPage } from '../admin/DashboardPage';
import { NewsListPage } from '../admin/NewsListPage';
import { StaffListPage } from '../admin/StaffListPage';
import { DocumentsListPage } from '../admin/DocumentsListPage';
import { SettingsPage } from '../admin/SettingsPage';
import { UsersListPage } from '../admin/UsersListPage';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "navy",
  "homeLayout": "editorial"
}/*EDITMODE-END*/;

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    window.__TWEAKS__ = tweaks;
  }, [tweaks]);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Navigate to="/about/overview" replace />} />
          <Route path="about/:sub" element={<About />} />
          <Route path="staff" element={<Navigate to="/staff/directorate" replace />} />
          <Route path="staff/:category" element={<Staff />} />
          <Route path="students" element={<Navigate to="/students/orari" replace />} />
          <Route path="students/:sub" element={<Students />} />
          <Route path="documents" element={<Documents />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<Article />} />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="news" element={<NewsListPage />} />
            <Route path="staff" element={<StaffListPage />} />
            <Route path="documents" element={<DocumentsListPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route element={<AdminRoute />}>
              <Route path="users" element={<UsersListPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {tweaksOpen && (
        <div className="dd-in fixed bottom-6 right-6 bg-surface border border-line rounded-[20px] shadow-lg z-[200] w-[280px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-base font-medium">Tweaks</div>
            <button onClick={() => setTweaksOpen(false)} className="w-7 h-7 rounded-full bg-bg border border-line flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary"><Icon path={ICONS.x} size={14} /></button>
          </div>

          <div className="mb-3.5">
            <div className="text-[11px] tracking-[.1em] uppercase text-ink-soft mb-2 font-semibold">Color theme</div>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: 'burgundy', label: 'Burgundy', color: '#7a2e2e' },
                { id: 'forest', label: 'Forest', color: '#2d4a3e' },
                { id: 'navy', label: 'Navy', color: '#1a2942' },
              ].map(t => (
                <button key={t.id} onClick={() => updateTweak('theme', t.id)}
                  className={'flex-1 min-w-[60px] px-2.5 py-2 border rounded-lg text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5 transition-all ' + (tweaks.theme === t.id ? 'bg-primary text-white border-primary' : 'bg-bg border-line text-ink hover:border-primary')}>
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ background: t.color }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-1">
            <div className="text-[11px] tracking-[.1em] uppercase text-ink-soft mb-2 font-semibold">Home hero layout</div>
            <div className="flex gap-1.5">
              {['editorial','compact'].map(l => (
                <button key={l} onClick={() => updateTweak('homeLayout', l)}
                  className={'flex-1 px-2.5 py-2 border rounded-lg text-xs font-medium capitalize cursor-pointer transition-all ' + (tweaks.homeLayout === l ? 'bg-primary text-white border-primary' : 'bg-bg border-line text-ink hover:border-primary')}>{l}</button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-ink-soft pt-2 border-t border-line mt-3">Changes persist across reloads.</div>
        </div>
      )}
    </>
  );
}

export default App;
