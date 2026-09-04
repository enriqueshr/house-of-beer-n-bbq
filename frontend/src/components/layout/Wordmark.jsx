import React from 'react';
import { FaBeer } from 'react-icons/fa';

export default function Wordmark({ className = '', showIcon = true }) {
  return (
    <span className={`font-brand ${className}`}>
      <span className="text-olive-400">THE HOUSE OF</span>{' '}
      <span className="text-ember-500">BEER</span>{' '}
      <span className="text-olive-400">N'</span>{' '}
      <span className="text-ember-500">BBQ</span>
      {showIcon && <FaBeer className="ml-1.5 inline text-ember-400" />}
    </span>
  );
}
