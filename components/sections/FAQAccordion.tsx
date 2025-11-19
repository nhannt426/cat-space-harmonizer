'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex justify-between items-center w-full text-left font-semibold text-gray-900"
          >
            <span>{item.question}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`} strokeWidth={1.5} />
          </button>
          <div className={`transition-all duration-300 overflow-hidden ${activeIndex === index ? 'max-h-screen mt-4' : 'max-h-0'}`}>
            <p className="text-gray-600 font-light">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}