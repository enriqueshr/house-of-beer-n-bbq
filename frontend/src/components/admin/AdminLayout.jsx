import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUtensils, FaCalendarAlt, FaEnvelope, FaShoppingBag, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/menu', label: 'Menu Items', icon: FaUtensils },
  { to: '/admin/reservations', label: 'Reservations', icon: FaCalendarAlt },
  { to: '/admin/orders', label: 'Orders', icon: FaShoppingBag },
  { to: '/admin/contact', label: 'Messages', icon: FaEnvelope },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-charcoal-950">
      <aside className="hidden w-64 flex-shrink-0 border-r border-charcoal-800 bg-charcoal-900 md:block">
        <div className="p-6">
          <p className="font-display text-xl text-stone-50">
            <span className="text-olive-400">HOBB</span> <span className="text-ember-500">Admin</span>
          </p>
          <p className="mt-1 text-xs text-stone-400">{admin?.name}</p>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ember-500/15 text-ember-400' : 'text-stone-300 hover:bg-charcoal-800'
                }`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-stone-300 hover:bg-charcoal-800"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
