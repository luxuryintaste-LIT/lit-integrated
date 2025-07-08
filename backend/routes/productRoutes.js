const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

// Multer setup (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helpers
const parseArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

// ------------------ GET ALL ------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ------------------ GET FEATURED ------------------
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ------------------ GET BY ID ------------------
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', upload.any(), async (req, res) => {

  console.log("FILES:", req.files);
console.log("BODY:", req.body);
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      brand,
      sizes,
      colors,
      stock,
      features,
      featured
    } = req.body;

    // Parse arrays
    const parsedColors = Array.isArray(colors) ? colors : [colors].filter(Boolean);
    const parsedSizes = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);
    const parsedFeatures = Array.isArray(features) ? features : [features].filter(Boolean);

    // ✅ FIX: Define this BEFORE using it
    const imagesByColor = {};

    // ✅ SAFE: protect against undefined req.files
    (req.files || []).forEach(file => {
      const match = file.fieldname.match(/^images\[(.+?)\]$/);
      if (match) {
        const color = match[1];
        if (!imagesByColor[color]) imagesByColor[color] = [];
        imagesByColor[color].push({
          data: file.buffer,
          contentType: file.mimetype,
          filename: file.originalname
        });
      }
    });

    const images = Object.entries(imagesByColor).map(([color, files]) => ({
      color,
      images: files
    }));

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      brand,
      sizes: parsedSizes,
      colors: parsedColors,
      stock,
      features: parsedFeatures,
      featured: featured === 'true' || featured === true,
      images
    });

    const saved = await product.save();
    res.status(201).json(saved);
    console.log("FILES:", req.files);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ------------------ UPDATE PRODUCT ------------------
router.put('/:id', upload.any(), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      brand,
      sizes,
      colors,
      stock,
      features,
      featured
    } = req.body;

    const parsedColors = parseArray(colors);
    const parsedSizes = parseArray(sizes);
    const parsedFeatures = parseArray(features);
const imagesByColor = {};  // <-- This must be defined BEFORE the loop

(req.files || []).forEach(file => {
  const match = file.fieldname.match(/^images\[(.+?)\]$/);
  if (match) {
    const color = match[1];
    if (!imagesByColor[color]) imagesByColor[color] = [];
    imagesByColor[color].push({
      data: file.buffer,
      contentType: file.mimetype,
      filename: file.originalname
    });
  }
});

    const newImages = Object.entries(imagesByColor).map(([color, imageArr]) => ({
      color,
      images: imageArr
    }));

    // Update fields only if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (originalPrice) product.originalPrice = originalPrice;
    if (discount) product.discount = discount;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (stock) product.stock = stock;
    if (typeof featured !== 'undefined') product.featured = featured;

   if (parsedColors.length > 0)
  product.colors = parsedColors;
    if (parsedSizes.length > 0)
      product.sizes = parsedSizes;
    if (parsedFeatures.length > 0)
      product.features = parsedFeatures;

    if (newImages.length > 0) {
      product.images.push(...newImages);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ------------------ DELETE PRODUCT ------------------
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
