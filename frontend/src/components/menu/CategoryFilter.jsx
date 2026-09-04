import React from 'react';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all ${
            active === cat.value
              ? 'border-ember-500 bg-ember-500 text-white shadow-glow'
              : 'border-charcoal-600 text-stone-300 hover:border-emerald-400 hover:text-emerald-400'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
