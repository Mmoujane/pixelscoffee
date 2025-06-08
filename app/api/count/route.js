import { ObjectId } from 'mongodb';
import clientPromise from "../../lib/mongodbConnect";
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status:405 });
  }


  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const BlogCollection = db.collection('blogs'); // Replace with your collection name
    const ProductsCollection = db.collection('products');
    const BookingsCollection = db.collection('bookings');

    const BlogCount = await BlogCollection.countDocuments({});
    const ProductCount = await ProductsCollection.countDocuments({});
    const BookingCount = await BookingsCollection.countDocuments({});

    // Return success response
    return NextResponse.json({ message: 'statistics', statistics: {ProductCount, BookingCount, BlogCount}}, { status: 200 });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}