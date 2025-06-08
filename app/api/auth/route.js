import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "../../lib/mongodbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
  }

  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
  }

  // Validate JWT secret
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(JSON.stringify({ message: "JWT secret is not configured" }), { status: 500 });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ShopDB"); // Replace with your database name
    const usersCollection = db.collection("admins"); // Replace with your collection name

    // Find the user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.PassHash);
    if (!isPasswordValid) {
      return NextResponse.json(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: 'admin' },
      'Pixels',
      { expiresIn: "24h" }
    );

    const response = new NextResponse(JSON.stringify({ message: "Login successful", token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
    // Set the cookie on the response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}