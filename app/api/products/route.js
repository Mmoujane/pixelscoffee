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
    const ProductsCollection = db.collection('products'); // Replace with your collection name

    const result = await ProductsCollection.find({}).toArray();

    // Return success response
    return NextResponse.json({ message: 'list of products', products: result }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}