// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Product = require('../models/Product');
// const { uploadImageToAzure } = require('../services/azureBlob');

// // Multer setup (store files in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Helper to parse form values
// const parseArray = (value) => {
//   if (!value) return [];
//   return Array.isArray(value) ? value : [value];
// };

// // ------------------ GET ALL ------------------
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ------------------ GET FEATURED ------------------
// router.get('/featured', async (req, res) => {
//   try {
//     const featuredProducts = await Product.find({ featured: true });
//     res.json(featuredProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ------------------ GET BY ID ------------------
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ------------------ CREATE PRODUCT ------------------
// router.post('/', upload.any(), async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       originalPrice,
//       discount,
//       category,
//       brand,
//       sizes,
//       colors,
//       stock,
//       features,
//       featured,
//       gender
//     } = req.body;

//     const parsedColors = parseArray(colors);
//     const parsedSizes = parseArray(sizes);
//     const parsedFeatures = parseArray(features);

//     const imagesByColor = {};

//     // Group uploaded files by color
//     for (const file of req.files || []) {
//       const match = file.fieldname.match(/^images\[(.+?)\]$/);
//       if (match) {
//         const color = match[1];
//         if (!imagesByColor[color]) imagesByColor[color] = [];
//         imagesByColor[color].push(file);
//       }
//     }

//     const images = [];

//     // Upload each image to Azure Blob and collect URLs
//     for (const [color, files] of Object.entries(imagesByColor)) {
//       const uploadedUrls = [];
//       for (const file of files) {
//         const url = await uploadImageToAzure(file.buffer, file.mimetype, file.originalname);
//         uploadedUrls.push(url); // ✅ only URL
//       }
//       images.push({ color, images: uploadedUrls });
//     }

//     const product = new Product({
//       name,
//       description,
//       price,
//       originalPrice,
//       discount,
//       category,
//       brand,
//       sizes: parsedSizes,
//       colors: parsedColors,
//       stock,
//       features: parsedFeatures,
//       featured: featured === 'true' || featured === true,
//       gender,
//       images
//     });

//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.error('Create Error:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // ------------------ UPDATE PRODUCT ------------------
// router.put('/:id', upload.any(), async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     const {
//       name,
//       description,
//       price,
//       originalPrice,
//       discount,
//       category,
//       brand,
//       sizes,
//       colors,
//       stock,
//       features,
//       featured,
//       gender
//     } = req.body;

//     const parsedColors = parseArray(colors);
//     const parsedSizes = parseArray(sizes);
//     const parsedFeatures = parseArray(features);

//     const imagesByColor = {};

//     (req.files || []).forEach(file => {
//       const match = file.fieldname.match(/^images\[(.+?)\]$/);
//       if (match) {
//         const color = match[1];
//         if (!imagesByColor[color]) imagesByColor[color] = [];
//         imagesByColor[color].push(file);
//       }
//     });

//     const newImages = [];

//     for (const [color, files] of Object.entries(imagesByColor)) {
//       const uploadedUrls = [];
//       for (const file of files) {
//         const url = await uploadImageToAzure(file.buffer, file.mimetype, file.originalname);
//         uploadedUrls.push(url); // ✅ only URL
//       }
//       newImages.push({ color, images: uploadedUrls });
//     }

//     // Update fields
//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (originalPrice) product.originalPrice = originalPrice;
//     if (discount) product.discount = discount;
//     if (category) product.category = category;
//     if (brand) product.brand = brand;
//     if (stock) product.stock = stock;
//     if (typeof featured !== 'undefined') product.featured = featured;
//     if (gender) product.gender = gender;
//     if (parsedColors.length > 0) product.colors = parsedColors;
//     if (parsedSizes.length > 0) product.sizes = parsedSizes;
//     if (parsedFeatures.length > 0) product.features = parsedFeatures;

//     if (newImages.length > 0) {
//       product.images.push(...newImages);
//     }

//     const updated = await product.save();
//     res.json(updated);
//   } catch (error) {
//     console.error('Update Error:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // ------------------ DELETE PRODUCT ------------------
// router.delete('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     await product.deleteOne();
//     res.json({ message: 'Product removed' });
//   } catch (error) {
//     console.error('Delete Error:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const { uploadImageToAzure } = require('../services/azureBlob');

// Multer setup (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to parse form values
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

// ------------------ CREATE PRODUCT (✅ UPDATED) ------------------
router.post('/', upload.any(), async (req, res) => {
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
      featured,
      gender,
      sizeAndFit // ✅ 1. Read sizeAndFit from the request body
    } = req.body;

    const parsedColors = parseArray(colors);
    const parsedSizes = parseArray(sizes);
    const parsedFeatures = parseArray(features);

    const imagesByColor = {};

    // Group uploaded files by color
    for (const file of req.files || []) {
      const match = file.fieldname.match(/^images\[(.+?)\]$/);
      if (match) {
        const color = match[1];
        if (!imagesByColor[color]) imagesByColor[color] = [];
        imagesByColor[color].push(file);
      }
    }

    const images = [];

    // Upload each image to Azure Blob and collect URLs
    for (const [color, files] of Object.entries(imagesByColor)) {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadImageToAzure(file.buffer, file.mimetype, file.originalname);
        uploadedUrls.push(url);
      }
      images.push({ color, images: uploadedUrls });
    }

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
      gender,
      images,
      sizeAndFit // ✅ 2. Add sizeAndFit to the new product object
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ------------------ UPDATE PRODUCT (✅ UPDATED) ------------------
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
      featured,
      gender,
      sizeAndFit // ✅ 1. Read sizeAndFit from the request body
    } = req.body;

    const parsedColors = parseArray(colors);
    const parsedSizes = parseArray(sizes);
    const parsedFeatures = parseArray(features);

    const imagesByColor = {};

    (req.files || []).forEach(file => {
      const match = file.fieldname.match(/^images\[(.+?)\]$/);
      if (match) {
        const color = match[1];
        if (!imagesByColor[color]) imagesByColor[color] = [];
        imagesByColor[color].push(file);
      }
    });

    const newImages = [];

    for (const [color, files] of Object.entries(imagesByColor)) {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadImageToAzure(file.buffer, file.mimetype, file.originalname);
        uploadedUrls.push(url);
      }
      newImages.push({ color, images: uploadedUrls });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (originalPrice) product.originalPrice = originalPrice;
    if (discount) product.discount = discount;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (stock) product.stock = stock;
    if (typeof featured !== 'undefined') product.featured = featured;
    if (gender) product.gender = gender;
    if (parsedColors.length > 0) product.colors = parsedColors;
    if (parsedSizes.length > 0) product.sizes = parsedSizes;
    if (parsedFeatures.length > 0) product.features = parsedFeatures;

    // ✅ 2. Add this line to update the sizeAndFit object
    if (sizeAndFit) product.sizeAndFit = sizeAndFit;

    if (newImages.length > 0) {
      product.images.push(...newImages);
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error('Update Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ------------------ DELETE PRODUCT ------------------
// router.delete('/:id', async (req, res) => {
//   try {
//     const product = await product.deleteOne({_id: req.params.id});
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product removed' });
//   } catch (error) {
//     console.error('Delete Error:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// ------------------ DELETE PRODUCT ------------------

router.delete('/:id', async (req, res) => {
  try {
    // Find the product first to ensure it exists
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Then, delete it
    await product.deleteOne(); 
    res.json({ message: 'Product removed' });

  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;


