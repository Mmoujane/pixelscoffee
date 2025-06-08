import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodbConnect';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  // Validate input
  const { id, price } = await req.json();
  console.log(id, price)
  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const productsCollection = db.collection('products'); // Replace with your collection name

    // Check if the product exists
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { specialPrice: parseFloat(price), special: true } }
    );

    // Return success response
    return NextResponse.json({ message: 'Product updated successfully'}, { status: 200 });
  } catch (error) {
    console.error('Error liking product:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}