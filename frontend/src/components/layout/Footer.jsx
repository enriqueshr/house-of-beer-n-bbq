import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaBeer, FaPhone, FaClock } from 'react-icons/fa';
import Logo from './Logo';
import { BUSINESS } from '../../config/business';

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <span className="font-display text-lg">
              <span className="text-olive-400">THE HOUSE OF</span>{' '}
              <span className="text-ember-500">BEER N' BBQ</span> <FaBeer className="inline text-ember-400" />
            </span>
          </div>
          <p className="text-sm text-stone-300">
            Modern-rustic gastropub serving slow-smoked BBQ and craft beer in a warm, welcoming space.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-stone-50">Quick Links</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li><Link to="/menu" className="hover:text-olive-400">Menu</Link></li>
            <li><Link to="/reservations" className="hover:text-olive-400">Reservations</Link></li>
            <li><Link to="/order" className="hover:text-olive-400">Order Online</Link></li>
            <li><Link to="/about" className="hover:text-olive-400">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-olive-400">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-stone-50">Hours</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li className="flex items-center gap-2"><FaClock className="text-ember-400" /> Mon-Thu: 4pm - 10pm</li>
            <li className="flex items-center gap-2"><FaClock className="text-ember-400" /> Fri-Sat: 12pm - 12am</li>
            <li className="flex items-center gap-2"><FaClock className="text-ember-400" /> Sun: 12pm - 9pm</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-stone-50">Get In Touch</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li className="flex items-center gap-2"><FaPhone className="text-ember-400" /> {BUSINESS.phone}</li>
          </ul>
          <div className="mt-4 flex gap-4 text-xl text-stone-300">
            <FaFacebook title={BUSINESS.socials.facebook} />
            <FaInstagram title={BUSINESS.socials.instagram} />
            <FaTiktok title={BUSINESS.socials.tiktok} />
          </div>
          <p className="mt-2 text-xs text-stone-500">Find us as "{BUSINESS.socials.facebook}"</p>
        </div>
      </div>
      <div className="border-t border-charcoal-800 py-5 text-center text-xs text-stone-400">
        &copy; {new Date().getFullYear()} The House of Beer N' BBQ. All rights reserved.
      </div>
    </footer>
  );
}
