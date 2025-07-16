// In routes/upload.js
const express = require('express');
const multer = require('multer');
const { uploadImageToAzure } = require('../services/azureBlob');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const url = await uploadImageToAzure(file.buffer, file.mimetype, file.originalname);
    res.json({ url });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;
