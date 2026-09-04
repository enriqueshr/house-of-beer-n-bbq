import React from 'react';

export default function Logo({ className = 'h-12 w-12' }) {
  return (
    <img
      src="/images/logo.jpg"
      alt="The House of Beer N' BBQ logo"
      className={`rounded-full object-cover ${className}`}
    />
  );
}
