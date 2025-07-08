import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const Card = ({ imageUrl, text, description, publishDate, articleUrl }) => {
  return (
    <Link to={articleUrl || "/"} className="card-link-wrapper">
      
      {/* The image container */}
      <div className="card-image-container">
        <img src={imageUrl} alt={text || description} />
        
        {/* The optional title text overlay */}
        {text && (
          <div className="card-text-overlay">
            <p className="card-title">{text}</p>
          </div>
        )}

        {/* The hover overlay for the date */}
        <div className="card-hover-overlay">
          <span className="publish-date">{formatDate(publishDate)}</span>
        </div>
      </div>

      {/* The description that appears below the image */}
      {description && (
        <div className="card-description">
          <p>{description}</p>
        </div>
      )}

    </Link>
  );
};

export default Card;