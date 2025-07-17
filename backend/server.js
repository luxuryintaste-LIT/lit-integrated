require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://www.luxuryintaste.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Middleware
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const articleRoutes = require('./routes/articleRoutes');
const mailArticleRoutes = require('./routes/mailArticleRoutes');
const fastFashionRoutes = require('./routes/fastFashionRoutes');
const luxuryFashionRoutes = require('./routes/luxuryFashionRoutes');
const sustainableFashionRoutes = require('./routes/sustainableFashionRoutes');
const sneakerWorldRoutes = require('./routes/sneakerWorldRoutes');
const uploadRoute = require('./routes/upload');
const contactRoutes = require('./routes/contactRoutes');

// ✅ Mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/mail-articles', mailArticleRoutes);
app.use('/api/fast-fashion', fastFashionRoutes);
app.use('/api/luxury-fashion', luxuryFashionRoutes);
app.use('/api/sustainable-fashion', sustainableFashionRoutes);
app.use('/api/sneaker-world', sneakerWorldRoutes);
app.use('/api/contact', contactRoutes);
app.use(uploadRoute); // for image uploads

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 Unified API for Ecommerce + Newsletter is running...');
});

// ✅ Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
