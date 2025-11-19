// @components/Newsletter.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    // Section with a light gray background
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-xl">

        {/* Section Title */}
        <h2 className="text-2xl font-thin text-center uppercase tracking-widest text-gray-900 mb-8">
          UNLOCK FREE SHIPPING
        </h2>
        
        {/* Description Text */}
        <p className="text-lg font-light text-gray-600">
          Join our newsletter for exclusive updates, new drops, and free shipping on your next order. Be the first to know.
        </p>

        {/* Floating Label Form (Req 2) */}
        <form className="mt-10">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-300 rounded-lg peer placeholder-transparent focus:outline-none focus:border-gray-900"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-300 ease-in-out 
                         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                         peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-900 peer-focus:px-1 peer-focus:bg-gray-50
                         peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-gray-900 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-50"
            >
              Email
            </label>
            <button
              type="submit"
              className="group absolute top-0 right-0 h-full px-5 py-4 flex items-center"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5 text-gray-700 icon-nudge" />
            </button>
          </div>
        </form>
        
      </div>
    </section>
  );
}