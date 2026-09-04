import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';
import SectionHeading from '../components/ui/SectionHeading';

const initialForm = { customerName: '', phone: '', email: '', orderType: 'PICKUP', address: '', notes: '' };

export default function Order() {
  const { items, updateQty, removeItem, total, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleCheckout(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await api.post('/orders', {
        ...form,
        items: items.map((i) => ({ menuItemId: i.id, quantity: i.qty })),
      });
      setStatus('success');
      clearCart();
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-charcoal-950 px-4 py-20">
        <div className="card max-w-lg p-10 text-center">
          <FaCheckCircle className="mx-auto mb-5 text-5xl text-olive-400" />
          <h2 className="mb-3 font-display text-3xl text-stone-50">Order Placed!</h2>
          <p className="mb-6 text-stone-300">
            We've received your order and sent a confirmation to your email. We'll reach out shortly.
          </p>
          <Link to="/menu" className="btn-primary">Back to Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="Order Online" title="Your" accent="Cart" />

        {items.length === 0 ? (
          <div className="mt-14 text-center">
            <p className="mb-6 text-stone-300">Your cart is empty. Add some BBQ to get started.</p>
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="card divide-y divide-charcoal-700">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="font-semibold text-stone-50">{item.name}</p>
                      <p className="text-sm text-stone-400">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="rounded-md border border-charcoal-600 p-2 text-stone-300 hover:border-ember-500">
                        <FaMinus size={12} />
                      </button>
                      <span className="w-6 text-center text-stone-50">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="rounded-md border border-charcoal-600 p-2 text-stone-300 hover:border-ember-500">
                        <FaPlus size={12} />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-2 text-ember-500 hover:text-ember-400">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card mt-6 flex items-center justify-between p-5">
                <span className="font-display text-xl text-stone-50">Total</span>
                <span className="font-display text-2xl text-ember-400">${total.toFixed(2)}</span>
              </div>
              <Link to="/menu" className="mt-4 inline-block text-sm text-olive-400 hover:underline">
                &larr; Add more items
              </Link>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleCheckout} className="card space-y-5 p-6">
                <h3 className="font-display text-xl text-stone-50">Checkout Details</h3>
                <div>
                  <label className="label-field" htmlFor="customerName">Full Name</label>
                  <input id="customerName" name="customerName" required className="input-field" value={form.customerName} onChange={handleChange} />
                </div>
                <div>
                  <label className="label-field" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" required className="input-field" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className="label-field" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required className="input-field" value={form.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="label-field">Order Type</label>
                  <div className="flex gap-3">
                    {['PICKUP', 'DELIVERY'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setForm((f) => ({ ...f, orderType: type }))}
                        className={`flex-1 rounded-md border px-4 py-2 text-sm font-semibold ${
                          form.orderType === type
                            ? 'border-ember-500 bg-ember-500 text-white'
                            : 'border-charcoal-600 text-stone-300'
                        }`}
                      >
                        {type === 'PICKUP' ? 'Pickup' : 'Delivery'}
                      </button>
                    ))}
                  </div>
                </div>
                {form.orderType === 'DELIVERY' && (
                  <div>
                    <label className="label-field" htmlFor="address">Delivery Address</label>
                    <input id="address" name="address" required className="input-field" value={form.address} onChange={handleChange} />
                  </div>
                )}
                <div>
                  <label className="label-field" htmlFor="notes">Notes (optional)</label>
                  <textarea id="notes" name="notes" rows={3} className="input-field resize-none" value={form.notes} onChange={handleChange} />
                </div>

                {status === 'error' && <p className="text-sm text-ember-400">{error}</p>}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'submitting' ? 'Placing order...' : `Place Order - $${total.toFixed(2)}`}
                </button>
                <p className="text-center text-xs text-stone-400">
                  Payment collected at pickup/delivery. We'll call to confirm.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
