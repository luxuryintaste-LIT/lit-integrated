// src/components/checkout/NetBankingForm.jsx
import React, { useState } from 'react';
import { Landmark, ChevronDown } from 'lucide-react';

// Step 1: Import the logos from your assets folder
import hdfcLogo from '../../assets/bank-logos/HDB.png';
import iciciLogo from '../../assets/bank-logos/IBN.png';
import sbiLogo from '../../assets/bank-logos/state-bank-of-india-logo-circle-15ad.png';
import axisLogo from '../../assets/bank-logos/AXISBANK.BO.png';
import centralLogo from '../../assets/bank-logos/CENTRALBK.NS.png';
import iobLogo from '../../assets/bank-logos/IOB.NS.png';
import cubLogo from '../../assets/bank-logos/CUB.NS.png';
import indianbLogo from '../../assets/bank-logos/INDIANB.NS.png';

// Step 2: Change the `banks` array to be an array of objects
const banks = [
  { name: 'HDFC Bank', logo: hdfcLogo },
  { name: 'ICICI Bank', logo: iciciLogo },
  { name: 'State Bank of India', logo: sbiLogo },
  { name: 'Axis Bank', logo: axisLogo },
  { name: 'Central Bank of India', logo: centralLogo },
  { name: 'Indian Overseas Bank', logo: iobLogo },
  { name: 'City Union Bank', logo: cubLogo },
  { name: 'Indian Bank', logo: indianbLogo },
  // Add more banks here if needed
];

const NetBankingForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // The state will now hold the entire bank object, not just the name
  const [selectedBank, setSelectedBank] = useState(null);

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setIsOpen(false);
  };

  return (
    <div className="payment-form netbanking-form">
      <div className="form-header">
        <Landmark className="form-header-icon" size={24} />
        <h4 className="form-header-title">Net Banking</h4>
      </div>
      <div className="form-group">
        <label>Select Bank from the List</label>
        <div className="custom-dropdown">
          {/* Step 3: Update the dropdown header to show the selected bank's logo */}
          <button className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            {selectedBank ? (
              <div className="selected-bank-display">
                <img src={selectedBank.logo} alt={selectedBank.name} className="bank-logo-small" />
                <span>{selectedBank.name}</span>
              </div>
            ) : (
              <span>Select Bank</span>
            )}
            <ChevronDown size={20} className={isOpen ? 'open' : ''}/>
          </button>
          
          {/* Step 4: Update the dropdown list to render the logo for each bank */}
          {isOpen && (
            <ul className="dropdown-list">
              {banks.map(bank => (
                <li 
                  key={bank.name} 
                  onClick={() => handleSelectBank(bank)}
                  className={selectedBank?.name === bank.name ? 'selected' : ''}
                >
                  <span className="radio-icon"></span> {/* Kept for the circular selection indicator */}
                  <img src={bank.logo} alt={bank.name} className="bank-logo" />
                  <span>{bank.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className="action-btn" disabled={!selectedBank}>
        {selectedBank ? 'Proceed' : 'Pay Now'}
      </button>
    </div>
  );
};

export default NetBankingForm;