import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import { api } from '../api/client';
import { BUSINESS } from '../config/business';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };
const MAP_SRC =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_SRC ||
  'https://www.google.com/maps?q=123+Smokehouse+Ave&output=embed';

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Get In Touch" title="Contact" accent="Us" />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info + Map */}
          <div className="space-y-8">
            <div className="card space-y-5 p-8">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-xl text-ember-400" />
                <div>
                  <p className="font-semibold text-stone-50">Address</p>
                  <p className="text-stone-300">123 Smokehouse Ave, Your City, ST 00000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaPhone className="mt-1 text-xl text-ember-400" />
                <div>
                  <p className="font-semibold text-stone-50">Phone</p>
                  <p className="text-stone-300">{BUSINESS.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="mt-1 text-xl text-ember-400" />
                <div>
                  <p className="font-semibold text-stone-50">Email</p>
                  <p className="text-stone-300">hello@houseofbeernbbq.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaClock className="mt-1 text-xl text-ember-400" />
                <div>
                  <p className="font-semibold text-stone-50">Hours</p>
                  <p className="text-stone-300">Mon-Thu 4pm-10pm &middot; Fri-Sat 12pm-12am &middot; Sun 12pm-9pm</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2 text-xl text-stone-300">
                <FaFacebook title={BUSINESS.socials.facebook} />
                <FaInstagram title={BUSINESS.socials.instagram} />
                <FaTiktok title={BUSINESS.socials.tiktok} />
                <span className="text-xs text-stone-500">Find us as "{BUSINESS.socials.facebook}"</span>
              </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg border border-charcoal-700">
              <iframe
                title="Restaurant location map"
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="card p-8">
            {status === 'success' ? (
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-6 text-center text-emerald-300">
                Thanks for reaching out! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="name">Name</label>
                    <input id="name" name="name" required className="input-field" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="input-field" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="phone">Phone (optional)</label>
                    <input id="phone" name="phone" className="input-field" value={form.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="subject">Subject (optional)</label>
                    <input id="subject" name="subject" className="input-field" value={form.subject} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="label-field" htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={5} className="input-field resize-none" value={form.message} onChange={handleChange} />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-ember-400">{error || 'Something went wrong. Please try again.'}</p>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
