import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaCalendarAlt, FaShoppingBag, FaBeer, FaFire, FaClock, FaEnvelope } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import { FEATURES } from '../config/features';

const HOURS = [
  { day: 'Monday - Thursday', time: '4:00 PM - 10:00 PM' },
  { day: 'Friday - Saturday', time: '12:00 PM - 12:00 AM' },
  { day: 'Sunday', time: '12:00 PM - 9:00 PM' },
];

const HIGHLIGHTS = [
  { icon: FaFire, title: 'Slow-Smoked BBQ', desc: '14-hour brisket, fall-off-the-bone ribs, all smoked in-house daily.' },
  { icon: FaBeer, title: 'Craft Beer on Tap', desc: 'Rotating local drafts alongside our house-brewed lager and amber ale.' },
  { icon: FaUtensils, title: 'Warm Atmosphere', desc: 'Exposed stone, warm string lighting, black metal accents — rustic meets upscale.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-charcoal-950">
        <div className="absolute inset-0 bg-warm-radial" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(15,13,12,0.55), rgba(15,13,12,0.4) 45%, rgba(15,13,12,0.97)), url(/images/storefront-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-8">
          <h1 className="font-brand text-5xl leading-tight tracking-wide [text-shadow:0_4px_24px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-shine-emerald">THE HOUSE OF</span>
            <br />
            <span className="text-shine-ember">BEER</span> <span className="text-shine-emerald">N'</span>{' '}
            <span className="text-shine-ember">BBQ</span> <FaBeer className="inline text-ember-400" />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-200 md:text-xl">
            Slow-smoked meats, cold craft beer, and warm string lights — pull up a seat.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {FEATURES.orderOnline && (
              <Link to="/order" className="btn-primary w-full sm:w-auto">
                <FaShoppingBag /> Order Online
              </Link>
            )}
            {FEATURES.reservations && (
              <Link to="/reservations" className="btn-secondary w-full sm:w-auto">
                <FaCalendarAlt /> Reserve a Table
              </Link>
            )}
            <Link to="/menu" className="btn-outline w-full sm:w-auto">
              <FaUtensils /> View Menu
            </Link>
          </div>

          <div className="mt-12 inline-flex items-center gap-2 rounded-md border border-charcoal-700 bg-charcoal-900/70 px-5 py-3 text-sm text-stone-200">
            <FaClock className="text-ember-400" />
            <span>Open today: {HOURS[0].time.split(' - ')[0]} - late &middot; See full hours below</span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-charcoal-950 bg-stone-texture py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="Why We're Different" title="Fire, Smoke &" accent="Good Company" />
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card group p-8 transition-all hover:border-ember-500/50 hover:shadow-glow">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/10 text-2xl text-ember-400 transition-colors group-hover:bg-ember-500/20">
                  <Icon />
                </div>
                <h3 className="mb-2 text-xl font-display text-stone-50">{title}</h3>
                <p className="text-stone-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + CTA banner */}
      <section className="relative overflow-hidden bg-charcoal-900 py-20">
        <div className="absolute inset-0 bg-warm-radial opacity-60" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <SectionHeading eyebrow="Hours" title="Come" accent="Hungry" center={false} />
            <div className="mt-8 space-y-4">
              {HOURS.map((h) => (
                <div key={h.day} className="flex items-center justify-between border-b border-charcoal-700 pb-3">
                  <span className="font-semibold text-stone-100">{h.day}</span>
                  <span className="text-stone-300">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center rounded-lg border border-charcoal-700 bg-charcoal-950/60 p-8">
            <h3 className="mb-3 font-display text-3xl text-stone-50">
              Ready for the <span className="text-ember-500">full smoke experience?</span>
            </h3>
            <p className="mb-6 text-stone-300">
              {FEATURES.reservations || FEATURES.orderOnline
                ? 'Book a table for your next gathering or order our BBQ straight to your door.'
                : 'Check out the full menu, or stop by and see us in person.'}
            </p>
            <div className="flex flex-wrap gap-4">
              {FEATURES.reservations && <Link to="/reservations" className="btn-primary">Reserve a Table</Link>}
              {FEATURES.orderOnline && <Link to="/order" className="btn-secondary">Order Online</Link>}
              {!FEATURES.reservations && !FEATURES.orderOnline && (
                <>
                  <Link to="/menu" className="btn-primary">View Menu</Link>
                  <Link to="/contact" className="btn-secondary"><FaEnvelope /> Contact Us</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
