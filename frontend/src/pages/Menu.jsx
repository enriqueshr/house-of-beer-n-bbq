import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import SectionHeading from '../components/ui/SectionHeading';
import CategoryFilter from '../components/menu/CategoryFilter';
import MenuCard from '../components/menu/MenuCard';

const CATEGORIES = [
  { value: 'ALL', label: 'All' },
  { value: 'APPETIZERS', label: 'Appetizers' },
  { value: 'BBQ_MAINS', label: 'BBQ Mains' },
  { value: 'BEER_DRINKS', label: 'Beer & Drinks' },
  { value: 'SIDES', label: 'Sides' },
  { value: 'DESSERTS', label: 'Desserts' },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get('/menu')
      .then((data) => {
        if (!cancelled) setItems(data.filter((i) => i.isAvailable !== false));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (activeCategory === 'ALL' ? items : items.filter((i) => i.category === activeCategory)),
    [items, activeCategory]
  );

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="bg-charcoal-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Straight From the Smoker" title="Our" accent="Menu" />

        <div className="mt-10 mb-14">
          <CategoryFilter categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
        </div>

        {loading && (
          <div className="py-20 text-center text-stone-400">Loading menu...</div>
        )}

        {error && (
          <div className="mx-auto max-w-md rounded-md border border-ember-700 bg-ember-900/20 p-6 text-center text-ember-300">
            Couldn't load the menu right now ({error}). Please try again shortly.
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center text-stone-400">No items in this category yet.</div>
        )}

        {!loading &&
          !error &&
          Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h3 className="mb-6 font-display text-2xl text-olive-400">
                {CATEGORIES.find((c) => c.value === category)?.label || category}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {categoryItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
