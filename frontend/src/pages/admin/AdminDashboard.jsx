import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaCalendarAlt, FaEnvelope, FaShoppingBag } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ menu: 0, reservations: 0, orders: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/menu', { token }),
      api.get('/reservations', { token }),
      api.get('/orders', { token }),
      api.get('/contact', { token }),
    ])
      .then(([menu, reservations, orders, messages]) => {
        setStats({
          menu: menu.length,
          reservations: reservations.filter((r) => r.status === 'PENDING').length,
          orders: orders.filter((o) => o.status === 'PENDING').length,
          messages: messages.filter((m) => !m.isRead).length,
        });
      })
      .catch(() => {});
  }, [token]);

  const cards = [
    { label: 'Menu Items', value: stats.menu, icon: FaUtensils, to: '/admin/menu' },
    { label: 'Pending Reservations', value: stats.reservations, icon: FaCalendarAlt, to: '/admin/reservations' },
    { label: 'Pending Orders', value: stats.orders, icon: FaShoppingBag, to: '/admin/orders' },
    { label: 'Unread Messages', value: stats.messages, icon: FaEnvelope, to: '/admin/contact' },
  ];

  return (
    <AdminLayout>
      <h1 className="mb-8 font-display text-3xl text-stone-50">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="card p-6 transition-colors hover:border-ember-500/50">
            <Icon className="mb-3 text-2xl text-ember-400" />
            <p className="text-3xl font-display text-stone-50">{value}</p>
            <p className="mt-1 text-sm text-stone-400">{label}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
