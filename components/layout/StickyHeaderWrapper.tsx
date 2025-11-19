// @components/StickyHeaderWrapper.tsx
'use client'; // This component must be a Client Component

import React, { useState, useEffect } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu'; // <<< 1. Import component mới

export default function StickyHeaderWrapper() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // <<< 2. Thêm state cho mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logic scroll (Giữ nguyên)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) setIsVisible(true);
      else if (currentScrollY > lastScrollY) setIsVisible(false);
      else setIsVisible(true);

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Đóng menu nếu resize sang desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // 1024px = lg
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // <<< ADD THIS NEW HOOK to lock body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]); // Dependency array

  return (
    <>
      <div 
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <AnnouncementBar />
        {/* <<< 3. Truyền hàm onOpenMenu vào Header */}
        <Header onOpenMenu={() => setIsMobileMenuOpen(true)} />
        <HeaderMenu />
      </div>

      {/* <<< 4. Render Mobile Menu (bên ngoài div sticky) */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}