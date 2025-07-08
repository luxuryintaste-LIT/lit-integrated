import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/context-admin/AuthContext';
import { DataProvider } from './context/context-admin/DataContext';

//componenets
import ComingSoonPage from './components/ComingSoonPage/ComingSoonPage';

// Layout & UI
import Background from './components/Background/Background';
import Footer from "./components/Newsletter-components/Footer/Footer";
import LandingPageNavbar from './components/Newsletter-components/Navbar/Navbar';
import Navbar from './components/Newsletter-components/Navbar/Navbar';
// --- CHANGE: MainLayout import removed as it wasn't being used correctly
// import MainLayout from './components/Newsletter-components/MainLayout/MainLayout'; 
import ProtectedRoute from './components/admin-components/ProtectedRoute';
import AdminLayout from './components/admin-components/AdminLayout';

// Pages
import LandingPage from './components/LandingPage';
import Shop from './pages/Shop';
import ProductDetails from './components/Shop/ProductDetails';
import Cart from './components/Shop/Cart';
import GameModes from './pages/GameModes';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
// import CheckoutPage from './Components/Checkout/CheckoutPage';
import CheckoutPage from './components/checkout/CheckoutPage';

// import AddressForm from './pages/AddressForm';


import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/AdminLogin';
import SignUpPage from './pages/admin/Auth/SignUpPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import ContentManager from './pages/admin/ContentManager/ContentManager';
import ArticleEditor from './pages/admin/ArticleEditor/ArticleEditor';
import MailAdderPage from './pages/admin/MailAdderPage/MailAdderPage';
import MailItemEditor from './pages/admin/MailItemEditor/MailItemEditor';
import AdminArticlePage from './pages/admin/ArticlePage';

import NewsletterPage from './pages/Newsletter/NewsletterPage/NewsletterPage';
import NewsletterArticlePage from './pages/Newsletter/ArticlePage/ArticlePage';
import Wishlist from './pages/Wishlist';

// --- CHANGE: Removed unused page imports ---
// import SustainabilityPage from './pages/Newsletter/SustainableFashion/SustainableFashion';
// import LuxuryPage from './pages/Newsletter/LuxuryFashion/LuxuryFashion';
// import FastFashionPage from './pages/Newsletter/FastFashion/FastFashion';
// import SneakerPage from './pages/Newsletter/SneakersWorld/SneakersWorld';

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
      {showMainNavbar && <LandingPageNavbar />}
      {showNewsletterNavbar && <Navbar />}

      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/game-modes" element={<ComingSoonPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/shipping-address" element={<AddressForm />} /> */}

          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/ir-icon" element={<ComingSoonPage />} />
          <Route path="/socials" element={<ComingSoonPage />} />
          <Route path="/avatar-store" element={<ComingSoonPage />} />

          {/* Newsletter */}
          {/* --- CHANGE: Simplified the newsletter route and removed the now-redundant routes --- */}
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/newsletter/article/:slug" element={<NewsletterArticlePage />} />
          
          {/* --- The following routes are now handled by the logic above and can be removed --- */}
          {/* <Route path="/sustainability" element={<SustainabilityPage />} /> */}
          {/* <Route path="/luxury" element={<LuxuryPage />} /> */}
          {/* <Route path="/fast-fashion" element={<FastFashionPage />} /> */}
          {/* <Route path="/sneakers" element={<SneakerPage />} /> */}

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<SignUpPage />} />
          <Route path="/admin/article/:slug" element={<AdminArticlePage />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
  return (
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <DataProvider>
            <Router>
              <AppContent />
            </Router>
          </DataProvider>
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;