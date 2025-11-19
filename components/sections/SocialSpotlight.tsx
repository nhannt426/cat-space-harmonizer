// @components/SocialSpotlight.tsx
import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

// Sample data for the IG grid
const socialImages = [
  { slug: "post-1", imageUrl: "https://placehold.co/600x600/f0f0f0/333?text=IG+Post+1" },
  { slug: "post-2", imageUrl: "https://placehold.co/600x600/e0e0e0/333?text=IG+Post+2" },
  { slug: "post-3", imageUrl: "https://placehold.co/600x600/d0d0d0/333?text=IG+Post+3" },
  { slug: "post-4", imageUrl: "https://placehold.co/600x600/c0c0c0/333?text=IG+Post+4" },
];

export default function SocialSpotlight() {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="flex justify-center items-center mb-12">
          <h2 className="text-2xl font-thin text-center uppercase tracking-widest text-gray-900">
            SEEN IN THE WILD
          </h2>
          {/* Icon with accent color, as discussed */}
          <Instagram className="h-6 w-6 ml-3 text-[#EC7D8F]" strokeWidth={1.5} />
        </div>

        {/* Description Text */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-lg font-light text-gray-600">
            Spotted wearing a Hard Meme in public?
          </p>
          <p className="mt-4 text-base font-light text-gray-500">
            Tag us{" "}
            <a href="https://instagram.com/hardmeme" target="_blank" className="font-semibold text-gray-900 hover:underline">
              @hardmeme
            </a>
            {" "}on IG and use{" "}
            <span className="font-semibold text-gray-900">#hardmeme</span>.
            Get a personal discount and a chance to shine on our website.
          </p>
        </div>

        {/* 4-Column Image Grid (Req 1) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
          {socialImages.map((post) => (
            <Link 
              key={post.slug} 
              href={`/social/${post.slug}`}
              className="group block relative overflow-hidden rounded-lg"
            >
              <img
                src={post.imageUrl}
                alt="Instagram post highlight"
                className="w-full h-auto object-cover aspect-square subtle-lift"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="h-12 w-12 text-white" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}