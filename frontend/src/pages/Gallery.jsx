import React, { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';

const GALLERY_IMAGES = [
  { src: '/images/gallery/exterior-1.jpg', alt: 'Storefront exterior at dusk', category: 'Exterior' },
  { src: '/images/gallery/food-1.jpg', alt: 'Spiced grilled chicken bites with tomato dip', category: 'Food' },
  { src: '/images/gallery/food-2.jpg', alt: 'Grilled sausage and mushroom sizzler', category: 'Food' },
  { src: '/images/gallery/food-3.jpg', alt: 'Spicy chicken with charred onions', category: 'Food' },
  { src: '/images/gallery/food-4.jpg', alt: 'Chicken tikka skewers with green chutney', category: 'Food' },
  { src: '/images/gallery/food-5.jpg', alt: 'Fried rice bowl and chicken skewers', category: 'Food' },
  { src: '/images/gallery/food-6.jpg', alt: 'Chicken skewers with pickled onion', category: 'Food' },
  { src: '/images/gallery/food-7.jpg', alt: 'Chili chicken with bell peppers', category: 'Food' },
  { src: '/images/gallery/food-8.jpg', alt: 'Crispy spiced chicken bites', category: 'Food' },
  { src: '/images/gallery/food-9.jpg', alt: 'Golden fried chicken platter', category: 'Food' },
  { src: '/images/gallery/food-10.jpg', alt: 'Grilled chicken with lime and dip', category: 'Food' },
  { src: '/images/gallery/food-11.jpg', alt: 'Chili chicken stir-fry with herbs', category: 'Food' },
  { src: '/images/gallery/food-12.jpg', alt: 'Chicken sekuwa with peanut sauce', category: 'Food' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Take a Look Inside" title="Photo" accent="Gallery" />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setLightbox(img)}
              className="group aspect-square overflow-hidden rounded-lg border border-charcoal-700 bg-charcoal-800"
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
