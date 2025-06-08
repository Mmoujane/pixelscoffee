import { ObjectId } from 'mongodb';
import clientPromise from "../../lib/mongodbConnect";
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status:405 });
  }


  const  BlogId  = req.nextUrl.searchParams.get('BlogId');

  // Validate input
  console.log(BlogId);
  if ( !BlogId ) {
    return NextResponse.json({ message: "need Id of blog" }, { status: 400 });
  }


  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const BlogCollection = db.collection('blogs'); // Replace with your collection name

    const result = await BlogCollection.findOne({ _id: new ObjectId(BlogId)});
    console.log(result);

    // Return success response
    return NextResponse.json({ message: 'blog fetched', blog: result }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}