
// File: backend/services/phonepe.service.js

const { StandardCheckoutClient, Env } = require('pg-sdk-node');

const { PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET } = process.env;
const env = Env.SANDBOX;

let phonepeClient;

// Check if the credentials actually exist
if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
  
  console.warn("⚠️ PhonePe credentials are not set. PhonePe client will be in DUMMY mode.");
  
  // Create a DUMMY client object that won't crash the app
  phonepeClient = {
    // This is a flag we can check in our controllers
    isDummy: true, 
    // These are fake functions that match the real SDK, preventing crashes
    pay: () => Promise.reject(new Error("PhonePe client is not initialized.")),
    validateCallback: () => { throw new Error("PhonePe client is not initialized."); },
  };

} else {
  
  // If keys ARE present, try to initialize the REAL client
  try {
    phonepeClient = StandardCheckoutClient.getInstance(
      PHONEPE_CLIENT_ID,
      PHONEPE_CLIENT_SECRET,
      1,
      env
    );
    phonepeClient.isDummy = false; // Add the flag to the real client
    console.log("✅ PhonePe Client initialized successfully.");
  } catch (error) {
    console.error("❌ Fatal Error: Failed to initialize PhonePe Client.", error.message);
    // If initialization fails even with keys, create the dummy to prevent a crash
    phonepeClient = { isDummy: true }; 
  }
}

module.exports = phonepeClient;

// const { StandardCheckoutClient, Env } = require('pg-sdk-node');
// const { PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET } = process.env;

// // This sets the environment to testing. For your live website, you'll change this.
// const env = Env.SANDBOX; 
// let phonepeClient;

// try {
//   // This is a safety check. If the keys are missing from your .env file, it will stop.
//   if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
//     throw new Error("PhonePe credentials are not set in the environment variables.");
//   }
  
//   // It initializes the PhonePe SDK with your keys.
//   // We use getInstance() so it only ever creates one instance of the client.
//   phonepeClient = StandardCheckoutClient.getInstance(
//     PHONEPE_CLIENT_ID,
//     PHONEPE_CLIENT_SECRET,
//     1, // This is the clientVersion for UAT (testing) as per the docs
//     env
//   );

//   console.log("✅ PhonePe Client initialized successfully.");

// } catch (error) {
//   console.error("❌ Fatal Error: Failed to initialize PhonePe Client.", error.message);
// }

// module.exports = phonepeClient;