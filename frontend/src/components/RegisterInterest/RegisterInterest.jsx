import React from 'react';
import './RegisterInterest.css';

const RegisterInterest = () => {
  const handleGetStarted = () => {
    const clientId = 'b705c7a7-558f-4da6-b003-7f32694ad5ab';
    const redirectUri = encodeURIComponent('https://www.luxuryintaste.com/auth/callback');
    const policy = 'B2C_1_signup';
    const tenant = 'testingloginn.onmicrosoft.com';

    // const azureLoginUrl = `https://testingloginn.b2clogin.com/${tenant}/oauth2/v2.0/authorize?p=${policy}&client_id=${clientId}&nonce=defaultNonce&redirect_uri=${redirectUri}&scope=openid&response_type=id_token&prompt=login`;

    const azureLoginUrl = `https://testingloginn.b2clogin.com/testingloginn.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandsign&client_id=b705c7a7-558f-4da6-b003-7f32694ad5ab&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.luxuryintaste.com%2Fauth%2Fcallback&scope=openid&response_type=id_token&prompt=login `;

    
    window.location.href = azureLoginUrl;
  };

  return (
    <section className="register-interest-container">
      <div className="register-interest-card">
        <h3 className="register-interest-small-heading">Register your interest for LIT!</h3>
        <h2 className="register-interest-main-heading">
          Be the first to know when the game goes live. Don't miss out
        </h2>
        <p className="register-interest-subtext">SIGN UP and stay in loop!</p>
        <button className="register-interest-cta" onClick={handleGetStarted}>
          Get started
        </button>
      </div>
    </section>
  );
};

export default RegisterInterest;
