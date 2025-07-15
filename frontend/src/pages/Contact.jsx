  import React, { useState } from 'react';
  import axios from 'axios'; // You'll need to install this: npm install axios
  import '../styles/contact.css'; // We will use the updated CSS

  const Contact = () => {
    // State to hold the data from the form fields
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    // State to manage the submission status (e.g., 'submitting', 'success', 'error')
    const [status, setStatus] = useState('');
    // State to hold the message received from the server
    const [responseMessage, setResponseMessage] = useState('');

    // This function updates the state as the user types
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // This function handles the form submission when the button is clicked
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevents the browser from reloading the page
      setStatus('submitting');
      setResponseMessage('');

      try {
        // Send the form data to your backend API endpoint
        const response = await axios.post('http://localhost:5000/api/contact', formData);

        // Handle a successful response from the server
        setStatus('success');
        setResponseMessage(response.data.msg); // Use the success message from your controller
        
        // Clear the form fields after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });

      } catch (error) {
        // Handle any errors that occurred during the submission
        setStatus('error');
        
        // Create a user-friendly error message
        // It checks for specific validation errors from the backend first
        const errorMsg = error.response?.data?.errors 
          ? error.response.data.errors.map(e => e.msg).join(', ') 
          : (error.response?.data?.msg || 'An error occurred. Please try again.');
        
        setResponseMessage(errorMsg);
      }
    };

    return (
      <div className="contact-page">
        <div className="contact-container">
          {/* ======= Header ======= */}
          <header className="contact-header">
            <h1 className="header-title">Contact Us</h1>
            <p className="contact-subtitle">
              Have any questions about our products or services?<br />
              Fill out the form and We'd love to hear from you!
            </p>
          </header>

          {/* ======= Form ======= */}
          {/* The onSubmit attribute now points to our new function */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Each input is now controlled by React state */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="custom-input"
              value={formData.name}       // The input's value is tied to our state
              onChange={handleChange}     // The handleChange function is called when the user types
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              className="custom-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="3"
              className="custom-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="button-container">
              {/* The button is now disabled during submission and shows a dynamic label */}
              <button type="submit" className="submit-button-contact" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : "Let's Talk"}
              </button>
            </div>

            {/* This element will display the success or error message from the server */}
            {responseMessage && (
              <p className={`status-message ${status === 'error' ? 'error' : 'success'}`}>
                {responseMessage}
              </p>
            )}
          </form>

          {/* ======= Reach Out Directly Section (Unchanged) ======= */}
          <div className="reach-out-section">
            <h2 className="reach-out-title">Got questions, feedback, or need support?</h2>
            <p className="reach-out-para">Our team is available from Monday to Friday,<br></br> 10 AM – 6 PM IST.</p>
            <div className="info-grid">
              <div className="info-block">
                <h6>For Any Queries</h6>
                <a href="mailto:info@luxuryintaste.com">info@luxuryintaste.com</a>
              </div>
              <div className="info-block">
                <h6>For Newsletter</h6>
                <a href="mailto:newsletter@yourdomain.com">newsletter@yourdomain.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Contact;