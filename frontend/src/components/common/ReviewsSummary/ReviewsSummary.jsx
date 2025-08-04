import React from 'react';
import './ReviewsSummary.css';

const Star = ({ filled }) => <span className={`star ${filled ? 'filled' : ''}`}>★</span>;

// Example: <ReviewsSummary rating={4.5} reviewCount={125} />
const ReviewsSummary = ({ rating = 0, reviewCount = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleScrollToReviews = () => {
    // We'll implement this later when the reviews section exists
    // const reviewsSection = document.getElementById('reviews-section');
    // if (reviewsSection) reviewsSection.scrollIntoView({ behavior: 'smooth' });
    alert('Scrolling to reviews section (to be implemented)');
  };

  return (
    <div className="reviews-summary" onClick={handleScrollToReviews}>
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < fullStars} />
        ))}
        {/* Simple implementation, can be improved for half-stars later */}
      </div>
      <span className="review-count">({reviewCount} reviews)</span>
    </div>
  );
};

export default ReviewsSummary;