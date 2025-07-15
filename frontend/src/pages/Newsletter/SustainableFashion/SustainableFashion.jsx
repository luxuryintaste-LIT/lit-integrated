import React, { useState } from 'react';
import './SustainableFashion.css';
import Card from "../../../components/Newsletter-components/shared/Card/Card.jsx";

const SustainableFashion = ({ posts, onContentChange }) => {
  const [showMore, setShowMore] = useState(false);

  if (!posts || posts.length === 0) {
    return (
      <section className="sf-section">
        <div className="sf-title-container">
          <h2 className="sf-title-line1">SUSTAINABLE</h2>
          <h2 className="sf-title-line2">FASHION</h2>
        </div>
        <p className="no-posts-message">No sustainable fashion articles available.</p>
      </section>
    );
  }

  const heroPosts = posts.slice(0, 2);
  const smallGridInitial = posts.slice(2, 6);
  const smallGridExtra = posts.slice(6);

  const toggleShowMore = () => {
    setShowMore(!showMore);

    // ✅ notify parent AFTER DOM updates
    setTimeout(() => {
      if (onContentChange) onContentChange();
    }, 50);
  };

  return (
    <section className="sf-section">
      <div className="sf-title-container">
        <h2 className="sf-title-line1">SUSTAINABLE</h2>
        <h2 className="sf-title-line2">FASHION</h2>
      </div>

      {/* Hero Posts */}
      <div className="sf-grid-hero">
        {heroPosts.map((post) => (
          <div className="card-wrapper" key={post.slug}>
            <Card
              imageUrl={post.imageUrl}
              description={post.description}
              publishDate={post.publishDate}
              articleUrl={`/newsletter/article/${post.slug}`}
            />
          </div>
        ))}
      </div>

      {/* Initial Small Grid */}
      <div className="sf-grid-small">
        {smallGridInitial.map((post) => (
          <div className="card-wrapper" key={post.slug}>
            <Card
              imageUrl={post.imageUrl}
              description={post.description}
              publishDate={post.publishDate}
              articleUrl={`/newsletter/article/${post.slug}`}
              location={post.location}
            />
          </div>
        ))}
      </div>

      {/* Extra Posts */}
      {showMore && smallGridExtra.length > 0 && (
        <div className="sf-grid-small extra-posts">
          {smallGridExtra.map((post) => (
            <div className="card-wrapper" key={post.slug}>
              <Card
                imageUrl={post.imageUrl}
                description={post.description}
                publishDate={post.publishDate}
                articleUrl={`/newsletter/article/${post.slug}`}
                location={post.location}
              />
            </div>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      {smallGridExtra.length > 0 && (
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

export default SustainableFashion;
