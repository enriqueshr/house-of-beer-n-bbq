import React from 'react';
import { FaFire, FaBeer, FaUsers } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';

export default function About() {
  return (
    <div className="bg-charcoal-950">
      {/* Story hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-warm-radial" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
          <SectionHeading eyebrow="Our Story" title="Built on Fire," accent="Family & Beer" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-300">
            The House of Beer N' BBQ started with a simple idea: great smoked meat and cold beer taste
            better shared. What began as backyard cookouts among friends turned into a full-blown
            obsession with low-and-slow barbecue, eventually landing us in a space we could call
            home — exposed stone, black steel, and warm string lights included.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 md:grid-cols-2 md:px-8">
          <div className="aspect-[4/3] rounded-lg border border-charcoal-700 bg-charcoal-800" />
          <div>
            <h3 className="mb-4 font-display text-3xl text-stone-50">
              Meet the <span className="text-ember-500">Founders</span>
            </h3>
            <p className="mb-4 text-stone-300">
              We're a family of pitmasters and brewers who believe hospitality means treating every
              guest like they just walked into our backyard. Every rack of ribs is dry-rubbed by hand,
              every brisket rests for hours, and every pour comes from a beer we'd happily drink
              ourselves.
            </p>
            <p className="text-stone-300">
              After years of pop-ups, festivals, and word-of-mouth lines out the door, we opened our
              doors for good — bringing the smoke, the taps, and the community together under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Atmosphere */}
      <section className="bg-charcoal-900 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionHeading eyebrow="The Vibe" title="Rustic Roots," accent="Upscale Comfort" />
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: FaFire, title: 'The Pit', desc: 'Watch our smokers work through the open kitchen window.' },
              { icon: FaBeer, title: 'The Bar', desc: 'A rotating tap list poured beneath warm pendant lighting.' },
              { icon: FaUsers, title: 'The Room', desc: 'Exposed stone walls and black metal paneling for a cozy, communal feel.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-olive-400/10 text-2xl text-olive-400">
                  <Icon />
                </div>
                <h4 className="mb-2 font-display text-xl text-stone-50">{title}</h4>
                <p className="text-stone-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
