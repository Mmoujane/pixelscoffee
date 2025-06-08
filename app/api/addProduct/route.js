import { ObjectId } from 'mongodb';
import clientPromise from "../../lib/mongodbConnect";
import jwt from 'jsonwebtoken';
import path from 'path';
import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';
import { promises as fs } from 'fs';


export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json(JSON.stringify({ message: 'Method not allowed' }), {status: 405});
  }


  // Verify JWT token
  const token = req.cookies.get('token'); // Expects "Bearer <token>"
  if (!token) {
    return NextResponse.json(JSON.stringify({ message: 'No token provided' }), {status: 401});
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    // Check if the user is an admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(JSON.stringify({ message: 'Unauthorized: Admins only' }), {status: 403});
    }

    // Validate input
    const data = await req.formData();
    const name = data.get('name');
    const price = data.get('price');
    const file = data.get('file');
    
    if (!name || !price || !file) {
      return NextResponse.json(JSON.stringify({ message: 'All fields are required' }), {status: 400});
    }

    const Bytes = await file.arrayBuffer();
    const buffer = Buffer.from(Bytes);
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.name);
    const Path = path.join(process.cwd(), 'public', 'media', 'products', fileName);
    await fs.writeFile(Path, buffer);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const productsCollection = db.collection('products'); // Replace with your collection name

    // Insert the new product
    const newProduct = {
      name,
      price: parseFloat(price), // Ensure price is a number
      image: `/media/products/${fileName}`,
      likes: 0,
      special: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);

    // Return success response
    return NextResponse.json(JSON.stringify({ message: 'Product added successfully', productId: result.insertedId }), {status :201});
  } catch (error) {
    console.error('Error adding product:', error);

    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(JSON.stringify({ message: 'Invalid token' }), {status: 401});
    }

    return NextResponse.json(JSON.stringify({ message: 'Internal server error' }), {status: 500});
  };
}

