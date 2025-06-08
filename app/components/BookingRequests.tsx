import React from 'react';
import { useState, useEffect } from 'react';

const BookingRequestsSection: React.FC = () => {
  const [bookings, setBookings] = useState([]);
    
      useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch("/api/FetchBooking");
            const result = await res.json();
            if (res.ok){
            console.log(result);
            setBookings(result.bookings);
            }else{
              alert(result.message || 'Failed to fetch bookings');
            }
    
          } catch (err) {
            console.error('Error:', err);
            alert('An error occurred');
          }
        }
    
        fetchData();
      }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-600 mb-6">Booking Requests</h2>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Time</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">phone</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">guests</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">request</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-600">{booking.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.date.split('T')[0]}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.time}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.guests}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.requests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking: any, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-brown-600">{booking.name}</h3>
              <span
                className= "text-sm font-semibold text-orange-600"
              >
                guests: {booking.guests}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p><span className="font-bold">Date:</span> {booking.date.split('T')[0]}</p>
              <p><span className="font-bold">Time:</span> {booking.time}</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <p><span className="font-bold">phone:</span> {booking.phone}</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <p><span className="font-bold">Request:</span> {booking.requests}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequestsSection;