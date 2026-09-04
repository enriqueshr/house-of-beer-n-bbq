import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
const STATUS_COLORS = {
  PENDING: 'text-stone-300',
  CONFIRMED: 'text-emerald-400',
  CANCELLED: 'text-ember-500',
  COMPLETED: 'text-stone-400',
};

export default function AdminReservations() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/reservations', { token }).then(setReservations).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.patch(`/reservations/${id}/status`, { status }, { token });
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this reservation?')) return;
    await api.del(`/reservations/${id}`, { token });
    load();
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 font-display text-3xl text-stone-50">Reservations</h1>
      {loading ? (
        <p className="text-stone-400">Loading...</p>
      ) : reservations.length === 0 ? (
        <p className="text-stone-400">No reservations yet.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-700 text-stone-400">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Date / Time</th>
                <th className="p-4">Party</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-b border-charcoal-800 last:border-0 align-top">
                  <td className="p-4 font-medium text-stone-100">{r.name}</td>
                  <td className="p-4 text-stone-300">
                    <div>{r.phone}</div>
                    <div className="text-stone-400">{r.email}</div>
                  </td>
                  <td className="p-4 text-stone-300">
                    <div>{new Date(r.date).toDateString()}</div>
                    <div className="text-stone-400">{r.time}</div>
                  </td>
                  <td className="p-4 text-stone-300">{r.partySize}</td>
                  <td className="p-4">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className={`rounded-md border border-charcoal-600 bg-charcoal-800 px-2 py-1 text-sm ${STATUS_COLORS[r.status]}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(r.id)} className="text-stone-300 hover:text-ember-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
