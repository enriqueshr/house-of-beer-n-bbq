import React from 'react';
import { FaBeer } from 'react-icons/fa';

export default function Wordmark({ className = '', showIcon = true }) {
  return (
    <span className={`font-brand ${className}`}>
      <span className="text-shine-emerald">THE HOUSE OF</span>{' '}
      <span className="text-shine-ember">BEER</span>{' '}
      <span className="text-shine-emerald">N'</span>{' '}
      <span className="text-shine-ember">BBQ</span>
      {showIcon && <FaBeer className="ml-1.5 inline text-ember-400" />}
    </span>
  );
}
