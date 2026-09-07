import React, { useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';

const MENU_PAGES = [
  '/images/menu/page-1.jpg',
  '/images/menu/page-2.jpg',
  '/images/menu/page-3.jpg',
  '/images/menu/page-4.jpg',
  '/images/menu/page-5.jpg',
  '/images/menu/page-6.jpg',
];

export default function Menu() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <SectionHeading eyebrow="Straight From the Kitchen" title="Our" accent="Menu" />
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-stone-400">
          Tap any page to zoom in and read the full details.
        </p>

        <div className="mt-14 space-y-8">
          {MENU_PAGES.map((src, idx) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="group relative block w-full overflow-hidden rounded-lg border border-stone-700/30 shadow-lg transition-all hover:border-ember-500/50 hover:shadow-glow"
            >
              <img
                src={src}
                alt={`Menu page ${idx + 1}`}
                loading="lazy"
                className="w-full"
              />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-950/70 text-stone-100 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <FaSearchPlus size={14} />
              </span>
              <span className="absolute bottom-3 left-3 rounded-full bg-charcoal-950/70 px-3 py-1 text-xs text-stone-300 backdrop-blur-sm">
                Page {idx + 1} of {MENU_PAGES.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] overflow-auto bg-charcoal-950/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Menu page enlarged"
            className="mx-auto max-w-full rounded-lg border border-charcoal-700"
          />
        </div>
      )}
    </div>
  );
}
