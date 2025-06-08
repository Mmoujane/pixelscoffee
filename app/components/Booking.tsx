'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { motion } from 'framer-motion'

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    requests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.guests || !formData.date || !formData.time) {
      alert('Please fill in all the nececary fields.');
      return;
    }

    // backend call

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        alert(`Booking confirmed for ${formData.name} on ${formData.date} at ${formData.time}.`);
      } else {
        alert(result.message || 'Failed to booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }

  };

  return (
    <div className="w-full p-5 flex justify-center items-center bg-background" id='booking'>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, margin: '-100px' }} className="w-full max-w-6xl flex flex-col justify-center items-center gap-8 mt-10">
        {/* Header */}
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Book Your Table</h1>
          <p className="text-lg text-gray-600 text-center">
            Reserve your spot and enjoy a cozy coffee experience at PixelsCoffee.
          </p>
        </div>

        {/* Image and Form Container */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Form on the Right */}
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Time */}
              <div className="flex flex-col gap-2">
                <label htmlFor="time" className="text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Number of Guests */}
              <div className="flex flex-col gap-2">
                <label htmlFor="guests" className="text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mt-6 flex flex-col gap-2">
              <label htmlFor="requests" className="text-sm font-medium text-gray-700">
                Special Requests
              </label>
              <textarea
                id="requests"
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                placeholder="Any special requests or notes?"
                className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button text='Confirm Booking'/>
            </div>
          </form>

          {/* Image on the Left */}
          <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
            <Image
              src="/images/herobg.jpg"
              alt="Coffee Shop"
              width={800}
              height={800}
              
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;