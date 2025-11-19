'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    setTimeout(() => {
      // Simulate a random success or error for demonstration
      const isSuccess = Math.random() > 0.2; // 80% chance of success

      if (isSuccess) {
        setSubmitStatus('success');
        // Reset form on success
        setName('');
        setEmail('');
        setPhone('');
        setComment('');
      } else {
        setSubmitStatus('error');
      }

      setIsSubmitting(false);
    }, 2000);
  };

  const inputStyle = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          placeholder="Email *"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Phone number</label>
        <input
          type="tel"
          placeholder="Phone number"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="comment" className="sr-only">Comment</label>
        <textarea
          placeholder="Comment"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={inputStyle}
        />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
        <div className="text-sm">
          {submitStatus === 'success' && (
            <p className="text-green-600 font-semibold">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 font-semibold">Error sending message. Please try again.</p>
          )}
        </div>
      </div>
    </form>
  );
}