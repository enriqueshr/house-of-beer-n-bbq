import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function MenuCard({ item, showAddToCart = false }) {
  const { addItem } = useCart();

  return (
    <div className="card group flex flex-col overflow-hidden transition-all hover:border-ember-500/50 hover:shadow-glow">
      {item.imageUrl && (
        <div className="h-48 w-full overflow-hidden bg-charcoal-800">
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-stone-50">{item.name}</h3>
          <span className="whitespace-nowrap font-display text-xl text-ember-400">
            ${Number(item.price).toFixed(2)}
          </span>
        </div>
        <p className="flex-1 text-sm text-stone-300">{item.description}</p>
        {showAddToCart && (
          <button
            onClick={() => addItem(item)}
            className="btn-outline mt-4 !py-2 text-sm"
          >
            <FaShoppingBag /> Add to Order
          </button>
        )}
      </div>
    </div>
  );
}
