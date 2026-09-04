import React, { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';

const GALLERY_IMAGES = [
  { src: '/images/storefront-hero.jpg', alt: 'Storefront exterior, straight-on view at dusk', category: 'Exterior' },
  { src: '/images/gallery/exterior-1.jpg', alt: 'Storefront exterior, angled view at dusk', category: 'Exterior' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Take a Look Inside" title="Photo" accent="Gallery" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setLightbox(img)}
              className="group aspect-[4/3] overflow-hidden rounded-lg border border-stone-700/30 bg-charcoal-800 shadow-lg transition-all hover:border-ember-500/50 hover:shadow-glow"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  e.currentTarget.insertAdjacentHTML(
                    'afterend',
                    `<span class="px-2 text-center text-xs text-stone-500">${img.category}</span>`
                  );
                }}
              />
            </button>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-stone-500">Interior and food photos coming soon.</p>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-full rounded-lg border border-charcoal-700 object-contain"
          />
        </div>
      )}
    </div>
  );
}
