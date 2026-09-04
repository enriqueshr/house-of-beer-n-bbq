import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaBeer } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import Logo from './Logo';
import { FEATURES } from '../../config/features';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  ...(FEATURES.reservations ? [{ to: '/reservations', label: 'Reservations' }] : []),
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold uppercase tracking-wide transition-colors ${
      isActive ? 'text-ember-400' : 'text-stone-200 hover:text-olive-400'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-charcoal-950/95 shadow-lg backdrop-blur-md' : 'bg-charcoal-950/70 backdrop-blur-sm'
      } border-b border-charcoal-800`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-11 w-11 md:h-14 md:w-14" />
          <span className="hidden font-display text-xl leading-tight sm:block md:text-2xl">
            <span className="text-olive-400">THE HOUSE OF</span>{' '}
            <span className="text-ember-500">BEER N' BBQ</span>{' '}
            <FaBeer className="ml-1 inline text-ember-400" />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {(FEATURES.orderOnline || FEATURES.reservations) && (
          <div className="hidden items-center gap-3 lg:flex">
            {FEATURES.orderOnline && (
              <Link to="/order" className="relative btn-outline !px-4 !py-2 text-sm">
                Order Online
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ember-500 text-xs font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>
            )}
            {FEATURES.reservations && (
              <Link to="/reservations" className="btn-primary !px-4 !py-2 text-sm">
                Reserve a Table
              </Link>
            )}
          </div>
        )}

        <button
          className="text-2xl text-stone-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-charcoal-800 bg-charcoal-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {(FEATURES.orderOnline || FEATURES.reservations) && (
              <div className="mt-2 flex flex-col gap-3">
                {FEATURES.orderOnline && (
                  <Link to="/order" className="btn-outline" onClick={() => setOpen(false)}>
                    Order Online {count > 0 && `(${count})`}
                  </Link>
                )}
                {FEATURES.reservations && (
                  <Link to="/reservations" className="btn-primary" onClick={() => setOpen(false)}>
                    Reserve a Table
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
