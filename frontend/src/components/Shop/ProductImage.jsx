import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ImageContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '400px',        // Give it a real width
  aspectRatio: '1 / 1',     // Modern way to maintain square shape
  backgroundColor: '#2a2a2a',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #444',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

function uint8ToBase64(u8Arr) {
  try {
    let binary = '';
    const len = u8Arr.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(u8Arr[i]);
    }
    return window.btoa(binary);
  } catch (err) {
    console.error('❌ Failed to convert Uint8Array to base64:', err);
    return '';
  }
}

const ProductImage = ({ imageBuffer, alt }) => {
  let src = null;

  if (
    imageBuffer &&
    imageBuffer.data &&
    Array.isArray(imageBuffer.data.data) &&
    imageBuffer.contentType
  ) {
    try {
      const byteArray = new Uint8Array(imageBuffer.data.data);
      const base64 = uint8ToBase64(byteArray);
      if (base64) {
        src = `data:${imageBuffer.contentType};base64,${base64}`;
        console.log('✅ Base64 image generated');
      }
    } catch (err) {
      console.error('❌ Error generating base64 image:', err);
    }
  }

  if (!src) {
    console.warn('⚠️ No image src generated, skipping render.');
    return null;
  }

  return (
    <ImageContainer>
      <img
        src={src}
        alt={alt || 'Product Image'}
        onError={() => console.error('❌ Image failed to load:', src)}
      />
    </ImageContainer>
  );
};

export default ProductImage;
