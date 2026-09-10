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
  {
    icon: FaFire,
    title: 'Slow-Smoked BBQ',
    desc: 'Bone-in chicken, dry-rubbed and smoked low and slow until it falls off the bone.',
    image: '/images/slow-smoked-chicken.jpg',
  },
  {
    icon: FaBeer,
    title: 'Craft Beer on Tap',
    desc: 'Rotating local drafts alongside our house-brewed lager and amber ale.',
    image: '/images/craft-beer.jpg',
  },
  {
    icon: FaUtensils,
    title: 'Warm Atmosphere',
    desc: 'Exposed stone, warm string lighting, black metal accents — rustic meets upscale.',
    image: '/images/gallery/exterior-1.jpg',
  },
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
          <h1 className="-mt-3 font-brand text-5xl leading-tight tracking-wide [text-shadow:0_4px_24px_rgba(0,0,0,0.65)] sm:text-6xl md:-mt-5 md:text-7xl lg:text-8xl">
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
      <section className="bg-charcoal-950 bg-stone-texture py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionHeading eyebrow="Why We're Different" title="Fire, Smoke &" accent="Good Company" />

          <div className="mt-16 space-y-20">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc, image }, idx) => (
              <div
                key={title}
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 ${
                  idx % 2 === 1 ? 'md:[direction:rtl]' : ''
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-stone-700/30 bg-charcoal-800 md:[direction:ltr]">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl text-charcoal-600">
                      <Icon />
                    </div>
                  )}
                </div>
                <div className="md:[direction:ltr]">
                  <div className="mb-3 flex items-center gap-3 text-ember-400">
                    <Icon className="text-xl" />
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">0{idx + 1}</span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl text-stone-50 md:text-3xl">{title}</h3>
                  <p className="text-stone-300">{desc}</p>
                </div>
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
