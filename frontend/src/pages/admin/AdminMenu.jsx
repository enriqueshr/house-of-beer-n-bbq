import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['APPETIZERS', 'BBQ_MAINS', 'BEER_DRINKS', 'SIDES', 'DESSERTS'];
const emptyForm = { name: '', description: '', price: '', category: 'APPETIZERS', imageUrl: '', isAvailable: true, sortOrder: 0 };

export default function AdminMenu() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  function load() {
    setLoading(true);
    api.get('/menu', { token }).then(setItems).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({ ...item, price: String(item.price) });
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this menu item?')) return;
    await api.del(`/menu/${id}`, { token });
    load();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const payload = { ...form, price: Number(form.price), sortOrder: Number(form.sortOrder) };
      if (editing) {
        await api.put(`/menu/${editing.id}`, payload, { token });
      } else {
        await api.post('/menu', payload, { token });
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-stone-50">Menu Items</h1>
        <button onClick={openCreate} className="btn-primary !px-4 !py-2 text-sm">
          <FaPlus /> Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-stone-400">Loading...</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-700 text-stone-400">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-charcoal-800 last:border-0">
                  <td className="p-4 font-medium text-stone-100">{item.name}</td>
                  <td className="p-4 text-stone-300">{item.category}</td>
                  <td className="p-4 text-stone-300">${Number(item.price).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={item.isAvailable ? 'text-emerald-400' : 'text-stone-500'}>
                      {item.isAvailable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(item)} className="mr-3 text-stone-300 hover:text-emerald-400">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-stone-300 hover:text-ember-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/80 p-4">
          <div className="card w-full max-w-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl text-stone-50">{editing ? 'Edit Item' : 'New Item'}</h2>
              <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-100">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-field">Name</label>
                <input required className="input-field" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="label-field">Description</label>
                <textarea required rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Price</label>
                  <input required type="number" step="0.01" min="0" className="input-field" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="label-field">Category</label>
                  <select className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label-field">Image URL (optional)</label>
                <input className="input-field" value={form.imageUrl || ''} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} />
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="isAvailable"
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
                  className="h-4 w-4 rounded border-charcoal-600 bg-charcoal-800"
                />
                <label htmlFor="isAvailable" className="text-sm text-stone-200">Available on menu</label>
              </div>

              {error && <p className="text-sm text-ember-400">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">{editing ? 'Save Changes' : 'Create Item'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
