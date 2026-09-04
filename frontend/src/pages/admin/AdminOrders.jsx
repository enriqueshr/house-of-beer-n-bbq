import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/orders', { token }).then(setOrders).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status }, { token });
    load();
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 font-display text-3xl text-stone-50">Orders</h1>
      {loading ? (
        <p className="text-stone-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-stone-400">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-100">{order.customerName} &middot; {order.orderType}</p>
                  <p className="text-sm text-stone-400">{order.phone} &middot; {order.email}</p>
                  {order.address && <p className="text-sm text-stone-400">Deliver to: {order.address}</p>}
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="rounded-md border border-charcoal-600 bg-charcoal-800 px-3 py-1.5 text-sm text-stone-200"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <ul className="mb-3 space-y-1 text-sm text-stone-300">
                {order.items.map((i) => (
                  <li key={i.id}>{i.quantity} x {i.name} - ${(i.price * i.quantity).toFixed(2)}</li>
                ))}
              </ul>
              {order.notes && <p className="mb-2 text-sm text-stone-400">Notes: {order.notes}</p>}
              <p className="font-display text-lg text-ember-400">Total: ${Number(order.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
