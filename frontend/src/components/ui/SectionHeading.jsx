import React from 'react';

export default function SectionHeading({ eyebrow, title, accent, subtitle, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : ''}>
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-ember-400">{eyebrow}</p>
      )}
      <h2 className="section-heading">
        {title} {accent && <span className="section-heading-accent">{accent}</span>}
      </h2>
      {subtitle && <p className="mt-4 text-stone-300">{subtitle}</p>}
    </div>
  );
}
