"use client"; // Add this line at the top

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WaitlistForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Submission error:', err);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Thank you for joining our waitlist!</h2>
        <p>We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white text-black rounded-lg shadow-md border border-black">
      <h1 className="text-3xl font-bold text-center mb-4">RemittEase</h1>
      <h2 className="text-md font-semibold text-center mb-6">Fast, Secure, and Affordable Cross-Border Transfers</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message (optional)</label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-black"
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        Join Waitlist
      </Button>

      <div className="mt-6 text-center text-sm text-gray-600">
      <p>We will never share your information with anyone else.</p>
      </div>

      {/* Add Twitter Follow Option */}
      <div className="mt-6 text-center">
        <a href="https://twitter.com/remittease" target="_blank" rel="noopener noreferrer" className="text-black underline">
          Follow us on X @remittease
        </a>
      </div>
    </form>
  );
};

export default WaitlistForm;
