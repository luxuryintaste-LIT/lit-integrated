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
  import ScrollToTop from './components/ScrollToTop';
  import EcomAdminDashoard from './pages/admin/EcomAdminDashboard';

  // Pages - Public
  import LandingPage from './components/LandingPage';
  import Shop from './pages/Shop';
  import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
  import Cart from './components/Shop/Cart';
  import Wishlist from './pages/Wishlist';
  import GameModes from './pages/GameModes';
  import About from './pages/About';
  import Contact from './pages/Contact';
  import Profile from './pages/profile/Profile/Profile';
  import PrivacyPolicy from './pages/privacyPolicy';
  import Settings from './pages/profile/Settings';
  import CheckoutPage from './components/checkout/CheckoutPage';
  import OrderConfirmation from './pages/OrderConfirmation';
  import NotFound from './pages/NotFound';
  import ProductListPage from './pages/productListPage';
  import ComingSoonPage from './components/ComingSoonPage/ComingSoonPage';

  // ✅ CHANGED: Import the new Orders and OrderDetails pages
  import OrdersPage from './pages/OrdersPage/OrdersPage';
  import OrderDetailsPage from './pages/OrderDetailsPage/OrderDetailsPage';

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
import EditProductForm from './components/EditProductForm';
import AuthCallback from './pages/AuthCallback';

import EcomAdminDashboard from './pages/admin/EcomAdminDashboard';

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
      <ScrollToTop />
      <Notification />
      {showMainNavbar && <LandingPageNavbar />}
      {showNewsletterNavbar && <Navbar />}

        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/game-modes" element={<ComingSoonPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/profile" element={<Profile />} />

            {/* ✅ CHANGED: Replaced the old /orders route and added a new one for details */}
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/ir-icon" element={<ComingSoonPage />} />
            <Route path="/socials" element={<ComingSoonPage />} />
            <Route path="/avatar-store" element={<ComingSoonPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Newsletter Routes */}
          <Route element={<MainLayout />}>
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Route>
          <Route path="/newsletter/article/:slug" element={<NewsletterArticlePage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<SignUpPage />} />
          <Route path="/admin/article/:slug" element={<AdminArticlePage />} />
          <Route path="/admin/ecomDashboard" element={<EcomAdminDashoard />} />

          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/ecomDashboard" element={<EcomAdminDashboard />} />
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