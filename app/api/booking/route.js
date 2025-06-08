import { ObjectId } from 'mongodb';
import clientPromise from "../../lib/mongodbConnect";
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
  }

  // Validate input
  const { name, email, phone, date, time, guests, requests } = await req.json();
  console.log(name, email, phone, date, time, guests, requests);
  if (!name || !phone || !date || !time || !guests) {
    return NextResponse.json(JSON.stringify({ message: 'Necesary fields are required' }), { status: 400 });
  }

  // Validate email format (basic check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(JSON.stringify({ message: 'Invalid email format' }), { status: 400 });
  }

  // Validate phone number format (basic check)
  const phoneRegex = /^\d{10}$/; // Assumes phone numbers are 10-15 digits
  if (!phoneRegex.test(phone)) {
    return NextResponse.json(JSON.stringify({ message: 'Invalid phone number format' }), { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const bookingsCollection = db.collection('bookings'); // Replace with your collection name

    // Create the booking object
    const newBooking = {
      name,
      email: email || '',
      phone,
      date: new Date(date), // Convert to Date object
      time,
      guests: parseInt(guests), // Convert to number
      requests: requests || '', // Optional field
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the booking into the database
    const result = await bookingsCollection.insertOne(newBooking);

    // Return success response
    return NextResponse.json(JSON.stringify({ message: 'Booking created successfully', bookingId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}