const mongoose = require('mongoose');

// Subschema for storing image as binary buffer
const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
  }
}, { _id: false });

// Subschema for mapping images to a color
const colorImageSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  images: {
    type: [imageSchema],
    default: [],
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number, default: null },
  discount: { type: Number, default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] }, // 👈 Your original array remains
  images: { type: [colorImageSchema], default: [] }, // 👈 New image mapping by color
  stock: { type: Number, required: true, default: 0 },
  features: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// const products = [
//   {
//     name: 'Regular Fit Cashmere jumper',
//     description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
//     price: 3199,
//     originalPrice: 7999,
//     discount: 60,
//     imageUrl: '/images/men.png',
//     category: 'Clothing',
//     countInStock: 10,
//   },
//   {
//     name: 'Regular Fit Cashmere jumper',
//     description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
//     price: 3199,
//     originalPrice: 7999,
//     discount: 60,
//     imageUrl: '/images/men.png',
//     category: 'Clothing',
//     countInStock: 5,
//   },
//   {
//     name: 'Regular Fit Cashmere jumper',
//     description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
//     price: 3199,
//     originalPrice: 7999,
//     discount: 60,
//     imageUrl: '/images/men.png',
//     category: 'Clothing',
//     countInStock: 20,
//   },
//   {
//     name: 'Regular Fit Cashmere jumper',
//     description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
//     price: 3199,
//     originalPrice: 7999,
//     discount: 60,
//     imageUrl: '/images/men.png',
//     category: 'Clothing',
//     countInStock: 15,
//   },
// ];

// module.exports = products; 