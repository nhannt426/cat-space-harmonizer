// @components/MobileMenu.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Search,
  ShoppingBag,
  Instagram
} from 'lucide-react';
import Logo from './Logo';

// Dữ liệu SHOP (Giữ nguyên)
const shopLinks = [
  { name: 'APPAREL', href: '/' },
  { name: 'ACCESSORIES', href: '/collections/accessories' },
  { name: 'SALE', href: '/sale' },
];

// 2. Rút gọn link Help
const helpLinks = [
  { name: 'Shipping Info', href: '/pages/shipping-info' },
  { name: 'Returns & Refunds', href: '/policies/refund-policy' },
  { name: 'Get In Touch', href: '/pages/contact' },
];

// 2. Rút gọn link About
const aboutLinks = [
  { name: 'We are HARD MEME', href: '/about' },
  { name: 'INSIDE JOKES', href: '/blog' },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  
  const iconStyle = "p-2 rounded-full text-gray-900 hover:opacity-80 subtle-lift"; 

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div 
        className={`relative flex flex-col w-full max-w-md h-full bg-white shadow-xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* === 1. Header Mới (Bug 1 Fix) === */}
        <div className="flex justify-between items-center h-16 p-4 border-b border-gray-100 flex-shrink-0">
          {/* Cột Trái: Nút X */}
          <div className="flex justify-start">
            <button 
              onClick={onClose} 
              className={iconStyle}
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
          </div>
          {/* Cột Giữa: Logo */}
          <div className="flex flex-1 justify-center">
            <Logo size="sm" />
          </div>
          {/* Cột Phải: Search & Cart */}
          <div className="flex items-center justify-end space-x-2">
            <button className={`${iconStyle}`}>
                <Search className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className={`relative ${iconStyle}`}
              onClick={onClose}
            >
                <ShoppingBag className="h-5 w-5" />
                {/* (Bạn có thể thêm logic cartCount ở đây nếu muốn) */}
            </Link>
          </div>
        </div>

        {/* Nội dung cuộn (nếu cần) và chứa 2 panel */}
        <div className="flex-1 relative overflow-hidden">
        
          {/* Panel 1: Main Menu */}
          <div className="flex flex-col h-full">
            {/* Phần SHOP (Nền trắng) */}
            <div className="p-4">
              {shopLinks.map((link) => (
                <MobileMenuItem 
                  key={link.name} 
                  href={link.href}
                  onClick={onClose}
                >
                  {link.name}
                </MobileMenuItem>
              ))}
            </div>

            {/* === 3. Khu vực Nền Xám (Bug 3 & 4 Fix) === */}
            <div className="mt-auto p-4 bg-gray-100 border-t border-gray-200">
              {/* Mục HELP */}
              {helpLinks.map((link) => (
                <MobileMenuItem 
                  key={link.name} 
                  href={link.href}
                  onClick={onClose}
                  isSubtle={true} // Style chữ nhỏ hơn
                >
                  {link.name}
                </MobileMenuItem>
              ))}
              
              {/* Mục ABOUT */}
              {aboutLinks.map((link) => (
                <MobileMenuItem 
                  key={link.name} 
                  href={link.href}
                  onClick={onClose}
                  isSubtle={true} // Style chữ nhỏ hơn
                >
                  {link.name}
                </MobileMenuItem>
              ))}

              {/* === 4. Social Icons === */}
              <div className="flex items-center space-x-4 p-4 mt-2">
                <Link href="https://instagram.com/..." target="_blank" className="subtle-lift" onClick={onClose}>
                  <Instagram className="h-6 w-6 text-[#EC7D8F]" strokeWidth={1.5} />
                </Link>
                <Link href="https://wa.me/..." target="_blank" className="subtle-lift" onClick={onClose}>
                  <svg
                    className="h-6 w-6 text-[#EC7D8F]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={0}
                    aria-label="WhatsApp"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.32 20.58C8.77 21.36 10.37 21.8 12.04 21.8C17.5 21.8 21.95 17.35 21.95 11.89C21.95 6.43 17.5 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.9C20.28 16.41 16.56 20.13 12.04 20.13C10.49 20.13 9 19.7 7.72 18.96L7.29 18.7L3.6 19.74L4.65 16.22L4.39 15.77C3.57 14.38 3.8 12.79 3.8 11.91C3.8 7.39 7.52 3.67 12.04 3.67M17.43 14.86C17.21 14.75 16.03 14.19 15.82 14.11C15.61 14.03 15.45 13.99 15.29 14.2C15.14 14.42 14.67 14.97 14.53 15.12C14.39 15.28 14.25 15.3 14.03 15.19C13.82 15.08 12.96 14.82 11.93 13.9C11.11 13.17 10.56 12.29 10.42 12.08C10.27 11.86 10.39 11.74 10.5 11.63C10.6 11.52 10.73 11.35 10.87 11.2C11 11.05 11.07 10.94 11.19 10.77C11.31 10.6 11.23 10.45 11.15 10.28C11.07 10.11 10.53 8.8 10.32 8.33C10.11 7.86 9.9 7.94 9.75 7.93C9.6 7.92 9.45 7.92 9.29 7.92C9.14 7.92 8.89 7.97 8.68 8.18C8.47 8.4 7.97 8.85 7.97 9.78C7.97 10.71 8.69 11.6 8.8 11.75C8.92 11.91 10.33 14.23 12.58 15.13C14.83 16.03 15.42 15.73 15.82 15.68C16.21 15.63 17.02 15.19 17.23 14.97C17.44 14.75 17.44 14.6 17.43 14.5Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Component Item Link (Update với prop 'isSubtle')
function MobileMenuItem({
  href,
  children,
  onClick,
  isSubtle = false // Prop mới
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isSubtle?: boolean; // Prop mới
}) {
  const content = (
    <span 
      className={`flex items-center justify-between w-full rounded-lg 
        ${onClick ? 'cursor-pointer' : ''}
        ${'' /* Req 4: Hiệu ứng hover */}
        hover:bg-gray-200 transition-colors duration-150
        ${'' /* Style chữ (Req 2/3) */}
        ${isSubtle 
            ? 'p-2 text-sm font-light text-gray-600' // Chữ nhỏ cho Help/About
            : 'p-4 text-lg font-light text-gray-900' // Chữ to cho Shop
        }
      `}
      onClick={onClick}
    >
      {children}
    </span>
  );

  return <Link href={href} onClick={onClick}>{content}</Link>;
}