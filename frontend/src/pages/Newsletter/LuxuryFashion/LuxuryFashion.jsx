import React, { useState } from 'react';
import './LuxuryFashion.css';
import Card from "../../../components/Newsletter-components/shared/Card/Card.jsx";

const LuxuryFashion = ({ posts, onContentChange }) => {
  const [showMore, setShowMore] = useState(false);

  if (!posts || posts.length === 0) {
    return (
      <section className="lf-section">
        <div className="lf-title-container">
          <h2 className="lf-title-line1">LUXURY</h2>
          <h2 className="lf-title-line2">FASHION</h2>
        </div>
        <p className="no-posts-message">No luxury fashion articles available.</p>
      </section>
    );
  }

  const featuredPosts = posts.slice(0, 5);
  const remainingPosts = posts.slice(5);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);

    // ✅ notify parent AFTER DOM updates
    setTimeout(() => {
      if (onContentChange) onContentChange();
    }, 50);
  };

  return (
    <section className="lf-section">
      <div className="lf-title-container">
        <h2 className="lf-title-line1">LUXURY</h2>
        <h2 className="lf-title-line2">FASHION</h2>
      </div>

      {/* Featured Grid */}
      <div className="lf-grid-container">
        {featuredPosts[0] && (
          <div className="lf-card-wrapper lf-card-1">
            <Card {...featuredPosts[0]} articleUrl={`/newsletter/article/${featuredPosts[0].slug}`} />
          </div>
        )}
        {featuredPosts[1] && (
          <div className="lf-card-wrapper lf-card-2">
            <Card {...featuredPosts[1]} articleUrl={`/newsletter/article/${featuredPosts[1].slug}`} />
          </div>
        )}
        {featuredPosts[2] && (
          <div className="lf-card-wrapper lf-card-3">
            <Card {...featuredPosts[2]} articleUrl={`/newsletter/article/${featuredPosts[2].slug}`} />
          </div>
        )}
        {featuredPosts[3] && (
          <div className="lf-card-wrapper lf-card-large">
            <Card {...featuredPosts[3]} articleUrl={`/newsletter/article/${featuredPosts[3].slug}`} />
          </div>
        )}
        {featuredPosts[4] && (
          <div className="lf-card-wrapper lf-card-tall">
            <Card {...featuredPosts[4]} articleUrl={`/newsletter/article/${featuredPosts[4].slug}`} />
          </div>
        )}
      </div>

      {/* Extra Posts Grid */}
      {showMore && remainingPosts.length > 0 && (
        <div className="lf-grid-extra">
          {remainingPosts.map((post) => (
            <div className="lf-card-wrapper" key={post.slug}>
              <Card {...post} articleUrl={`/newsletter/article/${post.slug}`} />
            </div>
          ))}
        </div>
      )}

      {/* Read More / Read Less Toggle */}
      {remainingPosts.length > 0 && (
        <div className="read-more-container">
          <button
            className="read-more-button"
            onClick={toggleShowMore}
          >
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default LuxuryFashion;
