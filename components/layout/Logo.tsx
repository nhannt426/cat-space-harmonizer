import React from 'react';
import Link from 'next/link';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
    // Kích thước chữ CATFACTS.STORE (to, mảnh)
    const mainTextSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-xl' : 'text-xl'; 

    return (
        <Link 
            href="/" 
            // items-center đảm bảo Icon và Text căn giữa dọc
            className="flex items-center leading-none group hover:opacity-80 transition duration-150"
        > 
            <span 
                className={`text-gray-900 tracking-widest uppercase ${mainTextSize} whitespace-nowrap`}
                style={{ fontWeight: 300, letterSpacing: '0.25em' }} // Tăng Letter Spacing cho phong cách tối giản
            >
                HARD MEME
            </span>
        </Link>
    );
}