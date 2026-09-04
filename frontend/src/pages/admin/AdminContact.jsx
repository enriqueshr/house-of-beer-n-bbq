import React, { useEffect, useState } from 'react';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function AdminContact() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/contact', { token }).then(setSubmissions).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function markRead(id) {
    await api.patch(`/contact/${id}/read`, {}, { token });
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    await api.del(`/contact/${id}`, { token });
    load();
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 font-display text-3xl text-stone-50">Messages</h1>
      {loading ? (
        <p className="text-stone-400">Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-stone-400">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div key={s.id} className={`card p-5 ${!s.isRead ? 'border-ember-500/50' : ''}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-100">
                    {s.name} {!s.isRead && <span className="ml-2 rounded-full bg-ember-500/20 px-2 py-0.5 text-xs text-ember-400">New</span>}
                  </p>
                  <p className="text-sm text-stone-400">{s.email} {s.phone && `· ${s.phone}`}</p>
                  {s.subject && <p className="text-sm text-stone-400">Subject: {s.subject}</p>}
                </div>
                <div className="flex gap-3">
                  {!s.isRead && (
                    <button onClick={() => markRead(s.id)} className="text-stone-300 hover:text-olive-400" title="Mark as read">
                      <FaEnvelopeOpen />
                    </button>
                  )}
                  <button onClick={() => handleDelete(s.id)} className="text-stone-300 hover:text-ember-500" title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-stone-300">{s.message}</p>
              <p className="mt-2 text-xs text-stone-500">{new Date(s.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
