'use client';

import React from 'react';
import Link from 'next/link';

export default function HeaderMenu() {
  const navLinks = [
    { name: 'APPAREL', href: '/' },
    { name: 'ACCESSORIES', href: '/collections/accessories' },
    { name: 'SALE', href: '/sale' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <nav className="hidden lg:block w-full bg-white z-30 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-12">
        <div className="flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center text-sm font-light text-gray-500 hover:text-gray-900 hover:underline uppercase transition-colors duration-200 tracking-[0.1em]"
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}