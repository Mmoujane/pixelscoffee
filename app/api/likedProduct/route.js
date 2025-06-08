import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate input
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('ShopDB'); // Replace with your database name
    const productsCollection = db.collection('products'); // Replace with your collection name

    // Check if the product exists
    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment the likes field by 1
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { likes: 1 } } // Increment likes by 1
    );

    // Return success response
    res.status(200).json({ message: 'Product liked successfully', likes: product.likes + 1 });
  } catch (error) {
    console.error('Error liking product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}