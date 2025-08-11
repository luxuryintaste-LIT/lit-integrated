import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../services/api';
import { addToCart } from '../../redux/reducers/cartReducer';

// Import Page Section Components
import ProductImageGallery from '../../components/ProductDetails/ProductImageGallery/ProductImageGallery';
import ProductInfo from '../../components/ProductDetails/ProductInfo/ProductInfo';
import ProductInfoTabs from '../../components/ProductDetails/ProductInfoTabs/ProductInfoTabs';

// Import the page's CSS
import './ProductDetailsPage.css';

// ... (your existing Loader, state, and functions are all correct) ...
const Loader = () => <div className="loader">Loading...</div>;

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    
    // ... (useEffect and handler functions remain unchanged) ...
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProduct(id);
                if (data) {
                    setProduct(data);
                    if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
                    if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
                } else {
                    setError('Product not found.');
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);


     const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size.');
      return;
    }

    const itemToAdd = {
      ...product,
      _id: product._id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    // 3. USE the dispatch function
    dispatch(addToCart(itemToAdd));
    
    // Give user feedback
    alert(`${product.name} has been added to your cart!`);
    // Or you could navigate them directly to the cart:
    // navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size.');
      return;
    }
    
    const productToBuy = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    const orderData = {
      items: [productToBuy],
      platformFee: 20,
      deliveryFee: 50,
    };
    
    // Navigate to the order summary page
    navigate('/checkout', { state: { orderData } });
  };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div className="error-message">Product not found.</div>;

    // ✅ --- THIS IS THE CORRECTED LAYOUT STRUCTURE --- ✅
    return (
        <div className="product-details-page-container">
            <div className="product-details-main-layout">
                {/* --- Left Column: Images --- */}
                <ProductImageGallery
                    product={product}
                    images={product.images}
                    selectedColor={selectedColor}
                />

                {/* ✅ THE FIX: Create a wrapper div for the entire right column */}
                <div className="product-info-column">
                    <ProductInfo
                        product={product}
                        selectedColor={selectedColor}
                        onColorChange={setSelectedColor}
                        selectedSize={selectedSize}
                        onSizeChange={setSelectedSize}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                    />

                    {/* ✅ MOVE ProductInfoTabs here, inside the right column */}
                    <ProductInfoTabs product={product} />
                </div>
            </div>
            {/* ❌ ProductInfoTabs is REMOVED from here */}
        </div>
    );
};

export default ProductDetailsPage;