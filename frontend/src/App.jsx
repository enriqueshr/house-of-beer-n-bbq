import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import Order from './pages/Order';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminReservations from './pages/admin/AdminReservations';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContact from './pages/admin/AdminContact';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/menu" element={<Layout><Menu /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
      <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/order" element={<Layout><Order /></Layout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/menu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
      <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservations /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
      <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
              <h1 className="mb-4 font-display text-5xl text-ember-500">404</h1>
              <p className="text-stone-300">Looks like this page got smoked. Head back home.</p>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}
