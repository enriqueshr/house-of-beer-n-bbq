import React from 'react';
import { FaShoppingBag, FaUtensils } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { FEATURES } from '../../config/features';

export default function MenuCard({ item }) {
  const { addItem } = useCart();

  return (
    <div className="card group relative aspect-[4/5] overflow-hidden transition-all hover:border-ember-500/50 hover:shadow-glow">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal-800 text-4xl text-charcoal-600">
          <FaUtensils />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <h3 className="font-display text-xl text-stone-50 [text-shadow:0_2px_6px_rgba(0,0,0,0.6)]">
          {item.name}
        </h3>
        {FEATURES.orderOnline && (
          <button
            onClick={() => addItem(item)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ember-500 text-white shadow-glow transition-transform hover:scale-110"
            aria-label={`Add ${item.name} to order`}
          >
            <FaShoppingBag size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
