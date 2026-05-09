import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '../hooks/useAuth';
import { useI18n } from '../i18n/I18nContext';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';

export function AdminLayout() {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  const baseNavItems = [
    { to: '/admin',           label: t.admin.nav.dashboard, end: true,  adminOnly: false },
    { to: '/admin/news',      label: t.admin.nav.news,                  adminOnly: false },
    { to: '/admin/staff',     label: t.admin.nav.staff,                 adminOnly: false },
    { to: '/admin/documents', label: t.admin.nav.documents,             adminOnly: false },
    { to: '/admin/rules',     label: t.admin.nav.rules,                 adminOnly: false },
    { to: '/admin/settings',  label: t.admin.nav.settings,              adminOnly: false },
    { to: '/admin/users',     label: t.admin.nav.users,                 adminOnly: true  },
  ];

  const navItems = baseNavItems.filter(
    (item) => !item.adminOnly || user?.role === 'admin'
  );

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      <aside className="w-[260px] shrink-0 border-r border-line bg-surface flex flex-col">
        <div className="px-6 py-6 border-b border-line flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-lg font-semibold leading-tight">{t.admin.section}</div>
            <div className="text-xs text-ink-soft mt-1">Bedri Elezaga</div>
          </div>
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ' +
                (isActive ? 'bg-primary text-white' : 'text-ink-soft hover:bg-bg hover:text-ink')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-line">
          {user && (
            <div className="px-4 pb-3">
              <div className="text-sm font-medium truncate">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-ink-soft truncate">{user.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left text-ink-soft hover:bg-bg hover:text-ink transition-colors"
          >
            {t.admin.logout}
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div key={location.pathname} className="page-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
