const mongoose = require('mongoose');

// Subschema for storing image URLs under a color
const colorImageSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Image URLs
    default: [],
  }
}, { _id: false });

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number, default: null },
  discount: { type: Number, default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },

  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex'],
    required: true,
  },

    subcategory: { type: String, default: null },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] },

  // ✅ Images stored as URLs per color
  images: { type: [colorImageSchema], default: [] },

  stock: { type: Number, required: true, default: 0 },
  features: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;