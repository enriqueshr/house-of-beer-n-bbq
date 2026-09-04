import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import { api } from '../api/client';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  partySize: 2,
  specialRequests: '',
};

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function Reservations() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'partySize' ? Number(value) : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await api.post('/reservations', form);
      setStatus('success');
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
          <h2 className="mb-3 font-display text-3xl text-stone-50">Reservation Requested!</h2>
          <p className="mb-6 text-stone-300">
            We've sent a confirmation to your email. Our team will follow up shortly to confirm your table.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-primary">Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <SectionHeading eyebrow="Book Your Table" title="Make a" accent="Reservation" />

        <form onSubmit={handleSubmit} className="card mt-14 space-y-5 p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="name">Full Name</label>
              <input id="name" name="name" required className="input-field" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label className="label-field" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" required className="input-field" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="input-field" value={form.email} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label className="label-field" htmlFor="date">Date</label>
              <input id="date" name="date" type="date" min={todayISO()} required className="input-field" value={form.date} onChange={handleChange} />
            </div>
            <div>
              <label className="label-field" htmlFor="time">Time</label>
              <select id="time" name="time" required className="input-field" value={form.time} onChange={handleChange}>
                <option value="">Select time</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label-field" htmlFor="partySize">Party Size</label>
              <input id="partySize" name="partySize" type="number" min={1} max={30} required className="input-field" value={form.partySize} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="specialRequests">Special Requests (optional)</label>
            <textarea id="specialRequests" name="specialRequests" rows={4} className="input-field resize-none" value={form.specialRequests} onChange={handleChange} placeholder="Allergies, celebrations, seating preferences..." />
          </div>

          {status === 'error' && (
            <p className="text-sm text-ember-400">{error || 'Something went wrong. Please try again.'}</p>
          )}

          <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
            {status === 'submitting' ? 'Submitting...' : 'Request Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
}
