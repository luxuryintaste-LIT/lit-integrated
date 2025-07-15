import React, { useState, useRef } from 'react';
import { Wallet } from 'lucide-react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios'; // Your frontend already has axios

// A simple loader component for better user experience
const Loader = () => <div className="loader">Loading PayPal...</div>;

/**
 * This is the final, robust PayPal form component.
 * It needs the following props from its parent (CheckoutPage):
 * @param {object} cart - The cart object from your context, containing cartItems and totalPrice.
 * @param {object} shippingAddress - The user's shipping address.
 * @param {function} onPaymentSuccess - A callback to run after the entire process is successful.
 */
const PaypalForm = ({ cart, shippingAddress, onPaymentSuccess }) => {
    // This hook tells us if the PayPal script is still loading.
    const [{ isPending }] = usePayPalScriptReducer();
    const [error, setError] = useState(null);

    // IMPORTANT: We use a React ref to hold our internal order ID (`merchantOrderId`)
    // across the two separate PayPal button functions (createOrder and onApprove).
    const merchantOrderIdRef = useRef(null);

    /**
     * This function is called when the user clicks the PayPal button.
     * It orchestrates the two-step process of creating orders.
     */
    const createOrder = async (data, actions) => {
        setError(null);
        try {
            // STEP 1: Create a "PENDING" order in OUR database.
            // This gives us an internal ID to track the transaction.
            const { data: pendingOrder } = await axios.post('/api/orders', {
                products: cart.cartItems,
                shippingAddress: shippingAddress,
                totalAmount: cart.totalPrice,
                paymentGateway: 'PAYPAL', // Matches your schema's enum
            });

            // If our own backend fails, stop the process.
            if (!pendingOrder || !pendingOrder.merchantOrderId) {
                throw new Error("Failed to create a pending order in our system.");
            }
            
            // Store our internal order ID in the ref for later use in onApprove.
            merchantOrderIdRef.current = pendingOrder.merchantOrderId;

            // STEP 2: Now, create the corresponding order with PAYPAL's servers.
            const res = await axios.post('/api/paypal/orders', {
                totalPrice: pendingOrder.totalAmount,
            });
            
            // Return PayPal's order ID to the PayPal SDK to open the popup.
            return res.data.id;

        } catch (err) {
            console.error("Order Initialization Error:", err);
            setError("Could not initiate the payment process. Please try again.");
            return null; // Must return null on failure.
        }
    };

    /**
     * This function is called after the user approves the payment in the PayPal popup.
     */
    const onApprove = async (data, actions) => {
        try {
            // STEP 3: Capture the payment on PayPal's servers.
            const captureResponse = await axios.post(`/api/paypal/orders/${data.orderID}/capture`);
            const paypalDetails = captureResponse.data;

            if (paypalDetails.status === 'COMPLETED') {
                // STEP 4: Payment is complete with PayPal. Now, update our own order
                // from "PENDING" to "COMPLETED" using our internal ID.
                const { data: finalOrder } = await axios.put(
                    `/api/orders/${merchantOrderIdRef.current}/pay`, 
                    {
                        status: 'COMPLETED', // Matches your schema
                        paymentId: paypalDetails.id, // PayPal's transaction ID
                        webhookPayload: paypalDetails, // The full response from PayPal
                    }
                );
                
                // STEP 5: The entire process is successful.
                // Call the callback function from the parent to handle the UI update
                // (e.g., clear cart, redirect to a "Thank You" page).
                onPaymentSuccess(finalOrder);

            } else {
                throw new Error('Payment was not completed by PayPal.');
            }
        } catch (err) {
            console.error("Payment Approval Error:", err);
            setError("Your payment could not be processed. Please try again or contact support.");
        }
    };

    /**
     * A simple error handler for the PayPal button itself.
     */
    const onError = (err) => {
        console.error("PayPal Button Error", err);
        setError("An unexpected error occurred with PayPal. Please refresh the page and try again.");
    };

    return (
        <div>
            <div className="form-header paypal-form-header">
                <Wallet className="form-header-icon" size={24} />
                <h4 className="form-header-title">Paypal</h4>
            </div>
            <div className="paypal-payment-area">
                {isPending ? <Loader /> : (
                    <>
                        <p style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            You will be redirected to PayPal to complete your payment securely.
                        </p>
                        <PayPalButtons
                            style={{ layout: 'vertical' }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            disabled={!cart?.totalPrice || error} // Disable if no price or if an error occurred
                        />
                    </>
                )}
                {/* Display any user-facing errors here */}
                {error && <div className="error-message" style={{ marginTop: '1rem', color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};

export default PaypalForm;


// import React, { useState } from 'react';
// import { Wallet } from 'lucide-react';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import axios from 'axios'; // You have axios in your frontend dependencies already

// // A custom component to show a loading spinner while PayPal is loading
// const Loader = () => <div className="loader"></div>;

// const PaypalForm = ({ totalPrice, onPaymentSuccess }) => {
//     // The `usePayPalScriptReducer` hook gives us the state of the PayPal script loading
//     const [{ isPending, isRejected }] = usePayPalScriptReducer();
//     const [error, setError] = useState(null);

//     /**
//      * This function is called when the user clicks the PayPal button.
//      * It calls our backend to create a new PayPal order.
//      */
//     const createOrder = async (data, actions) => {
//         setError(null);
//         try {
//             const response = await axios.post('/api/paypal/orders', {
//                 totalPrice: totalPrice, // Send the total price to the backend
//             });

//             if (response.data && response.data.id) {
//                 return response.data.id; // Return the order ID from PayPal
//             } else {
//                 throw new Error('Failed to get Order ID from PayPal');
//             }
//         } catch (err) {
//             console.error('PayPal Create Order Error:', err);
//             setError('Could not initiate PayPal Checkout. Please try again.');
//             return null;
//         }
//     };

//     /**
//      * This function is called after the user approves the payment on the PayPal site.
//      * It calls our backend to capture the payment.
//      */
//     const onApprove = async (data, actions) => {
//         setError(null);
//         try {
//             const response = await axios.post(`/api/paypal/orders/${data.orderID}/capture`);

//             if (response.data && response.data.status === 'COMPLETED') {
//                 // Payment was successful!
//                 console.log('PayPal Payment Successful:', response.data);
//                 // Call the success handler passed from the checkout page
//                 onPaymentSuccess(response.data); 
//                 return response.data;
//             } else {
//                 throw new Error('Payment was not completed.');
//             }
//         } catch (err) {
//             console.error('PayPal Approve Error:', err);
//             setError('Payment failed or was cancelled. Please try again.');
//         }
//     };

//     /**
//      * This function is called if an error occurs during the payment process.
//      */
//     const onError = (err) => {
//         console.error('PayPal Button Error:', err);
//         setError('An unexpected error occurred with PayPal. Please refresh and try again.');
//     };

//     return (
//         <div>
//             {/* You can keep your header */}
//             <div className="form-header paypal-form-header">
//                 <Wallet className="form-header-icon" size={24} />
//                 <h4 className="form-header-title">Paypal</h4>
//             </div>

//             <div className="paypal-payment-area">
//                 {/* Show a loading spinner while the PayPal script is loading */}
//                 {isPending && <Loader />}
                
//                 {/* Show an error if the script fails to load */}
//                 {isRejected && <div className="error-message">Error: Could not load PayPal script.</div>}

//                 {/* Show the buttons once the script is loaded */}
//                 {!isPending && !isRejected && (
//                     <>
//                         <p style={{ marginBottom: '1rem', textAlign: 'center' }}>
//                             Proceed with your payment securely through PayPal.
//                         </p>
//                         <PayPalButtons
//                             style={{ layout: 'vertical' }}
//                             createOrder={createOrder}
//                             onApprove={onApprove}
//                             onError={onError}
//                             // Disable buttons if there's no total price or if an error occurred
//                             disabled={!totalPrice || error}
//                         />
//                     </>
//                 )}

//                 {/* Display any errors that occur during the transaction */}
//                 {error && <div className="error-message" style={{ marginTop: '1rem' }}>{error}</div>}
//             </div>
//         </div>
//     );
// };

// export default PaypalForm;