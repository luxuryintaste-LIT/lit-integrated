// C:\lit-integrated\frontend\src\components\EcommerceAdmin\DeleteConfirmationModal.jsx

import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to permanently delete the product:
          <strong>"{productName}"</strong>? This action cannot be undone.
        </p>
        <div className="delete-modal-actions">
          <button onClick={onClose} className="modal-cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-confirm-delete-button">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;