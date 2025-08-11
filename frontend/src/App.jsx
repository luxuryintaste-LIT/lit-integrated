import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/context-admin/AuthContext';
import { DataProvider } from './context/context-admin/DataContext';
import { ArticleProvider } from './context/ArticleContext';

// Layout & UI
import Background from './components/Background/Background';
import Footer from './components/Newsletter-components/Footer/Footer';
import LandingPageNavbar from './components/Newsletter-components/Navbar/Navbar';
import Navbar from './components/Newsletter-components/Navbar/Navbar';
import MainLayout from './components/Newsletter-components/MainLayout/MainLayout';
import ProtectedRoute from './components/admin-components/ProtectedRoute';
import AdminLayout from './components/admin-components/AdminLayout';
import Notification from './components/Notification'; 
import EcomAdminDashboard from './pages/admin/EcomAdminDashboard';
import EcomDashboardView from './components/EcommerceAdmin/EcomDashboardView';
import EcomProductsView from './components/EcommerceAdmin/EcomProductsView';
import EcomProductForm from './components/EcommerceAdmin/EcomProductForm';
import EditProductForm from './components/EcommerceAdmin/EditProductForm';

import ProductDetailPage from './components/EcommerceAdmin/ProductDetailPage';

// Dummy admin pages for sidebar
import { Analytics, Offers, Inventory, Orders, Sales, Customers, Newsletter, Settings as AdminSettings } from './components/EcommerceAdmin/AdminDummyPages';

// Pages - Public
import LandingPage from './components/LandingPage';
import Shop from './pages/Shop';  
import ProductDetails from './components/Shop/ProductDetails';
import Cart from './components/Shop/Cart';
import Wishlist from './pages/Wishlist';
import GameModes from './pages/GameModes';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/profile/Profile/Profile';
import PrivacyPolicy from './pages/privacyPolicy';
import OrdersProfile from './pages/profile/Orders'; 
import SettingsProfile from './pages/profile/Settings'; 
import CheckoutPage from './components/checkout/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';
import ProductListPage from './pages/productListPage';
import ComingSoonPage from './components/ComingSoonPage/ComingSoonPage';

// Pages - Admin
import AdminLogin from './pages/AdminLogin';
import SignUpPage from './pages/admin/Auth/SignUpPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import ContentManager from './pages/admin/ContentManager/ContentManager';
import ArticleEditor from './pages/admin/ArticleEditor/ArticleEditor';
import MailAdderPage from './pages/admin/MailAdderPage/MailAdderPage';
import MailItemEditor from './pages/admin/MailItemEditor/MailItemEditor';
import AdminArticlePage from './pages/admin/ArticlePage';
import DeleteProductForm from './components/DeleteProductForm';

import AuthCallback from './pages/AuthCallback';

// Pages - Newsletter
import NewsletterPage from './pages/Newsletter/NewsletterPage/NewsletterPage';
import NewsletterArticlePage from './pages/Newsletter/ArticlePage/ArticlePage';

// Payment
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isNewsletterPath = location.pathname.startsWith('/newsletter');
  const isNewsletterArticle = location.pathname.startsWith('/newsletter/article');

  const showMainNavbar = !isAdminPath && !isNewsletterPath && !isNewsletterArticle;
  const showNewsletterNavbar = isNewsletterPath || isNewsletterArticle;
  const showFooter = !isAdminPath;

  return (
    <Background>
      <Notification />
      {showMainNavbar && <LandingPageNavbar />}
      {showNewsletterNavbar && <Navbar />}

      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/game-modes" element={<ComingSoonPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrdersProfile />} />
          <Route path="/settings" element={<SettingsProfile />} /> 
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Newsletter Routes */}
          <Route element={<MainLayout />}>
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Route>
          <Route path="/newsletter/article/:slug" element={<NewsletterArticlePage />} />

          {/* Admin E-commerce Dashboard */}
          <Route path="/admin/ecomDashboard/*" element={<ProtectedRoute><EcomAdminDashboard /></ProtectedRoute>}>
            <Route index element={<EcomDashboardView />} />
            <Route path="products" element={<EcomProductsView />} />
            
           
            <Route path="products/add" element={<EcomProductForm />} />
            <Route path="products/edit/:id" element={<EditProductForm />} />
             <Route path="products/:id" element={<ProductDetailPage />} />
            
            <Route path="analytics" element={<Analytics />} />
            <Route path="offers" element={<Offers />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales" element={<Sales />} />
            <Route path="customers" element={<Customers />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<SignUpPage />} />
          <Route path="/admin/article/:slug" element={<AdminArticlePage />} />

          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit-product" element={<EditProductForm />} />
            <Route path="/admin/delete-product" element={<DeleteProductForm />} />
            <Route path="/admin/website" element={<ContentManager section="website" />} />
            <Route path="/admin/mail" element={<ContentManager section="mail" />} />
            <Route path="/admin/mail/add" element={<MailAdderPage />} />
            <Route path="/admin/mail/edit/:id" element={<MailItemEditor />} />
            <Route path="/admin/editor/:section" element={<ArticleEditor />} />
            <Route path="/admin/editor/:section/:slug" element={<ArticleEditor />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </Background>
  );
};

const App = () => {
  const paypalOptions = {
    'client-id': 'YOUR_SANDBOX_CLIENT_ID_PLACEHOLDER',
    currency: 'INR',
    intent: 'capture',
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <DataProvider>
              <ArticleProvider>
                <Router>
                  <AppContent />
                </Router>
              </ArticleProvider>
            </DataProvider>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </PayPalScriptProvider>
  );
};

export default App;
