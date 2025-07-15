// src/components/PrivacyPolicy.jsx

import React from 'react';
import '../styles/privacyPolicy.css'; 
const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <header className="privacy-header">
        {/* The decorative glow element */}
        <div className="header-glow"></div>
        
        {/* The title, inspired by your image */}
        <p className="sub-heading">KNOW OUR</p>
        <h1 className="privacy-title">Privacy Policy</h1>
      </header>
      
      <main className="privacy-content">
        <p>
          At LIT, we value your privacy and are committed to safeguarding your personal data.
        </p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>Name, email, phone number</li>
            <li>Shipping and billing address</li>
            <li>Game usage data, in-app purchases, and preferences</li>
            <li>Device information, cookies, IP address</li>
          </ul>
        </section>
        
        <section>
          <h2>2. How We Use Your Data</h2>
          <ul>
            <li>To process orders and deliver products</li>
            <li>To enhance gameplay and personalize recommendations</li>
            <li>To improve user experience through analytics</li>
            <li>To send updates, offers, or newsletters (with your consent)</li>
          </ul>
        </section>
        
        <section>
          <h2>3. Data Sharing</h2>
          <ul>
            <li>We do not sell your data.</li>
            <li>We only share your data with trusted vendors for shipping, payments, and analytics under strict confidentiality agreements.</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <ul>
            <li>We use SSL encryption and secure storage solutions to protect your information.</li>
          </ul>
        </section>
        
        <section>
          <h2>5. Your Rights</h2>
          <p>
            You can access, edit, or delete your data anytime by contacting us at{' '}
            <a href="mailto:info@luxuryintaste.com">info@luxuryintaste.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;